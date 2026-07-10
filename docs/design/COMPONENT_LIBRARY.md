# Component Library Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Component Architecture

This library follows **Atomic Design** principles. Components are organized into five tiers:

1. **Atoms** — Indivisible UI primitives (buttons, inputs, icons).
2. **Molecules** — Small groups of atoms forming functional units (search bar, stat card).
3. **Organisms** — Complex compositions forming distinct page sections (navbar, hero, map).
4. **Templates** — Page-level wireframe structures combining organisms.
5. **Pages** — Final rendered views populated with real data.

### Naming Convention
- **Component Name:** PascalCase (e.g., `UnifiedPotentialCard`).
- **Component ID:** Tier prefix + sequential number (e.g., `ATOM-01`, `MOL-05`, `ORG-03`).
- **File Naming:** PascalCase filename matching component name (e.g., `Button.tsx`).

### Reusability Principle
Every component in this library is designed for **Adaptive Content Architecture (ACA)** compatibility. Components accept dynamic category data via props and never hardcode category labels, colors, or metadata structures. When Tourism, Agriculture, or any future module is activated via the CMS, these components render correctly without code modification.

---

## 2. Atoms

### ATOM-01: Button
- **Purpose:** Primary interactive action trigger across all pages.
- **Props:**
  - `variant`: `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'` — Required.
  - `size`: `'sm' | 'md' | 'lg'` — Default: `'md'`.
  - `disabled`: `boolean` — Default: `false`.
  - `loading`: `boolean` — Default: `false`.
  - `icon`: `ReactNode` — Optional leading icon.
  - `fullWidth`: `boolean` — Default: `false`.
  - `onClick`: `() => void` — Required.
  - `children`: `ReactNode` — Button label.
- **Variants:** Primary (green fill, white text), Secondary (amber fill, white text), Outline (green border, transparent fill), Ghost (text-only, no border), Danger (red fill, white text).
- **States:** Default, Hover (lift + shadow), Active (darker shade), Focused (focus ring), Disabled (50% opacity), Loading (spinner replaces label).
- **Behavior:** Uses `--radius-md`. Transition: `--duration-fast` with `--ease-default`. Loading state disables pointer events.
- **Responsive:** `fullWidth` prop forces 100% width on mobile CTA groups.
- **Accessibility:** Minimum touch target `44px`. Disabled uses `aria-disabled="true"`. Loading uses `aria-busy="true"`.

### ATOM-02: Input
- **Purpose:** Single-line text entry for forms and search.
- **Props:**
  - `type`: `'text' | 'email' | 'password' | 'number' | 'tel' | 'url'` — Default: `'text'`.
  - `label`: `string` — Required.
  - `placeholder`: `string` — Optional.
  - `value`: `string` — Controlled.
  - `error`: `string | null` — Error message text.
  - `disabled`: `boolean` — Default: `false`.
  - `required`: `boolean` — Default: `false`.
  - `maxLength`: `number` — Optional.
  - `onChange`: `(value: string) => void` — Required.
- **States:** Default (`--border-default`), Focused (`--border-focus` + ring), Error (`--color-error` border + error text below), Disabled (gray background).
- **Behavior:** Label positioned above input. Error message renders below in `--text-caption` size with `--color-error`.
- **Responsive:** Full-width on all breakpoints.
- **Accessibility:** `<label>` linked via `htmlFor`. Error text uses `role="alert"`. Required fields use `aria-required="true"`.

### ATOM-03: Textarea
- **Purpose:** Multi-line text entry for descriptions.
- **Props:** Same as ATOM-02, plus `rows`: `number` — Default: `4`.
- **States:** Same as ATOM-02.
- **Behavior:** Auto-resizes optionally based on content.
- **Accessibility:** Same as ATOM-02.

