# Acceptance Criteria Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Public Website Features

### AC-PUB-01: Homepage Navigation
- **Feature ID:** F-PUB-01
- **Feature Name:** Homepage
- **Objective:** Ensure the homepage renders correctly and redirects visitors to target pages.
- **Preconditions:** Public URL is resolved.
- **Acceptance Criteria:**
  - **Scenario 1: Landing Page Visual Load**
    - **Given** a visitor navigates to the village base URL (`/`).
    - **When** the page finishes loading.
    - **Then** the header navbar, hero slider, core navigation buttons, highlight stats, and footer must be visible.
  - **Scenario 2: CTA Navigation Redirects**
    - **Given** the visitor is viewing the homepage.
    - **When** the visitor clicks "Jelajahi Peta" (Launch Map).
    - **Then** the system must redirect the page to R-PUB-03 (`/peta`).
- **Success Conditions:** Homepage resolves in < 2 seconds, and all layout components mount correctly.
- **Failure Conditions:** Navbar or critical links fail to render; clicking CTA results in broken redirects.
- **Edge Cases:** Landing page resolves on unstable mobile connection: Static assets load first, dynamic data yields placeholders.
- **Validation Rules:** None.
- **Related User Stories:** US-PUB-01
- **Related Business Rules:** BR-GEN-01
- **Related Routes:** R-PUB-01

### AC-PUB-02: Interactive Map Explorer
- **Feature ID:** F-PUB-04
- **Feature Name:** Interactive Map
- **Objective:** Ensure the Leaflet map loads pins correctly, clusters markers, and filters categories.
- **Preconditions:** Leaflet and OpenStreetMap assets are loaded.
- **Acceptance Criteria:**
  - **Scenario 1: Render Markers**
    - **Given** the visitor is viewing R-PUB-03 (`/peta`).
    - **When** database contains published potentials with valid coordinates.
    - **Then** the Leaflet map must render marker pins at their physical coordinates.
  - **Scenario 2: Dynamic Category Filtering**
    - **Given** the visitor is viewing the map explorer.
    - **When** the visitor toggles the category filter "Kerajinan" (Crafts).
    - **Then** the map must hide all non-craft pins immediately.
- **Success Conditions:** Map pin interactions (clicking pins to open popup previews) execute seamlessly.
- **Failure Conditions:** Pins fail to render or cluster; filter actions do not update the map pins.
- **Edge Cases:** Multiple merchants share exact coordinates: Pins spider-cluster on click.
- **Validation Rules:** Map excludes any pin with coordinate values outside bounds.
- **Related User Stories:** US-PUB-02
- **Related Business Rules:** BR-MAP-01, BR-GEN-01
- **Related Routes:** R-PUB-03

### AC-PUB-03: Adaptive Contact Resolution
- **Feature ID:** F-PUB-12
- **Feature Name:** Adaptive Contact
- **Objective:** Verify that contact buttons trigger WhatsApp redirects based on the fallback hierarchy.
- **Preconditions:** Official village fallback contact is populated.
- **Acceptance Criteria:**
  - **Scenario 1: Direct Merchant Redirect**
    - **Given** the visitor is viewing a UMKM detail page (`/potensi/umkm/:slug`).
    - **When** the merchant profile contains a valid WhatsApp number.
    - **Then** clicking "Hubungi Penjual" must redirect the browser to `https://wa.me/[MerchantNumber]` containing a pre-filled query text.
  - **Scenario 2: Fallback to Village Contact**
    - **Given** the visitor is viewing a UMKM detail page.
    - **When** the merchant profile does not contain a registered WhatsApp or phone number.
    - **Then** clicking "Hubungi Penjual" must redirect the browser to `https://wa.me/[VillageFallbackNumber]` containing a custom message identifying the merchant profile title.
- **Success Conditions:** Redirect target matches the logic criteria.
- **Failure Conditions:** Clicking contact triggers broken links or redirects to empty/missing parameters.
- **Edge Cases:** Fallback village contact number is missing: Button renders disabled.
- **Validation Rules:** Phone numbers must start with code prefix `62`.
- **Related User Stories:** US-PUB-07
- **Related Business Rules:** BR-CON-01
- **Related Routes:** R-PUB-05

---

## 2. CMS Features

