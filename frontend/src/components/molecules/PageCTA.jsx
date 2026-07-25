import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

const FADE = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * PageCTA — Consistent call-to-action banner for the bottom of pages.
 *
 * Replaces the custom inline CTAs found in PotentialDetail, AboutPage,
 * and ContactPage. Provides a unified visual closing before the footer.
 *
 * Two modes:
 * - 'dark': Dark green gradient banner (like CTASection on Home)
 * - 'light': Clean white card on neutral background (for sub-pages)
 *
 * @param {object}  props
 * @param {string}  props.title       — CTA heading
 * @param {string}  [props.description] — Supporting text
 * @param {string}  props.ctaTo       — Primary CTA destination
 * @param {string}  props.ctaLabel    — Primary CTA text
 * @param {string}  [props.ctaTo2]    — Optional secondary CTA destination
 * @param {string}  [props.ctaLabel2] — Optional secondary CTA text
 * @param {'dark'|'light'} [props.variant='dark']
 * @param {string}  [props.className]
 */
export function PageCTA({
  title,
  description,
  ctaTo,
  ctaLabel,
  ctaTo2,
  ctaLabel2,
  variant = 'dark',
  className,
}) {
  const prefersReducedMotion = useReducedMotion();
  const isDark = variant === 'dark';

  return (
    <section
      className={clsx('relative overflow-hidden', className)}
      aria-label={title}
    >
      <div className="mx-auto max-w-[980px] px-5 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          className={clsx(
            'relative rounded-[28px] px-6 py-12 text-center sm:px-10 sm:py-14 lg:px-16 lg:py-16',
            isDark ? '' : 'border border-neutral-200 bg-white shadow-[0_4px_24px_rgba(24,77,71,0.06)]',
          )}
          style={isDark ? {
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
          } : undefined}
          variants={FADE}
          initial="hidden"
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2
            className={clsx(
              'font-heading text-[1.375rem] font-bold leading-tight tracking-[-0.01em] sm:text-[1.625rem] lg:text-[1.875rem]',
              isDark ? 'text-white' : 'text-primary-dark',
            )}
          >
            {title}
          </h2>

          {description && (
            <p
              className={clsx(
                'mx-auto mt-4 max-w-[540px] text-[15px] leading-[1.75]',
                isDark ? 'text-white/78' : 'text-neutral-500',
              )}
            >
              {description}
            </p>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={ctaTo}
              className={clsx(
                'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]',
                isDark
                  ? 'bg-white text-primary shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)]'
                  : 'bg-primary text-white shadow-[0_4px_16px_rgba(24,77,71,0.2)] hover:shadow-[0_8px_24px_rgba(24,77,71,0.28)]',
              )}
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            {ctaTo2 && ctaLabel2 && (
              <Link
                to={ctaTo2}
                className={clsx(
                  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]',
                  isDark
                    ? 'border border-white/25 text-white hover:bg-white/10'
                    : 'border border-primary/15 text-primary-dark hover:bg-primary/5',
                )}
              >
                {ctaLabel2}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
