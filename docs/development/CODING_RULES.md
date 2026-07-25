# Coding Rules & Implementation Standards

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Coding Philosophy

To ensure that the Website Potensi Desa Karamatwangi remains stable, maintainable, and easy to develop, all development must adhere to the following core tenets:

- **Readability over Cleverness:** Code is read far more often than it is written. Avoid clever micro-optimizations, obscure language hacks, or nested single-line statements. Write code that clearly describes its intent.
- **Simplicity over Complexity:** Follow the KISS (Keep It Simple, Stupid) principle. Implement the simplest solution that satisfies the acceptance criteria before introducing abstractions.
- **Consistency over Preference:** Maintain uniform patterns throughout the project. Personal preferences regarding spacing, variable naming, or loop styles must yield to the conventions defined in this document and our formatting linters.
- **Reusability over Duplication:** Duplicate code is a liability. Extract repeating behaviors into clean utility functions or custom React hooks.
- **Documentation-First:** Never write code that deviates from or contradicts our design and architecture specifications. If a requirement shifts, update the documentation before modifying the code.
- **AI-First Development:** Code must be highly structured and modular. Clear interfaces, explicit typings, and strict naming conventions allow AI coding assistants to generate code accurately.
- **Security-First:** Assume all user input is malicious. Implement validation, output escaping, and authorization checks at every layer.
- **Performance-Aware:** Optimize database queries, compress images on upload, lazy-load page routes, and prevent unnecessary component re-renders.
- **Accessibility by Default:** Build pages that are accessible to all users. WCAG 2.1 AA compliance (contrast, keyboard navigation, tab index, ARIA roles) is a baseline requirement, not a post-launch enhancement.
- **Scalability by Design:** Follow the Adaptive Content Architecture (ACA) to ensure that the codebase can support new village potential categories without requiring architectural modifications.

---

## 2. General Coding Principles

All code written for this project must apply the following structural design principles:

### 2.1. SOLID Principles
- **Single Responsibility Principle (SRP):** A class or component must have exactly one reason to change. (e.g., Form Requests only handle validation; Controllers only handle request-response flows; Services only handle business logic).
- **Open/Closed Principle (OCP):** Software entities should be open for extension but closed for modification. ACA implements this by using configurable schemas rather than modifying model schemas.
- **Liskov Substitution Principle (LSP):** Subtypes must be substitutable for their base types.
- **Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use.
- **Dependency Inversion Principle (DIP):** Depend on abstractions (interfaces, base configurations), not concretions (hardcoded implementations).

