import { useMemo } from 'react';
import { ChartColumn, FolderTree, ImageIcon, MapPin, Plus, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { QuickActionCard } from '@/dashboard/components/organisms/QuickActionCard';
import { PublishingProgress } from '@/dashboard/components/organisms/PublishingProgress';
import FadeContent from '@/components/FadeContent';
import MagicBento from '@/components/MagicBento';
import { useStatistics } from '@/hooks/useStatistics';
import { useAuth } from '@/hooks/useAuth';

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

  const bentoCardData = useMemo(() => {
    if (!stats) return [];
    return [
      {
        color: '#0F3D34',
        title: 'Total Potensi',
        description: 'Potensi desa yang telah diterbitkan',
        label: 'Ringkasan',
        value: String(stats.total_potentials),
      },
      {
        color: '#0F3D34',
        title: 'Kategori',
        description: 'Kelompok konten desa',
        label: 'Taksonomi',
        value: String(stats.total_categories),
      },
      {
        color: '#0F3D34',
        title: 'Keseluruhan',
        description: 'Total seluruh potensi termasuk draf',
        label: 'Semua Data',
        value: String(stats.total_all),
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
      },
      {
        color: '#0F3D34',
        title: 'Draf',
        description: 'Potensi yang masih dalam penyusunan',
        label: 'Tertunda',
        value: String(stats.total_draft),
      },
    ];
  }, [stats]);

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
