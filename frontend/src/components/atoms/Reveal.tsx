import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Reveal - Reusable entrance animation component.
 * Spec:
 * - opacity
 * - translateY: 24px
 * - scale: 0.98 → 1
 * - duration: 500ms
 * - once: true
 */
export function Reveal({ children, delay = 0, duration = 0.45, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Premium apple/linear style ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface RevealContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * RevealContainer - Parent container for staggered reveals.
 * Spec:
 * - stagger: 80ms
 */
export function RevealContainer({ children, staggerDelay = 0.08, className }: RevealContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

