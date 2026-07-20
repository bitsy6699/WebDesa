import { PageHeader } from '@/dashboard/components/molecules/PageHeader';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';
import { DashboardBadge } from '@/dashboard/components/atoms/DashboardBadge';
import { DashboardSwitch } from '@/dashboard/components/atoms/DashboardSwitch';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Configure site-level defaults and dashboard preferences." badge="Planned" />
      <DashboardCard title="Configuration workspace" description="System preferences and integrations will be grouped here.">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748b]">Status</span>
          <DashboardBadge variant="neutral">Seeded</DashboardBadge>
        </div>
        <div className="mt-4 space-y-3">
          <DashboardSwitch label="Enable draft review" description="Require review before publishing new content." checked readOnly />
          <DashboardSwitch label="Show onboarding tips" description="Surface contextual assistance for editors." />
        </div>
      </DashboardCard>
    </div>
  );
}
