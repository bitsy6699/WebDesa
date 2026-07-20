import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { DashboardBadge } from '@/dashboard/components/atoms/DashboardBadge';
import { EmptyState } from '@/dashboard/components/organisms/EmptyState';

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Activity Log" description="Review recent administrative and content changes." badge="Planned" />
      <DashboardCard title="Recent operations" description="A chronological audit view will be added later.">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748b]">Entry point</span>
          <DashboardBadge variant="warning">Upcoming</DashboardBadge>
        </div>
        <div className="mt-4">
          <EmptyState title="No activity yet" description="The audit stream will appear here once the first content events are tracked." />
        </div>
      </DashboardCard>
    </div>
  );
}
