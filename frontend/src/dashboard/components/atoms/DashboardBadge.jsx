import { clsx } from 'clsx';

const variants = {
  neutral: 'border-[#E7E7E7] bg-neutral-50 text-neutral-600',
  primary: 'border-[#184D47]/20 bg-[#184D47]/5 text-[#184D47]',
  success: 'border-green-200 bg-green-50 text-green-700',
  warning: 'border-amber-200 bg-amber-50 text-amber-700',
  danger: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-sky-200 bg-sky-50 text-sky-700',
};

export function DashboardBadge({ children, variant = 'neutral', className }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.7rem] font-semibold leading-5', variants[variant], className)}>
      {children}
    </span>
  );
}
