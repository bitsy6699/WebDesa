import { clsx } from 'clsx';
import { type ReactNode } from 'react';

export interface BadgeProps {
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'gray';
  children: ReactNode;
  className?: string;
}

/**
 * Badge - Small status or category label.
 * Pill-shaped with text-label typography scale.
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.10 Badge, §3.2 Type Scale (text-label)
 */
export function Badge({ color = 'gray', children, className }: BadgeProps) {
  const colors: Record<NonNullable<BadgeProps['color']>, string> = {
    primary:   'bg-[--color-primary] text-white',
    secondary: 'bg-[--color-secondary] text-white',
    accent:    'bg-[--color-accent] text-white',
    success:   'bg-[--color-success] text-white',
    warning:   'bg-[--color-warning] text-[--neutral-900]',
    error:     'bg-[--color-error] text-white',
    info:      'bg-[--color-info] text-white',
    gray:      'bg-[--neutral-200] text-[--neutral-700]',
  };

  return (
    <span
      className={clsx(
        /* Layout */
        'inline-flex items-center gap-1 px-2.5 py-0.5',
        /* Shape */
        'rounded-[--radius-full]',
        /* Typography — text-label from DESIGN_SYSTEM.md §3.2 */
        'text-label font-semibold whitespace-nowrap',
        /* Color */
        colors[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
