<?php

namespace App\Services;

use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * MediaService
 *
 * Coordinates image file processing, physical storage writes, database logging,
 * and deletion operations.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6.2 ImageProcessingService / §10 File Storage Architecture
 */
class MediaService extends BaseService
{
    /**
     * Create a new MediaService instance.
     */
    public function __construct(
        protected ImageProcessingService $imageProcessingService,
        protected ActivityLogService $activityLogService
    ) {}

    /**
     * Process, store, and log a newly uploaded file.
     *
     * @param  \Illuminate\Http\UploadedFile  $file
     * @param  string  $ipAddress
     * @return \App\Models\Media
     */
    public function upload(UploadedFile $file, string $ipAddress): Media
    {
        return $this->transaction(function () use ($file, $ipAddress) {
            // Process file through resizing/converting pipeline
            $meta = $this->imageProcessingService->process($file);

            // Create media row
            $media = Media::create([
                'filename' => $meta['filename'],
                'filepath' => $meta['filepath'],
                'filetype' => $meta['filetype'],
                'filesize' => $meta['filesize'],
                'alt_text' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            ]);

            // Log upload event
            $this->activityLogService->log(
                user: auth()->user(),
                action: 'media.uploaded',
                subjectId: $media->id,
                subjectType: Media::class,
                ipAddress: $ipAddress
            );

            return $media;
        });
    }

    /**
     * Delete a media asset from the database and the physical disk.
     *
     * @param  \App\Models\Media  $media
     * @param  string  $ipAddress
     * @return void
     */
    public function delete(Media $media, string $ipAddress): void
    {
        $this->transaction(function () use ($media, $ipAddress) {
            // Remove physical file from disk
            Storage::disk('public')->delete($media->filepath);

            // Delete database record
            $media->delete();

            // Log delete event
            $this->activityLogService->log(
                user: auth()->user(),
                action: 'media.deleted',
                subjectId: $media->id,
                subjectType: Media::class,
                ipAddress: $ipAddress
            );
        });
    }
}
