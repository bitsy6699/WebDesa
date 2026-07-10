# Product Feature Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Introduction & Classifications

This document provides detailed product feature specifications for the **Website Potensi Desa Karamatwangi** platform. Features are classified as:
- **Core Feature:** Fundamental to the platform's primary mission (interactive showcases, search, and maps).
- **Supporting Feature:** Adds contextual utility for visitors (profile page, stats dashboard).
- **Administrative Feature:** CMS tools reserved for the single authenticated admin.
- **Future Feature:** Reserved for upcoming phases (Tourism, Agriculture, News, etc.) integrated via the Adaptive Content Architecture (ACA).

---

## 2. Public Website Features

### F-PUB-01: Homepage
- **Classification:** Core Feature
- **Purpose:** Primary landing page for visitors to explore Karamatwangi's potentials.
- **Description:** A visually premium landing page combining a hero visual, core navigation links, quick highlight statistics, and pathways to the map-based explorer.
- **Business Value:** Establishes the digital brand of the village, capturing visitor attention.
- **Target User:** Public Visitor / Tourist
- **Trigger:** Accessing the base domain URL.
- **Preconditions:** System server is live.
- **User Actions:** Navigates to base URL.
- **System Responses:** Renders the header navbar, hero section, statistics block, catalog highlight cards, and footer.
- **Success Scenario:** Page loads in < 2 seconds, interactive elements function.
- **Alternative Scenario:** None.
- **Exception Scenario:** Backend offline: Renders static text elements and a warning that live data could not be retrieved.
- **Validation Rules:** None.
- **Dependencies:** None.
- **Related Business Rules:** None.
- **Future Extensibility:** Future modules (Tourism, News) can append preview sections to the page dynamically.
- **Acceptance Summary:** Home page resolves, links function, content matches specs.

### F-PUB-02: Hero Section
- **Classification:** Supporting Feature
- **Purpose:** Captures visitor interest using premium visuals and a central CTA.
- **Description:** A large top-banner module featuring high-quality photography of Karamatwangi, a promotion slogan, and direct CTAs to "Lihat Map" and "Cari UMKM".
- **Business Value:** Directs users straight to the core conversion and exploration features.
- **Target User:** Public Visitor
- **Trigger:** Rendering of the Homepage.
- **Preconditions:** Visual assets are configured in settings.
- **User Actions:** Clicks CTA button.
- **System Responses:** Routes visitor to Map Explorer or the UMKM Directory page.
- **Success Scenario:** Visuals render clearly; CTA transitions are fluid (Framer Motion enabled).
- **Alternative Scenario:** Displays default fallback background image if custom hero banner is missing.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** F-PUB-01 (Homepage).
- **Related Business Rules:** None.
- **Future Extensibility:** Extensible to allow rotating slides for different seasons (e.g., harvest season highlights).
- **Acceptance Summary:** Hero mounts successfully, buttons route to correct endpoints.

### F-PUB-03: Village Profile
- **Classification:** Supporting Feature
- **Purpose:** Houses historical, geographical, and demographic info.
- **Description:** A dedicated page explaining the history, geographical location, and vision/mission of Karamatwangi.
- **Business Value:** Provides general public information to tourists and external partners.
- **Target User:** Public Visitor / Researcher
- **Trigger:** Clicking "Profil Desa" in navbar.
- **Preconditions:** Profile text is populated in CMS.
- **User Actions:** User clicks navigation item.
- **System Responses:** Displays formatted static text, maps boundaries (mockup), and list of achievements.
- **Success Scenario:** Page renders semantic structure cleanly.
- **Alternative Scenario:** Displays default text placeholder if CMS data is empty.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** None.
- **Related Business Rules:** None.
- **Future Extensibility:** Can integrate dynamic village government structure charts.
- **Acceptance Summary:** Profile section renders cleanly.

