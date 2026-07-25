import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Leaf } from 'lucide-react';
import { clsx } from 'clsx';

const FADE = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function DecorativeMountain() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full h-16 sm:h-24 text-[#184D47] opacity-[0.04]"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 100 L120 40 L200 60 L300 10 L400 50 L500 20 L600 55 L700 15 L800 45 L900 5 L1000 50 L1100 25 L1200 60 L1320 30 L1440 100 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StoryDivider({
  title,
  subtitle,
  align = 'center',
  variant = 'sage',
  showIcon = false,
  className,
}) {
  const prefersReducedMotion = useReducedMotion();

  const alignClass = {
    center: 'items-center text-center',
    left: 'items-start text-left',
    right: 'items-end text-right',
  }[align];

  const lineMargin = {
    center: 'mx-auto',
    left: 'ml-0 mr-auto',
    right: 'mr-0 ml-auto',
  }[align];

  const bg = {
    sage: 'linear-gradient(180deg, transparent 0%, rgba(223,246,242,0.35) 50%, transparent 100%)',
    mist: 'linear-gradient(180deg, transparent 0%, rgba(243,244,246,0.3) 50%, transparent 100%)',
    warm: 'linear-gradient(180deg, transparent 0%, rgba(247,243,235,0.25) 50%, transparent 100%)',
  }[variant];

  const accentColor = {
    sage: 'rgba(24,77,71,0.2)',
    mist: 'rgba(107,114,128,0.18)',
    warm: 'rgba(217,119,6,0.15)',
  }[variant];

  const textColor = {
    sage: 'text-[var(--text-secondary)]',
    mist: 'text-neutral-700',
    warm: 'text-neutral-700',
  }[variant];

  const subtitleColor = {
    sage: 'text-neutral-400',
    mist: 'text-neutral-400',
    warm: 'text-neutral-400',
  }[variant];

  return (
    <div
      className={clsx('relative overflow-hidden', className)}
      style={{
        background: bg,
        paddingTop: 'clamp(56px, 7vw, 96px)',
        paddingBottom: 'clamp(56px, 7vw, 96px)',
      }}
      aria-hidden="true"
    >
      <DecorativeMountain />

      <motion.div
        className={clsx('mx-auto flex max-w-[560px] flex-col gap-5 px-5 sm:px-6', alignClass)}
        variants={FADE}
        initial="hidden"
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div
          className={clsx('h-px w-14 sm:w-20', lineMargin)}
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />

        {showIcon && (
          <div className={clsx('flex', align === 'center' && 'justify-center', align === 'right' && 'justify-end')}>
            <Leaf
              className="h-4 w-4"
              style={{ color: accentColor }}
              aria-hidden="true"
            />
          </div>
        )}

        <p
          className={clsx('font-serif text-[18px] sm:text-[20px] font-normal italic leading-[1.75] tracking-[-0.01em]', textColor)}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {title}
        </p>

        {subtitle && (
          <p className={clsx('text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.18em]', subtitleColor)}>
            {subtitle}
          </p>
        )}

        <div
          className={clsx('h-px w-10 sm:w-12', lineMargin)}
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />
      </motion.div>
    </div>
  );
}
