# Naming Convention Specification

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Naming Philosophy

To maintain absolute clarity, prevent runtime bugs, and establish an AI-friendly environment, all code, files, routes, and database properties must adhere to these naming standards:

- **Consistency:** A single concept must have one name across the entire stack. If the primary entity is a "Potential", it must be named `Potential` in database tables, backend models, API routes, and React components.
- **Readability:** Favor clear names over short ones. A developer or AI coding assistant must be able to understand the function of a variable or file without reading its implementation.
- **Predictability:** Developers should be able to guess the name of a component, service method, or route based on standard application naming rules.
- **Discoverability:** Standard naming prefixes and suffixes allow files to group together logically within file trees.
- **Scalability:** Naming choices must accommodate new ACA categories without renaming existing codebase assets.
- **AI-Friendly Naming:** AI tools process structured semantic variables easily. Using explicit names reduces AI context confusion and incorrect code generation.

---

## 2. General Casing Standards

Different programming scopes require specific casing patterns. The following table defines the casing standard for each tech stack layer:

| Casing Style | Target Use Case | Example |
| --- | --- | --- |
| **PascalCase** | React Components, React Layouts, TypeScript Types/Interfaces, Laravel Classes (Models, Services, Controllers) | `UnifiedPotentialCard`, `StorePotentialRequest` |
| **camelCase** | JavaScript/TypeScript Variables, JavaScript Functions, React Hooks, Object Properties | `usePotentialFilter`, `fetchCategoryData` |
| **snake_case** | Database Tables, Database Columns, PHP Array Keys, JSON Payload Keys | `category_id`, `schema_definition` |
| **kebab-case** | Directory Names, CSS Classes, URL Route Slugs, Markdown File Names | `potential-grid`, `/api/v1/potential-items` |
| **UPPER_SNAKE** | System Constants, Environment Variables, Configuration Constants | `QUEUE_CONNECTION`, `MAX_UPLOAD_SIZE` |

---

## 3. General Naming Rules

- **English Only:** All code entities (variables, classes, DB schemas, functions) must be written in English. Indonesian is permitted **only** inside dynamic database content rows or user-facing UI localization text.
- **Singular vs. Plural:**
  - Class names, models, and single component files are **singular** (e.g. `Potential.php`).
  - Directories, collections, route groups, and database tables are **plural** (e.g. `potentials` table, `/potentials` directory).
- **Avoid Abbreviations:** Never abbreviate words unless they are globally accepted standards (e.g. use `id` or `URL`; never use `calc` for calculate, `info` for information, or `msg` for message).
- **Self-Documenting & Semantic:** Choose descriptive names showing the actual business value (e.g. `fallbackWhatsappNumber` instead of `altPhone`).

### 3.1. General Naming Examples
- ❌ **Bad:** `Data`, `Temp`, `pot_id`, `get_data()`, `temp_list`
- ✅ **Good:** `potentials`, `categoryId`, `fetchActivePotentials()`, `filteredMediaGallery`

---

## 4. Frontend Naming Conventions (React + TypeScript)

### 4.1. Directory Structure
- Component directories: `kebab-case` (e.g. `components/atoms`, `components/organisms`).
- Utility folders: `kebab-case` (e.g. `utils/`, `contexts/`).

### 4.2. Components & Files
- Every React component file must use **PascalCase** (e.g. `UnifiedPotentialCard.tsx`).
- File names must exactly match the exported main component name.
- Event handlers: Prefix with `handle` on implementation and `on` on properties:
  - Property: `onClick`
  - Handler: `handleClick`
- Boolean variables: Prefix with `is`, `has`, or `should` (e.g. `isFeatured`, `hasCoordinates`, `shouldShowModal`).

### 4.3. Custom Hooks
- File names and hook functions must use **camelCase** prefixed with `use` (e.g. `useMapMarkers.ts`, `useAuthSession.ts`).

### 4.4. TypeScript Typings
- Interfaces: PascalCase, descriptive noun. Do not prefix with `I` (e.g. use `PotentialItem`, never `IPotentialItem`).
- Types: PascalCase (e.g. `PotentialStatus`).

---

## 5. Backend Naming Conventions (Laravel 12)

All Laravel classes must use PascalCase and carry their specific layer suffix:

