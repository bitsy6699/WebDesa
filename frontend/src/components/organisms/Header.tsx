import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { MobileNavigation } from './MobileNavigation';
import { APP_NAME } from '@/constants/app';
import { clsx } from 'clsx';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Desa', href: '/#tentang' },
  { label: 'Potensi Desa', href: '/potentials' },
  { label: 'Peta Potensi', href: '/map' },
  { label: 'Berita', href: '/#berita' },
  { label: 'Statistik', href: '/#statistik' },
  { label: 'Kontak', href: '/#kontak' },
];

/** Village logo: /logo-desa.png with Leaf fallback. */
function VillageLogo({ transparent }: { transparent: boolean }) {
  const [imgError, setImgError] = useState(false);
  return (
    <span
      className={clsx(
        'flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 overflow-hidden shrink-0',
        transparent ? '' : 'bg-[#0B3C35]',
      )}
    >
      {!imgError ? (
        <img
          src="/logo-desa.png"
          alt=""
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
          aria-hidden="true"
        />
      ) : (
        <Leaf className="w-5 h-5 text-white" aria-hidden="true" />
      )}
    </span>
  );
}

/**
 * Header — Fixed positioning so it visually merges with the Hero background.
 *
 * Transparent state (homepage, scroll < 80px):
 * - position: fixed, top-0, full-width
 * - background: transparent
 * - no border, no shadow
 * - nav text: white
 * - CTA: semi-transparent dark green (blends over hero image)
 *
 * Scrolled state (scroll ≥ 80px, or non-home pages):
 * - background: rgba(255,255,255,0.92)
 * - backdrop-filter: blur(18px)
 * - border-bottom: 1px solid rgba(0,0,0,0.05)
 * - soft shadow
 * - nav text: dark
 *
 * Transition: 300ms ease on all properties.
 *
 * IMPORTANT: Since this is fixed, PublicLayout adds a `pt-[88px]` spacer div
 * on non-home pages to prevent content from being hidden under the navbar.
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';

  /**
   * Transparent when: on homepage AND not scrolled past 80px AND drawer is closed.
   * On non-home pages: always solid white.
   */
  const isTransparent = isHomePage && !isScrolled && !isMobileMenuOpen;

  const isActive = (href: string) => {
    if (href.includes('#') || href.includes('?')) return false;
    return href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={clsx(
          /* Fixed positioning — overlays hero image */
          'fixed top-0 left-0 right-0 z-50 w-full',
          'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isTransparent
            ? [
                'bg-transparent',
                'border-b border-transparent',
              ]
            : [
                'bg-[rgba(255,255,255,0.92)]',
                '[backdrop-filter:blur(18px)]',
                'border-b border-[rgba(0,0,0,0.05)]',
                'shadow-[0_2px_20px_rgba(0,0,0,0.06)]',
              ],
        )}
      >
        <div className="container mx-auto px-4 h-[88px] flex items-center justify-between gap-6">

          {/* ── Logo ────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-xl shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F855A]"
            aria-label={`${APP_NAME} — Kembali ke beranda`}
          >
            <VillageLogo transparent={isTransparent} />
            <span
              className={clsx(
                'font-bold transition-colors duration-300 hidden sm:block text-base',
                isTransparent ? 'text-white' : 'text-[#0B3C35]',
              )}
            >
              {APP_NAME}
            </span>
          </Link>

          {/* ── Desktop navigation ──────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-0.5 flex-1 justify-center"
            aria-label="Navigasi Utama"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={clsx(
                    'relative px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F855A]',
                    isTransparent
                      ? active
                        ? 'text-white font-semibold'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                      : active
                        ? 'text-[#0B3C35] font-semibold'
                        : 'text-[#374151] hover:text-[#0B3C35] hover:bg-[#0B3C35]/5',
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      className={clsx(
                        'absolute bottom-0.5 inset-x-3 h-0.5 rounded-full',
                        isTransparent ? 'bg-white' : 'bg-[#0B3C35]',
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ─────────────────────────────────────── */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link to="/login" tabIndex={-1}>
              <Button
                variant="primary"
                size="sm"
                className={clsx(
                  'gap-1.5 rounded-full font-semibold transition-all duration-300',
                  isTransparent
                    ? 'bg-[#0B3C35]/70 border border-white/20 text-white hover:bg-[#0B3C35]/90 shadow-none'
                    : 'bg-[#0B3C35] hover:bg-[#2F855A] text-white',
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
                Dashboard Admin
              </Button>
            </Link>
          </div>

          {/* ── Mobile hamburger ────────────────────────────────── */}
          <IconButton
            icon={isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu navigasi'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={clsx(
              'lg:hidden',
              isTransparent ? 'text-white hover:bg-white/15' : 'text-[#374151] hover:bg-[#F3F4F6]',
            )}
          />
        </div>
      </header>

      <MobileNavigation
        id="mobile-nav"
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
        activeHref={location.pathname}
      />
    </>
  );
}
