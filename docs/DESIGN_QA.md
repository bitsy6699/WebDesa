# DESIGN_QA.md — Sprint 15.5 Visual Audit

**Date:** 2026-07-21  
**Scope:** Entire public-facing website (desktop, tablet, mobile)  
**Method:** File-level code audit across all components, pages, layouts, and atoms  
**Target:** 30–50 findings  

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 4 |
| High | 12 |
| Medium | 16 |
| Low | 11 |
| **Total** | **43** |

---

## CRITICAL

### C1. Featured Card Skeleton Radius Mismatch
**File:** `FeaturedPotentialCard.jsx`  
**Issue:** Skeleton uses `rounded-[32px]` but the actual card uses `rounded-[28px]`. During loading → loaded transition, the card shape visibly snaps from 32px to 28px.  
**Impact:** Jarring visual jump on every page load with featured cards.  
**Lines:** Skeleton wrapper `line ~242` vs article `line ~86`.

### C2. Conflicting Office Hours — Homepage vs Contact Page
**Files:** `ContactSection.jsx` vs `ContactPage.jsx`  
**Issue:** Homepage says "Sabtu: 08:00 – 12:00 WIB". Contact page says "Sabtu: Tutup". These are contradictory.  
**Impact:** Users get wrong information depending on which page they visit. Trust-eroding.

### C3. Header Easing Token Not Using CSS Variable
**File:** `Header.jsx`  
**Issue:** Header uses `ease-[cubic-bezier(0.4,0,0.2,1)]` while the CSS token `--ease-default` was updated to `cubic-bezier(0.25, 0.1, 0.25, 1)` in Sprint 15. Header is now out of sync with the unified motion language.  
**Impact:** Header scroll transition feels different from all other transitions on the site.

### C4. CTASection Button Shadow Inconsistent with Card System
**File:** `CTASection.jsx`  
**Issue:** CTA primary button uses `shadow-[0_8px_24px_rgba(0,0,0,0.12)]` — a heavy black shadow. All other cards/buttons in Sprint 15 were updated to use the green-tinted two-layer shadow system (`rgba(15,61,52,...)`). The CTA button was missed.  
**Impact:** The most prominent CTA on the homepage has a visibly different shadow language.

---

## HIGH

### H1. AboutPage Editorial Quote ≠ StoryDivider
**File:** `AboutPage.jsx`  
**Issue:** The AboutPage editorial quote section uses `paddingTop/Bottom: clamp(48px,6vw,80px)` and decorative lines `w-16`/`w-10`. StoryDivider was updated in Sprint 15 to `clamp(56px,7vw,96px)` and `w-14`/`w-10`. The AboutPage version has less breathing room and narrower opening line.  
**Impact:** Inconsistent "editorial breathing moment" feel between homepage and About page.

### H2. Card Radius Inconsistency Across Pages
**Multiple files**  
**Issue:**  
- Homepage Featured: `rounded-[28px]`  
- Homepage Latest: `rounded-[24px]`  
- AboutPage Quick Facts: `rounded-[20px]`  
- AboutPage Government table: `rounded-[20px]`  
- AboutPage Vision card: `rounded-[20px]`  
- ContactPage ContactMethodCard: `rounded-[20px]`  
- ContactPage FAQ items: `rounded-[16px]`  
- StatisticsPage HighlightCard: `rounded-[20px]`  
- StatisticsPage ChartCard: `rounded-[20px]`  

The sub-pages use 20px/16px while the homepage uses 24px/28px. There's no defined system for "sub-page cards should be X."

### H3. ContactPage FAQ Accordion ≠ Homepage FAQSection
**Files:** `ContactPage.jsx` vs `FAQSection.jsx`  
**Issue:**  
- ContactPage FAQ items: `rounded-[16px]`, individual bordered cards with `space-y-3`  
- FAQSection: single container `rounded-[20px]` with `border-b` dividers  
- ContactPage chevron: `duration-0.25` no easing  
- FAQSection chevron: `duration-0.3` with `[0.25,0.1,0.25,1]` easing  
- ContactPage answer: `text-sm text-neutral-500 leading-relaxed`  
- FAQSection answer: `text-[14px] leading-[1.8] text-[#4A5C58]`  

Two completely different FAQ implementations with different visual languages.

### H4. AboutPage Quick Facts Missing Hover States
**File:** `AboutPage.jsx`  
**Issue:** AboutPage Quick Fact cards (`rounded-[20px] border border-primary/8 bg-white shadow-sm`) have NO hover effect. Homepage fact cards (in `AboutSection.jsx`) have `hover:-translate-y-[2px] hover:border-primary/12 hover:shadow-[...]`.  
**Impact:** Sub-page cards feel flat and non-interactive compared to homepage.

