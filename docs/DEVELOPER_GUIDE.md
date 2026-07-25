# Developer Guide

Welcome to the Potensi Desa Karamatwangi engineering handbook. This document provides everything you need to start contributing to the project immediately. 

This guide strictly documents the **current implementation** of the codebase, outlining rules, conventions, and workflows.

---

## 1. Project Overview

**Purpose:** 
A digital platform to showcase the potentials (tourism, culture, MSMEs) of Karamatwangi Village. It serves both as a marketing website for visitors and an administrative Content Management System (CMS).

**Architecture:**
- **Frontend:** A React Single Page Application (SPA) built with Vite. It enforces strict separation of concerns between public-facing marketing views and the administrative CMS.
- **Backend:** An Express.js (Node.js) application serving RESTful APIs.
- **API:** Communicates via standard JSON over HTTP, authenticated using JWT (Bearer token).
- **Public Website:** Highly visual, read-only interface optimized for performance and aesthetics.
- **Dashboard (CMS):** A secure administrative module utilizing a robust, highly reusable component system to manage village potentials, categories, and media.

---

## 2. Technology Stack

### Frontend
- **Framework:** React 19
- **Language:** JavaScript (ES6+)
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 + Custom Design System
- **Routing:** React Router v7
- **Data Fetching & API State:** TanStack Query (@tanstack/react-query) + Axios
- **Animations:** Framer Motion ^12.42.2
- **Icons:** Lucide React

### Backend
- **Framework:** Express.js 4
- **Authentication:** JWT (jsonwebtoken)
- **ORM:** Prisma 6
- **Database:** PostgreSQL 16
- **Media:** Sharp (WebP conversion), Multer (file upload)

---

## 3. Project Setup

**1. Clone the repository**
```bash
git clone <repository-url>
cd POTENSIDESA
```

**2. Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env variables (e.g., VITE_API_URL) to point to your local backend
```

**3. Run Development Server**
```bash
# Frontend (terminal 1)
cd frontend
npm run dev

