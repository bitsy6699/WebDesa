import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN_KEY } from '@/constants/app';

/**
 * Axios instance pre-configured for the Potensi Desa API.
 *
 * - Base URL read from VITE_API_URL environment variable.
 * - Sends Laravel Sanctum bearer token from localStorage on every request.
 * - On 401 Unauthorized, clears the stored token and redirects to /login.
 *
 * @see docs/engineering/API_SPEC.md
 * @see docs/engineering/BACKEND_ARCHITECTURE.md §6 Authentication
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
});

// ---------------------------------------------------------------------------
// Request interceptor — inject Sanctum bearer token
// ---------------------------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ---------------------------------------------------------------------------
// Response interceptor — handle 401 Unauthorized globally
// ---------------------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      // Redirect to login without using React Router to avoid circular dependencies
      if (window.location.pathname !== '/login') {
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  },
);

export default api;
