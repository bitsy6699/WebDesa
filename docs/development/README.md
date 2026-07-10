# Development Layer Entry Point

## Project: Website Potensi Desa Karamatwangi
### Status: Approved
### Version: 1.0.0
### Date: 2026-07-10

---

## 1. Introduction & Objectives

The Development Layer translates the architectural blueprints and design guidelines into functional software code. It serves as the primary implementation handbook for frontend developers, backend developers, and AI coding assistants.

By establishing strict coding protocols, naming conventions, and testing setups before implementation begins, we ensure:
- **Consistency:** The codebase remains uniform, regardless of who writes it.
- **Maintainability:** Refactoring, optimizations, and feature additions can be performed without breaking existing components.
- **AI-Ready Workflow:** The structured specifications provide clear contexts, allowing AI tools to write compile-safe code with minimal context drift.

---

## 2. Documentation Architecture Relationships

The development phase builds directly upon three preceding layers of documentation:

```
[ Product Layer ] ── (What to Build)
       │
       ▼
[ Design Layer ] ── (How it Looks & Feels)
       │
       ▼
[ Engineering Layer ] ── (Technical Specifications)
       │
       ▼
[ Development Layer ] ── (How to Implement & Test)
```

1. **Product Layer (PRD, SRS, Features, Business Rules):** Sets the functional goals, user personas, validation limits, and operational rules.
2. **Design Layer (Design System, Components, Brand/Content Guidelines):** Defines design tokens, layout parameters, responsive grids, and UX copy rules.
3. **Engineering Layer (ACA, System/DB Specs, API Specs, Folder Structure):** Outlines data schemas, endpoint parameters, folder structures, and deployment topologies.
4. **Development Layer:** Establishes coding standards, testing setups, and git review processes.

---

## 3. Development Layer Document Map

The Development Layer consists of six detailed specification files:

- **[CODING_RULES.md](file:///c:/KKN/POTENSIDESA/docs/development/CODING_RULES.md):** Defines language rules (TypeScript, PHP 8.3+), framework formatting standards (Laravel 12, React 18+), and code structure instructions.
- **[NAMING_CONVENTION.md](file:///c:/KKN/POTENSIDESA/docs/development/NAMING_CONVENTION.md):** Standardizes naming patterns for directories, frontend classes, backend services, routes, and database tables.
- **[GIT_WORKFLOW.md](file:///c:/KKN/POTENSIDESA/docs/development/GIT_WORKFLOW.md):** Defines branching models, commit message specifications (Conventional Commits), and release guidelines.
- **[TESTING.md](file:///c:/KKN/POTENSIDESA/docs/development/TESTING.md):** Outlines testing pipelines (Vitest, PHPUnit), test coverage goals, and verification strategies.
- **[CODE_REVIEW.md](file:///c:/KKN/POTENSIDESA/docs/development/CODE_REVIEW.md):** Details pull request validation steps, automated linter checking, and peer audit guidelines.
- **[PROMPTS.md](file:///c:/KKN/POTENSIDESA/docs/development/PROMPTS.md):** Defines standard prompt templates for AI coding assistants.

---

## 4. AI-First Implementation Workflow

AI coding assistants (such as Cursor, Claude Code, Lovable, Bolt, v0, etc.) must follow a strict **Read-First** policy before writing any code:

```
[ Load Context Files ] 
  ├── Product Layer: Read PRD & Business Rules
  ├── Design Layer: Read Design System & Component specs
  ├── Engineering Layer: Read Database schemas & API Spec
  └── Development Layer: Read Coding Rules & Naming spec
           │
           ▼
[ Verification Check ] (Verify all definitions exist; do not guess)
           │
           ▼
[ Write Implementation Code ] (Strictly match structural specs)
           │
           ▼
[ Run Quality Linting & Tests ]
```

### Prompting Rule for AI Assistants:
> "Do not invent endpoints, CSS classes, database parameters, or file pathways. If a technical configuration is not explicitly documented in the Product, Design, or Engineering layers, stop and ask the Lead Developer for clarification before proceeding."

---

## 5. Development Lifecycle

The software development process follows a sequential checklist to maintain code quality:

1. **Requirement Review:** Parse user stories and acceptance criteria.
2. **Architecture Check:** Confirm DB schemas, API specs, and components are registered in the specs.
3. **Branch Creation:** Create a feature branch matching [GIT_WORKFLOW.md](file:///c:/KKN/POTENSIDESA/docs/development/GIT_WORKFLOW.md).
4. **Test-Driven Design:** Write unit tests for business logic before writing implementation code.
5. **Implementation:** Write code matching [CODING_RULES.md](file:///c:/KKN/POTENSIDESA/docs/development/CODING_RULES.md) and [NAMING_CONVENTION.md](file:///c:/KKN/POTENSIDESA/docs/development/NAMING_CONVENTION.md).
6. **Local Verification:** Run linters, code formatters, and local test suites.
7. **Pull Request & Audit:** Push code to GitHub, triggering CI/CD checks, followed by human peer review.
8. **Deployment:** Merge to main branch for automated staging/production deployment.

---

## 6. Definition of Done (DoD)

A task or feature branch is officially considered complete and ready to merge only when it meets the following criteria:

- [ ] **Business Compliance:** The feature satisfies all business logic constraints defined in `BUSINESS_RULES.md`.
- [ ] **Acceptance Criteria:** Every scenario listed in `ACCEPTANCE_CRITERIA.md` has been verified and passes.
- [ ] **UI Consistency:** Visual components conform to Design System tokens (fonts, colors, spacing).
- [ ] **Responsive Design:** Interfaces function correctly across all breakpoints.
- [ ] **Accessibility (WCAG AA):** Focus rings are visible, touch targets are $\ge 44\text{px}$, and ARIA labels are configured.
- [ ] **API Conformance:** Endpoints match the path and JSON schema defined in `API_SPEC.md`.
- [ ] **Tests Passing:** Vitest (frontend) and PHPUnit (backend) suites run successfully with $\ge 80\%$ test coverage.
- [ ] **Code Formatting:** Code passes Laravel Pint and ESLint format checks with zero warnings.
- [ ] **Documentation Update:** Any new API response structure, helper, or config is added to the specifications.
