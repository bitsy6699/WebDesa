# LAYOUT SYSTEM

**Page primitives for consistent public pages.**

Version 1.0

---

## Overview

Eight reusable layout primitives that replace the duplicated inline implementations across all public pages. Every component is mobile-first, uses existing design tokens, and requires no new dependencies.

**Location:** `frontend/src/components/molecules/`

| Primitive | Purpose | Replaces |
|-----------|---------|----------|
| `PageContainer` | Standardized max-width wrapper | 10+ different `max-w` values |
| `Breadcrumb` | Navigation trail | 3 inline implementations |
| `PageHero` | Editorial hero system (6 variants) | 6 different hero patterns |
| `PageHeader` | Section heading with optional CTA | Inline headings in 4+ pages |
| `PageSection` | Reusable section wrapper | Ad-hoc padding/bg per section |
| `MetadataRow` | Key-value metadata display | 3 redundant metadata layouts |
| `EmptyState` | Empty/loading/error state | Duplicated in 4+ components |
| `PageCTA` | Bottom call-to-action banner | 3 custom inline CTAs |

---

## Component Reference

---

### PageContainer

**File:** `src/components/molecules/PageContainer.jsx`

Standardized max-width container. Resolves the "container width chaos" (14 different values across the codebase).

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'narrow'` \| `'default'` \| `'wide'` \| `'full'` | `'default'` | Container max-width |
| `className` | string | — | Additional classes |
| `children` | ReactNode | required | Content |
| `as` | element | `'div'` | HTML element to render |

**Size tokens:**

| Size | Max-width | Use for |
|------|-----------|---------|
| `narrow` | `720px` | Reading-focused: articles, text-heavy content |
| `default` | `1120px` | Standard content: grids, 2-column layouts |
| `wide` | `1240px` | Expansive: directories, dashboards |
| `full` | `1440px` | Hero bleed, full-width sections |

**Migration:**
```jsx
// Before (inconsistent)
<div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
<div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
<div className="mx-auto max-w-5xl px-6">

// After (standardized)
<PageContainer size="wide">
<PageContainer size="default">
<PageContainer size="narrow">
```

**Pages that should adopt:** PotentialsDirectory, PotentialDetail, CategoriesExplorer, StatisticsPage, AboutPage, ContactPage.

---

### Breadcrumb

**File:** `src/components/molecules/Breadcrumb.jsx`

Navigation breadcrumb trail with mobile truncation.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<{label: string, to?: string}>` | required | Trail items. Last item has no `to`. |
| `className` | string | — | Additional classes |

**Behavior:**
- Mobile: truncates to last 2 items (hides earliest items)
- Desktop: shows full trail
- Links styled as neutral-400 → primary on hover
- Current page (last item) is a `<span>` with `aria-current="page"`
- Separated by `ChevronRight` icons

**Migration:**
```jsx
// Before (3 different inline implementations)
<nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60">
  <Link to="/" className="hover:text-white">Beranda</Link>
  <ChevronRight className="h-3 w-3" />
  <span className="text-white/80">Kategori</span>
</nav>

// After
<Breadcrumb items={[
  { label: 'Beranda', to: '/' },
  { label: 'Kategori' },
]} className="text-white/60" />
```

**Pages that should adopt:** PotentialsDirectory, PotentialDetail, CategoriesExplorer, StatisticsPage.

---

### PageHero

**File:** `src/components/molecules/PageHero.jsx`

Editorial hero system for all sub-pages. Six variants control background, sizing, and content layout. Every variant is compact (140–380px) compared to the old 500–560px hero.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | string | — | Hero image src (for `'image'` and `'editorial'` variants) |
| `imageAlt` | string | — | Alt text for hero image |
| `title` | string | required | Page title |
| `description` | string | — | Short subtitle |
| `breadcrumb` | `Array<{label, to?}>` | — | Breadcrumb items |
| `variant` | string | `'image'` | Background/sizing mode (see below) |
| `className` | string | — | Additional classes on outer `<section>` |
| `children` | ReactNode | — | Extra content below description |

**Variants:**

