<?php

namespace App\Enums;

/**
 * MediaType Enum
 *
 * Defines the supported media file types for uploads.
 *
 * - Image: Visual media (jpg, jpeg, png, webp) used for covers and galleries.
 * - Document: Document files (xlsx) used for bulk import operations.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §10 File Storage Architecture
 * @see docs/development/CODING_RULES.md §4.6 File Storage & Media Processing
 */
enum MediaType: string
{
    case Image = 'image';
    case Document = 'document';

    /**
     * Get the human-readable label for display purposes.
     */
    public function label(): string
    {
        return match ($this) {
            self::Image => 'Gambar',
            self::Document => 'Dokumen',
        };
    }

    /**
     * Get the allowed MIME types for this media type.
     *
     * @return array<int, string>
     */
    public function allowedMimeTypes(): array
    {
        return match ($this) {
            self::Image => [
                'image/jpeg',
                'image/png',
                'image/webp',
            ],
            self::Document => [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ],
        };
    }

    /**
     * Get the allowed file extensions for this media type.
     *
     * @return array<int, string>
     */
    public function allowedExtensions(): array
    {
        return match ($this) {
            self::Image => ['jpg', 'jpeg', 'png', 'webp'],
            self::Document => ['xlsx'],
        };
    }

    /**
     * Get the maximum file size in bytes for this media type.
     * Images: 5MB, Documents: 10MB.
     */
    public function maxFileSizeBytes(): int
    {
        return match ($this) {
            self::Image => 5 * 1024 * 1024,
            self::Document => 10 * 1024 * 1024,
        };
    }

    /**
     * Get all valid media type values as an array.
     *
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
