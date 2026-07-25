import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { clsx } from 'clsx';

const FADE = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * PageHeader — Section heading with optional eyebrow, description, and CTA.
 *
 * An enhanced version of SectionHeader with built-in scroll-reveal animation.
 * Used for section-level headings within a page (not the hero).
 *
 * @param {object}  props
 * @param {string}  [props.eyebrow]   — Small label above title
 * @param {string}  props.title       — Section heading
 * @param {string}  [props.description] — Supporting text
 * @param {string}  [props.ctaTo]     — CTA link destination
 * @param {string}  [props.ctaLabel]  — CTA button text
 * @param {'left'|'between'} [props.layout='between'] — Layout: left-aligned or space-between
 * @param {string}  [props.className]
 * @param {ReactNode} [props.children] — Extra content below description
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  ctaTo,
  ctaLabel,
  layout = 'between',
  className,
  children,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={clsx(
        'flex flex-col gap-6',
        layout === 'between' ? 'lg:flex-row lg:items-end lg:justify-between' : '',
        className,
      )}
      variants={FADE}
      initial="hidden"
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        )}
        <h2
          className={clsx(
            'mt-2 font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-primary-dark sm:text-[1.75rem] lg:text-[2rem]',
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-[620px] text-[15px] leading-[1.75] text-neutral-500">
            {description}
          </p>
        )}
        {children}
      </div>

      {ctaTo && ctaLabel && (
        <div className="lg:pt-1">
          <Link
            to={ctaTo}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold text-primary-dark transition-all duration-200 hover:-translate-y-[1px] hover:bg-primary/5 hover:shadow-[0_8px_24px_rgba(24,77,71,0.10)]"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
