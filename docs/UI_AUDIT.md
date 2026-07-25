# UI AUDIT REPORT

**Portal Potensi Desa Karamatwangi — Frontend Audit**
**Date:** July 2026
**Scope:** All public pages, layout organisms, molecules, and shared utilities

---

## Table of Contents

1. [Global Findings](#global-findings)
2. [Page-by-Page Analysis](#page-by-page-analysis)
3. [Component Reuse Map](#component-reuse-map)
4. [Shared Components to Extract](#shared-components-to-extract)
5. [Redesign Priority Ranking](#redesign-priority-ranking)

---

## Global Findings

### Container Width Chaos

No unified max-width token. Every section invents its own value:

| Location | max-w | Context |
|----------|-------|---------|
| HeroBanner | `1440px` | Full-bleed hero |
| AboutSection | `1120px` | Editorial body |
| CategorySection | `1240px` | Category cards |
| FeaturedPotentialsSection | `1320px` | Featured grid |
| PotensiTerbaruSection | `1240px` | Latest grid |
| StatisticsSection | `1160px` | Stats dashboard |
| CTASection | `980px` | Closing CTA |
| PotentialsDirectory | `1320px` | Directory main |
| PotentialDetail | `1240px` | Article body |
| CategoriesExplorer | `1240px` | Category cards |
| StatisticsPage | `1160px` | Stats dashboard |
| Footer | `1120px` | Footer grid |
| AboutPage | `max-w-5xl` | Tailwind default |
| ContactPage | `max-w-5xl` | Tailwind default |

**Impact:** Content width shifts between pages. A reader moving from About (1120px) to Featured (1320px) experiences a jarring width change.

**Recommendation:** Define 2–3 container tokens — `narrow: 980px`, `default: 1240px`, `wide: 1320px` — in `index.css` and use consistently.

---

### Hero Pattern Fragmentation

Seven distinct hero implementations exist with no shared component:

| Page | Hero Type | Height | Gradient Direction | Breadcrumb |
|------|-----------|--------|--------------------|------------|
| Home (HeroBanner) | Full-viewport image | `100dvh` | Bottom fade | No |
| PotentialsDirectory | Mini image hero | `300–380px` | Left-to-right | Yes |
| PotentialDetail | Tall image hero | `460–540px` | Bottom-to-top | Yes |
| CategoriesExplorer | Mid image hero | `320px` | Left-to-right | Yes |
| StatisticsPage | Gradient card (no image) | `280px` | N/A | No |
| AboutPage | Flat gradient (no image) | `py-20` | Diagonal | No |
| ContactPage | Flat gradient (no image) | `py-20` | Diagonal | No |

**Impact:** Every sub-page rebuilds its hero from scratch. Inconsistent breadcrumb presence, gradient directions, and heights.

---

### Animation Inconsistency

| Pattern | Used By |
|---------|---------|
| Framer Motion `motion` + `useReducedMotion` | Home organisms, PotentialDetail, FeatureShowcase, StoryDivider |
| Raw CSS `@keyframes` in `<style>` tag | CategoriesExplorer |
| `Reveal` atom wrapper | StatisticsPage |
| Zero animations | AboutPage, ContactPage, Login, NotFound |

**Impact:** AboutPage and ContactPage feel lifeless compared to the animated Home page. CategoriesExplorer uses a different animation system entirely.

---

### Typography Inconsistency

| Location | Heading Font | Weight |
|----------|-------------|--------|
| HeroBanner | `font-heading` (Plus Jakarta Sans) | `font-extrabold` |
| AboutSection | `font-heading` | `font-bold` |
| FeaturedPotentialsSection | `font-heading` via SectionHeader | `font-bold` |
| AboutPage | None (plain `font-bold`) | `font-bold` |
| ContactPage | None (plain `font-bold`) | `font-bold` |
| StatisticsPage | None | `font-semibold` |
| StoryDivider | `font-serif` (Playfair Display) | `font-normal italic` |

**Impact:** AboutPage and ContactPage headings don't use the project's heading font. Playfair Display is only used in StoryDivider.

---

### Hardcoded Values That Should Be Tokens

**Background gradients:**
- `linear-gradient(180deg, #F8FAF8 0%, #F4F8F6 100%)` and 12+ variants of `#F8FAF8`, `#F2F7F4`, `#EFF3F1`, `#F4F8F6`, `#EEF2F0` — all variations of the same off-white with no clear token system
- `#0F3D34` hardcoded in HeroBanner, AboutPage, ContactPage hero backgrounds
- `#355D57` hardcoded in CategoriesExplorer category cards

**Shadow tints:**
- `rgba(24,77,71,...)` — used in Home organisms (correct)
- `rgba(16,24,40,...)` — used in StatisticsPage (slate, not primary)
- `rgba(15,61,52,...)` — used in CategoriesExplorer cards (darker primary)

**Hover colors:**
- `#0B3C35`, `#163A35`, `#0d5f57` — all variations of primary-dark with no token

**Impact:** Color drift between components. Shadows and hovers don't share a unified palette.

---

## Page-by-Page Analysis

---

### 1. Home.jsx

**Path:** `src/pages/Home.jsx`
**Route:** `/`
**Layout Template:** Editorial (storytelling scroll)

**Purpose:** Landing page — storytelling scroll introducing Desa Karamatwangi through Hero → About → Categories → Featured → Latest → Statistics → CTA.

**Layout Structure:**
1. HeroBanner (full viewport, Ken Burns zoom)
2. AboutSection (editorial 2-column + fact cards)
3. StoryDivider (poetic interstitial)
4. CategorySection (glass panel, icon grid)
5. FeaturedPotentialsSection (60/40 editorial split)
6. PotensiTerbaruSection (3-column grid)
7. SectionSeparator (gradient band)
8. StatisticsSection (conditional — only if data)
9. CTASection (dark green animated banner)

**UX Issues:**
- Hero bottom gradient hardcoded to `#F8FAF8` — breaks if AboutSection background changes
- No skip-to-content link for accessibility
- CTASection only exists on Home — other pages build their own CTAs or have none

**Visual Inconsistencies:**
- Only page using `LandingPageTemplate` — all other pages build layout inline
- Only page with StoryDivider and SectionSeparator

**Reusable Components:**
- `CTASection` — should be used on AboutPage, ContactPage, PotentialDetail

**Components to Remove:** None

**Assessment:** Clean and well-composed. The template pattern is good but not extended to other pages.

---

### 2. PotentialsDirectory.jsx

**Path:** `src/pages/PotentialsDirectory.jsx`
**Route:** `/potentials`
**Layout Template:** Directory

**Purpose:** Browse all village potentials with search, category filter, sort, and pagination.

**Layout Structure:**
1. Mini Hero (`h-[300px]`, breadcrumb, title, description)
2. DirectoryToolbar (search + category dropdown + sort dropdown)
3. DirectoryGrid (featured cards + regular grid + pagination)

**UX Issues:**
- Fetches `per_page: 200` for category counts — downloads up to 200 records just for counting. Should use a dedicated count endpoint
- Sort is client-side only (`getSortedPotentials()` sorts locally). Breaks for large datasets
- `scrollIntoView` uses `document.getElementById` — DOM manipulation outside React patterns
- Search debounce (400ms) is good

**Visual Inconsistencies:**
- Mini hero height `h-[300px]` differs from CategoriesExplorer's `h-[320px]`
- Background decorative blurs are inline `radial-gradient(...)` — different from other pages' decorations
- Uses `bg-surface-alt` wrapper — consistent

**Reusable Components:**
- Mini Hero pattern should be extracted to a shared `MiniHero` component
- Breadcrumb is built inline — should be a shared molecule

**Components to Remove:**
- Inline breadcrumb (replace with shared molecule)

**Assessment:** Functional but has N+1 query problem for category counts and inconsistent hero height.

---

### 3. PotentialDetail.jsx

**Path:** `src/pages/PotentialDetail.jsx`
**Route:** `/potentials/:category/:slug`
**Layout Template:** Editorial (article page)

**Purpose:** Individual potential detail page with gallery, article content, sidebar, and related items.

**Layout Structure:**
1. Hero (`460–540px`, cover image, bottom-heavy gradient, breadcrumb, title + quick-info glass card)
2. Image Gallery (crossfade with thumbnails, arrows)
3. Two-column: Article (col-span-2) + Sticky Sidebar (col-span-1)
4. 2x2 Info Cards (Location, Category, Published, Gallery count)
5. Related Potentials (3-column grid)
6. Bottom CTA (custom dark green banner)

**UX Issues:**
- First paragraph has `first-letter:text-6xl first-letter:font-extrabold first-letter:float-left` drop cap — editorial touch but inconsistent with any other content
- Hero height `460–540px` is nearly full viewport on mobile
- Gallery crossfade creates brief blank moment between transitions
- Share button copies URL but no native share API fallback
- Sticky sidebar `top-28` (112px) may not match actual header height (88px)
- Section 4 (2x2 info cards) is **entirely redundant** — hero card + sidebar already show category, location, date, gallery count. Three representations of the same data

**Visual Inconsistencies:**
- Hero gradient uses bottom-to-top direction (unique)
- Bottom CTA is custom inline — does NOT use `CTASection` component. Has different styling (`rounded-[36px]` vs `rounded-[40px]`)
- `formatDate` defined locally instead of shared utility
- Hero quick-info card mixes `glassSurfaceSoft` with inline overrides

**Reusable Components:**
- `FeaturedSmallCard` reused from FeaturedPotentialCard — good
- `SpotlightSurface` reused — good

**Components to Remove:**
- Section 4 (2x2 Info Cards) — fully redundant with hero card + sidebar
- Inline CTA — replace with `CTASection`
- Inline `formatDate` — extract to shared utility

**Assessment:** Rich editorial page with one major redundancy problem. The triple representation of metadata (hero card, sidebar, info cards) should be consolidated.

---

### 4. CategoriesExplorer.jsx

**Path:** `src/pages/CategoriesExplorer.jsx`
**Route:** `/categories`
**Layout Template:** Directory

**Purpose:** Browse all categories with counts, leading to filtered directory.

**Layout Structure:**
1. Mini Hero (`h-[320px]`, breadcrumb, title, description)
2. Centered intro heading (custom, not `SectionHeader`)
3. Category cards grid (3-col xl, 2-col md, 1-col mobile)
4. Empty/error/loading states

**UX Issues:**
- Inline `<style>` tag with raw CSS keyframes (`categoriesCardIn`, `shimmer`) — only page using raw CSS animations instead of Framer Motion
- Each category card fires individual `fetchPotentials({ category: slug, per_page: 1 })` — N+1 API pattern (6 calls on load)
- `CategoryIcon` function duplicated from `CategorySection.jsx` with different implementations
- **Bug:** "wisata" keyword matches `Trees` icon before `Landmark` in icon mapping — first match wins, so tourism always shows tree icon

**Visual Inconsistencies:**
- Does not use `SectionHeader` — builds own centered heading differently
- Does not use shared `Breadcrumb` — builds own inline
- Hero height `h-[320px]` differs from PotentialsDirectory's `h-[300px]`
- Card radius `rounded-[30px]` — unique, not used elsewhere
- Card shadow `rgba(15,61,52,0.16)` — different from standard `rgba(24,77,71,...)`

**Reusable Components:**
- Should use `SectionHeader` for intro heading
- Should use shared `CategoryIcon` (extracted from CategorySection)

**Components to Remove:**
- Inline `CategoryIcon` (replace with shared)
- Inline `<style>` tag (replace with Framer Motion)
- Inline breadcrumb (replace with shared molecule)

**Assessment:** Highest density of inconsistencies. Raw CSS, duplicated icon, N+1 queries, icon bug, no shared components.

---

### 5. StatisticsPage.jsx

**Path:** `src/pages/StatisticsPage.jsx`
**Route:** `/statistics`
**Layout Template:** Data

**Purpose:** Full statistics dashboard with charts, metrics, and insights.

**Layout Structure:**
1. Hero (gradient card via `Reveal` wrapper, `lg:h-[280px]`)
2. Metrics grid (2–3 col, `GlassCard` components)
3. Analytics section: Doughnut + Bar charts (Chart.js, lazy-loaded)
4. Insights sidebar (text insights + update info)

**UX Issues:**
- `const [triggered] = useState(true)` — unnecessary state, always `true`. Should be `const triggered = true`
- No breadcrumb navigation (every other sub-page has one)
- Charts use lazy `import()` — good for bundle size

**Visual Inconsistencies:**
- Does NOT use `bg-surface-alt` — uses `bg-[linear-gradient(180deg,#FCFCFA_0%,#F8FAF8_100%)]` instead
- Uses `Reveal` atom instead of Framer Motion `motion` — different animation system
- GlassCard styling is from `statistics/StatisticsShared.jsx` — separate styling system from `glassStyles.js`
- Card styling uses `border-white/50 bg-white/70` (frosted white) vs standard glassmorphism `bg-white/12 border-white/18`
- Shadow uses `rgba(16,24,40,...)` (slate) instead of `rgba(24,77,71,...)` (primary green) — only page with slate shadows
- Section title is "Analytics" — English in an all-Indonesian UI

**Reusable Components:**
- Could use `SectionHeader` for analytics heading
- Could use shared `Breadcrumb`

**Components to Remove:**
- Duplicate `LoadingState` — same skeleton pattern as `StatisticsSection.jsx`

**Assessment:** Self-contained data page with its own styling system. Shadow color is the most visible inconsistency.

---

### 6. AboutPage.jsx

**Path:** `src/pages/AboutPage.jsx`
**Route:** `/about`
**Layout Template:** Editorial

**Purpose:** Village profile, governance structure, vision/mission.

**Layout Structure:**
1. Hero (flat gradient, no image, centered text)
2. Profil Desa (2-col: text + governance card)
3. Visi & Misi (vision quote card + numbered mission list)
4. CTA (centered text + two buttons)

**UX Issues:**
- **Zero animations** — completely static while every other content page has scroll reveals
- No breadcrumbs — unlike Directory, Detail, Categories
- CTA at bottom has no visual container — plain text on `bg-page`, flat compared to `CTASection`
- Governance structure shows generic placeholder names ("Desa Karamatwangi", "Sekretariat Desa")

**Visual Inconsistencies:**
- Hero is `bg-gradient-to-br from-primary to-[#0F3D34]` — flat gradient, NOT image-based like all other sub-pages
- Section backgrounds alternate between default and `bg-page` — different from gradient system used elsewhere
- Cards use `rounded-2xl border border-primary/10 bg-white p-8 shadow-sm` — simple flat styling. Every other page uses glassmorphism or `rounded-[28px]+` cards
- `max-w-5xl` and `max-w-4xl` — Tailwind defaults, not custom pixel values
- No `font-heading` class on headings
- No `SectionHeader` component — builds headings inline

**Reusable Components:**
- Should use `SectionHeader` for all section headings
- Should use `CTASection` for bottom CTA
- Should use consistent hero component (mini-hero with image or consistent gradient)

**Components to Remove:**
- Inline section headings (replace with `SectionHeader`)
- Inline CTA (replace with `CTASection`)

**Assessment:** Most visually disconnected page from the rest of the site. Flat styling, no animations, different card system, different container widths. Looks like a different design system.

---

### 7. ContactPage.jsx

**Path:** `src/pages/ContactPage.jsx`
**Route:** `/contact`
**Layout Template:** Form (informational contact)

**Purpose:** Contact information and map embed.

**Layout Structure:**
1. Hero (flat gradient, no image, centered text)
2. Contact cards grid (2-col)
3. Google Maps embed (iframe)

**UX Issues:**
- No form for submitting messages — purely informational. Name implies interactivity
- Google Maps iframe has `height="400"` — fixed pixel height, not responsive
- No `sandbox` attribute on iframe for security
- Contact data (address, phone, email) duplicated between this page, Footer, and PotentialDetail sidebar

**Visual Inconsistencies:**
- Identical hero style to AboutPage — these two are consistent with each other but different from every other page
- Contact cards use `rounded-2xl border border-primary/10 bg-white p-6 shadow-sm` — same flat style as AboutPage
- No animations, no breadcrumbs
- No `SectionHeader` component
- `max-w-5xl` — Tailwind default

**Reusable Components:**
- Should use `SectionHeader`
- Should share contact data with Footer via a constant

**Components to Remove:**
- Hardcoded contact data (replace with shared constant)

**Assessment:** Minimal page with the same flat-styling problems as AboutPage. The iframe height fix is a quick win.

---

### 8. MapExplorer.jsx

**Path:** `src/pages/MapExplorer.jsx`
**Route:** `/map`
**Layout Template:** N/A (placeholder)

**Purpose:** Placeholder for future interactive map feature.

**Layout Structure:**
- Single centered text block, no hero, no sections

**UX Issues:**
- Completely bare placeholder — no hero, no consistent layout
- Uses raw CSS variable references: `text-[--neutral-900]` instead of Tailwind classes
- No SEO component
- No loading/error states
- No visual indication this is "coming soon"

**Visual Inconsistencies:**
- Only page using `text-[--neutral-900]` in Tailwind classes
- No `bg-surface-alt` or `bg-page` wrapper

**Reusable Components:** N/A

**Components to Remove:** N/A

**Assessment:** Placeholder — no work needed until the map feature is built.

---

### 9. Login.jsx

**Path:** `src/pages/Login.jsx`
**Route:** `/login`
**Layout Template:** Form

**Purpose:** Admin authentication form.

**Layout Structure:**
- Centered card: Logo + title + form (username, password, submit)

**UX Issues:**
- No "Forgot password" link
- No rate limiting indication on failed attempts
- Error handling relies on `err.response.data.error.message` — fragile if response shape changes
- Submit button disabled when `!username || !password` — no visual indication of which field is missing

**Visual Inconsistencies:**
- Form inputs use `rounded-xl` — different from `rounded-full` used for buttons elsewhere
- Hardcoded hover `hover:bg-[#0d5f57]` instead of `hover:bg-primary-dark`
- No header/hero, no footer styling adjustments

**Reusable Components:** N/A (isolated auth page)

**Components to Remove:** N/A

**Assessment:** Functional auth page. Low priority — admin-only, infrequent use.

---

### 10. NotFound.jsx

**Path:** `src/pages/NotFound.jsx`
**Route:** `*` (catch-all)
**Layout Template:** N/A (error state)

**Purpose:** 404 error page.

**Layout Structure:**
- Centered text: "404" number, title, description, link button

**UX Issues:**
- Very minimal — no visual personality, no illustration
- No suggestion of popular pages to visit
- No SEO component

**Visual Inconsistencies:**
- Uses raw CSS variables: `text-[--color-primary]`, `text-[--neutral-900]`, `rounded-[--radius-md]` — same raw pattern as MapExplorer
- Button uses `rounded-[--radius-md]` instead of `rounded-full` or `rounded-xl`

**Reusable Components:** N/A

**Components to Remove:** N/A

**Assessment:** Minimal error page. Low priority.

---

## Component Reuse Map

### Well-Reused Components

| Component | Used In | Assessment |
|-----------|---------|------------|
| `SectionHeader` | CategorySection, FeaturedPotentialsSection, PotensiTerbaruSection, StatisticsSection | Good reuse across Home organisms |
| `SpotlightSurface` | FeaturedPotentialCard, LatestPotentialCard | Good — shared interaction atom |
| `FeaturedSmallCard` | FeaturedPotentialsSection, PotentialDetail (related) | Good — cross-page reuse |
| `glassSurface` / `glassPanel` | Multiple organisms, StatisticsPage cards | Good — centralized glass system |
| `SEO` | Home, PotentialsDirectory, PotentialDetail, CategoriesExplorer, StatisticsPage, AboutPage, ContactPage | Good — applied to most pages |

### Under-Used Components

| Component | Current Use | Should Also Be Used In |
|-----------|-------------|----------------------|
| `CTASection` | Home only | AboutPage, ContactPage, PotentialDetail |
| `StoryDivider` | Home + Demo only | Could add emotional beats between page sections |
| `FeatureShowcase` | Demo only | Home (replace CategorySection + Featured with richer blocks) |
| `SectionHeader` | Home organisms only | AboutPage, ContactPage, CategoriesExplorer, StatisticsPage |

### Duplicated Components (Need Extraction)

| Component | Duplicated Between | Differences |
|-----------|--------------------|-------------|
| `CategoryIcon` | CategorySection.jsx, CategoriesExplorer.jsx | Explorer has more icon mappings; Section has simpler version |
| `SectionCTAButton` | FeaturedPotentialsSection.jsx, PotensiTerbaruSection.jsx | Nearly identical — same props, same styling |
| `Breadcrumb` | PotentialsDirectory.jsx, PotentialDetail.jsx, CategoriesExplorer.jsx | All built inline with different styling |
| `Mini Hero` | PotentialsDirectory.jsx, PotentialDetail.jsx, CategoriesExplorer.jsx | Different heights, gradient directions, padding |
| Contact data | Footer.jsx, ContactPage.jsx, PotentialDetail sidebar | Address, phone, email hardcoded in 3 places |
| `formatDate` / `formatPublishDate` | PotentialDetail.jsx, LatestPotentialCard.jsx | Different implementations of date formatting |
| Loading skeletons | StatisticsSection.jsx, StatisticsPage.jsx | Same glass card skeleton pattern, duplicated |

---

## Shared Components to Extract

| New Component | Source | Pages Affected | Priority |
|---------------|--------|----------------|----------|
| `MiniHero` | PotentialsDirectory, CategoriesExplorer, PotentialDetail hero patterns | 3 pages | **High** |
| `Breadcrumb` | Inline in Directory, Detail, Categories | 3 pages | **High** |
| `CategoryIcon` | CategorySection + CategoriesExplorer | 2 components + 1 page | **High** |
| `SectionCTAButton` | FeaturedPotentialsSection + PotensiTerbaruSection | 2 organisms | **Medium** |
| `CTABanner` | PotentialDetail inline CTA, absent from About/Contact | 4 pages | **Medium** |
| `contactData` | Footer + ContactPage + Detail sidebar | 3 components | **Medium** |
| `formatDate` | PotentialDetail + LatestPotentialCard | 2 components | **Low** |
| `GlassSkeleton` | StatisticsSection + StatisticsPage | 2 components | **Low** |

---

## Redesign Priority Ranking

Ranked by **visual impact × user frequency × fix effort**.

### Priority 1 — Critical

| Page | Score | Why |
|------|-------|-----|
| **AboutPage** | 🔴 10/10 | Worst offender: zero animations, flat card design, no SectionHeader, no breadcrumbs, different container widths, placeholder governance data, looks like a different website |
| **CategoriesExplorer** | 🔴 9/10 | Raw CSS animations, N+1 API calls, CategoryIcon bug (wisata icon wrong), duplicated icon component, no SectionHeader, unique card radius/shadow values |

### Priority 2 — High

| Page | Score | Why |
|------|-------|-----|
| **ContactPage** | 🟠 8/10 | Same flat-styling problems as AboutPage, no animations, fixed-height iframe, no SectionHeader, contact data not shared |
| **PotentialDetail** | 🟠 7/10 | Triple-redundant metadata (hero card + sidebar + info cards), custom CTA instead of CTASection, sticky offset may be wrong, `formatDate` not shared |
| **PotentialsDirectory** | 🟠 7/10 | N+1 category count queries (200 records), inconsistent hero height, inline breadcrumb, client-side sort limitation |

### Priority 3 — Medium

| Page | Score | Why |
|------|-------|-----|
| **StatisticsPage** | 🟡 6/10 | Different shadow color (slate vs primary), English section title, separate styling system, `Reveal` vs Framer Motion, unnecessary `useState(true)` |
| **Home (HeroBanner)** | 🟡 5/10 | `<Link><button>` anti-pattern, hardcoded bottom gradient, `onMouseEnter/Leave` instead of CSS hover — functional but has code quality issues |

### Priority 4 — Low

| Page | Score | Why |
|------|-------|-----|
| **NotFound** | 🟢 3/10 | Minimal, no SEO, raw CSS variables — low user impact |
| **MapExplorer** | 🟢 1/10 | Placeholder — no work needed until feature is built |
| **Login** | 🟢 2/10 | Admin-only, infrequent use, functional as-is |

---

## Quick Wins (Low effort, high impact)

1. **Add Framer Motion to AboutPage + ContactPage** — wrap sections in `motion.div` with existing `FADE_UP` variants. 30 minutes per page.
2. **Replace inline CTA in PotentialDetail** with `CTASection` component. 15 minutes.
3. **Fix CategoriesExplorer "wisata" icon bug** — reorder icon matching or deduplicate. 5 minutes.
4. **Extract `contactData` constant** — single source for address/phone/email used by Footer, ContactPage, Detail. 20 minutes.
5. **Standardize hero heights** — define `MINI_HERO_HEIGHT = '320px'` and use across Directory, Detail, Categories. 15 minutes.
6. **Remove 2x2 info cards in PotentialDetail** — data already in hero card + sidebar. 10 minutes.
7. **Add SEO to NotFound** — add `<title>404 — Halaman Tidak Ditemukan</title>`. 5 minutes.
8. **Fix ContactPage iframe height** — replace `height="400"` with aspect-ratio container. 5 minutes.
9. **Replace `<Link><button>` in HeroBanner** — style `<Link>` directly as button. 10 minutes.
10. **Add breadcrumbs to StatisticsPage** — reuse inline pattern from other pages or build shared molecule first. 15 minutes.

---

*End of audit.*
