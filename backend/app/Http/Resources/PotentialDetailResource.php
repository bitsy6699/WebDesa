<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * PotentialDetailResource
 *
 * Detailed API Resource transformation for village potentials detail pages.
 * Includes polymorphic metadata and complete gallery lists.
 *
 * @see docs/engineering/API_SPEC.md §5.2 Show Potential Detail
 */
class PotentialDetailResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $coverImageUrl = $this->coverImage 
            ? Storage::disk('public')->url($this->coverImage->filepath)
            : null;

        // Map gallery collection to full URL paths
        $galleryUrls = $this->gallery->map(function ($media) {
            return Storage::disk('public')->url($media->filepath);
        })->toArray();

        // Contact mapping fallback resolution logic (BR-CON-01)
        // If local metadata contact info is missing, it falls back to empty fields or handles it
        // Note: setting fallbacks will be fully populated by client config or loaded from Settings if needed.
        $whatsapp = $this->metadata['whatsapp'] ?? null;
        $phone = $this->metadata['phone'] ?? null;
        $email = $this->metadata['email'] ?? null;
        $website = $this->metadata['website'] ?? null;

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'cover_image_url' => $coverImageUrl,
            'gallery' => $galleryUrls,
            'location' => [
                'latitude' => (float) $this->location->latitude,
                'longitude' => (float) $this->location->longitude,
                'address' => $this->location->address,
                'dusun' => $this->location->dusun,
            ],
            'contact' => [
                'whatsapp' => $whatsapp,
                'phone' => $phone,
                'email' => $email,
                'website' => $website,
            ],
            'metadata' => $this->metadata ?? new \stdClass(),
            'is_featured' => (bool) $this->is_featured,
            'status' => $this->status->value,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
