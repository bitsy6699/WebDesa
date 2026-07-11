import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import type { NewsArticle } from '@/types/News';
import placeholderCard from '@/assets/images/placeholder-card.svg';

export interface NewsSectionProps {
  articles?: NewsArticle[];
}

/** Format ISO date string to Indonesian locale. */
function formatDate(isoDate: string): { day: string; monthYear: string } {
  const d = new Date(isoDate);
  return {
    day: d.toLocaleDateString('id-ID', { day: '2-digit' }),
    monthYear: d.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }),
  };
}

/** Single news card with floating date badge. */
function NewsCard({ article }: { article: NewsArticle }) {
  const { day, monthYear } = formatDate(article.date);
  const imgSrc = article.cover_image_url ?? placeholderCard;

  return (
    <article
      className="group bg-white rounded-[24px] border border-[#E5E7EB] shadow-md
                 hover:shadow-2xl hover:-translate-y-1
                 transition-all duration-300 ease-out
                 overflow-hidden flex flex-col h-full"
    >
      {/* Cover image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#F1F5F9] shrink-0">
        <img
          src={imgSrc}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Floating date badge — bottom-left */}
        <div className="absolute bottom-3 left-3 flex flex-col items-center justify-center
                        bg-[#0B3C35] text-white rounded-2xl px-3 py-2 min-w-[52px] shadow-lg">
          <span className="text-lg font-bold leading-none">{day}</span>
          <span className="text-[10px] font-medium leading-none mt-0.5 uppercase tracking-wide opacity-80">
            {monthYear}
          </span>
        </div>

        {/* Category badge — top-right */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#0B3C35] uppercase tracking-wider shadow-sm">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <h3 className="text-h4 text-[#1F2937] line-clamp-2 leading-snug group-hover:text-[#0B3C35] transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-caption text-[#6B7280] line-clamp-3 leading-relaxed flex-1">
          {article.excerpt}
        </p>

        {/* Read more */}
        <div className="mt-auto pt-2">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F855A] group-hover:text-[#0B3C35] transition-colors duration-200">
            Baca Selengkapnya
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

const CARD_SCROLL_AMOUNT = 360;

/**
 * NewsSection — Landing page news & activities section.
 *
 * Desktop: 3-column grid.
 * Mobile/Tablet: CSS scroll-snap horizontal carousel with prev/next controls.
 * Mock data allowed (no backend endpoint).
 *
 * @see docs/design/UI_UX_SPEC.md §9 News Section
 * @see docs/design/RESPONSIVE_GUIDELINES.md §14 News Section
 */
export function NewsSection({ articles = [] }: NewsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    carouselRef.current?.scrollBy({
      left: dir === 'left' ? -CARD_SCROLL_AMOUNT : CARD_SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  if (articles.length === 0) return null;

  return (
    <section className="section-padding bg-[#F8F9FA]" aria-label="Berita dan kegiatan desa">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-label uppercase tracking-widest text-[#D97706] font-semibold">
              Terbaru
            </p>
            <h2 className="text-h2 text-[#0B3C35] leading-tight">
              Berita &amp; Kegiatan
            </h2>
            <p className="text-body text-[#6B7280] max-w-md leading-relaxed">
              Ikuti perkembangan terkini dan kegiatan aktif Desa Karamatwangi.
            </p>
          </div>

          {/* Carousel controls — visible on mobile/tablet */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <IconButton
              icon={<ChevronLeft className="w-5 h-5" />}
              aria-label="Artikel sebelumnya"
              variant="outline"
              size="md"
              onClick={() => scroll('left')}
            />
            <IconButton
              icon={<ChevronRight className="w-5 h-5" />}
              aria-label="Artikel selanjutnya"
              variant="outline"
              size="md"
              onClick={() => scroll('right')}
            />
          </div>

          {/* View all CTA — desktop only */}
          <div className="hidden lg:block shrink-0">
            <Link to="/potentials" tabIndex={-1}>
              <Button variant="outline" size="sm" className="gap-2 rounded-full border-[#0B3C35] text-[#0B3C35] hover:bg-[#0B3C35] hover:text-white">
                Lihat Semua Berita
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Desktop: 3-column grid ──────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6" role="list" aria-label="Artikel berita">
          {articles.map((article) => (
            <div key={article.id} role="listitem">
              <NewsCard article={article} />
            </div>
          ))}
        </div>

        {/* ── Mobile/Tablet: horizontal scroll carousel ───────────────── */}
        <div
          ref={carouselRef}
          className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2"
          role="list"
          aria-label="Artikel berita"
        >
          {articles.map((article) => (
            <div
              key={article.id}
              role="listitem"
              className="snap-start shrink-0 w-[300px] sm:w-[340px]"
            >
              <NewsCard article={article} />
            </div>
          ))}
        </div>

        {/* Mobile view all CTA */}
        <div className="lg:hidden flex justify-center mt-8">
          <Link to="/potentials" tabIndex={-1}>
            <Button variant="outline" size="sm" className="gap-2 rounded-full border-[#0B3C35] text-[#0B3C35]">
              Lihat Semua Berita
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
