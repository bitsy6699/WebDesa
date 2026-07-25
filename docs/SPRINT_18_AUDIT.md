# Sprint 18 Engineering Audit

**Date:** 2026-07-22
**Scope:** Full codebase — architecture, components, hooks, services, styles, performance, accessibility, maintainability
**Method:** File-level audit across all source files with automated pattern searches

---

## Executive Summary

The codebase is well-structured for a project of this size (2494 modules, ~174KB main bundle gzipped). The editorial design system is cohesive, route splitting works correctly, and structured data is comprehensive.

However, **3 critical**, **8 high**, and **12 medium** engineering issues exist that affect correctness, performance, and maintainability. The most impactful issues are:

1. **Inconsistent API response extraction** — services return different envelope layers, creating fragile consuming code
2. **Duplicate `useCategories` hook** — two versions with contradictory caching behavior
3. **Missing `datePublished` in Article schema** — blocks Google Rich Results eligibility
4. **Auth 401 handling race condition** — interceptor and context fight each other
5. **Category polling every 30s** — wastes bandwidth for near-static data

---

## Severity Table

| Severity | Count | Impact |
|---|---|---|
| Critical | 3 | Correctness bugs, data integrity, SEO eligibility |
| High | 8 | Performance waste, architectural fragility, security gaps |
| Medium | 12 | Maintainability debt, inconsistent patterns, minor perf |
| Low | 5 | Dead code, cosmetic inconsistencies |
| **Total** | **28** | |

---

## Findings

### CRITICAL

#### 1. Inconsistent API Response Extraction
**Files:** `potential.service.js`, `statistics.service.js`, `category.service.js`, `activity.service.js`, `media.service.js`
**Impact:** Runtime bugs if backend envelope changes; impossible to write consistent consuming code

Services return different layers of the API response:

| Function | Returns |
|---|---|
| `fetchPotentials` | `response.data` (envelope) |
| `fetchPotentialDetail` | `response.data.data` (payload) |
| `createPotential` | `response.data.data` (payload) |
| `fetchStatistics` | `response.data.data` (payload) |
| `fetchActivityLogs` | `response.data` (envelope) |
| `fetchMediaList` | `response.data` (envelope) |
| `listCategories` | `response.data.data` (payload) |

**Recommendation:** Standardize on `response.data.data` (unwrapped payload) in every service. The Axios interceptor can optionally strip the envelope.

---

#### 2. Duplicate `useCategories` with Contradictory Cache Config
**Files:** `src/hooks/useCategories.js`, `src/dashboard/features/categories/api/hooks.js`
**Impact:** Public pages refetch categories every 30s; dashboard pages don't. Both use query key `['categories']` — shared cache but different staleness expectations.

```js
// Public hook — aggressive polling
staleTime: 0,
refetchInterval: 30_000,

// Dashboard hook — no polling
staleTime: 0,
refetchInterval: undefined,
```

**Recommendation:** Merge into a single hook. Use `staleTime: 5 * 60_000` and remove `refetchInterval`. Invalidate manually after admin edits.

---

#### 3. Article Schema Missing `datePublished` / `dateCreated`
**Files:** `src/lib/structuredData.js:103-129`
**Impact:** Google Rich Results require `datePublished` for Articles. Current schema only has `dateModified`. Also, `articleSection: category` serializes the entire category object as `[object Object]`.

```js
// Current — broken
dateModified: updated_at || created_at || new Date().toISOString(),
articleSection: category,  // ← object, not string

// Required
datePublished: created_at,
dateCreated: created_at,
dateModified: updated_at || created_at,
articleSection: category?.label || category,  // ← string
```

**Recommendation:** Add `datePublished` and `dateCreated`. Fix `articleSection` to extract the label string.

---

### HIGH

#### 4. Auth 401 Handling Race Condition
**Files:** `src/services/api.js:40-52`, `src/contexts/AuthContext.jsx:16-34`
**Impact:** Interceptor does `window.location.replace('/login')` (hard reload) before AuthContext can clean up state. Two competing localStorage removes.

