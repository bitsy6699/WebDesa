import { type ReactNode } from 'react';
import { DashboardBadge } from '@/dashboard/components/atoms/DashboardBadge';
import { dashboardTheme } from '@/dashboard/theme/dashboardTheme';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, badge, actions }: PageHeaderProps) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[1.25rem] border border-[#e6eae9] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,32,0.04)] md:flex-row md:items-end md:justify-between"
      style={{ backgroundColor: dashboardTheme.colors.surface, borderColor: dashboardTheme.colors.border, boxShadow: dashboardTheme.shadows.sm }}
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[1.5rem] font-semibold tracking-tight text-[#0f1720]">{title}</h1>
          {badge ? <DashboardBadge>{badge}</DashboardBadge> : null}
        </div>
        {description ? <p className="max-w-2xl text-sm leading-6 text-[#64748b]">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
