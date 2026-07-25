# Migration Plan — Sprint 14.1 Editorial Landing Architecture

---

## Current Homepage Tree

```
Home.jsx
└── LandingPageTemplate
    ├── HeroBanner              (no id)
    ├── AboutSection            (id="tentang")
    ├── StoryDivider            (decorative)
    ├── CategorySection         (id="categories")
    ├── FeaturedPotentialsSection (no id)
    ├── PotensiTerbaruSection   (no id)
    ├── SectionSeparator        (decorative)
    ├── StatisticsSection       (id="statistik")
    ├── SectionSeparator        (decorative)
    └── CTASection              (no id)
```

**Data fetched by Home.jsx:**
- `useStatistics()` → statistics summary
- `useCategories()` → category list
- `usePotentials({ featured: true })` → featured potentials
- `usePotentials({ page: 1 })` → latest potentials

---

## New Homepage Tree

```
Home.jsx
└── LandingPageTemplate
    ├── HeroBanner              (no id — top of page)
    ├── AboutSection            (id="tentang")       ← EXISTS
    ├── StoryDivider            (decorative)          ← EXISTS
    ├── FeaturedPotentialsSection (id="unggulan")     ← ADD id
    ├── CategorySection         (id="kategori")       ← EXISTS
    ├── MapPreview              (id="peta")           ← NEW SECTION
    ├── PotensiTerbaruSection   (id="terbaru")        ← ADD id
    ├── StatisticsSection       (id="statistik")      ← EXISTS
    ├── FAQSection              (id="faq")            ← NEW SECTION
    ├── ContactSection          (id="kontak")         ← NEW SECTION
    └── CTASection              (id="eksplorasi")     ← ADD id, UPDATE copy
```

**Sections removed from current:** None.
**Sections added:** MapPreview, FAQSection, ContactSection (3 new).
**Sections reordered:** Featured moves before Categories (story flow: About → Featured → Categories → Map → Latest → Stats → FAQ → Contact).

---

## Components to Reuse (no changes needed)

| Component | Used In | Status |
|---|---|---|
| `AboutSection` | Home `/#tentang`, AboutPage | ✅ Reuse as-is |
| `CategorySection` | Home `/#kategori`, CategoriesExplorer | ✅ Reuse as-is |
| `FeaturedPotentialsSection` | Home `/#unggulan` | ✅ Add `id` prop only |
| `PotensiTerbaruSection` | Home `/#terbaru` | ✅ Add `id` prop only |
| `StatisticsSection` | Home `/#statistik`, StatisticsPage | ✅ Reuse as-is |
| `StoryDivider` | Home (decorative) | ✅ Reuse as-is |
| `SectionHeader` | All sections | ✅ Shared molecule |
| `PageCTA` | AboutPage, PotentialDetail, StatisticsPage | ✅ Shared molecule |
| `Footer` | All pages | ✅ Already has `id="kontak"` |

---

## Components to Extract (new, from existing page code)

| New Component | Source | What It Does |
|---|---|---|
| `MapPreview` | Extract from `MapExplorer.jsx` | Lightweight map embed showing village bounds with markers, "Buka Peta Penuh" CTA → `/map` |
| `FAQSection` | Extract from `ContactPage.jsx` FAQ accordion | FAQ items for homepage (simpler version, 3–4 items) |
| `ContactSection` | Extract from `ContactPage.jsx` contact methods | Contact cards + office hours for homepage (compact version) |

### MapPreview Details

- Static Leaflet map (no clustering, no filtering)
- Shows all markers with category colors
- Read-only (clicking marker shows brief popup)
- "Buka Peta Penuh" CTA → `/map`
- Lazy-loaded (only renders when in viewport via IntersectionObserver)
- Props: `potentials` array

### FAQSection Details

- 3–4 most common questions
- Simple accordion (Framer Motion AnimatePresence)
- "Lihat Pertanyaan Lainnya" → `/contact#faq`
- Props: `items` array or hardcoded defaults

### ContactSection Details

- 3 contact method cards (WhatsApp, Telepon, Email)
- Office hours
- "Hubungi Kami" → `/contact`
- Props: none (self-contained, hardcoded)

---

## Components to Modify

| Component | Change | Risk |
|---|---|---|
| `LandingPageTemplate` | Add 3 new props: `mapPreview`, `faq`, `contact`. Reorder sections. | Low |
| `Home.jsx` | Fetch contact/FAQ data (or use defaults). Pass new sections. | Low |
| `FeaturedPotentialsSection` | Accept optional `id` prop, spread onto `<section>` | Low |
| `PotensiTerbaruSection` | Accept optional `id` prop, spread onto `<section>` | Low |
| `CTASection` | Update copy (already done in Sprint 14). Add `id` prop. | Low |
| `Header` (navbar) | About/Statistics/Contact → hash links (`/#tentang`, `/#statistik`, `/#kontak`). Keep Potentials, Map as page routes. | Medium |
| `PublicLayout` | Add hash-scroll support: on route load with hash, smooth-scroll to element. On hash-only navigation, don't force scroll-to-top. | Medium |
| `Footer` | Already has `id="kontak"` — no change needed | None |

---

## Components NOT Removed

