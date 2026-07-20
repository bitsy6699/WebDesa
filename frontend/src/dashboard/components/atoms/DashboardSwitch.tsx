import { type InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { dashboardFocusRingClassName } from '@/dashboard/theme/dashboardStyles';

export interface DashboardSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export function DashboardSwitch({ label, description, className, id, ...props }: DashboardSwitchProps) {
  const switchId = id ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={switchId} className="flex items-center justify-between gap-3 rounded-[0.9rem] border border-[#e6eae9] bg-white p-3">
      <span className="space-y-1">
        <span className="block text-sm font-medium text-[#0f1720]">{label}</span>
        {description ? <span className="block text-sm text-[#64748b]">{description}</span> : null}
      </span>
      <span className="relative inline-flex h-6 w-11 items-center">
        <input id={switchId} type="checkbox" className={clsx('peer sr-only', dashboardFocusRingClassName, className)} {...props} />
        <span className="absolute h-5 w-11 rounded-full bg-[#cbd5e1] transition-all peer-checked:bg-[#0f766e]" />
        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-6" />
      </span>
    </label>
  );
}
