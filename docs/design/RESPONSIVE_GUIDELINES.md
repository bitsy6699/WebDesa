# Responsive Guidelines Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Breakpoint Dictionary

The grid layout, columns, typography scaling, and margin spacing adapt dynamically across six primary screen dimensions:

| Breakpoint | Label | Viewport Range | Container Max Width | Grid Columns | Padding / Spacing | Typography Scale |
| --- | --- | --- | --- | --- | --- | --- |
| **Desktop XL** | `2xl` | `≥ 1536px` | `1400px` | 12 | `32px` | Display 100% |
| **Desktop** | `xl` | `1280px – 1535px` | `1200px` | 12 | `24px` | Display 100% |
| **Laptop** | `lg` | `1024px – 1279px` | `960px` | 12 | `20px` | Display 90% |
| **Tablet** | `md` | `768px – 1023px` | `720px` | 6 | `16px` | Headings 85% |
| **Large Mobile** | `sm` | `480px – 767px` | `100% - 32px` | 4 | `16px` | Headings 80% |
| **Small Mobile** | `xs` | `< 480px` | `100% - 24px` | 4 | `12px` | Headings 75% |

---

## 2. Navigation Transformation

The header navigation adapts structurally to optimize interaction and save screen real estate:

- **Desktop & Laptop (`≥ 1024px`):** Renders inline horizontal links. The Admin Dashboard entrance triggers as a clean Outline Button.
- **Tablet (`768px – 1023px`):** Collapses page links into a minimal hamburger icon button (`44px` square). Active status renders a slide-in Hamburger drawer overlay.
- **Mobile (`< 768px`):** The navbar is fixed to the screen top. Clicking the hamburger menu triggers a full-width Slide Drawer overlay. A sticky **"Hubungi Kami"** Floating Action Button (FAB) anchors to the bottom-right viewport corner.

---

## 3. Section Adaptation

### 3.1. Landing Hero
- **Desktop:** Left-to-right split screen layout. Visual photography is displayed on the right; title, tagline, search bar, and primary CTAs align on the left.
- **Tablet:** Vertical layout. Visual photography fills the top block; search parameters and buttons sit directly below.
- **Mobile:** Centered content layout. The background image sits directly behind the text overlay. The floating metrics block collapses from a grid layout into a horizontal, swipeable scroll container.

### 3.2. Quick Categories
- **Desktop:** 6-column grid displaying flat, clean category cards.
- **Mobile:** Transforms into a single horizontal scroll panel. Visitors can swipe or scroll left/right to view category chips. Edge fade gradients signify scrollable content.

### 3.3. Featured Potentials Grid
- **Desktop & Laptop:** 4-column horizontal card grid.
- **Tablet:** 2-column card grid.
- **Mobile:** 1-column layout. Standard grid transitions to a swipeable horizontal card carousel with snapping points.

### 3.4. Interactive Map
- **Desktop:** Left-hand sidebar panel (showing lists and search inputs) taking up 350px width, layout-split from the Leaflet map occupying the remaining viewport.
- **Tablet:** Map extends to 100% width. Sidebar collapses into an expandable overlay control.
- **Mobile:** Map occupies 100% of the active viewport area. Clicking a marker displays a slide-up **Bottom Sheet Detail Panel** from the screen's bottom edge (leaving the map visible above it) rather than displaying standard Leaflet popups which block coordinates visibility.

---

## 4. Component Layout Specifications

### 4.1. Unified Potential Card
- **Grid Layout:** 
  - Desktop: 4 cards per row.
  - Tablet: 2 cards per row.
  - Mobile: 1 card per row.
- **Aspect Ratio:** Cover image stays constrained to a clean `16:9` ratio across all viewports.
- **Typography Clamp:** Title is clamped to 1 line, short description is clamped to 2 lines to ensure card height alignment on grids.
- **Contact CTA:** Button expands to full card width on mobile.

### 4.2. Statistics & Charts
- **Desktop:** Multi-column layout. Charts (Bar, Pie) render side-by-side.
- **Mobile:** Stacks vertically. If charts exceed screen width, they scale down. Adjacent data tables collapse to show key rows with horizontal scroll.

### 4.3. Data Tables (CMS)
- **Desktop:** Standard multi-column headers.
- **Tablet:** Renders horizontal scroll wrapper to browse overflow columns safely without layout break.
- **Mobile:** Grid collapses completely. Columns transition into a card list format, where each row is represented as an independent list card displaying crucial fields (Title, Category, Status) and an action trigger.

### 4.4. Forms
- **Grid Columns:** Desktop uses 2-column grid alignment for fields. Mobile collapses inputs to a single vertical column.
- **Touch Targets:** Form input fields, checkboxes, and select dropdowns must maintain a minimum click area of `44px` height on mobile.
- **Coordinate Picker:** On mobile, map is disabled until tapped to prevent hijacking of page scrolls.

---

## 5. Media & Asset Responsiveness

- **Images:** Utilizes standard HTML `<picture>` elements to serve scaled assets (e.g. mobile loads `400px` width WebP, desktop loads `1200px` width WebP).
- **Lazy Loading:** All image thumbnails and gallery previews carry `loading="lazy"` tags.
- **Skeletons:** Layout skeletons match the grid structure of the target page at that breakpoint.

---

## 6. Accessibility & Mobile Usability

- **Landscape & Portrait:** Maps and tables adjust height dynamic overlays when mobile devices transition to landscape rotation.
- **Gesture Control:** Leaflet map on mobile disables double-finger zoom/drag hijacking unless user explicitly taps a "Lock/Unlock Scroll" button overlay.
- **Focus Indicators:** Interactive indicators expand to `3px` focus rings on mobile layouts for clear thumb selection confirmation.

---

## 7. Future ACA Modularity
All incoming categories (Tourism, Agriculture, Livestock, etc.) reuse these responsive guidelines:
- Custom cards map directly into the responsive grid column limits.
- Category detail pages automatically adjust columns from split-views (desktop) to single-column streams (mobile).
- Custom database metrics in statistics automatically populate the responsive statistics dashboard charts.
- CMS forms dynamically generate metadata fields in responsive stacked column layouts.