### H5. Featured Card vs Latest Card — Different CTA Patterns
**Files:** `FeaturedPotentialCard.jsx` vs `LatestPotentialCard.jsx`  
**Issue:**  
- Featured: Shows a glass arrow button on hover (`h-12 w-12 rounded-full`)  
- Latest: Shows a "Lihat Detail" pill link that changes bg on hover  

Two completely different "read more" patterns for the same action (viewing a potential).

### H6. CategoriesExplorer Icon Size ≠ CategorySection
**Files:** `CategoriesExplorer.jsx` vs `CategorySection.jsx`  
**Issue:**  
- CategoriesExplorer: `CategoryIcon` renders at `size=56` (56×56px icons)  
- CategorySection: `CategoryIcon` renders at `size={24}` (24×24px icons)  

The same category icon appears at two dramatically different sizes depending on which page you're on.

### H7. ContactPage Heading Tracking ≠ SectionHeader
**Files:** `ContactPage.jsx` vs `SectionHeader.jsx`  
**Issue:**  
- ContactPage headings: `text-2xl font-bold text-primary` (no tracking, no `font-heading`)  
- SectionHeader: `text-2xl font-bold leading-tight tracking-[-0.02em] text-primary-dark`  

ContactPage headings use `text-primary` while SectionHeader uses `text-primary-dark`. ContactPage headings also lack `font-heading` class and tracking adjustment.

### H8. PageHero Eyebrow Tracking ≠ SectionHeader Eyebrow
**Files:** `PageHero.jsx` vs `SectionHeader.jsx`  
**Issue:**  
- PageHero eyebrow: `tracking-[0.22em]`  
- SectionHeader eyebrow: `tracking-[0.2em]`  

Subtle but perceptible difference in letter-spacing for the same type of element.

### H9. ContactPage "Buka di Maps" Button ≠ CTA Button Language
**File:** `ContactPage.jsx`  
**Issue:** "Buka di Maps" uses `px-5 py-2.5 rounded-full bg-primary/8 text-primary` (ghost-like). CTASection/PageCTA use `rounded-full bg-primary text-white` (solid) or `bg-white text-primary` (inverted). Three different button styles for primary actions across the site.

### H10. StatisticsPage HighlightCard ≠ Homepage GlassCard
**Files:** `StatisticsPage.jsx` vs `statistics/StatisticsShared.jsx`  
**Issue:**  
- StatisticsPage HighlightCard: `rounded-[20px] border border-primary/10 bg-white p-6 shadow-sm` — standard white card  
- Homepage GlassCard: `rounded-[24px] background: rgba(255,255,255,0.12) backdrop-filter: blur(24px)` — glassmorphism card  

Same data, completely different card treatments.

### H11. AboutPage Featured Image Not Using LazyImage
**File:** `AboutPage.jsx`  
**Issue:** AboutPage "Featured Image" section (section 4) uses raw `<img>` tag. AboutSection (homepage) uses `<LazyImage>`. Inconsistent loading behavior and no fade-in effect on the sub-page.

### H12. ContactPage Final CTA ≠ CTASection
**Files:** `ContactPage.jsx` vs `CTASection.jsx`  
**Issue:**  
- ContactPage: `rounded-[20px] bg-gradient-to-b from-primary-soft to-white` light card  
- CTASection: `rounded-[40px]` dark gradient with animated background  

Different CTA treatments at the bottom of different pages. The homepage CTA is visually dominant; the Contact page CTA is quiet.

---

## MEDIUM

### M1. CTASection Secondary Button ≠ PageCTA Secondary Button
**Files:** `CTASection.jsx` vs `PageCTA.jsx`  
**Issue:**  
- CTASection secondary: glassmorphism (`rgba(255,255,255,0.18)`, `backdrop-filter: blur(12px)`)  
- PageCTA secondary (dark mode): `border border-white/25 text-white hover:bg-white/10`  

Two different secondary button treatments for the same CTA role.

### M2. AboutPage Vision Card — Unique Border Treatment
**File:** `AboutPage.jsx`  
**Issue:** Vision card uses `border-l-[3px] border-primary` — a left accent border. This treatment exists nowhere else in the design system. It's a one-off pattern.

