# Product Requirement Document (PRD)

## Project: Website Potensi Desa Karamatwangi
### Category: Digital Village Showcase Platform
### Target Audience: Public Visitors, Tourists, Local Consumers, and Village Administrators
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Background & Context
Desa Karamatwangi is a rural community rich in economic, cultural, and environmental potential. These potentials include local micro-businesses (UMKM), agricultural outputs, livestock, tourist attractions, and historical cultural elements. However, these potentials remain mostly unpromoted due to the lack of a modern, accessible digital presence.

Traditional village web portals are typically designed as administrative notice boards focusing on government services, official forms, and bureaucratic updates. They fail to attract external visitors, showcase products, or promote tourism. 

To bridge this gap, "Website Potensi Desa Karamatwangi" is designed as a **Digital Village Showcase**. The platform functions as an online destination explorer and local product catalog. It prioritizes premium design aesthetics, interactive map-centric navigation, and user-friendly content management. While Version 1 focuses strictly on showcasing UMKMs (the only complete dataset currently available), the system is built on an **Adaptive Content Architecture (ACA)**, allowing future village potentials (Tourism, Agriculture, Culture, etc.) to be integrated seamlessly.

---

## 2. Product Vision
To establish a premium, map-centric digital showcase platform that transforms how the public discovers and connects with the economic, tourist, and cultural potentials of Desa Karamatwangi, while offering a sustainable, modular Content Management System (CMS) for the village administration.

---

## 3. Product Objectives
- **Digital Promotion:** Elevate the online visibility of local village businesses (UMKM) to drive economic growth and external referrals.
- **Intuitive Exploration:** Deliver a map-centric user experience that allows visitors to explore the physical distribution of local potentials.
- **Dynamic Content Administration:** Provide a low-friction, secure CMS enabling village operators to add, edit, and publish content without developer assistance.
- **Extensible Architecture:** Implement the Adaptive Content Architecture (ACA) to accommodate future categories of village potentials (Tourism, Agriculture, Livestock, Culture, News, Statistics) without database schema migration or code redesign.

---

## 4. Success Metrics
- **User Retention:** Average session duration of > 2 minutes.
- **Map Interaction Rate:** > 50% of visitors interact with the Leaflet map controls (zooming, filtering, opening pins).
- **Referral Generation:** Successful outbound click redirection to WhatsApp/social links of at least 150 referrals per month.
- **Data Completeness:** 100% of available village UMKM records successfully cataloged and geolocated in the system.

---

## 5. Target Stakeholders & Users
### Stakeholders
- **Village Government (Pemerintah Desa):** Project owner, responsible for managing the platform post-handover.
- **Local Merchants (Pelaku UMKM):** Beneficiaries whose businesses and products are promoted.
- **External Visitors & Tourists:** Target consumers looking to discover products, attractions, or services.

### User Personas
- **The Explorer (Visitor):** A tourist or external buyer seeking local culinary specialties, traditional crafts, or services in Karamatwangi. Requires mobile responsiveness and swift access to contact links.
- **The Administrator (Village Staff):** A non-technical government operator tasked with updating listings, changing merchant details, and publishing new potentials. Requires a simple, secure, and error-tolerant CMS.

---

## 6. Product Scope (Version 1.0)
### In Scope
- **Interactive Map:** Leaflet-based map explorer utilizing OpenStreetMap tiles, supporting marker clustering, custom pins, category filters, and detail popups.
- **Showcase Catalog:** A searchable, filterable directory of local UMKMs, complete with business details, photo galleries, and map references.
- **Adaptive Content Engine:** Core database structures and API endpoints capable of representing multiple categories of potentials dynamically.
- **Adaptive Contact System:** Dynamic outbound contact triggers redirecting to merchant WhatsApp or social media. Falls back automatically to official village contact information if merchant details are absent.
- **Village Admin CMS:** Secure admin panel using Laravel Sanctum, permitting single-administrator login for content management.
- **Internationalization (i18n) Foundation:** Code structure designed to support future translation files, although V1 content is Indonesian-only.

### Out of Scope for Version 1
- **E-Commerce Transaction Engines:** No shopping carts, payment gateways, or checkouts. Transactions are handled off-platform.
- **Merchant Accounts:** Local merchants do not have logins or dashboard access. All data updates are centralized through the single village administrator.
- **Map Boundary Layer overlays (GeoJSON):** Precise geographic polygon boundary drawings are deferred to future versions.
- **Multi-language Translation Files:** Delivery of English or other translation packages is out of scope.