### F-PUB-04: Interactive Map
- **Classification:** Core Feature
- **Purpose:** Visual, location-based navigation of village potentials.
- **Description:** A map interface built with Leaflet + OpenStreetMap displaying custom pins of local businesses, providing category filters and preview popup cards on marker click.
- **Business Value:** High-fidelity interactive experience that allows visitors to explore the physical distribution of UMKMs.
- **Target User:** Public Visitor / Tourist
- **Trigger:** Navigating to `/map` page.
- **Preconditions:** OpenStreetMap tile server is reachable.
- **User Actions:** Zoom, pan, filter categories, click pin.
- **System Responses:** Leaflet map displays pins; clicking a pin displays a preview popup card.
- **Success Scenario:** Pins render at precise coordinates; filters dynamically show/hide markers without reloading.
- **Alternative Scenario:** Map tile loading fails: Marker overlays are still rendered over a blank grid, allowing users to select pins.
- **Exception Scenario:** Invalid coordinates: Marker is discarded from rendering loop to prevent map break.
- **Validation Rules:** Coordinate boundaries must sit within Indonesian territory.
- **Dependencies:** Leaflet mapping library, Leaflet MarkerCluster plugin.
- **Related Business Rules:** Draft Status Isolation (Drafts do not show on map).
- **Future Extensibility:** Prepared to take GeoJSON polygon layers to draw village border coordinates.
- **Acceptance Summary:** Map initializes, displays pins, responds to filter changes.

### F-PUB-05: Village Potential Explorer
- **Classification:** Core Feature
- **Purpose:** The generalized container directory for all categorized village potentials.
- **Description:** A catalog portal presenting search fields and category filters. In Version 1, this acts as the base container specifically hosting the UMKM catalog.
- **Business Value:** Creates a unified portal designed to scale as new categories (Tourism, Agriculture) are populated.
- **Target User:** Public Visitor / Local Consumer
- **Trigger:** Navigating to `/potensi` page.
- **Preconditions:** Database contains published potential records.
- **User Actions:** Search by name, filter by category.
- **System Responses:** Queries potential entries and displays matching results in a paginated grid.
- **Success Scenario:** Page renders cards quickly with responsive column counts.
- **Alternative Scenario:** No items match search: Displays a search fallback notice.
- **Exception Scenario:** Database connection failure: Displays user-friendly error screen.
- **Validation Rules:** Maximum search query: 100 characters.
- **Dependencies:** Database query endpoints.
- **Related Business Rules:** Draft Status Isolation.
- **Future Extensibility:** Automatically lists new categories (e.g. Tourism, Culture) in the filter bar once active.
- **Acceptance Summary:** Directory loads, paginates, filters correctly.

### F-PUB-06: UMKM Catalog
- **Classification:** Core Feature
- **Purpose:** Directory of local micro-businesses.
- **Description:** An optimized sub-view of the Potential Explorer specifically tailored to list local enterprises, categorized by business type (e.g., Food, Craft).
- **Business Value:** Connects external buyers directly to village merchants.
- **Target User:** Local Consumer / Tourist
- **Trigger:** Selecting the "UMKM" filter or category.
- **Preconditions:** Active UMKM entries in database.
- **User Actions:** Browse business cards, click a card to view detail page.
- **System Responses:** Displays business name, sub-category, address summary, thumbnail, and short description.
- **Success Scenario:** Grid loads cleanly.
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** F-PUB-05 (Potential Explorer).
- **Related Business Rules:** Draft Status Isolation.
- **Future Extensibility:** Can support merchant rating previews in future versions.
- **Acceptance Summary:** Catalog lists UMKMs accurately.

### F-PUB-07: UMKM Detail Page
- **Classification:** Core Feature
- **Purpose:** Detailed showcase profile for a specific local business.
- **Description:** Dedicated detail view showing business description, product galleries, physical address, precise map locator pin, and outbound contact referral buttons.
- **Business Value:** Converts visitor interest into economic leads for the merchant.
- **Target User:** Public Buyer / Tourist
- **Trigger:** Clicking a UMKM card in map popup or directory grid.
- **Preconditions:** Item exists in database and is published.
- **User Actions:** View gallery, click contact button, inspect map location.
- **System Responses:** Loads detail view, renders images, checks contact options, maps the specific coordinate pin on a mini-map.
- **Success Scenario:** All details render correctly, contact buttons active.
- **Alternative Scenario:** If description is missing, displays basic profile fields only.
- **Exception Scenario:** Requesting a non-existent or draft ID redirects to 404 page.
- **Validation Rules:** None.
- **Dependencies:** F-PUB-04 (Map), F-PUB-12 (Adaptive Contact).
- **Related Business Rules:** Draft Status Isolation, Adaptive Contact Fallback.
- **Future Extensibility:** Can support product catalog lists and order forms.
- **Acceptance Summary:** Detail page opens, images load, coordinates match.

