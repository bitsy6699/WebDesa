# Design Audit — Visual Consistency Report

**Date**: 2026-07-21
**Scope**: All public pages (Home, About, Contact, CategoriesExplorer, PotentialsDirectory, PotentialDetail) + 8 layout primitives
**Purpose**: Identify remaining visual inconsistencies after layout system migration

---

## Methodology

Audited every page against the unified design tokens in `index.css` and the layout primitives in `src/components/molecules/`. Inconsistencies ranked by:

1. **User-visible impact** — does it create visual dissonance for visitors?
2. **Maintenance cost** — does it create confusion for future contributors?
3. **Frequency** — how many pages/components are affected?

---

## Top 20 Inconsistencies

### TIER 1 — Critical (user-visible, immediate fix)

#### 1. ContactPage not using layout system
**Impact**: HIGH — ContactPage is the only sub-page that bypasses all 8 layout primitives
**File**: `src/pages/ContactPage.jsx`

ContactPage still uses:
- Custom inline hero (`<section className="bg-gradient-to-br ...">`) instead of `PageHero`
- Raw `<section className="py-16 px-6">` instead of `PageSection`
- No `PageHeader` for section headings
- No `PageCTA` closing banner (every other sub-page has one)
- No `Breadcrumb` navigation
- Manual `max-w-5xl mx-auto` instead of container tokens
- No scroll-to-top on mount

**Every other page** uses PageHero → PageSection → PageHeader → PageCTA. ContactPage breaks the pattern completely.

**Fix**: Rewrite to use PageHero (gradient variant), PageSection, PageHeader, PageCTA (light variant).

---

#### 2. ContactPage card radius mismatch
**Impact**: HIGH — cards visually mismatch every other page's cards
**File**: `src/pages/ContactPage.jsx:59,87`

ContactPage uses `rounded-2xl` (= 16px) on:
- Contact info cards (line 59)
- Google Maps iframe wrapper (line 87)

