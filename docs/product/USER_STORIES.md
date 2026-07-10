# User Stories

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. User Personas

### 1.1. Core Personas (Version 1.0)
- **Visitor (Public / Tourist / Local Consumer):** Wants to explore local products, find locations of businesses, and contact sellers. Requires a highly intuitive, mobile-optimized experience with minimal page load latency.
- **Village Administrator (Staff / Operator):** Has access to admin credentials. Tasked with content updates, settings modification, and bulk data audits. Requires simple interfaces, data validations, and error descriptions.

### 1.2. Future Personas (Out of Scope for V1)
- **Merchant / UMKM Owner:** Wants to edit their own profile or list products directly. (Deferred to later releases; V1 utilizes centralized admin management).

---

## 2. Epics & User Stories

### Epic: Public Website

#### US-PUB-01: Homepage Navigation
- **Persona:** Visitor
- **Epic:** Public Website
- **User Story:** *As a visitor, I want to land on a visually appealing homepage so that I can quickly learn what Desa Karamatwangi has to offer and navigate to the map or directory.*
- **Goal:** Provide clear entry points for exploration.
- **Business Value:** Retain users, lower bounce rates, and direct traffic to local catalog conversions.
- **Priority:** Must Have
- **Preconditions:** Server is online.
- **Main Success Scenario:**
  1. Visitor opens base URL.
  2. Renders tagline, quick statistics, and visual hero section.
  3. Clicking "Jelajahi Peta" routes user to interactive map view.
- **Alternative Scenario:** API fails: Renders static page structure with cached statistic defaults.
- **Edge Cases:** Visitor loads page on poor 3G connection: Images are lazy-loaded to prevent browser blocking.
- **Acceptance Criteria:**
  - [ ] Page loads in < 2.0s.
  - [ ] Hero CTA buttons redirect to `/map` and `/potensi` correctly.
- **Related Feature:** F-PUB-01, F-PUB-02
- **Related Business Rule:** Localization Restriction (Indonesian UI).

#### US-PUB-02: Interactive Map Exploration
- **Persona:** Visitor (Tourist / Consumer)
- **Epic:** Public Website
- **User Story:** *As a tourist, I want to see local UMKMs pinned on an interactive map so that I can visually discover what businesses are nearby or along my travel route.*
- **Goal:** Explore Karamatwangi's potentials geographically.
- **Business Value:** Facilitates location-based discoverability of businesses.
- **Priority:** Must Have
- **Preconditions:** OpenStreetMap tile provider is reachable.
- **Main Success Scenario:**
  1. Visitor opens the map view.
  2. Map centers on Karamatwangi.
  3. Displays clustering pins. Clicking a pin opens a popup showing title, category, and photo.
  4. Clicking "Lihat Detail" redirects to merchant detail page.
- **Alternative Scenario:** User filters categories (e.g. food): Non-food markers vanish immediately.
- **Edge Cases:** Pin coordinate coordinates sit on top of each other: Leaflet cluster expands pins into spiderweb pattern.
- **Acceptance Criteria:**
  - [ ] Map initializes, centers on target village.
  - [ ] Toggling filters alters pin visibility instantly without page reloads.
- **Related Feature:** F-PUB-04, F-PUB-09
- **Related Business Rule:** Draft Status Isolation.

#### US-PUB-03: Browse UMKM Directory
- **Persona:** Visitor (Buyer)
- **Epic:** Public Website
- **User Story:** *As a local consumer, I want to browse a paginated grid list of local UMKMs so that I can see the full collection of village products.*
- **Goal:** Easily browse merchants through catalog lists.
- **Business Value:** Increases sales conversions for listed businesses.
- **Priority:** Must Have
- **Preconditions:** Active potentials exist in DB.
- **Main Success Scenario:**
  1. Visitor opens listing directory.
  2. Renders list cards showing merchant thumbnail, title, sub-category, and short description.
  3. Renders pagination buttons at bottom of grid.
- **Alternative Scenario:** None.
- **Edge Cases:** Database has zero entries: Page displays *"Tidak ada potensi ditemukan."*
- **Acceptance Criteria:**
  - [ ] List is paginated (e.g., 12 items per page).
  - [ ] Cards display category labels and short descriptions clearly.
- **Related Feature:** F-PUB-05, F-PUB-06
- **Related Business Rule:** Draft Status Isolation.

