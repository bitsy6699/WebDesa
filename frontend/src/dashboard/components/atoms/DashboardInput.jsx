import { clsx } from 'clsx';
import { dashboardInputClassName } from '@/dashboard/theme/dashboardStyles';

export function DashboardInput({ label, helperText, error, required = false, className, id, ...props }) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="flex items-center gap-1 text-sm font-medium text-neutral-700">
          <span>{label}</span>
          {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}
      <input id={inputId} className={clsx(dashboardInputClassName, error && 'border-red-300 focus:border-red-500 focus-visible:ring-red-500/20', className)} aria-invalid={Boolean(error)} {...props} />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      {helperText && !error ? <p className="text-xs text-neutral-400">{helperText}</p> : null}
    </div>
  );
}

export function DashboardTextarea({ label, helperText, error, required = false, className, id, ...props }) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={textareaId} className="flex items-center gap-1 text-sm font-medium text-neutral-700">
          <span>{label}</span>
          {required ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}
      <textarea id={textareaId} className={clsx(dashboardInputClassName, 'min-h-[7rem] resize-y', error && 'border-red-300 focus:border-red-500 focus-visible:ring-red-500/20', className)} aria-invalid={Boolean(error)} {...props} />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      {helperText && !error ? <p className="text-xs text-neutral-400">{helperText}</p> : null}
    </div>
  );
}
