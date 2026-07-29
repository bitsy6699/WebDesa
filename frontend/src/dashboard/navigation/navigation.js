import { BarChart3, Clock3, FolderTree, Image, LayoutGrid, ListChecks, Map, Settings } from 'lucide-react';

export const dashboardNavigation = [
  { title: 'Ringkasan', route: '/dashboard/overview', icon: LayoutGrid, group: 'workspace' },
  { title: 'Statistik', route: '/dashboard/statistics', icon: BarChart3, group: 'workspace' },
  { title: 'Aktivitas', route: '/dashboard/activity', icon: Clock3, group: 'workspace' },
  { title: 'Potensi', route: '/dashboard/potentials', icon: ListChecks, group: 'content' },
  { title: 'Kategori', route: '/dashboard/categories', icon: FolderTree, group: 'content' },
  { title: 'Media', route: '/dashboard/media', icon: Image, group: 'content' },
  { title: 'Peta', route: '/dashboard/map', icon: Map, group: 'content' },
  { title: 'Pengaturan', route: '/dashboard/settings', icon: Settings, group: 'system' },
];

export const dashboardNavigationGroups = [
  { key: 'workspace', label: 'Ruang Kerja' },
  { key: 'content', label: 'Konten' },
  { key: 'system', label: 'Sistem' },
];
