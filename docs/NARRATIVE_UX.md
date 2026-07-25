# Narrative UX — Portal Potensi Desa Karamatwangi

Sprint 14 · July 2026

---

## Current Journey (Before)

```
Home → About → Categories → Directory → Detail → Statistics → Map → Contact
```

Each page felt independent. No narrative thread connected them. CTAs pointed to random pages. Empty states were generic. Loading states were silent.

---

## New Journey (After)

```
Home (Welcome)
  ↓ "Selamat datang di portal digital..."
About (Discover)
  ↓ "Mengenal Karamatwangi" — who we are
StoryDivider (Breathe)
  ↓ "Di sinilah alam bercerita tentang ketenangan."
Categories (Explore sectors)
  ↓ "Setiap sektor menyimpan cerita berbeda..."
Directory (Browse potentials)
  ↓ "Potensi yang tumbuh dari tanah desa"
Detail (Read story)
  ↓ "Sudah siap menjelajah lebih jauh?"
Map (Locate on map)
  ↓ "Jelajahi desa melalui peta"
Contact (Connect)
  ↓ "Setiap pertanyaan adalah awal dari hubungan yang baik."
Footer (Closing)
  ↓ "Terima kasih telah mengenal Desa Karamatwangi."
```

Every page now has a clear emotional arc: **Welcome → Discover → Explore → Experience → Connect → Close**.

---

## CTA Flow Diagram

```
┌─────────┐     ┌──────────┐     ┌────────────┐
│  HOME   │────→│ POTENTI- │────→│  POTENTIAL │
│         │     │  ALS     │     │   DETAIL   │
│ Jelajahi│     │          │     │            │
│  Desa   │     │ Lihat    │     │ Lihat di   │
│ Lihat   │     │ Detail   │     │   Peta     │
│  Peta   │     └────┬─────┘     └─────┬──────┘
└────┬────┘          │                  │
     │          ┌────↓─────┐            │
     │          │ CATEGORIES│            │
     │          │ (filter)  │            │
     │          └──────────┘            │
     │                                   │
     ↓                                   ↓
┌─────────┐                      ┌──────────┐
│   MAP   │←─────────────────────│          │
│         │                      │  CONTACT │
│ Lihat   │──────────────────────→│          │
│ Detail  │   Jelajahi Potensi   │ WhatsApp │
└─────────┘                      └──────────┘
```

**Every page has at least 2 CTAs pointing to the next logical step.**

---

## Copy Changes Summary

### Hero Titles (Before → After)

| Page | Before | After |
|---|---|---|
| About | Tentang Desa Karamatwangi | Mengenal Karamatwangi |
| Contact | Hubungi Kami | Mari Berbicara |
| Statistics | Statistik Desa | Potret Desa dalam Angka |
| Categories | Kategori Potensi Desa | Menjelajahi Sektor Desa |
| Directory | Eksplorasi Potensi Desa Karamatwangi | Potensi yang Tumbuh dari Tanah Desa |
| Map | Peta Interaktif | Jelajahi Desa Melalui Peta (Sprint 13) |

### Hero Descriptions (Before → After)

| Page | Before | After |
|---|---|---|
| About | Mengenal lebih dekat desa yang terletak di jantung Kecamatan Cikajang, Kabupaten Garut. | Di kaki pegunungan Garut, sebuah desa tumbuh dari kebun teh, sawah, dan semangat komunitasnya. |
| Contact | Kami siap membantu Anda. Jangan ragu untuk menghubungi pemerintah Desa Karamatwangi. | Setiap pertanyaan adalah awal dari hubungan yang baik. Kami di sini untuk mendengar Anda. |
| Statistics | Melihat perkembangan Desa Karamatwangi melalui data — angka yang menceritakan nyata. | Setiap angka punya cerita. Data ini adalah potret nyata kehidupan Desa Karamatwangi. |
| Categories | Temukan seluruh potensi Desa Karamatwangi berdasarkan sektor unggulan... | Setiap sektor menyimpan cerita berbeda — dari kebun teh yang tenang hingga pasar UMKM yang ramai. |
| Directory | Temukan berbagai potensi unggulan Desa Karamatwangi... | Dari tanah yang subur, lahir potensi yang dikelola dengan penuh cinta oleh masyarakat Desa Karamatwangi. |

### CTA Labels (Before → After)

| Location | Before | After |
|---|---|---|
| Home → Statistics section | Ringkasan Dashboard Statistik | Data Desa dalam Sekilas |
| Home → CTA section | Tertarik Mengenal Potensi Desa... | Sudah Siap Menjelajah? |
| Home → CTA secondary | Lihat Statistik | Buka Peta Desa |
| About → CTA primary | Lihat Potensi Desa | Jelajahi Potensi |
| About → CTA secondary | Hubungi Kami → /contact | Lihat di Peta → /map |
| About → CTA title | Jelajahi Potensi Desa | Sudah Kenal Karamatwangi? |
| Detail → CTA secondary | Tentang Desa → /about | Lihat di Peta → /map |
| Contact → CTA title | Siap Membantu Anda | Ada yang Ingin Anda Tanyakan? |
| Statistics → empty CTA | Kembali ke Beranda | Jelajahi Potensi |

