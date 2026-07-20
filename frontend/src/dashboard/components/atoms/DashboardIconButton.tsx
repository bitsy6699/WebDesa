import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { clsx } from 'clsx';
import { dashboardFocusRingClassName } from '@/dashboard/theme/dashboardStyles';

export interface DashboardIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: 'default' | 'ghost' | 'danger';
}

const variants = {
  default: 'border-[#e6eae9] bg-white text-[#334155] hover:bg-[#f3f5f5]',
  ghost: 'border-transparent bg-transparent text-[#334155] hover:bg-[#f3f5f5]',
  danger: 'border-transparent bg-[#fef2f2] text-[#991b1b] hover:bg-[#fee2e2]',
};

export const DashboardIconButton = forwardRef<HTMLButtonElement, DashboardIconButtonProps>(
  ({ icon, className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          'inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200',
          dashboardFocusRingClassName,
          variants[variant],
          className,
        )}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

DashboardIconButton.displayName = 'DashboardIconButton';
