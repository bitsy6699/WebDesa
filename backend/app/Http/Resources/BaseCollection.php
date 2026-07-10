<?php

namespace App\Http\Resources;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * BaseCollection
 *
 * Base class for all paginated API Resource collections.
 * Wraps paginated results in the standardized response format
 * with `meta` and `links` keys.
 *
 * All API Collection classes MUST extend this class.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §8 Resource Layer Design
 * @see docs/engineering/API_SPEC.md §2.3 Paginated Response Format
 */
class BaseCollection extends ResourceCollection
{
    /**
     * Customize the response to wrap data in the standard paginated format.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\JsonResponse  $response
     */
    public function withResponse(Request $request, JsonResponse $response): void
    {
        $original = $response->getData(true);

        $response->setData([
            'success' => true,
            'data' => $original['data'] ?? [],
            'meta' => [
                'current_page' => $original['meta']['current_page'] ?? 1,
                'last_page' => $original['meta']['last_page'] ?? 1,
                'per_page' => $original['meta']['per_page'] ?? 12,
                'total' => $original['meta']['total'] ?? 0,
            ],
            'links' => [
                'prev' => $original['links']['prev'] ?? null,
                'next' => $original['links']['next'] ?? null,
            ],
        ]);
    }
}