---

## 7. Product Principles
- **Aesthetics First:** Immersive, high-contrast layouts featuring micro-animations (Framer Motion) to create a premium feel that wows visitors.
- **Performant & Lightweight:** Optimized asset rendering and image compression (via Laravel backend) to accommodate users on slower mobile networks.
- **Documentation-First:** Every functional block must align with architectural specifications to ensure long-term maintenance by any development team.

---

## 8. Core Features & Functional Overview

### 8.1. Adaptive Content Architecture (ACA)
The system treats all categories of potentials as dynamic variants of a single base entity:
- **Base Entity Attributes:** ID, Title, Description, Thumbnail, Latitude, Longitude, Category ID, Status (Draft/Published), Timestamps.
- **Polymorphic Metadata:** Flexible attribute structures to house category-specific fields (e.g., product lists for UMKMs, opening hours for Tourism, yield seasons for Agriculture).

### 8.2. Map-Centric Navigation
- Leaflet map rendering at the core of the homepage/explorer view.
- Pins cluster dynamically based on map zoom levels.
- Clicking a pin opens a popup card showing the item's thumbnail, title, categorization, and a link to view the full details.
- Filters instantly add or remove pins without full page reloads.

### 8.3. Adaptive Contact System
When a visitor views a potential, the platform shows direct contact options (WhatsApp, Instagram, Facebook, Website, Marketplace). The contact flow follows these fallback business rules:
- **Rule 1:** Check for merchant-specific contact info. If active, generate a pre-filled message (e.g., *"Halo, saya tertarik dengan produk Anda di Potensi Desa Karamatwangi..."*) and link to the merchant's WhatsApp.
- **Rule 2:** If merchant contact is empty or missing, display the village's official central contact (WhatsApp/Phone) as the primary communication channel, indicating the specific merchant of interest.

### 8.4. Dynamic Showcase CMS
- Admin authentication powered by Laravel Sanctum.
- Content listing view with search, filter, and publishing toggles.
- Unified create/edit form that dynamically adjusts available fields based on the selected potential category.
- Laravel Excel utility integration for bulk exporting database registries for administrative audits.

---

## 9. Constraints & Assumptions
### Constraints
- **Infrastructure Cost:** Must operate efficiently on standard shared hosting or free-tier cloud architectures (e.g., MySQL database, Laravel hosting).
- **Simplicity:** The administration dashboard must remain clean, clear, and usable by non-technical village staff.
- **Internet Bandwidth:** The application must keep page payloads low, employing dynamic image compression on uploads to protect mobile data plans.

### Assumptions
- **WhatsApp Prevalence:** Active WhatsApp lines are the primary and most reliable communication channel for local business owners in Karamatwangi.
- **Admin Training:** Village administrators will receive a basic walkthrough to operate the dashboard.

---

## 10. Risks & Mitigation
- **Risk 1: Merchant Information Stale:** Merchants change phone numbers without updating the village admin, leading to broken WhatsApp links.
  - *Mitigation:* The system will track `last_verified_at` metadata and flag entries older than 6 months for review in the admin dashboard.
- **Risk 2: Heavy Image Uploads:** Admins uploading high-resolution photos straight from mobile devices, slowing down the frontend experience.
  - *Mitigation:* Laravel backend must process, resize, and compress all incoming uploads to optimized formats (e.g., WebP) before saving them to storage.

---

## 11. Technical Overview
- **Frontend Engine:** React (Vite-backed), utilizing Tailwind CSS for fluid designs, Leaflet for mapping, and React Router for view mapping.
- **Backend Service:** Laravel 12 API utilizing Laravel Sanctum for secure stateless admin sessions and Laravel Storage for assets.
- **Database Engine:** MySQL to store primary models and category attributes.
- **Mapping:** OpenStreetMap tile services integrated with Leaflet to bypass Google Maps premium pricing.

---

## 12. Future Modules Roadmap
The design system and database models developed in V1 must scale to:
- **Tourism:** Adding spots, landmarks, galleries, and schedules.
- **Agriculture & Livestock:** Promoting harvest seasons, yields, and local farming groups.
- **Public Facilities:** Listing schools, medical clinics, and administrative offices on the map.
- **Culture & News:** Incorporating article formats and event calendars.
- **Village Statistics:** Interactive charts showing demographic data (Chart.js ready).
