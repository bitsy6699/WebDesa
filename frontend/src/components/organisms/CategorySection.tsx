import { useNavigate } from 'react-router-dom';
import {
  Store,
  Tractor,
  Fish,
  Map as MapIcon,
  Building2,
  Activity,
  Layers,
} from 'lucide-react';
import { Skeleton } from '@/components/atoms/Skeleton';
import type { Category } from '@/types/Category';
import { clsx } from 'clsx';

export interface CategorySectionProps {
  categories: Category[];
  isLoading?: boolean;
}

/** Fallback categories shown when the API returns an empty list. */
const FALLBACK_CATEGORIES: Category[] = [
  { id: 'f1', label: 'UMKM', slug: 'umkm', icon_key: 'store', color_code: '#2F855A' },
  { id: 'f2', label: 'Pertanian', slug: 'pertanian', icon_key: 'tractor', color_code: '#D97706' },
  { id: 'f3', label: 'Peternakan', slug: 'peternakan', icon_key: 'fish', color_code: '#D97706' },
  { id: 'f4', label: 'Wisata', slug: 'wisata', icon_key: 'map', color_code: '#3B82F6' },
  { id: 'f5', label: 'Sarana', slug: 'sarana', icon_key: 'building', color_code: '#8B5CF6' },
  { id: 'f6', label: 'Kegiatan', slug: 'kegiatan', icon_key: 'activity', color_code: '#F59E0B' },
];

/** Map icon_key → Lucide component */
function CategoryIcon({
  iconKey,
  color,
  size = 24,
}: {
  iconKey: string | null;
  color: string;
  size?: number;
}) {
  const cls = `shrink-0 transition-colors duration-300`;
  const style = { width: size, height: size, color };

  switch (iconKey) {
    case 'store':   return <Store className={cls} style={style} aria-hidden="true" />;
    case 'tractor': return <Tractor className={cls} style={style} aria-hidden="true" />;
    case 'fish':    return <Fish className={cls} style={style} aria-hidden="true" />;
    case 'map':     return <MapIcon className={cls} style={style} aria-hidden="true" />;
    case 'building': return <Building2 className={cls} style={style} aria-hidden="true" />;
    case 'activity': return <Activity className={cls} style={style} aria-hidden="true" />;
    default:        return <Layers className={cls} style={style} aria-hidden="true" />;
  }
}

/**
 * CategorySection — Floating category bar that visually overlaps the hero bottom.
 *
 * Visual spec: DS v2.0
 * - Negative margin (-mt-16) creates an overlap effect over the section below hero
 * - White card with rounded-[28px] and shadow-xl
 * - Desktop: 6 columns; Tablet (md): 3 columns / 2 rows; Mobile: horizontal scroll
 * - Each item: vertical layout (icon top, label below), hover color shift
 *
 * @see docs/design/UI_UX_SPEC.md §6 Category Bar
 */
export function CategorySection({ categories, isLoading = false }: CategorySectionProps) {
  const navigate = useNavigate();
  const items = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  return (
    <section
      className="-mt-16 relative z-10 px-4 sm:px-6 lg:px-8"
      aria-label="Kategori potensi desa"
    >
      <div className="container mx-auto">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-6 md:p-8">
          {isLoading ? (
            /* Loading skeleton */
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3">
                  <Skeleton className="h-12 w-12 rounded-2xl" />
                  <Skeleton className="h-3 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            /* Category items */
            <div
              className={clsx(
                // Mobile: horizontal scroll
                'flex md:grid gap-4',
                'overflow-x-auto md:overflow-x-visible scrollbar-none',
                // Tablet: 3 cols; Desktop: 6 cols
                'md:grid-cols-3 lg:grid-cols-6',
              )}
            >
              {items.map((category) => {
                const color = category.color_code ?? '#16a34a';
                // Soft tint bg from hex — built at runtime via inline style
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => navigate(`/potentials?category=${category.slug}`)}
                    className={clsx(
                      'group flex flex-col items-center gap-2 p-4 rounded-2xl border border-transparent',
                      'transition-all duration-300 ease-out',
                      'cursor-pointer shrink-0 md:shrink w-24 md:w-auto',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2',
                    )}
                    style={{ backgroundColor: 'white' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = `${color}14`; // ~8% opacity tint
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'white';
                    }}
                    aria-label={`Lihat potensi kategori ${category.label}`}
                  >
                    {/* Icon container */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${color}18`, // ~10% opacity tint
                      }}
                    >
                      <CategoryIcon iconKey={category.icon_key} color={color} size={22} />
                    </div>

                    {/* Label */}
                    <span
                      className="text-label text-[#1F2937] group-hover:text-[#0B3C35] font-semibold text-center leading-tight whitespace-nowrap"
                      style={{ fontSize: '0.7rem' }}
                    >
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