| Component | Reason |
|---|---|
| `AboutPage` | Deep-dive editorial page — linked from AboutSection "Selengkapnya" |
| `StatisticsPage` | Complete analytics — linked from StatisticsSection "Lihat Statistik" |
| `ContactPage` | Full contact experience — linked from ContactSection |
| `CategoriesExplorer` | Full category browse — linked from CategorySection |
| `PotentialsDirectory` | Full directory — linked from Featured/Latest "Lihat Semua" |
| `MapExplorer` | Full map — linked from MapPreview "Buka Peta Penuh" |
| `PotentialDetail` | Individual stories — linked from all card components |

---

## Router Changes

**No routes removed.** All existing routes stay.

```diff
// router.jsx — no changes needed
// All routes remain identical:
// /                    → Home (primary journey)
// /about               → AboutPage (deep dive)
// /categories          → CategoriesExplorer (deep dive)
// /potentials           → PotentialsDirectory (deep dive)
// /potentials/:cat/:slug → PotentialDetail (story)
// /statistics           → StatisticsPage (deep dive)
// /map                  → MapExplorer (deep dive)
// /contact              → ContactPage (deep dive)
```

---

## Header Navigation Changes

**Before:**
```
Beranda | Potensi | Kategori | Statistik | Tentang | Kontak
```
All are page routes (`/`, `/potentials`, `/categories`, `/statistics`, `/about`, `/contact`).

**After:**
```
Beranda | Potensi | Peta | [Admin/Login]
```

- **Beranda** → `/` (page route, scrolls to top)
- **Potensi** → `/potentials` (page route)
- **Peta** → `/map` (page route)
- **Admin/Login** → kept as-is

**Removed from nav:** Kategori, Statistik, Tentang, Kontak — these become discoverable via:
- Scroll sections on homepage (`/#tentang`, `/#statistik`, `/#kontak`)
- Footer navigation links
- CTA links within sections

**Footer nav** keeps all links: Beranda, Potensi, Kategori, Statistik, Tentang, Kontak.

---

## Scroll-to-Hash Support

**Problem:** `PublicLayout` force-scrolls to top on every `location.pathname` change. Hash navigation (`/#tentang`) is ignored.

**Solution:** Modify `PublicLayout.jsx`:

```js
// On pathname change → scroll to top (existing behavior)
// On hash change → scroll to element by id
// On initial load with hash → scroll to element after mount
```

Implementation:
1. Watch `location.hash` in addition to `location.pathname`
2. If hash is present, find element by `document.getElementById(hash.slice(1))`
3. If element exists, `element.scrollIntoView({ behavior: 'smooth' })`
4. If no hash, scroll to top (existing behavior)
5. Respect `prefers-reduced-motion` — use `behavior: 'auto'` when reduced

---

## Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Hash scroll doesn't work on first load | Medium | Medium | Use `useEffect` with small delay for DOM render |
| Header nav removal confuses users | Low | Medium | Footer keeps all links; sections have clear headings |
| MapPreview adds significant bundle | Low | Low | Lazy-load via `React.lazy` + `Suspense` |
| FAQ/Contact sections duplicate page content | Medium | Low | Homepage versions are compact; pages are full editorial |
| SEO regression | Low | High | All routes preserved; homepage gets richer content |
| Existing scroll behavior breaks | Low | Medium | Test pathname vs hash navigation separately |

---

## Expected File Changes

### New Files (3)

| File | Purpose | Est. Lines |
|---|---|---|
| `components/organisms/MapPreview.jsx` | Homepage map embed | ~120 |
| `components/organisms/FAQSection.jsx` | Homepage FAQ accordion | ~100 |
| `components/organisms/ContactSection.jsx` | Homepage contact cards | ~90 |

### Modified Files (7)

| File | Change | Est. Diff |
|---|---|---|
| `pages/Home.jsx` | Add mapPreview/faq/contact props, reorder sections | ~20 lines |
| `templates/LandingPageTemplate.jsx` | Add 3 new props, reorder sections, add StoryDividers | ~30 lines |
| `components/organisms/FeaturedPotentialsSection.jsx` | Accept `id` prop | ~3 lines |
| `components/organisms/PotensiTerbaruSection.jsx` | Accept `id` prop | ~3 lines |
| `components/organisms/CTASection.jsx` | Accept `id` prop | ~3 lines |
| `layouts/PublicLayout.jsx` | Hash-scroll support | ~25 lines |
| `components/organisms/Header.jsx` | Simplify nav to 3 links | ~15 lines |

### Unchanged Files

All route files, all page components (AboutPage, ContactPage, StatisticsPage, etc.), all other organisms.

---

## Implementation Order

1. **Hash scroll support** — `PublicLayout.jsx` (foundation for everything)
2. **Add `id` props** — FeaturedPotentialsSection, PotensiTerbaruSection, CTASection
3. **MapPreview** — new component (lazy-loaded)
4. **FAQSection** — new component
5. **ContactSection** — new component
6. **LandingPageTemplate** — add new props, reorder sections
7. **Home.jsx** — wire up new sections
8. **Header** — simplify navigation
9. **Verify** — build, test all routes, test hash navigation

---

## Estimated Effort

| Task | Hours |
|---|---|
| Hash scroll support | 1 |
| ID props on 3 components | 0.5 |
| MapPreview | 2 |
| FAQSection | 1 |
| ContactSection | 1 |
| LandingPageTemplate refactor | 1 |
| Home.jsx wiring | 0.5 |
| Header nav simplification | 0.5 |
| Testing + verification | 1 |
| **Total** | **~8 hours** |
