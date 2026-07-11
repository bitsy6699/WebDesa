import { Outlet } from 'react-router-dom';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';

/**
 * PublicLayout — Template wrapper for all public-facing pages.
 * Renders a shared Navbar at the top, page content via <Outlet />,
 * and a Footer at the bottom.
 *
 * @see docs/engineering/FOLDER_STRUCTURE.md §3 Frontend Workspace
 * @see docs/design/DESIGN_SYSTEM.md §8.1 Navbar, §8.20 Footer
 */
export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[--bg-page]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
