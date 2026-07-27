import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';

import BlankLayout from '@/layouts/BlankLayout';
import { DashboardLayout } from '@/dashboard/layouts/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  Home,
  PotentialsDirectory,
  PotentialDetail,
  CategoriesExplorer,
  MapExplorer,
  AboutPage,
  ContactPage,
  Login,

  NotFound,
  StatisticsPage,
  DashboardOverviewPage,
  DashboardPotentialsPage,
  DashboardPotentialsNew,
  DashboardPotentialsEdit,
  DashboardPotentialsDetail,
  DashboardCategoriesPage,
  DashboardMediaPage,
  DashboardStatisticsPage,
  DashboardActivityPage,
  DashboardSettingsPage,
  FeatureShowcaseDemo,
} from './routeModules';
import DashboardMapPage from '@/dashboard/pages/MapPage';

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
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/demo/feature-showcase', element: <FeatureShowcaseDemo /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <DashboardOverviewPage /> },
          { path: '/dashboard/overview', element: <DashboardOverviewPage /> },
          { path: '/dashboard/potentials', element: <DashboardPotentialsPage /> },
          { path: '/dashboard/potentials/new', element: <DashboardPotentialsNew /> },
          { path: '/dashboard/potentials/:id', element: <DashboardPotentialsDetail /> },
          { path: '/dashboard/potentials/:id/edit', element: <DashboardPotentialsEdit /> },
          { path: '/dashboard/categories', element: <DashboardCategoriesPage /> },
          { path: '/dashboard/media', element: <DashboardMediaPage /> },
          { path: '/dashboard/statistics', element: <DashboardStatisticsPage /> },
          { path: '/dashboard/activity', element: <DashboardActivityPage /> },
          { path: '/dashboard/settings', element: <DashboardSettingsPage /> },
          { path: '/dashboard/map', element: <DashboardMapPage /> },
        ],
      },
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
