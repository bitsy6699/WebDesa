# Design Decision Record (DDR)

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## DD-001: Website Identity Selection
- **Status:** Approved
- **Context:** The village of Karamatwangi has rich economic (UMKM) and natural (Tourism, Agriculture) assets but lacks a unified promotion portal. Traditional village web projects are built as bureaucratic portals.
- **Problem:** Government portals focus on administration and document uploads. They fail to attract external visitors, generate leads for merchants, or showcase village beauty.
- **Alternatives Considered:**
  - *Alternative A:* Standard Government Portal (focused on announcements, citizen letters, and announcements).
  - *Alternative B:* E-commerce Marketplace (direct cart and checkout systems).
- **Selected Solution:** Digital Village Showcase Platform (styled like a premium tourism destination site and merchant catalog).
- **Rationale:** Focuses entirely on promotion, storytelling, and direct conversion referrals to support the local economy. Administrative tasks are excluded to reduce complexity and target actual consumers.
- **Benefits:** High aesthetic appeal, increases customer traffic, promotes local pride.
- **Trade-offs:** Out of scope for citizen letter management or bureaucratic reporting.
- **Future Impact:** Establishes the village as a digital leader in tourism and local commerce.
- **Related Documents:** PRD Section 1, SRS Section 2.1, UI/UX Spec Section 1.

---

## DD-002: Homepage Storytelling Flow
- **Status:** Approved
- **Context:** The landing page serves as the first entry point for external explorers.
- **Problem:** Dashboard-first or directory-first layouts present a wall of links that overwhelm casual visitors.
- **Alternatives Considered:**
  - *Alternative A:* Dashboard layout with metrics grids and links to separate pages.
  - *Alternative B:* Simple search box landing page (Google style).
- **Selected Solution:** Linear Storytelling Scroll (Hero → Categories → Featured → Interactive Map → Directory preview → Stats → News → Footer).
- **Rationale:** Progressively introduces the village's assets, encouraging engagement through scrolling before offering raw directory search inputs.
- **Benefits:** High conversion potential, guides user exploration logically.
- **Trade-offs:** Slightly longer layout load times.
- **Future Impact:** New categories integrate as visual preview panels in the scroll sequence.
- **Related Documents:** UI/UX Spec Section 2, USER_STORIES Epic: Public Website.

---

## DD-003: Interactive Map Exploration
- **Status:** Approved
- **Context:** Navigating list directories doesn't convey geographic proximity or travel context.
- **Problem:** Visitors cannot identify which local businesses sit near tourist spots or main roads.
- **Alternatives Considered:**
  - *Alternative A:* Map embedded static page (address details only).
  - *Alternative B:* Separate Google Maps links per profile detail page.
- **Selected Solution:** Interactive Leaflet Map Explorer as a primary feature.
- **Rationale:** Pockets of potential are clustered on an interactive canvas, allowing tourists to plan route stops and discover merchants organically.
- **Benefits:** Instant spatial discovery, filters update pins reactively.
- **Trade-offs:** Higher initial JavaScript bundle overhead.
- **Future Impact:** Accommodates GeoJSON border layers and multiple category overlays dynamically.
- **Related Documents:** PRD Section 10.3, SRS Section 3.1.3, FEATURE_SPEC F-PUB-04.

---

## DD-004: Adaptive Content Architecture (ACA)
- **Status:** Approved
- **Context:** Village potentials grow dynamically. V1 starts with UMKMs; V2 adds Tourism, Agriculture, and Culture.
- **Problem:** Hardcoding separate tables, API routes, and components for each category creates code clutter and high maintenance costs.
- **Alternatives Considered:**
  - *Alternative A:* Monolithic expansion (add tables and components as each new category data arrives).
  - *Alternative B:* Separate decoupled microservices.
- **Selected Solution:** Adaptive Content Architecture (Polymorphic base model + dynamic JSON metadata column).
- **Rationale:** Base attributes (title, description, coordinates) reside in core columns. Specific metadata fields (e.g. products, opening hours) map to a JSON key-value store.
- **Benefits:** Zero schema migrations when adding Tourism or Agriculture. Form inputs and views adapt dynamically.
- **Trade-offs:** Metadata fields require client-side parsing checks.
- **Future Impact:** High system sustainability; village staff can add categories via CMS directly.
- **Related Documents:** PRD Section 8.1, SRS Section 6, BUSINESS_RULES BR-ACA-01.

---

## DD-005: Unified Potential Card
- **Status:** Approved
- **Context:** The card grid displays listings on maps and directories.
- **Problem:** Designing distinct cards for UMKM, Tourism, and Agriculture leads to code duplication.
- **Alternatives Considered:**
  - *Alternative A:* Category-specific card layouts.
  - *Alternative B:* Plain text lists.
