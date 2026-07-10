import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';
import BlankLayout from '@/layouts/BlankLayout';

// Pages
import Home from '@/pages/Home';
import PotentialsDirectory from '@/pages/PotentialsDirectory';
import PotentialDetail from '@/pages/PotentialDetail';
import MapExplorer from '@/pages/MapExplorer';
import Login from '@/pages/Login';
import AdminPanel from '@/pages/AdminPanel';
import NotFound from '@/pages/NotFound';

/**
 * Application router configuration.
 * Routes follow the approved URL structure from docs/product/ROUTES.md.
 *
 * Layouts:
 * - PublicLayout: Shared Navbar + Footer for public-facing pages.
 * - AdminLayout:  Sidebar + topbar for CMS admin pages (auth-guarded in future phase).
 * - BlankLayout:  Minimal wrapper for Login and 404 pages.
 */
const router = createBrowserRouter([
  // Public pages
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/potentials', element: <PotentialsDirectory /> },
      {
        path: '/potentials/:category/:slug',
        element: <PotentialDetail />,
      },
      { path: '/map', element: <MapExplorer /> },
    ],
  },

  // Admin pages
  {
    element: <AdminLayout />,
    children: [
      { path: '/admin', element: <AdminPanel /> },
    ],
  },

  // Standalone pages (no shared chrome)
  {
    element: <BlankLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
