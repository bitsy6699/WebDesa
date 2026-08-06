import { useLayoutEffect, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { LenisProvider, useLenis } from '@/lib/lenis';
import { ProgressIndicator } from '@/components/atoms/ProgressIndicator';

const HEADER_HEIGHT = 88;
const SCROLL_DURATION = 1.2;

function useLenisScrollTo() {
  const lenis = useLenis();
  return { lenis };
}

function scrollToPosition(lenis, y) {
  if (lenis) {
    lenis.scrollTo(y, { duration: SCROLL_DURATION });
  } else {
    window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
  }
}

function scrollToHash(hash, lenis) {
  if (!hash) {
    if (lenis) {
      lenis.scrollTo(0, { duration: SCROLL_DURATION });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
    return;
  }
  const id = hash.slice(1);
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    scrollToPosition(lenis, y);
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}

function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function LayoutContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const prevPathname = usePrevious(location.pathname);
  const { lenis } = useLenisScrollTo();

  useLayoutEffect(() => {
    if (location.pathname !== prevPathname) {
      scrollToHash(location.hash, lenis);
    } else if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
        scrollToPosition(lenis, y);
      }
    }
  }, [location.pathname, location.hash, prevPathname, lenis]);

  return (
    <div className="flex min-h-screen flex-col bg-[--bg-page]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
      >
        Lewati ke konten utama
      </a>
      <Header />
      {!isHomePage && <div className="h-[88px] shrink-0" aria-hidden="true" />}
      <main id="main-content" className="flex-1 flex flex-col" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
      {isHomePage && <ProgressIndicator />}
    </div>
  );
}

export default function PublicLayout() {
  return (
    <LenisProvider>
      <LayoutContent />
    </LenisProvider>
  );
}