- **Selected Solution:** Unified Potential Card with polymorphic badges and Adaptive Contact.
- **Rationale:** Renders a clean photo cover, category marker, description, and contact action. Category variations map dynamically.
- **Benefits:** Consistent grid look, reusable code block.
- **Trade-offs:** Restricts unique visual highlights for specific categories.
- **Future Impact:** Brand consistency maintained automatically as the catalog expands.
- **Related Documents:** UI/UX Spec Section 2.5, COMPONENT_LIBRARY ORG-07.

---

## DD-006: Adaptive Contact Fallback Logic
- **Status:** Approved
- **Context:** Local merchants have varying levels of digital literacy.
- **Problem:** Empty social media or phone parameters on details pages result in dead links or empty icon placeholders, damaging trust.
- **Alternatives Considered:**
  - *Alternative A:* Require all contact options on form save.
  - *Alternative B:* Display broken/empty icons.
- **Selected Solution:** Adaptive Contact Button using a strict fallback hierarchy (Merchant WA → Phone → Email → Web → Social → Village WhatsApp).
- **Rationale:** Guarantees a single active button. If the merchant contact is empty, the visitor routes to the village administration to process the referral.
- **Benefits:** No empty states, zero dead links, simple UI.
- **Trade-offs:** Village admin acts as intermediary for merchants missing numbers.
- **Future Impact:** Reusable molecule compatible with any upcoming potential category.
- **Related Documents:** PRD Section 8.3, BUSINESS_RULES BR-CON-01, COMPONENT_LIBRARY MOL-06.

---

## DD-007: Database-Driven Category Registry
- **Status:** Approved
- **Context:** Catalog filters map potentials to categories.
- **Problem:** Hardcoding categories in React menus requires a code rebuild and redeployment whenever a new category is introduced.
- **Alternatives Considered:**
  - *Alternative A:* Hardcode categories in frontend menus.
  - *Alternative B:* Subdomain routing per category.
- **Selected Solution:** Database-Driven Category API.
- **Rationale:** Category menus, filter chips, and map markers query categories dynamically from the database.
- **Benefits:** Admins can manage categories in CMS; changes reflect instantly on the public website.
- **Trade-offs:** Requires an API fetch query for navbar initialization.
- **Future Impact:** Scale categories easily without developer intervention.
- **Related Documents:** FEATURE_SPEC F-CMS-06, COMPONENT_LIBRARY MOL-02.

---

## DD-008: Reusable Detail Page Templates
- **Status:** Approved
- **Context:** View details profiles on click.
- **Problem:** Creating unique page layouts for UMKMs, Tourism, and Agriculture causes design drift.
- **Alternatives Considered:**
  - *Alternative A:* Separate page view routes for each category.
- **Selected Solution:** Reusable Detail Page Template (TPL-03).
- **Rationale:** Renders standard areas (breadcrumbs, gallery, coordinates, adaptive contact) and iterates over metadata key-values.
- **Benefits:** Maintains page consistency, simplifies page creation.
- **Trade-offs:** Less layout flexibility for custom listings.
- **Future Impact:** All future modules load instantly into TPL-03.
- **Related Documents:** COMPONENT_LIBRARY TPL-03, ROUTES R-PUB-05.

---

## DD-009: Mobile-First Prioritization
- **Status:** Approved
- **Context:** Internet access statistics in rural areas.
- **Problem:** Desktop-first portals fail on mobile browsers, which represent over 80% of local visitor traffic.
- **Alternatives Considered:**
  - *Alternative A:* Desktop-first design with standard media query shrinking.
- **Selected Solution:** Mobile-first layout scaling.
- **Rationale:** Focuses design on mobile touch targets (44px), vertical card stacks, collapsible drawers, and lightweight map sheets.
- **Benefits:** High usability, excellent page load performance on mobile networks.
- **Trade-offs:** Requires extra design attention for desktop wide-screen margins.
- **Future Impact:** System is accessible to all target users.
- **Related Documents:** RESPONSIVE_GUIDELINES Section 2.

---

## DD-010: Centralized Content Management System (CMS)
- **Status:** Approved
- **Context:** Admin operations.
- **Problem:** Separate admin panels for different categories duplicate auth configurations.
- **Alternatives Considered:**
  - *Alternative A:* Multiple admin panels per category.
- **Selected Solution:** Single CMS Admin Panel with dynamic Category Forms (ORG-14).
- **Rationale:** Authenticates a single admin session. The creation form dynamically adapts inputs based on the category chosen.
- **Benefits:** Low operational complexity for village staff.
- **Trade-offs:** Requires structured dynamic schemas in form rendering.
- **Future Impact:** Secure auth controls remain unified.
- **Related Documents:** SRS Section 3.2, FEATURE_SPEC F-CMS-03.

