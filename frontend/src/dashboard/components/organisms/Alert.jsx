import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { clsx } from 'clsx';

const variants = {
  info: 'border-sky-200 bg-sky-50 text-sky-800',
  success: 'border-green-200 bg-green-50 text-green-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  danger: 'border-red-200 bg-red-50 text-red-800',
};

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  danger: AlertCircle,
};

export function Alert({ title, description, variant = 'info', onDismiss, className }) {
  const Icon = icons[variant];

  return (
    <div className={clsx('flex gap-3 rounded-xl border px-4 py-3', variants[variant], className)} role="alert">
      <div className="mt-0.5 shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.8125rem] font-medium">{title}</p>
        {description ? <p className="mt-1 text-[0.75rem] leading-relaxed opacity-80">{description}</p> : null}
      </div>
      {onDismiss ? (
        <button type="button" onClick={onDismiss} className="shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity" aria-label="Tutup">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      ) : null}
    </div>
  );
}
