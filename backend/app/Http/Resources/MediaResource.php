<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * MediaResource
 *
 * Formats a Media model response, converting local path into full accessible URLs.
 *
 * @see docs/engineering/API_SPEC.md §6.1 Upload Image
 */
class MediaResource extends BaseResource
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
            'filename' => $this->filename,
            'filepath' => Storage::disk('public')->url($this->filepath),
            'filetype' => $this->filetype,
            'filesize' => $this->filesize,
            'alt_text' => $this->alt_text,
        ];
    }
}
