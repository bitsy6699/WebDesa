import { clsx } from 'clsx';

export interface SkeletonProps {
  className?: string;
  variant?: 'glass' | 'neutral';
}

/**
 * Skeleton - Shimmering placeholder for loading states.
 * Standardized in Phase 7.3 to have a premium glassy look with rounded corners,
 * preventing Cumulative Layout Shift (CLS) and matching final layout spacing.
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.17 Loading Skeleton
 */
export function Skeleton({ className, variant = 'glass' }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      className={clsx(
        'rounded-2xl animate-shimmer',
        variant === 'glass'
          ? 'bg-white/16 border border-white/18 backdrop-blur-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
          : 'bg-neutral-200/50',
        className,
      )}
    />
  );
}