### F-PUB-08: Search
- **Classification:** Supporting Feature
- **Purpose:** Quick search utility.
- **Description:** A text input box on the directory page that searches database entries matching titles, categories, or keywords.
- **Business Value:** Speeds up user discovery of specific products/merchants.
- **Target User:** Public Visitor
- **Trigger:** Typing search text and hitting Enter or waiting for typing debounce (300ms).
- **Preconditions:** Search field focused.
- **User Actions:** Enters query string.
- **System Responses:** Filters potential listings dynamically.
- **Success Scenario:** Search behaves responsively and displays matching items.
- **Alternative Scenario:** No matches: Displays placeholder text recommending search tips.
- **Exception Scenario:** None.
- **Validation Rules:** Maximum 100 characters. Sanitize input to exclude HTML/JS script tags.
- **Dependencies:** F-PUB-05.
- **Related Business Rules:** None.
- **Future Extensibility:** Can implement autocomplete/typeahead suggestions.
- **Acceptance Summary:** Search filters catalog data accurately.

### F-PUB-09: Filter
- **Classification:** Core Feature
- **Purpose:** Refine catalog search results.
- **Description:** UI dropdown or button toggles allowing visitors to filter lists by category, sub-category, and location.
- **Business Value:** Provides guided navigation to find specific types of potentials (e.g. food vendors on the map).
- **Target User:** Public Visitor
- **Trigger:** Selecting filter options.
- **Preconditions:** Potential Explorer page or Map explorer is loaded.
- **User Actions:** Toggles categories (e.g. "Kuliner", "Kerajinan").
- **System Responses:** Instantly updates map pins and directory cards.
- **Success Scenario:** Filters update with smooth transitions.
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** Only allow active, valid category IDs.
- **Dependencies:** F-PUB-04, F-PUB-05.
- **Related Business Rules:** None.
- **Future Extensibility:** Extensible to support complex multi-criteria filters.
- **Acceptance Summary:** Filtering operates without full-page reloads.

### F-PUB-10: Statistics Dashboard
- **Classification:** Supporting Feature
- **Purpose:** General village stats overview.
- **Description:** Visual representation of village census/potentials data (e.g., number of UMKMs, land area stats) represented through Chart.js charts.
- **Business Value:** Builds transparency and authority for Desa Karamatwangi.
- **Target User:** Visitor / Researcher
- **Trigger:** Navigating to `/statistik` page.
- **Preconditions:** Statistics data loaded in DB.
- **User Actions:** Hover over chart segments.
- **System Responses:** Renders bar and pie charts representing distribution data.
- **Success Scenario:** Charts load and display tooltips.
- **Alternative Scenario:** Displays tabular HTML table if browser cannot execute Chart.js canvas render.
- **Exception Scenario:** Empty statistics data: Shows static village narrative only.
- **Validation Rules:** None.
- **Dependencies:** Chart.js library.
- **Related Business Rules:** None.
- **Future Extensibility:** Real-time integration of demographic statistics (population, employment) in Phase 2.
- **Acceptance Summary:** Visual charts load and map metrics correctly.

### F-PUB-11: Contact Information
- **Classification:** Supporting Feature
- **Purpose:** Public access details for village government.
- **Description:** Display block showing the official address, email, telephone, and social links of the Karamatwangi village office.
- **Business Value:** Authenticates the platform and provides general contact points.
- **Target User:** Public Visitor / Journalist
- **Trigger:** Navigating to footer or Profile page.
- **Preconditions:** Global site settings configured in backend.
- **User Actions:** View details, copy email or dial phone number.
- **System Responses:** Displays formatted text and click-to-call links.
- **Success Scenario:** Contact details load.
- **Alternative Scenario:** Default placeholder information shows if configurations are blank.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** None.
- **Related Business Rules:** Adaptive Contact Fallback (acts as the default contact repository).
- **Future Extensibility:** Can support direct contact forms sending email queries to the admin.
- **Acceptance Summary:** Contact elements render.

