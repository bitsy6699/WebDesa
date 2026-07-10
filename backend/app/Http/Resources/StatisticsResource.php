<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

/**
 * StatisticsResource
 *
 * Formats the aggregated dashboard counters into a standardized API response.
 * Consumed by the public landing page statistics overlay and admin dashboard.
 *
 * Respects BR-STAT-01: only published potential counts are included.
 *
 * @see docs/engineering/API_SPEC.md §7 Statistics Endpoints
 * @see docs/product/BUSINESS_RULES.md §8 Statistics Rules (BR-STAT-01)
 */
class StatisticsResource extends BaseResource
{
    /**
     * Transform the statistics summary into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'total_potentials' => $this->resource['total_potentials'],
            'total_umkm'       => $this->resource['total_umkm'],
            'total_categories' => $this->resource['total_categories'],
            'total_dusun'      => $this->resource['total_dusun'],
        ];
    }
}
