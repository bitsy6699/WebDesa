import { clsx } from 'clsx';
import { dashboardCardClassName } from '@/dashboard/theme/dashboardStyles';

export function DashboardCard({ children, className, title, description, noPadding = false }) {
  return (
    <section className={clsx(dashboardCardClassName, !noPadding && 'p-5', className)}>
      {(title || description) && (
        <div className="mb-4 space-y-0.5">
          {title ? <h2 className="text-[0.875rem] font-semibold text-neutral-900">{title}</h2> : null}
          {description ? <p className="text-[0.75rem] text-neutral-500">{description}</p> : null}
        </div>
      )}
      {children}
    </section>
  );
}
