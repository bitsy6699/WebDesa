import { clsx } from 'clsx';

export interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton - Shimmering placeholder for loading states.
 * Uses animate-shimmer from index.css for a horizontal gradient sweep.
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.17 Loading Skeleton
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      className={clsx(
        'rounded-[--radius-md] animate-shimmer',
        className,
      )}
    />
  );
}
