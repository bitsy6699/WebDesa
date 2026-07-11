import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { clsx } from 'clsx';

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
  activeHref?: string;
  id?: string;
}

/**
 * MobileNavigation — Off-canvas slide-in navigation drawer.
 *
 * - Right-side slide per DESIGN_SYSTEM.md §8.14
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
}: MobileNavigationProps) {
  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* Escape key closes */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isActive = (href: string) =>
    href === '/' ? activeHref === '/' : activeHref?.startsWith(href);

  return (
    <div
      id={id}
      className="md:hidden fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[--neutral-900]/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 w-72 bg-[--bg-surface] shadow-[var(--shadow-xl)] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[--border-default]">
          <span className="text-base font-semibold text-[--neutral-900]">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu navigasi"
            className="p-1.5 rounded-[--radius-md] text-[--neutral-500] hover:text-[--neutral-900] hover:bg-[--neutral-100] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus]"
          >
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-3 py-4 gap-0.5 flex-1 overflow-y-auto" aria-label="Navigasi Mobile">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={onClose}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] font-medium',
                  'transition-colors duration-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F855A]',
                  active
                    ? 'bg-[#0B3C35]/10 text-[#0B3C35] font-semibold'
                    : 'text-[#374151] hover:bg-[#F9FAFB] hover:text-[#0B3C35]',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer CTA */}
        <div className="px-4 pb-8 pt-4 border-t border-[#E5E7EB]">
          <Link to="/login" onClick={onClose} tabIndex={-1}>
            <Button
              variant="primary"
              fullWidth
              className="rounded-full gap-2"
              style={{ backgroundColor: '#0B3C35' }}
            >
              Dashboard Admin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
