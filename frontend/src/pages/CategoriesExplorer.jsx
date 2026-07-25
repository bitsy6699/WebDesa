import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import {
  Activity,
  ArrowRight,
  Building2,
  Factory,
  Fish,
  Landmark,
  Layers,
  Map as MapIcon,
  Package,
  Sprout,
  Store,
  Trees,
  Tractor,
  Wheat,
} from 'lucide-react';
import { ProgressiveImage } from '@/components/atoms/ProgressiveImage';
import SEO from '@/components/SEO';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/structuredData';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useCategories } from '@/hooks/useCategories';
import { queryKeys } from '@/lib/queryKeys';
import { fetchPotentials } from '@/services/potential.service';
import { PageHero } from '@/components/molecules/PageHero';
import { PageSection } from '@/components/molecules/PageSection';
import { PageHeader } from '@/components/molecules/PageHeader';
import { EmptyState } from '@/components/molecules/EmptyState';

function getCategoryDescription(category) {
  if (category.description) {
    return category.description;
  }

  const label = category.label?.trim() || 'kategori';
  const slug = category.slug?.toLowerCase() || '';

  switch (slug) {
    case 'pertanian':
      return 'Potensi sektor pertanian yang menjadi tulang punggung ekonomi desa.';
    case 'peternakan':
      return 'Potensi sektor peternakan yang menguatkan pangan dan mata pencaharian masyarakat.';
    case 'produk-lokal':
    case 'umkm':
      return 'Potensi usaha lokal yang menghadirkan produk khas dan nilai ekonomi desa.';
    case 'wisata':
      return 'Potensi wisata yang memperkaya pengalaman dan menarik kunjungan ke desa.';
    case 'budaya':
      return 'Potensi budaya yang menjaga identitas, tradisi, dan warisan desa.';
    case 'sarana':
      return 'Potensi sarana pendukung yang memperkuat konektivitas dan aktivitas masyarakat.';
    default:
      return `Potensi sektor ${label.toLowerCase()} yang memperkuat ekonomi dan identitas desa.`;
  }
}

function CategoryIcon({ iconKey, label, color, size = 56 }) {
  const sharedClassName = 'shrink-0 transition-transform duration-250 lg:group-hover:rotate-6';
  const style = { width: size, height: size, color };
  const key = `${iconKey ?? label ?? ''}`.toLowerCase();

  if (['sprout', 'pertanian', 'wheat', 'agriculture', 'farm'].some((value) => key.includes(value))) {
    return <Sprout className={sharedClassName} style={style} aria-hidden="true" />;
  }

  if (['tree', 'trees', 'forest', 'wisata', 'nature'].some((value) => key.includes(value))) {
    return <Trees className={sharedClassName} style={style} aria-hidden="true" />;
  }

  if (['mountain', 'landmark', 'tourism', 'wisata'].some((value) => key.includes(value))) {
    return <Landmark className={sharedClassName} style={style} aria-hidden="true" />;
  }

  if (['fish', 'peternakan', 'seafood', 'aquatic'].some((value) => key.includes(value))) {
    return <Fish className={sharedClassName} style={style} aria-hidden="true" />;
  }

  if (['package', 'produk', 'product', 'umkm', 'business'].some((value) => key.includes(value))) {
    return <Package className={sharedClassName} style={style} aria-hidden="true" />;
  }

  if (['store', 'market', 'shop'].some((value) => key.includes(value))) {
    return <Store className={sharedClassName} style={style} aria-hidden="true" />;
  }

  if (['factory', 'industry', 'manufacture'].some((value) => key.includes(value))) {
    return <Factory className={sharedClassName} style={style} aria-hidden="true" />;
  }

  switch (key) {
    case 'tractor':
      return <Tractor className={sharedClassName} style={style} aria-hidden="true" />;
    case 'map':
      return <MapIcon className={sharedClassName} style={style} aria-hidden="true" />;
    case 'building':
      return <Building2 className={sharedClassName} style={style} aria-hidden="true" />;
    case 'activity':
      return <Activity className={sharedClassName} style={style} aria-hidden="true" />;
    case 'wheat':
      return <Wheat className={sharedClassName} style={style} aria-hidden="true" />;
    default:
      return <Layers className={sharedClassName} style={style} aria-hidden="true" />;
  }
}

