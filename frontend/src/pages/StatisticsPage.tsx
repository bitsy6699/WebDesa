import { lazy, memo, Suspense, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, BadgeCheck, BarChart3, Clock3, Globe, Home, TrendingUp, Users } from 'lucide-react';
import { Reveal } from '@/components/atoms/Reveal';
import { useStatistics } from '@/hooks/useStatistics';
import { GlassCard } from '@/components/organisms/statistics/StatisticsShared';
import { buildMetricItems } from '@/components/organisms/statistics/utils';
import type { StatItemRaw } from '@/components/organisms/statistics/utils';
import type { StatisticsSummary } from '@/types/Statistic';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DoughnutChart = lazy(async () => {
  const { Doughnut } = await import('react-chartjs-2');
  return { default: Doughnut };
});

const BarChart = lazy(async () => {
  const { Bar } = await import('react-chartjs-2');
  return { default: Bar };
});

function LoadingState() {
  return (
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
  );
}

function EmptyState() {
  return (
    <div className="mx-auto flex w-full max-w-[980px] flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-white/50 bg-white/70 p-8 shadow-[0_24px_80px_rgba(16,24,40,0.08)] backdrop-blur-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#184D47]/10 text-[#184D47]">
          <BarChart3 className="h-9 w-9" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-[#184D47]">Belum Ada Data Statistik</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
          Statistik Desa belum tersedia saat ini. Kembali ke beranda untuk menjelajahi potensi desa yang sudah dipublikasikan.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#184D47]/20 bg-[#184D47] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#184D47]/10 transition hover:-translate-y-0.5"
        >
          <Home className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

const ChartCard = memo(function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[30px] border border-white/50 bg-white/70 p-6 shadow-[0_24px_80px_rgba(16,24,40,0.08)] backdrop-blur-2xl">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[#184D47]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{subtitle}</p>
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
});

function buildInsights(summary?: StatisticsSummary) {
  const totalPotentials = summary?.total_potentials ?? 0;
  const totalCategories = summary?.total_categories ?? 0;
  const totalUmkm = summary?.total_umkm ?? 0;
  const totalDusun = summary?.total_dusun ?? 0;
  const averagePerCategory = totalCategories > 0 ? totalPotentials / totalCategories : 0;
  const totalTrackedData = totalPotentials + totalCategories + totalDusun + totalUmkm;

  return [
    {
      label: 'Rata-rata potensi per kategori',
      value: `${averagePerCategory.toFixed(1)} data`,
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      label: 'Total unit data terpantau',
      value: `${totalTrackedData.toLocaleString('id-ID')} item`,
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: 'Dusun yang tercakup data',
      value: `${totalDusun.toLocaleString('id-ID')} dusun`,
      icon: <Users className="h-4 w-4" />,
    },
  ].filter((item) => item.value !== '0.0 data' && item.value !== '0 item' && item.value !== '0 dusun');
}

export default function StatisticsPage() {
  const { data, isLoading, isError } = useStatistics();
  const [triggered] = useState(true);

  const metrics = useMemo(() => buildMetricItems(data), [data]);
  const insights = useMemo(() => buildInsights(data), [data]);

  const donutData = useMemo(() => ({
    labels: ['Potensi', 'Kategori', 'UMKM', 'Dusun'],
    datasets: [{
      data: [
        data?.total_potentials ?? 0,
        data?.total_categories ?? 0,
        data?.total_umkm ?? 0,
        data?.total_dusun ?? 0,
      ],
      backgroundColor: ['#184D47', '#2E7D6F', '#7CB8A7', '#DDEEE8'],
      borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
      borderWidth: 2,
    }],
  }), [data]);

  const barData = useMemo(() => ({
    labels: ['Potensi', 'Kategori', 'UMKM', 'Dusun'],
    datasets: [{
      label: 'Jumlah terdata',
      data: [
        data?.total_potentials ?? 0,
        data?.total_categories ?? 0,
        data?.total_umkm ?? 0,
        data?.total_dusun ?? 0,
      ],
      backgroundColor: ['#184D47', '#2E7D6F', '#7CB8A7', '#DDEEE8'],
      borderRadius: 12,
    }],
  }), [data]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  }), []);

  const hasData = metrics.some((item) => item.value > 0);
  const hasCharts = donutData.datasets[0].data.some((value) => value > 0);

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7faf8_0%,#f2f7f4_100%)]">
        <LoadingState />
      </section>
    );
  }

  if (isError || !hasData) {
    return (
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7faf8_0%,#f2f7f4_100%)] py-10 sm:py-16">
        <EmptyState />
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7faf8_0%,#f2f7f4_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-[#184D47]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#2f855a]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex max-w-[1160px] flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <Reveal delay={0.05} className="overflow-hidden rounded-[36px] border border-white/50 bg-gradient-to-br from-[#184D47] via-[#245b51] to-[#2d7c5f] p-8 text-white shadow-[0_30px_100px_rgba(14,46,35,0.24)] sm:p-10 lg:h-[280px] lg:p-12">
          <div className="absolute inset-0 opacity-70">
            <div className="absolute left-6 top-6 h-28 w-28 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute bottom-4 right-8 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />
          </div>
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-50/90">
              <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur">Beranda</Link>
              <span>/</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur">Statistik</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Statistik Desa</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/90 sm:text-base">
                Melihat perkembangan potensi Desa Karamatwangi berdasarkan data yang terus diperbarui.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5">
          {metrics.map((item: StatItemRaw) => (
            <GlassCard key={item.label} item={item} triggered={triggered} compact />
          ))}
        </Reveal>

        <Reveal delay={0.12} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-[30px] border border-white/50 bg-white/70 p-6 shadow-[0_24px_80px_rgba(16,24,40,0.08)] backdrop-blur-2xl">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#184D47]">Analytics</h2>
                  <p className="mt-1 text-sm text-slate-600">Ringkasan visual dari data statistik yang tersedia.</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#184D47]/10 bg-[#184D47]/5 px-3 py-2 text-sm font-medium text-[#184D47]">
                  <BarChart3 className="h-4 w-4" />
                  Data real-time
                </div>
              </div>
              <div className="grid gap-6 xl:grid-cols-2">
                {hasCharts ? (
                  <>
                    <ChartCard title="Distribusi Data" subtitle="Nilai inti yang saat ini tersedia dari API.">
                      <Suspense fallback={<div className="h-full animate-pulse rounded-2xl bg-slate-100" />}>
                        <DoughnutChart data={donutData} options={chartOptions} />
                      </Suspense>
                    </ChartCard>
                    <ChartCard title="Perbandingan Ringkas" subtitle="Perbandingan antar indikator utama.">
                      <Suspense fallback={<div className="h-full animate-pulse rounded-2xl bg-slate-100" />}>
                        <BarChart data={barData} options={chartOptions} />
                      </Suspense>
                    </ChartCard>
                  </>
                ) : (
                  <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/70 p-8 text-sm text-slate-600 xl:col-span-2">
                    Tidak ada data chart yang tersedia dari endpoint saat ini.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[30px] border border-white/50 bg-white/70 p-6 shadow-[0_24px_80px_rgba(16,24,40,0.08)] backdrop-blur-2xl">
              <div className="mb-5 flex items-center gap-2 text-[#184D47]">
                <BadgeCheck className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Insight Desa</h2>
              </div>
              <div className="space-y-3">
                {insights.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#184D47]">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/50 bg-white/70 p-6 shadow-[0_24px_80px_rgba(16,24,40,0.08)] backdrop-blur-2xl">
              <div className="mb-4 flex items-center gap-2 text-[#184D47]">
                <Clock3 className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Update Terbaru</h2>
              </div>
              <p className="text-sm leading-7 text-slate-600">
                Ringkasan statistik ini ditampilkan berdasarkan data publik yang diterima dari endpoint statistik yang ada saat ini.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#184D47]/10 bg-[#184D47]/5 px-3 py-2 text-sm font-medium text-[#184D47]">
                <Globe className="h-4 w-4" />
                Terakhir diperbarui saat halaman dibuka
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
