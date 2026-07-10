<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

/**
 * SettingResource
 *
 * Formats a single Setting model row into a standardized API response.
 *
 * @see docs/engineering/API_SPEC.md §Settings Endpoints
 */
class SettingResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'key'   => $this->key,
            'value' => $this->value,
            'type'  => $this->type,
            'group' => $this->group,
        ];
    }
}
