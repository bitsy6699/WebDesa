import { lazy } from 'react';

export const Home = lazy(() => import('@/pages/Home'));
export const PotentialsDirectory = lazy(() => import('@/pages/PotentialsDirectory'));
export const PotentialDetail = lazy(() => import('@/pages/PotentialDetail'));
export const CategoriesExplorer = lazy(() => import('@/pages/CategoriesExplorer'));
export const MapExplorer = lazy(() => import('@/pages/MapExplorer'));
export const Login = lazy(() => import('@/pages/Login'));
export const AdminPanel = lazy(() => import('@/pages/AdminPanel'));
export const NotFound = lazy(() => import('@/pages/NotFound'));
export const StatisticsPage = lazy(() => import('@/pages/StatisticsPage'));
export const DashboardOverviewPage = lazy(() => import('@/dashboard/pages/OverviewPage'));
export const DashboardPotentialsPage = lazy(() => import('@/dashboard/pages/PotentialsPage'));
export const DashboardCategoriesPage = lazy(() => import('@/dashboard/pages/CategoriesPage'));
export const DashboardMediaPage = lazy(() => import('@/dashboard/pages/MediaPage'));
export const DashboardStatisticsPage = lazy(() => import('@/dashboard/pages/StatisticsPage'));
export const DashboardActivityPage = lazy(() => import('@/dashboard/pages/ActivityPage'));
export const DashboardSettingsPage = lazy(() => import('@/dashboard/pages/SettingsPage'));
