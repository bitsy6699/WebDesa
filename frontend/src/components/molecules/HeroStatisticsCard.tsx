import { Briefcase, TrendingUp, Map as MapIcon, Layers } from 'lucide-react';
import { Skeleton } from '@/components/atoms/Skeleton';
import type { StatisticsSummary } from '@/types/Statistic';

export interface HeroStatisticsCardProps {
  summary?: StatisticsSummary;
  isLoading?: boolean;
}

interface StatCell {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
}

function toStatCells(summary: StatisticsSummary): StatCell[] {
  return [
    {
      label: 'Potensi Terdaftar',
      value: summary.total_potentials.toLocaleString('id-ID'),
      icon: <Layers className="w-5 h-5 text-[#2F855A]" aria-hidden="true" />,
      iconBg: 'bg-[#2F855A]/20',
    },
    {
      label: 'Kategori Potensi',
      value: summary.total_categories.toLocaleString('id-ID'),
      icon: <TrendingUp className="w-5 h-5 text-[#D97706]" aria-hidden="true" />,
      iconBg: 'bg-[#D97706]/20',
    },
    {
      label: 'Dusun & Kampung',
      value: summary.total_dusun.toLocaleString('id-ID'),
      icon: <MapIcon className="w-5 h-5 text-[#3B82F6]" aria-hidden="true" />,
      iconBg: 'bg-[#3B82F6]/20',
    },
    {
      label: 'Destinasi',
      value: summary.total_umkm.toLocaleString('id-ID'),
      icon: <Briefcase className="w-5 h-5 text-white/80" aria-hidden="true" />,
      iconBg: 'bg-white/20',
    },
  ];
}

/**
 * HeroStatisticsCard — 2×2 glassmorphism statistics card for the hero right slot.
 *
 * Visual spec: DS v2.0
 * - Container: rounded-[28px] with backdrop blur, white/10 bg, border white/20
 * - 2×2 grid of stat items with rounded-2xl individual cells
 * - Hover: lift + tint on each cell
 * - Show skeleton when loading or no data
 *
 * @see docs/design/DESIGN_SYSTEM.md v2.0 §8.8
 */
export function HeroStatisticsCard({ summary, isLoading = false }: HeroStatisticsCardProps) {
  const showSkeleton = isLoading || !summary;

  if (showSkeleton) {
    return (
      <div
        className="w-full max-w-sm rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        aria-busy="true"
        aria-label="Memuat statistik desa"
      >
        {/* Header skeleton */}
        <div className="mb-4">
          <Skeleton className="h-4 w-32 bg-white/20 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2"
            >
              <Skeleton className="h-9 w-9 rounded-xl bg-white/15" />
              <Skeleton className="h-6 w-12 bg-white/15 rounded" />
              <Skeleton className="h-3 w-20 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const cells = toStatCells(summary);

  return (
    <div
      className="w-full max-w-sm rounded-[28px] bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
      aria-label="Statistik desa"
    >
      {/* Card header label */}
      <p className="text-label uppercase tracking-widest text-white/60 mb-4">
        Statistik Desa
      </p>

      {/* 2×2 grid */}
      <div className="grid grid-cols-2 gap-3">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="group rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col gap-2 transition-all duration-300 hover:bg-white/15 hover:-translate-y-0.5 hover:border-white/25 cursor-default"
          >
            {/* Icon */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cell.iconBg} shrink-0`}>
              {cell.icon}
            </div>
            {/* Value */}
            <p className="text-2xl font-bold text-white leading-none" aria-label={`${cell.label}: ${cell.value}`}>
              {cell.value}
            </p>
            {/* Label */}
            <p className="text-label uppercase tracking-widest text-white/60 leading-none">
              {cell.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
