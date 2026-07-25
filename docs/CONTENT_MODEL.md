# Content Model & CMS Readiness

**Sprint 10 — Content Architecture**
**Date:** 2026-07-21
**Status:** Complete

---

## Table of Contents

1. [Current Content Types](#1-current-content-types)
2. [Content Schemas](#2-content-schemas)
3. [Content Duplication Report](#3-content-duplication-report)
4. [Reusable Component Opportunities](#4-reusable-component-opportunities)
5. [CMS Readiness Checklist](#5-cms-readiness-checklist)
6. [Missing Content Opportunities](#6-missing-content-opportunities)
7. [Suggested Backend Schema](#7-suggested-backend-schema)

---

## 1. Current Content Types

### 1.1 Dynamic (from API)

| Type | Source | Pages Using |
|------|--------|-------------|
| Potential | `GET /api/v1/potentials` | Home, Directory, Detail, Categories |
| Category | `GET /api/v1/categories` | Home, Directory, Categories, Detail |
| Statistics | `GET /api/v1/statistics/summary` | Home, Statistics |
| Media | `GET /api/v1/media` | Dashboard only |

### 1.2 Hardcoded (in source code)

| Type | Location | Content |
|------|----------|---------|
| Village Info | `AboutPage.jsx:25-30` | Quick Facts (Cikajang, 700m, Pertanian, Desa) |
| Village Info | `AboutSection.jsx:5-10` | Key Facts (Cikajang, Alam Dataran Tinggi, etc.) |
| Village Story | `AboutSection.jsx:126-131` | Story paragraphs about the village |
| Village Story | `AboutPage.jsx:122-138` | Longer story paragraphs |
| Government | `AboutPage.jsx:32-38` | Structure (Kepala Desa, Sekdes, etc.) |
| Vision/Mission | `AboutPage.jsx:39-43` | Visi + Misi items |
| Contact Info | `ContactPage.jsx:35` | WhatsApp URL |
| Contact Methods | `ContactPage.jsx:9-33` | Phone, Email, Address, Hours |
| FAQ | `ContactPage.jsx:16-33` | 4 FAQ items |
| Footer Contact | `Footer.jsx:76-77` | Border style (contact info in footer) |
| Hero Text | `HeroBanner.jsx` | Welcome text, subtitle |
| About Intro | `AboutSection.jsx:76-83` | Section heading, subtitle |
| CTA Text | `CTASection.jsx` | Final CTA content |

---

## 2. Content Schemas

### 2.1 Potential (DYNAMIC — already in DB)

```yaml
Potential:
  required:
    - id: UUID
    - title: String (max 150)
    - slug: String (unique, max 150)
    - description: Text
    - categoryId: FK → Category
    - locationId: FK → Location
    - createdById: FK → User
  optional:
    - status: "draft" | "published" | "archived"
    - coverImageId: FK → Media
    - metadata: JSON (dynamic fields per category schema)
    - isFeatured: Boolean
    - deletedAt: DateTime (soft delete)
  seo:
    - title (from potential.title)
    - description (from potential.description, truncated to 160)
    - image (from potential.coverImageId → Media.filepath)
  computed:
    - gallery: [Media] via PotentialMedia
    - readTime: derived from description word count
```

### 2.2 Category (DYNAMIC — already in DB)

```yaml
Category:
  required:
    - id: UUID
    - label: String (unique, max 50)
    - slug: String (unique, max 50)
  optional:
    - iconKey: String (max 50)
    - colorCode: String (max 7, hex)
  relations:
    - schema: CategorySchema (defines metadata fields)
    - potentials: [Potential]
  computed:
    - count: derived from potentials relation
```

### 2.3 CategorySchema (DYNAMIC — already in DB)

```yaml
CategorySchema:
  required:
    - id: UUID
    - categoryId: FK → Category (unique)
    - schemaDefinition: JSON
  purpose: >
    Defines what metadata fields each category requires.
    Example for "Wisata": { opening_hours, ticket_price, facilities }
    Example for "UMKM": { owner_name, phone, products }
    Example for "Pertanian": { crop_type, area_hectare, harvest_cycle }
```

### 2.4 Location (DYNAMIC — already in DB)

```yaml
Location:
  required:
    - id: UUID
    - latitude: Decimal(10,8)
    - longitude: Decimal(11,8)
    - address: String (max 255)
  optional:
    - dusun: String (max 100)
  relations:
    - potential: Potential (1:1)
```

### 2.5 Village Info (HARDCODED — needs CMS)

```yaml
VillageInfo:
  fields:
    - name: "Desa Karamatwangi"
    - district: "Cikajang"
    - regency: "Garut"
    - province: "Jawa Barat"
    - postalCode: "44171"
    - altitude: "700+ m"
    - elevation: "dataran tinggi"
    - livelihood: "Pertanian, perkebunan, peternakan"
    - areaDescription: Text (describes land area, features)
  used_in:
    - AboutPage Quick Facts
    - AboutSection Key Facts
    - Footer (district, regency)
    - SEO defaults
  current_source: >
    Hardcoded in AboutPage.jsx lines 25-30 and
    AboutSection.jsx lines 5-10
```

### 2.6 Village Story (HARDCODED — needs CMS)

```yaml
VillageStory:
  fields:
    - headline: String (e.g. "Desa yang Hidup dari Alam")
    - paragraphs: [Text] (2-3 paragraphs)
    - pullQuote: Text (editorial quote)
    - featuredImage: URL (hero-karamatwangi.jpg)
    - category: String (e.g. "Cerita Desa")
  used_in:
    - AboutPage (sections 3, 4)
    - AboutSection (homepage intro)
  current_source: >
    Hardcoded in AboutSection.jsx lines 126-131
    and AboutPage.jsx lines 122-138
```

### 2.7 Government Structure (HARDCODED — needs CMS)

```yaml
GovernmentStructure:
  fields:
    - title: "Struktur Pemerintahan Desa"
    - positions: Array of:
        - position: String (e.g. "Kepala Desa")
        - name: String (e.g. "Nama Pejabat")
        - period: String (optional, e.g. "2024-2030")
  used_in:
    - AboutPage (section 6)
  current_source: >
    Hardcoded in AboutPage.jsx lines 32-38
```

### 2.8 Vision & Mission (HARDCODED — needs CMS)

```yaml
VisionMission:
  fields:
    - vision: Text (single paragraph)
    - mission: Array of Text items (3-5 items)
  used_in:
    - AboutPage (section 7)
  current_source: >
    Hardcoded in AboutPage.jsx lines 39-43
```

### 2.9 Contact Information (HARDCODED — needs CMS)

```yaml
ContactInfo:
  fields:
    - phone: String (e.g. "(0232) 123-4567")
    - phoneLink: String (tel: link)
    - email: String (e.g. "info@karamatwangi.desa.id")
    - whatsapp: String (wa.me link)
    - address: String (full address)
    - addressShort: String (one-line)
    - mapsUrl: URL (Google Maps link)
    - latitude: Decimal (for embed)
    - longitude: Decimal (for embed)
  used_in:
    - ContactPage (contact methods, location)
    - Footer (contact info)
  current_source: >
    Hardcoded in ContactPage.jsx lines 9-35
    and Footer.jsx
```

### 2.10 Office Hours (HARDCODED — needs CMS)

```yaml
OfficeHours:
  fields:
    - schedule: Array of:
        - day: String (e.g. "Senin – Jumat")
        - open: Boolean
        - openTime: String (e.g. "08:00")
        - closeTime: String (e.g. "16:00")
        - timezone: "WIB"
  used_in:
    - ContactPage (office hours section)
    - ContactPage FAQ (referenced in answer)
  current_source: >
    Hardcoded in ContactPage.jsx lines 188-196
```

### 2.11 FAQ (HARDCODED — needs CMS)

```yaml
FAQ:
  fields:
    - items: Array of:
        - question: String
        - answer: Text
        - sortOrder: Int
        - isPublished: Boolean
  used_in:
    - ContactPage (FAQ accordion)
  current_source: >
    Hardcoded in ContactPage.jsx lines 16-33
```

### 2.12 Homepage Content (HARDCODED — needs CMS)

```yaml
HomepageContent:
  hero:
    - headline: String (e.g. "Selamat Datang di Potensi Desa Karamatwangi")
    - subtitle: Text
    - backgroundImage: URL
    - ctaLabel: String
    - ctaLink: String
  about_preview:
    - eyebrow: String (e.g. "Tentang Desa")
    - heading: String
    - subtitle: Text
    - storyText: [Text] (2 paragraphs)
    - featuredImage: URL
  cta:
    - title: String
    - description: Text
    - primaryLabel: String
    - primaryLink: String
    - secondaryLabel: String
    - secondaryLink: String
  used_in:
    - HeroBanner
    - AboutSection
    - CTASection (homepage final CTA)
  current_source: >
    Hardcoded across HeroBanner.jsx, AboutSection.jsx,
    CTASection.jsx
```

---

## 3. Content Duplication Report

### 3.1 HIGH — Village Description

| Location | Content | Overlap |
|----------|---------|---------|
| `AboutSection.jsx:126-131` | "Dikelilingi oleh hamparan hijau..." | Same story told in |
| `AboutPage.jsx:122-138` | "Desa Karamatwangi adalah sebuah desa..." | different lengths |
| `HeroBanner.jsx` | Welcome text | references same village |

**Impact:** Any content update requires changes in 3 places.
**Fix:** Create single `VillageStory` content type, serve via API.

### 3.2 HIGH — Village Facts

| Location | Content | Overlap |
|----------|---------|---------|
| `AboutSection.jsx:5-10` | FACTS array (Cikajang, Alam, Pertanian, Masyarakat) | Similar but not identical to |
| `AboutPage.jsx:25-30` | QUICK_FACTS (Cikajang, 700m, Pertanian, Desa) | different values/format |

**Impact:** Inconsistent village facts across pages.
**Fix:** Single `VillageInfo` content type, both pages read from same source.

### 3.3 MEDIUM — Contact Information

| Location | Content | Overlap |
|----------|---------|---------|
| `ContactPage.jsx:9-33` | Full contact methods | Same data as |
| `Footer.jsx` | Contact info display | ContactPage |
| `ContactPage.jsx:188-196` | Office hours | Referenced in FAQ answer |

**Impact:** Phone number, email, address must be updated in 2+ places.
**Fix:** Single `ContactInfo` content type.

### 3.4 LOW — Hero Image

| Location | Content | Overlap |
|----------|---------|---------|
| `Home.jsx:14` | `/hero/hero-karamatwangi.jpg` | Same image used by |
| `AboutSection.jsx:100` | `/hero/hero-karamatwangi.jpg` | multiple pages |
| `CategoriesExplorer.jsx:226` | `/hero/hero-karamatwangi.jpg` | |

**Impact:** Image path repeated 3+ times.
**Fix:** Store in `Setting` or `VillageInfo` content type.

---

## 4. Reusable Component Opportunities

### 4.1 Address Block

**Currently duplicated in:**
- ContactPage (contact method card)
- ContactPage (location section)
- Footer (column 1)
- PotentialDetail (location section)

**Proposed component:**
```jsx
<AddressBlock
  address="Jl. Raya Karamatwangi No. 1"
  district="Cikajang"
  regency="Garut"
  province="Jawa Barat"
  postalCode="44171"
  variant="card" | "inline" | "footer"
  showMap={false}
  showLink={true}
/>
```

### 4.2 Office Hours Display

**Currently duplicated in:**
- ContactPage (timeline list)
- ContactPage FAQ (referenced in answer text)

**Proposed component:**
```jsx
<OfficeHours
  schedule={[
    { day: 'Senin – Jumat', open: true, hours: '08:00 – 16:00 WIB' },
    { day: 'Sabtu', open: false },
    { day: 'Minggu', open: false },
  ]}
  variant="timeline" | "compact"
/>
```

### 4.3 Gallery

**Currently used in:**
- PotentialDetail (main gallery + thumbnails)
- AboutPage (single featured image — could be gallery)

**Proposed component:** Already exists as inline code in PotentialDetail. Should be extracted:
```jsx
<ImageGallery
  images={[url1, url2, url3]}
  activeImage={url1}
  onSwitch={fn}
  title="Gallery Title"
/>
```

### 4.4 Map Embed

**Currently duplicated in:**
- PotentialDetail (location section)
- ContactPage (location section)

**Proposed component:**
```jsx
<MapEmbed
  address="Jl. Raya Karamatwangi No. 1"
  latitude={-7.3589}
  longitude={107.7847}
  zoom={14}
  height="360px"
/>
```

### 4.5 Contact Methods

**Currently in:**
- ContactPage (4 cards)
- Footer (text display)

**Proposed component:**
```jsx
<ContactMethods
  methods={[
    { type: 'whatsapp', value: '6281234567890', label: 'Chat Langsung' },
    { type: 'phone', value: '(0232) 123-4567', label: 'Telepon' },
    { type: 'email', value: 'info@karamatwangi.desa.id', label: 'Email' },
    { type: 'address', value: 'Jl. Raya Karamatwangi...', label: 'Alamat' },
  ]}
  variant="cards" | "list" | "compact"
/>
```

---

## 5. CMS Readiness Checklist

### Backend Readiness

| Item | Status | Notes |
|------|--------|-------|
| Prisma schema covers core content | ✅ | Potential, Category, Location, Media |
| Dynamic metadata via CategorySchema | ✅ | JSON field supports per-category fields |
| Soft delete support | ✅ | Potential.deletedAt |
| Activity logging | ✅ | ActivityLog tracks all changes |
| Settings table | ✅ | Key-value store for site config |
| Image upload + management | ✅ | Media model with metadata |
| **Village Info API** | ❌ Missing | Need `GET /api/v1/village-info` |
| **Contact Info API** | ❌ Missing | Need `GET /api/v1/contact-info` |
| **FAQ API** | ❌ Missing | Need `GET /api/v1/faqs` |
| **Government Structure API** | ❌ Missing | Need `GET /api/v1/government` |
| **Vision/Mission API** | ❌ Missing | Need `GET /api/v1/vision-mission` |
| **Homepage Content API** | ❌ Missing | Need `GET /api/v1/homepage` |
| **Office Hours API** | ❌ Missing | Need `GET /api/v1/office-hours` |

### Frontend Readiness

| Item | Status | Notes |
|------|--------|-------|
| All dynamic pages use API hooks | ✅ | Home, Directory, Detail, Categories, Statistics |
| Layout system standardized | ✅ | PageHero, PageSection, PageCTA, etc. |
| SEO component reusable | ✅ | `react-helmet-async` wrapper |
| Hardcoded content identified | ✅ | This document |
| **Replace hardcoded village info** | ❌ Pending | After API is created |
| **Replace hardcoded contact info** | ❌ Pending | After API is created |
| **Replace hardcoded FAQ** | ❌ Pending | After API is created |
| **Replace hardcoded government** | ❌ Pending | After API is created |
| **Replace hardcoded vision/mission** | ❌ Pending | After API is created |
| **Replace hardcoded homepage content** | ❌ Pending | After API is created |

### Content Migration Priority

| Priority | Content Type | Effort | Impact |
|----------|-------------|--------|--------|
| 1 (High) | Contact Info | 2 hours | Used in 3 places |
| 2 (High) | Village Info | 2 hours | Used in 4 places |
| 3 (High) | FAQ | 1 hour | Content updates without deploy |
| 4 (Medium) | Government Structure | 1 hour | Periodic updates |
| 5 (Medium) | Vision/Mission | 1 hour | Periodic updates |
| 6 (Medium) | Office Hours | 30 min | Holiday schedule changes |
| 7 (Low) | Homepage Content | 3 hours | Marketing copy changes |
| 8 (Low) | Village Story | 2 hours | Editorial content |

---

## 6. Missing Content Opportunities

### 6.1 Blog/Article System

**Current:** No blog or article content type.
**Opportunity:** Add `Article` model for news, announcements, event reports.
```yaml
Article:
  - id: UUID
  - title: String
  - slug: String (unique)
  - content: RichText
  - excerpt: Text
  - coverImageId: FK → Media
  - authorId: FK → User
  - status: "draft" | "published"
  - publishedAt: DateTime
  - tags: [String]
  - seoTitle: String
  - seoDescription: Text
```

### 6.2 Event/Calendar System

**Current:** No event content type.
**Opportunity:** Add `Event` model for village events, ceremonies, meetings.
```yaml
Event:
  - id: UUID
  - title: String
  - description: Text
  - startDate: DateTime
  - endDate: DateTime
  - location: String
  - isPublic: Boolean
  - coverImageId: FK → Media
```

### 6.3 Document/Archive System

**Current:** No document management.
**Opportunity:** Add `Document` model for village regulations, reports, forms.
```yaml
Document:
  - id: UUID
  - title: String
  - category: "regulation" | "report" | "form" | "other"
  - fileUrl: URL
  - publishedAt: DateTime
  - description: Text
```

### 6.4 Testimonial/Quote System

**Current:** Vision/Mission hardcoded. No community voice.
**Opportunity:** Add `Testimonial` model for community quotes, success stories.
```yaml
Testimonial:
  - id: UUID
  - quote: Text
  - author: String
  - role: String (e.g. "Petani Teh")
  - avatarUrl: URL
  - isPublished: Boolean
  - sortOrder: Int
```

### 6.5 Photo Gallery (standalone)

**Current:** Galleries only attached to Potentials.
**Opportunity:** Add standalone `Gallery` model for village photo collections.
```yaml
Gallery:
  - id: UUID
  - title: String
  - slug: String
  - description: Text
  - coverImageId: FK → Media
  - images: [Media] via GalleryMedia
  - publishedAt: DateTime
```

---

## 7. Suggested Backend Schema

### New Models (non-breaking additions)

```prisma
model VillageInfo {
  key       String   @id @db.VarChar(50)  // e.g. "name", "district", "altitude"
  value     String   @db.Text
  type      String   @default("string") @db.VarChar(20)  // string, number, text, json
  group     String   @default("general") @db.VarChar(50)  // basic, geography, contact
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("village_info")
}

model FAQ {
  id        String   @id @default(uuid())
  question  String   @db.VarChar(255)
  answer    String   @db.Text
  sortOrder Int      @default(0) @map("sort_order")
  isPublished Boolean @default(true) @map("is_published")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("faqs")
}

model GovernmentPosition {
  id        String   @id @default(uuid())
  position  String   @db.VarChar(100)
  name      String   @db.VarChar(150)
  period    String?  @db.VarChar(50)
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("government_positions")
}

model VisionMission {
  id        String   @id @default(uuid())
  type      String   @db.VarChar(20)  // "vision" or "mission"
  content   String   @db.Text
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("vision_mission")
}

model Article {
  id            String   @id @default(uuid())
  title         String   @db.VarChar(200)
  slug          String   @unique @db.VarChar(200)
  content       String   @db.Text
  excerpt       String?  @db.Text
  coverImageId  String?  @map("cover_image_id")
  authorId      String   @map("author_id")
  status        String   @default("draft") @db.VarChar(20)
  publishedAt   DateTime? @map("published_at")
  tags          Json?
  seoTitle      String?  @map("seo_title") @db.VarChar(200)
  seoDescription String? @map("seo_description") @db.Text
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")
  deletedAt     DateTime? @map("deleted_at")

  author     User   @relation(fields: [authorId], references: [id])
  coverImage Media? @relation("ArticleCover", fields: [coverImageId], references: [id])

  @@index([status, publishedAt])
  @@map("articles")
}
```

### New API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/village-info` | GET | All village info key-value pairs |
| `/api/v1/village-info/:key` | GET | Single village info item |
| `/api/v1/faqs` | GET | Published FAQs sorted |
| `/api/v1/government` | GET | Government positions sorted |
| `/api/v1/vision-mission` | GET | Vision and mission items |
| `/api/v1/contact-info` | GET | Contact methods, hours, maps |
| `/api/v1/articles` | GET | Published articles (paginated) |
| `/api/v1/articles/:slug` | GET | Single article by slug |

### Existing Models — No Changes Needed

| Model | Status | Notes |
|-------|--------|-------|
| Potential | ✅ Complete | Covers all dynamic content |
| Category | ✅ Complete | With schema for custom fields |
| CategorySchema | ✅ Complete | Flexible JSON metadata |
| Location | ✅ Complete | Lat/lng/address/dusun |
| Media | ✅ Complete | File management |
| Setting | ✅ Complete | Key-value for site config |
| User | ✅ Complete | Auth and ownership |
| ActivityLog | ✅ Complete | Audit trail |

---

## Summary

| Category | Count |
|----------|-------|
| Dynamic content types | 4 (Potential, Category, Location, Media) |
| Hardcoded content types needing CMS | 8 (Village Info, Story, Government, Vision, Contact, Hours, FAQ, Homepage) |
| Reusable components identified | 5 (Address, Hours, Gallery, Map, Contact) |
| Missing content opportunities | 5 (Article, Event, Document, Testimonial, Gallery) |
| New models suggested | 5 (VillageInfo, FAQ, GovernmentPosition, VisionMission, Article) |
| New API endpoints suggested | 8 |
| Estimated migration effort | ~12 hours (all hardcoded content) |
