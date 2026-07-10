# Business Rules Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. General Rules

### BR-GEN-01: Public Content Visibility
- **Rule ID:** BR-GEN-01
- **Rule Name:** Public Content Visibility
- **Description:** Only content items explicitly set to a "Published" status are visible to public visitors.
- **Condition:** User is unauthenticated (visitor role) AND potential status is queried.
- **Expected Behavior:** System excludes any records marked as "Draft" or "Archived" from all public API responses, directories, searches, maps, and stats.
- **Exception:** Authenticated administrators can preview draft content.
- **Related Feature:** F-PUB-05 (Potential Explorer)
- **Related User Story:** US-PUB-03 (Browse Directory)

### BR-GEN-02: Categorization Boundary
- **Rule ID:** BR-GEN-02
- **Rule Name:** Categorization Boundary
- **Description:** Every potential listing must map to exactly one primary category (e.g. UMKM in V1, Tourism in V2).
- **Condition:** Creation or modification of a potential entry.
- **Expected Behavior:** System rejects saves if Category ID is empty, missing, or references a non-existent category.
- **Exception:** None.
- **Related Feature:** F-CMS-05 (UMKM Management)
- **Related User Story:** US-CMS-02 (Manage UMKM)

---

## 2. Authentication Rules

### BR-AUTH-01: Single Administrator Session (Version 1)
- **Rule ID:** BR-AUTH-01
- **Rule Name:** Single Administrator Session
- **Description:** Version 1 restricts writes and admin views to a single Administrator session token.
- **Condition:** Session token authentication request for administrative paths (`/admin/*`).
- **Expected Behavior:** Allow execution only if session maps to the primary administrator credentials.
- **Exception:** None.
- **Related Feature:** F-CMS-01 (Admin Login), F-SYS-02 (Authorization)
- **Related User Story:** US-CMS-01 (Admin Login)

### BR-AUTH-02: Administrative Session Expiry
- **Rule ID:** BR-AUTH-02
- **Rule Name:** Administrative Session Expiry
- **Description:** Administrator session tokens expire after a predefined duration of inactivity.
- **Condition:** Inactivity duration exceeds threshold (e.g., 2 hours).
- **Expected Behavior:** Sanctum token is invalidated, client cookie is cleared, and frontend redirects user to the login screen.
- **Exception:** Active requests automatically refresh token lifespan.
- **Related Feature:** F-SYS-01 (Authentication)
- **Related User Story:** US-CMS-01 (Admin Login)

---

## 3. Village Potential Rules

### BR-POT-01: Minimum Required Attributes
- **Rule ID:** BR-POT-01
- **Rule Name:** Minimum Required Attributes
- **Description:** Minimum profile variables necessary to save a village potential.
- **Condition:** Potential entry save/update validation.
- **Expected Behavior:** System validates that Title, Description, and Category are populated.
- **Exception:** None.
- **Related Feature:** F-CMS-05
- **Related User Story:** US-CMS-02

### BR-POT-02: Geospatial Coordinates Availability
- **Rule ID:** BR-POT-02
- **Rule Name:** Geospatial Coordinates Availability
- **Description:** Items without coordinates cannot display on map views but can still render in text directories.
- **Condition:** Potential entry lacks valid Latitude/Longitude coordinates.
- **Expected Behavior:** System allows saving the record, but excludes the marker from map overlays. Shows warning icon in CMS listing.
- **Exception:** Future categories like "News" or "Culture" do not enforce coordinates validation.
- **Related Feature:** F-PUB-04, F-CMS-05
- **Related User Story:** US-PUB-02

---

## 4. Adaptive Contact Rules

### BR-CON-01: Outbound Contact Fallback Hierarchy
- **Rule ID:** BR-CON-01
- **Rule Name:** Outbound Contact Fallback Hierarchy
- **Description:** Enforces the fallback order for the Adaptive Contact channel when a user attempts to contact a merchant.
- **Condition:** Visitor clicks "Hubungi Penjual".
- **Expected Behavior:** System evaluates available contact attributes in the following strict order, executing the first option that holds non-empty data:
  1. **Merchant WhatsApp:** Open Wa.me with merchant preset message.
  2. **Merchant Phone Number:** Redirect to phone dialer protocol (`tel:[number]`).
  3. **Merchant Email:** Redirect to mail client (`mailto:[email]`).
  4. **Merchant Social Media / Website:** Open external URL in new tab.
  5. **Official Village Contact (Fallback):** Open Wa.me redirect pointing to the village administrator's official fallback number with a context message identifying the merchant profile query.
