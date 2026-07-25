# Map System — Portal Potensi Desa Karamatwangi

Sprint 13 · July 2026

---

## Overview

Interactive map for visual exploration of Desa Karamatwangi potentials. Built with Leaflet + React-Leaflet, with marker clustering, category filtering, search, and responsive mobile experience.

**Route:** `/map`

**Bundle:** 168 KB (50 KB gzipped) — lazy-loaded via routeModules.jsx

---

## Architecture

```
frontend/src/
├── components/map/
│   ├── constants.js        — MAP_CENTER, CATEGORY_COLORS, zoom levels
│   ├── leaflet-fix.js      — Fixes Leaflet default icon paths for bundlers
│   ├── MapMarkers.jsx      — Custom DivIcon markers + MarkerClusterGroup
│   ├── MapPopup.jsx        — Desktop popup card (image, title, category, CTA)
│   ├── MobileBottomSheet.jsx — Mobile bottom sheet with swipe-to-dismiss
│   ├── MapFilters.jsx      — Category chips + search input overlay
│   ├── LocateButton.jsx    — GPS "locate me" button
│   └── map.css             — Cluster icons, popup styling, scrollbar-hide
└── pages/
    └── MapExplorer.jsx     — Main page composing all map components
```

---

## Features

### Map Container

- **Library:** Leaflet 1.9.4 + React-Leaflet 5.x
- **Tile provider:** OpenStreetMap (free, no API key required)
- **Center:** `[-7.35, 107.85]` (Karamatwangi, Cikajang, Garut)
- **Zoom range:** 11–18
- **Default zoom:** 13

### Markers

- **Custom DivIcon** with category-colored teardrop shape
- **Category colors:**
  - Wisata: `#22C55E` (green)
  - UMKM: `#F59E0B` (amber)
  - Pertanian: `#3B82F6` (blue)
  - Budaya: `#A855F7` (purple)
  - Default: `#184D47` (primary)
- **Selected state:** 36px with ring + glow shadow
- **Default state:** 28px with white border + soft shadow
- **Hover animation:** CSS transition 200ms ease-out

### Marker Clustering

- **Library:** `leaflet.markercluster`
- **Cluster radius:** 50px
- **Chunked loading** for performance with many markers
- **Cluster icons:** Small (30px), Medium (36px), Large (42px) — primary color
- **Spiderfy on zoom** for expanding clusters

### Popup (Desktop)

- **Max width:** 280px
- **Content:** Cover image, category pill, title, address, "Lihat Detail" CTA
- **Position:** Above marker
- **Styling:** Rounded corners, shadow, no close button (click elsewhere to dismiss)

### Bottom Sheet (Mobile)

- **Trigger:** Below `lg` breakpoint (1024px)
- **Animation:** Slide up from bottom, 250ms ease `[0.25, 0.1, 0.25, 1]`
- **Backdrop:** Fade overlay, click to dismiss
- **Swipe to dismiss:** Touch start/end delta > 80px
- **Escape key:** Dismisses sheet
- **Content:** Full image, category pill, title, address, description, "Lihat Detail" CTA

### Category Filter

- **Horizontal scrollable chip bar** on mobile
- **"Semua" (All)** default selection
- **Category chips** with emoji icons + labels
- **Active state:** Filled background with category color
- **Inactive state:** White with border
- **Result count** shown on desktop

### Search

- **Real-time filtering** by title, address, or category label
- **Search icon** + clear button
- **Debounced** via React state (instant on type)
- **Empty state** shown when no results match

### Fit Bounds

- **Auto-zoom** to encompass all filtered markers when category changes
- **Single marker:** Fly to at zoom 15
- **Multiple markers:** `flyToBounds` with 60px padding
- **Animation:** 800ms duration

### Locate User

- **GPS button** in bottom-right corner
- **`navigator.geolocation.getCurrentPosition`** with high accuracy
- **Fly to** user location at zoom 15
- **Loading state:** Pulse animation on icon
- **Error state:** Returns to idle after 2s

### SEO

- Title: "Peta Interaktif"
- Description: "Jelajahi potensi Desa Karamatwangi pada peta interaktif..."
- OG image: hero-karamatwangi.jpg
- **Excluded from sitemap** and **robots.txt disallows /map** (tool page, not content)

---

## Data Flow