### M3. ContactPage Office Hours Missing Saturday Entry
**File:** `ContactPage.jsx`  
**Issue:** ContactPage office hours only lists "Senin–Jumat", "Sabtu: Tutup", "Minggu: Tutup". Homepage ContactSection lists "Sabtu: 08:00–12:00 WIB" as a separate working entry. Even if one is corrected, the formats differ (ContactPage groups weekends; ContactSection separates them).

### M4. Footer Closing Sentence Size Differs
**File:** `Footer.jsx`  
**Issue:**  
- Landing page footer: `text-[13px]`  
- Sub-page footer: `text-[12px]`  

The farewell sentence is a different size depending on which footer variant renders.

### M5. Footer Logo Hover — Sub-page ≠ Landing Page
**File:** `Footer.jsx`  
**Issue:**  
- Sub-page logos: no `transition-opacity`, just `transition duration-200`  
- Landing page logos: `opacity-80 hover:opacity-100 transition-opacity duration-300`  

Different hover feedback for the same logos.

### M6. Hero Bottom Fade ≠ AboutSection Background
**Files:** `HeroBanner.jsx` vs `AboutSection.jsx`  
**Issue:** Hero fades to `#F8FAF8`. AboutSection gradient starts at `#F8FAF8` → `#F2F7F4`. This is actually correct. However, FeaturedPotentialsSection starts at `#FAFCFB` while AboutSection ends at `#F2F7F4`. The transition from About → StoryDivider → Featured has a subtle background color jump.

### M7. Featured Card Category Badge Hover ≠ Card Hover Timing
**File:** `FeaturedPotentialCard.jsx`  
**Issue:** CategoryBadge uses `transition-transform duration-300` for the `-translate-y-1.5` on hover. The card itself uses `300ms ease-out`. These happen to match, but the badge uses `ease-out` implicitly while the card uses explicit `ease-out`. Minor but the badge doesn't have an explicit easing curve.

### M8. Focus Ring Implementation Varies
**Multiple files**  
**Issue:**  
- Global CSS: `:focus-visible { outline: 2px solid var(--border-focus); outline-offset: 2px; }`  
- FeaturedPotentialCard: `focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2`  
- LatestPotentialCard: same as Featured  
- ContactPage cards: no focus-visible styling  
- ContactPage FAQ button: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset`  

Three different focus ring approaches: global outline, Tailwind ring, and ring-inset.

### M9. ContactPage Heading Color Mismatch
**File:** `ContactPage.jsx`  
**Issue:** ContactPage headings use hardcoded `text-primary` (which resolves to `#184D47`). SectionHeader/PageHeader headings use `text-primary-dark` (`#0F3D34`). Two different heading colors across the site.

### M10. AboutPage Section Titles — Different Tracking
**File:** `AboutPage.jsx`  
**Issue:**  
- AboutPage section titles: `tracking-[-0.015em]`  
- SectionHeader titles: `tracking-[-0.02em]`  
- PageHeader titles: `tracking-[-0.02em]`  

AboutPage headings are slightly looser than the rest of the site.

### M11. CTASection Inner Padding Inconsistency
**File:** `CTASection.jsx`  
**Issue:** Outer section uses `py-14 sm:py-18 lg:py-24`. Inner card uses `px-6 py-16 sm:px-10 sm:py-18 lg:px-16 lg:py-20`. The `py-18` class is non-standard Tailwind (Tailwind default steps: 16, 20, 24). This likely renders as `py-72px` (4.5rem) which may not be intentional.

### M12. Featured Card Shadow Uses `rgba(0,0,0,0.12)` on CTA Button
**File:** `CTASection.jsx`  
**Issue:** CTA primary button shadow: `shadow-[0_8px_24px_rgba(0,0,0,0.12)]`. All other shadows in Sprint 15 use green-tinted `rgba(15,61,52,...)`. Black shadow on a white button over a green background creates a different visual weight.

### M13. ContactPage Welcome Text Leading ≠ SectionHeader
**File:** `ContactPage.jsx`  
**Issue:** Welcome text uses `leading-relaxed` (1.625). SectionHeader description uses `leading-[1.75]`. Different paragraph density.

### M14. CategoriesExplorer Grid Gap ≠ CategorySection
**Files:** `CategoriesExplorer.jsx` vs `CategorySection.jsx`  
**Issue:**  
- CategoriesExplorer: `gap-6 lg:gap-8` between category cards  
- CategorySection: `gap-4 md:gap-5` inside the glass panel  

Different spacing for similar category card grids.

