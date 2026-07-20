import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import QueryProvider from '@/providers/QueryProvider';
import AppErrorBoundary from '@/components/organisms/AppErrorBoundary';

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-[--bg-page] text-sm font-medium text-[--neutral-600]">
    Memuat halaman…
  </div>
);

/**
 * App — Application root.
 *
 * Provider composition order (inner to outer):
 * 1. AppErrorBoundary — catches any unhandled render errors.
 * 2. QueryProvider    — provides TanStack Query context and devtools.
 * 3. RouterProvider   — provides React Router v7 browser routing.
 */
export default function App() {
  return (
    <AppErrorBoundary>
      <QueryProvider>
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryProvider>
    </AppErrorBoundary>
  );
}
