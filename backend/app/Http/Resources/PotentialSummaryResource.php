<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * PotentialSummaryResource
 *
 * Lightweight API Resource transformation for village potentials listing grids.
 * Excludes heavy gallery lists and dynamic metadata.
 *
 * @see docs/engineering/API_SPEC.md §5.1 List Potentials
 */
class PotentialSummaryResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Extract a clean snippet/short description
        $shortDescription = mb_strimwidth(strip_tags($this->description), 0, 120, '...');

        // Resolve cover image url
        $coverImageUrl = $this->coverImage 
            ? Storage::disk('public')->url($this->coverImage->filepath)
            : null;

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'short_description' => $shortDescription,
            'cover_image_url' => $coverImageUrl,
            'location' => [
                'latitude' => (float) $this->location->latitude,
                'longitude' => (float) $this->location->longitude,
                'address' => $this->location->address,
                'dusun' => $this->location->dusun,
            ],
            'is_featured' => (bool) $this->is_featured,
            'status' => $this->status->value,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
