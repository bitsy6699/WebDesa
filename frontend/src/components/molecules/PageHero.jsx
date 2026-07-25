import { motion, useReducedMotion } from 'framer-motion';
import { Breadcrumb } from '@/components/molecules/Breadcrumb';
import { clsx } from 'clsx';

const FADE = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const EXPERIENCE_HERO_1 = '/experience/hero-1.png';
const EXPERIENCE_HERO_2 = '/experience/hero-2.png';

export function PageHero({
  image,
  imageAlt,
  title,
  description,
  breadcrumb,
  variant = 'image',
  className,
  children,
}) {
  const prefersReducedMotion = useReducedMotion();
  const hasImage = (variant === 'image' || variant === 'editorial') && image;

  const bgStyle = (() => {
    if (hasImage) return undefined;
    switch (variant) {
      case 'gradient':
        return { background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' };
      case 'slim':
        return { background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' };
      case 'statistics':
        return { background: 'linear-gradient(135deg, var(--color-primary) 0%, #2d7c5f 100%)' };
      case 'compact':
        return { background: 'var(--bg-surface-alt)' };
      default:
        return undefined;
    }
  })();

  const containerClass = 'mx-auto max-w-[1120px] px-5 sm:px-6 lg:px-8';

  const sectionClass = (() => {
    switch (variant) {
      case 'image':
        return 'relative overflow-hidden min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]';
      case 'editorial':
        return 'relative overflow-hidden min-h-[260px] sm:min-h-[300px] lg:min-h-[340px]';
      case 'gradient':
        return 'relative overflow-hidden py-12 sm:py-16 lg:py-20';
      case 'slim':
        return 'relative overflow-hidden py-12 sm:py-16 lg:py-20';
      case 'compact':
        return 'relative overflow-hidden py-8 sm:py-10 lg:py-12';
      case 'statistics':
        return 'relative overflow-hidden py-12 sm:py-16 lg:py-20';
      default:
        return 'relative overflow-hidden';
    }
  })();

  const innerPadding = (() => {
    switch (variant) {
      case 'image':
        return 'pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24';
      case 'editorial':
        return 'pt-10 pb-14 sm:pt-14 sm:pb-18 lg:pt-16 lg:pb-20';
      default:
        return '';
    }
  })();

  const isCentered = variant === 'compact' || variant === 'slim';

  const isDarkBg = variant !== 'compact';
  const titleColor = isDarkBg ? 'text-white' : 'text-primary-dark';
  const descColor = isDarkBg ? 'text-white/80' : 'text-neutral-500';

  const breadcrumbClassName = isDarkBg
    ? 'text-white/70 [&_a]:hover:text-white [&_span]:text-white/90'
    : '';

  const textureVariant = (() => {
    if (hasImage || variant === 'compact') return null;
    if (variant === 'statistics') return EXPERIENCE_HERO_2;
    return EXPERIENCE_HERO_1;
  })();

  return (
    <section
      className={clsx(sectionClass, className)}
      style={bgStyle}
    >
      {hasImage && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <motion.img
            src={image}
            alt={imageAlt || ''}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            initial={false}
            animate={prefersReducedMotion ? { scale: 1 } : { scale: [1, 1.04] }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
            }
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(11,40,35,0.72) 0%, rgba(15,61,52,0.48) 40%, rgba(24,77,71,0.18) 70%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                'linear-gradient(90deg, rgba(11,40,35,0.38) 0%, transparent 55%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 45%, rgba(11,40,35,0.28) 100%)',
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-20"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-page))' }}
          />
        </div>
      )}

      {textureVariant && (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.07]" aria-hidden="true">
          <img
            src={textureVariant}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className={clsx('relative z-10', containerClass)}>
        <div
          className={clsx(
            'flex flex-col',
            innerPadding,
            isCentered ? 'items-center text-center' : '',
          )}
        >
          {breadcrumb && (
            <motion.div
              variants={FADE}
              initial={false}
              animate={prefersReducedMotion ? undefined : 'visible'}
            >
              <Breadcrumb items={breadcrumb} className={breadcrumbClassName} />
            </motion.div>
          )}

          <motion.h1
            className={clsx(
              'mt-4 font-heading font-bold leading-[1.15] tracking-[-0.02em]',
              titleColor,
              hasImage
                ? 'text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem]'
                : 'text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem]',
            )}
            variants={FADE}
            initial={false}
            animate={prefersReducedMotion ? undefined : 'visible'}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className={clsx(
                'mt-3 text-[15px] leading-[1.75] sm:text-[16px]',
                descColor,
                isCentered ? 'max-w-[580px]' : 'max-w-[580px]',
              )}
              variants={FADE}
              initial={false}
              animate={prefersReducedMotion ? undefined : 'visible'}
            >
              {description}
            </motion.p>
          )}

          {children && (
            <motion.div
              className="mt-5"
              variants={FADE}
              initial={false}
              animate={prefersReducedMotion ? undefined : 'visible'}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
