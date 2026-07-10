import { type ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from '@/lib/queryClient';
import { APP_ENV } from '@/constants/app';

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider wraps the application with TanStack Query's context.
 * React Query Devtools are rendered only in development.
 */
export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {APP_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