### M15. AboutPage Mission Items — Unique Card Style
**File:** `AboutPage.jsx`  
**Issue:** Mission items use `rounded-[16px] bg-white p-4 sm:p-5 shadow-sm border border-primary/5`. This `border-primary/5` is the lightest border opacity in the system. No other card uses `/5` opacity.

### M16. ContactPage FAQ Uses `shadow-sm` While FAQSection Uses Custom Shadow
**Files:** `ContactPage.jsx` vs `FAQSection.jsx`  
**Issue:**  
- ContactPage FAQ items: `shadow-sm` (Tailwind token)  
- FAQSection container: `shadow-[0_2px_8px_rgba(15,61,52,0.03),0_8px_24px_rgba(15,61,52,0.05)]` (custom two-layer)  

Different shadow systems for the same FAQ component type.

---

## LOW

### L1. Featured Card Glass Reflection — Unique to Featured Only
**File:** `FeaturedPotentialCard.jsx`  
**Issue:** Featured cards have an animated glass reflection sweep (`GlassReflection` component, 9s cycle). Latest cards have no reflection. This creates a visual hierarchy where Featured cards feel more "premium" — which may be intentional, but there's no design spec documenting this distinction.

### L2. AboutPage Quick Fact Labels — Different Tracking
**File:** `AboutPage.jsx`  
**Issue:** Quick Fact labels use `tracking-[0.12em]`. SectionHeader eyebrow uses `tracking-[0.2em]`. PageHeader eyebrow uses `tracking-[0.2em]`. The fact labels are tighter.

### L3. ContactPage "Jelajahi Potensi" Link ≠ Link Styling
**File:** `ContactPage.jsx`  
**Issue:** "Jelajahi Potensi" in the final CTA uses `bg-white border border-primary/10 text-primary`. This is a different treatment from the SectionHeader CTA which uses `glassButtonSubtle` with `border: '1px solid rgba(24,77,71,0.15)'`. Visually close but not identical.

### L4. Footer "Buka Google Maps" Button ≠ Other Outline Buttons
**File:** `Footer.jsx`  
**Issue:** Uses `border border-primary/20 text-[14px] font-medium rounded-full`. The SectionHeader CTA uses `border border-primary/15 text-sm font-semibold rounded-full`. Different border opacity and font weight.

### L5. AboutPage Decorative Lines — Different Gradient Intensity
**File:** `AboutPage.jsx`  
**Issue:** Opening line: `rgba(24,77,71,0.2)`. Closing line: `rgba(24,77,71,0.15)`. StoryDivider uses `rgba(24,77,71,0.2)` for both lines. The AboutPage has asymmetric line intensity.

### L6. MobileNavigation Animation ≠ Page Transition
**Files:** `MobileNavigation.jsx` vs other Framer Motion usages  
**Issue:** MobileNavigation uses its own AnimatePresence slide-in. Other page transitions use fade-up. The drawer animation is faster and more abrupt than the editorial scroll reveals.

### L7. ContactPage `<a>` Tags Inside Cards vs `<Link>` Components
**File:** `ContactPage.jsx`  
**Issue:** ContactMethodCard uses `<a href>` for external links (WhatsApp, phone, email, maps). This is correct for external links, but "Jelajahi Potensi" in the final CTA uses `<a href="/potentials">` instead of `<Link to="/potentials">`. This causes a full page reload instead of client-side navigation.

### L8. AboutPage Featured Image Vignette ≠ AboutSection
**Files:** `AboutPage.jsx` vs `AboutSection.jsx`  
**Issue:**  
- AboutPage: `transparent 55%, rgba(15,61,52,0.1)`  
- AboutSection: `transparent 50%, rgba(15,61,52,0.12)`  

Slightly different vignette parameters for the same image treatment.

### L9. StatisticsPage Distribution Bar ≠ Other Progress Indicators
**File:** `StatisticsPage.jsx`  
**Issue:** Distribution bar uses `h-2 rounded-full bg-primary/8` track with `bg-primary/60` fill. This is a unique progress bar pattern not used elsewhere. No other component has a progress bar.

### L10. ContactPage Map iframe Height
**File:** `ContactPage.jsx`  
**Issue:** Map iframe uses `minHeight: '360px'` inline style. MapPreview uses `minHeight: 320`. Different minimum heights for map embeds.

### L11. Button Component Shadow Tokens ≠ Card Shadow Tokens
**File:** `Button.jsx`  
**Issue:** Button uses `shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]` (from CSS tokens: `0 1px 3px rgba(0,0,0,0.04)` / `0 4px 12px rgba(0,0,0,0.06)`). Cards use the new Sprint 15 two-layer green-tinted shadows. Buttons and cards have fundamentally different shadow languages.

