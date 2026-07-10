# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [Phase 12: Deployment (Staging)] - 2026-07-10
### Added
- Deployment scripts for staging environment:
  - `scripts/deploy-staging.sh`: Automated bash script to deploy code to staging server via SSH, install dependencies, run migrations, and verify health check endpoint. Includes a rollback mechanism in case of failures.
  - `scripts/deploy.env.example`: Template for configuring the deployment environment variables (`STAGING_HOST`, `STAGING_USER`, `STAGING_PATH`, `DEPLOY_BRANCH`, `API_BASE_URL`).

## [Phase 11: Performance Optimization] - 2026-07-10
### Added
- Two new database index migrations:
  - `add_performance_indexes_to_potentials_table`: composite indexes on `(status, deleted_at)`, `(category_id, status, deleted_at)`, `(is_featured, status, deleted_at)`, and `(created_by_id)` to accelerate all public query patterns.
  - `add_dusun_index_to_locations_table`: index on `locations.dusun` to accelerate the StatisticsService distinct dusun count.
- `GET /api/v1/health` endpoint (public) returning application status, version, and timestamp. Required by Phase 12 staging deployment.
- `GET /api/v1/admin/activity-logs` endpoint (auth:sanctum) returning paginated, filterable audit logs, replacing the route placeholder.
- `HealthController` for the public health check.
- `ActivityLogController` for the administrator audit log listing.
- `ActivityLogResource` and `ActivityLogCollection` for standardized JSON responses.
- `ActivityLogFactory` for test fixtures.
- `ActivityLogService::list()` paginated query method with action-slug filtering and eager-loaded user relations (N+1 safe).
- New cache constants: `CACHE_KEY_POTENTIALS_LIST` and `CACHE_TTL_FIFTEEN_MINUTES` in `Constants.php`.
- List-level response caching in `PotentialService::list()` for default unfiltered public queries (BR-PERF-01: 15-minute TTL).
- New feature tests: `HealthTest` (2 tests) and `ActivityLogTest` (6 tests).
- New `PotentialTest::test_public_index_default_listing_is_served_from_cache` test.
- API documentation for Sections 10 (Health) and 11 (Activity Logs) in `API_SPEC.md`.

### Changed
- `PotentialService::list()` refactored: query logic extracted to `fetchListFromDatabase()` for clean separation between caching and querying.
- `PotentialService::create()`, `update()`, `delete()`, and `toggleFeatured()` now call `clearListCache()` to invalidate the public listing cache on every write.
- `ImportExportService::importPotentials()` now calls `Cache::forget(Constants::CACHE_KEY_POTENTIALS_LIST)` after a successful bulk import.
- Removed unused `Illuminate\Support\Facades\DB` import from `PotentialService`.
- Fixed PSR-12 import ordering in `ImportExportService`.

## [Phase 10: Bulk Excel Import & Export Module] - 2026-07-10
### Added
- Excel import wizard for bulk uploading village potentials (`ImportExportController@import`).
- Import data validation utilizing static rules and dynamic ACA schema.
- Transactional rollback on bulk insert to ensure data integrity (BR-CMS-01).
- Dynamic Excel template generation endpoint with an Instructions worksheet listing category schemas (`ImportExportController@template`).
- Excel export endpoint to download all potentials with human-readable headers (`ImportExportController@export`).

### Changed
- Centralized Excel styling logic in `ImportExportService`.
- Removed unnecessary `category` relation from eager loading during export for performance.
- Fixed `ImageProcessingService` WebP conversion to correctly respect the `Storage::fake()` virtual disk in test environments.
- Updated `PotentialObserver` and `PotentialService` cache invalidation to correctly purge cache keys when slugs are regenerated upon title changes.
