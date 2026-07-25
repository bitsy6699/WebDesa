/**
 * API route path constants.
 * Maps to the backend API_SPEC.md §3–§11.
 * Base URL is handled by the Axios instance in services/api.js.
 */
export const API_ROUTES = {
  // §3 Authentication
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_ME: '/auth/me',
  AUTH_PROFILE: '/auth/profile',
  AUTH_PASSWORD: '/auth/password',

  // §4 Public Potentials
  POTENTIALS: '/potentials',
  POTENTIAL_DETAIL: (categorySlug, slug) =>
    `/potentials/${categorySlug}/${slug}`,

  // §5 Public Categories
  CATEGORIES: '/categories',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_CATEGORY: (id) => `/admin/categories/${id}`,

  // §6 Public Settings
  SETTINGS: '/settings',

  // §7 Statistics
  STATISTICS_SUMMARY: '/statistics/summary',

  // §8 Health
  HEALTH: '/health',

  // Admin endpoints
  ADMIN_ME: '/admin/me',
  ADMIN_POTENTIALS: '/admin/potentials',
  ADMIN_POTENTIAL: (id) => `/admin/potentials/${id}`,
  ADMIN_POTENTIAL_TOGGLE: (id) => `/admin/potentials/${id}/toggle-featured`,
  ADMIN_MEDIA_LIST: '/admin/media',
  ADMIN_MEDIA_UPLOAD: '/admin/media/upload',
  ADMIN_MEDIA_DELETE: (id) => `/admin/media/${id}`,
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_ACTIVITY_LOGS: '/admin/activity-logs',
  ADMIN_IMPORT: '/admin/potentials/import',
  ADMIN_IMPORT_TEMPLATE: '/admin/potentials/import/template',
  ADMIN_EXPORT: '/admin/potentials/export',
};
