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
  /** Section 6 — Potensi Terbaru Grid (replaces News) */
  news: ReactNode;
}

/**
 * LandingPageTemplate — Exact section order for the landing page.
 *
 * 1. Hero
 * 2. Floating Category Bar
 * 3. Statistics
 * 4. Interactive Map Preview
 * 5. Potensi Unggulan Carousel
 * 6. Potensi Terbaru Grid
 * 7. Footer (rendered by PublicLayout)
 *
 * @see docs/design/UI_UX_SPEC.md §4
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
      {hero}
      {categories}
      {statistics}
      {map}
      {featured}
      {news}
    </div>
  );
}
