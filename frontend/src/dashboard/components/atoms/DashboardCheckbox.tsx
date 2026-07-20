import { type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { dashboardFocusRingClassName } from '@/dashboard/theme/dashboardStyles';

export interface DashboardCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export function DashboardCheckbox({ label, description, className, id, ...props }: DashboardCheckboxProps) {
  const checkboxId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={checkboxId} className="flex items-start gap-3 rounded-[0.9rem] border border-[#e6eae9] bg-white p-3">
      <input id={checkboxId} type="checkbox" className={clsx('mt-1 h-4 w-4 rounded border-[#cbd5e1] text-[#0f766e] focus:ring-[#0f766e]', dashboardFocusRingClassName, className)} {...props} />
      <span className="space-y-1">
        <span className="block text-sm font-medium text-[#0f1720]">{label}</span>
        {description ? <span className="block text-sm text-[#64748b]">{description}</span> : null}
      </span>
    </label>
  );
}
