/**
 * Application-level constants.
 * Derived from environment variables set per environment.
 */
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'Potensi Desa Karamatwangi';
export const APP_ENV = import.meta.env.VITE_ENV ?? 'development';
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/v1';

/** Local storage key used to persist the Sanctum access token. */
export const AUTH_TOKEN_KEY = 'sanctum_token';
