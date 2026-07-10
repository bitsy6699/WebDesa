# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

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
