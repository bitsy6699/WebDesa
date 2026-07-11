import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Clock } from 'lucide-react';
import { Skeleton } from '@/components/atoms/Skeleton';
import type { PotentialListItem } from '@/types/Potential';
import placeholderCard from '@/assets/images/placeholder-card.svg';

export interface PotensiTerbaruSectionProps {
  potentials: PotentialListItem[];
  isLoading?: boolean;
}

function PotensiCard({ item }: { item: PotentialListItem }) {
  return (
    <Link
      to={`/potentials/${item.category.slug}/${item.slug}`}
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F855A] focus-visible:ring-offset-2 rounded-3xl block"
      aria-label={`Lihat detail ${item.title}`}
    >
      <article
        className="rounded-3xl bg-white overflow-hidden h-full flex flex-col transition-all duration-300"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)';
        }}
      >
        {/* Cover image */}
        <div className="relative overflow-hidden bg-[#F3F4F6] shrink-0" style={{ aspectRatio: '16/9' }}>
          <img
            src={item.cover_image_url ?? placeholderCard}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide"
              style={{ backgroundColor: item.category.color_code ?? '#16a34a' }}
            >
              {item.category.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col gap-2">
          <h3
            className="font-bold text-[#1F2937] line-clamp-2 leading-snug group-hover:text-[#0B3C35] transition-colors duration-200"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem' }}
          >
            {item.title}
          </h3>
          <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed flex-1">
            {item.short_description}
          </p>
          <div className="flex items-center justify-between gap-2 mt-auto pt-2">
            {item.location?.address ? (
              <div className="flex items-center gap-1 text-xs text-[#6B7280] min-w-0">
                <MapPin className="w-3 h-3 shrink-0 text-[#2F855A]" aria-hidden="true" />
                <span className="line-clamp-1">{item.location.address}</span>
              </div>
            ) : (
              <span />
            )}
            <ArrowRight className="w-4 h-4 text-[#0B3C35] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </article>
    </Link>
  );
}

function PotensiCardSkeleton() {
  return (
    <div className="rounded-3xl bg-white overflow-hidden" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
      <Skeleton className="w-full rounded-none" style={{ aspectRatio: '16/9' } as React.CSSProperties} />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

/**
 * PotensiTerbaruSection — Replaces NewsSection.
 *
 * Displays the latest potentials from the API in a 3-column grid (desktop).
 * This section focuses on village potentials, not news articles.
 *
 * ACA-compatible: renders dynamically from API, no category-specific logic.
 *
 * @see docs/engineering/API_SPEC.md §5.1 List Potentials
 */
export function PotensiTerbaruSection({ potentials, isLoading = false }: PotensiTerbaruSectionProps) {
  if (!isLoading && potentials.length === 0) return null;

  return (
    <section
      className="section-padding bg-[#F8F9FA]"
      aria-label="Potensi terbaru desa"
    >
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D97706]" aria-hidden="true" />
              <p className="text-label uppercase tracking-widest text-[#D97706] font-semibold">
                Terbaru
              </p>
            </div>
            <h2 className="text-h2 text-[#0B3C35] leading-tight">
              Potensi Terbaru
            </h2>
            <p className="text-body text-[#6B7280] max-w-md leading-relaxed">
              Temukan potensi-potensi terbaru yang baru saja ditambahkan dari seluruh kategori Desa Karamatwangi.
            </p>
          </div>

          <Link to="/potentials" tabIndex={-1} className="shrink-0 self-start sm:self-auto">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#0B3C35] border border-[#0B3C35] hover:bg-[#0B3C35] hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3C35]"
            >
              Lihat Semua Potensi
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </Link>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role={isLoading ? undefined : 'list'}
          aria-label={isLoading ? undefined : 'Potensi terbaru desa'}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <PotensiCardSkeleton key={i} />)
            : potentials.slice(0, 6).map((item) => (
                <div key={item.id} role="listitem">
                  <PotensiCard item={item} />
                </div>
              ))}
        </div>

      </div>
    </section>
  );
}