#### US-PUB-04: Merchant Detail View
- **Persona:** Visitor
- **Epic:** Public Website
- **User Story:** *As an interested buyer, I want to view a merchant's detailed profile page so that I can inspect their products, physical address, and contact details.*
- **Goal:** Review full details of a specific business listing.
- **Business Value:** Builds customer trust and prompts merchant interactions.
- **Priority:** Must Have
- **Preconditions:** Target potential ID is valid and published.
- **Main Success Scenario:**
  1. Visitor clicks on listing.
  2. Detail page renders: Image gallery, description text, mini location map, and contact buttons.
- **Alternative Scenario:** Description is empty: Hides description block, showing only title and gallery.
- **Edge Cases:** User inputs dynamic URL for draft potential: Returns 404 page.
- **Acceptance Criteria:**
  - [ ] Detail page renders.
  - [ ] Direct link to map location displays correct pin on map.
- **Related Feature:** F-PUB-07
- **Related Business Rule:** Draft Status Isolation.

#### US-PUB-05: Catalog Search
- **Persona:** Visitor
- **Epic:** Public Website
- **User Story:** *As a visitor, I want to search potentials by typing text so that I can find a specific merchant or product immediately.*
- **Goal:** Perform keyword lookups in catalog.
- **Business Value:** Speeds up conversion funnel.
- **Priority:** Must Have
- **Preconditions:** Directory page loaded.
- **Main Success Scenario:**
  1. User types "Madu" in search bar.
  2. Results update debounced to list matches.
- **Alternative Scenario:** No items match: Renders clean search fallback message.
- **Edge Cases:** User inputs special symbols/code: Input is sanitized; database query executes safely.
- **Acceptance Criteria:**
  - [ ] Searches titles, short descriptions, and categories.
  - [ ] Debounce interval: 300ms.
- **Related Feature:** F-PUB-08
- **Related Business Rule:** None.

#### US-PUB-06: Dynamic Statistics Dashboard
- **Persona:** Visitor / researcher
- **Epic:** Public Website
- **User Story:** *As a researcher, I want to view charts showing village metrics so that I can easily analyze the distribution of local industries.*
- **Goal:** Visualize village statistics.
- **Business Value:** Elevates local research credibility.
- **Priority:** Should Have
- **Preconditions:** Statistics data initialized in database.
- **Main Success Scenario:**
  1. User navigates to `/statistik`.
  2. Renders dynamic charts detailing potential ratios (Chart.js canvas).
- **Alternative Scenario:** Browser blocks javascript canvas: Displays simple layout table showing metrics data.
- **Edge Cases:** Statistics counts are zero: Displays warning notice and default profile description.
- **Acceptance Criteria:**
  - [ ] Charts render and match database totals.
- **Related Feature:** F-PUB-10
- **Related Business Rule:** None.

#### US-PUB-07: Adaptive Contact Channel
- **Persona:** Visitor (Buyer)
- **Epic:** Public Website
- **User Story:** *As a buyer, I want to click a contact button to directly send a WhatsApp message to the merchant or fallback to the village office if the merchant doesn't have a phone.*
- **Goal:** Establish a quick channel to initiate a transaction.
- **Business Value:** Guarantees connection to village representatives, driving trust and transactions.
- **Priority:** Must Have
- **Preconditions:** Fallback village contact number configured in website settings.
- **Main Success Scenario:**
  1. User clicks "Hubungi Penjual".
  2. If merchant phone is available, redirects to WhatsApp web/app with pre-filled message mentioning product title.
- **Alternative Scenario (Fallback):**
  1. Merchant phone is missing.
  2. System redirects to official village WhatsApp number with a custom pre-filled message indicating interest in that specific merchant.
- **Edge Cases:** Neither number available: Disables button, prompts contact via email.
- **Acceptance Criteria:**
  - [ ] Correctly resolves redirection URL according to PRD fallback business rules.
- **Related Feature:** F-PUB-12
- **Related Business Rule:** Adaptive Contact Fallback.

---

### Epic: CMS (Back Office)

