<?php

namespace App\Support;

/**
 * Constants
 *
 * Application-wide constants to prevent magic strings and hardcoded values
 * throughout the backend codebase. Enforces uniformity.
 *
 * @see docs/development/CODING_RULES.md §2.2 Core Design Rules
 */
final class Constants
{
    // API Versioning and Info
    public const API_VERSION = '1.0.0';
    public const API_PREFIX = 'v1';
    public const AUTH_TOKEN_NAME = 'admin-token';

    // Pagination
    public const PAGINATION_DEFAULT_PER_PAGE = 12;
    public const PAGINATION_MAX_PER_PAGE = 50;

    // Search and Sort
    public const SEARCH_MIN_LENGTH = 3;
    public const DEFAULT_SORT_COLUMN = 'created_at';
    public const DEFAULT_SORT_DIRECTION = 'desc';

    // Media Constraints (BR-MED-01)
    public const MEDIA_MAX_IMAGE_WIDTH = 1200;
    public const MEDIA_WEBP_QUALITY = 80;
    public const MEDIA_MAX_FILE_SIZE_MB = 5;
    public const MEDIA_ALLOWED_IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp'];

    // Coordinates (Location Constraints)
    public const COORD_MIN_LATITUDE = -90.0;
    public const COORD_MAX_LATITUDE = 90.0;
    public const COORD_MIN_LONGITUDE = -180.0;
    public const COORD_MAX_LONGITUDE = 180.0;

    // Cache Keys
    public const CACHE_KEY_CATEGORIES = 'village_potentials_categories';
    public const CACHE_KEY_SETTINGS = 'village_site_settings';
    public const CACHE_KEY_STATISTICS = 'village_statistics_summary';
    public const CACHE_KEY_POTENTIALS_LIST = 'village_potentials_list_default';
    public const CACHE_TTL_ONE_DAY = 86400; // in seconds
    public const CACHE_TTL_FIFTEEN_MINUTES = 900; // in seconds

    // Rate Limiting (BR-SEC-01)
    public const RATE_LIMIT_API = 60; // requests per minute
    public const RATE_LIMIT_LOGIN = 5; // attempts per minute

    // Prevent instantiation
    private function __construct()
    {
    }
}
