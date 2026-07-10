<?php

namespace App\Http\Resources;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * BaseResource
 *
 * Base class for all single-item API Resource transformations.
 * Wraps the resource data in the standardized success response format.
 *
 * All API Resource classes MUST extend this class.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §8 Resource Layer Design
 * @see docs/engineering/API_SPEC.md §2.1 Standard Success Response
 */
class BaseResource extends JsonResource
{
    /**
     * Customize the response to wrap data in the standard success format.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\JsonResponse  $response
     */
    public function withResponse(Request $request, JsonResponse $response): void
    {
        $original = $response->getData(true);

        $response->setData([
            'success' => true,
            'data' => $original['data'] ?? $original,
        ]);
    }
}
