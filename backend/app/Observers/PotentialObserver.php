<?php

namespace App\Observers;

use App\Models\Potential;
use App\Services\StatisticsService;
use Illuminate\Support\Str;

/**
 * PotentialObserver
 *
 * Handles database-level model lifecycle tasks.
 * Regenerates slugs on title changes and invalidates statistics count cache.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §3.9 Observers
 * @see docs/development/CODING_RULES.md §4.3 Models & Scopes
 */
class PotentialObserver
{
    public function __construct(
        protected StatisticsService $statisticsService
    ) {}

    /**
     * Handle the Potential "creating" event.
     * Generates a unique, URL-safe slug based on the title.
     */
    public function creating(Potential $potential): void
    {
        if (empty($potential->slug)) {
            $potential->slug = $this->generateUniqueSlug($potential->title);
        }
    }

    /**
     * Handle the Potential "created" event.
     * Invalidates statistics cache.
     */
    public function created(Potential $potential): void
    {
        $this->statisticsService->clearCache();
    }

    /**
     * Handle the Potential "updating" event.
     * Regenerates a unique slug if the title has changed.
     */
    public function updating(Potential $potential): void
    {
        if ($potential->isDirty('title')) {
            $potential->slug = $this->generateUniqueSlug($potential->title, $potential->id);
        }
    }

    /**
     * Handle the Potential "updated" event.
     * Invalidates statistics cache if status, category, or location changed.
     */
    public function updated(Potential $potential): void
    {
        if ($potential->isDirty(['status', 'category_id', 'location_id'])) {
            $this->statisticsService->clearCache();
        }
    }

    /**
     * Handle the Potential "deleted" event.
     * Invalidates statistics cache.
     */
    public function deleted(Potential $potential): void
    {
        $this->statisticsService->clearCache();
    }

    /**
     * Generate a unique slug in the potentials table.
     *
     * @param  string  $title
     * @param  string|null  $excludeId
     * @return string
     */
    protected function generateUniqueSlug(string $title, ?string $excludeId = null): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        $query = Potential::where('slug', $slug);
        if ($excludeId !== null) {
            $query->where('id', '!=', $excludeId);
        }

        while ($query->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;

            $query = Potential::where('slug', $slug);
            if ($excludeId !== null) {
                $query->where('id', '!=', $excludeId);
            }
        }

        return $slug;
    }
}
