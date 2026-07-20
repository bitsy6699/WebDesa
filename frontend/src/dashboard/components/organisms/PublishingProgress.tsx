import { ProgressIndicator } from '@/dashboard/components/molecules/ProgressIndicator';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';

interface PublishingProgressItem {
  label: string;
  value: number;
  max?: number;
}

export interface PublishingProgressProps {
  items: PublishingProgressItem[];
}

export function PublishingProgress({ items }: PublishingProgressProps) {
  return (
    <DashboardCard title="Publishing progress" description="Current content distribution across editorial states.">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm text-[#64748b]">
              <span>{item.label}</span>
              <span>{item.value}/{item.max ?? 100}</span>
            </div>
            <ProgressIndicator value={item.value} label="" max={item.max ?? 100} />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
