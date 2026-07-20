import { useEffect, useMemo, useRef, useState } from 'react';
import { useStatistics } from '@/hooks/useStatistics';
import { GlassCard } from '@/components/organisms/statistics/StatisticsShared';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { buildMetricItems } from '@/components/organisms/statistics/utils';
import type { StatItemRaw } from '@/components/organisms/statistics/utils';
import type { StatisticsSummary } from '@/types/Statistic';

export interface StatisticsSectionProps {
  summary?: StatisticsSummary;
}

export function StatisticsSection({ summary }: StatisticsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  const statisticsQuery = useStatistics();
  const resolvedSummary = summary ?? statisticsQuery.data;
  const isLoading = !summary && statisticsQuery.isLoading;
  const isError = !summary && statisticsQuery.isError;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const metrics = useMemo<StatItemRaw[]>(() => buildMetricItems(resolvedSummary), [resolvedSummary]);
  const hasData = metrics.some((item: StatItemRaw) => item.value > 0);

  if (isLoading) {
    return (
      <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#f7faf8_0%,#f2f7f4_100%)] py-12 sm:py-16">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/70 p-8 shadow-[0_24px_80px_rgba(16,24,40,0.08)] backdrop-blur-2xl">
            <div className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.9)_50%,transparent_100%)]" style={{ transform: 'translateX(-100%)' }} />
            <div className="h-8 w-48 rounded-full bg-slate-200/80" />
            <div className="mt-4 h-4 w-72 rounded-full bg-slate-200/70" />
            <div className="mt-3 h-4 w-56 rounded-full bg-slate-200/70" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-40 animate-pulse rounded-[28px] border border-white/50 bg-white/60" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !hasData) {
    return (
      <section ref={sectionRef} className="relative overflow-hidden bg-[linear-gradient(180deg,#f7faf8_0%,#f2f7f4_100%)] py-12 sm:py-16">
        <div className="mx-auto flex max-w-[980px] flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-white/50 bg-white/70 p-8 text-center shadow-[0_24px_80px_rgba(16,24,40,0.08)] backdrop-blur-2xl">
            <h2 className="text-2xl font-semibold text-[#184D47]">Tidak ada data statistik yang dapat ditampilkan</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Data yang tersedia saat ini belum cukup untuk menampilkan ringkasan resmi.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="statistik"
      aria-label="Dashboard Ringkasan Statistik Desa"
      className="relative z-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F7FAF8 0%, #F4F8F6 100%)',
        paddingTop: 'clamp(64px, 8vw, 104px)',
        paddingBottom: 'clamp(88px, 10vw, 128px)',
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(24,77,71,0.05) 0%, transparent 70%)', filter: 'blur(90px)' }} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-32 h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)', filter: 'blur(110px)' }} />

      <div className="container relative z-10 mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Ringkasan Dashboard Statistik"
          description="Pantau perkembangan potensi Desa Karamatwangi secara ringkas dan real-time."
          ctaTo="/statistics"
          ctaLabel="Lihat Statistik Lengkap"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {metrics.map((item: StatItemRaw) => (
            <GlassCard key={item.label} item={item} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}
