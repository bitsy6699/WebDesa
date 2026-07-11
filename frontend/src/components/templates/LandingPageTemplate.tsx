import { type ReactNode } from 'react';

export interface LandingPageTemplateProps {
  /** Section 1 — Hero with floating stats slot */
  hero: ReactNode;
  /** Section 2 — Floating Category Bar (overlaps hero) */
  categories: ReactNode;
  /** Section 3 — Statistics grid */
  statistics: ReactNode;
  /** Section 4 — Interactive Map Preview */
  map: ReactNode;
  /** Section 5 — Potensi Unggulan Carousel */
  featured: ReactNode;
  /** Section 6 — News & Activities */
  news: ReactNode;
}

/**
 * LandingPageTemplate — Defines the exact section order of the landing page.
 *
 * Order per UI_UX_SPEC.md §4 (MUST NOT change):
 * 1. Hero
 * 2. Floating Category Bar
 * 3. Statistics
 * 4. Interactive Map Preview
 * 5. Potensi Unggulan Carousel
 * 6. News & Activities
 * 7. Footer (rendered by PublicLayout)
 *
 * @see docs/design/UI_UX_SPEC.md §4 Landing Page Structure
 */
export function LandingPageTemplate({
  hero,
  categories,
  statistics,
  map,
  featured,
  news,
}: LandingPageTemplateProps) {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* 1 — Hero */}
      {hero}

      {/* 2 — Floating Category Bar (negative-margin overlap with hero) */}
      {categories}

      {/* 3 — Statistics */}
      {statistics}

      {/* 4 — Interactive Map Preview */}
      {map}

      {/* 5 — Potensi Unggulan Carousel */}
      {featured}

      {/* 6 — News & Activities */}
      {news}
    </div>
  );
}
