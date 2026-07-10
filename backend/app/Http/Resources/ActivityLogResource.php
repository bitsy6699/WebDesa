<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

/**
 * ActivityLogResource
 *
 * Formats a single ActivityLog entry response.
 *
 * @see docs/engineering/API_SPEC.md §11 Activity Log Endpoints
 */
class ActivityLogResource extends BaseResource
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
            'action' => $this->action,
            'subject_id' => $this->subject_id,
            'subject_type' => $this->subject_type,
            'ip_address' => $this->ip_address,
            'created_at' => $this->created_at?->toIso8601String(),
            'user' => [
                'id' => $this->user?->id,
                'username' => $this->user?->username,
            ],
        ];
    }
}