### ATOM-04: Checkbox
- **Purpose:** Boolean toggle for settings and filters.
- **Props:** `label`: `string`, `checked`: `boolean`, `onChange`: `(checked: boolean) => void`, `disabled`: `boolean`.
- **States:** Unchecked, Checked (primary fill + checkmark icon), Disabled.
- **Accessibility:** `role="checkbox"`, `aria-checked`.

### ATOM-05: Toggle Switch
- **Purpose:** On/off status control (e.g., Published/Draft toggle in CMS).
- **Props:** `label`: `string`, `checked`: `boolean`, `onChange`: `(checked: boolean) => void`.
- **States:** Off (neutral track), On (primary track + white knob shift).
- **Behavior:** Smooth knob slide animation (`--duration-fast`).
- **Accessibility:** `role="switch"`, `aria-checked`.

### ATOM-06: Avatar
- **Purpose:** User or entity image thumbnail.
- **Props:** `src`: `string | null`, `alt`: `string`, `size`: `'sm' | 'md' | 'lg'`, `fallback`: `string` (initials).
- **Behavior:** Circular crop using `--radius-full`. Fallback renders initials on neutral background if `src` is null.
- **Accessibility:** `alt` text describes subject.

### ATOM-07: Badge
- **Purpose:** Category labels, status indicators.
- **Props:** `label`: `string`, `variant`: `'category' | 'status'`, `color`: `string` (dynamic hex from category data).
- **Variants:** Category Badge (colored pill matching category color), Status Badge (Published = green, Draft = amber, Archived = neutral).
- **Behavior:** Pill shape using `--radius-full`. Text: `--text-label`.
- **Reusability:** Category color is passed as a prop from the API category object — never hardcoded. New ACA categories automatically receive their CMS-assigned color.
- **Accessibility:** Text content conveys meaning; avoid color-only signaling.

### ATOM-08: Chip
- **Purpose:** Selectable category filter toggle.
- **Props:** `label`: `string`, `icon`: `ReactNode` (optional category icon), `active`: `boolean`, `onClick`: `() => void`.
- **States:** Default (outline, neutral border), Hover (light primary fill), Active (solid primary fill, white text).
- **Behavior:** Click toggles `active` state. Transition: `--duration-fast`.
- **Reusability:** Chip labels and icons are populated dynamically from the CMS category list.
- **Accessibility:** `role="button"`, `aria-pressed="true|false"`.

### ATOM-09: Tag
- **Purpose:** Non-interactive metadata labels on cards and detail pages.
- **Props:** `label`: `string`.
- **Behavior:** Small pill with neutral background. Non-clickable.

### ATOM-10: Spinner
- **Purpose:** Inline loading indicator.
- **Props:** `size`: `'sm' | 'md' | 'lg'`.
- **Behavior:** Rotating circle animation. Uses `--color-primary`.

### ATOM-11: Divider
- **Purpose:** Visual separation between content sections.
- **Props:** `orientation`: `'horizontal' | 'vertical'`.
- **Behavior:** 1px line using `--border-default`.

### ATOM-12: Icon
- **Purpose:** Wrapper for Lucide icon rendering.
- **Props:** `name`: `string` (Lucide icon name), `size`: `'sm' | 'md' | 'lg' | 'xl'`, `color`: `string` (optional).
- **Behavior:** Renders SVG from Lucide library. Defaults to parent text color.
- **Accessibility:** Decorative icons use `aria-hidden="true"`. Meaningful icons require `aria-label`.

### ATOM-13: Tooltip
- **Purpose:** Contextual hover hint.
- **Props:** `content`: `string`, `position`: `'top' | 'bottom' | 'left' | 'right'`, `children`: `ReactNode`.
- **Behavior:** Appears on hover/focus after 200ms delay. Disappears on mouse leave.
- **Accessibility:** `role="tooltip"`, linked via `aria-describedby`.

### ATOM-14: Link
- **Purpose:** Navigational text link.
- **Props:** `href`: `string`, `external`: `boolean` (opens new tab), `children`: `ReactNode`.
- **States:** Default (primary color), Hover (underline), Visited (darker shade).
- **Accessibility:** External links include `rel="noopener noreferrer"` and visual external icon indicator.

