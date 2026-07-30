import { LayoutGrid, FolderTree, MapPin, Store } from 'lucide-react';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardKpiCard } from '@/dashboard/components/organisms/DashboardKpiCard';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { EmptyState } from '@/dashboard/components/organisms/EmptyState';
import FadeContent from '@/components/FadeContent';
import SpotlightCard from '@/components/SpotlightCard';
import CountUp from '@/components/CountUp';
import { useStatistics } from '@/hooks/useStatistics';

export default function StatisticsPage() {
  const { data: stats, isLoading, error } = useStatistics();

  if (error) {
    return (
      <div className="space-y-5">
        <PageHeader title="Statistik" description="Ringkasan data potensi desa." />
        <Alert title="Gagal memuat statistik." variant="danger" />
      </div>
    );
  }

  const kpiCards = [
    { icon: LayoutGrid, title: 'Total Potensi', value: <CountUp to={stats?.total_potentials ?? 0} duration={1.5} separator="." />, helperText: 'Semua potensi desa' },
    { icon: Store, title: 'UMKM', value: <CountUp to={stats?.total_umkm ?? 0} duration={1.5} separator="." />, helperText: 'Usaha mikro, kecil, menengah' },
    { icon: FolderTree, title: 'Kategori', value: <CountUp to={stats?.total_categories ?? 0} duration={1.5} separator="." />, helperText: 'Kelompok konten' },
    { icon: MapPin, title: 'Dusun', value: <CountUp to={stats?.total_dusun ?? 0} duration={1.5} separator="." />, helperText: 'Wilayah administratif' },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Statistik"
        description="Ringkasan data potensi desa Karamatwangi."
        badge={isLoading ? 'Memuat...' : 'Aktif'}
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-neutral-200/60" />
          ))}
        </div>
      ) : stats ? (
        <>
          <FadeContent duration={600} delay={0} threshold={0.1}>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {kpiCards.map((card) => (
              <SpotlightCard key={card.title} spotlightColor="rgba(24, 77, 71, 0.12)">
                <DashboardKpiCard {...card} />
              </SpotlightCard>
            ))}
          </section>
          </FadeContent>

          <FadeContent duration={600} delay={150} threshold={0.1}>
          <DashboardCard title="Ringkasan" description="Ringkasan data potensi desa.">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-[0.75rem] font-semibold text-neutral-700">Potensi per Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[0.75rem]">
                    <span className="text-neutral-500">Diterbitkan</span>
                    <span className="font-medium text-[#184D47]">
                      <CountUp to={stats.total_potentials} duration={1.5} separator="." />
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100">
                    <div className="h-full rounded-full bg-[#184D47] transition-all duration-300 ease-out" style={{ width: `${stats.total_all > 0 ? (stats.total_potentials / stats.total_all) * 100 : 0}%` }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[0.75rem]">
                    <span className="text-neutral-500">Draf</span>
                    <span className="font-medium text-amber-600">
                      <CountUp to={stats.total_draft} duration={1.5} separator="." />
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100">
                    <div className="h-full rounded-full bg-amber-400 transition-all duration-300 ease-out" style={{ width: `${stats.total_all > 0 ? (stats.total_draft / stats.total_all) * 100 : 0}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[0.75rem] font-semibold text-neutral-700">Distribusi Kategori</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[0.75rem]">
                    <span className="text-neutral-500">Total Kategori Aktif</span>
                    <span className="font-medium text-[#184D47]">
                      <CountUp to={stats.total_categories} duration={1.5} separator="." />
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100">
                    <div className="h-full rounded-full bg-[#184D47] transition-all duration-300 ease-out" style={{ width: `${Math.min(100, stats.total_categories * 8)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
          </FadeContent>
        </>
      ) : (
        <EmptyState title="Tidak ada data" description="Statistik akan muncul setelah ada data potensi." />
      )}
    </div>
  );
}
