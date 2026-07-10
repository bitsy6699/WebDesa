<?php

namespace App\Services;

use App\Models\Category;
use App\Support\Constants;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

/**
 * CategoryService
 *
 * Implements business operations for classification categories and incorporates caching.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6 Service Layer Design
 */
class CategoryService extends BaseService
{
    /**
     * Retrieve all village categories with cached lookup support.
     * Caches all categories inside Constants::CACHE_KEY_CATEGORIES key for 24 hours.
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Category>
     */
    public function all(): Collection
    {
        return $this->executeSafely(function () {
            return Cache::remember(
                Constants::CACHE_KEY_CATEGORIES,
                Constants::CACHE_TTL_ONE_DAY,
                fn () => Category::all()
            );
        }, 'Gagal memuat daftar kategori.');
    }

    /**
     * Clear categories caching keys.
     */
    public function clearCache(): void
    {
        Cache::forget(Constants::CACHE_KEY_CATEGORIES);
    }
}
