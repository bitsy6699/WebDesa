# Routes & Navigation Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Public Routing Catalog

### R-PUB-01: Homepage
- **Route ID:** R-PUB-01
- **Route Name:** Homepage
- **URL Pattern:** `/`
- **Page Purpose:** Core entry landing page displaying banners, statistics overview, and pathways.
- **User Type:** Public Visitor / Tourist
- **Access Level:** Public (Unauthenticated)
- **Entry Point:** Direct typing of URL, clicking brand logo in header, or browser home command.
- **Exit Point:** Navigation header links, hero CTA buttons, or footer links.
- **Related Features:** F-PUB-01 (Homepage), F-PUB-02 (Hero Section)
- **Related User Flow:** UF-VIS-01 (Explore Map)
- **Related Business Rules:** BR-GEN-01 (Public Content Visibility)

### R-PUB-02: Village Profile
- **Route ID:** R-PUB-02
- **Route Name:** Village Profile
- **URL Pattern:** `/profil`
- **Page Purpose:** Historical, vision/mission, and organizational review of Desa Karamatwangi.
- **User Type:** Public Visitor
- **Access Level:** Public (Unauthenticated)
- **Entry Point:** Navigation bar click ("Profil Desa").
- **Exit Point:** Navigation header/footer.
- **Related Features:** F-PUB-03 (Village Profile)
- **Related User Flow:** None.
- **Related Business Rules:** None.

### R-PUB-03: Interactive Map Explorer
- **Route ID:** R-PUB-03
- **Route Name:** Interactive Map Explorer
- **URL Pattern:** `/peta`
- **Page Purpose:** Visual map explorer built with Leaflet for spatial navigation.
- **User Type:** Public Visitor / Tourist
- **Access Level:** Public (Unauthenticated)
- **Entry Point:** Navbar menu click ("Peta Potensi"), hero "Lihat Map" CTA button.
- **Exit Point:** Detail page links, header/footer nav.
- **Related Features:** F-PUB-04 (Interactive Map), F-PUB-09 (Filter)
- **Related User Flow:** UF-VIS-01 (Explore Map)
- **Related Business Rules:** BR-MAP-01 (Map Marker Status), BR-GEN-01 (Public Content Visibility)

### R-PUB-04: Potential Explorer / UMKM Catalog
- **Route ID:** R-PUB-04
- **Route Name:** Potential Explorer / UMKM Catalog
- **URL Pattern:** `/potensi`
- **Page Purpose:** Searchable catalog list displaying all published village business profiles.
- **User Type:** Public Visitor / Buyer
- **Access Level:** Public (Unauthenticated)
- **Entry Point:** Navbar click ("Daftar Potensi"), hero "Cari UMKM" button.
- **Exit Point:** Item detail card click, pagination actions, header/footer.
- **Related Features:** F-PUB-05 (Explorer), F-PUB-06 (UMKM Catalog), F-PUB-08 (Search)
- **Related User Flow:** UF-VIS-02 (Search & Browse)
- **Related Business Rules:** BR-GEN-01, BR-SRCH-01 (Case-Insensitive search)

### R-PUB-05: Potential Detail Page (Polymorphic Slug)
- **Route ID:** R-PUB-05
- **Route Name:** Potential Detail Page
- **URL Pattern:** `/potensi/:category/:slug`
- **Page Purpose:** Detailed merchant/spot display page showing gallery, geolocation, and Adaptive Contact triggers.
- **User Type:** Public Visitor / Buyer
- **Access Level:** Public (Unauthenticated)
- **Entry Point:** Click "Lihat Detail" in map popup or directory card.
- **Exit Point:** Breadcrumb click, navigation header, contact click.
- **Related Features:** F-PUB-07 (Detail Page), F-PUB-12 (Adaptive Contact)
- **Related User Flow:** UF-VIS-01 (Explore Map), UF-SYS-01 (Adaptive Contact)
- **Related Business Rules:** BR-GEN-01, BR-CON-01 (Fallback Hierarchy), BR-ACA-01 (Metadata Isolation)

### R-PUB-06: Statistics Dashboard
- **Route ID:** R-PUB-06
- **Route Name:** Statistics Dashboard
- **URL Pattern:** `/statistik`
- **Page Purpose:** Visualizes village potential ratios and demographic data using Chart.js.
- **User Type:** Public Visitor / Researcher
- **Access Level:** Public (Unauthenticated)
- **Entry Point:** Navbar click ("Statistik").
- **Exit Point:** Navigation header/footer.
- **Related Features:** F-PUB-10 (Statistics Dashboard)
- **Related User Flow:** None.
- **Related Business Rules:** BR-STAT-01 (Draft Counts Exclusion)