| Class Layer | Casing & Suffix | Example |
| --- | --- | --- |
| **Model** | PascalCase Singular | `Potential.php`, `Category.php` |
| **Controller** | PascalCase + `Controller` | `PotentialController.php` |
| **Service** | PascalCase + `Service` | `ImageProcessingService.php` |
| **Request** | PascalCase + `Request` | `StorePotentialRequest.php` |
| **Resource** | PascalCase + `Resource` | `PotentialResource.php` |
| **Policy** | PascalCase + `Policy` | `PotentialPolicy.php` |
| **Observer** | PascalCase + `Observer` | `PotentialObserver.php` |
| **Enum** | PascalCase Singular | `PotentialStatus.php` |

---

## 6. Database Naming Conventions (MySQL)

- **Tables:** `snake_case` plural (e.g., `potentials`, `category_schemas`).
- **Pivot Tables:** `snake_case` alphabetical order of singular model names joined (e.g., `potential_media` rather than `media_potentials`).
- **Columns:** `snake_case` singular (e.g., `cover_image_id`, `is_featured`).
- **Primary Keys:** Always `id` (UUID format).
- **Foreign Keys:** Singular reference table name + `_id` suffix (e.g., `category_id`).
- **Indexes:** Standard Laravel naming: `table_column_index_type` (e.g., `potentials_slug_unique`).
- **Timestamps:** Standard Eloquent naming: `created_at`, `updated_at`, `deleted_at`.

---

## 7. REST API Naming Conventions

- **Endpoint Paths:** `kebab-case` plural (e.g. `/api/v1/potential-items`).
- **Action parameters:** Use standard plural nouns. Action paths are represented by HTTP verbs, not path verbs:
  - ❌ `POST /api/v1/create-potential`
  - ✅ `POST /api/v1/potentials`
- **Query Strings:** `camelCase` for parameter filters (e.g. `/api/v1/potentials?searchQuery=kopi&categoryId=uuid-1`).
- **Error Codes:** UPPER_SNAKE error identifier codes (e.g. `VALIDATION_FAILED`, `IMPORT_VALIDATION_FAILED`, `UNAUTHENTICATED`).

---

## 8. Route Naming Conventions

- **Frontend Routes:** `kebab-case` slugs:
  - Homepage: `/`
  - Directory: `/potensi`
  - Dynamic Detail: `/potensi/:category/:slug`
  - CMS: `/admin/dashboard`, `/admin/potensi`
- **Backend Named Routes:** `snake_case` dotted notation:
  - Public index: `api.v1.potentials.index`
  - Admin store: `api.v1.admin.potentials.store`

---

## 9. Git Casing Standards

- **Branch Naming:** `kebab-case` prefixed with task category:
  - Features: `feature/short-description` (e.g. `feature/interactive-map`)
  - Bugfixes: `bugfix/short-description` (e.g. `bugfix/contact-fallback`)
  - Maintenance: `chore/short-description` (e.g. `chore/update-pint`)
- **Commit Messages:** Follow **Conventional Commits** standard:
  - `feat: add Leaflet map component`
  - `fix: correct coordinate validation boundaries`
  - `docs: generate API specification`
- **Release Tags:** SemVer prefix v (e.g. `v1.0.0`).

---

## 10. Reserved & Prohibited Words

### 10.1. Reserved Words to Avoid
To prevent collision with built-in functions, variables, or causing logic ambiguity:
- `data`: Too generic. Always specify content (e.g. `potentialCollection` or `validatedPayload`).
- `temp`: Ambiguous. Use descriptive context (e.g. `uploadedFile` or `processedImage`).
- `item`, `object`, `value`: Use actual domain names (e.g. `categoryRecord` or `coordinateArray`).

### 10.2. Naming Anti-Patterns
- **Mixed Casing:** Never combine casing in the same scope (e.g., `potentials_Table` is prohibited).
- **Hungarian Notation:** Do not prefix variables with type indicators (e.g. use `activePotentials` rather than `arrActivePotentials` or `potentialsArray`).
- **Generic Suffixes:** Avoid ending folder names with `Folder`, `Data`, or `File` (e.g. use `components/atoms`, not `atom-files`).

---

## 11. Naming Checklist

Developers and AI tools must verify these checklist points before creating any new file or model:

- [ ] Does the name use English?
- [ ] Does the name follow the casing conventions defined for its tech stack layer?
- [ ] Is the name descriptive of its business value (avoiding reserved generic words)?
- [ ] Do React files use PascalCase and match their default export?
- [ ] Do Laravel models, services, request, and controller files use standard suffixes?
- [ ] Do database table names use snake_case plural?
- [ ] Do API endpoints use plural kebab-case and HTTP verb mappings?
