import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import type { CategoryRow } from './types';

interface CategoryDetailPageProps {
  category: CategoryRow;
  onBack?: () => void;
  onEdit?: () => void;
}

export function CategoryDetailPage({ category, onBack, onEdit }: CategoryDetailPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={category.name}
        description={category.description ?? 'Category overview'}
        badge={category.status}
        actions={
          <>
            <DashboardButton variant="secondary" onClick={onBack}>
              Back to list
            </DashboardButton>
            <DashboardButton onClick={onEdit}>Edit category</DashboardButton>
          </>
        }
      />

      <DashboardCard title="Category summary" description="A lightweight detail shell for the current taxonomy entry.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#64748b]">Slug</p>
              <p className="mt-1 text-base font-semibold text-[#0f1720]">/{category.slug}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#64748b]">Status</p>
              <p className="mt-1 text-base font-semibold text-[#0f1720]">{category.status}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-[#64748b]">Type</p>
              <p className="mt-1 text-base font-semibold text-[#0f1720]">{category.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#64748b]">Last updated</p>
              <p className="mt-1 text-base font-semibold text-[#0f1720]">{category.updatedAt}</p>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}