### ATOM-15: Typography
- **Purpose:** Consistent text rendering wrapper.
- **Props:** `as`: `'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label' | 'caption'`, `weight`: `number` (optional override), `children`: `ReactNode`.
- **Behavior:** Maps `as` prop to the corresponding Design System type scale token.

---

## 3. Molecules

### MOL-01: SearchBar
- **Purpose:** Global search input with debounced query and optional autocomplete.
- **Props:**
  - `placeholder`: `string` — Default: `"Cari potensi desa..."`.
  - `onSearch`: `(query: string) => void` — Debounced callback.
  - `variant`: `'hero' | 'compact'` — Default: `'compact'`.
  - `loading`: `boolean` — Shows inline spinner.
- **Composition:** ATOM-02 (Input) + ATOM-12 (Search Icon) + ATOM-10 (Spinner).
- **Behavior:** Debounce delay: 300ms. Hero variant renders larger with `--radius-2xl` and prominent shadow. Compact variant fits inside navbar.
- **Responsive:** Full-width on mobile. Max `600px` on desktop (hero variant).
- **Accessibility:** `role="search"`, `aria-label="Cari potensi desa"`.

### MOL-02: CategoryFilter
- **Purpose:** Horizontal row of dynamic category chips for filtering directory and map views.
- **Props:**
  - `categories`: `Category[]` — Array from API.
  - `activeIds`: `string[]` — Currently selected category IDs.
  - `onChange`: `(ids: string[]) => void`.
- **Composition:** Multiple ATOM-08 (Chip) instances.
- **Behavior:** Renders one chip per category. Click toggles filter. Map and directory update reactively.
- **Reusability:** Categories are fetched from the API. Adding a new ACA category in CMS automatically renders a new chip.
- **Responsive:** Horizontal scroll container on mobile. Wrapping flex grid on desktop.
- **Accessibility:** Container uses `role="group"`, `aria-label="Filter kategori"`.

### MOL-03: StatisticCard
- **Purpose:** Display a single numeric metric.
- **Props:**
  - `icon`: `ReactNode` — Metric visual icon.
  - `label`: `string` — Metric name (e.g., "Total UMKM").
  - `value`: `number | string` — Metric count.
  - `variant`: `'default' | 'glass'` — Glass variant for hero overlay.
- **Composition:** ATOM-12 (Icon) + ATOM-15 (Typography).
- **Behavior:** Glass variant applies `--shadow-glass` and semi-transparent background. Default variant uses `--bg-surface` with `--shadow-sm`.
- **Reusability:** Metric label and value are dynamic props. New statistics for future modules pass through the same card.
- **Accessibility:** `aria-label` combining label and value (e.g., "Total UMKM: 48").

### MOL-04: Breadcrumb
- **Purpose:** Hierarchical path navigation.
- **Props:** `items`: `Array<{ label: string, href: string }>`.
- **Composition:** Multiple ATOM-14 (Link) separated by chevron ATOM-12 (Icon).
- **Behavior:** Last item renders as plain text (current page). Previous items are clickable links.
- **Accessibility:** `nav` element with `aria-label="Breadcrumb"`. Current page uses `aria-current="page"`.

### MOL-05: Pagination
- **Purpose:** Page navigation for directory listings.
- **Props:**
  - `currentPage`: `number`.
  - `totalPages`: `number`.
  - `onPageChange`: `(page: number) => void`.
- **Composition:** ATOM-01 (Button, outline variant) instances.
- **Behavior:** Renders numbered buttons with ellipsis truncation for large page counts. Active page uses primary fill.
- **Responsive:** Collapses to prev/next arrows on mobile.
- **Accessibility:** `aria-label="Pagination"`. Active page marked `aria-current="page"`.