### Empty States (Before → After)

| Page | Before | After |
|---|---|---|
| Statistics | Belum Ada Data | Data Sedang Disiapkan |
| Statistics desc | Statistik desa belum tersedia... | Statistik desa sedang dalam proses pengumpulan... |
| Directory | Belum Ada Potensi | Belum Ada Cerita di Sini |
| Directory desc | Potensi desa yang Anda cari belum tersedia... | Potensi yang Anda cari mungkin sedang dalam proses pengisian... |
| Categories error | Kategori Tidak Tersedia | Gagal Memuat Kategori |
| 404 | Halaman Tidak Ditemukan | Halaman Ini Tidak Ditemukan + editorial copy |

### Loading States

| Location | Before | After |
|---|---|---|
| Map | Memuat data... | Menyiapkan peta desa... |
| Map result count | {n} potensi | {n} lokasi ditemukan |

### Footer

| Element | Before | After |
|---|---|---|
| Tagline | Menyediakan informasi potensi Desa Karamatwangi secara terbuka, akurat, dan mudah diakses masyarakat. | Menghubungkan potensi desa dengan masyarakat — secara terbuka, akurat, dan mudah diakses. |
| Closing | (none) | Terima kasih telah mengenal Desa Karamatwangi. |

### 404 Page

| Element | Before | After |
|---|---|---|
| Title | Halaman Tidak Ditemukan | Halaman Ini Tidak Ditemukan |
| Description | Halaman yang Anda cari tidak ada atau telah dipindahkan. | Sepertinya halaman ini sudah berpindah tempat atau belum tersedia. Mari kita kembali menjelajah. |
| CTAs | 1 CTA: Kembali ke Beranda | 2 CTAs: Kembali ke Beranda + Jelajahi Potensi |
| Editorial | (none) | "Atau mulai dari awal:" |

---

## Narrative Tone Guide

### Voice

- **Warm but not casual** — like a knowledgeable friend showing you around
- **Editorial, not institutional** — "cerita" not "informasi", "menjelajah" not "mengakses"
- **Grounded in place** — reference the land, the people, the seasons
- **Active, not passive** — "Potensi tumbuh dari tanah" not "Potensi tersedia"

### Principles

1. **Every page is a chapter** — not a standalone document
2. **CTAs are invitations** — not commands ("Jelajahi" not "Klik di sini")
3. **Empty states are promises** — not dead ends ("Sedang disiapkan" not "Tidak ada data")
4. **Loading is anticipation** — not silence ("Menyiapkan cerita desa..." not blank screen)
5. **The footer is a goodbye** — not an afterthought ("Terima kasih telah mengenal...")
6. **Numbers have stories** — statistics describe people, not just data

### Words to Use

| Use | Instead of |
|---|---|
| cerita | informasi |
| menjelajah | mengakses |
| potensi | data |
| masyarakat | pengguna |
| desa | website/portal |
| tumbuh | tersedia |
| dikelola | disediakan |
| mengenal | melihat |

### Words to Avoid

- "Klik di sini"
- "Tidak ada data"
- "Error"
- "Null"
- "Loading..."
- "Submit"
- Government jargon (Musyawarah Desa, Rencana Pembangunan, etc.)

---

## Files Modified (14)

| File | Changes |
|---|---|
| `pages/AboutPage.jsx` | Hero title, description, SEO title, CTA title/description/labels/route |
| `pages/ContactPage.jsx` | Hero title, description, SEO title, final CTA title/description |
| `pages/StatisticsPage.jsx` | Hero title, descriptions (3 states), SEO title (3 instances), empty state |
| `pages/CategoriesExplorer.jsx` | Hero title, description, SEO title, error state, empty state |
| `pages/PotentialsDirectory.jsx` | Hero title, description, SEO title |
| `pages/NotFound.jsx` | Title, description, added secondary CTA + editorial line |
| `components/organisms/CTASection.jsx` | CTA heading, description, secondary CTA route (→ /map), aria-label |
| `components/organisms/Footer.jsx` | Tagline, closing sentence (both landing + non-landing) |
| `components/organisms/DirectoryGrid.jsx` | Empty state heading + description |
| `pages/MapExplorer.jsx` | Loading text |
| `components/map/MapFilters.jsx` | Result count label |
| `components/organisms/StatisticsSection.jsx` | Section heading |

---

## Remaining Opportunities

| # | Opportunity | Priority | Effort |
|---|---|---|---|
| 1 | **Page transition animations** — Framer Motion AnimatePresence on route changes | Low | Medium |
| 2 | **Scroll-to-top on navigation** — ensure every route change scrolls to top | Low | Low |
| 3 | **Breadcrumbs on all pages** — some pages may be missing them | Low | Low |
| 4 | **Related potentials on detail** — already implemented, verify narrative flow | Done | — |
| 5 | **Social proof** — testimonials from village residents | Low | Medium |
| 6 | **Timeline** — village history timeline on About page | Low | High |
