import { Outlet } from 'react-router-dom';

/**
 * PublicLayout — Template wrapper for all public-facing pages.
 * Renders a shared Navbar at the top, page content via <Outlet />,
 * and a Footer at the bottom.
 *
 * Navbar and Footer organisms will be implemented in the next phase.
 *
 * @see docs/engineering/FOLDER_STRUCTURE.md §3 Frontend Workspace
 * @see docs/design/DESIGN_SYSTEM.md §8.1 Navbar, §8.20 Footer
 */
export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[--bg-page]">
      {/* TODO (Phase 13B): Add <Navbar /> organism here */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* TODO (Phase 13B): Add <Footer /> organism here */}
    </div>
  );
}
