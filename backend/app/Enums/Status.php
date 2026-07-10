<?php

namespace App\Enums;

/**
 * Status Enum
 *
 * Defines the lifecycle states for content items (Potentials).
 * This is the single status enum used throughout the application.
 *
 * - Draft: Content is being prepared and is not visible to the public.
 * - Published: Content is live and visible on the public website.
 * - Archived: Content has been retired from public view but retained in the database.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §3.7 Enums
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §7.3 Attribute Casting
 */
enum Status: string
{
    case Draft = 'draft';
    case Published = 'published';
    case Archived = 'archived';

    /**
     * Get the human-readable label for display purposes.
     */
    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Draf',
            self::Published => 'Dipublikasikan',
            self::Archived => 'Diarsipkan',
        };
    }

    /**
     * Get the color identifier for UI badge rendering.
     */
    public function color(): string
    {
        return match ($this) {
            self::Draft => 'warning',
            self::Published => 'success',
            self::Archived => 'secondary',
        };
    }

    /**
     * Check if the status represents publicly visible content.
     */
    public function isPublic(): bool
    {
        return $this === self::Published;
    }

    /**
     * Get all valid status values as an array.
     *
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
