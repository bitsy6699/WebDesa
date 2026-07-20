import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { dashboardTheme } from '@/dashboard/theme/dashboardTheme';
import { dashboardFocusRingClassName } from '@/dashboard/theme/dashboardStyles';

export interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function DashboardCard({ children, className, title, description }: DashboardCardProps) {
  return (
    <section
      className={clsx('rounded-[1.25rem] border border-[#e6eae9] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,32,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,32,0.06)]', dashboardFocusRingClassName, className)}
      style={{ backgroundColor: dashboardTheme.colors.surface, borderColor: dashboardTheme.colors.border, boxShadow: dashboardTheme.shadows.sm }}
    >
      {(title || description) && (
        <div className="mb-4 space-y-1">
          {title ? <h2 className="text-[1rem] font-semibold tracking-tight text-[#0f1720]">{title}</h2> : null}
          {description ? <p className="text-sm leading-6 text-[#64748b]">{description}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}
