import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate';
import { HeroBanner } from '@/components/organisms/HeroBanner';
import { CategorySection } from '@/components/organisms/CategorySection';
import { StatisticsSection } from '@/components/organisms/StatisticsSection';
import { FeaturedPotentialsSection } from '@/components/organisms/FeaturedPotentialsSection';
import { PotensiTerbaruSection } from '@/components/organisms/PotensiTerbaruSection';
import { useStatistics } from '@/hooks/useStatistics';
import { useCategories } from '@/hooks/useCategories';
import { usePotentials } from '@/hooks/usePotentials';

/** Hero image from public/hero/ — static asset, not imported through bundler. */
const HERO_IMAGE = '/hero/hero-karamatwangi.jpg';

/**
 * Home — Public landing page.
 *
 * Section order:
 * 1. Hero (transparent navbar overlay)
 * 2. Ringkasan Dashboard Statistik
 * 3. Kategori Potensi
 * 4. Potensi Unggulan
 * 5. Potensi Terbaru
 * 6. CTA Section
 * 7. Footer (rendered by PublicLayout)
 *
 * API hooks — DO NOT modify:
 * - Statistics  → GET /api/v1/statistics/summary
 * - Categories  → GET /api/v1/categories
 * - Featured    → GET /api/v1/potentials?featured=true
 * - Latest      → GET /api/v1/potentials (page 1, default sort = newest)
 */
export default function Home() {
  const { data: statistics } = useStatistics();
  const { data: categories = [], isLoading: isLoadingCats } = useCategories();
  const { data: featuredData, isLoading: isLoadingFeatured } = usePotentials({ featured: true });
  const { data: latestData, isLoading: isLoadingLatest } = usePotentials({ page: 1 });

  return (
    <LandingPageTemplate
      /* 1 — Hero */
      hero={
        <HeroBanner
          image={HERO_IMAGE}
        />
      }
      /* 2 — Ringkasan Dashboard Statistik */
      statistics={<StatisticsSection summary={statistics} />}
      /* 3 — Kategori Potensi */
      categories={
        <CategorySection
          categories={categories}
          isLoading={isLoadingCats}
        />
      }
      /* 4 — Potensi Unggulan */
      featured={
        <FeaturedPotentialsSection
          potentials={featuredData?.data ?? []}
          isLoading={isLoadingFeatured}
        />
      }
      /* 5 — Potensi Terbaru */
      news={
        <PotensiTerbaruSection
          potentials={latestData?.data ?? []}
          isLoading={isLoadingLatest}
        />
      }
    />
  );
}