### AC-CMS-01: Secure Login Auth
- **Feature ID:** F-CMS-01
- **Feature Name:** Administrator Login
- **Objective:** Verify that access to CMS is secured.
- **Preconditions:** Admin credentials exist in database.
- **Acceptance Criteria:**
  - **Scenario 1: Authorized Access**
    - **Given** the user is viewing R-CMS-01 (`/admin/login`).
    - **When** the user inputs valid administrator credentials.
    - **Then** the backend must issue a Sanctum token, and the client must redirect to `/admin/dashboard`.
  - **Scenario 2: Validation Failure**
    - **Given** the user is on the login form.
    - **When** the user inputs incorrect details.
    - **Then** the login must be blocked, and an inline error display *"Username atau password salah"* must render.
- **Success Conditions:** Access granted to admin, dashboard loads.
- **Failure Conditions:** Unauthorized user can access dashboard; valid admin blocked.
- **Edge Cases:** User attempts brute force: Rate limiter blocks requests for 60 seconds after 5 consecutive failures.
- **Validation Rules:** Username and password cannot be empty.
- **Related User Stories:** US-CMS-01
- **Related Business Rules:** BR-AUTH-01
- **Related Routes:** R-CMS-01, R-CMS-02

### AC-CMS-02: Manage Potentials (CRUD)
- **Feature ID:** F-CMS-05
- **Feature Name:** UMKM Management
- **Objective:** Verify content CRUD operations behave correctly.
- **Preconditions:** Administrator is authenticated.
- **Acceptance Criteria:**
  - **Scenario 1: Creating Potentials**
    - **Given** the admin is viewing `/admin/potensi/tambah`.
    - **When** the admin inputs valid details and saves.
    - **Then** the database inserts the record, and the UI redirects to `/admin/potensi` showing a success alert.
  - **Scenario 2: Incomplete Inputs**
    - **Given** the admin is on the creation form.
    - **When** the admin leaves required fields blank (e.g. Title).
    - **Then** the save action must be blocked, and inline error warnings must display.
- **Success Conditions:** Database rows write, listings update.
- **Failure Conditions:** System saves entries lacking titles or invalid coordinates.
- **Edge Cases:** Admin edits coordinates: Map pin updates instantly.
- **Validation Rules:** Title: Required (max 150 chars), Coordinates: Decimal degree validation.
- **Related User Stories:** US-CMS-02
- **Related Business Rules:** BR-POT-01, BR-POT-02
- **Related Routes:** R-CMS-03, R-CMS-04, R-CMS-05

### AC-CMS-03: Excel Import ACID Integrity
- **Feature ID:** F-CMS-09
- **Feature Name:** Excel Import
- **Objective:** Verify that batch imports maintain data consistency.
- **Preconditions:** Excel template file aligns with structural layout rules.
- **Acceptance Criteria:**
  - **Scenario 1: Full Batch Success**
    - **Given** the admin uploads a correct `.xlsx` file.
    - **When** the admin clicks "Mulai Impor".
    - **Then** the database inserts all rows, and the dashboard displays a success recap.
  - **Scenario 2: Row Validation Failure Rollback**
    - **Given** the admin uploads a spreadsheet containing an error on row 12.
    - **When** the admin triggers the import.
    - **Then** the backend must roll back the transaction (no rows inserted), abort import, and display: *"Baris 12: Koordinat tidak valid. Proses impor dibatalkan."*
- **Success Conditions:** Full batch insertion succeeds.
- **Failure Conditions:** Database inserts partial rows on validation failure.
- **Edge Cases:** Spreadsheet file format is invalid: Rejects file with notice.
- **Validation Rules:** File must be valid Excel `.xlsx` sheet.
- **Related User Stories:** US-CMS-04
- **Related Business Rules:** BR-CMS-01
- **Related Routes:** R-CMS-06

---

## 3. System Features

### AC-SYS-01: Adaptive Content Architecture (ACA) Polymorphism
- **Feature ID:** F-SYS-08
- **Feature Name:** Adaptive Content Architecture (ACA)
- **Objective:** Verify that backend is database-agnostic to potential categories.
- **Preconditions:** Core entity structures defined.
- **Acceptance Criteria:**
  - **Scenario 1: Category Field Separation**
    - **Given** the system processes a CRUD request for a potential listing.
    - **When** the database writes or reads the row.
    - **Then** base attributes (Title, Description, Latitude, Longitude) must store in core columns, and category attributes must map to a polymorphic `metadata` JSON field.
- **Success Conditions:** JSON parsing operates cleanly.
- **Failure Conditions:** Invalid schema rejects entire CRUD payload.
- **Edge Cases:** Writing empty metadata: Allowed.
- **Validation Rules:** None.
- **Related User Stories:** US-SYS-01
- **Related Business Rules:** BR-ACA-01
- **Related Routes:** R-PUB-05
