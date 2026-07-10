<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

/**
 * AuthResource
 *
 * Formats the successful login output (token and user data) into the standardized API payload.
 *
 * @see docs/engineering/API_SPEC.md §3.1 Admin Login
 */
class AuthResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'token' => $this->resource['token'],
            'user' => [
                'id' => $this->resource['user']->id,
                'username' => $this->resource['user']->username,
            ],
        ];
    }
}
