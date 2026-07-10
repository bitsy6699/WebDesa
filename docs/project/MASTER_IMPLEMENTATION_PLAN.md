# Master Implementation Plan

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Purpose & Success Definition

This document serves as the authoritative implementation blueprint for **Website Potensi Desa Karamatwangi**. It coordinates the development timeline across database setup, backend API implementation, frontend components, and deployment steps.

By mapping dependencies, sprints, and quality gates, we ensure the project adheres strictly to the approved **Adaptive Content Architecture (ACA)**. Success is defined as delivering a fully validated, WCAG AA accessible platform that supports future module expansions without requiring database schema modifications or frontend refactoring.

---

## 2. Overall Implementation Strategy

The implementation combines several core development strategies:

- **Vertical Slice Development:** Instead of building the entire backend first and then the frontend, we build functional vertical slices (e.g. implementing category setup from the database up to the UI chips) to verify integration early.
- **Risk-First Development:** Core architectural layers (polymorphic database tables and ACA schema validations) are built first to resolve technical risks before designing visual pages.
- **Continuous Validation:** Every feature slice must pass local linting and automated unit tests before proceeding to subsequent components.
- **AI-Assisted Development:** Each task branch is structured to allow AI coding tools to read specifications and generate compile-safe code blocks matching our coding rules.

---

## 3. High-Level Roadmap

The project is structured into fifteen consecutive implementation phases:

```mermaid
gantt
    title Roadmap Potensi Desa Karamatwangi
    dateFormat  YYYY-MM-DD
    section Foundation
    Phase 0: Environment Setup       :active, p0, 2026-07-10, 2d
    Phase 1: Backend Setup           : p1, after p0, 3d
    Phase 2: Frontend Setup          : p2, after p0, 3d
    section Core Database & ACA
    Phase 3: Database & Migrations   : p3, after p1, 4d
    Phase 4: ACA Schema Engine       : p4, after p3, 5d
    Phase 5: Authentication (Sanctum): p5, after p4, 3d
    section Features
    Phase 6: Public Directory Grid   : p6, after p5, 5d
    Phase 7: CMS Admin Panels        : p7, after p6, 6d
    Phase 8: Interactive Map         : p8, after p6, 5d
    Phase 9: Excel Import & Export   : p9, after p7, 4d
    section QA & Release
    Phase 10: Performance Optimization: p10, after p9, 3d
    Phase 11: Testing & QA Audit     : p11, after p10, 4d
    Phase 12: Deployment (Staging)   : p12, after p11, 2d
    Phase 13: Release Candidate      : p13, after p12, 3d
    Phase 14: Production Go-Live     : p14, after p13, 2d
```

---

## 4. Phase Breakdown & Execution Details

### Phase 0: Environment Setup
- **Objective:** Configure local environments, Git repositories, and tooling.
- **Tasks:**
  - Initialize backend with Laravel 12.
  - Initialize frontend with React + Vite + TypeScript.
  - Set up code linters (ESLint, Prettier, Laravel Pint).
  - Configure `.env` config variables.
- **Deliverables:** Local running server, working git repositories.

### Phase 1: Backend Foundation
- **Objective:** Build base API frameworks and request validators.
- **Tasks:**
  - Create base controller resource structures.
  - Setup core routes middleware.
- **Deliverables:** Working backend routing.

### Phase 2: Frontend Foundation
- **Objective:** Design basic layout templates and theme tokens.
- **Tasks:**
  - Install Tailwind CSS and verify design tokens.
  - Configure Atomic folder structures (`components/atoms`, etc.).
- **Deliverables:** Responsive base layouts (TPL-01, TPL-02).

### Phase 3: Database & Migrations
- **Objective:** Deploy base relational database tables.
- **Tasks:**
  - Write database migrations for `users`, `categories`, `category_schemas`, `potentials`, `locations`, `media`.
  - Configure UUID triggers.
- **Deliverables:** Relational MySQL tables.

### Phase 4: Adaptive Content Architecture (ACA) Engine
- **Objective:** Implement polymorphic JSON metadata storage and schema validation.
- **Tasks:**
  - Write `CategorySchema` validator service in Laravel.
  - Build dynamic metadata forms and parser logic in React.
- **Deliverables:** Functional ACA engine (saving and rendering dynamic custom fields).

### Phase 5: Authentication (Laravel Sanctum)
- **Objective:** Implement secure admin CMS logins.
- **Tasks:**
  - Configure Sanctum auth middleware.
  - Setup frontend login page and auth contexts.
- **Deliverables:** Protected admin panel access.

### Phase 6: Public Website Directory
- **Objective:** Render potentials listings and custom profile pages.
- **Tasks:**
  - Implement `PotentialGrid` and `UnifiedPotentialCard`.
  - Design TPL-03 Detail Template with Adaptive Contact Fallback logic.
- **Deliverables:** Public potentials directory.

### Phase 7: CMS Admin Panels
- **Objective:** Complete CMS interface for potential creation.
- **Tasks:**
  - Build generic `DataTable` and dynamic `AdminForm` parsing ACA schemas.
  - Create coordinate picker and media manager widgets.
- **Deliverables:** Operational admin catalog editor.

### Phase 8: Interactive Map Explorer
- **Objective:** Leaflet-powered geospatial map interface.
- **Tasks:**
  - Setup Leaflet maps, markers, and category overlay filters.
  - Implement slide-up bottom sheets for mobile map views.
- **Deliverables:** Interactive village map.

### Phase 9: Excel Bulk Data Operations
- **Objective:** Fast catalog uploads.
- **Tasks:**
  - Build Laravel Excel importer with step validations.
  - Implement transaction rollback handling on row failures.
