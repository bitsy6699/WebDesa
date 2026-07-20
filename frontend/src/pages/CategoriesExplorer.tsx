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
import { Skeleton } from '@/components/atoms/Skeleton';
import { useCategories } from '@/hooks/useCategories';
import { fetchPotentials } from '@/services/potential.service';
import type { Category } from '@/types/Category';

function getCategoryDescription(category: Category): string {
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

function CategoryIcon({ iconKey, label, color, size = 56 }: { iconKey: string | null; label: string; color: string; size?: number }) {
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
}: {
  category: Category;
  count: number;
  color: string;
  index: number;
}) {
  return (
    <Link
      key={category.id}
      to={`/potentials?category=${encodeURIComponent(category.slug)}`}
      className="categories-card group relative overflow-hidden rounded-[30px] border border-white/20 bg-[rgba(255,255,255,0.14)] p-7 shadow-[0_20px_50px_rgba(15,61,52,0.16)] backdrop-blur-[24px] transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47] focus-visible:ring-offset-2 lg:hover:-translate-y-2 lg:hover:shadow-[0_24px_70px_rgba(15,61,52,0.24)]"
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
          <h3 className="text-[24px] font-bold leading-tight text-[#184D47]">{category.label}</h3>
          <p className="mt-3 text-[15px] leading-7 text-[#355D57]">
            {getCategoryDescription(category)}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-[#184D47]/10 pt-5">
          <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#184D47]/70">
            {count} Potensi
          </span>
          <span className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/20 p-3 text-[#184D47] transition-all duration-250 lg:group-hover:translate-x-1 lg:group-hover:bg-[#184D47] lg:group-hover:text-white">
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
      queryKey: ['categories', category.slug, 'potentials-count'],
      queryFn: () => fetchPotentials({ category: category.slug, per_page: 1 }),
      staleTime: 5 * 60 * 1000,
      enabled: Boolean(category.slug),
    })),
  });

  const countsBySlug = useMemo(() => {
    return items.reduce<Record<string, number>>((accumulator, category, index) => {
      const result = countQueries[index];
      accumulator[category.slug] = result?.data?.meta?.total ?? 0;
      return accumulator;
    }, {});
  }, [countQueries, items]);

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#184D47]">
      <style>{`
        @keyframes categoriesCardIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        .categories-card {
          animation: categoriesCardIn 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .categories-skeleton::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.42), transparent);
          animation: shimmer 1.5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .categories-card,
          .categories-skeleton::after,
          .categories-card * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
      <section className="relative flex h-[320px] items-end overflow-hidden px-6 py-12 sm:h-[340px] sm:px-8 lg:px-10">
        <img
          src="/hero/hero-karamatwangi.jpg"
          alt="Lanskap Desa Karamatwangi"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(15,61,52,0.92)_0%,rgba(24,77,71,0.82)_45%,rgba(15,61,52,0.35)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)]" />

        <div className="relative z-20 mx-auto w-full max-w-[1240px] text-left text-white">
          <nav className="mb-4 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.24em] text-white/70">
            <Link to="/" className="transition-colors hover:text-white">Beranda</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Kategori</span>
          </nav>
          <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80 backdrop-blur-sm">
            Eksplorasi
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.65rem]">
            Kategori Potensi Desa
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            Temukan seluruh potensi Desa Karamatwangi berdasarkan sektor unggulan, mulai dari pertanian, wisata, UMKM, budaya, hingga peternakan.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
        <div className="mx-auto mb-10 max-w-[640px] text-center lg:mb-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#184D47]/60">
            Pilih Kategori
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-[#184D47] sm:text-3xl">
            Jelajahi potensi desa berdasarkan bidang yang ingin Anda telusuri.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5F6B68] sm:text-[15px]">
            Setiap sektor menawarkan suasana yang berbeda—dari pertanian yang tenang hingga kultur dan ekonomi kreatif yang hidup.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-[32px] md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="categories-skeleton relative overflow-hidden rounded-[30px] border border-white/20 bg-[rgba(255,255,255,0.14)] p-8 shadow-[0_20px_50px_rgba(15,61,52,0.16)] backdrop-blur-[24px]"
              >
                <Skeleton className="h-[84px] w-[84px] rounded-[24px]" />
                <Skeleton className="mt-8 h-7 w-2/3 rounded-full" />
                <Skeleton className="mt-4 h-4 w-full rounded-full" />
                <Skeleton className="mt-2 h-4 w-5/6 rounded-full" />
                <div className="mt-8 flex items-center justify-between border-t border-[#184D47]/10 pt-5">
                  <Skeleton className="h-4 w-24 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="mx-auto flex max-w-[560px] flex-col items-center rounded-[36px] border border-white/20 bg-[rgba(255,255,255,0.14)] px-8 py-16 text-center shadow-[0_20px_50px_rgba(15,61,52,0.16)] backdrop-blur-[24px] sm:px-10">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#184D47]/12 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
              <svg viewBox="0 0 120 120" className="h-16 w-16 text-[#184D47]" fill="none" aria-hidden="true">
                <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="6" />
                <path d="M60 44v20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <circle cx="60" cy="76" r="4" fill="currentColor" />
              </svg>
            </div>
            <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[#184D47]">Kategori Tidak Tersedia</h3>
            <p className="mt-3 max-w-[440px] text-[15px] leading-7 text-[#5F6B68]">
              Kami tidak dapat mengambil kategori saat ini. Silakan coba lagi sebentar lagi.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-8 inline-flex items-center justify-center rounded-full border border-white/25 bg-[#184D47] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(24,77,71,0.16)] transition-all duration-200 hover:bg-[#0F3D34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47] focus-visible:ring-offset-2"
            >
              Coba Lagi
            </button>
          </div>
        ) : shouldShowEmptyState ? (
          <div className="mx-auto flex max-w-[560px] flex-col items-center rounded-[36px] border border-white/20 bg-[rgba(255,255,255,0.14)] px-8 py-16 text-center shadow-[0_20px_50px_rgba(15,61,52,0.16)] backdrop-blur-[24px] sm:px-10">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#184D47]/12 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
              <svg viewBox="0 0 120 120" className="h-16 w-16 text-[#184D47]" fill="none" aria-hidden="true">
                <rect x="24" y="24" width="72" height="72" rx="24" fill="currentColor" fillOpacity="0.12" />
                <path d="M44 78c0-10 8-18 18-18s18 8 18 18" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <circle cx="62" cy="50" r="12" stroke="currentColor" strokeWidth="6" />
                <path d="M36 38h16" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <path d="M68 36h16" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-8 text-2xl font-semibold tracking-tight text-[#184D47]">Belum Ada Kategori</h3>
            <p className="mt-3 max-w-[440px] text-[15px] leading-7 text-[#5F6B68]">
              Kategori akan muncul setelah data tersedia.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-white/25 bg-[#184D47] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(24,77,71,0.16)] transition-all duration-200 hover:bg-[#0F3D34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47] focus-visible:ring-offset-2"
            >
              Kembali ke Beranda
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[32px] md:grid-cols-2 xl:grid-cols-3">
            {items.map((category, index) => {
              const color = category.color_code ?? '#1F5F3F';
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
      </main>
    </div>
  );
}
