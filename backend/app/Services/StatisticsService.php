<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Location;
use App\Models\Potential;
use App\Support\Constants;
use Illuminate\Support\Facades\Cache;

/**
 * StatisticsService
 *
 * Handles aggregate dashboard and public statistics calculation.
 * Computes counts of published village potentials, UMKM listings, categories,
 * and unique locations (dusun) in compliance with BR-STAT-01.
 *
 * Results are cached for performance.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §3.3 Service Catalog
 * @see docs/product/BUSINESS_RULES.md §8 Statistics Rules (BR-STAT-01)
 */
class StatisticsService extends BaseService
{
    /**
     * Get aggregate landing/dashboard statistics summary.
     * Enforces BR-STAT-01: Only counts potentials that are 'published'.
     *
     * @return array{total_potentials: int, total_umkm: int, total_categories: int, total_dusun: int}
     */
    public function getSummary(): array
    {
        return $this->executeSafely(function () {
            return Cache::remember(
                Constants::CACHE_KEY_STATISTICS,
                Constants::CACHE_TTL_ONE_DAY,
                function () {
                    // Count only published potentials (BR-STAT-01)
                    $totalPotentials = Potential::published()->count();

                    // Count UMKM category potentials.
                    // Assumes category slug 'umkm' representing UMKM listings in V1
                    $totalUmkm = Potential::published()
                        ->inCategory('umkm')
                        ->count();

                    // Count all active categories
                    $totalCategories = Category::count();

                    // Count distinct dusun names that contain published potentials
                    $totalDusun = Location::whereHas('potential', function ($query) {
                        $query->published();
                    })
                    ->whereNotNull('dusun')
                    ->where('dusun', '!=', '')
                    ->distinct('dusun')
                    ->count('dusun');

                    return [
                        'total_potentials' => $totalPotentials,
                        'total_umkm'       => $totalUmkm,
                        'total_categories' => $totalCategories,
                        'total_dusun'      => $totalDusun,
                    ];
                }
            );
        }, 'Gagal memuat ringkasan statistik.');
    }

    /**
     * Clear the statistics cache manually when data updates.
     */
    public function clearCache(): void
    {
        Cache::forget(Constants::CACHE_KEY_STATISTICS);
    }
}
