import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  /** Fallback UI to render when an error is caught. Defaults to a generic error message. */
  fallback?: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * AppErrorBoundary — Organism-level React Error Boundary.
 * Catches unhandled render errors and displays a friendly fallback UI
 * to prevent the entire application from crashing.
 *
 * Usage: Wrap page-level or feature-level trees that may throw.
 *
 * @see docs/engineering/SYSTEM_ARCHITECTURE.md §4 Frontend Architecture
 */
export default class AppErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // In production, this is where you would report to an error tracking service.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[AppErrorBoundary]', error, info.componentStack);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[--bg-page] p-8 text-center">
          <h1 className="text-2xl font-bold text-[--neutral-800]">
            Terjadi Kesalahan
          </h1>
          <p className="max-w-sm text-sm text-[--neutral-500]">
            Halaman ini mengalami masalah. Silakan muat ulang halaman atau
            hubungi administrator.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-[--radius-md] bg-[--color-primary] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[--color-primary-dark]"
          >
            Muat Ulang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
