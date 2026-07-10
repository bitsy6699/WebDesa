<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

/**
 * ActivityLogCollection
 *
 * Wraps paginated lists of ActivityLogResource items.
 *
 * @see docs/engineering/API_SPEC.md §11 Activity Log Endpoints
 */
class ActivityLogCollection extends BaseCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($log) use ($request) {
            return (new ActivityLogResource($log))->toArray($request);
        })->all();
    }
}
