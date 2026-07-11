import { Link } from 'react-router-dom';
import { MapPin, ImageOff } from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Skeleton } from '@/components/atoms/Skeleton';
import type { PotentialListItem } from '@/types/Potential';

export interface PotentialCardProps {
  potential: PotentialListItem;
}

/**
 * PotentialCard — Unified card for all potential categories.
 *
 * - Category badge: top-LEFT (per DESIGN_SYSTEM.md §8.7)
 * - Image ratio: 16:9 (DESIGN_SYSTEM.md §11 Card Thumbnails)
 * - Hover: lift + shadow-lg (DESIGN_SYSTEM.md §9.4)
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.7 Unified Potential Card
 */
export function PotentialCard({ potential }: PotentialCardProps) {
  const { title, slug, category, short_description, cover_image_url, location } = potential;

  return (
    <Link
      to={`/potentials/${category.slug}/${slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2 rounded-[--radius-lg]"
      aria-label={`Lihat detail ${title}`}
    >
      <article>
        <Card hoverable className="h-full flex flex-col">
          {/* Image — 16:9 aspect ratio */}
          <div className="relative aspect-video w-full overflow-hidden bg-[--neutral-100] shrink-0">
            {cover_image_url ? (
              <img
                src={cover_image_url}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-[--duration-slow] ease-[--ease-out] group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[--neutral-400]">
                <ImageOff className="w-8 h-8" aria-hidden="true" />
                <span className="text-caption text-[--neutral-400]">Tidak ada gambar</span>
              </div>
            )}

            {/* Category badge — top-left per DS §8.7 */}
            <div className="absolute top-3 left-3">
              <Badge color="primary">{category.label}</Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col gap-2">
            <h3 className="text-h4 text-[--neutral-900] line-clamp-2 leading-snug">
              {title}
            </h3>
            <p className="text-caption text-[--neutral-600] line-clamp-2 flex-1 leading-relaxed">
              {short_description}
            </p>
            {location?.address && (
              <div className="flex items-center gap-1.5 text-caption text-[--neutral-500] mt-auto pt-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[--color-primary]" aria-hidden="true" />
                <span className="line-clamp-1">{location.address}</span>
              </div>
            )}
          </div>
        </Card>
      </article>
    </Link>
  );
}

/** Loading skeleton mirroring PotentialCard dimensions. */
export function PotentialCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[--radius-lg] border border-[--border-default] bg-[--bg-surface] shadow-[var(--shadow-md)]"
      aria-hidden="true"
    >
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3 mt-3" />
      </div>
    </div>
  );
}