| Variant | Background | Height | Centered | Use case |
|---------|-----------|--------|----------|----------|
| `'image'` | Photo + gradient overlay | 340–380px | No | PotentialDetail |
| `'editorial'` | Photo + gradient overlay | 300–340px | No | CategoriesExplorer, PotentialsDirectory |
| `'gradient'` | Solid primary-to-dark gradient | 260–300px | No | (Reserved) |
| `'slim'` | Solid primary-to-dark gradient | 180–260px | Yes | AboutPage, ContactPage |
| `'compact'` | Neutral background (`surface-alt`) | 140–180px | Yes | Minimal text-only pages |
| `'statistics'` | Special gradient (primary → emerald) | 260–300px | No | StatisticsPage (reserved) |

**Image variants** (`image`, `editorial`) include:
- Ken Burns zoom on background photo (20s loop, 4% scale)
- Left-to-right gradient overlay for text readability
- Bottom fade into page background
- White text colors

**Text variants** (`gradient`, `slim`, `compact`, `statistics`) include:
- Solid gradient or neutral background
- Dark text colors
- No background image

**Migration:**
```jsx
// Before (inconsistent hero patterns)
<section className="relative h-[320px] overflow-hidden bg-gradient-to-r from-primary-dark to-primary">
  <nav>...</nav>
  <h1>Categories</h1>
</section>

// After — image hero for detail pages
<PageHero
  image={cover_image_url}
  title={title}
  variant="image"
  breadcrumb={[
    { label: 'Beranda', to: '/' },
    { label: 'Potensi', to: '/potentials' },
    { label: title },
  ]}
/>

// After — editorial hero for listing pages
<PageHero
  image="/hero/hero-karamatwangi.jpg"
  title="Kategori Potensi"
  description="Jelajahi potensi desa berdasarkan kategori."
  variant="editorial"
  breadcrumb={[
    { label: 'Beranda', to: '/' },
    { label: 'Kategori' },
  ]}
/>

// After — slim hero for text-only pages
<PageHero
  title="Tentang Desa"
  description="Profil Desa Karamatwangi."
  variant="slim"
  breadcrumb={[
    { label: 'Beranda', to: '/' },
    { label: 'Tentang' },
  ]}
/>
```

**Current page mapping:**

| Page | Variant | Rationale |
|------|---------|-----------|
| PotentialDetail | `image` | Hero image is the potential's cover photo |
| CategoriesExplorer | `editorial` | Shared village image, editorial listing feel |
| PotentialsDirectory | `editorial` | Shared village image, directory browsing |
| AboutPage | `slim` | Text-only, no image needed |
| ContactPage | `slim` | Text-only, no image needed |
| StatisticsPage | — (custom) | Uses its own gradient card hero |
| Home | — (HeroBanner) | Full-viewport 100dvh home hero |

---

### PageHeader

**File:** `src/components/molecules/PageHeader.jsx`

Section heading with optional eyebrow, description, and CTA. Includes built-in scroll-reveal animation.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `eyebrow` | string | — | Small label above title |
| `title` | string | required | Section heading |
| `description` | string | — | Supporting text |
| `ctaTo` | string | — | CTA link destination |
| `ctaLabel` | string | — | CTA button text |
| `layout` | `'left'` \| `'between'` | `'between'` | Left-aligned or space-between |
| `className` | string | — | Additional classes |
| `children` | ReactNode | — | Extra content below description |

**Migration:**
```jsx
// Before (inline headings in 4+ pages)
<div className="text-center mb-12">
  <h2 className="text-2xl font-bold">Profil Desa</h2>
  <p className="mt-3 text-neutral-500">Tentang desa kami.</p>
</div>

// After
<PageHeader
  eyebrow="Profil"
  title="Profil Desa"
  description="Tentang desa kami."
  layout="left"
/>
```

**Pages that should adopt:** AboutPage (all sections), ContactPage, CategoriesExplorer, StatisticsPage (analytics heading).

---

### PageSection

**File:** `src/components/molecules/PageSection.jsx`

Reusable section wrapper with consistent spacing and background. Includes optional scroll-reveal animation.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `background` | `'default'` \| `'surface'` \| `'muted'` \| `'tinted'` | `'default'` | Background style |
| `container` | `'none'` \| `'narrow'` \| `'default'` \| `'wide'` | `'default'` | Container width |
| `animated` | boolean | `true` | Enable scroll-reveal |
| `id` | string | — | Section id for anchor links |
| `ariaLabel` | string | — | Accessible label |
| `className` | string | — | Additional classes |
| `children` | ReactNode | required | Content |

