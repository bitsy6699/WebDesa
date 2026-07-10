# UI/UX Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Product Identity & Design Tone
This platform is a **Digital Village Showcase Platform**, deliberately breaking away from traditional bureaucratic, text-heavy government portals. 
- **Core Experience Concept:** A premium tourism portal and local product explorer designed to invite discovery.
- **Brand Personality:** Inspiring, organic, modern, trustworthy, and community-centric.
- **UX Writing Principles:**
  - Avoid dry government terminology. Use warm, action-oriented labels.
  - E.g., Replace *Data UMKM* with **"Explore Local Products"**.
  - E.g., Replace *Statistik Desa* with **"Village Insights"**.
  - E.g., Replace *Kontak* with **"Get in Touch"**.

---

## 2. Homepage Content & Layout Flow
The landing page coordinates a narrative arc guiding the visitor from introductory branding to direct local interactions. The scrolling order is defined as follows:

```
[ Hero Section + Global Search ]
             ↓
[ Quick Categories (Dynamic ACA) ]
             ↓
[ Featured Potentials (Highlight Cards) ]
             ↓
[ Interactive Map Explorer (Leaflet) ]
             ↓
[ Unified Potentials Grid (ACA Directory) ]
             ↓
[ Village Insights (Statistics Dashboard) ]
             ↓
[ Village News Feed Preview ]
             ↓
[ Footer Sitemap & Contact Info ]
```

### 2.1. Hero Section
- **Visuals:** Full-bleed background displaying high-quality aerial photography of Desa Karamatwangi.
- **Content:**
  - Premium title: *"Welcome to Desa Karamatwangi. Explore its people, products, nature, and opportunities."*
  - Global Search Input.
  - Primary CTA: **"Explore Potentials"** (Routes to listing catalog).
  - Secondary CTA: **"Explore Map"** (Routes to interactive map view).
  - Floating Metrics Overlay showing: *Total Village Potentials*, *Total Active UMKMs*, *Showcased Categories*, and *Dusun Count*.

### 2.2. Quick Categories horizontal Navigation
- Dynamic horizontal card container. Cards represent available potential types (UMKM, Tourism, Agriculture).
- **Behavior:** These cards are dynamically generated from the CMS category catalog (ACA). If a category has no active, published entries, it is hidden from this view automatically.

### 2.3. Featured Potentials
- A clean row displaying listing cards marked by administrators as "Featured". 
- Highlights top-performing local businesses or seasonal attractions to capture instant interest.

### 2.4. Interactive Map Interface (Hero Feature)
- The Leaflet map acts as the interactive exploration canvas on the homepage.
- Visitors can zoom, toggle category filter overlays, select markers, and open preview popup modals containing thumbnails, ratings (future), and direct links to view detailed profile pages.

### 2.5. Unified Potentials Grid
- Renders listings in a unified responsive card layout.
- **Unified Card Layout Principle:** To maintain future scalability, the site does not employ custom cards for different categories. Whether an entry is a UMKM, a Tourist Spot, or an Agricultural farm, it is represented by a single card layout containing:
  1. Cover image.
  2. Polymorphic category badge.
  3. Title.
  4. Short description.
  5. Distance/Geographic locator.
  6. Action CTA: **"Adaptive Contact Button"** / **"View Profile"**.

### 2.6. Adaptive Contact UI Implementation
- The card directory and detail page buttons contain a single button labeled **"Hubungi Penjual"** or **"Get in Touch"**. 
- The interface never renders empty icons or dead-ends for missing social links. The button dynamically routes through the fallback contact logic determined in the business rules (Merchant WA $\rightarrow$ Phone $\rightarrow$ Email $\rightarrow$ Village Fallback WA), rendering the single active destination.

---

## 3. Information Architecture
The site navigation and page routing follows a nested directory approach designed to support the Adaptive Content Architecture:

```
[Public Directory]
  ├── Home (R-PUB-01)
  ├── Profil Desa (R-PUB-02)
  ├── Peta Potensi (R-PUB-03)
  ├── Daftar Potensi (R-PUB-04)
  │     └── [Category Name] -> UMKM, Wisata (ACA Dynamic Pages)
  │            └── [Slug Details] (R-PUB-05)
  └── Statistik (R-PUB-06)
```

---

## 4. Interaction Design
- **Hover Effects:** Interactive cards, search bars, and buttons expand slightly (`scale-102`) and apply smooth shadow translations (`transition-all duration-300`).
- **Map Popup Actions:** Pin selections open popup layouts displaying small imagery, merchant name, and a "Lihat Detail" link.
- **Skeleton Loaders:** During data loading, card containers display shimmering placeholder shapes to decrease perceived loading times.
- **Breadcrumb Navigation:** Renders on detail profiles (e.g., `Home > UMKM > Madu Asli Karamatwangi`) for clear spatial path hierarchy awareness.
- **CMS Map Marker Drop:** In the back-office, adding a potential displays a map where the admin can click to set coordinates, instantly auto-populating coordinate text inputs.

---

## 5. Responsive Layout Adaptations
- **Desktop Grid (> 1024px):** Renders a multi-column visual showcase. Interactive map runs in full horizontal split screen or grid containers.
- **Tablet Grid (640px - 1024px):** Compresses page layouts to 2-column or double-deck structures. Navbar menu collapses into collapsible burger drawer.
- **Mobile Grid (< 640px):** Transforms directory listings into a single-column vertical explorer stack. Map view takes up a fixed viewport area with overlay search buttons. Touch targets for all buttons extend to a minimum of `48px` to guarantee tap accessibility.

---

## 6. Accessibility Requirements (WCAG 2.1 AA Compliance)
- **Keyboard Navigation:** All interactive elements (links, filters, contact buttons, search inputs) support keyboard tab indexing, showing a visible outline state when focused.
- **Screen Reader Support:** Semantic HTML structures utilized. Image tags require descriptive Alt text parameters. Icons require `aria-hidden="true"`.
- **Text Readability:** Text sizing, color contrasts, and background overlays are designed to meet standard contrast accessibility ratios (4.5:1).
- **Form Labels:** CMS creation inputs require adjacent visual helper text or explicit placeholder guides.
