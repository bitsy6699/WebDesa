import { Outlet } from 'react-router-dom';

/**
 * BlankLayout — Minimal wrapper for standalone pages (Login, 404).
 * No shared navigation or footer chrome; just a centered full-screen canvas.
 *
 * @see docs/engineering/FOLDER_STRUCTURE.md §3 Frontend Workspace
 */
export default function BlankLayout() {
  return (
    <div className="min-h-screen bg-[--bg-page]">
      <Outlet />
    </div>
  );
}