#### US-CMS-01: Secure Administrator Login
- **Persona:** Village Administrator
- **Epic:** CMS
- **User Story:** *As the village administrator, I want to log in securely to the admin panel so that only authorized personnel can alter website information.*
- **Goal:** Secure back-office operations.
- **Business Value:** Secures data integrity.
- **Priority:** Must Have
- **Preconditions:** Login page loaded.
- **Main Success Scenario:**
  1. Admin inputs valid credentials.
  2. Sanctum generates session token.
  3. Client routes to dashboard.
- **Alternative Scenario:** Incorrect inputs: Shows validation message.
- **Edge Cases:** Admin attempts brute force: Lockout trigger active after 5 failures.
- **Acceptance Criteria:**
  - [ ] Login succeeds only with verified credentials.
  - [ ] Token is stored securely in httpOnly cookie.
- **Related Feature:** F-CMS-01, F-SYS-01
- **Related Business Rule:** CMS Role Boundary.

#### US-CMS-02: Manage UMKM Listings (CRUD)
- **Persona:** Village Administrator
- **Epic:** CMS
- **User Story:** *As the village administrator, I want to create, read, update, and delete UMKM entries so that our online showcase remains fresh and correct.*
- **Goal:** Maintain listing data.
- **Business Value:** Standardizes data management.
- **Priority:** Must Have
- **Preconditions:** Admin is authenticated.
- **Main Success Scenario:**
  1. Admin clicks "Tambah Potensi".
  2. Inputs fields (title, description, coordinates, category).
  3. Selects image, clicks Save. Entry added to list.
- **Alternative Scenario (Update):** Admin edits field, changes coordinates via map pin drop, clicks Update. Entry updates.
- **Edge Cases:** Latitude/longitude empty: System returns validation warning.
- **Acceptance Criteria:**
  - [ ] Fields save to DB.
  - [ ] Coordinates capture via map drag-and-drop or manual text fields.
- **Related Feature:** F-CMS-03, F-CMS-05
- **Related Business Rule:** CMS Role Boundary.

#### US-CMS-03: Optimizing Image Uploads
- **Persona:** Village Administrator
- **Epic:** CMS
- **User Story:** *As an administrator, I want uploaded photos to be automatically compressed and converted so that I do not have to resize images manually before uploading.*
- **Goal:** Streamline media uploads while protecting site performance.
- **Business Value:** Ensures fast page loads for mobile users.
- **Priority:** Must Have
- **Preconditions:** File uploaded in listing form.
- **Main Success Scenario:**
  1. Admin uploads raw JPG image (3.5MB).
  2. Backend validates format, scales width to max 1200px, converts to WebP.
  3. Saves optimized file (under 200KB).
- **Alternative Scenario: None.**
- **Edge Cases:** Uploading invalid file types: Block upload, show format requirements.
- **Acceptance Criteria:**
  - [ ] Image format saved to storage is WebP.
  - [ ] Files larger than 5MB are rejected.
- **Related Feature:** F-CMS-08, F-SYS-03
- **Related Business Rule:** CMS Role Boundary.

#### US-CMS-04: Bulk Data Import/Export (Excel)
- **Persona:** Village Administrator
- **Epic:** CMS
- **User Story:** *As an administrator, I want to import and export merchant registries in bulk using Excel so that I can perform database audits or create new listings quickly.*
- **Goal:** Bulk import/export.
- **Business Value:** Drastically reduces manual data-entry times.
- **Priority:** Should Have
- **Preconditions:** Admin is authenticated.
- **Main Success Scenario (Import):**
  1. Admin uploads `.xlsx` sheet.
  2. System parses rows.
  3. Inserts all rows into DB.
- **Alternative Scenario (Export):** Admin clicks export, receives download payload.
- **Edge Cases:** Missing name or wrong coordinates format in row 5: Transaction rolls back, alerts admin of row 5 error.
- **Acceptance Criteria:**
  - [ ] Exports clean `.xlsx` data.
  - [ ] Validation errors reject total batch to prevent corrupted partial inserts.
- **Related Feature:** F-CMS-09, F-CMS-10
- **Related Business Rule:** CMS Role Boundary.

#### US-CMS-05: Modify Fallback Settings
- **Persona:** Village Administrator
- **Epic:** CMS
- **User Story:** *As an administrator, I want to set the official village fallback phone number so that buyers can contact us if a merchant lacks details.*
- **Goal:** Manage default contact information.
- **Business Value:** Eliminates communication dead-ends.
- **Priority:** Must Have
- **Preconditions:** Admin settings page loaded.
- **Main Success Scenario:**
  1. Admin changes default fallback phone number.
  2. Clicks Save: Settings table updates immediately.