### MOL-06: AdaptiveContactButton
- **Purpose:** Single smart contact button implementing the fallback hierarchy defined in BR-CON-01.
- **Props:**
  - `contacts`: `{ whatsapp?: string, phone?: string, email?: string, website?: string, socialMedia?: string[] }` — Merchant contact data.
  - `fallbackWhatsapp`: `string | null` — Village fallback number from global settings.
  - `potentialTitle`: `string` — Used in pre-filled message templates.
- **Composition:** ATOM-01 (Button, primary variant) + ATOM-12 (Icon for resolved channel).
- **Behavior:**
  1. If `contacts.whatsapp` exists → Render WhatsApp button with `wa.me` link and pre-filled message.
  2. Else if `contacts.phone` exists → Render Phone button with `tel:` protocol.
  3. Else if `contacts.email` exists → Render Email button with `mailto:` protocol.
  4. Else if `contacts.website` exists → Render Website link opening in new tab.
  5. Else if `fallbackWhatsapp` exists → Render Village Contact button with context message mentioning `potentialTitle`.
  6. Else → Render disabled button with tooltip: *"Kontak tidak tersedia"*.
- **Reusability:** Works for any ACA potential category. No category-specific logic.
- **Accessibility:** Button label dynamically reflects the resolved channel (e.g., "Chat via WhatsApp", "Hubungi via Telepon").

### MOL-07: EmptyState
- **Purpose:** Friendly placeholder when no data is available.
- **Props:**
  - `variant`: `'search' | 'noData' | 'offline' | 'error'`.
  - `title`: `string`.
  - `description`: `string`.
  - `action`: `{ label: string, onClick: () => void }` — Optional CTA.
- **Composition:** Illustration + ATOM-15 (Typography) + ATOM-01 (Button, optional).
- **Behavior:** Centered layout with descriptive copy and optional action button.

### MOL-08: LoadingSkeleton
- **Purpose:** Shimmer placeholder mirroring target component shapes during data fetch.
- **Props:**
  - `variant`: `'card' | 'table-row' | 'text-block' | 'hero' | 'stat'`.
  - `count`: `number` — Number of skeleton instances to render. Default: `1`.
- **Behavior:** Gray block shapes with horizontal shimmer pulse animation (1.5s infinite loop).
- **Accessibility:** Container uses `aria-busy="true"`, `aria-label="Memuat data"`.

### MOL-09: Toast
- **Purpose:** Transient notification feedback in CMS.
- **Props:**
  - `variant`: `'success' | 'error' | 'warning' | 'info'`.
  - `message`: `string`.
  - `duration`: `number` — Auto-dismiss in ms. Default: `3000`.
- **Composition:** ATOM-12 (Icon) + ATOM-15 (Typography) + Close ATOM-01 (Button, ghost).
- **Behavior:** Slides in from top-right. Auto-dismisses. Stacks if multiple fire.
- **Responsive:** Full-width banner on mobile.
- **Accessibility:** `role="alert"`, `aria-live="polite"`.

### MOL-10: Alert
- **Purpose:** Persistent inline notification for validation feedback or system messages.
- **Props:**
  - `variant`: `'success' | 'error' | 'warning' | 'info'`.
  - `title`: `string` (optional).
  - `message`: `string`.
  - `dismissible`: `boolean` — Default: `false`.
- **Behavior:** Renders inline within content flow. Does not auto-dismiss.
- **Accessibility:** `role="alert"`.

### MOL-11: MapPopupCard
- **Purpose:** Quick-view overlay displayed when a Leaflet marker is clicked.
- **Props:**
  - `thumbnail`: `string` — Cover image URL.
  - `title`: `string`.
  - `category`: `{ label: string, color: string }`.
  - `detailUrl`: `string`.
- **Composition:** Image + ATOM-07 (Badge) + ATOM-15 (Typography) + ATOM-14 (Link).
- **Behavior:** Fixed width `280px`. Opens on marker click. Closes on map click, close icon, or `Escape` key.
- **Accessibility:** Focus traps inside popup. Keyboard-dismissible.

