import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { clsx } from 'clsx';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * MobileNavigation — Off-canvas slide-in navigation drawer.
 *
 * - Right-side slide with Framer Motion
 * - Focus trap via escape key
 * - Backdrop click to close
 * - Body scroll lock when open
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.14 Drawer (Mobile Nav)
 */
export function MobileNavigation({
  isOpen,
  onClose,
  links,
  activeHref,
  id,
}) {
  const prefersReducedMotion = useReducedMotion();

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Escape key closes */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const isActive = (href) =>
    href === '/' ? activeHref === '/' : activeHref?.startsWith(href);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-nav"
          id={id}
          className="md:hidden fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[--neutral-900]/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            className="fixed inset-y-0 right-0 w-72 rounded-l-[28px] border border-white/60 bg-white/95 shadow-[0_24px_70px_rgba(15,61,52,0.16)] backdrop-blur-[24px] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <img src="/assets/images/logo-desa.png" alt="Logo Desa" width="32" height="32" className="w-8 h-8 object-contain" />
                <span className="text-base font-bold text-slate-800">Portal Karamatwangi</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup menu navigasi"
                className="p-2 rounded-full text-[--neutral-500] transition-all duration-200 ease-out hover:text-[--neutral-900] hover:bg-[--neutral-100] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2"
              >
                ✕
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-3 py-4 gap-0.5 flex-1 overflow-y-auto" aria-label="Navigasi Mobile">
              {links.map((link, index) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.label}
                    initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.2, delay: index * 0.03 }}
                  >
                    <Link
                      to={link.href}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className={clsx(
                        'flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-medium',
                        'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2',
                        active
                          ? 'bg-primary/10 text-primary font-semibold shadow-[0_12px_32px_rgba(24,77,71,0.10)]'
                          : 'text-slate-700 hover:bg-[#F0FBF7] hover:text-primary-dark hover:shadow-[0_12px_32px_rgba(15,61,52,0.08)]',
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer CTA */}
            <div className="px-4 pb-8 pt-4 border-t border-neutral-200">
              <Link to="/login" onClick={onClose} tabIndex={-1}>
                <Button
                  variant="primary"
                  fullWidth
                  className="rounded-full gap-2"
                >
                  Dashboard Admin
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
