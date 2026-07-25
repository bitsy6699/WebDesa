import { motion, useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';

const FADE = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * PageSection — Reusable section wrapper with consistent spacing and background.
 *
 * Replaces the ad-hoc section wrappers found across AboutPage, ContactPage,
 * CategoriesExplorer, and StatisticsPage. Each had different padding values,
 * different background colors, and different container widths.
 *
 * @param {object}  props
 * @param {'default'|'surface'|'muted'|'tinted'} [props.background='default']
 * @param {'none'|'narrow'|'default'|'wide'} [props.container='default']
 * @param {boolean} [props.animated=true] — Enable scroll-reveal
 * @param {string}  [props.id] — Section id for anchor links
 * @param {string}  [props.ariaLabel]
 * @param {string}  [props.className]
 * @param {ReactNode} props.children
 */
export function PageSection({
  background = 'default',
  container = 'default',
  animated = true,
  id,
  ariaLabel,
  className,
  children,
}) {
  const prefersReducedMotion = useReducedMotion();

  const bg = {
    default: '',
    surface: 'bg-[var(--bg-surface-alt)]',
    muted: 'bg-neutral-50',
    tinted: 'bg-primary/3',
  }[background];

  const containerClass = {
    none: '',
    narrow: 'mx-auto max-w-[720px] px-5 sm:px-6 lg:px-8',
    default: 'mx-auto max-w-[1120px] px-5 sm:px-6 lg:px-8',
    wide: 'mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8',
  }[container];

  const content = container !== 'none' ? (
    <div className={containerClass}>{children}</div>
  ) : (
    children
  );

  if (!animated) {
    return (
      <section
        id={id}
        aria-label={ariaLabel}
        className={clsx('py-16 sm:py-20 lg:py-24', bg, className)}
      >
        {content}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      aria-label={ariaLabel}
      className={clsx('py-16 sm:py-20 lg:py-24', bg, className)}
      variants={FADE}
      initial="hidden"
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.15 }}
    >
      {content}
    </motion.section>
  );
}