- **Alternative Scenario: None.**
- **Edge Cases:** Number entered lacks country code: Validation warning.
- **Acceptance Criteria:**
  - [ ] Setting values are accessed dynamically by contact system.
- **Related Feature:** F-CMS-11
- **Related Business Rule:** CMS Role Boundary, Adaptive Contact Fallback.

---

### Epic: System (Polymorphic Foundation)

#### US-SYS-01: Dynamic Category Expansion (ACA)
- **Persona:** System Services
- **Epic:** System
- **User Story:** *As the backend architecture, I want to store category-specific fields inside a polymorphic metadata column so that future categories can be added without altering the database schema.*
- **Goal:** Dynamic data mapping.
- **Business Value:** Promotes system sustainability and code reusability.
- **Priority:** Must Have (Architectural Constraint)
- **Preconditions:** Core entities database tables initialized.
- **Main Success Scenario:**
  1. System processes a listing request.
  2. Maps standard fields (title, description, location) to core columns.
  3. Maps category-specific features to a polymorphic `metadata` JSON object.
- **Alternative Scenario:** None.
- **Edge Cases:** Invalid JSON payload: Block db write and return API mapping error.
- **Acceptance Criteria:**
  - [ ] System handles diverse categories in a single model query.
- **Related Feature:** F-SYS-08
- **Related Business Rule:** None.
- **Future Notes:** Serves as the foundation for Phase 2: Tourism and Agriculture modules.

#### US-SYS-02: Graceful Error Interceptor
- **Persona:** System Services
- **Epic:** System
- **User Story:** *As a developer, I want all backend exceptions logged and clean messages returned to the visitor so that we can audit bugs without exposing server paths.*
- **Goal:** Safe, reliable error logging.
- **Business Value:** Prevents data leaks.
- **Priority:** Must Have
- **Preconditions:** Exception occurs.
- **Main Success Scenario:**
  1. API encounters connection timeout.
  2. Exception handler captures error, logs traceback to `storage/logs/laravel.log`.
  3. Returns standard clean response payload to frontend client.
- **Alternative Scenario: None.**
- **Edge Cases:** Disk storage full: App handles log failure gracefully.
- **Acceptance Criteria:**
  - [ ] User receives clean error response (500 or 404), hiding PHP file details.
- **Related Feature:** F-SYS-04, F-SYS-05
- **Related Business Rule:** None.

---

## 3. Prioritization Matrix

| Story ID | Description | Priority | Target Release |
| --- | --- | --- | --- |
| **US-PUB-01** | Homepage Navigation | Must Have | Version 1.0 (UMKM) |
| **US-PUB-02** | Interactive Map Exploration | Must Have | Version 1.0 (UMKM) |
| **US-PUB-03** | Browse UMKM Directory | Must Have | Version 1.0 (UMKM) |
| **US-PUB-04** | Merchant Detail View | Must Have | Version 1.0 (UMKM) |
| **US-PUB-05** | Catalog Search | Must Have | Version 1.0 (UMKM) |
| **US-PUB-06** | Dynamic Statistics Dashboard | Should Have | Version 1.0 (UMKM) |
| **US-PUB-07** | Adaptive Contact Channel | Must Have | Version 1.0 (UMKM) |
| **US-CMS-01** | Secure Administrator Login | Must Have | Version 1.0 (UMKM) |
| **US-CMS-02** | Manage UMKM Listings (CRUD) | Must Have | Version 1.0 (UMKM) |
| **US-CMS-03** | Optimizing Image Uploads | Must Have | Version 1.0 (UMKM) |
| **US-CMS-04** | Bulk Data Import/Export (Excel)| Should Have | Version 1.0 (UMKM) |
| **US-CMS-05** | Modify Fallback Settings | Must Have | Version 1.0 (UMKM) |
| **US-SYS-01** | Dynamic Category Expansion (ACA)| Must Have | Version 1.0 (UMKM) |
| **US-SYS-02** | Graceful Error Interceptor | Must Have | Version 1.0 (UMKM) |
| **US-PUB-08** | Explore Tourism Spots | Future | Phase 2 Expansion |
| **US-PUB-09** | Explore Agricultural Outputs | Future | Phase 2 Expansion |
