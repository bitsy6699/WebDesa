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

/**
 * Navigation items per approved mockup.
 * "UMKM" removed — it appears only as a dynamic category, not a primary nav item.
 */
const NAV_LINKS: NavLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Desa', href: '/#tentang' },
  { label: 'Potensi Desa', href: '/potentials' },
  { label: 'Peta Potensi', href: '/map' },
  { label: 'Berita', href: '/#berita' },
  { label: 'Statistik', href: '/#statistik' },
  { label: 'Kontak', href: '/#kontak' },
];

/** Village logo — uses /logo-desa.png if available, falls back to Leaf icon. */
function VillageLogo({ transparent }: { transparent: boolean }) {
  const [imgError, setImgError] = useState(false);
  const showFallback = imgError;

  return (
    <span
      className={clsx(
        'flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 overflow-hidden shrink-0',
        transparent ? 'bg-white/15 border border-white/20' : 'bg-[#0B3C35]',
      )}
    >
      {!showFallback ? (
        <img
          src="/logo-desa.png"
          alt=""
          className="w-full h-full object-contain p-1"
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
 * Header — Sticky global navigation bar.
 *
 * Phase 13F spec:
 * - 88px height
 * - Transparent over hero (homepage only), blends with hero image
 * - Becomes solid white + backdrop blur after 50px scroll
 * - Smooth 300ms transition
 * - Logo left, nav center, CTA right
 * - NO white rectangle on initial load when over hero
 *
 * @see docs/mockups/landing-page-references.png
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled && !isMobileMenuOpen;

  const isActive = (href: string) => {
    if (href.includes('#') || href.includes('?')) return false;
    return href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 w-full',
          'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isTransparent
            ? 'bg-transparent border-b border-white/10'
            : 'bg-white/96 backdrop-blur-md border-b border-[#E5E7EB] shadow-[0_2px_16px_rgba(0,0,0,0.07)]',
        )}
      >
        <div className="container mx-auto px-4 h-[88px] flex items-center justify-between gap-6">

          {/* ── Logo ──────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-xl shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F855A]"
            aria-label={`${APP_NAME} — Kembali ke beranda`}
          >
            <VillageLogo transparent={isTransparent} />
            <span
              className={clsx(
                'font-bold transition-colors duration-300 hidden sm:block',
                isTransparent ? 'text-white text-base' : 'text-[#0B3C35] text-base',
              )}
            >
              {APP_NAME}
            </span>
          </Link>

          {/* ── Desktop navigation ────────────────────────────────── */}
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
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      : active
                        ? 'text-[#0B3C35] font-semibold'
                        : 'text-[#374151] hover:text-[#0B3C35] hover:bg-[#0B3C35]/5',
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      className={clsx(
                        'absolute bottom-0.5 inset-x-3 h-0.5 rounded-full transition-colors duration-300',
                        isTransparent ? 'bg-white' : 'bg-[#0B3C35]',
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────────────── */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link to="/login" tabIndex={-1}>
              <Button
                variant="primary"
                size="sm"
                className={clsx(
                  'gap-2 rounded-full transition-all duration-300 font-semibold',
                  isTransparent
                    ? 'bg-white/15 border border-white/35 text-white hover:bg-white/25 hover:border-white/55 shadow-none'
                    : 'bg-[#0B3C35] hover:bg-[#2F855A] text-white',
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
                Dashboard Admin
              </Button>
            </Link>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────── */}
          <IconButton
            icon={isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu navigasi'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={clsx(
              'lg:hidden',
              isTransparent
                ? 'text-white hover:bg-white/15'
                : 'text-[#374151] hover:bg-[#F3F4F6]',
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
