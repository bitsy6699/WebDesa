# RESPONSIVE_GUIDELINES.md

# Website Potensi Desa Karamatwangi
## Responsive Design Guidelines
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

Dokumen ini menjadi standar implementasi responsive untuk seluruh Website Potensi Desa Karamatwangi.

Target utama:

- Mobile First
- Tablet Friendly
- Desktop Optimized
- Konsisten dengan mockup yang telah disetujui
- Tidak mengubah urutan informasi penting antar breakpoint

Semua halaman harus terlihat baik pada ukuran layar mulai dari 320px hingga layar desktop besar.

---

# 2. Breakpoints

Menggunakan standar Tailwind CSS.

| Device | Width |
|----------|--------|
| Mobile | <640px |
| Small Tablet | ≥640px |
| Tablet | ≥768px |
| Laptop | ≥1024px |
| Desktop | ≥1280px |
| Large Desktop | ≥1536px |

---

# 3. Container

Desktop

```
max-width:1280px
```

Tablet

```
padding-inline:32px
```

Mobile

```
padding-inline:20px
```

Seluruh section menggunakan container yang sama.

---

# 4. Header

## Desktop

Logo kiri

Menu tengah

CTA kanan

Sticky Navigation

---

## Tablet

Logo

↓

Menu lebih rapat

↓

CTA tetap tampil

---

## Mobile

Logo kiri

↓

Hamburger kanan

↓

Menu menjadi Drawer

CTA Dashboard dipindahkan ke dalam drawer.

---

# 5. Hero Section

Desktop

```
Split Layout

Text kiri

Quick Stats kanan
```

---

Tablet

```
Text atas

Quick Stats bawah
```

---

Mobile

```
Judul

↓

Deskripsi

↓

Search Bar

↓

CTA Buttons

↓

Quick Stats
```

Quick Stats berubah menjadi grid 2 kolom.

Hero image tetap memenuhi background.

---

# 6. Search Bar

Desktop

Lebar ±600px.

Tablet

Lebar penuh.

Mobile

100%

Button tetap berada dalam satu baris.

Tidak berpindah ke bawah.

---

# 7. CTA Buttons

Desktop

Horizontal

```
[ Jelajahi ]

[ Lihat Peta ]
```

---

Tablet

Tetap horizontal.

---

Mobile

Vertical Stack.

```
Jelajahi Potensi

↓

Lihat Peta
```

---

# 8. Floating Categories

Desktop

6 Columns

---

Tablet

3 Columns

2 Rows

---

Mobile

Horizontal Scroll

```
[UMKM][Wisata][Pertanian]→
```

Tidak boleh menjadi grid panjang ke bawah.

---

# 9. Statistics

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
2 Columns
```

Card tetap memiliki ukuran yang seragam.

---

# 10. Interactive Map

Desktop

```
Text

|

Map
```

Split 40/60.

---

Tablet

Text

↓

Map

---

Mobile

Text

↓

Legend

↓

Button

↓

Map

Map minimum height

```
350px
```

---

# 11. Floating Map Detail

Desktop

Muncul di kanan bawah map.

---

Tablet

Lebih kecil.

---

Mobile

Bottom Sheet.

Tidak menggunakan floating card.

---

# 12. Featured UMKM

Desktop

4 Card terlihat.

---

Laptop

3 Card.

---

Tablet

2 Card.

---

Mobile

1 Card.

Swiper aktif pada Tablet dan Mobile.

---

# 13. Product Card

Desktop

Hover Lift

Image Zoom

---

Tablet

Hover tetap aktif.

---

Mobile

Hover dihilangkan.

Menggunakan active state saja.

---

# 14. News Section

Desktop

3 Card.

Tablet

2 Card.

Mobile

1 Card.

Swiper digunakan pada layar kecil.

---

# 15. Directory Toolbar

Desktop

Search

Filter

Sort

Horizontal.

---

Tablet

Search

↓

Filter

↓

Sort

---

Mobile

Search penuh.

Filter menjadi horizontal scroll chips.

Sort dipindahkan ke bawah.

---

# 16. Directory Grid

Desktop

4 Columns

---

Laptop

3 Columns

---

Tablet

2 Columns

---

Mobile

1 Column

---

# 17. Detail Page

Desktop

```
Gallery

|

Information
```

---

Tablet

Gallery

↓

Information

---

Mobile

Semua menjadi satu kolom.

Metadata tetap muncul setelah deskripsi.

---

# 18. Footer

Desktop

4 Columns

---

Tablet

2 Columns

---

Mobile

1 Column

Urutan

Logo

↓

Quick Links

↓

Contact

↓

Map

---

# 19. Images

Desktop

Menggunakan ukuran penuh.

Tablet

Auto Resize.

Mobile

Cover image mengikuti aspect ratio.

Tidak boleh stretch.

Gunakan

```
object-cover
```

---

# 20. Typography Scaling

| Element | Desktop | Mobile |
|----------|----------|----------|
| Hero Title | 56px | 36px |
| H1 | 40px | 30px |
| H2 | 32px | 24px |
| H3 | 24px | 20px |
| Body | 16px | 15px |
| Small | 14px | 13px |

Gunakan `clamp()` apabila memungkinkan.

---

# 21. Spacing

Desktop

Section

```
96px
```

Tablet

```
72px
```

Mobile

```
56px
```

Gap antar card

Desktop

```
32px
```

Tablet

```
24px
```

Mobile

```
16px
```

---

# 22. Touch Target

Seluruh tombol minimal

```
44px
```

Icon Button

```
44x44px
```

Chip

```
40px
```

---

# 23. Animation

Desktop

Hover

Lift

Fade

Image Zoom

---

Tablet

Hover ringan.

---

Mobile

Hover dihilangkan.

Gunakan

Tap Feedback.

---

# 24. Performance

Lazy Load

- Gallery
- News
- UMKM
- Map

Gunakan responsive image.

Prioritaskan Hero Image.

---

# 25. Accessibility

Kontras minimal WCAG AA.

Keyboard Navigation wajib.

Focus Ring terlihat.

Alt text wajib.

Semua Icon Button memiliki aria-label.

---

# 26. Responsive Verification Checklist

Setiap halaman wajib diverifikasi pada:

- 375px (Mobile)
- 768px (Tablet)
- 1024px (Laptop)
- 1280px (Desktop)

Checklist:

- Layout tidak pecah
- Tidak ada horizontal scroll
- Typography proporsional
- Button mudah ditekan
- Image tidak stretch
- Map tetap interaktif
- Carousel berjalan normal
- Footer tetap rapi
- Header sticky berfungsi
- Drawer mobile berjalan baik

---

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