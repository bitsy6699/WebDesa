# Phase 7.2 — Public Potential Detail Redesign

Redesign the public potential detail page (`/potentials/:category/:slug`) into an immersive, premium, and image-first storytelling feature article experience.

## Proposed Changes

We will modify one primary component to implement the new layout:
1. `PotentialDetail.tsx` - Fully replace with a new immersive feature article layout containing all the requested sections.

---

### [Component Name] Public Potential Detail Page

#### [MODIFY] [PotentialDetail.tsx](file:///c:/laragon/www/POTENSIDESA/frontend/src/pages/PotentialDetail.tsx)
- Implement **Mini Hero** (height 420–480px, featured cover image background, forest green overlay, top-left breadcrumbs, bottom-left badge, title, location, description summary, and bottom-right floating glass quick info card).
- Implement **Image Gallery** (large featured viewport, interactive thumbnail strip with hover zooms, smooth fade transition, click-to-swap hero active image).
- Implement **Story Content** (2-column layout):
  - Left column: Rich typography article text with a stylized Drop Cap for the first paragraph.
  - Right column: Sticky Info Panel (glass card, details, author/admin info, copy link sharing, and back button).
- Implement **Village Information Cards** (4 premium glass widgets: Lokasi, Kategori, Dipublikasikan, and Jumlah Galeri).
- Implement **Related Potentials** (horizontal row showcasing up to 3 potentials from the same category using the `usePotentials` API, excluding the current item).
- Implement **CTA Section** (dark forest green glass banner, "Masih Banyak Potensi Desa...", primary link to `/potentials`, secondary link to `/`).
- Implement smooth framer-motion section reveals and hover transitions.

## Verification Plan

### Automated Tests
- Run type checking: `npm run type-check`
- Run linter: `npm run lint`
- Run build check: `npm run build`

### Manual Verification
- Verify the interactive image gallery thumbnail swapping.
- Verify sticky behavior of the right info panel on desktop scroll.
- Verify related potentials rendering and category filtering.