### MOL-12: MediaGallery
- **Purpose:** Image grid displayed on detail pages.
- **Props:**
  - `images`: `Array<{ src: string, alt: string }>`.
- **Behavior:** Grid layout. Click opens lightbox modal. Swipe navigation on mobile.
- **Responsive:** 3-column on desktop, 2-column on tablet, single scrollable row on mobile.
- **Accessibility:** All images require descriptive `alt` text.

---

## 4. Organisms

### ORG-01: Navbar
- **Purpose:** Global top navigation across all public pages.
- **Composition:** Logo + Navigation Links (ATOM-14) + MOL-01 (SearchBar, compact) + ATOM-01 (Button, CTA for admin).
- **Variants:** Transparent (over hero images), Solid (scrolled or interior pages).
- **Behavior:** Sticky to viewport top. Transitions from transparent to solid white with `--shadow-sm` on scroll past hero threshold. Mobile: Collapses into hamburger icon triggering a full-screen Drawer organism.
- **Responsive:** Desktop: inline horizontal links. Mobile: hamburger drawer.
- **Accessibility:** `<nav>` semantic element. Active page link receives `aria-current="page"`. Keyboard tab order follows visual order.

### ORG-02: HeroSection
- **Purpose:** Full-bleed visual introduction with CTAs and optional floating stats.
- **Composition:** Background Image + Overlay + ATOM-15 (Typography, display) + MOL-01 (SearchBar, hero) + ATOM-01 (Buttons, primary + secondary CTAs) + Multiple MOL-03 (StatisticCard, glass variant).
- **Variants:** Homepage (full-height with search bar + stat cards), Interior (compact banner with page title + breadcrumb).
- **Behavior:** Background image covers viewport width. Text overlay with semi-transparent gradient. Stats float as glassmorphism cards.
- **Responsive:** Desktop: centered content, stats to the side. Mobile: stacked vertically, stats become horizontal scroll strip.
- **Accessibility:** Background image is decorative (`aria-hidden`). CTA buttons meet `44px` minimum target.

### ORG-03: QuickCategorySection
- **Purpose:** Dynamic horizontal category card navigation below hero.
- **Composition:** Section heading (ATOM-15) + MOL-02 (CategoryFilter as navigational cards).
- **Behavior:** Each category card displays an icon + label. Click routes user to the Potential Explorer pre-filtered by that category. Categories are dynamically populated from the CMS category API.
- **Reusability:** Automatically renders new categories when added via ACA. Empty categories (zero published potentials) are hidden.

### ORG-04: FeaturedSection
- **Purpose:** Highlighted showcase of admin-selected featured potentials.
- **Composition:** Section heading + horizontal scroll / grid of ORG-07 (UnifiedPotentialCard, featured variant).
- **Behavior:** Queries potentials where `is_featured = true`. Renders as a horizontal carousel on mobile and a grid on desktop.
- **Reusability:** Works for any ACA category. Featured UMKM, Tourism spots, and Agricultural products all render using the same card component.

### ORG-05: InteractiveMap
- **Purpose:** Leaflet-powered geospatial exploration canvas.
- **Composition:** Leaflet Map Container + Marker Cluster Layer + MOL-02 (CategoryFilter overlay) + MOL-11 (MapPopupCard) + MOL-01 (SearchBar overlay).
- **Behavior:**
  - Centers on Karamatwangi coordinates on load.
  - Renders pins from published potentials with valid coordinates.
  - Pins are color-coded by category (color from API category object).
  - Clicking a pin opens MOL-11 (MapPopupCard).
  - Category filter toggles show/hide markers without page reload.
  - Clusters automatically at higher zoom levels.
