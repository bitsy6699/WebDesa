# Changelog

All notable changes to this project will be documented in this file.

## [Phase 13H v2: Premium Glassmorphism Dashboard & Category Polish] - 2026-07-11
### Changed
- **StatisticsSection**: Applied spec-exact glass values — `rgba(255,255,255,0.18)` bg, `blur(24px)`, border `rgba(255,255,255,0.28)`, shadow `rgba(16,24,40,0.10)`. Cards sized to `178px` height / `28px` padding / `28px` radius.
- **StatisticsSection CountUp**: Upgraded to `duration=2000ms` ease-out-cubic animation triggered once on viewport entry via `IntersectionObserver`.
- **StatisticsSection CTA**: Added shared "Lihat Statistik Lengkap" pill button (h-46px, rounded-full, glass bg, ArrowRight icon) on heading row right for desktop, below for mobile.
- **StatisticsSection Spacing**: Responsive `paddingTop: clamp(32px, 6vw, 72px)` — comfortable gap from Hero.
- **CategorySection Heading**: Added `text-3xl font-semibold tracking-tight` heading ("Kategori Potensi") + subtitle + 40px gap to card container.
- **CategorySection CTA**: Added shared "Lihat Semua Kategori" pill CTA matching StatisticsSection design.
- **CategorySection Container**: Wrapped category cards in a glassmorphic tray (`rgba(255,255,255,0.65)` bg, `blur(18px)`, `rounded-[28px]`, soft shadow).
- **CategorySection Hover**: Enhanced hover to `translateY(-6px)`, brighter bg, increased shadow, icon `scale(1.10)`, all at `300ms ease-out`.

### Changed
- StatisticsSection: redesigned layout to be asymmetric (2 large cards, 2 list-based cards, 2 medium cards of varying heights), breaking standard Bootstrap grid styles.
- Glassmorphism: applied `rgba(255,255,255,0.55)` background, `22px` blur, `white/35` translucent border, and soft drop shadows. Hover states scale to `1.02` with 3D tilt coordinates parallax.
- Micro-Animations: integrated mount count-up animations for numbers, floating icons, and slow-moving radial background lights.
- Background: set linear gradient `#F8FAF8` to `#F3F8F5` with two subtle, animated radial colored glows.

## [Phase 13I: Landing Page Rendering Corrections] - 2026-07-11
### Changed
- Render Tree: reordered components inside `LandingPageTemplate.tsx` so the "Dashboard Ringkas Desa" (`StatisticsSection`) is rendered immediately below the `Hero`, and "Kategori Potensi" (`CategorySection`) is rendered below it.
- CategorySection: removed the overlapping negative top margin (`-mt`, `-60px`) and replaced it with a clean `py-16` section padding.
- Spacing & Flow: implemented a top-to-bottom background gradient in `CategorySection` (`#F3F8F5` to `#ffffff`) to seamlessly blend the sections.

## [Phase 13H: Hero & Dashboard Ringkas Redesign] - 2026-07-11
### Changed
- HeroBanner: removed the floating Statistics Card, chips, and badges; configured left-aligned layout focused on core village branding.
- Hero Overlay: implemented top-to-bottom dark green gradient transition (`rgba(15,61,52,0.82)` to `rgba(24,77,71,0.58)` to `transparent`) fading naturally into `#F8FAF8`.
- Hero Typography: configured title font size (72px desktop / 56px tablet / 40px mobile), line-height 1.05, letter-spacing -0.03em, and description to 18px with `max-w-[650px]`.
- Hero Search Bar: implemented glassmorphism (`bg-white/16`, blur 20px, border white 22%, height 60px) and a forest green submit button (`#184D47`).
- Hero CTA: configured primary CTA to `#184D47` solid, secondary CTA to a semi-transparent white/14 glass button with white/20 border.
- Header: updated scrolled nav text color to `#184D47` (with `#0F3D34` hover) and added an amber `#F59E0B` hover underline transition for active links.
- Dashboard Ringkas Desa: completely replaced the old statistics section with a 3-column desktop / 2-column tablet grid featuring glassmorphic cards (55% white background, 18px backdrop blur, 35% white border) and staggered entrances (100ms delay increments).

