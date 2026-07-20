import { clsx } from 'clsx';

export interface StatusChipProps {
  label: string;
  variant?: 'success' | 'warning' | 'info' | 'danger' | 'neutral';
}

const variants = {
  success: 'border-[#bbf7d0] bg-[#ecfdf3] text-[#166534]',
  warning: 'border-[#fde68a] bg-[#fffbeb] text-[#92400e]',
  info: 'border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]',
  danger: 'border-[#fecaca] bg-[#fef2f2] text-[#991b1b]',
  neutral: 'border-[#e6eae9] bg-[#f8faf9] text-[#475569]',
};

export function StatusChip({ label, variant = 'neutral' }: StatusChipProps) {
  return <span className={clsx('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', variants[variant])}>{label}</span>;
}
