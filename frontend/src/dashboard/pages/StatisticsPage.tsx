import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { DashboardBadge } from '@/dashboard/components/atoms/DashboardBadge';
import { EmptyState } from '@/dashboard/components/organisms/EmptyState';

export default function StatisticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Statistics" description="Track reach, engagement, and performance signals." badge="Planned" />
      <DashboardCard title="Reporting view" description="A future analytics layer will connect here.">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748b]">Status</span>
          <DashboardBadge variant="info">Awaiting data</DashboardBadge>
        </div>
        <div className="mt-4">
          <EmptyState title="No metrics yet" description="Analytics widgets will populate here once the reporting layer is connected." />
        </div>
      </DashboardCard>
    </div>
  );
}
