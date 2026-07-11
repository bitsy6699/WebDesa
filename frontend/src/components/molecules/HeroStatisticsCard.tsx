import { Users, Layers, MapPin, TreePine } from 'lucide-react';
import type { StatisticsSummary } from '@/types/Statistic';

export interface HeroStatisticsCardProps {
  /** API summary — used as fallback if available, otherwise hardcoded village data is shown. */
  summary?: StatisticsSummary;
  isLoading?: boolean;
}

interface StatCell {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}

/**
 * Hardcoded village statistics per Phase 13F spec.
 * These represent actual Desa Karamatwangi data:
 * - 5.373 Penduduk
 * - 2.877 Ha Luas Wilayah
 * - 3 Dusun
 * - 3 Kategori Potensi
 *
 * The API summary is accepted as a prop but the display uses these hardcoded
 * values as they are more accurate village identity data than the potentials count.
 */
const VILLAGE_STATS: StatCell[] = [
  {
    label: 'Penduduk',
    value: '5.373',
    icon: <Users className="w-5 h-5 text-[#2F855A]" aria-hidden="true" />,
    iconBg: 'bg-[#2F855A]/20',
  },
  {
    label: 'Luas Wilayah',
    value: '2.877 Ha',
    icon: <TreePine className="w-5 h-5 text-[#D97706]" aria-hidden="true" />,
    iconBg: 'bg-[#D97706]/20',
  },
  {
    label: 'Dusun',
    value: '3',
    icon: <MapPin className="w-5 h-5 text-[#3B82F6]" aria-hidden="true" />,
    iconBg: 'bg-[#3B82F6]/20',
  },
  {
    label: 'Kategori Potensi',
    value: '3',
    icon: <Layers className="w-5 h-5 text-white/80" aria-hidden="true" />,
    iconBg: 'bg-white/20',
  },
];

/**
 * HeroStatisticsCard — 2×2 glassmorphism statistics card for the hero right slot.
 *
 * Phase 13F: uses hardcoded village data (5373 Penduduk, 2877 Ha, 3 Dusun, 3 Kategori Potensi).
 * API summary prop is kept for API compatibility but display values are fixed per spec.
 *
 * Visual:
 * - Container: rounded-[28px], backdrop-blur-md, white/10 bg, border white/20
 * - 2×2 grid cells with rounded-2xl
 * - Hover: lift + tint
 *
 * @see docs/mockups/landing-page-references.png
 */
export function HeroStatisticsCard({ isLoading = false }: HeroStatisticsCardProps) {
  /* Show skeleton during initial load for visual consistency */
  if (isLoading) {
    return (
      <div
        className="w-full max-w-sm rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        aria-busy="true"
        aria-label="Memuat statistik desa"
      >
        <p className="text-label uppercase tracking-widest text-white/40 mb-4 animate-pulse bg-white/10 rounded h-4 w-28" />
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2">
              <div className="h-9 w-9 rounded-xl bg-white/15 animate-pulse" />
              <div className="h-6 w-14 bg-white/15 rounded animate-pulse" />
              <div className="h-3 w-20 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-sm rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
      aria-label="Statistik Desa Karamatwangi"
    >
      {/* Card header */}
      <p className="text-label uppercase tracking-widest text-white/55 mb-4">
        Statistik Desa
      </p>

      {/* 2×2 grid */}
      <div className="grid grid-cols-2 gap-3">
        {VILLAGE_STATS.map((cell) => (
          <div
            key={cell.label}
            className="group rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-2 transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5 hover:border-white/25 cursor-default"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cell.iconBg} shrink-0`}>
              {cell.icon}
            </div>
            <p
              className="font-bold text-white leading-none"
              style={{ fontSize: cell.value.length > 5 ? '1.2rem' : '1.6rem' }}
              aria-label={`${cell.label}: ${cell.value}`}
            >
              {cell.value}
            </p>
            <p className="text-label uppercase tracking-widest text-white/55 leading-tight">
              {cell.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