### F-PUB-12: Adaptive Contact
- **Classification:** Core Feature
- **Purpose:** Custom contact logic with automated fallback routing.
- **Description:** A smart link generator behind detail page contact buttons. If merchant WhatsApp info exists, it links directly to them; if blank, it links to the village government WhatsApp.
- **Business Value:** Prevents broken contact links, guaranteeing visitors always have an open communication channel.
- **Target User:** Public Buyer
- **Trigger:** Clicking "Hubungi Penjual" button.
- **Preconditions:** Profile entry exists.
- **User Actions:** Clicks the button.
- **System Responses:** Launches WhatsApp redirect URL with customized message template.
- **Success Scenario:** Redirects to merchant WhatsApp.
- **Alternative Scenario:** Redirects to Village Administration WhatsApp if merchant number is null, containing preset text matching the merchant's title.
- **Exception Scenario:** Fallback setting is missing: Button remains disabled with notice.
- **Validation Rules:** Numbers must start with `62` (internationalized prefix).
- **Dependencies:** F-PUB-07 (Detail Page), F-PUB-11 (Contact Info).
- **Related Business Rules:** Adaptive Contact Fallback.
- **Future Extensibility:** Can route queries via SMS, Telegram, or email.
- **Acceptance Summary:** Button correctly routes target user based on contact availability.

### F-PUB-13: Gallery (Future)
- **Classification:** Future Feature
- **Purpose:** Showcase village scenery and event highlights.
- **Description:** A photographic and video gallery displaying village visual assets.
- **Business Value:** Promotes village aesthetics and tourist appeal.
- **Target User:** Tourist / External Media
- **Trigger:** Navigating to `/galeri` (Version 1 returns placeholder/disabled).
- **Future Extensibility:** Designed to pull images categorized under "Gallery" via the ACA.

### F-PUB-14: News Preview (Future)
- **Classification:** Future Feature
- **Purpose:** Dynamic blog updates about village events.
- **Description:** Display cards showing the latest village news.
- **Future Extensibility:** Designed to feed articles through the CMS once News module is active.

### F-PUB-15: Footer
- **Classification:** Supporting Feature
- **Purpose:** Navigation closing block.
- **Description:** Bottom page layout housing sitemap links, copyright data, and village contact information.
- **Business Value:** Standardizes site navigation.
- **Target User:** Public Visitor
- **Trigger:** Scrolling to bottom of any page.
- **Preconditions:** None.
- **User Actions:** Navigation clicks.
- **System Responses:** Renders links and copyright year dynamically.
- **Success Scenario:** Footer displays correctly.
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** None.
- **Related Business Rules:** None.
- **Future Extensibility:** None.
- **Acceptance Summary:** Footer displays consistently across all public routes.

---

## 3. CMS Features

### F-CMS-01: Administrator Login
- **Classification:** Administrative Feature
- **Purpose:** Secure entrance to backend dashboard.
- **Description:** Auth portal requiring username and password, authenticating sessions via Laravel Sanctum secure tokens.
- **Business Value:** Prevents unauthorized changes to website content.
- **Target User:** Village Administrator
- **Trigger:** Navigating to `/admin/login`.
- **Preconditions:** Database holds admin credentials.
- **User Actions:** Inputs username and password, clicks "Masuk".
- **System Responses:** Validates credentials. If correct, returns auth cookie and routes to `/admin/dashboard`.
- **Success Scenario:** Access granted, redirect succeeds.
- **Alternative Scenario:** Access denied: Renders error message and highlights incorrect inputs.
- **Exception Scenario:** Token expired: Redirects user back to login page.
- **Validation Rules:** Both fields required. Rate limit: 5 failed attempts locks logins for 60 seconds.
- **Dependencies:** F-SYS-01 (Authentication).
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Multi-factor auth (MFA) support.
- **Acceptance Summary:** Auth flow secures admin panel.

### F-CMS-02: Dashboard
- **Classification:** Administrative Feature
- **Purpose:** Control panel home page.
- **Description:** Land-screen for authenticated admins displaying quick action shortcuts, listing counts, and system status indicators.
- **Business Value:** Quick access to CRUD tools.
- **Target User:** Village Administrator
- **Trigger:** Successful auth or navigation to `/admin/dashboard`.
- **Preconditions:** Token validated.
- **User Actions:** View stats, click control shortcuts.
- **System Responses:** Fetches counts from DB, renders dashboard layout.
- **Success Scenario:** Stats load correctly.
- **Alternative Scenario:** None.
- **Exception Scenario:** Token invalid: Auto-logout user.
- **Validation Rules:** None.
- **Dependencies:** F-CMS-01.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Activity log visualization charts.
- **Acceptance Summary:** Dashboard displays stats and panel menu.

