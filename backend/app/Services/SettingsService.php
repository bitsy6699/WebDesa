<?php

namespace App\Services;

use App\Models\Setting;
use App\Support\Constants;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

/**
 * SettingsService
 *
 * Handles reading, writing, and caching of site-wide configuration values.
 *
 * Caches settings under CACHE_KEY_SETTINGS for 24 hours. Any write operation
 * invalidates the cache immediately to ensure consistency.
 *
 * Supports BR-CON-01 by exposing get('site.whatsapp') for fallback contact resolution.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6 Service Layer Design
 * @see docs/product/BUSINESS_RULES.md §4 Adaptive Contact Rules (BR-CON-01)
 */
class SettingsService extends BaseService
{
    /**
     * Create a new SettingsService instance.
     */
    public function __construct(
        protected ActivityLogService $activityLogService
    ) {}

    /**
     * Retrieve all site settings, served from cache when available.
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Setting>
     */
    public function all(): Collection
    {
        return $this->executeSafely(function () {
            return Cache::remember(
                Constants::CACHE_KEY_SETTINGS,
                Constants::CACHE_TTL_ONE_DAY,
                fn () => Setting::all()
            );
        }, 'Gagal memuat konfigurasi aplikasi.');
    }

    /**
     * Retrieve a single setting value by its key.
     * Used by BR-CON-01 fallback contact resolution at runtime.
     *
     * @param  string  $key
     * @return string|null
     */
    public function get(string $key): ?string
    {
        return $this->executeSafely(function () use ($key) {
            // Prefer cached collection if available
            $cached = Cache::get(Constants::CACHE_KEY_SETTINGS);
            if ($cached instanceof Collection) {
                return $cached->firstWhere('key', $key)?->value;
            }

            return Setting::where('key', $key)->value('value');
        }, 'Gagal membaca konfigurasi.');
    }

    /**
     * Update one or more settings from a validated array of key-value pairs.
     * Invalidates CACHE_KEY_SETTINGS after all writes are committed.
     *
     * @param  array<int, array{key: string, value: string|null}>  $settings
     * @param  string  $ipAddress
     * @return void
     */
    public function update(array $settings, string $ipAddress): void
    {
        $this->transaction(function () use ($settings, $ipAddress) {
            foreach ($settings as $item) {
                Setting::where('key', $item['key'])
                    ->update(['value' => $item['value'] ?? null]);
            }

            // Invalidate stale cache after all writes committed
            Cache::forget(Constants::CACHE_KEY_SETTINGS);

            // Log activity
            $this->activityLogService->log(
                user: auth()->user(),
                action: 'settings.updated',
                ipAddress: $ipAddress
            );
        });
    }

    /**
     * Clear the settings cache manually (useful for test teardown or forced refreshes).
     */
    public function clearCache(): void
    {
        Cache::forget(Constants::CACHE_KEY_SETTINGS);
    }
}
