<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\UploadMediaRequest;
use App\Http\Resources\MediaResource;
use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * MediaController
 *
 * Coordinates REST API endpoints for Media Manager assets.
 * Enforces gate/policy checks for uploading and deleting media resources.
 *
 * @see docs/engineering/API_SPEC.md §6 Media Endpoints
 * @see docs/development/CODING_RULES.md §4.1 Thin Controllers
 */
class MediaController extends BaseController
{
    /**
     * Create a new MediaController instance.
     */
    public function __construct(
        protected MediaService $mediaService
    ) {}

    /**
     * Upload and optimize raw image.
     *
     * @param  \App\Http\Requests\UploadMediaRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UploadMediaRequest $request): JsonResponse
    {
        $this->authorize('create', Media::class);

        $media = $this->mediaService->upload(
            $request->file('file'),
            $request->ip() ?? '127.0.0.1'
        );

        return $this->success(
            new MediaResource($media),
            'Gambar berhasil diunggah.',
            201
        );
    }

    /**
     * Remove a media asset.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id  UUID of media asset
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $media = Media::findOrFail($id);

        $this->authorize('delete', $media);

        $this->mediaService->delete(
            $media,
            $request->ip() ?? '127.0.0.1'
        );

        return $this->noContent();
    }
}