**Backgrounds:**
| Token | CSS | Use for |
|-------|-----|---------|
| `default` | Transparent | Most sections |
| `surface` | `var(--bg-surface-alt)` | Alternating sections |
| `muted` | `neutral-50` | Subtle contrast |
| `tinted` | `primary/3` | Very subtle green wash |

**Migration:**
```jsx
// Before (ad-hoc padding per section)
<section className="py-16 sm:py-20 lg:py-24">
<section className="py-20 sm:py-28">
<section className="px-6 py-20 max-w-5xl mx-auto">

// After
<PageSection>
<PageSection background="surface">
<PageSection container="narrow">
```

**Pages that should adopt:** AboutPage (wrap each content section), ContactPage, CategoriesExplorer, StatisticsPage.

---

### MetadataRow

**File:** `src/components/molecules/MetadataRow.jsx`

Display key-value metadata in consistent layouts.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array<{label, value, icon?}>` | required | Metadata items |
| `layout` | `'row'` \| `'stack'` \| `'inline'` | `'row'` | Display layout |
| `className` | string | — | Additional classes |

**Layouts:**
- `'row'`: Label and value stacked vertically, items in a horizontal row
- `'stack'`: Vertical list of label-value pairs
- `'inline'`: Compact horizontal with optional icons

**Migration:**
```jsx
// Before (3 different metadata layouts in PotentialDetail)
<div className="grid grid-cols-2 gap-4">
  <div><span className="text-xs">Lokasi</span><span className="font-semibold">{location}</span></div>
  ...
</div>

// After
<MetadataRow items={[
  { label: 'Lokasi', value: 'Desa Karamatwangi' },
  { label: 'Kategori', value: 'Wisata' },
  { label: 'Diterbitkan', value: '12 Jan 2026' },
]} layout="row" />
```

**Pages that should adopt:** PotentialDetail (replace sidebar and hero card metadata).

---

### EmptyState

**File:** `src/components/molecules/EmptyState.jsx`

Reusable empty, loading, or error state with icon, title, description, and optional action.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'search'` \| `'empty'` \| `'error'` | `'empty'` | State variant |
| `title` | string | required | Main message |
| `description` | string | — | Supporting text |
| `action` | ReactNode | — | Optional CTA button |
| `className` | string | — | Additional classes |

**Variants:**
- `'search'`: Search icon — "no results found"
- `'empty'`: Folder icon — "no data yet"
- `'error'`: Alert icon — "something went wrong"

**Migration:**
```jsx
// Before (duplicated in FeaturedPotentialsSection, PotensiTerbaruSection, CategoriesExplorer, StatisticsPage)
<div className="flex flex-col items-center py-16 text-center">
  <Sparkles className="h-9 w-9 text-primary mb-6" />
  <h3 className="text-2xl font-bold">Belum Ada Potensi</h3>
  <p className="mt-3 text-neutral-500">Data akan muncul...</p>
</div>

// After
<EmptyState
  variant="empty"
  title="Belum Ada Potensi"
  description="Data akan muncul setelah administrator menambahkan potensi."
  action={<Link to="/potentials" className="...">Lihat Semua Potensi</Link>}
/>
```

**Pages/components that should adopt:** FeaturedPotentialsSection, PotensiTerbaruSection, CategoriesExplorer, StatisticsPage, PotentialsDirectory.

---

### PageCTA

**File:** `src/components/molecules/PageCTA.jsx`

Consistent call-to-action banner for the bottom of pages.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | CTA heading |
| `description` | string | — | Supporting text |
| `ctaTo` | string | required | Primary CTA destination |
| `ctaLabel` | string | required | Primary CTA text |
| `ctaTo2` | string | — | Secondary CTA destination |
| `ctaLabel2` | string | — | Secondary CTA text |
| `variant` | `'dark'` \| `'light'` | `'dark'` | Visual style |
| `className` | string | — | Additional classes |

**Variants:**
- `'dark'`: Dark green gradient banner (matches CTASection on Home)
- `'light'`: White card with subtle shadow on neutral background