## [Phase 13F Visual Redesign & Branding consistency] - 2026-07-11
### Changed
- Footer Color Harmony: background changed to the Village Design System dark green gradient (`#0F3D34`, `#174F42`, `#1E5B4F`), removing slate colors.
- Leaf Logo Replacement: substituted all leaf branding icons in Header, Footer, and Mobile Navigation with the official village logo (`/assets/images/logo-desa.png`), maintaining lucide icon fallback support.
- Supported By: redesigned the bottom partner logo block to display real logo images (`logo-desa.png`, `logo-kkn.png`, `logo-kampus.png`) at `52px` height with graceful fallback labels.
- Navigation: simplified link structure (Beranda, Potensi Desa, Kategori, Peta Potensi, Statistik, Kontak) and removed Tentang Desa and Berita references.
- Header: integrated glass opacity, backdrop filter `blur(24px)`, and darker overlay.
- Typography: limited serif font strictly to hero-title; applied Inter to all other elements and capped hero title sizes to 72px/48px/36px.
- Section Spacing: standardized alternating section backgrounds and applied 96px vertical section margins.
- Footer Redesign: replaced wave separators with a clean straight line divider, restructuring quick links, contact, location, and supported-by segments.
- CTA Button Variants: updated CTA buttons in Hero banner and sections to use unified primary and secondary variants.

## [Phase 13F UI Polish: Landing Page Polish & Visual Harmony] - 2026-07-11
### Added
- Standardized `Card` component props and styles across all sections (24px radius, soft shadow, translateY(-6px) hover lift, 300ms transition duration).
- Standardized `Button` component to be fully rounded (`rounded-full`), with consistent sizing (sm=32px, md=40px, lg=48px) and spacing.
- Cleaned up obsolete files: `NewsSection.tsx`, `src/mocks/news.ts`, and `src/mocks/home.ts`.

### Changed
- StatisticsSection: updated backgrounds to White / #F8FAFC, soft shadows, rounded 24px edges, and aligned with Primary Green brand color.
- CTA Buttons: Refactored `MapSection`, `FeaturedPotentialsSection`, and `PotensiTerbaruSection` links to use the unified theme-based `Button` component.
- MapSection: added `per_page` query option support in `FetchPotentialsParams` to fix TypeScript compilation issue.
- Skeletons: resolved type errors by using standard Tailwind classes (`aspect-video` and sizes) instead of custom `style` props.

## [Phase 13F: Landing Page Redesign] - 2026-07-10
### Changed
- HeroBanner: replaced placeholder SVG with real hero image (public/hero/hero-karamatwangi.jpg)
- HeroBanner: removed all category chips from hero; hero is now clean
- HeroBanner: improved overlay gradients, larger title (clamp 3rem–5.5rem), sub-location line
- HeroBanner: inline search bar with white pill container, green Cari button
- HeroBanner: min-height increased to clamp(760px, 92vh, 920px)
- Header: added VillageLogo component using /logo-desa.png with Leaf icon fallback
- Header: removed "UMKM" from navigation; final nav: Beranda, Tentang Desa, Potensi Desa, Peta Potensi, Berita, Statistik, Kontak + Dashboard Admin CTA
- Header: transparent over hero, solid white after 50px scroll, smooth 300ms transition
- HeroStatisticsCard: labels updated to Potensi Terdaftar, Kategori Potensi, Dusun & Kampung, Destinasi Wisata
- CategorySection: rounded-3xl, improved shadow, hover color tints from category color_code
- MapSection: location label updated to "Desa Karamatwangi, Kab. Garut"
- MapSection: all Kuningan references removed
- Home.tsx: hero image switched from placeholder-hero.svg to real /hero/hero-karamatwangi.jpg

## [Phase 13E Revision: Landing Page Completion] - 2026-07-10
### Changed
- Replaced all UMKM-specific wording with generic "Potensi Desa" throughout landing page
- HeroBanner: CTA changed from "Jelajahi UMKM" to "Jelajahi Potensi Desa" (links to /potentials)
- FeaturedPotentialsSection: renamed "UMKM Unggulan" to "Potensi Unggulan", CTA to /potentials
- StatisticsSection: renamed "UMKM Aktif" to "Potensi UMKM", added "Kategori Desa"
- HeroStatisticsCard: relabeled cells to village-centric terminology
- MapSection: replaced embedded Leaflet map with static premium SVG map preview
- Landing page section order: Hero → Categories → Statistics → Map Preview → Potensi Unggulan → News → Footer
- Header: 88px height, transparent→solid scroll, "Dashboard Admin" CTA
- Footer: 4-column layout (Village, Quick Links, Contact, Village Location)
### Added
- NewsSection organism with mock data (3 articles, desktop grid, mobile scroll)
- HeroStatisticsCard molecule (2×2 glassmorphism card in hero right slot)
- Micro-interaction utilities in index.css (hover-lift, img-zoom, animate-fade-in-up)
- Types: NewsArticle in src/types/News.ts
- Mock data: src/mocks/news.ts

