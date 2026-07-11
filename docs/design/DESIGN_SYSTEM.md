# DESIGN_SYSTEM.md

# Website Potensi Desa Karamatwangi
## Design System v2.0
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

Dokumen ini menjadi standar visual utama (Single Source of Truth) untuk seluruh antarmuka Website Potensi Desa Karamatwangi.

Semua halaman, komponen, dan layout wajib mengikuti spesifikasi pada dokumen ini.

Jika terdapat perbedaan antara implementasi frontend dengan desain yang telah disetujui, maka **desain mockup menjadi acuan utama**.

---

# 2. Design Philosophy

Website mengusung konsep:

> **Modern Village Digital Portal**

Perpaduan antara:

- Modern
- Natural
- Elegant
- Informative
- Human Friendly
- Premium

Website harus mampu memberikan kesan:

- profesional
- ramah
- terpercaya
- mudah digunakan
- nyaman diakses berbagai umur

---

# 3. Design Principles

Prioritas desain:

1. Readability
2. Simplicity
3. Consistency
4. Accessibility
5. Responsive
6. Performance
7. Clean Layout

---

# 4. Visual Identity

Visual website mengambil inspirasi dari:

- Tourism Website
- Modern Government Portal
- Marketplace Produk Lokal
- Digital Village Platform

Karakter visual:

- banyak white space
- rounded corner besar
- soft shadow
- warna natural
- foto landscape berkualitas tinggi
- banyak kartu (cards)

---

# 5. Color Palette

## Primary

Forest Green

```
#0B3C35
```

Digunakan untuk:

- Hero title
- CTA utama
- Footer
- Active Navigation
- Heading
- Icon utama

---

## Secondary

Leaf Green

```
#2F855A
```

Digunakan untuk:

- Hover Button
- Badge
- Success
- Active Filter

---

## Accent Orange

```
#D97706
```

Digunakan untuk:

- Welcome Text
- Rating
- Highlight
- Decorative Accent

---

## Accent Blue

```
#3B82F6
```

Marker Map

---

## Accent Purple

```
#8B5CF6
```

Marker Potensi

---

## Accent Yellow

```
#F59E0B
```

Marker Wisata

---

## Neutral

Background

```
#FFFFFF
```

Section Background

```
#F8F9FA
```

Border

```
#E5E7EB
```

Primary Text

```
#1F2937
```

Secondary Text

```
#6B7280
```

Disabled

```
#9CA3AF
```

---

# 6. Typography

## Heading Font

Playfair Display

Fallback

```
Georgia
serif
```

Digunakan untuk:

- Hero
- Section Title

---

## Body Font

Inter

Fallback

```
sans-serif
```

Digunakan untuk:

- Paragraph
- Button
- Card
- Navigation

---

# 7. Typography Scale

| Style | Size | Weight |
|--------|------|----------|
| Display | 64px | 700 |
| H1 | 48px | 700 |
| H2 | 36px | 700 |
| H3 | 28px | 600 |
| H4 | 22px | 600 |
| Body Large | 18px | 400 |
| Body | 16px | 400 |
| Caption | 14px | 400 |
| Label | 12px | 600 |

---

# 8. Grid System

Desktop

```
12 Columns
```

Container

```
1280px
```

Section Padding

```
96px
```

Gap

```
32px
```

---

# 9. Spacing Scale

Gunakan sistem 8pt.

```
4
8
12
16
24
32
40
48
64
80
96
120
```

---

# 10. Radius

Button

```
9999px
```

Input

```
9999px
```

Card

```
24px
```

Image

```
20px
```

Map

```
24px
```

Floating Card

```
28px
```

---

# 11. Shadow

Default

```
shadow-lg
```

Hover

```
shadow-2xl
```

Hover Lift

```
translateY(-4px)
```

Transition

```
300ms ease-in-out
```

---

# 12. Header

Height

```
88px
```

Behavior

- Sticky
- Transparent ketika berada di Hero
- Menjadi putih ketika scroll
- Blur Background
- Shadow muncul saat scroll

Layout

```
Logo

Navigation

CTA Button
```

Menu

- Beranda
- Tentang Desa
- Potensi Desa
- UMKM
- Berita
- Statistik
- Kontak

CTA

