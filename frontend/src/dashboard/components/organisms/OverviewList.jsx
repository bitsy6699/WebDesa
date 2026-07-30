import { clsx } from 'clsx';
import { DashboardCard } from '@/dashboard/components/organisms/DashboardCard';

export function OverviewList({ title, description, items, className }) {
  return (
    <DashboardCard title={title} description={description} className={className}>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.title} className="flex items-start justify-between gap-3 rounded-xl border border-[#E7E7E7] bg-[#F8FAF8] p-4">
            <div className="min-w-0">
              <p className="text-[0.8125rem] font-medium text-neutral-800">{item.title}</p>
              <p className="mt-0.5 text-[0.75rem] leading-relaxed text-neutral-500">{item.meta}</p>
            </div>
            {item.badge ? <span className={clsx('shrink-0 rounded-full border border-[#184D47]/10 bg-[#184D47]/5 px-2.5 py-1 text-[0.65rem] font-semibold text-[#184D47]')}>{item.badge}</span> : null}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
