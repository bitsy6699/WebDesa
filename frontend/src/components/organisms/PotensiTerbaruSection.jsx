import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  LatestPotentialCard,
  LatestPotentialCardSkeleton,
} from '@/components/molecules/LatestPotentialCard';

export function PotensiTerbaruSection({ id, potentials, isLoading = false }) {
  const prefersReducedMotion = useReducedMotion();
  const isEmpty = !isLoading && potentials.length === 0;
  const items = potentials.slice(0, 6);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const scrollX = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-5%', '-10%']);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-page)',
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(72px, 8vw, 104px)',
      }}
      aria-label="Potensi terbaru desa"
    >
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div className="max-w-[600px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Bab 05 — Komunitas
            </p>
            <h2 className="mt-3 font-heading text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem] lg:text-[2.75rem]">
              Potensi Terbaru
            </h2>
            <p className="mt-3 text-[15px] text-[var(--text-muted)] max-w-[480px]">
              Jelajahi berbagai potensi terbaru yang telah dipublikasikan oleh Pemerintah Desa Karamatwangi.
            </p>
          </div>
          {!isEmpty && (
            <Link
              to="/potentials"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group shrink-0"
            >
              Lihat Semua
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <LatestPotentialCardSkeleton key={i} />
            ))}
          </div>
        ) : isEmpty ? null : (
          <>
            <div className="hidden lg:block overflow-x-clip py-4">
              <motion.div
                className="flex gap-7"
                style={prefersReducedMotion ? {} : { x: scrollX }}
              >
                {items.map((item) => (
                  <div key={item.id} className="min-w-[320px] w-[320px] shrink-0">
                    <LatestPotentialCard item={item} />
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="lg:hidden">
              <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="min-w-[280px] w-[280px] shrink-0 snap-start">
                    <LatestPotentialCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
