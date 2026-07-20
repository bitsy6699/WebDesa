import { type ReactNode } from 'react';
import { CTASection } from '@/components/organisms/CTASection';

export interface LandingPageTemplateProps {
  /** Section 1 — Hero with floating stats slot */
  hero: ReactNode;
  /** Section 2 — Ringkasan Dashboard Statistik */
  statistics: ReactNode;
  /** Section 3 — Kategori Potensi */
  categories: ReactNode;
  /** Section 4 — Potensi Unggulan */
  featured: ReactNode;
  /** Section 5 — Potensi Terbaru */
  news: ReactNode;
}

/**
 * LandingPageTemplate — Exact section order for the landing page.
 *
 * 1. Hero
 * 2. Ringkasan Dashboard Statistik
 * 3. Kategori Potensi
 * 4. Potensi Unggulan
 * 5. Potensi Terbaru
 * 6. CTA Section
 * 7. Footer (rendered by PublicLayout)
 *
 * @see docs/design/UI_UX_SPEC.md §4
 */
export function LandingPageTemplate({
  hero,
  categories,
  statistics,
  featured,
  news,
}: LandingPageTemplateProps) {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {hero}
      {statistics}
      {categories}
      {featured}
      {news}
      <CTASection />
    </div>
  );
}
