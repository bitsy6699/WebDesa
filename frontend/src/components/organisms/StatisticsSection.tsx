import { Layers, Briefcase, TrendingUp, Map as MapIcon } from 'lucide-react';
import { Skeleton } from '@/components/atoms/Skeleton';
import type { StatisticsSummary } from '@/types/Statistic';

export interface StatisticsSectionProps {
  summary: StatisticsSummary;
}

interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
}

/**
 * Maps StatisticsSummary to display-ready items with branded icon backgrounds.
 */
function toStatItems(summary: StatisticsSummary): StatItem[] {
  return [
    {
      label: 'Total Potensi',
      value: summary.total_potentials.toLocaleString('id-ID'),
      icon: <Layers className="w-6 h-6 text-[#0B3C35]" />,
      iconBg: 'bg-[#0B3C35]/10',
    },
    {
      label: 'Potensi UMKM',
      value: summary.total_umkm.toLocaleString('id-ID'),
      icon: <Briefcase className="w-6 h-6 text-[#D97706]" />,
      iconBg: 'bg-[#D97706]/10',
    },
    {
      label: 'Kategori Desa',
      value: summary.total_categories.toLocaleString('id-ID'),
      icon: <TrendingUp className="w-6 h-6 text-[#3B82F6]" />,
      iconBg: 'bg-[#3B82F6]/10',
    },
    {
      label: 'Dusun',
      value: summary.total_dusun.toLocaleString('id-ID'),
      icon: <MapIcon className="w-6 h-6 text-[#8B5CF6]" />,
      iconBg: 'bg-[#8B5CF6]/10',
    },
  ];
}

/**
 * StatisticsSection — Grid of village statistic cards from the real API.
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.8 Statistic Card
 * @see docs/engineering/API_SPEC.md §7.1 Dashboard Counters Summary
 */
export function StatisticsSection({ summary }: StatisticsSectionProps) {
  const items = toStatItems(summary);

  return (
    <section className="section-padding bg-[--bg-surface-alt]" aria-label="Statistik desa">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center gap-3 rounded-[--radius-xl] bg-[--bg-surface] border border-[--border-default] shadow-[var(--shadow-md)] p-6 transition-shadow duration-[--duration-fast] hover:shadow-[var(--shadow-lg)]"
            >
              <div className={`w-12 h-12 rounded-[--radius-lg] flex items-center justify-center ${item.iconBg}`}>
                {item.icon}
              </div>
              <p
                className="text-h2 text-[--neutral-900]"
                aria-label={`${item.label}: ${item.value}`}
              >
                {item.value}
              </p>
              <p className="text-label uppercase tracking-widest text-[--neutral-500]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Skeleton variant shown while the statistics API call is pending. */
export function StatisticsSectionSkeleton() {
  return (
    <section className="section-padding bg-[--bg-surface-alt]" aria-busy="true" aria-label="Memuat statistik">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[--radius-xl] border border-[--border-default] bg-[--bg-surface] p-6 flex flex-col items-center gap-4"
            >
              <Skeleton className="h-12 w-12 rounded-[--radius-lg]" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