---

## DD-011: Documentation-First Development Method
- **Status:** Approved
- **Context:** Software engineering workflow.
- **Problem:** Coding before defining requirements results in design changes, structural bugs, and inconsistent interfaces.
- **Alternatives Considered:**
  - *Alternative A:* Code first, document later.
- **Selected Solution:** Documentation-First Development.
- **Rationale:** Establishes the PRD, SRS, Features, and Design rules before writing code. Builds a shared mental model.
- **Benefits:** High code clarity, speeds up implementation, reduces development cost.
- **Trade-offs:** Higher initial documentation phase time.
- **Future Impact:** Clear historical log for future maintainers.
- **Related Documents:** PRD Section 7, SRS Section 1.1.

---

## DD-012: AI-First Prompt Optimization
- **Status:** Approved
- **Context:** AI coding assistant integrations (Cursor, Copilot, Lovable, Bolt, v0).
- **Problem:** AI tools struggle when given vague guidelines or incomplete code comments, producing conflicting solutions.
- **Alternatives Considered:**
  - *Alternative A:* Standard human-only target documents.
- **Selected Solution:** AI-Optimized Markdown Documentation.
- **Rationale:** Structuring files in clear directories (PRD, SRS, Business Rules, Components) provides a complete context map for AI code generation tools.
- **Benefits:** Speeds up code generation, guarantees code consistency.
- **Trade-offs:** Requires strict structure management.
- **Future Impact:** Allows AI agents to execute code cycles.
- **Related Documents:** USER_STORIES Epic: System.

---

## DD-013: Tourism & Editorial Aesthetics
- **Status:** Approved
- **Context:** UI styling.
- **Problem:** Bureaucratic government templates look dry, decreasing visitor retention.
- **Alternatives Considered:**
  - *Alternative A:* Administrative table layout.
- **Selected Solution:** Editorial layouts, large spacing, natural colors, clear margins.
- **Rationale:** Design showcases the village's natural beauty to attract tourists and consumers.
- **Benefits:** Premium, modern brand feel.
- **Trade-offs:** Demands high-quality photo uploads.
- **Future Impact:** High brand value for Desa Karamatwangi.
- **Related Documents:** DESIGN_SYSTEM Section 1, BRAND_GUIDELINES Section 3.

---

## 4. DD-014: Performance-First Architecture
- **Status:** Approved
- **Context:** Mobile data network constraints.
- **Problem:** Heavy map assets and uncompressed photos slow down page loads.
- **Alternatives Considered:**
  - *Alternative A:* Load raw images.
- **Selected Solution:** Lazy loading, image compression to WebP (max 1200px), code splitting.
- **Rationale:** Keeps page load times under 2 seconds on 3G.
- **Benefits:** Fast loading, protects mobile data budgets.
- **Trade-offs:** Minor server CPU overhead for WebP conversion.
- **Future Impact:** Stable performance under high catalog sizes.
- **Related Documents:** SRS Section 4.1, BUSINESS_RULES BR-MED-01.

---

## 5. DD-015: Accessibility (WCAG 2.1 AA) Integration
- **Status:** Approved
- **Context:** Accessibility guidelines.
- **Problem:** Ignoring accessibility excludes users with visual or motor impairments.
- **Alternatives Considered:**
  - *Alternative A:* Standard design without WCAG auditing.
- **Selected Solution:** Mandatory WCAG 2.1 AA compliance (touch targets ≥ 44px, contrast 4.5:1, screen reader tags, keyboard tab index navigation).
- **Rationale:** Ensures the platform is usable by all citizens and visitors.
- **Benefits:** Inclusivity, SEO advantages.
- **Trade-offs:** Requires extra time for contrast checking.
- **Future Impact:** Ready for national accessibility audits.
- **Related Documents:** SRS Section 4.6, DESIGN_SYSTEM Section 13.

---

## 6. DD-016: Future Scalability Design
- **Status:** Approved
- **Context:** Modular expansions.
- **Problem:** Modifying layouts and menus when adding new sections requires redesign.
- **Alternatives Considered:**
  - *Alternative A:* Design for UMKM only.
- **Selected Solution:** Extensible layouts and components.
- **Rationale:** Categories, maps, cards, and forms pull parameters dynamically from the database.
- **Benefits:** Infinite expansion capabilities without code changes.
- **Trade-offs:** Higher initial abstraction requirement.
- **Future Impact:** System remains sustainable for years.
- **Related Documents:** PRD Section 3, SRS Section 6.
