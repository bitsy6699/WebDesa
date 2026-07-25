import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api from '@/services/api';
import { API_ROUTES } from '@/constants/routes';
import { AUTH_TOKEN_KEY } from '@/constants/app';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    token: localStorage.getItem(AUTH_TOKEN_KEY),
    isLoading: true,
    isAuthenticated: false,
  });

  const logout = useCallback(async () => {
    try {
      await api.post(API_ROUTES.AUTH_LOGOUT);
    } finally {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
      window.location.replace('/login');
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (!token) {
        setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
        return;
      }

      try {
        const response = await api.get(API_ROUTES.AUTH_ME, { signal: controller.signal });
        setState({
          user: response.data.data,
          token,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return;
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setState({ user: null, token: null, isLoading: false, isAuthenticated: false });
      }
    })();

    return () => controller.abort();
  }, []);

  const login = useCallback(async (username, password) => {
    const response = await api.post(
      API_ROUTES.AUTH_LOGIN,
      { username, password },
    );

    const { token, user } = response.data.data;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setState({ user, token, isLoading: false, isAuthenticated: true });
  }, []);

  const value = useMemo(
    () => ({ ...state, login, logout }),
    [state, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