### R-PUB-07: Error 404 Page
- **Route ID:** R-PUB-07
- **Route Name:** Error 404 Page
- **URL Pattern:** `*` (Catch-all)
- **Page Purpose:** Displays user-friendly page not found notification.
- **User Type:** Public Visitor / Admin
- **Access Level:** Public (Unauthenticated)
- **Entry Point:** System redirects on non-existent routes or draft page queries.
- **Exit Point:** Back to home button redirect.
- **Related Features:** F-SYS-04 (Error Handling)
- **Related User Story:** US-SYS-02 (Graceful Error Interceptor)
- **Related Business Rules:** None.

---

## 2. CMS (Backoffice) Routing Catalog

### R-CMS-01: Admin Login
- **Route ID:** R-CMS-01
- **Route Name:** Admin Login
- **URL Pattern:** `/admin/login`
- **Page Purpose:** Authentication form for secure access to control panel.
- **User Type:** Unauthenticated Administrator
- **Access Level:** Guest Only (Redirects to dashboard if already authenticated)
- **Entry Point:** Direct typing of URL.
- **Exit Point:** Successful auth redirect to dashboard.
- **Related Features:** F-CMS-01 (Admin Login), F-SYS-01 (Authentication)
- **Related User Flow:** UF-ADM-01 (Create Content)
- **Related Business Rules:** BR-AUTH-01 (Single Admin Session)

### R-CMS-02: Admin Dashboard
- **Route ID:** R-CMS-02
- **Route Name:** Admin Dashboard
- **URL Pattern:** `/admin/dashboard`
- **Page Purpose:** Admin home pane showing counters, shortcuts, and navigation sidebar.
- **User Type:** Authenticated Administrator
- **Access Level:** Private (Requires Sanctum Token)
- **Entry Point:** Valid login or dashboard link.
- **Exit Point:** Logout button, CMS sidebar links.
- **Related Features:** F-CMS-02 (Dashboard)
- **Related User Flow:** UF-ADM-01 (Create Content)
- **Related Business Rules:** BR-AUTH-01, BR-AUTH-02 (Session Expiry)

### R-CMS-03: Manage Potentials (CRUD List)
- **Route ID:** R-CMS-03
- **Route Name:** Manage Potentials
- **URL Pattern:** `/admin/potensi`
- **Page Purpose:** List view of all potentials in database with search, filter, publish toggle, and delete commands.
- **User Type:** Authenticated Administrator
- **Access Level:** Private (Requires Sanctum Token)
- **Entry Point:** Sidebar link "Kelola Potensi".
- **Exit Point:** "Tambah Potensi" link, edit row link, sidebar.
- **Related Features:** F-CMS-03 (Content Management)
- **Related User Flow:** UF-ADM-01, UF-ADM-02 (Bulk Import)
- **Related Business Rules:** BR-AUTH-01, BR-GEN-01, BR-GEN-02

### R-CMS-04: Create Potential Profile
- **Route ID:** R-CMS-04
- **Route Name:** Create Potential Profile
- **URL Pattern:** `/admin/potensi/tambah`
- **Page Purpose:** Input form to add a new potential.
- **User Type:** Authenticated Administrator
- **Access Level:** Private (Requires Sanctum Token)
- **Entry Point:** Click "Tambah Potensi" inside `/admin/potensi`.
- **Exit Point:** Click Save, Cancel button.
- **Related Features:** F-CMS-05 (UMKM CRUD), F-CMS-08 (Image Upload)
- **Related User Flow:** UF-ADM-01 (Create Content)
- **Related Business Rules:** BR-AUTH-01, BR-POT-01, BR-POT-02, BR-MED-01

### R-CMS-05: Edit Potential Profile
- **Route ID:** R-CMS-05
- **Route Name:** Edit Potential Profile
- **URL Pattern:** `/admin/potensi/edit/:id`
- **Page Purpose:** Form to update coordinates, title, custom metadata, and images of an active potential.
- **User Type:** Authenticated Administrator
- **Access Level:** Private (Requires Sanctum Token)
- **Entry Point:** Click "Edit" link on a row in `/admin/potensi`.
- **Exit Point:** Click Update, Cancel button.
- **Related Features:** F-CMS-05 (UMKM CRUD), F-CMS-08 (Image Upload)
- **Related User Flow:** UF-ADM-01
- **Related Business Rules:** BR-AUTH-01, BR-POT-01, BR-POT-02, BR-MED-01