Every other page uses `rounded-[20px]` (the design system's `--radius-md` token):
- AboutPage info card: `rounded-[20px]` (line 82, 107, 112)
- CategoriesExplorer card: `rounded-[30px]` (intentionally larger)
- PotentialDetail sidebar: `rounded-[32px]` (intentionally larger)
- EmptyState: `rounded-3xl` (24px, intentional for large empty area)

**Fix**: Change `rounded-2xl` → `rounded-[20px]` on ContactPage cards and iframe.

---

#### 3. ContactPage icon container radius mismatch
**Impact**: MEDIUM — small visual detail but breaks consistency
**File**: `src/pages/ContactPage.jsx:62`

ContactPage icon containers use `rounded-xl` (= 12px), which happens to match `--radius-sm`. However, AboutPage's icon containers use `rounded-[12px]` explicitly. They're equivalent but the notation inconsistency suggests they were written at different times.

**Fix**: Use `rounded-[12px]` or `rounded-sm` (which maps to `--radius-sm: 12px`) consistently.

---

#### 4. CategoriesExplorer PageHeader centering conflict
**Impact**: MEDIUM — the heading appears centered despite `layout="left"`
**File**: `src/pages/CategoriesExplorer.jsx:238-244`

The code sets `layout="left"` but then applies className overrides that force centering:
```jsx
className="text-center max-w-[640px] mx-auto mb-10 lg:mb-12
  [&_p:first-child]:text-center [&_h2]:text-center [&_p:last-child]:text-center"
```

This works via CSS selector overrides but creates a semantic contradiction — the `layout="left"` prop is meaningless here. It's confusing for future contributors and fragile if PageHeader's internal structure changes.

**Fix**: Either add a `layout="center"` option to PageHeader (if centering is a legitimate pattern), or remove the overrides and accept left-aligned headings.

---

#### 5. PotentialDetail sidebar invalid opacity syntax
**Impact**: LOW (visual) but HIGH (code quality) — the border may render as fully opaque
**File**: `src/pages/PotentialDetail.jsx:355`

```jsx
className="pt-4 border-t border-primary/08"
```

Tailwind's opacity modifier syntax accepts integer percentages: `/5`, `/10`, `/15`, `/20`, etc. The value `/08` is not a valid Tailwind opacity value — Tailwind will likely ignore it and render the border at full opacity, or treat it as a raw value.

**Fix**: Change to `border-t border-primary/5` or `border-t border-primary/[0.08]`.

---

### TIER 2 — Significant (affects page feel, should fix soon)

#### 6. Hero gradient direction inconsistency
**Impact**: MEDIUM — subtle directional mismatch across pages
**Files**: `PageHero.jsx:57`, original design

PageHero gradient mode uses `135deg` (top-left to bottom-right):
```css
background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)
```

The original design (and `CTASection` on Home) used `to-br` which maps to `135deg` — so this is actually consistent. However, the PageHero image overlay uses a completely different gradient:
```css
linear-gradient(90deg, rgba(15,61,52,0.88) 0%, rgba(15,61,52,0.65) 50%, rgba(24,77,71,0.35) 100%)
```

This left-to-right gradient creates a darkening that fades from left (dark) to right (light), while the original PotentialDetail used bottom-to-top with heavier darkening. The current implementation is the accepted design system standard.

**Status**: Accepted. No fix needed — the left-to-right gradient is the standard.

---

#### 7. ContactPage section spacing inconsistency
**Impact**: MEDIUM — ContactPage uses manual spacing instead of token-based spacing
**File**: `src/pages/ContactPage.jsx:53`

```jsx
<section className="py-16 px-6">
```

All other pages use `PageSection` which standardizes to `py-16 sm:py-20 lg:py-24`. ContactPage's `py-16` is static — no responsive scaling. Also, the `px-6` is manual padding that should come from the container system.

**Fix**: Migrate to PageSection (covered by issue #1).

---

#### 8. ContactPage button style inconsistency
**Impact**: MEDIUM — CTA buttons use different shadow treatment than primary buttons
**File**: `src/pages/ContactPage.jsx:72`

ContactPage links use:
```jsx
className="... text-neutral-500 hover:text-primary transition-colors"
```

While the primary button token (used in PageCTA, CategoriesExplorer) uses:
```jsx
className="... bg-primary text-white shadow-[0_4px_16px_rgba(24,77,71,0.2)]
  hover:shadow-[0_8px_24px_rgba(24,77,71,0.28)]"
```

The ContactPage inline buttons are simpler/cheaper-looking, which is fine for a contact page but creates inconsistency with how CTAs look everywhere else.

**Fix**: Migrate to PageCTA (covered by issue #1).

---

#### 9. PotentialDetail and CategoriesExplorer hero: no Ken Burns
**Impact**: LOW — intentional design difference
**Files**: `HeroBanner.jsx` (Home), `PageHero.jsx` (sub-pages)

Home's HeroBanner has a Ken Burns zoom effect (5% scale over 20s). Sub-page PageHero does not. This is intentional — the mini-hero is not the emotional centerpiece. But it means the hero experience varies significantly between Home and sub-pages.

**Status**: Accepted. No fix needed.

---

#### 10. MetadataRow label: not using `text-label` token
**Impact**: LOW — functionally equivalent but misses the semantic token
**File**: `src/components/molecules/MetadataRow.jsx:36`

```jsx
className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400"
```

The `text-label` utility class (defined in `index.css:207-212`) provides:
```css
font-size: 0.75rem;  /* 12px */
font-weight: 600;
line-height: 1.4;
letter-spacing: 0.04em;
```

MetadataRow uses 11px (not 12px), `font-medium` (not `font-bold`), and `tracking-[0.12em]` (not `0.04em`). The differences are intentional for the compact metadata context, but it means MetadataRow has its own micro-typography that doesn't reference the token system.

**Status**: Accepted — the differences are deliberate for the compact metadata context.

---

#### 11. CategoryCard uses inline hex instead of `color_code` prop color for fallback
**Impact**: LOW — minor token leak
**File**: `src/pages/CategoriesExplorer.jsx:296`

```jsx
const color = category.color_code ?? '#1F5F3F';
```

The fallback `#1F5F3F` is a hardcoded hex that doesn't match any design token. It's close to `--color-primary-dark: #0F3D34` but not the same. This only matters if a category has no `color_code` — which shouldn't happen in production.

**Status**: Low priority. Could use `var(--color-primary-dark)` or the Tailwind `text-primary-dark` class instead.

---

#### 12. AboutPage heading fonts: no `font-heading` class
**Impact**: LOW — the global CSS already applies Plus Jakarta Sans to headings
**Files**: `AboutPage.jsx:83,108,113`

AboutPage headings use:
```jsx
<h3 className="text-lg font-bold text-primary mb-6">
```

They don't explicitly apply `font-heading`, but the global CSS rule (`h1-h6 { font-family: 'Plus Jakarta Sans' }`) handles this. It's technically correct but inconsistent with PageHero and PageHeader which explicitly apply `font-heading` as a Tailwind class.

**Status**: No functional issue. Cosmetic inconsistency only.

---

#### 13. PageHero subtitle font size: not using `text-body-lg` token
**Impact**: LOW — subtle typography inconsistency
**File**: `src/components/molecules/PageHero.jsx:126`

```jsx
className="... text-[15px] leading-[1.75] sm:text-[16px]"
```

The `text-body-lg` token provides `font-size: 1.125rem` (18px). PageHero subtitle uses 15px/16px, which is closer to `text-body` (16px) but with custom leading. This is a deliberate choice for the hero context — the subtitle is intentionally smaller than body-lg.

**Status**: Accepted. The hero subtitle is deliberately compact.

---

#### 14. EmptyState heading: not using `text-h4` token
**Impact**: LOW — functionally equivalent
**File**: `src/components/molecules/EmptyState.jsx:61`

```jsx
<h3 className="text-lg font-bold text-primary-dark">
```

The `text-h4` token provides `font-size: 1.125rem; font-weight: 600; line-height: 1.35`. EmptyState uses `text-lg` (18px = 1.125rem) + `font-bold` (700 vs 600). The weight difference is minor (700 vs 600).

**Status**: Cosmetic. Could use `text-h4 font-heading` for full alignment.

---

#### 15. ContactPage background: no explicit surface-alt
**Impact**: LOW — ContactPage renders on white, other sub-pages on surface-alt
**File**: `src/pages/ContactPage.jsx`

ContactPage has no wrapper div with `bg-surface-alt`, so it renders on the default `--bg-page` (#FCFCFA). CategoriesExplorer, PotentialsDirectory, and PotentialDetail all explicitly set `bg-surface-alt` on their wrapper.

**Status**: The white background is actually appropriate for a contact page (clean, professional). But it means ContactPage feels visually lighter than other sub-pages.

---

### TIER 3 — Minor (polish items, fix when convenient)

#### 16. ContactPage cards: no hover shadow transition token
**Impact**: LOW
**File**: `src/pages/ContactPage.jsx:59`

Cards use `hover:shadow-md transition-shadow` which is fine, but other cards (CategoriesExplorer) use the `hover-lift` utility class which combines `transform: translateY(-4px)` with a deeper shadow. ContactPage's lighter treatment is appropriate for the context.

**Status**: Accepted — lighter treatment is appropriate for contact info cards.

---

#### 17. PotentialDetail hero quick-info: inline style overrides
**Impact**: LOW — works but fragile
**File**: `src/pages/PotentialDetail.jsx:197-201`

```jsx
style={{
  ...glassSurfaceSoft,
  background: 'rgba(255,255,255,0.13)',
  border: '1px solid rgba(255,255,255,0.22)',
}}
```

The inline `background` and `border` override `glassSurfaceSoft`'s values. This is a deliberate design choice (the hero needs semi-transparent white, not the default glass surface). But it means the glass effect on this card differs from other glass cards.

**Status**: Accepted — hero glass card has different transparency requirements.

---

#### 18. CategoriesExplorer skeleton: custom shimmer animation
**Impact**: LOW — duplicates `animate-shimmer` utility
**File**: `src/pages/CategoriesExplorer.jsx:185-224`

CategoriesExplorer defines its own `@keyframes shimmer` and `.categories-skeleton::after` animation, while `index.css` already provides `.animate-shimmer` as a utility. The custom version is more specific (applies to `::after` pseudo-element with `inset: 0`) and is scoped to the categories skeleton.

**Status**: Low priority. The custom version is more controlled for this specific use case.

---

#### 19. PageCTA dark variant: no `aria-label` on section
**Impact**: LOW — accessibility
**File**: `src/components/molecules/PageCTA.jsx:51`

The section element has `aria-label={title}` which is good. But the section itself doesn't have a semantic `<section>` tag with `role="region"` — though `<section>` with `aria-label` is sufficient.

**Status**: Compliant. No fix needed.

---

#### 20. Typography scale: mixed use of token classes vs inline sizes
**Impact**: LOW — code consistency
**Files**: Multiple

Most components use a mix of:
- Tailwind token classes: `text-primary`, `bg-surface-alt`, `shadow-sm`
- Inline values: `text-[17px]`, `text-[15px]`, `text-[24px]`, `leading-[1.9]`
- Token utility classes: `text-h1`, `text-h2`, `text-body-lg`

The inline values are used where the token system doesn't have an exact match (e.g., 17px body text, 24px category card titles). This is acceptable — the token system provides the common sizes, and inline values fill the gaps.

**Status**: The current approach is pragmatic. Full token coverage would require adding more sizes to the typography scale.

---

## Summary

| Tier | Count | Action |
|------|-------|--------|
| Critical | 5 | Fix immediately |
| Significant | 5 | Fix this sprint |
| Minor | 10 | Fix when convenient |

### Immediate Action Items

1. **Rewrite ContactPage** to use layout primitives (PageHero gradient, PageSection, PageHeader, PageCTA light)
2. **Fix ContactPage radius tokens** — `rounded-2xl` → `rounded-[20px]`
3. **Fix PotentialDetail border** — `border-primary/08` → `border-primary/5`
4. **Resolve CategoriesExplorer centering** — either add `layout="center"` to PageHeader or remove overrides

### Design System Gaps Identified

1. **No `layout="center"` option on PageHeader** — centering is done via className overrides, which is fragile
2. **No standard card component** — each page builds cards differently (AboutPage, ContactPage, CategoriesExplorer all use different markup)
3. **No standard icon container component** — AboutPage and ContactPage both build icon containers from scratch with slightly different classes

### What's Working Well

- **Token system**: CSS vars → Tailwind config → utility classes pipeline is solid
- **Layout primitives**: PageHero, PageSection, PageHeader, PageCTA, EmptyState, MetadataRow all work correctly and are consistently used
- **Spacing rhythm**: All pages use the 8pt grid consistently (py-16/sm:20/lg:24)
- **Color consistency**: Primary (#184D47), accent (#A7C957), neutral scale all consistent
- **Typography**: Heading font (Plus Jakarta Sans) and body font (Inter) consistently applied
- **Motion**: Scroll-reveal animations consistent across all primitives (fadeUp variants with stagger)
- **Reduced motion**: All primitives respect `prefers-reduced-motion`
