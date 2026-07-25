import { dashboardCardClassName } from '@/dashboard/theme/dashboardStyles';
import { clsx } from 'clsx';

export function FormSection({ title, description, children }) {
  return (
    <div className={clsx(dashboardCardClassName, 'p-6')}>
      {(title || description) && (
        <div className="mb-5 space-y-1">
          {title ? <h2 className="text-[0.875rem] font-semibold text-neutral-800">{title}</h2> : null}
          {description ? <p className="text-[0.75rem] text-neutral-500">{description}</p> : null}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}
