<?php

namespace App\Http\Resources;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * PotentialCollection
 *
 * Wraps paginated lists of PotentialSummaryResources.
 *
 * @see docs/engineering/API_SPEC.md §2.3 Paginated Response Format
 */
class PotentialCollection extends BaseCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($potential) use ($request) {
            return (new PotentialSummaryResource($potential))->toArray($request);
        })->all();
    }
}
