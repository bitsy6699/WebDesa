import { Component } from 'react';
import { Leaf } from 'lucide-react';

/**
 * AppErrorBoundary — Organism-level React Error Boundary.
 * Catches unhandled render errors and displays a friendly fallback UI
 * to prevent the entire application from crashing.
 *
 * Usage: Wrap page-level or feature-level trees that may throw.
 */
export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[AppErrorBoundary]', error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[--bg-page] p-8 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-error/10 text-error">
            <Leaf className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="font-heading text-xl font-bold tracking-[-0.02em] text-primary-dark">
            Terjadi Kesalahan
          </h1>
          <p className="max-w-sm text-[15px] text-neutral-500 leading-relaxed">
            Halaman ini mengalami masalah teknis. Silakan muat ulang halaman atau
            hubungi administrator jika masalah berlanjut.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(15,61,52,0.08),0_8px_24px_rgba(15,61,52,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Muat Ulang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
