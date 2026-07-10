<?php

namespace App\Exceptions;

/**
 * MediaProcessingException
 *
 * Thrown when image processing operations fail, such as:
 * - Image resize failure
 * - WebP conversion failure
 * - File write failure during storage
 * - Unsupported image format
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6.2 ImageProcessingService
 * @see docs/development/CODING_RULES.md §4.6 File Storage & Media Processing
 */
class MediaProcessingException extends ApiException
{
    /**
     * @param  string  $message  Human-readable error description
     * @param  string|null  $filePath  The path of the file that failed processing
     */
    public function __construct(
        string $message = 'Gagal memproses file media.',
        protected ?string $filePath = null
    ) {
        $details = $this->filePath !== null
            ? ['file' => $this->filePath]
            : null;

        parent::__construct(
            errorCode: 'MEDIA_PROCESSING_FAILED',
            message: $message,
            statusCode: 422,
            details: $details
        );
    }

    /**
     * Get the file path that caused the processing failure.
     */
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }
}