---

## Cross-Cutting Concerns

### Typography Tracking Summary
| Element | Tracking | File |
|---------|----------|------|
| PageHero eyebrow | `0.22em` | PageHero.jsx |
| SectionHeader eyebrow | `0.2em` | SectionHeader.jsx |
| AboutPage eyebrow | `0.2em` | AboutPage.jsx |
| AboutPage section title | `-0.015em` | AboutPage.jsx |
| SectionHeader title | `-0.02em` | SectionHeader.jsx |
| PageHeader title | `-0.02em` | PageHeader.jsx |

### Card Radius Summary
| Context | Radius | Files |
|---------|--------|-------|
| Featured card | `28px` | FeaturedPotentialCard.jsx |
| Featured skeleton | `32px` ⚠️ | FeaturedPotentialCard.jsx |
| Latest card | `24px` | LatestPotentialCard.jsx |
| CategorySection glass | `24px` | CategorySection.jsx |
| Stats GlassCard | `24px` | StatisticsShared.jsx |
| AboutPage facts | `20px` | AboutPage.jsx |
| AboutPage vision | `20px` | AboutPage.jsx |
| ContactPage cards | `20px` | ContactPage.jsx |
| ContactPage FAQ | `16px` | ContactPage.jsx |
| FAQSection container | `20px` | FAQSection.jsx |
| StatisticsPage cards | `20px` | StatisticsPage.jsx |
| CTASection inner | `40px` | CTASection.jsx |

### Shadow System Summary
| System | Usage | Examples |
|--------|-------|----------|
| Green-tinted two-layer | Homepage cards (Sprint 15) | Featured, Latest, Stats GlassCard, FAQ, Contact |
| Tailwind `shadow-sm` | Sub-page cards | AboutPage, ContactPage, StatisticsPage |
| CSS tokens `--shadow-sm/md` | Button component | Button.jsx |
| Black `rgba(0,0,0,...)` | CTA button | CTASection.jsx |
| Glassmorphism | CategorySection panel, Latest card base | glassStyles.js |

### Focus Ring Summary
| Approach | Usage |
|----------|-------|
| Global `:focus-visible` outline | Default for all elements |
| `focus-visible:ring-2 ring-[--border-focus]` | Featured card, Latest card, Header nav |
| `focus-visible:ring-2 ring-primary` | ContactPage cards, FAQSection |
| `focus-visible:ring-inset` | ContactPage FAQ button |
| `focus-visible:ring-white/50` | Hero buttons |
| None | AboutPage fact cards, StatisticsPage cards |

---

## Recommendations for Sprint 16

1. **Unify card radius system:** Define 2 radii — `card: 24px` (standard), `card-lg: 28px` (featured/hero cards). Apply everywhere.
2. **Unify shadow system:** Phase out `shadow-sm` Tailwind class on cards. Use the green-tinted two-layer shadows consistently. Document in DESIGN_SYSTEM.md.
3. **Unify FAQ implementation:** Choose one FAQ pattern (either the single-container divider style or the individual-card style) and use it on both Homepage and ContactPage.
4. **Fix office hours contradiction:** Reconcile ContactSection and ContactPage.
5. **Standardize heading colors:** Choose `text-primary-dark` for all headings OR `text-primary`, not both.
6. **Standardize heading tracking:** Use `-0.02em` for all h2/h3 headings.
7. **Standardize eyebrow tracking:** Use `0.2em` everywhere.
8. **Add hover states to AboutPage cards:** Quick Facts, Government table items.
9. **Align ContactPage SectionHeader-equivalents:** Add `font-heading`, `tracking-[-0.02em]`, `text-primary-dark` to ContactPage section headings.
10. **Unify focus ring approach:** Pick one: global outline OR Tailwind ring. Document the choice.
11. **Fix Featured skeleton radius:** Change `rounded-[32px]` to `rounded-[28px]`.
12. **Update Header easing:** Change to use `--ease-default` or the new `cubic-bezier(0.25, 0.1, 0.25, 1)`.
13. **Fix CTA button shadow:** Change from `rgba(0,0,0,0.12)` to green-tinted shadow.
14. **Replace `<a href="/potentials">` with `<Link to="/potentials">`** in ContactPage final CTA.
15. **Standardize icon sizes:** Document that category icons are 24px on homepage, 56px on explorer page (intentional?) or unify.
