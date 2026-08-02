import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Compass } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { MobileNavigation } from './MobileNavigation';
import { APP_NAME } from '@/constants/app';
import { clsx } from 'clsx';

const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/about' },
  { label: 'Potensi', href: '/potentials' },
  { label: 'Statistik', href: '/statistics' },
  { label: 'Kontak', href: '/contact' },
];

function VillageLogo({ transparent }) {
  const [imgError, setImgError] = useState(false);
  return (
    <span
      className={clsx(
        'flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 overflow-hidden shrink-0',
        transparent ? '' : 'bg-[--color-primary]',
      )}
    >
      {!imgError ? (
        <img
          src="/assets/images/logo-desa.png"
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

function useScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const clamped = Math.min(y / 120, 1);
      setIsScrolled(y > 60);
      setScrollProgress(clamped);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { isScrolled, scrollProgress };
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isScrolled } = useScrollState();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (href) => {
    if (href.includes('#') || href.includes('?')) return false;
    return href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);
  };

  const transparent = isHomePage && !isScrolled && !isMobileMenuOpen;

  const bgClass = transparent
    ? 'bg-transparent border-b border-transparent'
    : 'bg-white/95 [backdrop-filter:blur(20px)] border-b border-neutral-200/50 shadow-sm';

  const navText = transparent ? 'text-white' : 'text-primary';
  const navLinkColor = transparent ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-primary-dark';
  const navLinkActive = transparent ? 'text-white font-semibold' : 'text-primary font-semibold';
  const underlineColor = transparent ? 'bg-white' : 'bg-primary';

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 w-full',
          'transition-all duration-500 ease-out',
          bgClass,
        )}
        style={{
          backdropFilter: transparent ? undefined : 'blur(20px)',
          WebkitBackdropFilter: transparent ? undefined : 'blur(20px)',
        }}
      >
        <div className={clsx('container mx-auto px-4 flex items-center justify-between gap-6 transition-[height] duration-500 ease-out', isScrolled ? 'h-16' : 'h-[88px]')}>
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-xl shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus]"
            aria-label={`${APP_NAME} — Kembali ke beranda`}
          >
            <VillageLogo transparent={transparent} />
            <span
              className={clsx(
                'font-bold transition-colors duration-300 hidden sm:block text-base',
                navText,
              )}
            >
              {APP_NAME}
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-1 flex-1 justify-center"
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
                    'relative rounded-full px-4 py-2 text-sm font-medium tracking-[0.01em] whitespace-nowrap group',
                    'transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus]',
                    active ? navLinkActive : navLinkColor,
                  )}
                >
                  {link.label}
                  <span
                    className={clsx(
                      'absolute bottom-1 inset-x-3 h-[2px] rounded-full transition-transform duration-200 origin-center',
                      underlineColor,
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center shrink-0">
            <Link to="/potentials">
              <Button
                variant="primary"
                size="sm"
                className={clsx(
                  'gap-1.5 rounded-full font-semibold transition-all duration-300',
                  transparent
                    ? 'bg-primary/85 border border-white/20 text-white hover:bg-primary-dark shadow-none'
                    : 'bg-primary hover:bg-primary-dark text-white',
                )}
              >
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                Jelajahi Potensi
              </Button>
            </Link>
          </div>

          <IconButton
            icon={isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu navigasi'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={clsx(
              'lg:hidden',
              transparent
                ? 'text-white hover:bg-white/15 focus-visible:ring-white/50'
                : 'text-slate-700 hover:bg-slate-100 focus-visible:ring-[--border-focus]',
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
