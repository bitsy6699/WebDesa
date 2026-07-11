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
  iconColor: string;
}

function toStatItems(summary: StatisticsSummary): StatItem[] {
  return [
    {
      label: 'Total Potensi',
      value: summary.total_potentials.toLocaleString('id-ID'),
      icon: <Layers className="w-6 h-6" aria-hidden="true" />,
      iconBg: '#0B3C351a',
      iconColor: '#0B3C35',
    },
    {
      label: 'Potensi UMKM',
      value: summary.total_umkm.toLocaleString('id-ID'),
      icon: <Briefcase className="w-6 h-6" aria-hidden="true" />,
      iconBg: '#F59E0B1a',
      iconColor: '#D97706',
    },
    {
      label: 'Kategori Potensi',
      value: summary.total_categories.toLocaleString('id-ID'),
      icon: <TrendingUp className="w-6 h-6" aria-hidden="true" />,
      iconBg: '#2F855A1a',
      iconColor: '#2F855A',
    },
    {
      label: 'Dusun',
      value: summary.total_dusun.toLocaleString('id-ID'),
      icon: <MapIcon className="w-6 h-6" aria-hidden="true" />,
      iconBg: '#3B82F61a',
      iconColor: '#3B82F6',
    },
  ];
}

/**
 * StatisticsSection — 4-column grid of statistic cards from the API.
 * Background: #F8FAFC (light cool-white, alternates with sections above/below)
 */
export function StatisticsSection({ summary }: StatisticsSectionProps) {
  const items = toStatItems(summary);

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: '#F8FAFC' }}
      aria-label="Statistik potensi desa"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center gap-4 rounded-3xl bg-white p-6 transition-all duration-300"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.10)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  width: '52px',
                  height: '52px',
                  backgroundColor: item.iconBg,
                  color: item.iconColor,
                }}
              >
                {item.icon}
              </div>
              <p
                className="font-bold text-[#0B3C35]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  lineHeight: 1,
                }}
                aria-label={`${item.label}: ${item.value}`}
              >
                {item.value}
              </p>
              <p
                className="font-semibold uppercase tracking-wider text-[#6B7280]"
                style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Skeleton while API call is pending. */
export function StatisticsSectionSkeleton() {
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: '#F8FAFC' }}
      aria-busy="true"
      aria-label="Memuat statistik"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white p-6 flex flex-col items-center gap-4"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            >
              <Skeleton className="h-13 w-13 rounded-2xl" style={{ width: '52px', height: '52px' } as React.CSSProperties} />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
