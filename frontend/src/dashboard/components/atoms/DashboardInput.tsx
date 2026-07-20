import { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { dashboardInputClassName } from '@/dashboard/theme/dashboardStyles';

export interface DashboardInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export function DashboardInput({ label, helperText, error, required = false, className, id, ...props }: DashboardInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={inputId} className="flex items-center gap-1 text-sm font-medium text-[#0f1720]">
          <span>{label}</span>
          {required ? <span className="text-[#dc2626]">*</span> : null}
        </label>
      ) : null}
      <input id={inputId} className={clsx(dashboardInputClassName, className)} aria-invalid={Boolean(error)} {...props} />
      {error ? <p className="text-sm text-[#dc2626]">{error}</p> : null}
      {helperText && !error ? <p className="text-sm text-[#64748b]">{helperText}</p> : null}
    </div>
  );
}

export interface DashboardTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export function DashboardTextarea({ label, helperText, error, required = false, className, id, ...props }: DashboardTextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-2">
      {label ? (
        <label htmlFor={textareaId} className="flex items-center gap-1 text-sm font-medium text-[#0f1720]">
          <span>{label}</span>
          {required ? <span className="text-[#dc2626]">*</span> : null}
        </label>
      ) : null}
      <textarea id={textareaId} className={clsx(dashboardInputClassName, 'min-h-[7rem] resize-y', className)} aria-invalid={Boolean(error)} {...props} />
      {error ? <p className="text-sm text-[#dc2626]">{error}</p> : null}
      {helperText && !error ? <p className="text-sm text-[#64748b]">{helperText}</p> : null}
    </div>
  );
}
