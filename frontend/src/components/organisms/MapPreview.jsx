import { useState, useRef, useEffect, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { getCategoryColor, getCategoryIcon } from '@/components/map/constants';
import { MAP_CENTER, MAP_ZOOM } from '@/components/map/constants';
import { HERO_1 } from '@/lib/imageCompositions';

const LazyMap = lazy(() => import('./MapPreviewMap'));

export function MapPreview({ potentials = [] }) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { rootMargin: '200px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const markers = useMemo(() => {
    return potentials
      .filter((p) => p.location?.latitude && p.location?.longitude)
      .slice(0, 6)
      .map((p) => ({
        id: p.id,
        lat: Number(p.location.latitude),
        lng: Number(p.location.longitude),
        title: p.title,
        slug: p.slug,
        category: p.category,
        image: p.cover_image_url,
      }));
  }, [potentials]);

  return (
    <section
      ref={sectionRef}
      id="chapter-4"
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(72px, 8vw, 104px)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${HERO_1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: prefersReducedMotion ? 'scroll' : 'fixed',
          filter: 'blur(32px) saturate(0.5)',
          transform: 'scale(1.1)',
          opacity: 0.15,
        }}
      />

      <div className="absolute inset-0 bg-white/60 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Bab 04 — Eksplorasi
          </p>
          <h2 className="mt-3 font-heading text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem] lg:text-[2.75rem]">
            Jelajahi Desa Melalui Peta
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)] max-w-[480px] mx-auto">
            Lihat di mana potensi-potensi Desa Karamatwangi berada. Klik marker untuk membaca cerita singkatnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <motion.div
            className="relative overflow-hidden rounded-[20px] bg-[#F4F7F5] border border-[#E0E8E4] shadow-[0_1px_3px_rgba(15,61,52,0.03),0_4px_12px_rgba(15,61,52,0.06)]"
            style={{ minHeight: 320, y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
          >
            {inView && (
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-[320px] text-[14px] text-[var(--text-muted)]">
                    <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mr-2" />
                    Memuat peta...
                  </div>
                }
              >
                <LazyMap markers={markers} center={MAP_CENTER} zoom={MAP_ZOOM} />
              </Suspense>
            )}
          </motion.div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold text-[var(--text-primary)]">
              Lokasi Unggulan
            </h3>

            <div className="flex flex-col gap-2">
              {markers.map((m) => (
                <Link
                  key={m.id}
                  to={`/potentials/${m.category?.slug || 'lainnya'}/${m.slug}`}
                  className="flex items-center gap-3 rounded-[16px] p-3 bg-white border border-[#E8EFEC] hover:bg-[#F0F4F2] hover:border-[#D1D9D6] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(15,61,52,0.04),0_8px_20px_rgba(15,61,52,0.06)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-[13px]"
                    style={{ background: getCategoryColor(m.category?.slug) }}
                  >
                    {getCategoryIcon(m.category?.slug)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-[var(--text-primary)] truncate">{m.title}</p>
                    <p className="text-[11px] text-[var(--text-muted)]">{m.category?.label || 'Lainnya'}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-caption)] flex-shrink-0" />
                </Link>
              ))}
            </div>

            <Link
              to="/map"
              className="mt-2 flex items-center justify-center gap-2 rounded-[16px] bg-[var(--color-primary)] px-5 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[var(--color-primary-dark)] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 shadow-[0_2px_8px_rgba(15,61,52,0.12)]"
            >
              <MapPin className="w-4 h-4" />
              Buka Peta Lengkap
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
