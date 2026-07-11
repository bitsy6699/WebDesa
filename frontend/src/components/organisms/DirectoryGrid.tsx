import { PotentialCard, PotentialCardSkeleton } from '@/components/molecules/PotentialCard';
import { EmptyResult } from '@/components/molecules/EmptyResult';
import { Pagination } from '@/components/molecules/Pagination';
import type { PotentialListItem } from '@/types/Potential';
import type { PaginationMeta } from '@/types/api';
import { clsx } from 'clsx';

export interface DirectoryGridProps {
  /** List of potentials to render. */
  potentials: PotentialListItem[];
  /** Pagination metadata from the API response. */
  meta: PaginationMeta | null;
  /** True while data is being fetched (shows skeletons). */
  isLoading: boolean;
  /** True if the query returned an error. */
  isError: boolean;
  /** Current page number (1-indexed). */
  currentPage: number;
  /** Called when user navigates to a different page. */
  onPageChange: (page: number) => void;
  /** Called when user clicks "clear" on the empty state. */
  onClearFilters: () => void;
  /** Number of skeleton cards to show while loading. */
  skeletonCount?: number;
  className?: string;
}

/**
 * DirectoryGrid — Responsive grid organism for the PotentialsDirectory page.
 *
 * Handles three states:
 * 1. Loading  → skeleton cards
 * 2. Empty    → EmptyResult component
 * 3. Data     → PotentialCard grid + Pagination
 *
 * @see docs/design/DESIGN_SYSTEM.md §7.3 Content Card Grid
 */
export function DirectoryGrid({
  potentials,
  meta,
  isLoading,
  isError,
  currentPage,
  onPageChange,
  onClearFilters,
  skeletonCount = 12,
  className,
}: DirectoryGridProps) {
  // ── Loading state ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className={clsx('space-y-8', className)}>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          aria-busy="true"
          aria-label="Memuat data potensi"
        >
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <PotentialCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <EmptyResult
        title="Gagal Memuat Data"
        description="Terjadi kesalahan saat mengambil data. Silakan coba lagi."
        actionLabel="Coba Lagi"
        onAction={onClearFilters}
        className={className}
      />
    );
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (potentials.length === 0) {
    return (
      <EmptyResult
        onAction={onClearFilters}
        className={className}
      />
    );
  }

  // ── Data state ─────────────────────────────────────────────────────────────
  return (
    <div className={clsx('space-y-8', className)}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="list"
        aria-label="Daftar potensi desa"
      >
        {potentials.map((potential) => (
          <div key={potential.id} role="listitem">
            <PotentialCard potential={potential} />
          </div>
        ))}
      </div>

      {meta && meta.last_page > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={meta.last_page}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
