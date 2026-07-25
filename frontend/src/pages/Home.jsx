import { useMemo } from 'react';
import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate';
import { HeroBanner } from '@/components/organisms/HeroBanner';
import { AboutSection } from '@/components/organisms/AboutSection';
import { CategorySection } from '@/components/organisms/CategorySection';
import { StatisticsSection } from '@/components/organisms/StatisticsSection';
import { FeaturedPotentialsSection } from '@/components/organisms/FeaturedPotentialsSection';
import { PotensiTerbaruSection } from '@/components/organisms/PotensiTerbaruSection';
import { MapPreview } from '@/components/organisms/MapPreview';
import { FAQSection } from '@/components/organisms/FAQSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { useStatistics } from '@/hooks/useStatistics';
import { useCategories } from '@/hooks/useCategories';
import { usePotentials } from '@/hooks/usePotentials';
import SEO from '@/components/SEO';
import { faqSchema, breadcrumbSchema } from '@/lib/structuredData';

/** Hero image from public/hero/ — static asset, not imported through bundler. */
const HERO_IMAGE = '/hero/hero-karamatwangi.jpg';

/**
 * Home — Public landing page.
 *
 * Editorial scroll flow (Sprint 14.1):
 * 1. Hero — Welcome
 * 2. About — Discover (who we are)
 * 3. StoryDivider — Emotional transition
 * 4. Featured — Highlighted potentials
 * 5. Categories — Explore sectors
 * 6. Map Preview — Visual exploration teaser
 * 7. Latest — Recent additions
 * 8. Statistics — Data overview (only if data exists)
 * 9. FAQ — Common questions
 * 10. Contact — Get in touch
 * 11. CTA — Final invitation
 * 12. Footer (rendered by PublicLayout)
 *
 * Empty sections are hidden — do NOT render empty state UI.
 *
 * @see docs/MIGRATION_PLAN_14_1.md
 */
export default function Home() {
  const { data: statistics, isLoading: isLoadingStats } = useStatistics();
  const { data: categories = [], isLoading: isLoadingCats } = useCategories();
  const { data: featuredData, isLoading: isLoadingFeatured } = usePotentials({ featured: true });
  const { data: latestData, isLoading: isLoadingLatest } = usePotentials({ page: 1 });

  const hasStatistics = useMemo(
    () => !isLoadingStats && statistics && Object.values(statistics).some((v) => typeof v === 'number' && v > 0),
    [isLoadingStats, statistics],
  );

  const potentials = useMemo(() => latestData?.data ?? [], [latestData]);
  const featuredPotentials = useMemo(() => featuredData?.data ?? [], [featuredData]);

  return (
    <>
    <SEO
      title="Beranda"
      description="Jelajahi potensi Desa Karamatwangi — pertanian, UMKM, wisata, budaya, dan data statistik desa di Kecamatan Cikajang, Kabupaten Garut."
      path="/"
      image="/hero/hero-karamatwangi.jpg"
      schema={[
        faqSchema([
          { question: 'Apa itu Portal Potensi Desa Karamatwangi?', answer: 'Portal ini adalah platform digital yang menampilkan potensi Desa Karamatwangi — mulai dari sektor pertanian, UMKM, wisata, hingga budaya. Tujuannya agar masyarakat luas dapat mengenal dan menjelajahi potensi desa.' },
          { question: 'Bagaimana cara menghubungi pemerintah desa?', answer: 'Anda dapat menghubungi kami melalui WhatsApp, telepon di (0232) 123-4567, atau email ke info@karamatwangi.desa.id. Jam kerja kantor desa adalah Senin–Sabtu, 08:00–16:00 WIB.' },
          { question: 'Apakah data potensi desa selalu diperbarui?', answer: 'Ya, data dikelola dan diperbarui oleh pemerintah desa secara berkala. Setiap potensi yang tercatat adalah data resmi yang dipublikasikan oleh pengelola portal.' },
          { question: 'Di mana lokasi Desa Karamatwangi?', answer: 'Desa Karamatwangi terletak di Kecamatan Cikajang, Kabupaten Garut, Provinsi Jawa Barat. Desa ini berada di dataran tinggi dengan pemandangan kebun teh dan sawah berundak.' },
        ]),
        breadcrumbSchema([{ label: 'Beranda', to: '/' }]),
      ]}
    />
    <LandingPageTemplate
      /* 1 — Hero */
      hero={
        <HeroBanner
          image={HERO_IMAGE}
        />
      }
      /* 2 — About Desa Karamatwangi */
      about={<AboutSection />}
      /* 3 — Featured Potentials */
      featured={
        <FeaturedPotentialsSection
          id="unggulan"
          potentials={featuredPotentials}
          isLoading={isLoadingFeatured}
        />
      }
      /* 4 — Categories */
      categories={
        <CategorySection
          id="kategori"
          categories={categories}
          isLoading={isLoadingCats}
        />
      }
      /* 5 — Map Preview */
      mapPreview={
        <MapPreview potentials={potentials} />
      }
      /* 6 — Latest Potentials */
      news={
        <PotensiTerbaruSection
          id="terbaru"
          potentials={potentials}
          isLoading={isLoadingLatest}
        />
      }
      /* 7 — Statistics (only if data exists) */
      statistics={hasStatistics ? <StatisticsSection id="statistik" summary={statistics} /> : null}
      /* 8 — FAQ */
      faq={<FAQSection />}
      /* 9 — Contact */
      contact={<ContactSection />}
    />
    </>
  );
}
