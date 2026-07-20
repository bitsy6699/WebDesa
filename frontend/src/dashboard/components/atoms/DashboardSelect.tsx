import { type SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { dashboardInputClassName } from '@/dashboard/theme/dashboardStyles';

export interface DashboardSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export function DashboardSelect({ label, helperText, error, required = false, className, id, ...props }: DashboardSelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={selectId} className="flex items-center gap-1 text-sm font-medium text-[#0f1720]">
          <span>{label}</span>
          {required ? <span className="text-[#dc2626]">*</span> : null}
        </label>
      ) : null}
      <select id={selectId} className={clsx(dashboardInputClassName, 'appearance-none pr-10', className)} aria-invalid={Boolean(error)} {...props} />
      {error ? <p className="text-sm text-[#dc2626]">{error}</p> : null}
      {helperText && !error ? <p className="text-sm text-[#64748b]">{helperText}</p> : null}
    </div>
  );
}