# Backend (terminal 2)
cd backend
cp .env.example .env
# Edit .env with your PostgreSQL connection string
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```

**4. Quality Assurance Commands**
Run these before any commit:
- **Lint:** `npm run lint`
- **Build:** `npm run build`

---

## 4. Folder Convention

The `frontend/src` directory is strictly organized by domain and responsibility:

- `assets/` -> Static files (images, vectors) that require bundling.
- `components/` -> Public-facing UI primitives and shared non-dashboard elements.
- `constants/` -> Global config and environment constants.
- `dashboard/` -> **Isolated CMS Module**. Contains its own components, layouts, pages, features, and theme.
- `features/` -> Domain-specific logic or complex widgets (often found inside `dashboard/features/`).
- `hooks/` -> Shared React hooks (e.g., `usePotentials`).
- `layouts/` -> High-level page wrappers (`PublicLayout`, `DashboardLayout`).
- `pages/` -> Route entry components.
- `routes/` -> Routing configuration (`router.tsx`, `routeModules.tsx`).
- `services/` -> Axios API layer. No fetch logic should exist outside this folder.
- `lib/` -> Core utilities and style helpers.
- `routes/` -> Routing configuration.

---

## 5. Coding Standards

- **Functional Components Only:** Use React functional components and hooks. No class components.
- **JavaScript Only:** All code is written in plain JavaScript (ES6+). No TypeScript.
- **Prefer Composition:** Use `children` and composable components over passing massive prop objects.
- **Keep Files Small:** If a component exceeds ~150 lines, it likely needs to be broken down.
- **No Duplicated Logic:** Extract reusable functions to `utils/` or custom hooks.
- **No Inline Fetches:** Never use `fetch()` or `axios.get()` directly in a component. Call a service via React Query.
- **No Inline Styles:** Use Tailwind classes. Use inline styles *only* for dynamic values (e.g., calculated heights) or highly specific Framer Motion animations.

---

## 6. Dashboard Rules

The Dashboard (`src/dashboard/`) is treated as a sub-application to prevent UI bloating on the public site.

- **Always use `DashboardLayout`:** Dashboard pages must be wrapped in the standard layout for sidebar/header consistency.
- **Reuse Dashboard Primitives:** Never build a custom button or input for a specific dashboard page. Use `DashboardButton`, `DashboardInput`, etc.
- **Reuse Shared Tables:** Always use `DashboardDataTable` alongside `TableToolbar` and `TableFilters`. Do not build bespoke tables.
- **Reuse Shared Forms:** Utilize the standard form layouts and layouts inside `dashboard/components/forms/`.
- **No Page-Specific Duplicates:** If a dialog or action menu looks similar to an existing one, extend the existing one. Do not duplicate it.

---

## 7. Public Website Rules

- **Never import Dashboard Components:** `src/pages/` and `src/components/` must **never** import anything from `src/dashboard/`.
- **Keep Marketing UI Separated:** Public UI should prioritize visual flair (glassmorphism, animations) utilizing the `glassStyles.ts` and Tailwind.
- **Maintain Responsiveness:** All public pages must be mobile-first and extensively tested on small viewports.

---

## 8. API Rules

- **Service Layer:** All API interactions must be encapsulated in `src/services/` (e.g., `category.service.ts`).
- **Axios Usage:** Use the configured Axios singleton in `src/services/api.js`. This handles interceptors, base URLs, and JWT tokens automatically.
- **Loading States:** UI must explicitly handle loading states (using Skeleton loaders or spinners) while React Query is `isPending`.
- **Error Handling:** Gracefully handle errors using React Query's `isError`. Use the `ToastWrapper` or `ErrorState` components to display issues.
- **Response Mapping:** API responses follow a standard envelope format. Services unpack these responses and return clean domain data to the components.

---

## 9. Component Rules

Following a modified Atomic Design structure:

- **Atoms:** Irreducible elements (Buttons, Inputs, Spinners). Highly reusable.
- **Molecules:** Simple combinations of atoms (Search Bars, Field Labels with Hints).
- **Organisms:** Complex sections (Data Tables, Stat Grids, Hero Sections).
- **Layouts:** Structural page containers.
- **Pages:** Routable containers that orchestrate Organisms and inject state/data. 

**Reuse Strategy:** Before building a new Molecule or Organism, check if a similar one exists in `src/components/` or `src/dashboard/components/`. Prefer extending existing components.

---

## 10. State Management

- **Local State:** Use `useState` and `useReducer` for ephemeral UI state (e.g., dropdown toggles, modal open states).
- **API State:** Rely entirely on **React Query**. It handles caching, invalidation, loading, and error states. Do not duplicate API data into local state.
- **Form State:** Use controlled inputs for simple forms.
- **Global State (Future):** Currently, React Query and Context (via Layouts) suffice. If complex client state is needed later, standard Context or a lightweight library (Zustand) is recommended. Avoid Redux.

---

## 11. Forms

- **Validation:** Use HTML5 validation natively on primitives, and perform manual validation before submission. (Future implementation may introduce robust schema validation).
- **Loading:** Submit buttons must have a loading state (`isLoading` prop) that disables the button and shows a spinner.
- **Error Handling:** Display validation errors clearly below the corresponding inputs using the `InlineValidation` or `FieldHint` patterns.
- **Submission:** Form submissions should trigger a React Query mutation (`useMutation`).
- **Confirmation:** Destructive actions (deletes, major updates) must be routed through a confirmation dialog.

---

## 12. Tables

Dashboard tables must adhere strictly to the shared data architecture:

- **Structure:** Always compose `DashboardDataTable`.
- **Pagination:** Use `TablePagination` linked to state.
- **Searching/Filtering:** Use `TableSearch` and `TableFilters` in the `TableToolbar`.
- **Row Actions:** Use `RowActionMenu` for consistent Edit/Delete dropdowns.
- **Bulk Actions:** For lists with checkboxes, use `BulkActionBar`.

---

## 13. Dashboard Feature Development Workflow

When adding a new module (e.g., `Tags`), follow this strict sequence:

1. **Create Feature Folder:** `src/dashboard/features/tags/`
2. **Create Types:** Define interfaces in `tags/types.ts` (or `src/types/` if shared publicly).
3. **Create Service:** Add API calls in `src/services/tag.service.ts`.
4. **Create Hooks:** Wrap services in React Query hooks inside `tags/api/hooks.ts`.
5. **Create Reusable Components:** Build feature-specific components inside the feature folder.
6. **Create Page:** Create `src/dashboard/pages/TagsPage.tsx` that imports the main feature component.
7. **Connect Routes:** Add lazy import to `routeModules.tsx` and the route definition to `router.tsx`.

---

## 14. Git Workflow

- **Branching:** Use descriptive feature branches (`feat/category-management`, `fix/table-pagination`).
- **Commits:** Write small, atomic commits. Prefix messages clearly (`feat:`, `fix:`, `refactor:`, `docs:`).
- **Pull Requests:** Ensure the branch passes all local validations before opening a PR.
- **Merge Strategy:** Squash and merge into the main branch to keep a clean, linear history.

---

## 15. Testing Checklist

Before every single commit, you **must** run and pass the following:

```bash
npm run lint
npm run build
```

- `lint` ensures code style consistency and catches unused variables. Expected: 0 errors, 0 warnings.
- `build` ensures Vite can successfully bundle the application for production. Expected: Clean compilation logs.

---

## 16. Performance Guidelines

- **Lazy Loading:** All page-level components are strictly lazy-loaded in `routeModules.tsx`.
- **Avoid Unnecessary Renders:** Use `useMemo` and `useCallback` for complex calculations or when passing objects/functions as props to memoized children.
- **Bundle Awareness:** Do not install heavy dependencies (like Lodash or Moment.js) when native JavaScript (ES6+ or Intl) suffices.
- **Dead Code Elimination:** Run audits regularly to ensure unused exports and placeholder files are aggressively deleted.

---

## 17. Accessibility Guidelines

- **Semantic HTML:** Use proper tags (`<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`).
- **Focus States:** The dashboard design system standardizes focus rings (`dashboardFocusRingClassName`). Never use `outline: none` without providing a `focus-visible` alternative.
- **ARIA Labels:** Provide `aria-label` for icon-only buttons.
- **Keyboard Navigation:** Ensure modals can be closed with the `Escape` key and focus is trapped where appropriate.

---

## 18. Common Mistakes

- **Duplicating UI:** Building a custom button on a dashboard page instead of using `DashboardButton`.
- **Inline Fetching:** Calling `axios.get` directly in a `useEffect` inside a component. (Always use React Query + Services).
- **Skipping Lint Checks:** Pushing code with lint warnings or errors.
- **Public/Dashboard Contamination:** Importing a CMS dashboard layout component into the public homepage.
- **Page-Specific Styles:** Writing custom CSS in `index.css` for a single page instead of using Tailwind utility classes.

---

## 19. Current Project Status

- **Completed:** 
  - Project architecture and rigorous separation of concerns.
  - Shared public components and core design system.
  - Shared dashboard UI primitives (Tables, Forms, Navigation, Layouts).
  - Category Management feature (Fully integrated with React Query & Backend).
- **In Progress (Partial):** 
  - Potentials Directory (UI complete, currently bound to static mocks).
- **Remaining Work (Placeholders):** 
  - Overview Dashboard, Media Management, Statistics, Settings.
  - Backend integration for Potentials CRUD and Media Uploads.

*(Refer to `IMPLEMENTATION_STATUS.md` if available for granular tracking).*

---

## 20. Best Practices Summary

1. **Extend, don't invent.** Check `src/dashboard/components` before creating new UI primitives.
2. **Keep UI dumb.** Move business logic, data transformation, and fetching into services and custom hooks.
3. **Respect the boundaries.** Public site components and Dashboard components live in separate worlds.
4. **Validate aggressively.** A lint warning is a failing build. Fix it immediately.
5. **Embrace React Query.** Let it handle your loading, caching, and background updating.