- **Exception:** If all fields (including the village fallback contact) are empty, disable button and display warning text.
- **Related Feature:** F-PUB-12 (Adaptive Contact)
- **Related User Story:** US-PUB-07 (Adaptive Contact)

---

## 5. Media Rules

### BR-MED-01: Automated Compression & Format conversion
- **Rule ID:** BR-MED-01
- **Rule Name:** Automated Compression & Format conversion
- **Description:** All images uploaded to the platform must be converted to WebP format and compressed.
- **Condition:** Image file upload event.
- **Expected Behavior:** The backend captures the file, scales its width to a maximum of 1200px (preserving aspect ratio), recompresses quality to 80%, and saves it as a `.webp` asset.
- **Exception:** Small icons (under 10KB) are skipped for processing.
- **Related Feature:** F-CMS-08 (Image Upload)
- **Related User Story:** US-CMS-03 (Optimizing Image Uploads)

---

## 6. Interactive Map Rules

### BR-MAP-01: Map Marker Status
- **Rule ID:** BR-MAP-01
- **Rule Name:** Map Marker Status
- **Description:** Only published potential entries that contain valid coordinates can render markers on the Leaflet map.
- **Condition:** Map pins fetch request.
- **Expected Behavior:** Discard pins that map to `Draft` status or contain coordinate values outside boundaries.
- **Exception:** None.
- **Related Feature:** F-PUB-04
- **Related User Story:** US-PUB-02

---

## 7. Search & Filter Rules

### BR-SRCH-01: Case-Insensitive Catalog Query
- **Rule ID:** BR-SRCH-01
- **Rule Name:** Case-Insensitive Catalog Query
- **Description:** Search inputs are evaluated in a case-insensitive, database-collation friendly format.
- **Condition:** Keyword search execution.
- **Expected Behavior:** Matches "madu", "Madu", or "MADU" return identical records.
- **Exception:** None.
- **Related Feature:** F-PUB-08
- **Related User Story:** US-PUB-05

---

## 8. Statistics Rules

### BR-STAT-01: Draft Counts Exclusion
- **Rule ID:** BR-STAT-01
- **Rule Name:** Draft Counts Exclusion
- **Description:** Statistics totals rendered on the public dashboard must omit draft and archived potentials.
- **Condition:** Public statistics calculation queries.
- **Expected Behavior:** Queries run `count()` functions filtering where `status = 'published'`.
- **Exception:** None.
- **Related Feature:** F-PUB-10
- **Related User Story:** US-PUB-06

---

## 9. CMS Rules

### BR-CMS-01: Excel Batch Transaction Integrity
- **Rule ID:** BR-CMS-01
- **Rule Name:** Excel Batch Transaction Integrity
- **Description:** Bulk import operations must run in database transactions to prevent partial dataset corruption.
- **Condition:** Excel import execution.
- **Expected Behavior:** If a single row fails validation constraints (e.g. invalid category ID or coordinates format), the backend rolls back the entire batch and returns specific row index error messages to the administrator.
- **Exception:** None.
- **Related Feature:** F-CMS-09
- **Related User Story:** US-CMS-04

---

## 10. Adaptive Content Architecture (ACA) Rules

### BR-ACA-01: Metadata Schema Isolation
- **Rule ID:** BR-ACA-01
- **Rule Name:** Metadata Schema Isolation
- **Description:** Base potential fields are isolated from category-specific properties using a dynamic data structure.
- **Condition:** Database write/read for potentials.
- **Expected Behavior:** Category specific details (e.g., product lists for UMKM, entry fees for Tourism) must be stored inside a dedicated dynamic metadata dictionary (such as a JSON attribute) on the main entity.
- **Exception:** None.
- **Related Feature:** F-SYS-08 (ACA)
- **Related User Story:** US-SYS-01 (Dynamic Category Expansion)
