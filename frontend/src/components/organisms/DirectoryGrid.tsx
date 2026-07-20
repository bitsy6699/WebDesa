import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import type { PotentialListItem } from '@/types/Potential';
import type { PaginationMeta } from '@/types/api';
import type { Category } from '@/types/Category';
import { Skeleton } from '@/components/atoms/Skeleton';
import { glassSurface, glassPanel } from '@/lib/glassStyles';

export interface DirectoryGridProps {
  potentials: PotentialListItem[];
  featuredPotentials: PotentialListItem[];
  allPotentialsForCounts: PotentialListItem[];
  categories: Category[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  onCategoryClick: (slug: string | null) => void;
  showEditorialFlow: boolean;
  activeSort: string;
}

// ── Editorial Magazine Card ────────────────────────────────────────────────
function EditorialCard({ item, index }: { item: PotentialListItem; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const getAspectClass = () => {
    switch (index % 6) {
      case 0: // Large
        return 'lg:col-span-2 aspect-[4/3] sm:aspect-video lg:aspect-[16/10]';
      case 1: // Small
      case 2: // Small
        return 'lg:col-span-1 aspect-square';
      case 3: // Wide
        return 'lg:col-span-2 aspect-[4/3] sm:aspect-video lg:aspect-[21/9]';
      case 4: // Portrait
      case 5: // Portrait
        return 'lg:col-span-1 aspect-[3/4]';
      default:
        return 'aspect-video';
    }
  };

  return (
    <Link
      to={`/potentials/${item.category.slug}/${item.slug}`}
      className={`group block overflow-hidden rounded-[32px] relative cursor-pointer ${getAspectClass()} transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(24,77,71,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2`}
      style={{
        ...glassSurface,
        boxShadow: isHovered ? '0 26px 64px rgba(24,77,71,0.14)' : '0 14px 36px rgba(15,61,52,0.05)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={item.cover_image_url || '/assets/images/placeholder-card.svg'}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        loading="lazy"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-0 h-full w-1/3"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          }}
          animate={prefersReducedMotion ? undefined : { x: ['-100%', '300%'] }}
          transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7 z-10 text-white text-left">
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-white/80 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 w-fit mb-3">
          {item.category.label}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold leading-tight line-clamp-2">
          {item.title}
        </h3>
        {item.location?.address && (
          <div className="flex items-center gap-1.5 text-xs text-white/80 mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{item.location.address}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

// ── Standard Glassmorphism Card ─────────────────────────────────────────────
function RegularGlassCard({ item }: { item: PotentialListItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/potentials/${item.category.slug}/${item.slug}`}
      className="group block overflow-hidden rounded-[28px] relative transition-all duration-250 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2"
      style={{
        ...glassSurface,
        boxShadow: isHovered ? '0 18px 40px rgba(24, 77, 71, 0.08)' : '0 10px 30px rgba(15,61,52,0.04)',
        transform: isHovered ? 'translateY(-4px) scale(1.01)' : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
        <img
          src={item.cover_image_url || '/assets/images/placeholder-card.svg'}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#184D47] bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/40">
            {item.category.label}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-2 text-left">
        <h4 className="text-lg font-bold text-[#184D47] line-clamp-1 leading-tight">
          {item.title}
        </h4>
        <p className="text-xs leading-relaxed text-[#5F6B68] line-clamp-2">
          {item.short_description}
        </p>
        {item.location?.address && (
          <div className="flex items-center gap-1.5 text-xs text-[#5F6B68] mt-2">
            <MapPin className="w-3.5 h-3.5 text-[#184D47]" aria-hidden="true" />
            <span className="line-clamp-1">{item.location.address}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

// ── Skeletons ───────────────────────────────────────────────────────────────
function EditorialCardSkeleton({ index }: { index: number }) {
  const getAspectClass = () => {
    switch (index % 6) {
      case 0:
        return 'lg:col-span-2 aspect-[4/3] sm:aspect-video lg:aspect-[16/10]';
      case 1:
      case 2:
        return 'lg:col-span-1 aspect-square';
      case 3:
        return 'lg:col-span-2 aspect-[4/3] sm:aspect-video lg:aspect-[21/9]';
      case 4:
      case 5:
        return 'lg:col-span-1 aspect-[3/4]';
      default:
        return 'aspect-video';
    }
  };

  return (
    <div
      className={`rounded-[32px] relative overflow-hidden bg-white/20 border border-white/30 ${getAspectClass()}`}
      aria-hidden="true"
    >
      <Skeleton className="absolute inset-0 w-full h-full rounded-[32px]" />
      <div className="absolute inset-x-0 bottom-0 p-6 space-y-3 z-10">
        <Skeleton className="h-5 w-1/4 rounded-full" />
        <Skeleton className="h-6 w-3/4 rounded" />
      </div>
    </div>
  );
}

// ── Centered Glass Pagination ────────────────────────────────────────────────
function CenteredGlassPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav
      aria-label="Navigasi halaman"
      className="flex items-center justify-center gap-1.5 p-2 mx-auto w-fit"
      style={{
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        borderRadius: '9999px',
        boxShadow: '0 12px 32px rgba(15, 61, 52, 0.05)',
      }}
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-10 w-10 rounded-full hover:bg-white/50 disabled:opacity-30 disabled:hover:bg-transparent text-[#184D47] transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1">
        {generatePageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`h-10 min-w-10 rounded-full px-3 text-xs font-semibold transition-all duration-200 ease-out ${
                currentPage === page
                  ? 'bg-[#184D47] text-white shadow-[0_10px_24px_rgba(24,77,71,0.18)] scale-105'
                  : 'text-[#184D47] hover:bg-white/50 hover:shadow-sm'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-[#5F6B68]/60 text-xs">
              ...
            </span>
          )
        )}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-10 w-10 rounded-full hover:bg-white/50 disabled:opacity-30 disabled:hover:bg-transparent text-[#184D47] transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Halaman selanjutnya"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

export function DirectoryGrid({
  potentials,
  featuredPotentials,
  allPotentialsForCounts: _allPotentialsForCounts,
  categories: _categories,
  meta,
  isLoading,
  isError,
  currentPage,
  onPageChange,
  onClearFilters,
  onCategoryClick: _onCategoryClick,
  showEditorialFlow,
  activeSort,
}: DirectoryGridProps) {
  // Sort the potentials list dynamically on client side
  const getSortedPotentials = () => {
    const list = [...potentials];
    if (activeSort === 'name_asc') {
      return list.sort((a, b) => a.title.localeCompare(b.title, 'id'));
    }
    if (activeSort === 'name_desc') {
      return list.sort((a, b) => b.title.localeCompare(a.title, 'id'));
    }
    return list; // default 'latest' sorting from API
  };

  const sortedList = getSortedPotentials();

  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-8 py-2" aria-busy="true" aria-label="Memuat data potensi">
        {showEditorialFlow ? (
          <>
            {/* Featured Story Skeleton */}
            <div
              className="w-full max-w-[1200px] mx-auto rounded-[40px] aspect-[16/9] lg:aspect-[21/9] bg-white/20 border border-white/30 p-6 sm:p-8 flex flex-col lg:flex-row gap-6 shadow-[0_20px_60px_rgba(15,61,52,0.06)] backdrop-blur-[24px]"
              aria-hidden="true"
            >
              <Skeleton className="w-full lg:w-3/5 h-full rounded-[28px]" />
              <div className="flex-1 space-y-4 py-4">
                <Skeleton className="h-6 w-1/4 rounded-full" />
                <Skeleton className="h-10 w-3/4 rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>
            </div>

            {/* Editorial Gallery Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 grid-flow-row-dense">
              {Array.from({ length: 6 }).map((_, i) => (
                <EditorialCardSkeleton key={i} index={i} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[28px] overflow-hidden bg-white/20 border border-white/35 aspect-[4/3] flex flex-col shadow-[0_14px_36px_rgba(15,61,52,0.05)]"
              >
                <Skeleton className="w-full aspect-video rounded-none" />
                <div className="p-5 flex-1 space-y-3">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-full max-w-md rounded-[32px] border border-white/50 bg-white/60 p-8 shadow-[0_20px_60px_rgba(15,61,52,0.06)] backdrop-blur-[24px]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#184D47]/10 text-[#184D47] mb-6 border border-white/50">
            <Compass className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-[#184D47]">Gagal Memuat Data</h3>
          <p className="mt-2 max-w-sm mx-auto text-sm text-[#5F6B68] leading-relaxed">
            Terjadi kesalahan saat mengambil data potensi. Silakan periksa koneksi Anda dan coba lagi.
          </p>
          <button
            onClick={onClearFilters}
            className="mt-6 inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-[#184D47] hover:bg-[#0F3D34] transition-all shadow-[0_10px_24px_rgba(24,77,71,0.16)]"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (sortedList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-full max-w-md rounded-[32px] border border-white/50 bg-white/60 p-8 shadow-[0_20px_60px_rgba(15,61,52,0.06)] backdrop-blur-[24px]">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#184D47]/10 text-[#184D47] mb-6 border border-white/50">
            <Compass className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-[#184D47]">Belum Ada Potensi</h3>
          <p className="mt-2 max-w-md mx-auto text-sm text-[#5F6B68] leading-relaxed">
            Potensi desa yang Anda cari belum tersedia atau belum dipublikasikan oleh administrator.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onClearFilters}
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-[#184D47] border border-[#184D47]/20 hover:bg-[#184D47]/5 transition-all"
            >
              Bersihkan Filter
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-[#184D47] hover:bg-[#0F3D34] transition-all shadow-[0_10px_24px_rgba(24,77,71,0.16)]"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Define Featured Story and Editorial Gallery items
  const featuredStoryItem = featuredPotentials[0];
  const editorialGalleryItems = featuredPotentials.slice(1);

  return (
    <div className="space-y-10 sm:space-y-12" id="potentials-list-container">
      {showEditorialFlow && (
        <>
          {/* 3 ── Featured Story Banner */}
          {featuredStoryItem && (
            <section className="space-y-6">
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold uppercase tracking-widest text-[#184D47]/60">Cerita Utama</span>
                <h2 className="text-2xl font-bold text-[#184D47]">Unggulan Terpilih</h2>
              </div>
              <div
                className="relative overflow-hidden flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 p-6 lg:p-8 w-full max-w-[1200px] mx-auto rounded-[40px] transition-all duration-300 group hover:-translate-y-1"
                style={{
                  ...glassPanel,
                  background: 'rgba(255, 255, 255, 0.45)',
                  boxShadow: '0 24px 64px rgba(24, 77, 71, 0.04)',
                }}
              >
                {/* Image */}
                <div className="relative w-full lg:w-3/5 aspect-video lg:aspect-[16/10] overflow-hidden rounded-[28px] shrink-0">
                  <img
                    src={featuredStoryItem.cover_image_url || '/assets/images/placeholder-card.svg'}
                    alt={featuredStoryItem.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center items-start text-left space-y-4 py-4">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#184D47]/80 bg-white/60 px-3 py-1 rounded-full border border-white/50">
                    {featuredStoryItem.category.label}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#184D47] leading-tight">
                    {featuredStoryItem.title}
                  </h2>
                  <p className="text-[#5F6B68] text-sm sm:text-base leading-relaxed line-clamp-4">
                    {featuredStoryItem.short_description}
                  </p>
                  {featuredStoryItem.location?.address && (
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#5F6B68]">
                      <MapPin className="w-4 h-4 text-[#184D47]" />
                      <span>{featuredStoryItem.location.address}</span>
                    </div>
                  )}
                  <Link
                    to={`/potentials/${featuredStoryItem.category.slug}/${featuredStoryItem.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#184D47] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0F3D34] shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Lihat Detail
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* 4 ── Editorial Gallery */}
          {editorialGalleryItems.length > 0 && (
            <section className="space-y-6">
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold uppercase tracking-widest text-[#184D47]/60">Eksplorasi</span>
                <h2 className="text-2xl font-bold text-[#184D47]">Galeri Editorial</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 grid-flow-row-dense">
                {editorialGalleryItems.map((item, index) => (
                  <EditorialCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </section>
          )}

        </>
      )}

      {/* 6 ── All Potentials Grid */}
      <section className="space-y-6">
        <div className="flex flex-col items-start">
          <span className="text-xs font-bold uppercase tracking-widest text-[#184D47]/60">
            {showEditorialFlow ? 'Daftar Lengkap' : 'Hasil Pencarian'}
          </span>
          <h2 className="text-2xl font-bold text-[#184D47]">
            {showEditorialFlow ? 'Semua Potensi Desa' : 'Daftar Potensi'}
          </h2>
        </div>
        
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
          role="list"
          aria-label="Daftar potensi desa"
        >
          {sortedList.map((item) => (
            <div key={item.id} role="listitem">
              <RegularGlassCard item={item} />
            </div>
          ))}
        </div>
      </section>

      {/* 7 ── Pagination */}
      {meta && meta.last_page > 1 && (
        <div className="pt-4 sm:pt-6">
          <CenteredGlassPagination
            currentPage={currentPage}
            totalPages={meta.last_page}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
