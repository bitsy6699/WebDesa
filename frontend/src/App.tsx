import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import QueryProvider from '@/providers/QueryProvider';
import AppErrorBoundary from '@/components/organisms/AppErrorBoundary';

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
        <RouterProvider router={router} />
      </QueryProvider>
    </AppErrorBoundary>
  );
}
