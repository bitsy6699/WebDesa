import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { LoaderCircle } from 'lucide-react';
import { dashboardFocusRingClassName } from '@/dashboard/theme/dashboardStyles';

const baseStyles = [
  'inline-flex items-center justify-center gap-2 rounded-xl border font-semibold transition-all duration-150',
  'whitespace-nowrap align-middle',
  dashboardFocusRingClassName,
];

const variants = {
  primary: 'border-[#184D47] bg-[#184D47] text-white hover:bg-[#2F6B60] active:bg-[#0F3D34] shadow-[0_1px_2px_rgba(24,77,71,0.2)]',
  secondary: 'border-[#E8ECEA] bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 active:bg-neutral-100',
  ghost: 'border-transparent bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 active:bg-neutral-200',
  outline: 'border-[#E8ECEA] bg-transparent text-[#184D47] hover:bg-[#184D47]/5 active:bg-[#184D47]/10',
  danger: 'border-transparent bg-red-50 text-red-700 hover:bg-red-100 active:bg-red-200',
};

const sizes = {
  sm: 'h-8 px-3 text-[0.75rem]',
  md: 'h-9 px-4 text-[0.8125rem]',
  lg: 'h-10 px-5 text-[0.875rem]',
};

export const DashboardButton = forwardRef(
  ({ variant = 'primary', size = 'md', fullWidth = false, className, children, as: Component = 'button', loading = false, disabled = false, ...props }, ref) => {
    const Tag = Component;

    return (
      <Tag
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', (disabled || loading) && 'cursor-not-allowed opacity-50 pointer-events-none', className)}
        aria-busy={loading || undefined}
        disabled={disabled || loading || undefined}
        {...props}
      >
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        <span>{children}</span>
      </Tag>
    );
  },
);

DashboardButton.displayName = 'DashboardButton';
