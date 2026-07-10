import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query client with sensible defaults for the Potensi Desa platform.
 *
 * - staleTime: 60s — data considered fresh for 1 minute, reducing unnecessary refetches.
 * - gcTime: 5min — unused query cache is garbage-collected after 5 minutes.
 * - retry: 2 — failed network requests are retried twice before surfacing an error.
 * - refetchOnWindowFocus: false — prevents disruptive refetches on tab switching.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