- **Reusability:** Pin data and filter chips are API-driven. New ACA categories receive distinct pin colors automatically.
- **Responsive:** Full viewport width. Mobile: filter chips overlay as bottom sheet.
- **Accessibility:** Map container has `aria-label="Peta interaktif potensi desa"`. Popup is keyboard-dismissible.

### ORG-06: PotentialGrid
- **Purpose:** Paginated grid directory of all published potentials.
- **Composition:** MOL-01 (SearchBar) + MOL-02 (CategoryFilter) + Grid of ORG-07 (UnifiedPotentialCard) + MOL-05 (Pagination) + MOL-07 (EmptyState fallback).
- **Behavior:** Queries published potentials. Search debounces input. Category chips filter results. Pagination loads next set.
- **Reusability:** Grid renders any ACA category using the same UnifiedPotentialCard.
- **Responsive:** 4 columns desktop, 3 laptop, 2 tablet, 1 mobile.

### ORG-07: UnifiedPotentialCard
- **Purpose:** Single reusable card component for displaying ANY village potential across all current and future categories.
- **Props:**
  - `id`: `string` — Potential ID.
  - `slug`: `string` — URL slug.
  - `coverImage`: `string | null` — Thumbnail URL.
  - `title`: `string`.
  - `category`: `{ slug: string, label: string, color: string }`.
  - `shortDescription`: `string`.
  - `location`: `string` (optional address text).
  - `isFeatured`: `boolean`.
  - `contacts`: `ContactObject` — Passed to MOL-06.
  - `fallbackWhatsapp`: `string | null`.
  - `metadata`: `Record<string, any>` — Dynamic ACA metadata (rendered contextually).
- **Composition:** Image container + ATOM-07 (Badge, category) + ATOM-07 (Badge, featured, conditional) + ATOM-15 (Typography, title + description) + Location line (ATOM-12 icon + text) + MOL-06 (AdaptiveContactButton).
- **Variants:** Standard (vertical card in grid), Featured (slightly larger, with featured badge overlay).
- **States:** Default, Hover (lift `scale(1.02)` + `--shadow-lg`).
- **Behavior:** Cover image uses `16:9` aspect ratio with `object-fit: cover`. Missing image renders neutral placeholder with village icon. Click on card body navigates to detail page (`/potensi/:category.slug/:slug`). Contact button is isolated from card click.
- **Reusability:** This is the core ACA component. The same card renders UMKMs, Tourism spots, Agricultural items, and any future category without code changes. Category badge color and label are driven by API data.
- **Responsive:** Full-width single column on mobile with stacked layout.
- **Accessibility:** Wrapped in `<article>`. Image has descriptive `alt`. Card link uses `aria-label` combining title and category.

### ORG-08: StatisticsSection
- **Purpose:** Chart.js visual dashboard on statistics page and homepage.
- **Composition:** Section heading + MOL-03 (StatisticCard row) + Chart.js Bar Chart + Chart.js Pie Chart.
- **Behavior:** Fetches aggregate counts from API. Renders charts in responsive canvas containers. Hover shows tooltips.
- **Reusability:** Charts accept dynamic datasets. New ACA categories automatically appear as new data segments.
- **Responsive:** Charts scale to container width. Side-by-side on desktop, stacked on mobile.
- **Accessibility:** Adjacent HTML `<table>` fallback for screen readers.

### ORG-09: NewsSection
- **Purpose:** Preview of latest village news articles on homepage.
- **Composition:** Section heading + horizontal scroll or grid of news preview cards.
- **Behavior:** V1: Renders placeholder or static content. Future: Dynamically populated from News ACA category.
- **Reusability:** News cards reuse the UnifiedPotentialCard layout with minor variant adjustments.

### ORG-10: Footer
- **Purpose:** Site-closing navigation block with contact info and sitemap.
- **Composition:** Multi-column layout with ATOM-14 (Link groups) + village contact details + social media ATOM-12 (Icons) + copyright text.
- **Behavior:** Copyright year rendered dynamically.
- **Responsive:** Multi-column on desktop, single stacked column on mobile.
- **Accessibility:** `<footer>` semantic tag. Links keyboard-navigable.

