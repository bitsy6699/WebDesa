import { motion, useReducedMotion } from 'framer-motion';
import { Search, FolderOpen, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

const FADE = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const ICON_MAP = {
  search: Search,
  empty: FolderOpen,
  error: AlertCircle,
};

/**
 * EmptyState — Reusable empty/loading/error state.
 *
 * Replaces the duplicated empty states found in FeaturedPotentialsSection,
 * PotensiTerbaruSection, CategoriesExplorer, and StatisticsPage.
 *
 * @param {object}  props
 * @param {'search'|'empty'|'error'} [props.variant='empty']
 * @param {string}  props.title       — Main message
 * @param {string}  [props.description] — Supporting text
 * @param {ReactNode} [props.action]  — Optional CTA button
 * @param {string}  [props.className]
 */
export function EmptyState({
  variant = 'empty',
  title,
  description,
  action,
  className,
}) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = ICON_MAP[variant] || FolderOpen;

  return (
    <motion.div
      className={clsx(
        'flex flex-col items-center justify-center rounded-3xl border border-neutral-100 bg-white/60 px-6 py-16 text-center',
        className,
      )}
      variants={FADE}
      initial="hidden"
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5"
        aria-hidden="true"
      >
        <Icon className="h-7 w-7 text-primary/50" />
      </div>

      <h3 className="text-lg font-bold text-primary-dark">{title}</h3>

      {description && (
        <p className="mt-2 max-w-sm text-[14px] leading-[1.7] text-neutral-400">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
