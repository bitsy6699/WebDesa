import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  FeaturedLargeCard,
  FeaturedSmallCard,
  FeaturedLargeCardSkeleton,
  FeaturedSmallCardSkeleton,
} from '@/components/molecules/FeaturedPotentialCard';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { glassSurfaceSoft, glassButtonSubtle } from '@/lib/glassStyles';
import type { PotentialListItem } from '@/types/Potential';

export interface FeaturedPotentialsSectionProps {
  potentials: PotentialListItem[];
  isLoading?: boolean;
}

const REVEAL_TRANSITION = {
  duration: 0.7,
  ease: 'easeOut' as const,
};

function FeaturedCardReveal({ index, children }: { index: number; children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        ...REVEAL_TRANSITION,
        delay: index * 0.12,
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionCTAButton({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#163A35] transition-all duration-200 hover:bg-[#184D47]/10 hover:text-[#0F3D34]"
      style={{
        ...glassButtonSubtle,
        color: '#163A35',
        border: '1px solid rgba(24,77,71,0.15)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

function FeaturedEmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[32px] px-6 py-16 text-center"
      style={glassSurfaceSoft}
    >
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background: 'rgba(255,255,255,0.25)',
          border: '1px solid rgba(255,255,255,0.35)',
        }}
        aria-hidden="true"
      >
        <Sparkles className="h-9 w-9 text-[var(--color-primary)]" />
      </div>

      <h3 className="text-2xl font-bold text-[#163A35]">Belum Ada Potensi Unggulan</h3>
      <p className="mt-3 max-w-md text-[15px] leading-[170%] text-[#667085]">
        Data akan muncul setelah administrator menambahkan potensi unggulan.
      </p>

      <div className="mt-8">
        <SectionCTAButton to="/potentials" label="Lihat Semua Potensi" />
      </div>
    </div>
  );
}

/**
 * FeaturedPotentialsSection — Premium editorial layout.
 *
 * Desktop: 60% featured card + 40% stacked small cards
 * Tablet:  featured card on top, two small cards below
 * Mobile:  horizontal snap scroll with peek
 *
 * @see docs/design/UI_UX_SPEC.md §8 Featured UMKM Section
 */
export function FeaturedPotentialsSection({ potentials, isLoading = false }: FeaturedPotentialsSectionProps) {
  const isEmpty = !isLoading && (!potentials || potentials.length === 0);
  const [featured, ...rest] = potentials;
  const smallCards = rest.slice(0, 2);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8FAF8 0%, #F3F7F4 100%)',
      }}
      aria-label="Potensi unggulan desa"
    >
      {/* Subtle radial blur decoration */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(22,58,53,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* ── Header ─────────────────────────────────────────────── */}
        <SectionHeader
          eyebrow="Potensi Pilihan"
          title="Potensi Unggulan Desa Karamatwangi"
          description="Menampilkan berbagai potensi terbaik Desa Karamatwangi yang memiliki nilai ekonomi, budaya, dan wisata sebagai identitas desa."
          ctaTo={isEmpty ? undefined : '/potentials'}
          ctaLabel={isEmpty ? undefined : 'Lihat Semua'}
          className="mb-10"
        />

        {/* ── Editorial content ──────────────────────────────────── */}
        {isLoading ? (
          <>
            {/* Desktop & tablet loading */}
            <div className="hidden md:block">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="lg:w-[60%]">
                  <FeaturedLargeCardSkeleton />
                </div>
                <div className="flex flex-col gap-6 lg:w-[40%]">
                  <FeaturedSmallCardSkeleton />
                  <FeaturedSmallCardSkeleton />
                </div>
              </div>
            </div>

            {/* Mobile loading */}
            <div className="flex gap-4 overflow-hidden md:hidden">
              <div className="w-[85vw] shrink-0">
                <FeaturedLargeCardSkeleton />
              </div>
              <div className="w-[75vw] shrink-0">
                <FeaturedSmallCardSkeleton />
              </div>
            </div>
          </>
        ) : isEmpty ? (
          <FeaturedEmptyState />
        ) : (
          <>
            {/* Desktop: 60 / 40 editorial split */}
            <div className="hidden lg:flex gap-8">
              {featured && (
                <div className="w-[60%]">
                  <FeaturedCardReveal index={0}>
                    <FeaturedLargeCard item={featured} />
                  </FeaturedCardReveal>
                </div>
              )}
              {smallCards.length > 0 && (
                <div className="flex w-[40%] flex-col gap-8">
                  {smallCards.map((item, index) => (
                    <div key={item.id} className="flex-1">
                      <FeaturedCardReveal index={index + 1}>
                        <FeaturedSmallCard item={item} />
                      </FeaturedCardReveal>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tablet: large on top, two small below */}
            <div className="hidden md:flex md:flex-col md:gap-6 lg:hidden">
              {featured && (
                <FeaturedCardReveal index={0}>
                  <FeaturedLargeCard item={featured} />
                </FeaturedCardReveal>
              )}
              {smallCards.length > 0 && (
                <div className="grid grid-cols-2 gap-7">
                  {smallCards.map((item, index) => (
                    <FeaturedCardReveal key={item.id} index={index + 1}>
                      <FeaturedSmallCard item={item} />
                    </FeaturedCardReveal>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: horizontal snap scroll */}
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
                  <FeaturedCardReveal index={Math.min(index, 2)}>
                    {index === 0 ? (
                      <FeaturedLargeCard item={item} />
                    ) : (
                      <FeaturedSmallCard item={item} />
                    )}
                  </FeaturedCardReveal>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
