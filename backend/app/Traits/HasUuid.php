<?php

namespace App\Traits;

use Illuminate\Support\Str;

/**
 * HasUuid Trait
 *
 * Automatically generates a UUID v4 primary key on model creation.
 * Disables auto-incrementing and sets key type to string.
 *
 * Usage: Add `use HasUuid;` to any Eloquent model that requires UUID primary keys.
 *
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §7.1 UUID Strategy
 * @see docs/development/CODING_RULES.md §4.3 Models & Scopes
 */
trait HasUuid
{
    /**
     * Boot the HasUuid trait.
     *
     * Registers a `creating` event listener that generates a UUID v4
     * for the model's primary key if one has not been set.
     */
    public static function bootHasUuid(): void
    {
        static::creating(function ($model): void {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    /**
     * Disable auto-incrementing for UUID primary keys.
     */
    public function getIncrementing(): bool
    {
        return false;
    }

    /**
     * Set the primary key type to string for UUID compatibility.
     */
    public function getKeyType(): string
    {
        return 'string';
    }
}