## [Phase 13D: UI Polish & Design System] - 2026-07-10
### Changed — index.css
- Added complete typography utility classes (`text-display`, `text-h1`–`text-h4`, `text-body-lg`, `text-body`, `text-caption`, `text-label`) mapped exactly to DESIGN_SYSTEM.md §3.2 type scale.
- Added responsive typography breakpoints for display and h1.
- Added `section-padding` utility (80px desktop, 48px mobile) per DS §4 spacing system.
- Added `@keyframes shimmer` + `.animate-shimmer` for proper gradient skeleton loading (replaces `animate-pulse`).
- Added `scrollbar-none` utility for chip overflow rows.
- Added explicit container system (720px / 960px / 1200px breakpoints) per DS §7.1.
- Added global `:focus-visible` ring rule; suppressed `:focus` for mouse users.
- Added `scroll-behavior: smooth` and `min-height: 100dvh`.

### Changed — Button.tsx
- Added `gap-2` for icon+text spacing.
- Primary/secondary: hover lift (`-translate-y-0.5`) + `shadow-md`, active reset.
- `pointer-events-none` on disabled.
- Size heights match DS exactly: sm=32px, md=40px, lg=48px.

### Changed — Card.tsx
- Resting: `shadow-md` (was `shadow-sm`).
- Hover: `shadow-lg` + `-translate-y-1.5` (was `-translate-y-1 + shadow-md`).
- Background: `--bg-surface` (was hardcoded `white`).

### Changed — Badge.tsx
- Typography: uses `text-label` utility class (12px/600/0.04em tracking) per DS §3.2.
- Added `gap-1` for potential icon inside badge.

### Changed — Chip.tsx
- Padding: `px-3.5 py-1.5` (was `px-3`).
- Default state: explicit `bg-[--bg-surface]` background.
- Added `focus-visible:ring-offset-1`.
- Hover: `hover:bg-[--neutral-50]` subtle fill.
- Active: `shadow-sm`.

### Changed — Skeleton.tsx
- Replaced `animate-pulse bg-[--neutral-200]` with `animate-shimmer` gradient sweep.

### Changed — SearchBar.tsx
- Added `variant="hero"` prop: renders a pill-shaped container with backdrop blur, xl shadow, and "Cari Sekarang" larger CTA.
- Added `role="search"` ARIA attribute.
- `variant="default"` unchanged for toolbar use.

### Changed — PotentialCard.tsx
- Category badge moved to **top-left** (was top-right) per DS §8.7.
- Badge color: `primary` (was `gray`).
- Placeholder: `ImageOff` icon (was plain text).
- Image hover: `group-hover:scale-105` via parent group.
- Typography: `text-h4` title, `text-caption` description and location.
- Wrapped in `<article>` semantic tag per DS §8.7 accessibility.

### Changed — HeroBanner.tsx
- Hero height: `clamp(480px, 70vh, 680px)` — cinematic ratio.
- Overlay: `--bg-hero-overlay` (45% dark) per DS §2.4.
- Bottom gradient fade for depth.
- Location badge above title.
- Title: `text-display` class (48px/800/−0.02em).
- Subtitle: `text-body-lg` class (18px/400).
- Hero search bar: `variant="hero"` pill shape with backdrop blur.
- Popular search quick-links below search bar.
- Removed `aria-hidden` bug on background image — now properly `alt=""`.

### Changed — Header.tsx
- Transparent header on homepage above fold, solid on scroll (40px threshold).
- Active page link underline indicator (`aria-current="page"`).
- Logo: icon badge + text, adapts color for transparent/solid states.
- `useLocation` for active state detection.
- Closes mobile menu on route change.

### Changed — MobileNavigation.tsx
- Added `id` and `activeHref` props.
- Active link: tinted green background.
- Proper close button instead of relying on parent.
- Footer CTA: "Login Administrator".

### Changed — Footer.tsx
- Complete rewrite: brand column, navigation column, address/contact column.
- Village address, phone, email as proper `<address>` semantic element.
- Removed `ContactCard` dependency.
- `text-label` uppercase tracking for section headings.

### Changed — StatisticsSection.tsx
- Cards: `rounded-[--radius-xl]`, `shadow-md`, hover `shadow-lg`.
- Icon containers: colored soft backgrounds per icon type (green/amber/blue/orange).
- Values: `text-h2` scale (was `text-3xl`).
- Labels: `text-label` uppercase tracking.
- `section-padding` utility (was `py-16`).

### Changed — FeaturedPotentialsSection.tsx
- `section-padding` (was `py-16`).
- Cards: `rounded-[--radius-xl]`, badge top-left, `text-h4` title.
- "Lihat Semua" button: `variant="outline"` (was `ghost`).

### Changed — CategorySection.tsx
- `section-padding` (was `py-16`).
- Chips: larger skeletons (`h-10 w-28`).

### Changed — PotentialsDirectory.tsx
- Page header: `text-label` kicker + `text-h1` title + `text-body` subtitle.

