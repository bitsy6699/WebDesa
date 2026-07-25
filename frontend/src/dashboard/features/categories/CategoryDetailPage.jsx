import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardBadge } from '@/dashboard/components/atoms/DashboardBadge';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';

const statusVariant = {
  Published: 'success',
  Draft: 'warning',
};

const statusLabels = {
  Published: 'Diterbitkan',
  Draft: 'Draf',
};

export function CategoryDetailPage({ category, onBack, onEdit }) {
  return (
    <div className="space-y-5">
      <PageHeader
        title={category.name}
        description={category.description ?? 'Ringkasan kategori'}
        badge={statusLabels[category.status] ?? category.status}
        badgeVariant={statusVariant[category.status] ?? 'neutral'}
        actions={
          <div className="flex flex-wrap gap-2">
            <DashboardButton variant="secondary" onClick={onBack}>
              Kembali ke daftar
            </DashboardButton>
            <DashboardButton onClick={onEdit}>Edit kategori</DashboardButton>
          </div>
        }
      />

      <DashboardCard title="Ringkasan Kategori" description="Informasi singkat mengenai entri taksonomi ini.">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="text-[0.75rem] text-neutral-500">Slug</p>
              <p className="mt-0.5 text-[0.8125rem] font-medium text-neutral-800">/{category.slug}</p>
            </div>
            <div>
              <p className="text-[0.75rem] text-neutral-500">Status</p>
              <div className="mt-0.5">
                <DashboardBadge variant={statusVariant[category.status] ?? 'neutral'}>
                  {statusLabels[category.status] ?? category.status}
                </DashboardBadge>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-[0.75rem] text-neutral-500">Tipe</p>
              <p className="mt-0.5 text-[0.8125rem] font-medium text-neutral-800">{category.type}</p>
            </div>
            <div>
              <p className="text-[0.75rem] text-neutral-500">Terakhir diperbarui</p>
              <p className="mt-0.5 text-[0.8125rem] font-medium text-neutral-800">{category.updatedAt}</p>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
