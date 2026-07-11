import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { Skeleton } from '@/components/atoms/Skeleton';
import type { PotentialListItem } from '@/types/Potential';
import placeholderCard from '@/assets/images/placeholder-card.svg';

export interface FeaturedPotentialsSectionProps {
  potentials: PotentialListItem[];
  isLoading?: boolean;
}

/** Mock star rating — backend does not provide ratings (per Phase 13E spec) */
function MockRating({ value = 4.5 }: { value?: number }) {
  return (
    <div className="flex items-center gap-1 text-[#D97706]">
      <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
      <span className="text-xs font-medium text-[#1F2937]">{value}</span>
    </div>
  );
}

/** Single card for the featured carousel */
function FeaturedCard({ item }: { item: PotentialListItem }) {
  return (
    <Link
      to={`/potentials/${item.category.slug}/${item.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2 rounded-[24px]"
      aria-label={`Lihat detail ${item.title}`}
    >
      <article className="rounded-[24px] bg-white border border-[#E5E7EB] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Cover image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[--neutral-100] shrink-0">
          <img
            src={item.cover_image_url ?? placeholderCard}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {/* Category badge — top-left */}
          <div className="absolute top-3 left-3">
            <Badge color="primary">{item.category.label}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col gap-2">
          <h3 className="text-h4 text-[#1F2937] line-clamp-2 leading-snug">
            {item.title}
          </h3>

          {/* Location + rating row */}
          <div className="flex items-center justify-between gap-2 mt-auto pt-1">
            {item.location?.address ? (
              <div className="flex items-center gap-1 text-caption text-[#6B7280] min-w-0">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#2F855A]" aria-hidden="true" />
                <span className="line-clamp-1">{item.location.address}</span>
              </div>
            ) : (
              <span />
            )}
            <MockRating />
          </div>
        </div>
      </article>
    </Link>
  );
}

/** Card width (px) used for scroll calculation */
const CARD_SCROLL_AMOUNT = 340;

/**
 * FeaturedPotentialsSection — Split 30/70 layout with CSS scroll-snap carousel.
 *
 * Left (30%): section kicker, title, description, prev/next buttons
 * Right (70%): CSS horizontal carousel with snap-start cards
 *
 * Uses native scroll-snap — zero additional dependencies.
 *
 * @see docs/design/UI_UX_SPEC.md §8 Featured UMKM Section
 */
export function FeaturedPotentialsSection({ potentials, isLoading = false }: FeaturedPotentialsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    carouselRef.current?.scrollBy({
      left: dir === 'left' ? -CARD_SCROLL_AMOUNT : CARD_SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  if (!isLoading && (!potentials || potentials.length === 0)) return null;

  return (
    <section className="section-padding bg-white" aria-label="Potensi unggulan desa">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* ── Left column (30%) ──────────────────────────────────── */}
          <div className="w-full lg:w-[30%] flex flex-col justify-center gap-6 lg:sticky lg:top-28 self-start">
            {/* Section kicker */}
            <p className="text-label uppercase tracking-widest text-[#D97706] font-semibold">
              Unggulan
            </p>

            {/* Title */}
            <h2 className="text-h2 text-[#0B3C35] leading-tight">
              Potensi Unggulan
            </h2>

            {/* Description */}
            <p className="text-body text-[#6B7280] leading-relaxed">
              Temukan potensi terbaik Desa Karamatwangi — dari wisata alam, produk lokal, hingga hasil pertanian berkualitas.
            </p>

            {/* CTA */}
            <Link to="/potentials" tabIndex={-1} className="self-start">
              <Button
                variant="primary"
                size="md"
                className="gap-2 bg-[#0B3C35] hover:bg-[#2F855A] rounded-full"
              >
                Lihat Semua Potensi
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>

            {/* Prev/Next carousel controls */}
            {!isLoading && potentials.length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                <IconButton
                  icon={<ChevronLeft className="w-5 h-5" />}
                  aria-label="Geser kiri"
                  variant="outline"
                  size="md"
                  onClick={() => scroll('left')}
                />
                <IconButton
                  icon={<ChevronRight className="w-5 h-5" />}
                  aria-label="Geser kanan"
                  variant="outline"
                  size="md"
                  onClick={() => scroll('right')}
                />
              </div>
            )}
          </div>

          {/* ── Right column (70%) — CSS Carousel ─────────────────── */}
          <div className="w-full lg:w-[70%] min-w-0">
            {isLoading ? (
              /* Loading skeleton */
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="shrink-0 w-[280px] md:w-[320px] space-y-3">
                    <Skeleton className="h-[240px] w-full rounded-[24px]" />
                    <Skeleton className="h-5 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-2"
                role="list"
                aria-label="Daftar potensi unggulan desa"
              >
                {potentials.map((item) => (
                  <div
                    key={item.id}
                    className="snap-start shrink-0 w-[280px] md:w-[320px]"
                    role="listitem"
                  >
                    <FeaturedCard item={item} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
