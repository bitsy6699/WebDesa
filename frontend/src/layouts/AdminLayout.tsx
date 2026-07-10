import { Outlet } from 'react-router-dom';

/**
 * AdminLayout — Template wrapper for all CMS / admin pages.
 * Protected by authentication guard (to be added in authentication phase).
 * Renders a sidebar navigation and page content via <Outlet />.
 *
 * Sidebar and admin nav organisms will be implemented in the CMS phase.
 *
 * @see docs/engineering/FOLDER_STRUCTURE.md §3 Frontend Workspace
 * @see docs/design/DESIGN_SYSTEM.md §8.14 Drawer (Mobile Nav)
 */
export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[--neutral-100]">
      {/* TODO (Phase 13C): Add <AdminSidebar /> organism here */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
