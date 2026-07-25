import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import router from '@/routes';
import QueryProvider from '@/providers/QueryProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/organisms/Toast';
import AppErrorBoundary from '@/components/organisms/AppErrorBoundary';

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-page">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary" />
      <span className="text-sm font-medium text-neutral-500">Memuat halaman...</span>
    </div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <AppErrorBoundary>
        <AuthProvider>
          <QueryProvider>
            <ToastProvider>
              <Suspense fallback={<LoadingScreen />}>
                <RouterProvider router={router} />
              </Suspense>
            </ToastProvider>
          </QueryProvider>
        </AuthProvider>
      </AppErrorBoundary>
    </HelmetProvider>
  );
}
