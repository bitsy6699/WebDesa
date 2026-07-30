import { Activity, Database, HardDrive, Network } from 'lucide-react';
import { StatusChip } from '@/dashboard/components/molecules/StatusChip';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';

const services = [
  { name: 'API', status: 'Sehat', variant: 'success', icon: Network },
  { name: 'Penyimpanan', status: 'Peringatan', variant: 'warning', icon: HardDrive },
  { name: 'Pemrosesan Media', status: 'Sehat', variant: 'success', icon: Activity },
  { name: 'Basis Data', status: 'Luring', variant: 'danger', icon: Database },
];

export function SystemHealthPanel() {
  return (
    <DashboardCard title="Kesehatan sistem" description="Cuplikan kesiapan operasional untuk ruang kerja.">
      <div className="grid gap-3 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div key={service.name} className="flex items-center justify-between rounded-xl border border-[#E7E7E7] bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-[#184D47]/10 bg-[#184D47]/5 p-2.5 text-[#184D47]">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[0.8125rem] font-medium text-neutral-800">{service.name}</p>
                  <p className="text-[0.75rem] text-neutral-500">Sinyal kesehatan (simulasi)</p>
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