### R-CMS-06: Bulk Importer (Excel)
- **Route ID:** R-CMS-06
- **Route Name:** Bulk Importer
- **URL Pattern:** `/admin/import`
- **Page Purpose:** Upload portal for Excel row parsing.
- **User Type:** Authenticated Administrator
- **Access Level:** Private (Requires Sanctum Token)
- **Entry Point:** Sidebar link "Impor Excel".
- **Exit Point:** Click Import, sidebar navigation.
- **Related Features:** F-CMS-09 (Excel Import)
- **Related User Flow:** UF-ADM-02 (Bulk Import)
- **Related Business Rules:** BR-AUTH-01, BR-CMS-01 (Batch Transaction Integrity)

### R-CMS-07: Media Library Manager
- **Route ID:** R-CMS-07
- **Route Name:** Media Library Manager
- **URL Pattern:** `/admin/media`
- **Page Purpose:** Layout view of all stored visuals with deletion controls.
- **User Type:** Authenticated Administrator
- **Access Level:** Private (Requires Sanctum Token)
- **Entry Point:** Sidebar link "Media Library".
- **Exit Point:** Sidebar.
- **Related Features:** F-CMS-07 (Media Library), F-SYS-03 (File Storage)
- **Related User Flow:** UF-ADM-01
- **Related Business Rules:** BR-AUTH-01, BR-MED-01

### R-CMS-08: General Website Settings
- **Route ID:** R-CMS-08
- **Route Name:** General Website Settings
- **URL Pattern:** `/admin/pengaturan`
- **Page Purpose:** Configuration inputs for global site parameters (e.g. fallback WhatsApp, profile description).
- **User Type:** Authenticated Administrator
- **Access Level:** Private (Requires Sanctum Token)
- **Entry Point:** Sidebar link "Website Settings".
- **Exit Point:** Click Save, sidebar navigation.
- **Related Features:** F-CMS-11 (Website Settings), F-CMS-12 (Homepage Content Mgmt)
- **Related User Flow:** None.
- **Related Business Rules:** BR-AUTH-01, BR-CON-01 (Fallback Contact Settings)

---

## 3. Future Routing Targets (ACA Verification)
The system directory `/potensi` dynamically intercepts sub-categories using polymorphic mapping:
- **Tourism Explorer Catalog:** `/potensi/wisata` (Routes to F-PUB-05 with category filter set to Wisata).
- **Tourism Detail View:** `/potensi/wisata/:slug` (Routes to R-PUB-05 using Wisata detail metadata template).
- **Agriculture Catalog:** `/potensi/pertanian` (Routes to F-PUB-05 with category filter set to Pertanian).
- **Agriculture Detail View:** `/potensi/pertanian/:slug` (Routes to R-PUB-05 using Pertanian detail metadata template).
- **Village Gallery:** `/galeri` (Placeholders for media galleries).
- **Village News Feed:** `/berita` (Placeholders for local blog updates).

---

## 4. Navigation Rules

### 4.1. Navbar Layout Structure
- **Public Header Menu items:**
  - `Beranda` (R-PUB-01)
  - `Peta Potensi` (R-PUB-03)
  - `Daftar Potensi` (R-PUB-04)
  - `Profil Desa` (R-PUB-02)
  - `Statistik` (R-PUB-06)
- **Sticky Behavior:** Navbar is fixed to screen top. Mobile views render as an overlay hamburger slide drawer.

### 4.2. Breadcrumbs Navigation Rules
- Renders hierarchy path dynamically on child pages.
- **Pattern:** `Home > [Category/Potential Directory] > [Item Detail Title]`
- Example on detail page: `Beranda > UMKM > Kopi Karamatwangi`
- Clicking any parent segment routes user back to that location.

### 4.3. Authorization Guard & Redirection Constraints
- **Auth Guard:** All routes under `/admin/*` (except `/admin/login`) execute a token check. If token is invalid or missing, system intercepts routing and redirects user immediately to `/admin/login`.
- **Session Expiry Redirect:** If an API query returns HTTP status code `401 Unauthorized` during CMS usage, client terminates active storage credentials and redirects to the login view with an error banner: *"Sesi Anda telah berakhir."* (Your session has expired).
- **Login Redirect:** If an authenticated admin manually navigates to `/admin/login`, the system redirects them to `/admin/dashboard`.
