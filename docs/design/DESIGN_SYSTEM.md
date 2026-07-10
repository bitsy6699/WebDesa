# Design System Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Design Philosophy

This design system establishes the visual language for a **Digital Village Showcase Platform**. Every design decision reflects nature, community, warmth, and premium exploration aesthetics.

**Visual Inspirations:**
- Tourism destination landing pages (editorial photography, large whitespace)
- Apple-inspired clean UI (minimal chrome, precise typography)
- Airbnb editorial layouts (card-based discovery, warm photography)
- Modern SaaS dashboards (admin panel only)

**Core Feelings:**
Modern · Natural · Warm · Premium · Minimal · Calm · Trustworthy

**Anti-Patterns (Strictly Avoided):**
- ❌ Bootstrap-default styling
- ❌ Bureaucratic government portal aesthetics
- ❌ Corporate enterprise dashboard feel
- ❌ Overly decorative or cluttered interfaces

---

## 2. Color System

### 2.1. Brand Colors

| Token | Name | HEX | HSL | Usage |
| --- | --- | --- | --- | --- |
| `--color-primary` | Forest Green | `#16A34A` | `hsl(142, 76%, 36%)` | Primary CTAs, active states, brand anchors |
| `--color-primary-light` | Soft Green | `#22C55E` | `hsl(142, 71%, 45%)` | Hover states, badges, highlights |
| `--color-primary-dark` | Deep Green | `#15803D` | `hsl(142, 72%, 29%)` | Active/pressed button states |
| `--color-secondary` | Warm Amber | `#D97706` | `hsl(38, 92%, 44%)` | Secondary CTAs, featured badges, accents |
| `--color-secondary-light` | Golden Amber | `#F59E0B` | `hsl(43, 96%, 50%)` | Hover states for secondary elements |
| `--color-accent` | Sky Blue | `#0EA5E9` | `hsl(199, 89%, 48%)` | Map highlights, informational badges, links |

### 2.2. Semantic Colors

| Token | Name | HEX | Usage |
| --- | --- | --- | --- |
| `--color-success` | Success Green | `#16A34A` | Confirmation messages, published status |
| `--color-warning` | Warning Amber | `#EAB308` | Draft status badges, caution alerts |
| `--color-error` | Error Red | `#DC2626` | Validation errors, destructive actions |
| `--color-info` | Info Blue | `#0EA5E9` | Informational banners, tooltips |

### 2.3. Neutral Scale

| Token | HEX | Usage |
| --- | --- | --- |
| `--neutral-50` | `#FAFAF9` | Page background |
| `--neutral-100` | `#F5F5F4` | Card backgrounds, section fills |
| `--neutral-200` | `#E7E5E4` | Border lines, dividers |
| `--neutral-300` | `#D6D3D1` | Disabled input borders |
| `--neutral-400` | `#A8A29E` | Placeholder text |
| `--neutral-500` | `#78716C` | Caption text, secondary labels |
| `--neutral-600` | `#57534E` | Body text |
| `--neutral-700` | `#44403C` | Subheadings |
| `--neutral-800` | `#292524` | Headings, primary text |
| `--neutral-900` | `#1C1917` | Display titles, high-emphasis text |

### 2.4. Surface & Layout Colors

| Token | HEX | Usage |
| --- | --- | --- |
| `--bg-page` | `#FAFAF9` | Root page background (warm off-white) |
| `--bg-surface` | `#FFFFFF` | Card surfaces, modals, dropdowns |
| `--bg-surface-alt` | `#F5F5F4` | Alternating section backgrounds |
| `--bg-hero-overlay` | `rgba(28, 25, 23, 0.45)` | Hero banner text overlay |
| `--border-default` | `#E7E5E4` | Standard component borders |
| `--border-focus` | `#16A34A` | Focus ring color for accessibility |