### ORG-11: AdminSidebar
- **Purpose:** CMS navigation panel.
- **Composition:** Logo + vertical nav link list (ATOM-14) + logout ATOM-01 (Button).
- **Menu Items:** Dashboard, Kelola Potensi, Kategori, Media Library, Impor Excel, Pengaturan, Logout.
- **Behavior:** Active route highlights current menu item. Collapsed icon-only mode on smaller CMS screens.
- **Responsive:** Desktop: persistent left sidebar (240px width). Mobile: slide-in drawer.
- **Accessibility:** `<nav>` with `aria-label="Admin navigation"`.

### ORG-12: AdminHeader
- **Purpose:** Top bar in CMS dashboard.
- **Composition:** Page title (ATOM-15) + MOL-04 (Breadcrumb) + Admin avatar (ATOM-06).
- **Behavior:** Displays contextual page title and breadcrumb path.

### ORG-13: DataTable
- **Purpose:** Tabular listing for CMS content management.
- **Props:**
  - `columns`: `Array<{ key: string, label: string, sortable: boolean }>`.
  - `data`: `Array<Record<string, any>>`.
  - `actions`: `Array<{ label: string, icon: string, onClick: (row) => void }>`.
  - `onSearch`: `(query: string) => void`.
  - `pagination`: `PaginationProps`.
- **Composition:** Table header + rows + ATOM-01 (action buttons per row) + MOL-01 (SearchBar) + MOL-05 (Pagination).
- **Behavior:** Sortable column headers (click toggles asc/desc). Inline action buttons: Edit, Delete, Toggle Status. Row hover highlights.
- **Responsive:** Horizontal scroll wrapper on mobile. Priority columns visible; secondary columns hidden behind expand toggle.
- **Accessibility:** `<table>` with `<thead>`, `<tbody>`, scoped `<th>` headers.

### ORG-14: AdminForm
- **Purpose:** Dynamic content creation/editing form in CMS.
- **Props:**
  - `mode`: `'create' | 'edit'`.
  - `category`: `Category` — Determines which metadata fields to render.
  - `initialData`: `Potential | null`.
  - `onSubmit`: `(data: PotentialPayload) => void`.
- **Composition:** ATOM-02 (Input, for title) + ATOM-03 (Textarea, for description) + ORG-15 (CoordinatePicker) + ORG-16 (MediaPicker) + ATOM-05 (Toggle, for publish status) + Dynamic metadata fields rendered from `category.schema_definition`.
- **Behavior:** Form validates on submit. Error states highlight invalid fields. Metadata section dynamically renders input fields based on the selected category's schema definition from the API.
- **Reusability:** The same form component handles UMKM, Tourism, Agriculture, and all future ACA categories by reading the category schema.
- **Accessibility:** All inputs have associated labels. Error messages use `role="alert"`.

### ORG-15: CoordinatePicker
- **Purpose:** Map-based coordinate selection tool for CMS forms.
- **Composition:** Mini Leaflet map + ATOM-02 (Input, latitude) + ATOM-02 (Input, longitude).
- **Behavior:** Admin clicks on map to place pin. Latitude/longitude text inputs auto-populate. Manual text entry also repositions pin on map. Bi-directional sync.
- **Accessibility:** Text inputs serve as accessible fallback for coordinate entry.

