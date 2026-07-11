import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate';
import { HeroBanner } from '@/components/organisms/HeroBanner';
import { HeroStatisticsCard } from '@/components/molecules/HeroStatisticsCard';
import { CategorySection } from '@/components/organisms/CategorySection';
import { StatisticsSection, StatisticsSectionSkeleton } from '@/components/organisms/StatisticsSection';
import { MapSection } from '@/components/organisms/MapSection';
import { FeaturedPotentialsSection } from '@/components/organisms/FeaturedPotentialsSection';
import { NewsSection } from '@/components/organisms/NewsSection';
import { useStatistics } from '@/hooks/useStatistics';
import { useCategories } from '@/hooks/useCategories';
import { usePotentials } from '@/hooks/usePotentials';
import { NEWS_MOCK } from '@/mocks/news';
/** Hero image from public/hero/ — served as static asset, no import needed. */
const HERO_IMAGE = '/hero/hero-karamatwangi.jpg';

/**
 * Home — Public landing page.
 *
 * Section order (UI_UX_SPEC.md §4 — MUST NOT change):
 * 1. Hero (with floating HeroStatisticsCard on the right)
 * 2. Floating Category Bar
 * 3. Statistics
 * 4. Interactive Map Preview
 * 5. Potensi Unggulan Carousel
 * 6. News & Activities
 * 7. Footer (rendered by PublicLayout)
 *
 * API hooks (DO NOT modify):
 * - Statistics  → GET /api/v1/statistics/summary
 * - Categories  → GET /api/v1/categories
 * - Featured    → GET /api/v1/potentials?featured=true
 * - Map markers → GET /api/v1/potentials (via MapSection)
 */
export default function Home() {
  const { data: statistics, isLoading: isLoadingStats } = useStatistics();
  const { data: categories = [], isLoading: isLoadingCats } = useCategories();
  const { data: featuredData, isLoading: isLoadingFeatured } = usePotentials({ featured: true });

  return (
    <LandingPageTemplate
      /* ── 1. Hero ──────────────────────────────────────────────────── */
      hero={
        <HeroBanner
          title="Desa Karamatwangi"
          description="Portal digital yang menampilkan seluruh potensi unggulan Desa Karamatwangi, mulai dari wisata, UMKM, pertanian, peternakan, budaya, hingga berbagai informasi desa."
          image={HERO_IMAGE}
          statisticsSlot={
            <HeroStatisticsCard
              summary={statistics}
              isLoading={isLoadingStats}
            />
          }
        />
      }
      /* ── 2. Floating Category Bar ─────────────────────────────────── */
      categories={
        <CategorySection
          categories={categories}
          isLoading={isLoadingCats}
        />
      }
      /* ── 3. Statistics ────────────────────────────────────────────── */
      statistics={
        isLoadingStats || !statistics
          ? <StatisticsSectionSkeleton />
          : <StatisticsSection summary={statistics} />
      }
      /* ── 4. Interactive Map Preview ───────────────────────────────── */
      map={<MapSection />}
      /* ── 5. Potensi Unggulan Carousel ────────────────────────────── */
      featured={
        <FeaturedPotentialsSection
          potentials={featuredData?.data ?? []}
          isLoading={isLoadingFeatured}
        />
      }
      /* ── 6. News & Activities ─────────────────────────────────────── */
      news={<NewsSection articles={NEWS_MOCK} />}
    />
  );
}
