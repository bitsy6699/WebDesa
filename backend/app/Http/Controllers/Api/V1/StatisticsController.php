<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\StatisticsResource;
use App\Services\StatisticsService;
use Illuminate\Http\JsonResponse;

/**
 * StatisticsController
 *
 * Coordinates REST API endpoints for landing dashboard statistics counters.
 *
 * GET /api/v1/statistics/summary — Public read
 *
 * @see docs/engineering/API_SPEC.md §7 Statistics Endpoints
 * @see docs/development/CODING_RULES.md §4.1 Thin Controllers
 */
class StatisticsController extends BaseController
{
    /**
     * Create a new StatisticsController instance.
     */
    public function __construct(
        protected StatisticsService $statisticsService
    ) {}

    /**
     * Retrieve aggregate dashboard and public landing counters.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSummary(): JsonResponse
    {
        $summary = $this->statisticsService->getSummary();

        return $this->success(new StatisticsResource($summary));
    }
}