### F-CMS-03: Content Management
- **Classification:** Administrative Feature
- **Purpose:** CRUD interface for potentials database.
- **Description:** Administrative view listing all potentials (UMKM in V1) in a search-and-filter grid, providing edit/delete links and bulk processing controls.
- **Business Value:** Controls all public-facing potentials.
- **Target User:** Village Administrator
- **Trigger:** Navigating to `/admin/content`.
- **Preconditions:** Authenticated admin.
- **User Actions:** Search listings, toggle status, click edit/delete.
- **System Responses:** Renders lists, modifies database state.
- **Success Scenario:** Listing actions successfully persist.
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** F-CMS-02.
- **Related Business Rules:** CMS Role Boundary, Draft Status Isolation.
- **Future Extensibility:** Pre-scheduled auto-publish dates.
- **Acceptance Summary:** Content table lists all potentials with status toggles.

### F-CMS-04: Village Profile Management
- **Classification:** Administrative Feature
- **Purpose:** Update static village history/mission content.
- **Description:** Standard rich-text form in CMS containing inputs to alter Profile Page contents.
- **Business Value:** Allows the village administration to update their history and governance profiles.
- **Target User:** Village Administrator
- **Trigger:** Clicking "Edit Profil Desa" in CMS menu.
- **Preconditions:** Authenticated admin.
- **User Actions:** Modifies text fields, clicks "Simpan Perubahan" (Save Changes).
- **System Responses:** Validates, updates website parameters table, renders changes on public profile page.
- **Success Scenario:** Database updates, changes instantly reflect on public profile.
- **Alternative Scenario:** None.
- **Exception Scenario:** Validation error: Highlights fields exceeding character limits.
- **Validation Rules:** Profile description cannot exceed 5000 characters.
- **Dependencies:** F-CMS-02.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Multi-section layout configurations.
- **Acceptance Summary:** Form successfully updates profile data.

### F-CMS-05: UMKM Management
- **Classification:** Administrative Feature
- **Purpose:** Manage local merchant profile entries.
- **Description:** Specific CRUD form fields mapped for UMKMs (business name, category type, custom merchant metadata, coordinates, contact details).
- **Business Value:** Allows precise merchant record administration.
- **Target User:** Village Administrator
- **Trigger:** Clicking "Tambah/Edit UMKM" in CMS content panel.
- **Preconditions:** Authenticated admin.
- **User Actions:** Fills form inputs, drags pin on locator map to capture coordinates, clicks Save.
- **System Responses:** Saves merchant records and uploads visual files.
- **Success Scenario:** Record created, coordinates recorded, image saved.
- **Alternative Scenario:** If map pin isn't dragged, accepts decimal coordinates entered manually in lat/long text boxes.
- **Exception Scenario:** File upload failure: Keeps text data intact and displays image error alert.
- **Validation Rules:** Business Name: Required (max 150 chars). Latitude/Longitude: Required. Image: Optional (max 5MB, JPG/PNG/WebP).
- **Dependencies:** F-CMS-03, F-CMS-08, F-SYS-03 (Storage).
- **Related Business Rules:** CMS Role Boundary, Adaptive Contact Fallback.
- **Future Extensibility:** Allow merchants to claim their profile and submit edit drafts.
- **Acceptance Summary:** CRUD actions function cleanly, map pin tool captures coordinates.

### F-CMS-06: Category Management
- **Classification:** Administrative Feature
- **Purpose:** Add and structure potential categories.
- **Description:** Control view allowing administration of potential types (UMKM sub-categories in V1, scaling to Tourism, Agriculture categories in future phases).
- **Business Value:** Empowers the platform to adapt category filters dynamically as the village scales.
- **Target User:** Village Administrator
- **Trigger:** Clicking "Kelola Kategori" in CMS menu.
- **Preconditions:** Authenticated admin.
- **User Actions:** Add category label, configure category tags, assign icon key.
- **System Responses:** Adds category row, updating search dropdowns and Leaflet pin colors dynamically.
- **Success Scenario:** Category added and visible immediately.
- **Alternative Scenario:** None.
- **Exception Scenario:** Deleting a category with active potential items: Block operation and prompt user to re-categorize dependent listings first.
- **Validation Rules:** Category Label: Required (unique, max 50 chars).
- **Dependencies:** F-CMS-03.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Configures custom JSON schema fields for dynamic forms in the CMS.
- **Acceptance Summary:** Category management handles additions and blocks unsafe deletions.