The interceptor fires first on 401 → removes token → hard reloads to `/login`. AuthContext never reaches its catch block to set `isAuthenticated: false`. This means React state is never properly cleaned up.

**Recommendation:** Consolidate 401 handling in one place. Remove the redirect from the interceptor; let AuthContext handle it via state change + React Router navigation.

---

#### 5. AuthContext Missing AbortController
**Files:** `src/contexts/AuthContext.jsx:37-39`
**Impact:** If user navigates fast, `checkAuth` fires an async `api.get` but the effect has no cleanup. `setState` called on unmounted component (React 19 doesn't warn, but it's still a race).

**Recommendation:** Add `AbortController` to the effect cleanup.

---

#### 6. Admin-Only Queries Missing `enabled` Guard
**Files:** `src/hooks/useMedia.js`, `src/hooks/useActivityLogs.js`
**Impact:** Non-admin users hitting dashboard routes trigger 3 failed API requests each (global `retry: 2`). No auth check before firing.

**Recommendation:** Add `enabled: isAuthenticated` from `useAuth()`.

---

#### 7. Category Polling Wastes Bandwidth
**Files:** `src/hooks/useCategories.js:15-18`
**Impact:** `staleTime: 0` + `refetchInterval: 30s` + `refetchOnWindowFocus: true` = continuous unnecessary requests. Categories change maybe once a week. Combined with global `retry: 2`, a failing endpoint generates 6 requests/minute.

**Recommendation:** `staleTime: 5 * 60_000`, remove `refetchInterval`, remove `refetchOnWindowFocus`. Invalidate on admin edits.

---

#### 8. `/admin` Route Unprotected
**Files:** `src/routes/router.jsx:47-49`
**Impact:** `/admin` sits outside `ProtectedRoute`. Any unauthenticated user can access the admin panel.

```jsx
// Current — no auth wrapper
{ element: <AdminLayout />, children: [{ path: '/admin', element: <AdminPanel /> }] },
```

**Recommendation:** Wrap in `ProtectedRoute` or add auth check inside `AdminPanel`.

---

#### 9. `structuredData.js` + `SEO.jsx` Duplicated Constants
**Files:** `src/lib/structuredData.js:1-12`, `src/components/SEO.jsx:3-12`
**Impact:** `SITE_URL`, `SITE_NAME`, and `resolveImageUrl` are identically defined in both files. If one changes, the other becomes stale.

**Recommendation:** Export from `structuredData.js`, import in `SEO.jsx`.

---

#### 10. Dashboard Hardcodes Tokens Already in CSS Variables
**Files:** `src/dashboard/theme/dashboardTheme.js:1-71`
**Impact:** 30+ hardcoded color values duplicate CSS custom properties. Dual maintenance burden. `DashboardCard` and `PageHeader` apply both Tailwind classes AND inline styles for the same properties — Tailwind classes become dead code.

**Recommendation:** Delete `dashboardTheme.js`. Use Tailwind classes referencing CSS vars. Remove redundant inline `style` from `DashboardCard` and `PageHeader`.

---

#### 11. `category.service.js` Creates Reverse Dependency
**Files:** `src/services/category.service.js:1`
**Impact:** Public service re-exports from `dashboard/features/categories/api/`. If dashboard feature is refactored, the public site breaks.

```js
export { listCategories as fetchCategories } from '@/dashboard/features/categories/api/categoryApi';
```

**Recommendation:** Move `listCategories` to the service layer. Dashboard should import from services, not the other way around.

---

### MEDIUM

#### 12. PotentialDetail `ImageGallery` References Undefined `title`
**Files:** `src/pages/PotentialDetail.jsx:98,114,163`
**Impact:** `title` is destructured in the parent `PotentialDetail` but not passed as a prop to `ImageGallery`. Gallery images render `alt="undefined"`.

**Recommendation:** Add `title` to `ImageGallery` props and pass it from the call site.

---