### 2.2. Core Design Rules
- **DRY (Don't Repeat Yourself):** Avoid duplicate code. Extract repeating UI elements into atomic components and repeating business logic into services or helper functions.
- **KISS (Keep It Simple, Stupid):** Write code that is easy to understand. Avoid nested loops, deeply nested conditionals, and over-engineered inheritance structures.
- **Composition over Inheritance:** In React components, favor composing behaviors together over inheritance.
- **Fail Fast:** Validate inputs and authorization parameters immediately. Return early responses as soon as a check fails to prevent unnecessary processing.
- **Explicit over Implicit:** Explicit code is easier to debug. Avoid dynamic property access or implicit type coercion.

---

## 3. Frontend Implementation Rules (React)

### 3.1. Component Composition
- Group UI elements using Atomic Design principles (`atoms/`, `molecules/`, `organisms/`).
- Components must be functional components using React hooks. Do not use class-based components.
- Keep components small (target: $< 150$ lines of code). If a component exceeds this, extract sub-elements into smaller helper components.
- Export components as default exports from their respective files.

### 3.2. JavaScript Standards
- Use modern ES6+ syntax: arrow functions, destructuring, spread operators, template literals.
- Use `const` by default, `let` only when rebinding is necessary. Never use `var`.
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safe property access.

### 3.3. State Management
- Use local React state (`useState`, `useReducer`) for component-specific interactive states (e.g. toggles, input values).
- Use React Context API for global settings (e.g., Auth State, Language Config, Active Navigation State).
- Use TanStack Query (React Query) for caching, invalidation, and background state synchronization of server data. Do not duplicate server data in local client states.

### 3.4. Forms & Validation
- Standardize on **React Hook Form** for form state management.
- Validate inputs using manual validation functions or schema validation libraries.
- Every form field must display inline validation feedback using `role="alert"` tags on error states.
- Submit buttons must transition to a disabled, loading state with a spinner indicator during form submission.

### 3.5. Styling & Motion
- Use **Tailwind CSS** utility classes. Never write inline CSS styles (`style={{ ... }}`).
- Reference design system tokens (colors, spacing, typography) via standard Tailwind classes. Do not use arbitrary values (e.g., use `px-4` or `bg-primary`, never `px-[17px]` or `bg-[#16A34A]`).
- Configure animations using **Framer Motion** presets defined in the `MOTION_GUIDELINES.md` file.

### 3.6. UI Accessibility (WCAG 2.1 AA)
- Every interactive element (buttons, links, inputs) must maintain a minimum touch target size of `44px × 44px`.
- All images must include descriptive `alt` text. Decorative icons must be marked with `aria-hidden="true"`.
- Keyboard navigation: Users must be able to navigate, select, and submit all elements using the `Tab`, `Arrow`, and `Enter` keys. Focus rings using the `--border-focus` color must remain visible.

---

## 4. Backend Implementation Rules (Express.js + Prisma)

### 4.1. Thin Controllers
- Controller functions must contain **zero business logic**.
- A controller's only responsibility is to:
   1. Extract validated parameters from the request.
   2. Call the corresponding Service module method.
   3. Format and return the JSON response.
- Limit controllers to standard RESTful resource methods: `index`, `show`, `store`, `update`, `destroy`.

### 4.2. Service Layer
- All business operations, image resizing, and file operations must live inside dedicated Service modules.
- Services should be imported into controllers to promote decoupling and testing mockability.
- Use Prisma's interactive transactions (`prisma.$transaction([...])`) for operations that update multiple tables.

### 4.3. Prisma Schema
- All database keys must use UUIDs (UUID v4) generated at the application level or via `@default(uuid())`.
- Define relations explicitly in `schema.prisma` using `@relation` decorators.
- Enable Soft Deletes on the `Potential` model by including a `deletedAt` field with nullable DateTime.
- Define Prisma query scopes via reusable where-clause builders in service modules.

### 4.4. Validation
- Validate all incoming data inside dedicated validator middleware. Never write validation logic directly in controller functions.
- Define explicit validation rules for every field.
- For ACA potentials, fetch the category's schema definition to dynamically generate metadata validation rules.

### 4.5. Exception Handling
- All API exceptions must be caught by a global error handler middleware and formatted into the standard JSON error response:
  ```json
  {
    "success": false,
    "error": {
      "code": "ERROR_CODE",
      "message": "User-friendly description.",
      "details": {}
    }
  }
  ```
- Use descriptive custom error classes to handle business logic failures.

### 4.6. File Storage & Media Processing
- Media operations must pass through the `ImageProcessingService`.
- Automatically compress uploaded images to WebP format using sharp, cap resolution at 1200px width, and restrict uploads to a 5MB maximum file size.
- Store files under `uploads/` directory and serve them as Express static files.

---

## 5. Database & API Rules

### 5.1. Database Standards
- Use Prisma Migrations to declare database updates. Never execute manual raw SQL adjustments on production databases.
- Ensure all relations define explicit referential actions:
  - Use `onDelete: Restrict` for relationships that must be preserved (e.g. categories with potentials).
  - Use `onDelete: Cascade` for child dependencies (e.g. potentials and locations).
- Apply indexes to frequently queried columns: `slug`, `status`, `category_id`, `is_featured`, and composite indexes for `(latitude, longitude)` spatial lookups.

### 5.2. API Standards
- Build RESTful endpoints versioned via the URL path: `/api/v1/*`.
- Standard HTTP methods:
  - `GET`: Retrieve resources. Safe and idempotent.
  - `POST`: Create new resources.
  - `PUT`: Update existing resources (full replacement).
  - `DELETE`: Remove resources (or soft-delete).
- Return standardized success payloads:
  ```json
  {
    "success": true,
    "data": {}
  }
  ```
- Return paginated results using standard `meta` and `links` objects.

---

## 6. ACA Integration Rules

All catalog items must route through the Adaptive Content Architecture (ACA):

- **No Hardcoded Categories:** Never write conditional statements or components that check for specific categories by name or ID (e.g., `if (category === 'UMKM')`).
- **Data-Driven Menus:** Filter options, navigation lists, and form fields must be derived dynamically from the `categories` and `category_schemas` tables.
- **Unified Templates:** Detail pages must render using the standard TPL-03 template, iterating over the `metadata` JSON object to output dynamic key-value lists.

---

## 7. Security Hardening Rules

- **Input Validation:** Enforce strict validation rules for all write operations. Validate files by MIME type (jpeg, png, webp) and size (max 5MB).
- **SQL Injection Prevention:** Use Prisma parameterized queries. Never construct raw SQL strings manually.
- **XSS Mitigation:** Escape all user-generated content on the frontend. React escapes text nodes by default; never use `dangerouslySetInnerHTML` unless input is sanitized first.
- **Rate Limiting:** Protect endpoint traffic using throttle middleware:
  - Standard API routes: Max 60 requests per minute per IP.
  - Login route: Max 5 attempts per minute per IP.
- **Secrets Management:** Keep passwords, API tokens, and database credentials out of git. Reference them using the `.env` file.

---

## 8. Performance Optimization Rules

- **Eager Loading:** Eager-load relations (`with(['category', 'location', 'coverImage'])`) to prevent N+1 query execution problems on lists.
- **JSON Query Limit:** Never execute `LIKE` search filters directly against the JSON `metadata` column. Restrict keyword searches to indexed core text columns (`title`, `description`).
- **Caching:** Cache static settings and categories lists in memory to avoid redundant database reads.
- **Lazy Loading:** Lazy-load frontend page routes using `React.lazy` and `Suspense` to split code bundles.

---

## 9. AI Development Constitution (Mandatory)

AI coding assistants (Cursor, Claude Code, etc.) must follow these strict rules:

### 9.1. Prohibited AI Behaviors
- ❌ **Do NOT invent code patterns:** Never write custom controllers, routes, CSS classes, or folders outside of the specs.
- ❌ **Do NOT hardcode category configurations:** Always follow ACA design patterns.
- ❌ **Do NOT skip validators:** Do not write forms or controllers that accept unvalidated inputs.
- ❌ **Do NOT skip accessibility features:** Do not output HTML without descriptive alt attributes, tab navigation, or focus borders.
- ❌ **Do NOT introduce circular dependencies:** Adhere to the downward dependency flow.

### 9.2. Required AI Behaviors
- **Always read the context files first:** Open the PRD, Business Rules, API Spec, and Coding Rules before writing code.
- **Always reuse existing code:** Check the Component Library and helper traits before creating new files.
- **Always follow naming conventions:** Match folder casing and suffix rules exactly.
- **Always verify output against tests:** Write unit tests to check logic before declaring work complete.

---

## 10. Code Quality & Format Linters

Code must pass the following validation pipelines before merging:

- **oxlint:** Frontend JavaScript code must pass lint checks with zero errors.
- **No Dead Code:** Clean out unused variable declarations, debug logs (`console.log`), and commented-out code blocks before submitting code.

---

## 11. Code Review Checklist

Reviewers must verify these points before approving a Pull Request:

- [ ] Does the code satisfy the target user stories and business rules?
- [ ] Are all inputs validated through validator middleware?
- [ ] Does the implementation follow ACA principles (no hardcoded category checks)?
- [ ] Do database queries eager-load relationships to prevent N+1 queries?
- [ ] Are database operations wrapped in transactional blocks where necessary?
- [ ] Do all page elements support responsive layouts across all breakpoints?
- [ ] Is keyboard navigation fully functional with visible focus rings?
- [ ] Are unit tests written and passing with adequate coverage?
- [ ] Has debug code (`console.log`, `dd()`) been completely removed?
- [ ] Is the code styled using design system tokens (no arbitrary Tailwind values)?
