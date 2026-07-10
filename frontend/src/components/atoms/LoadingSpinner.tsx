import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  /** Optional additional Tailwind classes for sizing or color. */
  className?: string;
  /** Accessible label for screen readers. */
  label?: string;
}

/**
 * LoadingSpinner — ATOM-level loading indicator.
 * Renders an SVG spinner with ARIA attributes for accessibility.
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.17 Loading Skeleton
 */
export default function LoadingSpinner({
  className,
  label = 'Memuat...',
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      aria-busy="true"
      className={clsx('flex items-center justify-center', className)}
    >
      <svg
        className="h-6 w-6 animate-spin text-[--color-primary]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
