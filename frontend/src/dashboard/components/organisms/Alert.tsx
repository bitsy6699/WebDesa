import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { clsx } from 'clsx';

export interface AlertProps {
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
}

const variants = {
  info: 'border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]',
  success: 'border-[#bbf7d0] bg-[#ecfdf3] text-[#166534]',
  warning: 'border-[#fde68a] bg-[#fffbeb] text-[#92400e]',
  danger: 'border-[#fecaca] bg-[#fef2f2] text-[#991b1b]',
};

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  danger: AlertCircle,
};

export function Alert({ title, description, variant = 'info' }: AlertProps) {
  const Icon = icons[variant];

  return (
    <div className={clsx('flex gap-3 rounded-[1rem] border px-4 py-3', variants[variant])}>
      <div className="mt-0.5 shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        {description ? <p className="mt-1 text-sm leading-6 opacity-90">{description}</p> : null}
      </div>
    </div>
  );
}