### F-CMS-07: Media Library
- **Classification:** Administrative Feature
- **Purpose:** Shared repository of uploaded images.
- **Description:** Media panel showing visual assets, allowing copy-link actions, file deletes, and alt-text edits.
- **Business Value:** Optimizes asset reuse, reducing database size overhead.
- **Target User:** Village Administrator
- **Trigger:** Accessing "Pustaka Media" tab.
- **Preconditions:** Authenticated admin.
- **User Actions:** Select file, copy URL, delete asset.
- **System Responses:** Displays layout grid of uploaded files, handles asset deletion.
- **Success Scenario:** Grid loads; deleted items removed from physical storage.
- **Alternative Scenario:** None.
- **Exception Scenario:** Block deletion if asset is actively linked as a potential's primary cover image.
- **Validation Rules:** None.
- **Dependencies:** F-SYS-03 (File Storage).
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Folder organizing structures.
- **Acceptance Summary:** Media panel serves and manages images correctly.

### F-CMS-08: Image Upload
- **Classification:** Administrative Feature
- **Purpose:** Backend pipeline processing incoming images.
- **Description:** Server-side file receiver that validates size, runs image compression (WebP conversion), and saves files under public storage.
- **Business Value:** Keeps the site fast and lightweight on mobile networks.
- **Target User:** Village Administrator
- **Trigger:** Admin drops file onto upload field in UMKM or Gallery forms.
- **Preconditions:** Authenticated admin.
- **User Actions:** Selects file for upload.
- **System Responses:** Receives binary, converts/scales image, saves, and returns relative file path.
- **Success Scenario:** Image optimized and saved without quality loss.
- **Alternative Scenario:** None.
- **Exception Scenario:** Rejects files exceeding 5MB or invalid MIME formats.
- **Validation Rules:** Max 5MB; formats: `.jpg`, `.jpeg`, `.png`, `.webp`.
- **Dependencies:** F-SYS-03.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** CDN asset delivery pipeline.
- **Acceptance Summary:** System compresses and saves images to WebP.

### F-CMS-09: Excel Import
- **Classification:** Administrative Feature
- **Purpose:** Bulk input of potential entries.
- **Description:** Upload file input parser converting Excel column cells into database rows.
- **Business Value:** Accelerates initial deployment and data migrations.
- **Target User:** Village Administrator
- **Trigger:** Navigating to "Impor Data", uploading `.xlsx` file.
- **Preconditions:** Authenticated admin.
- **User Actions:** Selects local `.xlsx` file, clicks "Mulai Impor".
- **System Responses:** Runs validation checks. If clean, inserts records into database; if dirty, aborts transaction and shows row errors.
- **Success Scenario:** Hundreds of entries created in seconds.
- **Alternative Scenario:** None.
- **Exception Scenario:** Parse error: Renders cell details (e.g. *"Baris 12: Kolom 'Latitude' tidak valid"*).
- **Validation Rules:** File must be valid Excel schema sheet. Required columns must be populated.
- **Dependencies:** Laravel Excel module, F-CMS-05.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Automatic geolocator helper for rows missing coordinates.
- **Acceptance Summary:** Bulk importer populates database or returns clean validation logs.

### F-CMS-10: Excel Export
- **Classification:** Administrative Feature
- **Purpose:** Bulk download database backup.
- **Description:** Button trigger compiling all potentials from the database into an Excel file.
- **Business Value:** Allows data archiving and printing of merchant catalogs.
- **Target User:** Village Administrator
- **Trigger:** Clicking "Ekspor Data" button.
- **Preconditions:** Authenticated admin.
- **User Actions:** Click button.
- **System Responses:** Reads database rows, formats sheet, serves download payload.
- **Success Scenario:** Browser downloads spreadsheet file.
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** Laravel Excel module.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** PDF report generation.
- **Acceptance Summary:** Export produces valid `.xlsx` containing database registers.

### F-CMS-11: Website Configuration
- **Classification:** Administrative Feature
- **Purpose:** Adjust global site metadata.
- **Description:** Dashboard config form containing input fields for village parameters (e.g. fallback WhatsApp, social URLs, site SEO titles).
- **Business Value:** Quick adjustments without source code changes.
- **Target User:** Village Administrator
- **Trigger:** Accessing "Pengaturan Website" in CMS.
- **Preconditions:** Authenticated admin.
- **User Actions:** Modifies fields, clicks "Simpan".
- **System Responses:** Updates site settings variables in database.
- **Success Scenario:** Changes apply globally instantly.
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** Fallback WhatsApp must start with `62`. Primary email must be valid email format.
- **Dependencies:** F-CMS-02.
- **Related Business Rules:** CMS Role Boundary, Adaptive Contact Fallback.
- **Future Extensibility:** Toggles for maintenance mode.
- **Acceptance Summary:** Form updates global settings.

