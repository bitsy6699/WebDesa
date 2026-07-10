<?php

namespace App\Http\Controllers\Api\V1;

use App\Support\Constants;
use Illuminate\Http\JsonResponse;

/**
 * HealthController
 *
 * Coordinates the public `/health` endpoint to monitor application status.
 *
 * @see docs/engineering/API_SPEC.md §10 Health Check Endpoint
 */
class HealthController extends BaseController
{
    /**
     * Return application health status.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function check(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'status' => 'ok',
                'version' => Constants::API_VERSION,
                'timestamp' => now()->toIso8601String(),
            ],
        ]);
    }
}
