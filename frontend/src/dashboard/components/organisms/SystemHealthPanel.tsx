import { Activity, Database, HardDrive, Network } from 'lucide-react';
import { StatusChip } from '@/dashboard/components/molecules/StatusChip';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';

const services = [
  { name: 'API', status: 'Healthy', variant: 'success' as const, icon: Network },
  { name: 'Storage', status: 'Warning', variant: 'warning' as const, icon: HardDrive },
  { name: 'Media Processing', status: 'Healthy', variant: 'success' as const, icon: Activity },
  { name: 'Database', status: 'Offline', variant: 'danger' as const, icon: Database },
];

export function SystemHealthPanel() {
  return (
    <DashboardCard title="System health" description="A snapshot of operational readiness for the workspace.">
      <div className="grid gap-3 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div key={service.name} className="flex items-center justify-between rounded-[1rem] border border-[#f0f3f2] bg-[#fcfdfd] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-[#dff6f2] bg-[#f3fbf8] p-2 text-[#0f766e]">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-[#0f1720]">{service.name}</p>
                  <p className="text-sm text-[#64748b]">Mocked health signal</p>
                </div>
              </div>
              <StatusChip label={service.status} variant={service.variant} />
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
