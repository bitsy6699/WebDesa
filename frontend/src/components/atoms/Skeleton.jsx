import { clsx } from 'clsx';

export function Skeleton({ className }) {
  return (
    <div
      className={clsx('animate-pulse rounded-xl bg-neutral-200', className)}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={clsx('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx('h-4 rounded', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-neutral-200 bg-white p-6',
        className,
      )}
      aria-hidden="true"
    >
      <div className="space-y-4">
        <Skeleton className="h-5 w-1/3" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}

export function SkeletonKpiCard({ className }) {
  return (
    <div
      className={clsx(
        'h-32 rounded-2xl border border-neutral-200 bg-white p-5',
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, className }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-neutral-200 bg-white p-6',
        className,
      )}
      aria-hidden="true"
    >
      <div className="space-y-4">
        <Skeleton className="h-5 w-1/4" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-neutral-200 last:border-0">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonAvatar({ size = 'md', className }) {
  const sizeMap = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' };
  return (
    <Skeleton
      className={clsx('rounded-full', sizeMap[size], className)}
      aria-hidden="true"
    />
  );
}

export function SkeletonImage({ className }) {
  return (
    <Skeleton
      className={clsx('aspect-square rounded-xl', className)}
      aria-hidden="true"
    />
  );
}
