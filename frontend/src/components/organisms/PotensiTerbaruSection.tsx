import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Newspaper } from 'lucide-react';
import {
  LatestPotentialCard,
  LatestPotentialCardSkeleton,
} from '@/components/molecules/LatestPotentialCard';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { glassSurfaceSoft, glassButtonSubtle } from '@/lib/glassStyles';
import type { PotentialListItem } from '@/types/Potential';

export interface PotensiTerbaruSectionProps {
  potentials: PotentialListItem[];
  isLoading?: boolean;
}

const REVEAL_TRANSITION = {
  duration: 0.7,
  ease: 'easeOut' as const,
};

function LatestCardReveal({ index, children }: { index: number; children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        ...REVEAL_TRANSITION,
        delay: Math.min(index, 4) * 0.08,
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

function LatestEmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[28px] px-6 py-16 text-center"
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
        <Newspaper className="h-9 w-9 text-[var(--color-primary)]" />
      </div>

      <h3 className="text-2xl font-bold text-[#163A35]">Belum Ada Potensi Terbaru</h3>
      <p className="mt-3 max-w-md text-[15px] leading-[170%] text-[#667085]">
        Potensi terbaru akan muncul setelah dipublikasikan oleh administrator.
      </p>

      <div className="mt-8">
        <SectionCTAButton to="/potentials" label="Lihat Semua Potensi" />
      </div>
    </div>
  );
}

/**
 * PotensiTerbaruSection — Editorial feed of newly published village potentials.
 *
 * Displays the latest potentials from the API in a responsive glassmorphism grid.
 *
 * @see docs/engineering/API_SPEC.md §5.1 List Potentials
 */
export function PotensiTerbaruSection({ potentials, isLoading = false }: PotensiTerbaruSectionProps) {
  const isEmpty = !isLoading && potentials.length === 0;
  const items = potentials.slice(0, 6);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F3F7F4 0%, #EEF2F0 100%)',
      }}
      aria-label="Potensi terbaru desa"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(22,58,53,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1240px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* ── Header ─────────────────────────────────────────────── */}
        <SectionHeader
          eyebrow="Potensi Terbaru"
          title="Potensi Terbaru"
          description="Jelajahi berbagai potensi terbaru yang telah dipublikasikan oleh Pemerintah Desa Karamatwangi."
          ctaTo={isEmpty ? undefined : '/potentials'}
          ctaLabel={isEmpty ? undefined : 'Lihat Semua'}
        />

        {/* ── Grid ───────────────────────────────────────────────── */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <LatestPotentialCardSkeleton key={index} />
            ))}
          </div>
        ) : isEmpty ? (
          <LatestEmptyState />
        ) : (
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
            role="list"
            aria-label="Potensi terbaru desa"
          >
            {items.map((item, index) => (
              <div key={item.id} className="h-full" role="listitem">
                <LatestCardReveal index={index}>
                  <LatestPotentialCard item={item} />
                </LatestCardReveal>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