#### 13. Inconsistent Query Key Patterns
**Files:** All hooks
**Impact:** `POTENTIALS_QUERY_KEY` is defined twice with different shapes. No shared key factory. Invalidation works by prefix match, which is fragile.

**Recommendation:** Create `src/lib/queryKeys.js` with a structured key factory.

---

#### 14. ContactPage Redundant Scroll-to-Top
**Files:** `src/pages/ContactPage.jsx:63-65`
**Impact:** `PublicLayout` already handles scroll restoration. Two competing scroll commands cause visual jank.

**Recommendation:** Remove the `useEffect` scroll-to-top from ContactPage.

---

#### 15. CategoriesExplorer Inline `<style>` Re-Injected Per Render
**Files:** `src/pages/CategoriesExplorer.jsx:185-213`
**Impact:** A `<style>` tag with keyframes is created in JSX, injected into `<head>` on every render. Browser parses and applies CSS rules repeatedly.

**Recommendation:** Extract to a CSS module or add to `index.css`.

---

#### 16. CategoriesExplorer N+1 Query Pattern
**Files:** `src/pages/CategoriesExplorer.jsx:164-172`
**Impact:** Each category fires a separate API request for counts. 10 categories = 10 parallel requests on page load.

**Recommendation:** Add a `/categories/counts` endpoint, or compute counts from the list endpoint.

---

#### 17. PotentialsDirectory Fetches 200 Records for Category Counts
**Files:** `src/pages/PotentialsDirectory.jsx:131-133`
**Impact:** `usePotentials({ per_page: 200 })` fetches all potentials client-side just to count items per category. Large payload, slow on mobile.

**Recommendation:** Use the categories API with counts, or a dedicated stats endpoint.

---

#### 18. MapExplorer Bypasses Shared Hooks
**Files:** `src/pages/MapExplorer.jsx:80-88`
**Impact:** Uses `useQuery` directly instead of `usePotentials`/`useCategories`. Different query key format → cache misses. No `staleTime` → refetches on every window focus. No error handling.

**Recommendation:** Use shared hooks. Add `isError` handling.

---

#### 19. Login Page Missing SEO Noindex + aria-live
**Files:** `src/pages/Login.jsx`
**Impact:** Login page can be indexed by search engines. Error messages lack `aria-live="polite"` — screen readers won't announce login failures.

**Recommendation:** Add `<SEO>` with `robots: noindex, nofollow`. Add `aria-live="polite"` to error container.

---

#### 20. NotFound Page Missing SEO Noindex
**Files:** `src/pages/NotFound.jsx`
**Impact:** 404 pages should not be indexed. No `<SEO>` component present.

**Recommendation:** Add `<SEO>` with `robots: noindex, nofollow`.

---

#### 21. `usePotentials` Missing `keepPreviousData` for Pagination
**Files:** `src/hooks/usePotentials.js`
**Impact:** Changing pages causes a flash to loading state. React Query v5 provides `placeholderData: keepPreviousData` to show stale data during transitions.

**Recommendation:** Add `placeholderData: keepPreviousData`.

---

#### 22. `Home.jsx` `hasStatistics` Not Memoized
**Files:** `src/pages/Home.jsx:47`
**Impact:** `Object.values(statistics).some(...)` runs on every render. Minor but unnecessary.

**Recommendation:** Wrap in `useMemo`.

---

#### 23. MapExplorer `calc(100vh - 52px)` Breaks on Mobile
**Files:** `src/pages/MapExplorer.jsx:157`
**Impact:** Mobile browsers have dynamic viewport heights. `100vh` can be larger than visible area, pushing map below the fold.

**Recommendation:** Use `100dvh` or `100svh` with fallback.

---

#### 24. `dashboardTheme.js` Dead `focusRing` Property
**Files:** `src/dashboard/theme/dashboardTheme.js:64`
**Impact:** Property defined but never referenced. Dead code.

**Recommendation:** Remove.

---

#### 25. Inconsistent Focus Ring Patterns (5+ Variants)
**Files:** 77+ inline occurrences across components
**Impact:** `ring-primary/60`, `ring-primary/50`, `ring-white/50`, `ring-[#184D47]`, `ring-primary/20` — five different opacity/color patterns for the same concept.