const CategoryCard = memo(function CategoryCard({
  category,
  count,
  color,
  index,
}) {
  return (
    <Link
      key={category.id}
      to={`/potentials?category=${encodeURIComponent(category.slug)}`}
      className="categories-card group relative overflow-hidden rounded-[28px] border border-white/20 bg-[rgba(255,255,255,0.14)] p-7 shadow-[0_20px_50px_rgba(15,61,52,0.16)] backdrop-blur-[24px] transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hover:-translate-y-2 lg:hover:shadow-[0_24px_70px_rgba(15,61,52,0.24)]"
      style={{ animationDelay: `${index * 80}ms` }}
      aria-label={`Jelajahi kategori ${category.label}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_55%)]" />
      <div className="relative">
        <div className="overflow-hidden rounded-[24px] border border-white/20 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
          <div className="flex h-[84px] w-full items-center justify-center bg-white/20">
            {category.cover_image_url ? (
              <ProgressiveImage
                src={category.cover_image_url}
                alt={category.label}
                containerClassName="h-[84px] w-full"
                className="h-[84px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[84px] w-full items-center justify-center">
                <CategoryIcon iconKey={category.icon_key} label={category.label} color={color} size={56} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-7">
          <h3 className="text-lg font-bold leading-tight text-primary">{category.label}</h3>
          <p className="mt-3 text-[15px] leading-7 text-primary-dark">
            {getCategoryDescription(category)}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-primary/10 pt-5">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
            {count} Potensi
          </span>
          <span className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/20 p-3 text-primary transition-all duration-250 lg:group-hover:translate-x-1 lg:group-hover:bg-primary lg:group-hover:text-white">
            <ArrowRight className="h-4 w-4 transition-transform duration-250 lg:group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
});

export default function CategoriesExplorer() {
  const { data: categories = [], isLoading, isError, refetch } = useCategories();
  const items = categories;
  const shouldShowEmptyState = !isLoading && !isError && items.length === 0;

  const countQueries = useQueries({
    queries: items.map((category) => ({
      queryKey: queryKeys.categories.count(category.slug),
      queryFn: () => fetchPotentials({ category: category.slug, per_page: 1 }),
      staleTime: 5 * 60 * 1000,
      enabled: Boolean(category.slug),
    })),
  });

  const countsBySlug = useMemo(() => {
    return items.reduce((accumulator, category, index) => {
      const result = countQueries[index];
      accumulator[category.slug] = result?.data?.meta?.total ?? 0;
      return accumulator;
    }, {});
  }, [countQueries, items]);

  return (
    <>
    <SEO title="Menjelajahi Sektor Desa" description="Jelajahi kategori potensi Desa Karamatwangi — pertanian, UMKM, wisata, dan lainnya." path="/categories" image="/hero/hero-karamatwangi.jpg"
      schema={[
        collectionPageSchema('Kategori Potensi Desa', 'Jelajahi kategori potensi Desa Karamatwangi — pertanian, UMKM, wisata, dan lainnya.', '/categories'),
        breadcrumbSchema([
          { label: 'Beranda', to: '/' },
          { label: 'Kategori' },
        ]),
      ]}
    />
    <div className="min-h-screen bg-surface-alt text-primary">
      <PageHero
        image="/hero/hero-karamatwangi.jpg"
        imageAlt="Lanskap Desa Karamatwangi"
        title="Menjelajahi Sektor Desa"
        description="Setiap sektor menyimpan cerita berbeda — dari kebun teh yang tenang hingga pasar UMKM yang ramai."
        variant="editorial"
        breadcrumb={[
          { label: 'Beranda', to: '/' },
          { label: 'Kategori' },
        ]}
      />

      <PageSection container="wide" animated={false}>
        <PageHeader
          eyebrow="Pilih Kategori"
          title="Jelajahi potensi desa berdasarkan bidang yang ingin Anda telusuri."
          description="Setiap sektor menawarkan suasana yang berbeda—dari pertanian yang tenang hingga kultur dan ekonomi kreatif yang hidup."
          className="text-center max-w-[640px] mx-auto mb-10 lg:mb-12 [&_h2]:text-center [&_p]:text-center"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-[32px] md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="categories-skeleton relative overflow-hidden rounded-[28px] border border-white/20 bg-[rgba(255,255,255,0.14)] p-8 shadow-[0_20px_50px_rgba(15,61,52,0.16)] backdrop-blur-[24px]"
              >
                <Skeleton className="h-[84px] w-[84px] rounded-[24px]" />
                <Skeleton className="mt-8 h-7 w-2/3 rounded-full" />
                <Skeleton className="mt-4 h-4 w-full rounded-full" />
                <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
                <div className="mt-8 flex items-center justify-between border-t border-primary/10 pt-5">
                  <Skeleton className="h-4 w-24 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <EmptyState
            variant="error"
            title="Gagal Memuat Kategori"
            description="Terjadi gangguan saat mengambil data kategori. Silakan coba beberapa saat lagi."
            action={
              <button
                type="button"
                onClick={() => refetch()}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-lg"
              >
                Coba Lagi
              </button>
            }
          />
        ) : shouldShowEmptyState ? (
          <EmptyState
            variant="empty"
            title="Sektor Sedang Disiapkan"
            description="Kategori potensi sedang dalam pengisian data. Kembali lagi untuk menjelajahi sektor-sektor desa."
            action={
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-lg"
              >
                Kembali ke Beranda
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-[32px] md:grid-cols-2 xl:grid-cols-3">
            {items.map((category, index) => {
              const color = category.color_code ?? 'var(--color-primary)';
              const count = countsBySlug[category.slug] ?? 0;

              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  count={count}
                  color={color}
                  index={index}
                />
              );
            })}
          </div>
        )}
      </PageSection>
      <PageSection>
        <div className="text-center">
          <p className="text-[15px] text-neutral-500 max-w-[560px] mx-auto leading-relaxed">
            Setiap sektor memiliki potensi yang menunggu untuk dijelajahi. Temukan cerita di balik angka dan data.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/potentials"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-lg"
            >
              Lihat Semua Potensi
            </a>
            <a
              href="/map"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold text-primary-dark transition-all duration-200 hover:-translate-y-[1px] hover:bg-primary/5"
            >
              Lihat di Peta
            </a>
          </div>
        </div>
      </PageSection>
    </div>
    </>
  );
}
