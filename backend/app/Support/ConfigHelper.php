<?php

namespace App\Support;

use Illuminate\Support\Facades\Config;

/**
 * ConfigHelper
 *
 * Provides static helper methods to safely retrieve configuration values
 * with type safety and default fallbacks. Prevents raw configuration arrays
 * from returning invalid types or missing keys.
 *
 * @see docs/development/CODING_RULES.md §2.2 Core Design Rules
 */
final class ConfigHelper
{
    /**
     * Get a string configuration value.
     */
    public static function getString(string $key, string $default = ''): string
    {
        return (string) Config::get($key, $default);
    }

    /**
     * Get an integer configuration value.
     */
    public static function getInt(string $key, int $default = 0): int
    {
        return (int) Config::get($key, $default);
    }

    /**
     * Get a boolean configuration value.
     */
    public static function getBool(string $key, bool $default = false): bool
    {
        return (bool) Config::get($key, $default);
    }

    /**
     * Get an array configuration value.
     *
     * @return array<mixed, mixed>
     */
    public static function getArray(string $key, array $default = []): array
    {
        $value = Config::get($key, $default);
        return is_array($value) ? $value : $default;
    }

    /**
     * Get a float configuration value.
     */
    public static function getFloat(string $key, float $default = 0.0): float
    {
        return (float) Config::get($key, $default);
    }

    // Prevent instantiation
    private function __construct()
    {
    }
}