```
useQuery(['potentials', { perPage: 200 }])  →  potentials[]
useQuery(['categories'])                     →  categories[]
         ↓
    filteredPotentials[]  ←  activeCategory + searchQuery
         ↓
    MarkerClusterGroup
         ↓
    MapPopup (desktop) / MobileBottomSheet (mobile)
```

**API endpoints used:**
- `GET /api/v1/potentials?perPage=200&status=published`
- `GET /api/v1/categories`

**Data shape per potential:**
```js
{
  id,
  title,
  slug,
  category: { id, label, slug, iconKey, colorCode },
  short_description,
  cover_image_url,
  location: { latitude, longitude, address, dusun },
  is_featured,
}
```

---

## Performance

| Technique | Impact |
|---|---|
| **Lazy-loaded route** | Map assets only loaded when `/map` visited |
| **Marker clustering** | Prevents rendering hundreds of individual DOM markers |
| **Chunked loading** | `leaflet.markercluster` loads markers in chunks |
| **Lazy images** | Popup/sheet images use `loading="lazy"` |
| **Filter-before-render** | Only visible markers enter the cluster layer |
| **No re-render on pan** | `MarkerClusterGroup` manages its own layer lifecycle |

**Initial load:** ~50 KB gzipped (Leaflet + cluster + components)
**Tile cache:** OpenStreetMap tiles cached by browser

---

## Accessibility

| Feature | Implementation |
|---|---|
| **Keyboard nav** | Map is tabbable, markers are focusable |
| **Focus ring** | Filter chips, search input, buttons have `focus-visible:ring` |
| **ARIA labels** | Search input, locate button, close button, filter chips |
| **Escape key** | Dismisses mobile bottom sheet |
| **Reduced motion** | Framer Motion checks `useReducedMotion()` for sheet animation |
| **Screen reader** | Filter chips announce category name, result count announced |

---

## Motion

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Marker hover | CSS transform + shadow | 200ms | ease-out |
| Selected marker | Scale + glow | 200ms | ease-out |
| Cluster expand | Spiderfy | Default | Leaflet default |
| Popup open | Leaflet default | ~200ms | — |
| Bottom sheet enter | Slide up + fade backdrop | 250ms | `[0.25, 0.1, 0.25, 1]` |
| Bottom sheet exit | Slide down + fade backdrop | 250ms | `[0.25, 0.1, 0.25, 1]` |
| Fit bounds fly | Map flyTo/flyToBounds | 800ms | Leaflet easeOut |
| Locate fly | Map flyTo | 1000ms | Leaflet easeOut |
| Filter chip hover | Background + shadow | 200ms | ease-out |
| Search input focus | Ring + border | 200ms | ease-out |
| Loading spinner | Rotate | 1s | linear |

---

## Files Modified/Created

### New Files (8)

| File | Lines | Purpose |
|---|---|---|
| `components/map/constants.js` | 35 | Map center, zoom, category colors |
| `components/map/leaflet-fix.js` | 12 | Fixes Leaflet icon paths for bundlers |
| `components/map/MapMarkers.jsx` | 115 | Custom DivIcon + MarkerClusterGroup |
| `components/map/MapPopup.jsx` | 65 | Desktop popup card |
| `components/map/MobileBottomSheet.jsx` | 115 | Mobile bottom sheet with swipe |
| `components/map/MapFilters.jsx` | 100 | Category chips + search input |
| `components/map/LocateButton.jsx` | 45 | GPS locate button |
| `components/map/map.css` | 65 | Cluster icons, popup styling |
| `docs/MAP_SYSTEM.md` | (this file) | Documentation |

### Modified Files (2)

| File | Change |
|---|---|
| `pages/MapExplorer.jsx` | Replaced placeholder with full map implementation |
| `package.json` | Added `leaflet`, `react-leaflet`, `leaflet.markercluster` |

---

## Remaining Opportunities

| # | Feature | Priority | Effort |
|---|---|---|---|
| 1 | **Heatmap overlay** — show density of potentials | Low | Medium |
| 2 | **Drawing tools** — allow users to draw routes on map | Low | High |
| 3 | **Street View** — integrate Google Street View for virtual tour | Low | High |
| 4 | **Offline tiles** — cache tiles for offline viewing | Low | High |
| 5 | **Custom tile style** — match site brand colors on map tiles | Low | Medium |
| 6 | **Share location** — generate shareable link with map view | Low | Low |