Dashboard Admin

---

# 13. Hero Section

Desktop Height

```
720px
```

Background

Landscape Village Image

Overlay

```
rgba(11,60,53,.30)
```

Layout

```
55%
45%
```

Kolom kiri

- Welcome Text
- Hero Title
- Description
- Search
- CTA Buttons

Kolom kanan

Floating Statistics Card

---

# 14. Search Component

Style

- White
- Rounded Full
- Shadow
- Icon Search

Height

```
60px
```

Placeholder

```
Cari potensi desa,
produk,
atau lokasi...
```

Button

```
Cari
```

---

# 15. Quick Statistics

Layout

```
2 x 2 Grid
```

Style

- Glassmorphism
- Blur
- Rounded 24
- Shadow

Isi

- Icon
- Number
- Label

---

# 16. Floating Category Section

Overlap Hero

White Card

Rounded

```
28px
```

Shadow XL

Desktop

```
6 Columns
```

Kategori

- UMKM
- Pertanian
- Peternakan
- Wisata
- Sarana
- Kegiatan

Mobile

Horizontal Scroll

---

# 17. Map Section

Split Layout

```
35%
65%
```

Kiri

- Heading
- Description
- Legend
- CTA

Kanan

Leaflet Map

Floating Detail Card

Marker

Menggunakan warna berbeda untuk setiap kategori.

---

# 18. Featured UMKM Section

Layout

Split

Kiri

Section Heading

Button

Kanan

Swiper Carousel

Card

- Product Image
- Wishlist
- Product Name
- Category
- Location
- Rating
- Social Icons

Hover

- Lift
- Image Zoom

---

# 19. News Section

Layout

Split

Card

- Image
- Date Badge
- Title
- Excerpt
- Read More

Hover

Lift Card

---

# 20. Footer

Background

```
#0B3C35
```

Top Divider

Curved Wave

Layout

```
4 Columns
```

Kolom

1 Logo

2 Quick Links

3 Contact

4 Village Map

Bottom

Copyright

---

# 21. Icons

Menggunakan:

- Lucide React

Kategori memiliki icon berbeda.

Semua icon menggunakan ukuran konsisten:

```
20px
24px
32px
```

---

# 22. Animation

Button

```
Scale 1.02
```

Card

```
Lift
```

Image

```
Zoom
```

Navbar

```
Background Transition
```

Section

```
Fade Up
```

Duration

```
300ms
```

---

# 23. Accessibility

Standar

WCAG 2.1 AA

Semua tombol memiliki:

- Focus Ring
- Keyboard Navigation
- Aria Label

Contrast minimal

```
4.5 : 1
```

---

# 24. Responsive Breakpoints

Desktop XL

```
1536px
```

Desktop

```
1280px
```

Laptop

```
1024px
```

Tablet

```
768px
```

Mobile

```
390px
```

---

# 25. Design Rules

Developer **WAJIB** mengikuti aturan berikut:

- Tidak mengubah layout utama tanpa persetujuan.
- Tidak mengubah hierarchy section.
- Tidak mengubah ukuran heading utama.
- Tidak mengubah komposisi Hero.
- Tidak menghilangkan Floating Categories.
- Tidak mengganti struktur Footer.
- Tidak menggunakan library UI eksternal yang mengubah tampilan visual.

---

# 26. Source of Truth

Mockup desain yang telah disetujui menjadi referensi visual utama.

Apabila terjadi konflik antara implementasi frontend, desain lama, atau keputusan teknis lainnya, maka prioritasnya adalah:

1. Approved Mockup
2. DESIGN_SYSTEM.md
3. UI_UX_SPEC.md
4. COMPONENT_LIBRARY.md
5. Implementasi Frontend

Seluruh pengembangan UI selanjutnya wajib mengikuti urutan prioritas tersebut.
> ## Visual Reference
>
> Seluruh implementasi UI wajib mengacu pada approved high-fidelity mockup Website Potensi Desa Karamatwangi.
>
> Mockup tersebut merupakan representasi final dari:
>
> - layout
> - spacing
> - hierarchy
> - typography
> - visual composition
> - component placement
> - interaction
>
> Implementasi frontend tidak boleh menyederhanakan atau mengubah struktur visual tanpa approval.
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