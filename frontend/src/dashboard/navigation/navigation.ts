import { BarChart3, Clock3, FolderTree, Image, LayoutGrid, ListChecks, Settings } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface DashboardNavItem {
  title: string;
  route: string;
  icon: LucideIcon;
  group: 'workspace' | 'content' | 'analytics' | 'system';
  badge?: string;
}

export const dashboardNavigation: DashboardNavItem[] = [
  { title: 'Overview', route: '/dashboard/overview', icon: LayoutGrid, group: 'workspace' },
  { title: 'Activity', route: '/dashboard/activity', icon: Clock3, group: 'workspace' },
  { title: 'Potentials', route: '/dashboard/potentials', icon: ListChecks, group: 'content' },
  { title: 'Categories', route: '/dashboard/categories', icon: FolderTree, group: 'content' },
  { title: 'Media Library', route: '/dashboard/media', icon: Image, group: 'content', badge: 'New' },
  { title: 'Statistics', route: '/dashboard/statistics', icon: BarChart3, group: 'analytics' },
  { title: 'Settings', route: '/dashboard/settings', icon: Settings, group: 'system' },
];

export const dashboardNavigationGroups = [
  { key: 'workspace', label: 'Workspace' },
  { key: 'content', label: 'Content' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'system', label: 'System' },
] as const;
