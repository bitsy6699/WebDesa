import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { dashboardFocusRingClassName } from '@/dashboard/theme/dashboardStyles';

export interface DashboardKpiCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  helperText: string;
  trend?: string;
  className?: string;
}

export function DashboardKpiCard({ icon, title, value, helperText, trend, className }: DashboardKpiCardProps) {
  const Icon = icon;

  return (
    <article
      className={clsx(
        'flex h-full flex-col justify-between rounded-[1.25rem] border border-[#e6eae9] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,32,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,32,0.06)]',
        dashboardFocusRingClassName,
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#64748b]">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#0f1720]">{value}</p>
        </div>
        <div className="rounded-2xl border border-[#dff6f2] bg-[#f3fbf8] p-3 text-[#0f766e]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm leading-6 text-[#64748b]">{helperText}</p>
        {trend ? <span className="rounded-full border border-[#dff6f2] bg-[#f3fbf8] px-2.5 py-1 text-[0.7rem] font-medium text-[#0f766e]">{trend}</span> : null}
      </div>
    </article>
  );
}
