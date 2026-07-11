# Task Tracker

## Project: Website Potensi Desa Karamatwangi
### Last Updated: 2026-07-10

---

## ✅ Completed Tasks

### Phase 13C — Public Directory & Detail Pages

| # | Task | Status | File(s) |
|---|------|--------|---------|
| 1 | Fix CategoryChip `name`→`label`, `icon`→`icon_key` | ✅ Done | `components/molecules/CategoryChip.tsx` |
| 2 | Build `DirectoryToolbar` organism | ✅ Done | `components/organisms/DirectoryToolbar.tsx` |
| 3 | Build `DirectoryGrid` organism | ✅ Done | `components/organisms/DirectoryGrid.tsx` |
| 4 | Build `MetadataRenderer` molecule (ACA engine) | ✅ Done | `components/molecules/MetadataRenderer.tsx` |
| 5 | Implement `PotentialsDirectory` page | ✅ Done | `pages/PotentialsDirectory.tsx` |
| 6 | Implement `PotentialDetail` page | ✅ Done | `pages/PotentialDetail.tsx` |
| 7 | Extend `Button` with `as="a"` polymorphism | ✅ Done | `components/atoms/Button.tsx` |
| 8 | Refactor `StatisticsSection` to use real API data | ✅ Done | `components/organisms/StatisticsSection.tsx` |
| 9 | Refactor `FeaturedPotentialsSection` to use `PotentialListItem[]` | ✅ Done | `components/organisms/FeaturedPotentialsSection.tsx` |
| 10 | Refactor `CategorySection` to use real `Category[]` | ✅ Done | `components/organisms/CategorySection.tsx` |
| 11 | Connect `Home.tsx` to real API (remove all mock data) | ✅ Done | `pages/Home.tsx` |
| 12 | Final verification: diagnostics (0 errors), build (✓) | ✅ Done | — |
| 13 | Update ROADMAP.md, CHANGELOG.md | ✅ Done | `docs/project/` |

---

### Phase 13D — UI Polish & Design System

| # | Task | Status | File(s) |
|---|------|--------|---------|
| 1 | Typography system & spacing utilities in index.css | ✅ Done | `styles/index.css` |
| 2 | Skeleton shimmer animation | ✅ Done | `atoms/Skeleton.tsx`, `styles/index.css` |
| 3 | Button: hover lift, shadow, exact DS heights | ✅ Done | `atoms/Button.tsx` |
| 4 | Card: shadow-md resting, shadow-lg hover | ✅ Done | `atoms/Card.tsx` |
| 5 | Badge: text-label typography scale | ✅ Done | `atoms/Badge.tsx` |
| 6 | Chip: polish hover fill, active shadow | ✅ Done | `atoms/Chip.tsx` |
| 7 | SearchBar: hero variant pill shape | ✅ Done | `molecules/SearchBar.tsx` |
| 8 | PotentialCard: badge top-left, typography, placeholder | ✅ Done | `molecules/PotentialCard.tsx` |
| 9 | HeroBanner: cinematic hero, DS overlay, display typography | ✅ Done | `organisms/HeroBanner.tsx` |
| 10 | Header: scroll-aware, active indicator, transparent mode | ✅ Done | `organisms/Header.tsx` |
| 11 | MobileNavigation: active state, proper close button | ✅ Done | `organisms/MobileNavigation.tsx` |
| 12 | Footer: complete rewrite with village info | ✅ Done | `organisms/Footer.tsx` |
| 13 | StatisticsSection: colored icon cards, typography polish | ✅ Done | `organisms/StatisticsSection.tsx` |
| 14 | FeaturedPotentialsSection: section-padding, card polish | ✅ Done | `organisms/FeaturedPotentialsSection.tsx` |
| 15 | CategorySection: section-padding | ✅ Done | `organisms/CategorySection.tsx` |
| 16 | PotentialsDirectory: page header typography | ✅ Done | `pages/PotentialsDirectory.tsx` |
| 17 | PotentialDetail: layout & typography polish | ✅ Done | `pages/PotentialDetail.tsx` |
| 18 | Build verification: 0 errors, 0 warnings | ✅ Done | — |
| 19 | Update ROADMAP.md, CHANGELOG.md, task.md, walkthrough.md | ✅ Done | `docs/project/` |

---

### Phase 13E Revision — Portal Potensi Desa

| # | Task | Status |
|---|------|--------|
| 1 | Replace UMKM wording with Potensi Desa terminology | ✅ Done |
| 2 | Replace Leaflet landing map with static SVG preview | ✅ Done |
| 3 | FeaturedPotentialsSection → Potensi Unggulan | ✅ Done |
| 4 | HeroBanner CTA → /potentials (not UMKM category) | ✅ Done |
| 5 | StatisticsSection village-centric labels | ✅ Done |
| 6 | Verify landing page section order | ✅ Done |
| 7 | Build verification: 0 errors | ✅ Done |
| 8 | Documentation updated | ✅ Done |

---

### Phase 13F — Landing Page Redesign

| # | Task | Status |
|---|------|--------|
| 1 | Replace placeholder hero with real image | ✅ Done |
| 2 | Add village logo to Header (logo-desa.png) | ✅ Done |
| 3 | Remove UMKM from navigation | ✅ Done |
| 4 | Clean hero — remove all category chips | ✅ Done |
| 5 | Update hero copy: Cikajang, Garut, Jawa Barat | ✅ Done |
| 6 | HeroStatisticsCard labels updated | ✅ Done |
| 7 | CategorySection visual polish (rounded-3xl, hover tint) | ✅ Done |
| 8 | MapSection: Garut references, remove Kuningan | ✅ Done |
| 9 | Build verification ✔ | ✅ Done |

---

## 🔄 In Progress / Upcoming

### Phase 14 — Production Go-Live

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Configure production domain DNS | ⏳ Pending | — |
| 2 | Enable nightly database backup cron job | ⏳ Pending | — |
| 3 | Final deployment to production VPS | ⏳ Pending | — |
