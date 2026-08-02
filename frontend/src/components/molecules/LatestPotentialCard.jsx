import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/atoms/Skeleton';
import { SpotlightSurface } from '@/components/atoms/SpotlightSurface';
import { glassSurface } from '@/lib/glassStyles';
import placeholderCard from '@/assets/images/placeholder-card.svg';

const CARD_SHADOW = '0 2px 8px rgba(15,61,52,0.04), 0 8px 24px rgba(15,61,52,0.06)';

const GLASS_CARD_STYLE = {
  ...glassSurface,
  background: 'rgba(255,255,255,0.12)',
  boxShadow: CARD_SHADOW,
};

const CATEGORY_BADGE = {
  pertanian: { bg: 'rgba(22,101,52,0.18)', text: '#166534' },
  peternakan: { bg: 'rgba(5,150,105,0.18)', text: '#059669' },
  wisata: { bg: 'rgba(217,119,6,0.18)', text: '#D97706' },
  umkm: { bg: 'rgba(234,88,12,0.18)', text: '#EA580C' },
  budaya: { bg: 'rgba(147,51,234,0.18)', text: '#9333EA' },
};

function getCategoryBadgeStyle(slug) {
  return CATEGORY_BADGE[slug] ?? { bg: 'rgba(22,163,74,0.18)', text: '#184D47' };
}

function formatPublishDate(createdAt) {
  if (!createdAt) return null;

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return null;

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours <= 0) return 'Baru saja';
    return `${diffHours} jam lalu`;
  }
  if (diffDays === 1) return '1 hari lalu';
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 minggu lalu' : `${weeks} minggu lalu`;
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function CategoryBadge({ label, slug }) {
  const { bg, text } = getCategoryBadgeStyle(slug);

  return (
    <span
      className="inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{ background: bg, color: text }}
    >
      {label}
    </span>
  );
}

export const LatestPotentialCard = memo(
  function LatestPotentialCard({ item }) {
    const prefersReducedMotion = useReducedMotion();
    const publishLabel = formatPublishDate(item.created_at);
    const detailHref = `/potentials/${item.category.slug}/${item.slug}`;
    const enableHoverMotion = !prefersReducedMotion;

    return (
      <Link
        to={detailHref}
        className="group flex h-full cursor-pointer flex-col rounded-[24px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2"
        aria-label={`Lihat detail ${item.title}`}
      >
        <motion.article
          className={[
            'flex h-full flex-col overflow-hidden rounded-[24px]',
            enableHoverMotion
              ? 'transition-[transform,box-shadow] duration-300 ease-out [@media(hover:hover)]:group-hover:-translate-y-1 [@media(hover:hover)]:group-hover:shadow-[0_4px_12px_rgba(15,61,52,0.06),0_16px_40px_rgba(15,61,52,0.10)]'
              : '',
          ].join(' ')}
          style={GLASS_CARD_STYLE}
          whileTap={enableHoverMotion ? { scale: 0.98 } : undefined}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <SpotlightSurface className="relative aspect-video shrink-0 overflow-hidden rounded-t-[24px] bg-[#E8EEEB]" disabled={!enableHoverMotion} spotlightClassName="opacity-80">
            <img
              src={item.cover_image_url ?? placeholderCard}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-[800ms] ease-out [@media(hover:hover)]:group-hover:scale-[1.015]"
              loading="lazy"
              decoding="async"
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, rgba(8,24,18,0.12) 0%, rgba(8,24,18,0.72) 100%)',
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[rgba(8,24,18,0)] transition-colors duration-300 ease-out [@media(hover:hover)]:group-hover:bg-[rgba(8,24,18,0.14)]"
              aria-hidden="true"
            />
          </SpotlightSurface>

          <div className="flex flex-1 flex-col gap-3 p-5 pb-6">
            <CategoryBadge label={item.category.label} slug={item.category.slug} />

            {item.location?.address && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
                <span className="line-clamp-1">{item.location.address}</span>
              </div>
            )}

            <h3 className="line-clamp-2 text-lg font-bold leading-snug text-primary-dark">
              {item.title}
            </h3>

            {item.short_description && (
              <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
                {item.short_description}
              </p>
            )}

            {publishLabel && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <time dateTime={item.created_at}>{publishLabel}</time>
              </div>
            )}

            <div className="mt-auto pt-2">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(24,77,71,0.12)] bg-white/35 px-4 py-2.5 text-sm font-semibold text-primary-dark transition-colors duration-300 ease-out [@media(hover:hover)]:group-hover:bg-[var(--color-primary)] [@media(hover:hover)]:group-hover:text-white"
              >
                Lihat Detail
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  },
  (prev, next) =>
    prev.item.id === next.item.id &&
    prev.item.created_at === next.item.created_at &&
    prev.item.cover_image_url === next.item.cover_image_url,
);

export function LatestPotentialCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-[24px]"
      style={GLASS_CARD_STYLE}
      aria-hidden="true"
      aria-busy="true"
    >
      <div className="relative aspect-video shrink-0 overflow-hidden rounded-t-[24px]">
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-4 w-2/3 rounded-lg" />
        <Skeleton className="h-6 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-4/5 rounded-lg" />
        <Skeleton className="mt-2 h-4 w-1/3 rounded-lg" />
        <Skeleton className="mt-auto h-10 w-36 rounded-full" />
      </div>
    </div>
  );
}