### F-CMS-12: Homepage Content Management
- **Classification:** Administrative Feature
- **Purpose:** Manage slides, banners, and layout blocks.
- **Description:** Setting page defining landing page promotional texts and spotlight cards.
- **Business Value:** Simplifies home screen adjustments.
- **Target User:** Village Administrator
- **Trigger:** Accessing "Kelola Beranda" in CMS.
- **Preconditions:** Authenticated admin.
- **User Actions:** Edit slide titles, upload new hero image, click Save.
- **System Responses:** Updates homepage configuration parameters.
- **Success Scenario:** Landing page reflects changes.
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** F-CMS-02, F-PUB-01.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Layout section ordering tool.
- **Acceptance Summary:** Admin can alter main page slogans and hero images.

### F-CMS-13: Statistics Management
- **Classification:** Administrative Feature
- **Purpose:** Input parameters for Chart.js dashboard.
- **Description:** Form enabling input of demographic metrics (e.g., area size, farmer counts, population count).
- **Business Value:** Keeps public statistics page accurate.
- **Target User:** Village Administrator
- **Trigger:** Accessing "Data Statistik" in CMS.
- **Preconditions:** Authenticated admin.
- **User Actions:** Modifies metrics numbers, clicks Save.
- **System Responses:** Saves changes, updating public Chart.js visual data.
- **Success Scenario:** Statistics page reflects new values.
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** Numeric fields must contain integers only.
- **Dependencies:** F-CMS-02, F-PUB-10.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Auto-fetch stats from national demographic APIs.
- **Acceptance Summary:** Admin can modify demographic count inputs.

---

## 4. System Features

### F-SYS-01: Authentication
- **Classification:** Core Feature
- **Purpose:** Secure API requests.
- **Description:** Token-based security using Laravel Sanctum.
- **Business Value:** Keeps administrative routes secure and stateless.
- **Target User:** System Services
- **Trigger:** Header contains bearer token or cookie session request.
- **Preconditions:** Access token generated on login.
- **System Responses:** Matches token in database, allows execution.
- **Success Scenario:** Requests verified in milliseconds.
- **Alternative Scenario:** Token missing: Rejects request with `401 Unauthorized` HTTP code.
- **Exception Scenario:** Token invalid or expired: Returns `401` and forces logout on client side.
- **Validation Rules:** Token format validation.
- **Dependencies:** Laravel Sanctum.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Extensible to OAuth providers.
- **Acceptance Summary:** Auth system screens API endpoints.

### F-SYS-02: Authorization
- **Classification:** Core Feature
- **Purpose:** Control access permissions.
- **Description:** Checks user credentials against route parameters. In V1, it checks for active "Administrator" tokens for all `/admin/*` operations.
- **Business Value:** Restricts administrative controls to village government.
- **Target User:** System Services
- **Trigger:** Internal routing handler checks authorization status.
- **Preconditions:** Authentication check passed.
- **System Responses:** Grants access or returns `403 Forbidden`.
- **Success Scenario:** Valid admin proceeds.
- **Alternative Scenario:** Non-admin attempts access: Returns `403 Forbidden` response.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** F-SYS-01.
- **Related Business Rules:** CMS Role Boundary.
- **Future Extensibility:** Pre-wired to support roles (Super Admin, Staff, Editor, Merchant) in Phase 2.
- **Acceptance Summary:** Authorization boundaries validate route requests.

### F-SYS-03: File Storage
- **Classification:** Supporting Feature
- **Purpose:** Local system asset storage.
- **Description:** Manages visual asset pathways under Laravel Local Storage directories.
- **Business Value:** Decouples file uploads from server root directories, facilitating smooth migrations.
- **Target User:** System Services
- **Trigger:** Image saving pipeline request.
- **Preconditions:** File target directory is writeable.
- **System Responses:** Stores file, returns URL reference.
- **Success Scenario:** File written, path generated.
- **Alternative Scenario:** None.
- **Exception Scenario:** Disk full: Aborts upload, returning `500 Server Error` with detailed disk logging.
- **Validation Rules:** Paths must follow directory conventions: `public/storage/uploads/[category]/[filename]`.
- **Dependencies:** PHP filesystem access.
- **Related Business Rules:** None.
- **Future Extensibility:** Easily swapped with cloud options (e.g. AWS S3) via Laravel filesystems config.
- **Acceptance Summary:** Files persist securely in storage.

