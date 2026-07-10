<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

/**
 * CategoryResource
 *
 * Formats a Category model response.
 *
 * @see docs/engineering/API_SPEC.md §4.1 List Categories
 */
class CategoryResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'label' => $this->label,
            'slug' => $this->slug,
            'icon_key' => $this->icon_key,
            'color_code' => $this->color_code,
        ];
    }
}
