/**
 * Unified editorial motion presets — Sprint 20.1.
 *
 * Premium motion system inspired by Apple/Linear/Stripe/Vercel.
 * All animations use transform + opacity ONLY — never scale on text.
 *
 * Design principles:
 *   - Spring transitions for natural feel (not ease curves)
 *   - Micro-rotate for organic entrance (0.2deg, imperceptible but alive)
 *   - NO scale in entrance presets (prevents subpixel text glitch)
 *   - Layered parallax speeds for depth
 *   - GPU-only properties (transform, opacity)
 *   - Respects prefers-reduced-motion via useReducedMotion()
 *
 * Usage:
 *   import { SECTION_REVEAL, CARD_REVEAL, STAGGER_CONTAINER } from '@/lib/motionPresets';
 *   <motion.div variants={SECTION_REVEAL} initial="hidden" whileInView="visible" viewport={{ once: true }}>
 */

// ──────────────────────────────────────────────────────
// Spring configurations
// ──────────────────────────────────────────────────────

/** Editorial reveal — smooth, deliberate, non-bouncy. */
const SPRING_REVEAL = { type: 'spring', stiffness: 80, damping: 18, mass: 1 };

/** Card entrance — slightly faster, lighter feel. */
const SPRING_CARD = { type: 'spring', stiffness: 100, damping: 16, mass: 0.8 };

/** Hover interaction — snappy, responsive, no bounce. */
export const SPRING_HOVER = { type: 'spring', stiffness: 300, damping: 22 };

/** Stagger container — organic, not mechanical. */
const SPRING_STAGGER = { type: 'spring', stiffness: 60, damping: 14, mass: 1.2 };

// ──────────────────────────────────────────────────────
// Section-level reveals
// ──────────────────────────────────────────────────────

/**
 * Section entrance — fade + 20px lift + 0.2deg micro-rotate.
 * Spring-based for natural settle. NO scale (prevents subpixel glitch).
 */
export const SECTION_REVEAL = {
  hidden: { opacity: 0, y: 20, rotate: 0.2 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: SPRING_REVEAL,
  },
};

/**
 * Section entrance — larger lift for hero-adjacent sections.
 */
export const SECTION_REVEAL_HERO = {
  hidden: { opacity: 0, y: 30, rotate: 0.15 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { ...SPRING_REVEAL, stiffness: 70 },
  },
};

// ──────────────────────────────────────────────────────
// Stagger system
// ──────────────────────────────────────────────────────

/**
 * Stagger container — organic stagger with slight delay.
 * Children appear one by one with natural rhythm.
 */
export const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Faster stagger for dense card grids. */
export const STAGGER_CONTAINER_FAST = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

// ──────────────────────────────────────────────────────
// Card animations
// ──────────────────────────────────────────────────────

/**
 * Card entrance — fade + 16px lift + -0.2deg micro-rotate (opposite direction).
 * NO scale. Spring-based for natural feel.
 */
export const CARD_REVEAL = {
  hidden: { opacity: 0, y: 16, rotate: -0.2 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: SPRING_CARD,
  },
};

/**
 * Card entrance with slight lift — for featured/highlight cards.
 */
export const CARD_REVEAL_LIFT = {
  hidden: { opacity: 0, y: 24, rotate: -0.15 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: SPRING_CARD,
  },
};

// ──────────────────────────────────────────────────────
// Image animations
// ──────────────────────────────────────────────────────

/**
 * Image entrance — fade + 12px lift only. NO scale.
 * Scale causes subpixel rendering issues on adjacent text.
 */
export const IMAGE_REVEAL = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_REVEAL,
  },
};

// ──────────────────────────────────────────────────────
// Subtle / small elements
// ──────────────────────────────────────────────────────

/**
 * Subtle entrance — fade + 12px lift for small elements.
 */
export const SUBTLE_REVEAL = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18, mass: 0.7 },
  },
};

// ──────────────────────────────────────────────────────
// Parallax speed constants
// ──────────────────────────────────────────────────────

/**
 * Parallax depth speeds — use with useScroll({ target }) + useTransform.
 * These are scroll-to-pixel multipliers.
 *
 * Usage:
 *   const { scrollYProgress } = useScroll({ target: sectionRef });
 *   const bgY = useTransform(scrollYProgress, [0, 1], [0, PARALLAX.background]);
 */
export const PARALLAX = {
  /** Background layer — slowest, creates depth. */
  background: 30,
  /** Image layer — medium speed. */
  image: 15,
  /** Card layer — subtle drift. */
  card: 8,
  /** Text layer — normal speed (no parallax). */
  text: 0,
};

// ──────────────────────────────────────────────────────
// Utility functions
// ──────────────────────────────────────────────────────

/**
 * Creates a staggered card reveal with custom delay.
 * @param {number} index — card position in the grid
 * @param {number} [baseDelay=0] — additional delay offset
 */
export function cardWithDelay(index, baseDelay = 0) {
  return {
    hidden: { opacity: 0, y: 16, rotate: -0.2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: baseDelay + index * 0.08,
        ...SPRING_CARD,
      },
    },
  };
}

/**
 * Creates a reveal with custom delay for sequential reveals.
 * @param {number} delay — delay in seconds
 */
export function revealWithDelay(delay) {
  return {
    hidden: { opacity: 0, y: 20, rotate: 0.2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { delay, ...SPRING_REVEAL },
    },
  };
}
