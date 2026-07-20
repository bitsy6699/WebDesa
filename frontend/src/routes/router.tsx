import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';
import BlankLayout from '@/layouts/BlankLayout';
import { DashboardLayout } from '@/dashboard/layouts/DashboardLayout';
import {
  Home,
  PotentialsDirectory,
  PotentialDetail,
  CategoriesExplorer,
  MapExplorer,
  Login,
  AdminPanel,
  NotFound,
  StatisticsPage,
  DashboardOverviewPage,
  DashboardPotentialsPage,
  DashboardCategoriesPage,
  DashboardMediaPage,
  DashboardStatisticsPage,
  DashboardActivityPage,
  DashboardSettingsPage,
} from './routeModules';

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/potentials', element: <PotentialsDirectory /> },
      { path: '/categories', element: <CategoriesExplorer /> },
      { path: '/statistics', element: <StatisticsPage /> },
      { path: '/potentials/:category/:slug', element: <PotentialDetail /> },
      { path: '/map', element: <MapExplorer /> },
    ],
  },
  {
    element: <AdminLayout />,
    children: [{ path: '/admin', element: <AdminPanel /> }],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: '/dashboard', element: <DashboardOverviewPage /> },
      { path: '/dashboard/overview', element: <DashboardOverviewPage /> },
      { path: '/dashboard/potentials', element: <DashboardPotentialsPage /> },
      { path: '/dashboard/categories', element: <DashboardCategoriesPage /> },
      { path: '/dashboard/media', element: <DashboardMediaPage /> },
      { path: '/dashboard/statistics', element: <DashboardStatisticsPage /> },
      { path: '/dashboard/activity', element: <DashboardActivityPage /> },
      { path: '/dashboard/settings', element: <DashboardSettingsPage /> },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
