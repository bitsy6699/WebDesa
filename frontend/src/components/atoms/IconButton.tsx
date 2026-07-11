import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon: ReactNode;
  'aria-label': string; // Enforce accessibility
}

/**
 * IconButton - Icon-only button.
 * Requires aria-label for accessibility.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { variant = 'ghost', size = 'md', icon, className, disabled, ...props },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center transition-colors duration-[--duration-fast] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] disabled:opacity-50 disabled:cursor-not-allowed rounded-full';
    
    const variants = {
      primary: 'bg-[--color-primary] text-white hover:bg-[--color-primary-dark]',
      secondary: 'bg-[--color-secondary] text-white hover:bg-[--color-secondary-light]',
      outline: 'border border-[--border-default] bg-transparent text-[--neutral-700] hover:border-[--color-primary] hover:text-[--color-primary]',
      ghost: 'bg-transparent text-[--neutral-600] hover:bg-[--neutral-100] hover:text-[--color-primary]',
    };
    
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
