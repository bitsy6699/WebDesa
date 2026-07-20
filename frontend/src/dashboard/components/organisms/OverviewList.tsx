import { clsx } from 'clsx';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';

interface OverviewListItem {
  title: string;
  meta: string;
  badge?: string;
}

export interface OverviewListProps {
  title: string;
  description: string;
  items: OverviewListItem[];
  className?: string;
}

export function OverviewList({ title, description, items, className }: OverviewListProps) {
  return (
    <DashboardCard title={title} description={description} className={className}>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.title} className="flex items-start justify-between gap-3 rounded-[1rem] border border-[#f0f3f2] bg-[#fcfdfd] p-4">
            <div className="min-w-0">
              <p className="font-medium text-[#0f1720]">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-[#64748b]">{item.meta}</p>
            </div>
            {item.badge ? <span className={clsx('shrink-0 rounded-full border border-[#dff6f2] bg-[#f3fbf8] px-2.5 py-1 text-[0.7rem] font-medium text-[#0f766e]')}>{item.badge}</span> : null}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
