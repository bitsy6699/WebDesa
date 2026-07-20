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