**Recommendation:** Define a single focus ring token in CSS vars (`--border-focus`). Use `focus-visible:ring-[--border-focus]` everywhere.

---

### LOW

#### 26. `--ease-in` Referenced in Tailwind Config but Undefined
**Files:** `tailwind.config.js:64`
**Impact:** Any component using `ease-in` gets `undefined`. Currently no component uses it, but it's a latent bug.

**Recommendation:** Define `--ease-in` in `index.css` or remove from config.

---

#### 27. Dead `types.js` File
**Files:** `src/dashboard/features/categories/types.js`
**Impact:** Contains only `// Types removed`. Dead file.

**Recommendation:** Delete.

---

#### 28. `queryClient.js` Defaults Meaningless
**Files:** `src/lib/queryClient.js:11-20`
**Impact:** Global defaults (`staleTime: 60s`, `refetchOnWindowFocus: false`) are overridden by every hook. The config file is misleading.

**Recommendation:** Either enforce the defaults (remove per-hook overrides) or document that per-hook overrides are intentional.

---

## Performance Opportunities

| Opportunity | Impact | Effort |
|---|---|---|
| Remove category polling (`refetchInterval: 30s`) | -720 requests/hour | Low |
| Add `keepPreviousData` to paginated queries | Smoother UX | Low |
| Extract CategoriesExplorer inline `<style>` to CSS | Cleaner DOM, faster parse | Low |
| Use shared hooks in MapExplorer (cache hits) | Fewer network requests | Medium |
| Add `/categories/counts` backend endpoint | Eliminates N+1 and 200-record fetch | Medium |
| Memoize `hasStatistics` in Home.jsx | Minor render optimization | Low |
| Remove redundant scroll-to-top in ContactPage | Eliminates scroll jank | Low |

---

## Accessibility Opportunities

| Opportunity | Impact | Effort |
|---|---|---|
| Fix `ImageGallery` undefined `title` → `alt="undefined"` | Screen readers get usable alt text | Low |
| Add `aria-live="polite"` to Login error | Error announced to screen readers | Low |
| Add SEO noindex to Login and NotFound | Prevents indexing of non-content pages | Low |
| Standardize focus ring to single CSS token | Consistent keyboard navigation | Low |

---

## Maintainability Opportunities

| Opportunity | Impact | Effort |
|---|---|---|
| Standardize API response extraction | Eliminates fragile envelope assumptions | Low |
| Merge duplicate `useCategories` hooks | Single source of truth for category caching | Low |
| Create shared `queryKeys.js` factory | Prevents key drift and invalidation bugs | Low |
| Fix `category.service.js` reverse dependency | Cleaner architecture, safer refactors | Low |
| Remove `dashboardTheme.js` dead token system | Eliminates dual maintenance burden | Medium |
| Extract `timeAgo` utility from ActivityPage | Reusable, testable | Low |

---

## Production Opportunities

| Item from Sprint 17 Checklist | Should Be Sprint 18? | Reason |
|---|---|---|
| Generate PNG favicon icons | No — future | Requires design assets, not engineering |
| Add real social links to Organization schema | No — future | Requires social media accounts |
| Implement actual search route | No — future | Backend endpoint needed first |
| Add analytics tracking | Maybe — Sprint 18.1 | Low effort, high value |
| Set up error monitoring (Sentry) | Maybe — Sprint 18.1 | Low effort, high value |
| Configure CSP headers | No — deployment config | Server-side, not frontend code |
| Generate proper OG image | No — future | Requires design asset |
| Lighthouse CI integration | Maybe — Sprint 18.1 | Automated quality gate |

---

## Estimated Lighthouse Impact

| Category | Current Est. | After Sprint 18 | Delta |
|---|---|---|---|
| Performance | ~90 | ~92-94 | +2-4 (fewer requests, better caching) |
| Accessibility | ~96 | ~98-100 | +2-4 (alt text, aria-live, focus ring) |
| SEO | ~100 | ~100 | 0 (already maxed) |
| Best Practices | ~95 | ~97-100 | +2-5 (noindex, auth fixes, schema) |

