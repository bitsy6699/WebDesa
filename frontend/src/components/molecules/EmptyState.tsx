import { clsx } from 'clsx';
import { type ReactNode } from 'react';

interface EmptyStateProps {
  /** Icon or illustration to display above the title. */
  icon?: ReactNode;
  /** Short descriptive title of the empty state. */
  title: string;
  /** Optional supporting explanation text. */
  description?: string;
  /** Optional call-to-action button or link. */
  action?: ReactNode;
  /** Optional additional Tailwind classes for the wrapper. */
  className?: string;
}

/**
 * EmptyState — Molecule-level component for no-data states.
 * Used in directory listings, CMS tables, and search result pages.
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.16 Empty State
 */
export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4 py-16 text-center',
        className,
      )}
    >
      {icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[--neutral-100] text-[--neutral-400]">
          {icon}
        </div>
      )}
      <div className="max-w-xs space-y-2">
        <h3 className="font-semibold text-[--neutral-800]">{title}</h3>
        {description && (
          <p className="text-sm text-[--neutral-500]">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
