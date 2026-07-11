import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate';
import { HeroBanner } from '@/components/organisms/HeroBanner';
import { HeroStatisticsCard } from '@/components/molecules/HeroStatisticsCard';
import { CategorySection } from '@/components/organisms/CategorySection';
import { StatisticsSection, StatisticsSectionSkeleton } from '@/components/organisms/StatisticsSection';
import { MapSection } from '@/components/organisms/MapSection';
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
 * 1. Hero (transparent navbar overlay + glassmorphism stats card)
 * 2. Floating Category Bar
 * 3. Statistics
 * 4. Map Preview
 * 5. Potensi Unggulan
 * 6. Potensi Terbaru
 * 7. Footer (rendered by PublicLayout)
 *
 * API hooks — DO NOT modify:
 * - Statistics  → GET /api/v1/statistics/summary
 * - Categories  → GET /api/v1/categories
 * - Featured    → GET /api/v1/potentials?featured=true
 * - Latest      → GET /api/v1/potentials (page 1, default sort = newest)
 */
export default function Home() {
  const { data: statistics, isLoading: isLoadingStats } = useStatistics();
  const { data: categories = [], isLoading: isLoadingCats } = useCategories();
  const { data: featuredData, isLoading: isLoadingFeatured } = usePotentials({ featured: true });
  const { data: latestData, isLoading: isLoadingLatest } = usePotentials({ page: 1 });

  return (
    <LandingPageTemplate
      /* 1 — Hero */
      hero={
        <HeroBanner
          image={HERO_IMAGE}
          statisticsSlot={
            <HeroStatisticsCard
              summary={statistics}
              isLoading={isLoadingStats}
            />
          }
        />
      }
      /* 2 — Floating Category Bar */
      categories={
        <CategorySection
          categories={categories}
          isLoading={isLoadingCats}
        />
      }
      /* 3 — Statistics */
      statistics={
        isLoadingStats || !statistics
          ? <StatisticsSectionSkeleton />
          : <StatisticsSection summary={statistics} />
      }
      /* 4 — Map Preview */
      map={<MapSection />}
      /* 5 — Potensi Unggulan */
      featured={
        <FeaturedPotentialsSection
          potentials={featuredData?.data ?? []}
          isLoading={isLoadingFeatured}
        />
      }
      /* 6 — Potensi Terbaru */
      news={
        <PotensiTerbaruSection
          potentials={latestData?.data ?? []}
          isLoading={isLoadingLatest}
        />
      }
    />
  );
}
