import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  FeaturedLargeCard,
  FeaturedSmallCard,
  FeaturedLargeCardSkeleton,
  FeaturedSmallCardSkeleton,
} from '@/components/molecules/FeaturedPotentialCard';
import { HERO_1 } from '@/lib/imageCompositions';

const stag = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const childUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 16 } },
};

export function FeaturedPotentialsSection({ id, potentials, isLoading = false }) {
  const prefersReducedMotion = useReducedMotion();
  const isEmpty = !isLoading && (!potentials || potentials.length === 0);
  const [featured, ...rest] = potentials;
  const smallCards = rest.slice(0, 2);

  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-surface-alt)',
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(72px, 8vw, 104px)',
      }}
      aria-label="Potensi unggulan desa"
    >
      <div
        className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${HERO_1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10"
          variants={stag}
          initial="hidden"
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-[600px]">
            <motion.p variants={childUp} className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Bab 03 — Potensi
            </motion.p>
            <motion.h2 variants={childUp} className="mt-3 font-heading text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem] lg:text-[2.75rem]">
              Potensi Unggulan Desa
            </motion.h2>
            <motion.p variants={childUp} className="mt-3 text-[15px] leading-relaxed text-[var(--text-muted)] max-w-[480px]">
              Menampilkan berbagai potensi terbaik yang memiliki nilai ekonomi, budaya, dan wisata sebagai identitas desa.
            </motion.p>
          </div>

          {!isEmpty && (
            <motion.div variants={childUp}>
              <Link
                to="/potentials"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors group"
              >
                Lihat Semua
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </motion.div>

        {isLoading ? (
          <motion.div variants={stag} initial="hidden" animate="visible" className="hidden lg:flex gap-7">
            <div className="w-[60%]"><FeaturedLargeCardSkeleton /></div>
            <div className="flex w-[40%] flex-col gap-7">
              <FeaturedSmallCardSkeleton />
              <FeaturedSmallCardSkeleton />
            </div>
          </motion.div>
        ) : isEmpty ? null : (
          <>
            <motion.div
              className="hidden lg:flex gap-7"
              variants={stag}
              initial="hidden"
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.15 }}
            >
              {featured && (
                <motion.div key={featured.id} variants={childUp} className="w-[60%]">
                  <FeaturedLargeCard item={featured} />
                </motion.div>
              )}
              {smallCards.length > 0 && (
                <div className="flex w-[40%] flex-col gap-7">
                  {smallCards.map((item) => (
                    <motion.div key={item.id} variants={childUp}>
                      <FeaturedSmallCard item={item} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            <div className="hidden md:flex md:flex-col md:gap-6 lg:hidden">
              {featured && <FeaturedLargeCard item={featured} />}
              {smallCards.length > 0 && (
                <div className="grid grid-cols-2 gap-7">
                  {smallCards.map((item) => (
                    <FeaturedSmallCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            <div
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-2 md:hidden"
              role="list"
              aria-label="Daftar potensi unggulan desa"
            >
              {potentials.map((item, index) => (
                <div
                  key={item.id}
                  className={`snap-start shrink-0 ${index === 0 ? 'w-[85vw]' : 'w-[75vw]'}`}
                  role="listitem"
                >
                  {index === 0 ? (
                    <FeaturedLargeCard item={item} />
                  ) : (
                    <FeaturedSmallCard item={item} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