**Migration:**
```jsx
// Before (3 different inline CTAs)
<div className="bg-gradient-to-r from-primary to-primary-dark rounded-[36px] p-8 text-center">
  <h2 className="text-white text-2xl font-bold">...</h2>
  <Link to="/potentials" className="bg-white text-primary rounded-full px-6 py-3">...</Link>
</div>

// After
<PageCTA
  title="Tertarik Mengenal Potensi Desa?"
  description="Jelajahi seluruh potensi desa..."
  ctaTo="/potentials"
  ctaLabel="Jelajahi Semua Potensi"
  ctaTo2="/statistics"
  ctaLabel2="Lihat Statistik"
  variant="dark"
/>
```

**Pages that should adopt:** PotentialDetail, AboutPage, ContactPage, CategoriesExplorer.

---

## Page Adoption Matrix

Which pages should adopt which primitives:

| Page | PageContainer | Breadcrumb | PageHero | PageHeader | PageSection | MetadataRow | EmptyState | PageCTA |
|------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Home** | — | — | — (uses HeroBanner) | — (uses SectionHeader) | — | — | — | — (uses CTASection) |
| **PotentialsDirectory** | wide | editorial | all sections | — | — | all grids | yes |
| **PotentialDetail** | wide | image | article sections | — | sidebar + hero card | — | yes (dark) |
| **CategoriesExplorer** | wide | editorial | intro heading | category section | — | empty/error | yes |
| **StatisticsPage** | default | — (custom hero) | analytics heading | metrics + charts | — | loading/error | — |
| **AboutPage** | narrow | slim | all 3 sections | profil + visi-misi | — | — | yes (light) |
| **ContactPage** | narrow | slim | contact heading | contact cards | — | — | yes (light) |
| **MapExplorer** | default | — | — | — | — | — | — |
| **NotFound** | narrow | — | — | — | — | — | — |

---

## Container Width Standard

After adoption, these are the standard container widths:

| Width | Value | When to use |
|-------|-------|-------------|
| `narrow` | `720px` | Reading-focused pages (About, Contact), text-heavy content |
| `default` | `1120px` | Standard content, 2-column layouts, statistics |
| `wide` | `1240px` | Directories, category grids, dashboards |
| `full` | `1440px` | Hero bleed, full-width sections |

---

## Design Principles

1. **One primitive per concern.** PageContainer handles width. PageHero handles the top. PageSection handles spacing. PageHeader handles headings. Don't combine them.

2. **Mobile-first.** Every component defaults to mobile layout and enhances at `sm:` / `lg:` breakpoints.

3. **Animation built-in.** PageHero, PageHeader, PageSection, and EmptyState include Framer Motion scroll-reveal. Set `animated={false}` or `prefersReducedMotion` handles it.

4. **Tokens, not magic values.** All colors, radii, and shadows use CSS custom properties from `index.css`. No hardcoded hex values.

5. **Variant-driven heroes.** PageHero's `variant` prop controls height, background, and alignment. Each page picks the variant that matches its content type — no manual height overrides needed.

6. **Composition over configuration.** These primitives compose together. A typical page:
   ```jsx
   <PageHero variant="editorial" image="..." title="..." breadcrumb={[...]} />
   <PageSection container="wide">
     <PageHeader eyebrow="..." title="..." ctaTo="..." ctaLabel="..." />
     {/* content */}
   </PageSection>
   <PageCTA title="..." ctaTo="..." ctaLabel="..." />
   ```

---

## Existing Components — Not Replaced

These existing components continue to serve their purpose and are NOT replaced by the layout primitives:

| Component | Location | Why it stays |
|-----------|----------|-------------|
| `SectionHeader` | `molecules/SectionHeader.jsx` | Used by Home organisms (CategorySection, FeaturedPotentialsSection, PotensiTerbaruSection, StatisticsSection). PageHeader is for page-level headings within sub-pages. |
| `CTASection` | `organisms/CTASection.jsx` | The Home page's rich closing CTA with animated gradient background. PageCTA is simpler, for sub-pages. |
| `HeroBanner` | `organisms/HeroBanner.jsx` | Full-viewport 100dvh home hero with Ken Burns animation. PageHero is the mini-hero for sub-pages. |
| `StoryDivider` | `organisms/StoryDivider.jsx` | Editorial breathing moments between Home sections. Not a page primitive. |
| `FeatureShowcase` | `organisms/FeatureShowcase.jsx` | Editorial storytelling block for specific features. Not a page primitive. |

---

*End of layout system documentation.*
