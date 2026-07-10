<?php

namespace App\Services;

use App\Exceptions\MediaProcessingException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * ImageProcessingService
 *
 * Resizes images to max 1200px width and converts them to WebP format at 80% quality using GD library.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6.2 ImageProcessingService
 * @see docs/development/CODING_RULES.md §4.6 File Storage & Media Processing
 */
class ImageProcessingService extends BaseService
{
    /**
     * Process, resize, and convert an uploaded image file to WebP format.
     *
     * @param  \Illuminate\Http\UploadedFile  $file
     * @return array{filename: string, filepath: string, filetype: string, filesize: int}
     *
     * @throws \App\Exceptions\MediaProcessingException
     */
    public function process(UploadedFile $file): array
    {
        return $this->executeSafely(function () use ($file) {
            $tempPath = $file->getRealPath();
            $mimeType = $file->getMimeType();

            // Load raw image using appropriate GD drivers
            $image = match ($mimeType) {
                'image/jpeg', 'image/jpg' => @imagecreatefromjpeg($tempPath),
                'image/png'               => @imagecreatefrompng($tempPath),
                'image/webp'              => @imagecreatefromwebp($tempPath),
                default                   => false,
            };

            if (!$image) {
                throw new MediaProcessingException(
                    message: 'Format gambar tidak didukung atau file rusak.',
                    filePath: $file->getClientOriginalName()
                );
            }

            // Get original dimensions
            $width = imagesx($image);
            $height = imagesy($image);

            // Calculate resize bounds
            $maxWidth = 1200;
            if ($width > $maxWidth) {
                $newWidth = $maxWidth;
                $newHeight = (int) (($height / $width) * $maxWidth);

                // Create a new canvas and perform copy resize
                $resizedImage = imagecreatetruecolor($newWidth, $newHeight);

                // Preserve PNG/WebP alpha transparency channel
                if ($mimeType === 'image/png' || $mimeType === 'image/webp') {
                    imagealphablending($resizedImage, false);
                    imagesavealpha($resizedImage, true);
                }

                imagecopyresampled(
                    $resizedImage, $image,
                    0, 0, 0, 0,
                    $newWidth, $newHeight, $width, $height
                );

                imagedestroy($image);
                $image = $resizedImage;
            }

            // Formulate target file path parameters
            $filename = 'media_' . Str::uuid() . '.webp';
            $relativeFolder = 'uploads/media';
            $relativeFilePath = $relativeFolder . '/' . $filename;
            
            // Get physical path from Storage facade to support testing disk swap
            $targetPath = Storage::disk('public')->path($relativeFilePath);
            $targetFolder = dirname($targetPath);

            // Ensure directory path exists
            if (!file_exists($targetFolder)) {
                mkdir($targetFolder, 0755, true);
            }

            // Save to destination inside public storage WebP format
            if (!@imagewebp($image, $targetPath, 80)) {
                imagedestroy($image);
                throw new MediaProcessingException(
                    message: 'Gagal menulis gambar WebP ke penyimpanan.',
                    filePath: $filename
                );
            }

            // Free GD canvas memory
            imagedestroy($image);

            // Return details
            return [
                'filename' => $filename,
                'filepath' => $relativeFolder . '/' . $filename,
                'filetype' => 'image/webp',
                'filesize' => (int) filesize($targetPath),
            ];
        }, 'Gagal memproses file gambar.');
    }
}
