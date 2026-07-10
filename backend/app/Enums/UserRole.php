<?php

namespace App\Enums;

/**
 * UserRole Enum
 *
 * Defines user roles for authorization.
 * Version 1 supports only a single Administrator role
 * as defined in the Business Rules.
 *
 * Future versions may expand this enum to include additional roles
 * (e.g., Editor, UMKM Owner) without architectural changes.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §9.3 Future Role Expansion
 * @see docs/product/BUSINESS_RULES.md
 */
enum UserRole: string
{
    case Admin = 'admin';

    /**
     * Get the human-readable label for display purposes.
     */
    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrator',
        };
    }

    /**
     * Get all valid role values as an array.
     *
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
