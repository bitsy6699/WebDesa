# COMPONENT_LIBRARY.md

# Website Potensi Desa Karamatwangi
## Component Library Specification
**Status:** Approved  
**Version:** 2.0.0  
**Last Updated:** 2026-07-10

---
> [!IMPORTANT]
> ## Official Visual Reference
>
> Seluruh implementasi UI frontend **WAJIB** mengacu pada visual mockup yang telah disetujui.
>
> **Visual Source of Truth**
>
> ```
> docs/mockups/landing-page-reference.png
> ```
>
> Apabila terdapat perbedaan antara dokumen spesifikasi dan visual mockup tersebut, maka **mockup menjadi acuan utama**.
>
> Dokumen ini hanya menjelaskan aturan implementasi teknis dari desain yang terdapat pada mockup.

# 1. Purpose

Dokumen ini mendefinisikan seluruh komponen React yang digunakan pada Website Potensi Desa Karamatwangi.

Semua komponen harus mengikuti pendekatan:

- Atomic Design
- Reusable
- Stateless apabila memungkinkan
- TypeScript Strict Mode
- Tailwind CSS
- Responsive
- Accessible (WCAG AA)

Komponen tidak boleh dibuat secara duplikat apabila telah tersedia di library ini.

---

# 2. Architecture

```
Atoms

↓

Molecules

↓

Organisms

↓

Templates

↓

Pages
```

Dependency hanya boleh turun.

Contoh:

```
Atoms
✔

Molecules memakai Atoms
✔

Organisms memakai Molecules
✔

Template memakai Organisms
✔

Atoms memakai Organisms
✖
```

---

# 3. Folder Structure

```
src/components

atoms/

molecules/

organisms/

templates/
```

---

# 4. Component Rules

Semua component wajib:

- reusable
- typed
- responsive
- accessible
- tidak menggunakan inline style
- tidak hardcode data
- menerima props
- tidak fetch API langsung (kecuali Provider)

---

# 5. Naming Convention

Component

```
PascalCase
```

Props

```
camelCase
```

Event

```
onClick

onSubmit

onChange
```

Boolean

```
isLoading

isActive

isOpen
```

---

# 6. Atoms

Atoms adalah komponen terkecil.

Tidak memiliki business logic.

---

## Button

Location

```
atoms/Button.tsx
```

Props

```
variant

size

disabled

loading

icon

children

onClick
```

Variant

- primary
- secondary
- outline
- ghost
- danger

Size

- sm
- md
- lg

Behavior

Hover

Focus

Disabled

Loading Spinner

---

## IconButton

Props

```
icon

ariaLabel

variant

size

onClick
```

Digunakan untuk:

- Wishlist
- Navigation
- Close
- Menu

---

## Input

Props

```
label

placeholder

value

onChange

error

disabled
```

Support

- text
- email
- password
- number

---

## SearchInput

Turunan Input.

Memiliki icon search.

---

## Badge

Variant

- success
- warning
- info
- danger
- primary

---

## Chip

Dipakai untuk

- Category
- Filter
- Tags

State

- active
- inactive

---

## Avatar

Support

- image
- initials

---

## Card

Reusable container.

Support

```
padding

shadow

hover

rounded
```

---

## Skeleton

Support

```
width

height

rounded
```

Animation

Shimmer.

---

## SectionTitle

Props

```
subtitle

title

description
```

---

# 7. Molecules

---

## SearchBar

Menggabungkan

Input

+

Button

Digunakan pada

Hero

Directory

Map

---

## CategoryChip

Props

```
category

active

onClick
```

---

## StatisticCard

Props

```
icon

title

value
```

---

## ContactCard

Props

```
icon

label

value

href
```

---

## EmptyResult

Props

```
title

description

button
```

---

## Pagination

Props

```
page

total

onChange
```

---

## MetadataRenderer

ACA Renderer.

Input

```
Record<string, unknown>
```

Tidak boleh memiliki

```
if(category==="umkm")
```

Harus generic.

---

## PotentialCard

Komponen utama untuk seluruh katalog.

Props

```
potential

showWishlist

showCategory

showLocation
```

Isi

- Cover
- Badge
- Wishlist
- Title
- Category
- Rating
- Location

Hover

Lift

Image Zoom

---

# 8. Organisms

---

## Header

Berisi

Logo

Navigation

CTA

Behavior

Sticky

Transparent

Scroll Effect

---

## MobileNavigation

Bottom Navigation

Mobile Only

---

## HeroBanner

Isi

Welcome

Heading

Description

Search

CTA

