import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Store, Tractor, Fish, Map as MapIcon, Building2, Activity, Sprout, Trees, Layers } from 'lucide-react';
import { Skeleton } from '@/components/atoms/Skeleton';
import { HERO_2 } from '@/lib/imageCompositions';

const FALLBACK_CATEGORIES = [
  { id: 'f1', label: 'UMKM', slug: 'umkm', iconKey: 'store', colorCode: '#2F855A' },
  { id: 'f2', label: 'Pertanian', slug: 'pertanian', iconKey: 'tractor', colorCode: '#D97706' },
  { id: 'f3', label: 'Peternakan', slug: 'peternakan', iconKey: 'fish', colorCode: '#D97706' },
  { id: 'f4', label: 'Wisata', slug: 'wisata', iconKey: 'map', colorCode: '#3B82F6' },
  { id: 'f5', label: 'Sarana', slug: 'sarana', iconKey: 'building', colorCode: '#8B5CF6' },
  { id: 'f6', label: 'Kegiatan', slug: 'kegiatan', iconKey: 'activity', colorCode: '#F59E0B' },
];

function CategoryIcon({ iconKey, color, size = 24 }) {
  const cls = 'shrink-0 transition-colors duration-300';
  const style = { width: size, height: size, color };
  const key = `${iconKey ?? ''}`.toLowerCase();

  if (['sprout', 'pertanian', 'wheat', 'agriculture', 'farm'].some((value) => key.includes(value))) {
    return <Sprout className={cls} style={style} aria-hidden="true" />;
  }
  if (['tree', 'trees', 'forest', 'tree-pine', 'palmtree', 'nature', 'wisata'].some((value) => key.includes(value))) {
    return <Trees className={cls} style={style} aria-hidden="true" />;
  }
  if (['beef', 'fish', 'peternakan', 'livestock', 'aquatic'].some((value) => key.includes(value))) {
    return <Fish className={cls} style={style} aria-hidden="true" />;
  }
  if (['store', 'umkm', 'shop', 'market', 'business'].some((value) => key.includes(value))) {
    return <Store className={cls} style={style} aria-hidden="true" />;
  }
  if (['tractor', 'farm'].some((value) => key.includes(value))) {
    return <Tractor className={cls} style={style} aria-hidden="true" />;
  }
  if (['map', 'mountain', 'compass', 'tourism', 'sarana'].some((value) => key.includes(value))) {
    return <MapIcon className={cls} style={style} aria-hidden="true" />;
  }
  if (['building', 'activity', 'kegiatan'].some((value) => key.includes(value))) {
    return <Building2 className={cls} style={style} aria-hidden="true" />;
  }
  return <Layers className={cls} style={style} aria-hidden="true" />;
}

const cardEnter = (i) => ({
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, type: 'spring', stiffness: 90, damping: 14 },
  },
});

export function CategorySection({ id, categories, isLoading = false }) {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const items = categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-page)',
        paddingTop: 'clamp(40px, 5vw, 64px)',
        paddingBottom: 'clamp(56px, 6vw, 80px)',
      }}
      aria-label="Kategori potensi desa"
    >
      <div
        className="absolute -left-20 -top-20 w-64 h-64 rounded-full pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${HERO_2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1240px' }}>
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Kategori
          </p>
          <h2 className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2rem]">
            Jelajahi Berdasarkan Kategori
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-[900px] mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-3 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-5 max-w-[900px] mx-auto"
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {items.map((category, i) => {
              const color = category.colorCode ?? category.color_code ?? '#184D47';
              return (
                <motion.button
                  key={category.id}
                  variants={cardEnter(i)}
                  type="button"
                  onClick={() => navigate(`/potentials?category=${category.slug}`)}
                  className="group flex flex-col items-center gap-3 px-3 py-5 rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.97]"
                  aria-label={`Lihat potensi kategori ${category.label}`}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden relative transition-all duration-300 group-hover:shadow-[0_0_0_3px_${color}] group-hover:shadow-[${color}33]"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{
                        backgroundImage: `url(${HERO_2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                      <CategoryIcon iconKey={category.iconKey ?? category.icon_key} color={color} size={24} />
                    </div>
                  </div>

                  <span
                    className="font-semibold text-center leading-tight text-neutral-700 group-hover:text-primary-dark transition-colors duration-200"
                    style={{ fontSize: '0.75rem' }}
                  >
                    {category.label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
