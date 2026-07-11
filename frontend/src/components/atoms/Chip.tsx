import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { clsx } from 'clsx';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  active?: boolean;
  children: ReactNode;
  icon?: ReactNode;
}

/**
 * Chip - Interactive category filter toggle.
 *
 * States: Default (outline), Hover (tinted), Active (solid primary fill).
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.4 Category Chip
 */
export function Chip({ active = false, children, icon, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={clsx(
        /* Base layout */
        'inline-flex items-center gap-1.5 px-3.5 py-1.5',
        /* Shape */
        'rounded-[--radius-full]',
        /* Typography */
        'text-sm font-medium',
        /* Transition */
        'transition-all duration-[--duration-fast] ease-[--ease-default]',
        /* Focus */
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-1',
        /* Active state: solid primary fill */
        active
          ? 'bg-[--color-primary] text-white border border-[--color-primary] shadow-[var(--shadow-sm)]'
          /* Default state: outline with hover */
          : 'bg-[--bg-surface] text-[--neutral-700] border border-[--border-default] hover:border-[--color-primary] hover:text-[--color-primary] hover:bg-[--neutral-50]',
        className,
      )}
      {...props}
    >
      {icon && (
        <span className={clsx('flex-shrink-0', active ? 'text-white' : 'text-[--neutral-500]')}>
          {icon}
        </span>
      )}
      {children}
    </button>
  );
}
