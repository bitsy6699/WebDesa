import { clsx } from 'clsx';

/**
 * MetadataRow — Display key-value metadata.
 *
 * Replaces the duplicated metadata patterns found in PotentialDetail
 * (hero quick-info card, sidebar, and 2x2 info cards). Used for
 * stats, location info, dates, and category labels.
 *
 * Layouts:
 * - 'row': Horizontal — label and value side by side (default)
 * - 'stack': Vertical — label on top, value below
 * - 'inline': Compact horizontal for use inside other components
 *
 * @param {object}  props
 * @param {Array<{label: string, value: string|ReactNode, icon?: ReactNode}>} props.items
 * @param {'row'|'stack'|'inline'} [props.layout='row']
 * @param {string}  [props.className]
 */
export function MetadataRow({ items, layout = 'row', className }) {
  if (!items || items.length === 0) return null;

  const containerClass = {
    row: 'flex flex-wrap gap-x-7 gap-y-4',
    stack: 'flex flex-col gap-4',
    inline: 'flex flex-wrap items-center gap-x-5 gap-y-2',
  }[layout];

  return (
    <div className={clsx(containerClass, className)}>
      {items.map(({ label, value, icon }) => (
        <div key={label} className={clsx('flex', layout === 'row' ? 'flex-col gap-0.5' : 'items-center gap-2')}>
          {icon && layout === 'inline' && (
            <span className="text-neutral-400" aria-hidden="true">{icon}</span>
          )}
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
            {label}
          </span>
          <span
            className={clsx(
              'text-[14px] font-semibold text-primary-dark sm:text-[15px]',
              layout === 'inline' && 'text-[13px] font-medium text-neutral-600',
            )}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
