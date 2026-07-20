import { type ButtonHTMLAttributes, type ElementType, forwardRef, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { LoaderCircle } from 'lucide-react';
import { dashboardFocusRingClassName } from '@/dashboard/theme/dashboardStyles';

export interface DashboardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  as?: 'button' | 'a';
  loading?: boolean;
  children: ReactNode;
}

const baseStyles = [
  'inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-all duration-200',
  'whitespace-nowrap align-middle shadow-[0_1px_2px_rgba(15,23,32,0.04)]',
  dashboardFocusRingClassName,
];

const variants = {
  primary: 'border-transparent bg-[#0f766e] text-white hover:bg-[#0d5f57]',
  secondary: 'border-[#e6eae9] bg-white text-[#0f1720] hover:bg-[#f3f5f5]',
  ghost: 'border-transparent bg-transparent text-[#334155] shadow-none hover:bg-[#f3f5f5]',
  outline: 'border-[#0f766e] bg-transparent text-[#0f766e] shadow-none hover:bg-[#dff6f2]',
  danger: 'border-transparent bg-[#fef2f2] text-[#991b1b] hover:bg-[#fee2e2]',
  success: 'border-transparent bg-[#ecfdf3] text-[#166534] hover:bg-[#d1fae5]',
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
};

export const DashboardButton = forwardRef<HTMLElement, DashboardButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className, children, as: Component = 'button', loading = false, disabled = false, ...props }, ref) => {
    const Tag = Component as ElementType;

    return (
      <Tag
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', disabled && 'cursor-not-allowed opacity-60', className)}
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