- **Deliverables:** Working bulk data import wizard.

### Phase 10: Performance Optimization
- **Objective:** Ensure quick mobile loading.
- **Tasks:**
  - Setup automatic WebP image conversion and scaling.
  - Enable Nginx Gzip compression and configure database query indexes.
- **Deliverables:** Optimized application speeds.

### Phase 11: Testing & QA Audit
- **Objective:** Complete verification checks.
- **Tasks:**
  - Run PHPUnit tests and Vitest UI tests.
  - Perform WCAG AA accessibility tests and responsive audits.
- **Deliverables:** Stable testing reports.

### Phase 12: Deployment (Staging)
- **Objective:** Validate system on a staging server.
- **Tasks:**
  - Deploy codebase to staging VPS via SSH scripts.
  - Test health endpoint `/api/v1/health`.
- **Deliverables:** Staging portal live.

### Phase 13: Release Candidate (RC)
- **Objective:** Final administrative reviews.
- **Tasks:**
  - Train village editors.
  - Perform exploratory manual QA checks.
- **Deliverables:** Final approved release candidate.

### Phase 14: Production Go-Live
- **Objective:** Launch live website.
- **Tasks:**
  - Configure production domain records.
  - Active nightly database backup chron jobs.
- **Deliverables:** Public production portal active.

---

## 5. Dependency Matrix

The table below outlines the core dependencies between implementation phases. Backend infrastructure, database schemas, and ACA schema validation logic must be fully established before building user interfaces.

| Phase | Description | Prerequisite Phases | Rationale |
| --- | --- | --- | --- |
| **Phase 3** | Database | Phase 1 (Backend Foundation) | Eloquent models and migrations require a configured Laravel backend. |
| **Phase 4** | ACA Engine | Phase 3 (Database) | Dynamic JSON metadata validation relies on database-driven category schema tables. |
| **Phase 5** | Authentication | Phase 4 (ACA Engine) | Protects the dynamic creation paths managed by the ACA engine. |
| **Phase 7** | CMS Panels | Phase 5 (Auth), Phase 6 (Directory) | CMS panel forms require Sanctum authorization and reuse directory card designs. |
| **Phase 9** | Excel Import | Phase 7 (CMS Panels) | The bulk import wizard integrates directly with CMS database transactional services. |

---

## 6. Sprint Planning (4 Sprints)

The implementation timeline is divided into four two-week sprints:

### Sprint 1: Foundation & Database Layer
- **Goal:** Set up local projects, compile database migrations, and deploy core routers.
- **Features:** Environment configs, UUID models, CORS/Sanctum configuration.
- **DoD:** Unit tests pass with 80% coverage; database schemas verified.

### Sprint 2: ACA Engine & Public Directory
- **Goal:** Implement dynamic metadata storage and public list grids.
- **Features:** JSON-Schema validator, TPL-03 detail templates, UnifiedPotentialCard, contact fallback.
- **DoD:** Public directory grid renders category items dynamically from category database seeders.

### Sprint 3: CMS Editor & Map Explorer
- **Goal:** Launch the Admin Panel and the Interactive Map.
- **Features:** Admin login, dynamic CMS forms, coordinate picker, Leaflet canvas, filter overlays.
- **DoD:** Admin can log in, place map markers, and submit potential profiles via the dynamic form engine.

### Sprint 4: Bulk Operations, Optimization, & Launch
- **Goal:** Implement Excel imports, optimize load speeds, and deploy live.
- **Features:** Excel importer, transactional rollback, WebP compression, VPS deployment scripts.
- **DoD:** Platform health checks pass, lighthouse score $\ge 90$, and production site is live on the village domain.

---

## 7. Risk Management Matrix

| Risk Category | Risk Description | Severity | Mitigation Strategy |
| --- | --- | --- | --- |
| **Technical** | JSON column queries execute slowly as catalog grows. | Medium | Restrict keyword searches to indexed core fields (title, description). Do not query JSON metadata parameters inside search filters. |
| **Data Integrity** | Malformed JSON metadata enters database. | High | Enforce strict backend validation of incoming metadata payloads against category JSON-Schemas before executing database save transactions. |
| **Operational** | Admin uploads massive images, slowing load speeds. | High | Implement automatic backend image compression, converting all uploads to optimized WebP formats (max 1200px width). |
| **AI Integration** | AI tools invent APIs or duplicate components. | Medium | Enforce strict reading rules. AI assistants must read the specification files first and verify their code matches the coding guidelines. |

---

## 8. Rollback Strategies

In the event of deployment failures, the following rollback recovery paths must be executed:

- **Database Rollback:** If a migration crashes, execute `php artisan migrate:rollback --step=1` to revert the last database modification.
- **Codebase Rollback:** Revert git HEAD to the previous tagged stable version (e.g. `git reset --hard v1.0.0`) and clear cache states: `php artisan config:clear`.
- **Media Rollback:** If file directories are corrupted, restore the previous night's media backup tarball from the remote storage server.

---

## 9. Success KPIs & Metrics

To declare the implementation successful, the platform must satisfy these targets:

- **Performance (Lighthouse):** Mobile score $\ge 85$, Desktop score $\ge 90$.
- **Accessibility:** 100% WCAG 2.1 AA compliance (zero warnings on audits).
- **Test Coverage:** $\ge 80\%$ test coverage on all backend service classes.
- **Response Time:** API endpoints load in under 300ms under standard loads.
- **ACA Scalability:** Adding a new category row in the database must render custom cards, chips, and maps without requiring a code deploy.
