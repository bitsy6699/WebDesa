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
 * Phase 13F spec:
 * - -mt-[60px] overlap from hero
 * - centered, max-width 1180px
 * - white, rounded-3xl, shadow-xl, p-8
 * - Desktop: 6 equal columns
 * - Tablet (md): 3 columns
 * - Mobile: horizontal scroll
 * - Each card: icon in soft colored circle, label, hover translateY(-6px) + shadow
 * - API data; fallback categories when empty
 *
 * @see docs/design/UI_UX_SPEC.md §6 Category Bar
 */
export function CategorySection({ categories, isLoading = false }: CategorySectionProps) {
  const navigate = useNavigate();
  const items = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  return (
    <section
      className="relative z-10 px-4 sm:px-6 lg:px-8"
      style={{ marginTop: '-60px' }}
      aria-label="Kategori potensi desa"
    >
      <div className="mx-auto" style={{ maxWidth: '1180px' }}>
        <div
          className="bg-white rounded-3xl p-6 md:p-8"
          style={{ boxShadow: '0 8px 48px rgba(0,0,0,0.12)' }}
        >
          {isLoading ? (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-4">
                  <Skeleton className="h-14 w-14 rounded-full" />
                  <Skeleton className="h-3 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={clsx(
                'flex md:grid gap-3',
                'overflow-x-auto md:overflow-x-visible scrollbar-none',
                'md:grid-cols-3 lg:grid-cols-6',
              )}
            >
              {items.map((category) => {
                const color = category.color_code ?? '#16a34a';
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => navigate(`/potentials?category=${category.slug}`)}
                    className={clsx(
                      'group flex flex-col items-center gap-3 px-3 py-5',
                      'rounded-2xl border border-transparent bg-white',
                      'transition-all duration-300 ease-out',
                      'hover:-translate-y-[6px] hover:border-gray-100',
                      'cursor-pointer shrink-0 md:shrink w-[88px] md:w-auto',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2',
                    )}
                    style={{
                      boxShadow: 'none',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        '0 8px 24px rgba(0,0,0,0.10)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                    }}
                    aria-label={`Lihat potensi kategori ${category.label}`}
                  >
                    {/* Icon circle */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0"
                      style={{ backgroundColor: `${color}1a` }}
                    >
                      <CategoryIcon iconKey={category.icon_key} color={color} size={24} />
                    </div>

                    {/* Label */}
                    <span
                      className="font-semibold text-center leading-tight text-[#374151] group-hover:text-[#0B3C35] transition-colors duration-200"
                      style={{ fontSize: '0.72rem' }}
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
