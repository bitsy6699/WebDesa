import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * Breadcrumb — Navigation breadcrumb trail.
 *
 * Replaces the 3 different inline breadcrumb implementations
 * found in PotentialsDirectory, PotentialDetail, and CategoriesExplorer.
 *
 * Mobile: truncated to last 2 items
 * Desktop: full trail
 *
 * @param {Array<{label: string, to?: string}>} items — Breadcrumb items. Last item has no `to`.
 * @param {string} [className]
 */
export function Breadcrumb({ items, className }) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx('flex items-center gap-1.5 text-[13px] sm:text-sm', className)}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isSecondToLast = index === items.length - 2;
          const isHiddenOnMobile = items.length > 3 && index === 0 && !isLast && !isSecondToLast;

          return (
            <li
              key={item.label}
              className={clsx(
                'flex items-center gap-1.5',
                isHiddenOnMobile && 'hidden sm:flex',
              )}
            >
              {index > 0 && (
                <ChevronRight
                  className="h-3 w-3 shrink-0 text-neutral-300"
                  aria-hidden="true"
                />
              )}
              {isLast || !item.to ? (
                <span
                  className="text-primary font-medium"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-neutral-400 transition-colors duration-150 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
