# Sprint 16 — Design System Consolidation

**Date:** 2026-07-21
**Goal:** Fix meaningful inconsistencies from Sprint 15.5 QA audit. Design system consolidation only — no redesigns, no layout changes, no intentional hierarchy flattening.

---

## Files Modified (8 files)

| File | Changes |
|---|---|
| `FeaturedPotentialCard.jsx` | Skeleton radius 32→28px |
| `Header.jsx` | Easing `[0.4,0,0.2,1]` → `[0.25,0.1,0.25,1]` |
| `CTASection.jsx` | Button shadow black → green-tinted two-layer |
| `ContactSection.jsx` | No changes needed (hours already correct) |
| `ContactPage.jsx` | Office hours unified, custom FAQ replaced with FAQSection, heading typography normalized, imports cleaned |
| `PotentialDetail.jsx` | Raw `<img>` → `<LazyImage>` |
| `AboutPage.jsx` | Raw `<img>` → `<LazyImage>`, Quick Facts hover states, eyebrow tracking 0.12→0.2em |
| `Footer.jsx` | `<a href="/">` → `<Link to="/">`, closing sentence typography normalized, transition timing unified |

---

## Before / After Table

| Task | Before | After | File(s) |
|---|---|---|---|
| **1. Skeleton radius** | `rounded-[32px]` | `rounded-[28px]` | FeaturedPotentialCard.jsx:242 |
| **2. Office hours** | Sabtu: Tutup (ContactPage) / 08:00–12:00 (ContactSection) | Sabtu: 08:00–12:00 WIB everywhere | ContactPage.jsx:22-23, :164-165 |
| **3. Header easing** | `ease-[cubic-bezier(0.4,0,0.2,1)]` | `ease-[cubic-bezier(0.25,0.1,0.25,1)]` | Header.jsx:98 |
| **4. CTA shadow** | `shadow-[0_8px_24px_rgba(0,0,0,0.12)]` | `shadow-[0_4px_12px_rgba(15,61,52,0.08),0_8px_24px_rgba(15,61,52,0.12)]` | CTASection.jsx:18 |
| **5. Raw images** | `<img>` in PotentialDetail, AboutPage | `<LazyImage>` in both | PotentialDetail.jsx:161, AboutPage.jsx:154 |
| **6. FAQ system** | Custom accordion (ContactPage) vs FAQSection (homepage) | Single FAQSection reused | ContactPage.jsx:243-311 → single `<FAQSection>` |
| **7. Contact headings** | `text-primary`, no tracking | `tracking-[-0.02em] text-primary-dark` | ContactPage.jsx:152, :255 |
| **8. About hover** | Quick Facts: static `shadow-sm` | `hover:-translate-y-[2px] hover:border-primary/12 hover:shadow-[...]` | AboutPage.jsx:193 |
| **9. Footer consistency** | `<a href="/">` sub-page, `text-[12px]` closing, `transition duration-200` | `<Link to="/">`, `text-[13px]`, `transition-opacity duration-300` | Footer.jsx:32-70, :27 |
| **10. Focus rings** | Already standardized (Sprint 12) | No changes needed | — |
| **11. Typography tokens** | Quick Facts label `tracking-[0.12em]` | `tracking-[0.2em]` | AboutPage.jsx:199 |
| **12. Internal nav** | Already using `<Link>` everywhere | No changes needed | — |

---

## Remaining Intentional Inconsistencies (Not Fixed — By Design)

| Finding | Reason |
|---|---|
| Featured cards visually richer than Latest | Intentional hierarchy (DO NOT TOUCH) |
| Explorer category icons larger than homepage | Context-appropriate sizing |
| Homepage CTA grander than page CTAs | Homepage is primary journey |
| Statistics page dashboard-like | Intentional design choice |
| Map Preview different from full Map page | Preview vs full experience |
| Glassmorphism differences across components | Intentional surface treatments |
| AboutPage editorial quote padding ≠ StoryDivider | Different visual purposes |
| AboutPage Visi/Misi labels `0.16em` | Intentional sub-section tracking |
| StoryDivider subtitle `0.18em` | Editorial poetic tone |
| Footer logo hover opacity differs (85% vs 100%) | Sub-page (Link wrapper) vs landing (img direct) |
| ContactPage FAQ removed custom implementation | Replaced with shared FAQSection (now unified) |

---

## Build Status

```
✓ built in 453ms — 2493 modules — zero errors
```

---

## Design Tokens Updated

| Token | Before | After |
|---|---|---|
| Header easing | `cubic-bezier(0.4,0,0.2,1)` | `cubic-bezier(0.25,0.1,0.25,1)` (matches `--ease-default`) |
| CTA button shadow | `rgba(0,0,0,0.12)` | `rgba(15,61,52,0.08) + rgba(15,61,52,0.12)` (green-tinted) |
| Featured skeleton radius | `32px` | `28px` (matches card) |
| AboutPage Quick Facts label tracking | `0.12em` | `0.2em` (matches SectionHeader) |
| Sub-page footer closing text size | `12px` | `13px` (matches landing footer) |
| Sub-page footer closing text spacing | `mt-1` | none (matches landing footer) |

---

## Summary

- **8 files modified**, 0 new files
- **All 4 critical findings resolved** (skeleton radius, office hours, header easing, CTA shadow)
- **6 high-priority findings resolved** (FAQ unification, About hover states, contact heading typography, footer consistency, raw images, typography tokens)
- **4 findings unchanged by design** (intentional hierarchy)
- **2 findings already resolved** (focus rings, internal nav)
- **Net bundle change: 0 KB** (no new dependencies)
- **Build: passed** (453ms, 2493 modules)