### Changed — PotentialDetail.tsx
- Cover image: `rounded-[--radius-2xl]`, `shadow-lg`.
- Title: `text-h1` scale.
- Description: wrapped in card surface with padding.
- Contact items: individual rounded tiles with `bg-[--neutral-50]`.
- Gallery images: hover scale effect.
- All typography uses DS utility classes.



## [Phase 13C: Public Directory & Detail Pages] - 2026-07-10
### Added
- `DirectoryToolbar` organism: unified search input + ACA category filter chips with "Semua" toggle.
- `DirectoryGrid` organism: responsive 4-col grid with loading skeletons, empty state, error state, and integrated `Pagination`.
- `MetadataRenderer` molecule: ACA dynamic rendering engine — iterates `metadata` key-value pairs without category-specific conditional code. Renders comma-separated values as tag chips.
- `PotentialsDirectory` page: full API integration via `usePotentials` and `useCategories` hooks. URL state sync (`?search=`, `?category=`, `?page=`), 400ms debounced search, shareable/bookmarkable filter state.
- `PotentialDetail` page: full implementation with cover image, gallery, description, `MetadataRenderer` for ACA metadata, and `AdaptiveContactButton` (BR-CON-01 fallback: WhatsApp → Phone → Email → Website → disabled).
- Extended `Button` atom with `as="a"` polymorphism for rendering anchor tags with button styling.
- `StatisticsSectionSkeleton` export in `StatisticsSection` for loading state on homepage.

### Changed
- `Home.tsx`: replaced all mock data with real API hooks (`useStatistics`, `useCategories`, `usePotentials?featured=true`). Hero image remains local placeholder (no endpoint).
- `StatisticsSection` organism: refactored to accept `StatisticsSummary` from API instead of `Statistic[]` mock shape. Added `StatisticsSectionSkeleton`.
- `FeaturedPotentialsSection` organism: refactored to accept `PotentialListItem[]` from API with `isLoading` skeleton support.
- `CategorySection` organism: refactored to accept `Category[]` from API with `isLoading` skeleton support.

### Fixed
- `CategoryChip` molecule: corrected `category.name` → `category.label` and `category.icon` → `category.icon_key` to match the `Category` type definition.

## [Phase 13B: Public Website UI] - 2026-07-10
### Added
- Built full Atomic Design component library: 10 Atoms, 6 Molecules, 7 Organisms, 1 Template.
- Implemented `Header` organism with sticky blur backdrop, desktop nav, and mobile toggle.
- Implemented `MobileNavigation` organism with escape-key and backdrop-click dismiss.
- Implemented `HeroBanner` organism with background image overlay and integrated SearchBar.
- Implemented `StatisticsSection`, `FeaturedPotentialsSection`, and `CategorySection` organisms.
- Implemented `Footer` organism with multi-column layout, quick links, and contact info.
- Assembled `LandingPageTemplate` composing all landing sections.
- Centralized all mock data in `src/mocks/home.ts` (hero, statistics, categories, potentials).
- Created shared TypeScript interfaces: `Category`, `Potential`, `Statistic` in `src/types/`.
- Integrated `Header` and `Footer` into `PublicLayout`.
- Updated `Home.tsx` to use template with mock data — no API calls.
- All components are fully typed, presentational-only, and use `clsx` for conditional classes.
- Verified: `npm run lint` (0 warnings/errors), `npm run type-check` (0 errors), `npm run build` (✓ success).

## [Phase 13A: Frontend Foundation] - 2026-07-10
### Added
- Initialized Vite + React + TypeScript project for frontend.
- Configured Tailwind CSS v4 mapped with design system tokens.
- Established Atomic Design directory structure (`components`, `layouts`, `pages`, etc.).
- Configured React Router v7 with placeholder routes (`/`, `/potentials`, `/map`, `/login`, `/admin`).
- Set up Axios client with Sanctum token injection and 401 redirect handling.
- Configured TanStack Query `QueryClient` and `QueryProvider`.
- Added reusable foundation components: `LoadingSpinner`, `EmptyState`, `AppErrorBoundary`.
- Enforced code quality standards: strict TypeScript, ESLint (`oxlint`), Prettier-ready format.

## [Phase 11: Testing & QA Audit (Backend)] - 2026-07-10
### Added
- Completed comprehensive backend QA Audit.
  - Test Suite: 65 tests passed (357 assertions).
  - API Routes: Verified 26 REST-compliant routes. No duplicates.
  - Code Quality: Confirmed zero unused imports, dead code, or placeholder controllers.
  - Security & Performance: Verified Sanctum auth, eager loading, cache invalidation, and transactional integrity.
  - Documentation fully synchronized.

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
