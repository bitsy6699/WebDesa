import { clsx } from 'clsx';

/**
 * PageContainer — Standardized max-width container.
 *
 * Resolves the "container width chaos" identified in the UI audit.
 * All public pages should use this instead of inventing their own max-w.
 *
 * Sizes:
 * - 'narrow'  → 720px  (reading-focused: articles, text-heavy)
 * - 'default' → 1120px (standard content: grids, 2-col layouts)
 * - 'wide'    → 1240px (expansive: directories, dashboards)
 * - 'full'    → 1440px (hero bleed, full-width sections)
 *
 * @param {object}  props
 * @param {'narrow'|'default'|'wide'|'full'} [props.size='default']
 * @param {string}  [props.className]
 * @param {ReactNode} props.children
 * @param {boolean} [props.as='div'] — Render as different element
 */
export function PageContainer({
  size = 'default',
  className,
  children,
  as: Tag = 'div',
  ...rest
}) {
  const sizeClass = {
    narrow: 'max-w-[720px]',
    default: 'max-w-[1120px]',
    wide: 'max-w-[1240px]',
    full: 'max-w-[1440px]',
  }[size];

  return (
    <Tag
      className={clsx('mx-auto w-full px-5 sm:px-6 lg:px-8', sizeClass, className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
