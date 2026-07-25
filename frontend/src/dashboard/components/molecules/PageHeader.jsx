import { DashboardBadge } from '@/dashboard/components/atoms/DashboardBadge';

export function PageHeader({ title, description, badge, badgeVariant, actions }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <h1 className="text-[1.125rem] font-semibold text-neutral-900">{title}</h1>
        {badge ? <DashboardBadge variant={badgeVariant}>{badge}</DashboardBadge> : null}
        {description ? <span className="hidden text-[0.8125rem] text-neutral-500 lg:inline">· {description}</span> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
