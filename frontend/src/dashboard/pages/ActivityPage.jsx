import { LogIn, LogOut, Plus, Pencil, Trash2, Upload, Star, Settings } from 'lucide-react';
import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { Alert } from '@/dashboard/components/organisms/Alert';
import { EmptyState } from '@/dashboard/components/organisms/EmptyState';
import { TablePagination } from '@/dashboard/components/data/TablePagination';
import FadeContent from '@/components/FadeContent';
import { useActivityLogs } from '@/hooks/useActivityLogs';
import { useState } from 'react';

const actionIcons = {
  login: { icon: LogIn, color: 'text-[#184D47]' },
  logout: { icon: LogOut, color: 'text-neutral-400' },
  create_potential: { icon: Plus, color: 'text-[#184D47]' },
  update_potential: { icon: Pencil, color: 'text-sky-600' },
  delete_potential: { icon: Trash2, color: 'text-red-500' },
  toggle_featured: { icon: Star, color: 'text-amber-500' },
  import_potentials: { icon: Upload, color: 'text-[#184D47]' },
  upload_media: { icon: Upload, color: 'text-[#184D47]' },
  delete_media: { icon: Trash2, color: 'text-red-500' },
  create_category: { icon: Plus, color: 'text-[#184D47]' },
  update_category: { icon: Pencil, color: 'text-sky-600' },
  delete_category: { icon: Trash2, color: 'text-red-500' },
  update_settings: { icon: Settings, color: 'text-neutral-400' },
};

const actionLabels = {
  login: 'masuk ke sistem',
  logout: 'keluar dari sistem',
  create_potential: 'membuat potensi',
  update_potential: 'memperbarui potensi',
  delete_potential: 'menghapus potensi',
  toggle_featured: 'mengubah status unggulan potensi',
  import_potentials: 'mengimpor data potensi',
  upload_media: 'mengunggah media',
  delete_media: 'menghapus media',
  create_category: 'membuat kategori',
  update_category: 'memperbarui kategori',
  delete_category: 'menghapus kategori',
  update_settings: 'memperbarui pengaturan',
};

const subjectLabels = {
  Potential: 'potensi',
  Media: 'media',
  Category: 'kategori',
  Setting: 'pengaturan',
};

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} detik lalu`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`;
  return `${Math.floor(seconds / 86400)} hari lalu`;
}

export default function ActivityPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useActivityLogs({ page, per_page: 15 });

  if (error) {
    return (
      <div className="space-y-5">
        <PageHeader title="Log Aktivitas" description="Jejak aktivitas admin." />
        <Alert title="Gagal memuat log aktivitas." variant="danger" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Aktivitas"
        description="Jejak aktivitas admin dan perubahan konten."
        badge={isLoading ? 'Memuat...' : `${data?.meta?.total ?? 0} entri`}
      />

      {isLoading ? (
        <DashboardCard>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-neutral-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 w-1/3 animate-pulse rounded-lg bg-neutral-200" />
                  <div className="h-3 w-1/4 animate-pulse rounded-lg bg-neutral-100" />
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      ) : data?.data.length === 0 ? (
        <EmptyState title="Belum ada aktivitas" description="Aktivitas admin akan muncul di sini." />
      ) : (
          <DashboardCard title="Aktivitas Terbaru">
            <FadeContent duration={600} delay={0} threshold={0.1}>
            <div className="divide-y divide-[#E8ECEA]">
              {data?.data.map((log) => {
              const actionConfig = actionIcons[log.action] ?? { icon: Settings, color: 'text-neutral-400' };
              const Icon = actionConfig.icon;
              const label = actionLabels[log.action] ?? `melakukan aksi ${log.action}`;
              const subjectLabel = subjectLabels[log.subject_type] ?? log.subject_type;

              return (
                <div key={log.id} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8FAF8] ${actionConfig.color}`}>
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.8125rem] text-neutral-700">
                      <span className="font-medium text-neutral-800">{log.user?.username ?? 'System'}</span>
                      {' '}
                      <span className="text-neutral-500">{label}</span>
                      {log.subject_type && <span className="text-neutral-500"> · {subjectLabel}</span>}
                    </p>
                    <p className="mt-0.5 text-[0.75rem] text-neutral-400">
                      {timeAgo(log.created_at)}
                      {log.ip_address && ` · ${log.ip_address}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
            </FadeContent>
        </DashboardCard>
      )}

      {data?.meta && (
        <TablePagination
          page={data.meta.current_page}
          pageSize={data.meta.per_page}
          totalItems={data.meta.total}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
