import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';

/**
 * PublicLayout — Template wrapper for all public-facing pages.
 *
 * Header is `fixed` so it overlays the hero on the homepage.
 * On non-home pages, a spacer `<div>` of 88px compensates so content
 * does not hide behind the fixed navbar.
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.1 Navbar
 */
export default function PublicLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-[--bg-page]">
      <Header />
      {/* Spacer for fixed header — only on non-home pages where hero doesn't absorb the height */}
      {!isHomePage && <div className="h-[88px] shrink-0" aria-hidden="true" />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
