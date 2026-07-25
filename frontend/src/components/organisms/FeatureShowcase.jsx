import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

const FADE = {
  hidden: (i) => ({ opacity: 0, y: 32, x: 0 }),
  visible: (i) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

/**
 * FeatureShowcase — Editorial storytelling block for village features.
 *
 * A reusable 2-column layout for Tourism, UMKM, Culture, and Agriculture.
 * Dominant image paired with strong title, narrative, and optional metadata.
 *
 * Mobile: stacked — image (16:9) → label → title → description → stats → CTA
 * Desktop: side-by-side — image on left or right, text on the other
 *
 * @param {object}   props
 * @param {string}   props.title        — Strong section heading
 * @param {string}   props.category     — Small category label (e.g. "Wisata", "UMKM")
 * @param {string}   props.description  — 2–3 sentence narrative
 * @param {string}   props.image        — Image src URL
 * @param {string}   props.imageAlt     — Accessible alt text
 * @param {Array}    [props.stats]      — Optional metadata [{label, value}]
 * @param {object}   [props.cta]        — Optional CTA {to, label}
 * @param {'left'|'right'} [props.align='left'] — Image position on desktop
 * @param {string}   [props.className]  — Additional wrapper classes
 * @param {ReactNode}[props.children]   — Optional extra content below description
 */
export function FeatureShowcase({
  title,
  category,
  description,
  image,
  imageAlt,
  stats,
  cta,
  align = 'left',
  className,
  children,
}) {
  const prefersReducedMotion = useReducedMotion();
  const imageOnLeft = align === 'left';

  return (
    <section
      className={clsx('relative overflow-hidden', className)}
      style={{ background: 'transparent' }}
      aria-label={category ? `${category}: ${title}` : title}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
        <div
          className={clsx(
            'grid items-center gap-8 lg:gap-14',
            'grid-cols-1 lg:grid-cols-2',
          )}
        >
          {/* ── Image column ──────────────────────────────────────── */}
          <motion.div
            className={clsx(
              'relative overflow-hidden rounded-3xl',
              imageOnLeft ? 'lg:order-1' : 'lg:order-2',
            )}
            style={{ aspectRatio: '4 / 3' }}
            variants={FADE}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            custom={imageOnLeft ? 0 : 1}
          >
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            {/* Soft vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 55%, rgba(15,61,52,0.1) 100%)',
              }}
            />
          </motion.div>

          {/* ── Text column ───────────────────────────────────────── */}
          <div
            className={clsx(
              'flex flex-col gap-5',
              imageOnLeft ? 'lg:order-2 lg:pl-2' : 'lg:order-1 lg:pr-2',
            )}
          >
            {/* Category label */}
            <motion.div
              variants={FADE}
              initial="hidden"
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.3 }}
              custom={imageOnLeft ? 1 : 0}
            >
              {category && (
                <span className="inline-block rounded-full border border-primary/15 bg-primary/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {category}
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h2
              className="font-heading text-[1.625rem] font-bold leading-[1.15] tracking-[-0.02em] text-primary-dark sm:text-[1.875rem] lg:text-[2.125rem]"
              variants={FADE}
              initial="hidden"
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.3 }}
              custom={imageOnLeft ? 1.5 : 0.5}
            >
              {title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="max-w-[520px] text-[15px] leading-[1.8] text-neutral-500 sm:text-[16px]"
              variants={FADE}
              initial="hidden"
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.3 }}
              custom={imageOnLeft ? 2 : 1}
            >
              {description}
            </motion.p>

            {/* Optional children slot */}
            {children && (
              <motion.div
                variants={FADE}
                initial="hidden"
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={{ once: true, amount: 0.3 }}
                custom={imageOnLeft ? 2.5 : 1.5}
              >
                {children}
              </motion.div>
            )}

            {/* Stats row */}
            {stats && stats.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-x-7 gap-y-3 pt-1"
                variants={FADE}
                initial="hidden"
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={{ once: true, amount: 0.3 }}
                custom={imageOnLeft ? 3 : 2}
              >
                {stats.map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                      {label}
                    </span>
                    <span className="mt-0.5 text-[14px] font-semibold text-primary-dark sm:text-[15px]">
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA */}
            {cta && (
              <motion.div
                className="pt-1"
                variants={FADE}
                initial="hidden"
                whileInView={prefersReducedMotion ? undefined : 'visible'}
                viewport={{ once: true, amount: 0.3 }}
                custom={imageOnLeft ? 3.5 : 2.5}
              >
                <Link
                  to={cta.to}
                  className="group inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold text-primary-dark transition-all duration-200 hover:-translate-y-[1px] hover:bg-primary/5 hover:shadow-[0_8px_24px_rgba(24,77,71,0.10)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  {cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
