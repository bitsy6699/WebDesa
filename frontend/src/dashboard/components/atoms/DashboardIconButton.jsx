import { forwardRef } from 'react';
import { clsx } from 'clsx';

const variants = {
  default: 'border-[#E8ECEA] bg-white text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 active:bg-neutral-100',
  ghost: 'border-transparent bg-transparent text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 active:bg-neutral-200',
  danger: 'border-transparent bg-transparent text-red-500 hover:bg-red-50 active:bg-red-100',
};

export const DashboardIconButton = forwardRef(
  ({ icon, className, variant = 'default', size = 'md', ...props }, ref) => {
    const sizeClasses = size === 'sm' ? 'h-8 w-8 rounded-lg' : 'h-9 w-9 rounded-xl';

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          'inline-flex items-center justify-center border transition-all duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#184D47]',
          sizeClasses,
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