Statistics Card

---

## StatisticsSection

Grid

Desktop

```
4 Columns
```

Mobile

```
2 Columns
```

---

## CategorySection

Floating Categories.

Support

Horizontal Scroll.

---

## DirectoryToolbar

Komponen filter.

Isi

Search

Filter

Sorting

Result Count

---

## DirectoryGrid

Grid katalog.

State

Loading

Empty

Success

---

## FeaturedPotentialsSection

Swiper Carousel.

---

## MapSection

Leaflet Container.

Legend.

Floating Detail.

---

## NewsSection

Carousel.

---

## Footer

Empat kolom.

Brand

Menu

Contact

Map

---

# 9. Templates

---

## LandingPageTemplate

Menyusun:

Hero

↓

Categories

↓

Map

↓

Featured UMKM

↓

News

↓

Footer

---

## DirectoryTemplate

Header

↓

Toolbar

↓

Grid

↓

Pagination

---

## DetailTemplate

Cover

↓

Gallery

↓

Information

↓

Metadata

↓

Related Items

---

# 10. Layout Components

---

## PublicLayout

Header

Outlet

Footer

---

## AdminLayout

Sidebar

Header

Outlet

---

## BlankLayout

Outlet Only

---

# 11. Shared Components

Komponen berikut wajib reusable.

LoadingSpinner

ErrorBoundary

PageHeader

Breadcrumb

Modal

Drawer

Toast

ConfirmDialog

ImagePlaceholder

SocialIconGroup

Rating

WishlistButton

MapLegend

Gallery

---

# 12. Component State

Setiap komponen data wajib memiliki state:

```
Loading

Success

Empty

Error
```

---

# 13. Accessibility Rules

Semua Button

↓

aria-label

Semua Form

↓

label

Semua IconButton

↓

aria-label

Keyboard Navigation wajib.

---

# 14. Animation Rules

Hover

300ms

Lift

Scale

Image Zoom

Fade

Transition

Tidak boleh menggunakan animasi berlebihan.

---

# 15. Reusability Rules

Developer tidak boleh membuat:

```
UMKMCard

WisataCard

PertanianCard
```

Semua menggunakan:

```
PotentialCard
```

Developer tidak boleh membuat:

```
UMKMMetadata

WisataMetadata
```

Semua menggunakan:

```
MetadataRenderer
```

Developer tidak boleh membuat:

```
UMKMSearch

WisataSearch
```

Gunakan:

```
SearchBar
```

---

# 16. Anti Pattern

Tidak boleh:

❌ Inline Style

❌ Hardcoded Color

❌ Hardcoded Category Logic

❌ Duplicate Component

❌ Anonymous Props

❌ Fetch API di Atoms/Molecules

❌ Business Logic di UI Component

❌ Conditional Layout berdasarkan kategori

---

# 17. Source of Truth

Urutan referensi implementasi komponen:

1. Approved Mockup
2. COMPONENT_LIBRARY.md
3. DESIGN_SYSTEM.md
4. UI_UX_SPEC.md

Apabila terdapat perbedaan implementasi dengan mockup, maka mockup menjadi acuan utama.
# 18. Component Mapping (Approved Mockup)

| Mockup Section | React Component |
|----------------|-----------------|
| Navigation | Header |
| Hero Banner | HeroBanner |
| Search Bar | SearchBar |
| Quick Statistics | StatisticsSection |
| Floating Categories | CategorySection |
| Interactive Map | MapSection |
| UMKM Carousel | FeaturedPotentialsSection |
| News Carousel | NewsSection |
| Footer | Footer |
| Directory Grid | DirectoryGrid |
| Directory Toolbar | DirectoryToolbar |
| Potential Detail | DetailTemplate |
| Metadata | MetadataRenderer |
| Product Card | PotentialCard |

Seluruh section pada mockup harus dipetakan ke komponen di atas.
Tidak diperbolehkan membuat komponen baru yang memiliki fungsi identik tanpa alasan teknis yang jelas.
---

# Source Priority

Urutan acuan implementasi frontend adalah sebagai berikut:

1. `docs/mockups/landing-page-reference.png`
2. `DESIGN_SYSTEM.md`
3. `UI_UX_SPEC.md`
4. `COMPONENT_LIBRARY.md`
5. `RESPONSIVE_GUIDELINES.md`

Developer maupun AI Assistant tidak diperbolehkan membuat interpretasi visual baru apabila sudah terdapat contoh pada mockup.

Semua layout, spacing, typography, warna, hierarchy, dan komposisi mengikuti mockup tersebut.