### F-SYS-04: Error Handling
- **Classification:** Supporting Feature
- **Purpose:** Catch and log application bugs gracefully.
- **Description:** Unified error system converting server-side tracebacks into clean JSON client errors, and displaying friendly pages to public web visitors.
- **Business Value:** Prevents raw database schemas or exceptions from exposing security flaws.
- **Target User:** Developer / System Services
- **Trigger:** App exception.
- **Preconditions:** Global exception handler active.
- **System Responses:** Logs trace, returns standard response.
- **Success Scenario:** Returns clean error codes (e.g., `404`, `500`).
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** None.
- **Related Business Rules:** None.
- **Future Extensibility:** Dynamic bug notifications (Slack/Sentry).
- **Acceptance Summary:** Unhandled exceptions do not expose raw server variables.

### F-SYS-05: Logging
- **Classification:** Supporting Feature
- **Purpose:** Keep historical traces of system events.
- **Description:** Laravel logs security anomalies, import failures, and database transactions under `storage/logs/laravel.log`.
- **Business Value:** Simplifies system debugging and administrative audits.
- **Target User:** Senior Software Architect
- **Trigger:** System execution events.
- **Preconditions:** Log write permissions active.
- **System Responses:** Writes timestamped strings to log file.
- **Success Scenario:** Log entries recorded.
- **Alternative Scenario:** None.
- **Exception Scenario:** Disk write permissions error: Log warning.
- **Validation Rules:** None.
- **Dependencies:** None.
- **Related Business Rules:** None.
- **Future Extensibility:** Log indexing integrations (Elasticsearch).
- **Acceptance Summary:** Logs verify backend activities.

### F-SYS-06: Search Engine
- **Classification:** Core Feature
- **Purpose:** Database query executor.
- **Description:** Indexing matching criteria on potential entries.
- **Business Value:** High-speed lookup speeds.
- **Target User:** System Services
- **Trigger:** API search request.
- **Preconditions:** Query text supplied.
- **System Responses:** Executes query, returns matching rows.
- **Success Scenario:** Resolves queries under 100ms.
- **Alternative Scenario:** Empty queries: Returns default paginated list.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** Database.
- **Related Business Rules:** Draft Status Isolation.
- **Future Extensibility:** Full-text search support (Algolia or Laravel Scout).
- **Acceptance Summary:** Search returns exact database entries.

### F-SYS-07: Dynamic Content Rendering
- **Classification:** Core Feature
- **Purpose:** Parse and display custom attributes.
- **Description:** Frontend engine translating JSON metadata schema definitions into visual elements.
- **Business Value:** Allows custom categorization layouts dynamically.
- **Target User:** System Services
- **Trigger:** React potential detail page render.
- **Preconditions:** Metadata JSON retrieved from API.
- **System Responses:** Renders custom tags or panels based on potential properties.
- **Success Scenario:** Custom category parameters (e.g., product lists) render correctly.
- **Alternative Scenario:** Empty metadata: Renders basic text details.
- **Exception Scenario:** Invalid JSON format: Renders warning and falls back to text details.
- **Validation Rules:** None.
- **Dependencies:** React Client.
- **Related Business Rules:** None.
- **Future Extensibility:** Phase 2 extension for custom widgets.
- **Acceptance Summary:** Renders metadata fields automatically.

### F-SYS-08: Adaptive Content Architecture (ACA)
- **Classification:** Core Feature
- **Purpose:** Modular schema modeling potentials dynamically.
- **Description:** System architecture representing categories as polymorphic models with generic fields and key-value properties.
- **Business Value:** Allows expansion of categories (Tourism, Agriculture, News) without schema refactoring.
- **Target User:** System Services
- **Trigger:** Category load, CRUD forms, map loading.
- **Preconditions:** Core database schema defined.
- **System Responses:** Serves potential payloads agnostic of category type.
- **Success Scenario:** Accommodates multiple categories in a single query loop.
- **Alternative Scenario:** None.
- **Exception Scenario:** None.
- **Validation Rules:** None.
- **Dependencies:** MySQL schema, Laravel Eloquent.
- **Related Business Rules:** None.
- **Future Extensibility:** Serves as the blueprint layout for all future village potential releases.
- **Acceptance Summary:** ACA engine supports polymorphic entries.
