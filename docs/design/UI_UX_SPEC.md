# UI_UX_SPEC.md

# Website Potensi Desa Karamatwangi
## User Interface & User Experience Specification
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

Dokumen ini mendefinisikan seluruh struktur antarmuka (UI) dan perilaku interaksi (UX) Website Potensi Desa Karamatwangi.

Semua implementasi frontend wajib mengikuti urutan section, layout, dan interaksi yang terdapat pada dokumen ini.

Dokumen ini merupakan turunan langsung dari:

- DESIGN_SYSTEM.md
- Approved High-Fidelity Mockup

---

# 2. General Layout Structure

Website menggunakan struktur halaman modern dengan pendekatan vertical scrolling.

```
Header

Hero

Floating Categories

Interactive Map

Featured UMKM

News & Activities

Footer
```

Semua section memiliki jarak visual yang konsisten.

---

# 3. Global Navigation

## Position

Sticky Top

---

## Layout

```
Logo

Navigation Menu

CTA Button
```

---

## Navigation Items

- Beranda
- Tentang Desa
- Potensi Desa
- UMKM
- Berita
- Statistik
- Kontak

---

## CTA

Dashboard Admin

---

## Behavior

Saat pertama dibuka

- transparent

Saat scroll

- background putih
- shadow muncul
- blur aktif

Active menu

- underline
- warna primary

---

# 4. Landing Page Structure

Landing page terdiri dari tujuh section utama.

```
1 Hero

2 Floating Category

3 Interactive Map

4 Featured UMKM

5 News

6 Footer
```

Urutan tidak boleh berubah.

---

# 5. Hero Section

## Layout

Desktop

```
55%
45%
```

Kiri

- Welcome Label
- Heading
- Description
- Search
- CTA Buttons

Kanan

Quick Statistics Card

---

## Hero Content

### Welcome

```
Selamat Datang di
```

---

### Title

```
Desa Karamatwangi
```

Ukuran terbesar pada halaman.

---

### Description

Menjelaskan potensi desa.

Maksimal

```
3 baris
```

---

### Search

Input

Button Cari

Placeholder

```
Cari potensi desa,
produk,
atau lokasi...
```

---

### CTA

Button 1

```
Jelajahi UMKM
```

Button 2

```
Lihat Peta Desa
```

---

## Background

Landscape Village

Overlay gelap

---

# 6. Statistics Card

Position

Floating

Kanan Hero

Grid

```
2 x 2
```

Isi

Icon

Value

Label

Data

- UMKM
- Jenis Usaha
- Dusun
- Wisata

---

## Interaction

Hover

- shadow
- lift

---

# 7. Floating Category Bar

Position

Overlap Hero

Style

White Card

Rounded

Shadow

---

Jumlah kategori

```
6
```

Kategori

- UMKM
- Pertanian
- Peternakan
- Wisata
- Sarana
- Kegiatan

---

Interaction

Hover

- icon berubah warna
- background berubah
- cursor pointer

Click

Filter halaman terkait.

---

# 8. Interactive Map Section

Layout

```
35%
65%
```

---

Kolom kiri

Heading

Description

Legend

Button

---

Kolom kanan

Leaflet Map

---

Marker

Berbeda warna berdasarkan kategori.

---

Popup

Klik marker

Menampilkan

- Image
- Judul
- Deskripsi
- Button Detail

---

Zoom

Mouse Wheel

Touch Gesture

---

# 9. Featured UMKM Section

Layout

Split

```
30%
70%
```

---

Kolom kiri

Heading

Description

CTA

---

Kolom kanan

Swiper Carousel

---

Card

Image

Wishlist

Nama

Kategori

Lokasi

Rating

Social Links

---

Hover

Image Zoom

Card Lift

Shadow

---

Button

Previous

Next

---

# 10. News Section

Layout

Sama seperti UMKM.

---

Card

Image

Date Badge

Title

Excerpt

Read More

---

Interaction

Hover

Lift

Read More berubah warna.

---

# 11. Footer

Background

Primary Green

---

Layout

4 Columns

---

Column 1

Logo

Deskripsi

Social Media

---

Column 2

Quick Links

---

Column 3

Contact

Alamat

Nomor

Email

---

Column 4

Village Map Illustration

---

Bottom Bar

Copyright

---

# 12. Potentials Directory Page

Layout

```
Header

Page Banner

Toolbar

Grid

Pagination
```

---

Toolbar

Search

Category Filter

Sorting

---

Grid

Desktop

```
4 Columns
```

Tablet

```
2 Columns
```

Mobile

```
1 Column
```

---

Card

Image

Category Badge

Title

Location

Rating

---

Click

Menuju Detail.

---

# 13. Potential Detail Page

Structure

```
Cover

Gallery

Information

Metadata

Contact

Related Potentials
```

---

Cover

Large Image

---

Gallery

Horizontal Scroll

---

Information

Title

Category

Description

---

Metadata

Dynamic ACA

Tidak boleh hardcoded.

---

Contact

Adaptive Contact

Prioritas

1 WhatsApp

2 Telepon

3 Email

4 Website

---

Related Potentials

Minimal

```
4 Card
```

---

# 14. Search Experience

Search tersedia pada

Landing

Directory

Map

---

Behavior

Typing

↓

Debounce

↓

Request API

↓

Update Result

---

Jika kosong

Tampilkan

```
Tidak ada hasil ditemukan.
```

---

# 15. Loading States

Semua request API wajib memiliki

Skeleton

Loading Spinner

Empty State

Error State

---

# 16. Empty State

Icon

Title

Description

CTA

---

Contoh

```
Belum ada data UMKM.
```

---

# 17. Error State

Friendly Message

Retry Button

---

# 18. Animation Rules

Button

Hover

Scale

---

Card

Lift

---

Section

Fade Up

---

Image

Zoom

---

Navbar

Transition

---

# 19. Accessibility

Keyboard Navigation

Focus Ring

Semantic HTML

ARIA Label

Color Contrast WCAG AA

---

# 20. Responsive Behavior

Desktop

Semua section split layout.

---

Tablet

Hero menjadi vertikal.

Statistics pindah ke bawah Hero.

Map menjadi vertikal.

---

Mobile

Navbar

Hamburger

---

Hero

Vertical

---

Category

Horizontal Scroll

---

Map

Full Width

---

Carousel

Swipe

---

Footer

1 Column

---

# 21. UX Principles

Seluruh halaman harus memenuhi prinsip berikut:

- Mudah dipahami dalam <5 detik
- CTA utama selalu terlihat
- Maksimal 3 klik menuju informasi penting
- Konsisten pada seluruh halaman
- Mobile-first
- Fast loading
- Tidak ada layout shift

---

# 22. Source of Truth

Prioritas implementasi UI adalah:

1. Approved High-Fidelity Mockup
2. UI_UX_SPEC.md
3. DESIGN_SYSTEM.md
4. COMPONENT_LIBRARY.md

Frontend wajib mengikuti spesifikasi ini secara konsisten.
# 23. Implementation Rules

Developer dan AI Assistant WAJIB mengikuti aturan berikut:

- Tidak mengubah urutan section Landing Page.
- Tidak menghapus Floating Category Bar.
- Tidak memindahkan Quick Statistics dari Hero.
- Tidak mengganti layout split menjadi full-width tanpa persetujuan.
- Tidak menggunakan komponen UI library yang mengubah tampilan visual.
- Tidak menyederhanakan desain hanya demi mempercepat implementasi.
- Semua perubahan visual harus tetap mempertahankan kesamaan minimal 95% terhadap approved mockup.
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