### 2.5. Accessibility Contrast Rules
- All body text over `--bg-page` or `--bg-surface` must maintain a minimum contrast ratio of **4.5:1**.
- Large text (headings ≥ 18px bold) must maintain a minimum contrast ratio of **3:1**.
- Interactive elements (buttons, links) must pass WCAG AA against their backgrounds.

---

## 3. Typography System

### 3.1. Font Families
- **Heading Font:** `'Plus Jakarta Sans', sans-serif` — Geometric, modern, highly readable.
- **Body Font:** `'Inter', sans-serif` — Neutral, optimized for screens, excellent at small sizes.

Both fonts are available via Google Fonts and must be loaded with `font-display: swap`.

### 3.2. Type Scale

| Token | Element | Size | Weight | Line Height | Letter Spacing | Usage |
| --- | --- | --- | --- | --- | --- | --- |
| `--text-display` | Display | `48px` / `3rem` | 800 | 1.1 | `-0.02em` | Hero headline |
| `--text-h1` | H1 | `36px` / `2.25rem` | 700 | 1.2 | `-0.015em` | Page titles |
| `--text-h2` | H2 | `28px` / `1.75rem` | 700 | 1.25 | `-0.01em` | Section headings |
| `--text-h3` | H3 | `22px` / `1.375rem` | 600 | 1.3 | `0em` | Subsection headings |
| `--text-h4` | H4 | `18px` / `1.125rem` | 600 | 1.35 | `0em` | Card titles |
| `--text-body-lg` | Body Large | `18px` / `1.125rem` | 400 | 1.6 | `0em` | Lead paragraphs |
| `--text-body` | Body | `16px` / `1rem` | 400 | 1.6 | `0em` | Default body copy |
| `--text-caption` | Caption | `14px` / `0.875rem` | 400 | 1.5 | `0.01em` | Metadata, timestamps |
| `--text-label` | Label | `12px` / `0.75rem` | 600 | 1.4 | `0.04em` | Form labels, badges, tags |

### 3.3. Responsive Typography
- Display headings scale down to `32px` on tablet and `28px` on mobile.
- H1 scales to `28px` on tablet and `24px` on mobile.
- Body text remains `16px` across all breakpoints for readability.

---

## 4. Spacing System (8-Point Grid)

All spacing values are multiples of `4px`, with the primary rhythm based on `8px` increments.

| Token | Value | Common Usage |
| --- | --- | --- |
| `--space-1` | `4px` | Inline element gaps, icon-to-text spacing |
| `--space-2` | `8px` | Tight component padding, badge internal padding |
| `--space-3` | `12px` | Input internal padding, compact card padding |
| `--space-4` | `16px` | Standard component padding, form field gaps |
| `--space-5` | `20px` | Card content padding |
| `--space-6` | `24px` | Section internal padding |
| `--space-8` | `32px` | Component group margins |
| `--space-10` | `40px` | Major section separations |
| `--space-12` | `48px` | Section top/bottom padding (desktop) |
| `--space-16` | `64px` | Large section spacing |
| `--space-20` | `80px` | Homepage section vertical spacing (desktop) |
| `--space-24` | `96px` | Hero section vertical padding |
| `--space-30` | `120px` | Maximum section separation |

---

## 5. Border Radius Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-sm` | `6px` | Badges, tags, small chips |
| `--radius-md` | `8px` | Inputs, buttons, small cards |
| `--radius-lg` | `12px` | Standard cards, dropdowns, modals |
| `--radius-xl` | `16px` | Featured cards, hero overlays |
| `--radius-2xl` | `24px` | Hero search bar, floating stat cards |
| `--radius-full` | `9999px` | Avatar circles, pill buttons, category chips |

---

## 6. Shadow System (Elevation Levels)

| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-sm` | `0 1px 2px 0 rgba(0,0,0,0.05)` | Subtle card resting state |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)` | Cards, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)` | Elevated cards on hover, popovers |
| `--shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)` | Floating action bars, modals |
| `--shadow-glass` | `0 8px 32px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.1)` | Glassmorphism panels (hero stat cards) |

---

## 7. Grid & Layout System

### 7.1. Container Widths

| Breakpoint | Label | Container Max Width |
| --- | --- | --- |
| `≥ 1280px` | Desktop | `1200px` |
| `1024px – 1279px` | Laptop | `960px` |
| `640px – 1023px` | Tablet | `720px` |
| `< 640px` | Mobile | `100% - 32px` (16px padding each side) |

### 7.2. Grid Columns

| Breakpoint | Columns | Gutter |
| --- | --- | --- |
| Desktop | 12 | `24px` |
| Laptop | 12 | `20px` |
| Tablet | 6 | `16px` |
| Mobile | 4 | `16px` |

### 7.3. Content Card Grid

| Breakpoint | Cards Per Row |
| --- | --- |
| Desktop | 4 |
| Laptop | 3 |
| Tablet | 2 |
| Mobile | 1 |

---

## 8. Component Library

### 8.1. Navbar
- **Purpose:** Global navigation across public pages.
- **Variants:** Transparent (hero overlay), Solid (scrolled state).
- **States:** Default, Scrolled (adds background + shadow), Mobile Drawer Open.
- **Behavior:** Sticky to viewport top. On scroll past hero height, transitions from transparent to solid white with `--shadow-sm`. Mobile: Collapses into hamburger icon opening a full-screen overlay drawer.
- **Responsive:** Desktop renders inline horizontal links. Mobile renders hamburger trigger opening slide drawer from right edge.
- **Accessibility:** All nav items are keyboard-focusable. Active page link receives `aria-current="page"`.

### 8.2. Hero Section
- **Purpose:** Full-bleed visual introduction and primary CTAs.
- **Variants:** Homepage (with search bar + stats overlay), Interior Page (compact header banner).
- **States:** Default.
- **Behavior:** Background image covers viewport width. Text overlay with semi-transparent gradient. Parallax scroll optional.
- **Responsive:** Desktop: Centered content, floating stats cards to the side. Mobile: Stacked vertically, stats cards collapse into horizontal scroll strip.
- **Accessibility:** Background image is decorative (`aria-hidden`). CTAs meet minimum `48px` touch target.

### 8.3. Global Search Bar
- **Purpose:** Unified search input for discovering potentials.
- **Variants:** Hero (large, prominent), Navbar (compact inline).
- **States:** Default, Focused, Loading, Has Results.
- **Behavior:** Debounced keystroke query (300ms). Displays dropdown suggestion list below input.
- **Responsive:** Full width on mobile. Max `600px` on desktop.
- **Accessibility:** `role="search"`, `aria-label="Cari potensi desa"`, linked label element.

### 8.4. Category Chip
- **Purpose:** Filter toggles representing ACA categories.
- **Variants:** Default, Active/Selected.
- **States:** Default (outline), Hover (filled background), Active (solid primary fill, white text).
- **Behavior:** Click toggles category filter state on directory and map views.
- **Responsive:** Horizontal scroll container on mobile; wrapping grid on desktop.
- **Accessibility:** `role="button"`, `aria-pressed="true|false"`.

### 8.5. Buttons
- **Purpose:** Primary interactive action triggers.
- **Variants:** Primary (green fill), Secondary (amber fill), Outline (bordered, transparent fill), Ghost (text-only), Danger (red fill, CMS delete actions).
- **Sizes:** Small (`32px` height), Medium (`40px` height), Large (`48px` height).
- **States:** Default, Hover (slight lift + shadow), Active/Pressed (darker shade), Disabled (50% opacity, cursor not-allowed), Loading (spinner icon replaces label text).
- **Behavior:** All buttons use `--radius-md`. Primary fills use white text. Outline uses primary-colored text and border.
- **Responsive:** Full-width stacking on mobile for CTA groups.
- **Accessibility:** Minimum touch target `44px`. Disabled buttons include `aria-disabled="true"`.

### 8.6. Inputs & Form Fields
- **Purpose:** Data entry for CMS and search interfaces.
- **Variants:** Text Input, Textarea, Select Dropdown, File Upload, Coordinate Picker.
- **States:** Default (neutral border), Focused (primary-colored border + ring), Error (red border + helper text), Disabled (gray background).
- **Behavior:** Labels always positioned above inputs. Error messages render below the field. Helper text renders in caption size.
- **Responsive:** Full-width on all breakpoints.
- **Accessibility:** Every input requires an associated `<label>` element. Error messages use `role="alert"`.

### 8.7. Unified Potential Card
- **Purpose:** Single reusable card for all potential categories (UMKM, Tourism, Agriculture, etc.).
- **Variants:** Standard (vertical), Featured (larger, with badge overlay).
- **States:** Default, Hover (lift + shadow-lg transition).
- **Behavior:** Cover image fills top section (aspect ratio `16:9`). Category badge overlays top-left corner. Title, short description, and location render below image. Bottom action row contains Adaptive Contact button.
- **Responsive:** Full-width single column on mobile. Grid columns on desktop/tablet (see Grid System).
- **Accessibility:** Card is wrapped in a semantic `<article>` tag. Image has descriptive `alt` text.

### 8.8. Statistic Card
- **Purpose:** Display numeric village metrics on homepage and stats page.
- **Variants:** Compact (homepage floating overlay), Full (statistics page).
- **States:** Default, Loading (skeleton).
- **Behavior:** Displays icon, metric label, and count value. Glassmorphism treatment on hero overlay variant.
- **Responsive:** Horizontal scroll row on mobile. Grid on desktop.
- **Accessibility:** Numbers use `aria-label` describing the metric context.

### 8.9. Map Popup Card
- **Purpose:** Quick-view overlay on Leaflet pin selection.
- **Variants:** Standard.
- **States:** Open, Closed.
- **Behavior:** Opens on marker click. Displays thumbnail, title, category badge, and "Lihat Detail" link. Closes on map click or close icon.
- **Responsive:** Fixed width `280px`. Adjusts position based on viewport edge proximity.
- **Accessibility:** Popup is keyboard-dismissible (`Escape` key). Focus traps inside popup when open.

### 8.10. Badge
- **Purpose:** Category labels, status indicators.
- **Variants:** Category Badge (colored by category), Status Badge (Published/Draft/Archived).
- **States:** Default.
- **Behavior:** Pill-shaped with `--radius-full`. Small padding. Text uses `--text-label` scale.
- **Responsive:** Consistent sizing across breakpoints.
- **Accessibility:** Descriptive text content; avoid color-only signaling.

### 8.11. Dropdown
- **Purpose:** Selection menus for category filters and form selects.
- **Variants:** Single Select, Multi Select (future).
- **States:** Closed, Open, Item Hover, Item Selected.
- **Behavior:** Opens below trigger. Closes on outside click or selection. Uses `--shadow-md` elevation.
- **Responsive:** Full-width on mobile.
- **Accessibility:** `role="listbox"`, arrow key navigation, `aria-expanded` state.

### 8.12. Pagination
- **Purpose:** Navigate between pages of directory listings.
- **Variants:** Standard (numbered), Compact (prev/next only on mobile).
- **States:** Default, Active Page (primary fill), Disabled (first/last boundaries).
- **Behavior:** Renders page numbers with ellipsis truncation for large sets.
- **Responsive:** Collapses to prev/next arrows on mobile.
- **Accessibility:** `aria-label="Pagination"`, current page marked with `aria-current="page"`.

### 8.13. Modal Dialog
- **Purpose:** Confirmation prompts (delete actions) and detailed previews.
- **Variants:** Confirmation (destructive action warning), Information.
- **States:** Open, Closed.
- **Behavior:** Centers on viewport with backdrop overlay (`rgba(0,0,0,0.5)`). Uses `--shadow-xl`. Closes on backdrop click, close button, or `Escape` key.
- **Responsive:** Max width `480px` on desktop. Full-width with bottom-sheet behavior on mobile.
- **Accessibility:** Focus traps inside modal. `role="dialog"`, `aria-modal="true"`.

### 8.14. Drawer (Mobile Nav)
- **Purpose:** Off-canvas navigation panel for mobile screens.
- **Variants:** Right-slide (public nav), Left-slide (CMS sidebar).
- **States:** Open, Closed.
- **Behavior:** Slides in from edge with backdrop. Contains navigation links and close button.
- **Responsive:** Mobile only.
- **Accessibility:** Focus trap active while open. `Escape` key closes.

### 8.15. Toast Notification
- **Purpose:** Transient success/error feedback messages in CMS.
- **Variants:** Success (green), Error (red), Warning (amber), Info (blue).
- **States:** Visible (slide-in), Auto-dismiss (3 seconds).
- **Behavior:** Appears at top-right corner. Stacks if multiple toasts fire simultaneously.
- **Responsive:** Full-width banner on mobile.
- **Accessibility:** `role="alert"`, `aria-live="polite"`.

### 8.16. Empty State
- **Purpose:** Friendly placeholder when no data exists.
- **Variants:** Search (no results), Directory (no listings), CMS (no entries created yet).
- **States:** Default.
- **Behavior:** Centered illustration, descriptive text, and optional CTA button.
- **Responsive:** Consistent behavior.
- **Accessibility:** Descriptive text conveys state.

### 8.17. Loading Skeleton
- **Purpose:** Shimmer placeholders during data fetch.
- **Variants:** Card Skeleton, Table Row Skeleton, Text Block Skeleton.
- **States:** Animating.
- **Behavior:** Renders gray block shapes mirroring the target component layout with a horizontal shimmer pulse.
- **Responsive:** Matches target component responsive sizing.
- **Accessibility:** `aria-busy="true"`, `aria-label="Loading"`.

### 8.18. Data Table (CMS)
- **Purpose:** Listing management view in admin dashboard.
- **Variants:** Standard.
- **States:** Default, Row Hover, Row Selected.
- **Behavior:** Sortable column headers. Inline action buttons (Edit, Delete). Supports pagination. Search bar integration.
- **Responsive:** Horizontal scroll wrapper on mobile. Priority columns remain visible; secondary columns collapse.
- **Accessibility:** `<table>` with `<thead>`, `<tbody>`, and scoped column headers.

### 8.19. Chart Components (Statistics)
- **Purpose:** Chart.js visualizations on the statistics page.
- **Variants:** Bar Chart, Pie/Doughnut Chart.
- **States:** Default, Hover (tooltip), Loading (skeleton).
- **Behavior:** Responsive canvas sizing. Tooltip on hover/tap.
- **Responsive:** Charts scale to container width.
- **Accessibility:** Provide adjacent HTML table as fallback for screen readers.

### 8.20. Footer
- **Purpose:** Site closing navigation, contact info, copyright.
- **Variants:** Standard.
- **States:** Default.
- **Behavior:** Multi-column layout with sitemap links, village contact details, social media icons, and copyright year (dynamically rendered).
- **Responsive:** Stacks into single column on mobile.
- **Accessibility:** Wrapped in `<footer>` semantic tag. Links are keyboard-navigable.

---

## 9. Motion & Animation System

### 9.1. Philosophy
Animations should feel natural, subtle, and purposeful. Motion communicates state changes and spatial relationships without distracting from content. Framer Motion is the recommended React animation library.

### 9.2. Duration Tokens

| Token | Duration | Usage |
| --- | --- | --- |
| `--duration-fast` | `150ms` | Hover effects, button state changes, tooltip show |
| `--duration-normal` | `300ms` | Card transitions, dropdown open/close, search results |
| `--duration-slow` | `500ms` | Page section reveals, modal open/close, drawer slide |

### 9.3. Easing Curves

| Token | Value | Usage |
| --- | --- | --- |
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General purpose transitions |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting view |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering view |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful micro-interactions (badge bounce) |

### 9.4. Animation Behaviors
- **Card Hover:** `transform: scale(1.02)` + `box-shadow` transition. Duration: `--duration-fast`.
- **Page Section Entrance:** Fade-in from `opacity: 0` + `translateY(20px)` triggered on scroll into viewport. Duration: `--duration-slow`.
- **Skeleton Shimmer:** Horizontal gradient slide loop. Duration: `1.5s` infinite.
- **Modal Entrance:** Fade-in backdrop + scale-up content from `0.95` to `1`. Duration: `--duration-slow`.
- **Toast Slide-in:** Translate from off-screen right. Duration: `--duration-normal`.

### 9.5. When NOT to Animate
- Avoid animation on initial critical content rendering (hero text, navigation links).
- Avoid animation on form validation error displays (errors should appear instantly).
- Respect `prefers-reduced-motion` media query: Disable all non-essential animations.

---

## 10. Iconography

- **Recommended Library:** [Lucide Icons](https://lucide.dev/) — Consistent stroke-based, open-source icon set.
- **Stroke Width:** `1.5px` (matches the minimal, clean aesthetic).
- **Sizing Tokens:**

| Token | Size | Usage |
| --- | --- | --- |
| `--icon-sm` | `16px` | Inline text icons, badges |
| `--icon-md` | `20px` | Button icons, form field indicators |
| `--icon-lg` | `24px` | Navigation icons, card action icons |
| `--icon-xl` | `32px` | Category cards, empty state illustrations |

- **Color Rules:** Icons inherit the text color of their parent container. Interactive icons use `--color-primary` on hover.

---

## 11. Photography Guidelines

- **Style:** Authentic, natural-light photography depicting real village landscapes, local products, community activities, and agricultural scenes.
- **Avoid:** Generic stock photography, office settings, urban cityscapes.
- **Aspect Ratios:**
  - Hero Banner: `21:9` (ultrawide cinematic).
  - Card Thumbnails: `16:9` (landscape).
  - Gallery Grid: `4:3` (standard).
  - Avatar/Profile: `1:1` (square, cropped to circle).
- **Compression:** All images processed through backend pipeline (max width `1200px`, WebP format, 80% quality). See BR-MED-01.

---

## 12. Illustration Guidelines

- **Style:** Flat, minimal, outline-based illustrations using earth-tone color palettes.
- **Color Palette:** Use `--color-primary`, `--color-secondary`, and `--neutral-300` for illustration fills.
- **Usage:** Empty states, onboarding hints, error pages (404), loading placeholders.
- **Avoid:** 3D renders, overly detailed illustrations, photorealistic drawings.

---

## 13. Accessibility Standards (WCAG 2.1 AA)

- **Color Contrast:** Minimum `4.5:1` for normal text, `3:1` for large text and UI components.
- **Keyboard Navigation:** All interactive elements reachable via `Tab` key. Logical tab order follows DOM reading order.
- **Focus Indicators:** Visible `2px` outline ring using `--border-focus` color on all focusable elements. Never suppress `:focus-visible`.
- **Touch Targets:** Minimum interactive target size of `44px × 44px` on touch devices.
- **ARIA Patterns:** Modals use `role="dialog"` + `aria-modal`. Alerts use `role="alert"`. Navigation uses `role="navigation"`. Active page links use `aria-current="page"`.
- **Reduced Motion:** Honor `prefers-reduced-motion: reduce` by disabling non-critical animations.

---

## 14. Future Scalability

This design system is constructed to support unlimited module expansions through the Adaptive Content Architecture (ACA):
- **Category Chips** automatically render new filter options when CMS categories are added.
- **Unified Potential Cards** display any category type without layout modification.
- **Map Pins** accept new category color mappings through the badge color system.
- **Navigation** dynamically lists active modules without hardcoded menu items.
- **Charts** accept new data series for additional category distributions.

No component redesign is required when Tourism, Agriculture, Livestock, Public Facilities, Culture, News, or Gallery modules are activated.