---

## Recommended Sprint 18 Scope

### Must Fix (Critical + High, 11 items)
1. Standardize API response extraction across all services
2. Merge duplicate `useCategories` hooks (remove polling, add `staleTime: 5min`)
3. Fix `articleSchema` — add `datePublished`, `dateCreated`, fix `articleSection`
4. Fix `ImageGallery` undefined `title` prop
5. Consolidate 401 handling (remove interceptor redirect, let AuthContext handle)
6. Add `AbortController` to AuthContext `checkAuth`
7. Add `enabled` guard to admin-only queries
8. Wrap `/admin` route in `ProtectedRoute`
9. Move `category.service.js` import to service layer (not dashboard feature)
10. Deduplicate `SITE_URL`/`SITE_NAME`/`resolveImageUrl` between `SEO.jsx` and `structuredData.js`
11. Fix `structuredData.js` `articleSection: category` to extract label

### Should Fix (Medium, 8 items)
12. Remove ContactPage redundant scroll-to-top
13. Extract CategoriesExplorer inline `<style>` to CSS
14. Add `keepPreviousData` to `usePotentials`
15. Add SEO noindex to Login and NotFound
16. Add `aria-live="polite"` to Login error
17. Use shared hooks in MapExplorer
18. Remove `dashboardTheme.js` dead `focusRing` property
19. Fix `--ease-in` undefined in Tailwind config

### Nice to Have (Low, 3 items)
20. Create shared `queryKeys.js` factory
21. Memoize `hasStatistics` in Home.jsx
22. Delete dead `types.js` file

---

## Estimated Implementation Effort

| Category | Items | Estimated Time |
|---|---|---|
| Must Fix | 11 | 3-4 hours |
| Should Fix | 8 | 2-3 hours |
| Nice to Have | 3 | 30 min |
| **Total** | **22** | **~6-8 hours** |

---

## Files That Would Be Modified

| File | Changes |
|---|---|
| `src/services/potential.service.js` | Standardize response extraction |
| `src/services/statistics.service.js` | Standardize response extraction |
| `src/services/category.service.js` | Move import from dashboard to service layer |
| `src/services/activity.service.js` | Standardize response extraction |
| `src/services/media.service.js` | Standardize response extraction |
| `src/hooks/useCategories.js` | Remove polling, add staleTime |
| `src/hooks/usePotentialMutations.js` | Align query key with shared factory |
| `src/hooks/usePotentials.js` | Add keepPreviousData |
| `src/hooks/useMedia.js` | Add enabled guard |
| `src/hooks/useActivityLogs.js` | Add enabled guard |
| `src/lib/structuredData.js` | Fix articleSchema, export shared constants |
| `src/components/SEO.jsx` | Import shared constants from structuredData.js |
| `src/contexts/AuthContext.jsx` | Add AbortController, consolidate 401 handling |
| `src/services/api.js` | Remove 401 redirect (move to AuthContext) |
| `src/routes/router.jsx` | Wrap /admin in ProtectedRoute |
| `src/pages/PotentialDetail.jsx` | Pass title to ImageGallery |
| `src/pages/ContactPage.jsx` | Remove redundant scroll-to-top |
| `src/pages/CategoriesExplorer.jsx` | Extract inline style, optimize counts query |
| `src/pages/MapExplorer.jsx` | Use shared hooks, fix mobile viewport |
| `src/pages/Login.jsx` | Add SEO noindex, aria-live on error |
| `src/pages/NotFound.jsx` | Add SEO noindex |
| `src/pages/Home.jsx` | Memoize hasStatistics |
| `src/dashboard/theme/dashboardTheme.js` | Remove dead focusRing, clean dead tokens |
| `tailwind.config.js` | Fix undefined --ease-in |
| `src/dashboard/features/categories/types.js` | Delete |