### ORG-16: MediaPicker
- **Purpose:** Image selection and upload trigger for CMS forms.
- **Composition:** Upload dropzone + image preview + ATOM-01 (Button, remove).
- **Behavior:** Drag-and-drop or click-to-browse. Preview renders after selection. Backend processes image on form submit (compression per BR-MED-01).
- **Validation:** Max 5MB. Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`.
- **Accessibility:** Dropzone has `aria-label="Upload gambar"`.

### ORG-17: ImportWizard
- **Purpose:** Excel file upload and validation interface.
- **Composition:** File upload dropzone + progress indicator + validation result panel (MOL-10 Alert, success/error).
- **Behavior:** Step 1: Select file. Step 2: Preview parsed row count. Step 3: Confirm import. On validation failure: displays row-level error details. Transaction rollback per BR-CMS-01.

### ORG-18: MediaManager
- **Purpose:** CMS media library grid view.
- **Composition:** Grid of image thumbnails + ATOM-01 (action buttons: copy URL, delete) + MOL-01 (SearchBar).
- **Behavior:** Grid layout of all uploaded assets. Delete action triggers confirmation Modal. Copy URL copies file path to clipboard.

---

## 5. Templates

### TPL-01: HomepageTemplate
- **Layout:** ORG-01 (Navbar, transparent) → ORG-02 (HeroSection, homepage) → ORG-03 (QuickCategorySection) → ORG-04 (FeaturedSection) → ORG-05 (InteractiveMap) → ORG-06 (PotentialGrid, limited preview) → ORG-08 (StatisticsSection) → ORG-09 (NewsSection) → ORG-10 (Footer).

### TPL-02: ExplorerTemplate
- **Layout:** ORG-01 (Navbar, solid) → ORG-02 (HeroSection, interior) → ORG-06 (PotentialGrid, full) → ORG-10 (Footer).

### TPL-03: DetailTemplate
- **Layout:** ORG-01 (Navbar, solid) → MOL-04 (Breadcrumb) → Detail content area (MOL-12 MediaGallery + description + mini map + MOL-06 AdaptiveContactButton + dynamic metadata rendering) → ORG-10 (Footer).

### TPL-04: StatisticsTemplate
- **Layout:** ORG-01 (Navbar, solid) → ORG-02 (HeroSection, interior) → ORG-08 (StatisticsSection, full) → ORG-10 (Footer).

### TPL-05: AdminDashboardTemplate
- **Layout:** ORG-11 (AdminSidebar) + ORG-12 (AdminHeader) + Content area (Dashboard widgets: MOL-03 StatisticCards + recent activity list).

### TPL-06: AdminCRUDTemplate
- **Layout:** ORG-11 (AdminSidebar) + ORG-12 (AdminHeader) + Content area (ORG-13 DataTable or ORG-14 AdminForm).

### TPL-07: AuthenticationTemplate
- **Layout:** Centered card with login form (ATOM-02 Inputs + ATOM-01 Button). No sidebar or navbar.

### TPL-08: ErrorTemplate
- **Layout:** ORG-01 (Navbar, solid) → Centered MOL-07 (EmptyState, error variant) → ORG-10 (Footer).

---

## 6. Pages

| Page ID | Page Name | Route | Template |
| --- | --- | --- | --- |
| PG-01 | Landing Page | `/` | TPL-01 |
| PG-02 | Explore Potentials | `/potensi` | TPL-02 |
| PG-03 | Potential Detail | `/potensi/:category/:slug` | TPL-03 |
| PG-04 | Interactive Map | `/peta` | TPL-02 (map variant) |
| PG-05 | Village Profile | `/profil` | TPL-02 (content variant) |
| PG-06 | Statistics | `/statistik` | TPL-04 |
| PG-07 | Admin Login | `/admin/login` | TPL-07 |
| PG-08 | Admin Dashboard | `/admin/dashboard` | TPL-05 |
| PG-09 | Manage Potentials | `/admin/potensi` | TPL-06 |
| PG-10 | Create/Edit Potential | `/admin/potensi/tambah`, `/admin/potensi/edit/:id` | TPL-06 |
| PG-11 | Media Library | `/admin/media` | TPL-06 |
| PG-12 | Import Excel | `/admin/import` | TPL-06 |
| PG-13 | Website Settings | `/admin/pengaturan` | TPL-06 |
| PG-14 | Error 404 | `*` | TPL-08 |
