import { lazy, Suspense, useMemo } from 'react';
import { ChartColumn, FolderTree, ImageIcon, MapPin, Plus, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { QuickActionCard } from '@/dashboard/components/organisms/QuickActionCard';
import { PublishingProgress } from '@/dashboard/components/organisms/PublishingProgress';
import FadeContent from '@/components/FadeContent';
import MagicBento from '@/components/MagicBento';
import { useStatistics } from '@/hooks/useStatistics';
import { useAuth } from '@/hooks/useAuth';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DoughnutChart = lazy(async () => {
  const { Doughnut } = await import('react-chartjs-2');
  return { default: Doughnut };
});

const BarChart = lazy(async () => {
  const { Bar } = await import('react-chartjs-2');
  return { default: Bar };
});

const CHART_COLORS = ['#6FAE8F', '#A7C957', '#D97706', '#B8C4C0'];

export default function OverviewPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useStatistics();

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const username = user?.username ?? 'Administrator';

  const quickActions = [
    { icon: Plus, title: 'Tambah Potensi', description: 'Buat entri baru.', onClick: () => navigate('/dashboard/potentials/new') },
    { icon: FolderTree, title: 'Kelola Kategori', description: 'Atur taksonomi.', onClick: () => navigate('/dashboard/categories') },
    { icon: ImageIcon, title: 'Unggah Media', description: 'Tambah gambar.', onClick: () => navigate('/dashboard/media') },
    { icon: ChartColumn, title: 'Statistik', description: 'Pantau performa.', onClick: () => navigate('/dashboard/statistics') },
    { icon: Store, title: 'Data UMKM', description: 'Usaha mikro desa.', onClick: () => navigate('/dashboard/potentials') },
    { icon: MapPin, title: 'Peta Desa', description: 'Distribusi potensi.', onClick: () => navigate('/dashboard/potentials') },
  ];

  const donutData = useMemo(() => {
    const values = [
      stats?.total_potentials ?? 0,
      stats?.total_categories ?? 0,
      stats?.total_umkm ?? 0,
      stats?.total_dusun ?? 0,
    ];

    return {
      labels: ['Potensi', 'Kategori', 'UMKM', 'Dusun'],
      datasets: [
        {
          data: values,
          backgroundColor: CHART_COLORS,
          borderColor: 'rgba(15, 61, 52, 1)',
          borderWidth: 3,
        },
      ],
    };
  }, [stats]);

  const statusData = useMemo(() => {
    return {
      labels: ['Diterbitkan', 'Draf', 'Diarsipkan'],
      datasets: [
        {
          data: [stats?.total_potentials ?? 0, stats?.total_draft ?? 0, stats?.total_archived ?? 0],
          backgroundColor: ['#6FAE8F', '#D97706', '#B8C4C0'],
          borderColor: 'rgba(15, 61, 52, 1)',
          borderWidth: 3,
        },
      ],
    };
  }, [stats]);

  const categoryData = useMemo(() => {
    const dist = stats?.category_distribution ?? [];
    return {
      labels: dist.map((c) => c.label),
      datasets: [
        {
          data: dist.map((c) => c.count),
          backgroundColor: 'rgba(111, 174, 143, 0.85)',
          hoverBackgroundColor: 'rgba(167, 201, 87, 0.9)',
          borderRadius: 4,
          barThickness: 8,
        },
      ],
    };
  }, [stats]);

  const dusunData = useMemo(() => {
    const dist = stats?.dusun_distribution ?? [];
    return {
      labels: dist.map((d) => d.dusun),
      datasets: [
        {
          data: dist.map((d) => d.count),
          backgroundColor: 'rgba(167, 201, 87, 0.85)',
          hoverBackgroundColor: 'rgba(111, 174, 143, 0.9)',
          borderRadius: 4,
          barThickness: 8,
        },
      ],
    };
  }, [stats]);

  const donutOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
          boxWidth: 9,
          boxHeight: 9,
          useBorderRadius: true,
          borderRadius: 3,
          font: { size: 10, weight: 500 },
        },
      },
      tooltip: {
        backgroundColor: '#1C1917',
        padding: 10,
        cornerRadius: 8,
      },
    },
  }), []);

  const barOptions = useMemo(() => ({
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1C1917',
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 9 } },
        grid: { color: 'rgba(255,255,255,0.06)' },
      },
      y: {
        ticks: { color: '#ffffff', font: { size: 9 } },
        grid: { display: false },
      },
    },
  }), []);

  const renderChart = (ChartComponent, data, options) => (
    <div className="magic-bento-card__chart">
      <Suspense fallback={<div className="magic-bento-chart-skeleton" />}>
        <ChartComponent data={data} options={options} />
      </Suspense>
    </div>
  );

  const bentoCardData = useMemo(() => {
    if (!stats) return [];
    return [
      {
        color: '#0F3D34',
        title: 'Total Potensi',
        description: 'Potensi desa yang telah diterbitkan',
        label: 'Ringkasan',
        value: String(stats.total_potentials),
        chart: renderChart(DoughnutChart, statusData, donutOptions),
      },
      {
        color: '#0F3D34',
        title: 'Kategori',
        description: 'Kelompok konten desa',
        label: 'Taksonomi',
        value: String(stats.total_categories),
        chart: renderChart(BarChart, categoryData, barOptions),
      },
      {
        color: '#0F3D34',
        title: 'Keseluruhan',
        description: 'Total seluruh potensi termasuk draf',
        label: 'Semua Data',
        value: String(stats.total_all),
        chart: renderChart(DoughnutChart, donutData, donutOptions),
      },
      {
        color: '#0F3D34',
        title: 'UMKM',
        description: 'Usaha mikro kecil menengah',
        label: 'Bisnis',
        value: String(stats.total_umkm),
      },
      {
        color: '#0F3D34',
        title: 'Dusun',
        description: 'Wilayah administratif desa',
        label: 'Lokasi',
        value: String(stats.total_dusun),
        chart: renderChart(BarChart, dusunData, barOptions),
      },
      {
        color: '#0F3D34',
        title: 'Draf',
        description: 'Potensi yang masih dalam penyusunan',
        label: 'Tertunda',
        value: String(stats.total_draft),
      },
    ];
  }, [stats, donutData, statusData, categoryData, dusunData, donutOptions, barOptions]);

  return (
    <div className="space-y-5">
      {/* Hero Welcome */}
      <FadeContent duration={600} delay={0} threshold={0.1}>
      <section className="flex flex-col gap-4 rounded-2xl border border-[#E7E7E7] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[1.125rem] font-semibold text-neutral-900">
            Selamat Datang, <span className="text-[#184D47]">{username}</span>
          </h1>
          <p className="mt-1 text-[0.8125rem] text-neutral-500">
            Berikut ringkasan data potensi desa Karamatwangi hari ini.
          </p>
          {stats && (
            <div className="mt-3 flex flex-wrap gap-3 text-[0.75rem]">
              <span className="text-neutral-500"><strong className="font-semibold text-neutral-800">{stats.total_potentials}</strong> Potensi</span>
              <span className="text-neutral-500"><strong className="font-semibold text-neutral-800">{stats.total_umkm}</strong> UMKM</span>
              <span className="text-neutral-500"><strong className="font-semibold text-neutral-800">{stats.total_categories}</strong> Kategori</span>
            </div>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-start gap-1.5 rounded-lg border border-[#E7E7E7] bg-neutral-50 px-4 py-2.5 sm:items-end">
          <span className="text-[0.8125rem] font-medium text-neutral-700">{today}</span>
          <span className="flex items-center gap-1 text-[0.6875rem] text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Sesi aktif
          </span>
        </div>
      </section>
      </FadeContent>

      {/* Stats Bento Grid */}
      <section aria-label="Statistik ringkasan">
        {statsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[180px] animate-pulse rounded-2xl border border-[#E7E7E7] bg-neutral-100" />
            ))}
          </div>
        ) : (
          <MagicBento
            cardData={bentoCardData}
            glowColor="24, 77, 71"
            spotlightRadius={280}
            particleCount={10}
            enableTilt={false}
            enableMagnetism
            clickEffect
            enableStars
            enableSpotlight
            enableBorderGlow
          />
        )}
      </section>

      {/* Quick Actions + Publishing — 2-col */}
      <FadeContent duration={600} delay={150} threshold={0.1}>
      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <DashboardCard title="Aksi Cepat">
          <div className="grid gap-2.5 grid-cols-1 sm:grid-cols-2">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Progres Publikasi">
          {stats ? (
            <PublishingProgress
              items={[
                { label: 'Diterbitkan', value: stats.total_potentials, max: Math.max(stats.total_all, 1) },
                { label: 'Draf', value: stats.total_draft, max: Math.max(stats.total_all, 1) },
                { label: 'UMKM', value: stats.total_umkm, max: Math.max(stats.total_potentials, 1) },
              ]}
            />
          ) : (
            <p className="text-[0.8125rem] text-neutral-400">Memuat data...</p>
          )}
        </DashboardCard>
      </section>
      </FadeContent>
    </div>
  );
}
