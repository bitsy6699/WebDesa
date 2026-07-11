import { type ReactNode, forwardRef, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
}

/**
 * Card - Surface container for grouping related content.
 *
 * Resting elevation: shadow-md (per DESIGN_SYSTEM.md §6 shadow-md = Cards)
 * Hoverable elevation: shadow-lg + lift (DESIGN_SYSTEM.md §9.4 Card Hover)
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.7 Unified Potential Card, §6 Shadow System
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'overflow-hidden rounded-[--radius-lg] bg-[--bg-surface] border border-[--border-default]',
          'shadow-[var(--shadow-md)]',
          hoverable && [
            'transition-all ease-[--ease-default]',
            'duration-[--duration-fast]',
            'hover:-translate-y-1.5',
            'hover:shadow-[var(--shadow-lg)]',
            'cursor-pointer',
          ],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
