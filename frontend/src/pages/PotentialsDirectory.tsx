import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DirectoryToolbar } from '@/components/organisms/DirectoryToolbar';
import { DirectoryGrid } from '@/components/organisms/DirectoryGrid';
import { usePotentials } from '@/hooks/usePotentials';
import { useCategories } from '@/hooks/useCategories';
import { DEFAULT_PER_PAGE } from '@/constants/app';

/**
 * Debounce delay in ms for the search input.
 * Prevents API calls on every keystroke.
 */
const SEARCH_DEBOUNCE_MS = 400;

/**
 * PotentialsDirectory — Public-facing directory of all village potentials.
 *
 * URL state is synced to query parameters so filters are shareable/bookmarkable:
 * - `?page=2`
 * - `?search=madu`
 * - `?category=umkm`
 *
 * @see docs/engineering/API_SPEC.md §5.1 List Potentials
 * @see docs/engineering/ACA.md §7 Search & Filter Architecture
 */
export default function PotentialsDirectory() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Derive state from URL params ──────────────────────────────────────────
  const currentPage = Number(searchParams.get('page') ?? '1');
  const activeCategory = searchParams.get('category') ?? null;

  // The "committed" search that gets sent to the API
  const [committedSearch, setCommittedSearch] = useState(
    searchParams.get('search') ?? '',
  );
  // The "live" input value (before debounce fires)
  const [inputSearch, setInputSearch] = useState(committedSearch);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Sync URL ────────────────────────────────────────────────────────────────
  const updateParam = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === '') {
            next.delete(key);
          } else {
            next.set(key, value);
          }
        });
        return next;
      }, { replace: true });
    },
    [setSearchParams],
  );

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSearchChange = useCallback(
    (value: string) => {
      setInputSearch(value);

      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        setCommittedSearch(value);
        updateParam({ search: value, page: null });
      }, SEARCH_DEBOUNCE_MS);
    },
    [updateParam],
  );

  const handleCategoryChange = useCallback(
    (slug: string | null) => {
      updateParam({ category: slug, page: null });
    },
    [updateParam],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateParam({ page: String(page) });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [updateParam],
  );

  const handleClearFilters = useCallback(() => {
    setInputSearch('');
    setCommittedSearch('');
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const {
    data: potentialsData,
    isLoading: isLoadingPotentials,
    isError,
  } = usePotentials({
    page: currentPage,
    search: committedSearch || undefined,
    category: activeCategory || undefined,
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[--bg-page]">
      {/* Page header */}
      <div className="bg-[--bg-surface] border-b border-[--border-default]">
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <div className="max-w-2xl">
            <p className="text-label uppercase tracking-widest text-[--color-primary] mb-2">
              Direktori
            </p>
            <h1 className="text-h1 text-[--neutral-900]">
              Potensi Desa Karamatwangi
            </h1>
            <p className="mt-3 text-body text-[--neutral-500] leading-relaxed">
              Temukan produk unggulan, destinasi wisata, dan komoditas pertanian Desa Karamatwangi.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Search & Filter toolbar */}
        <DirectoryToolbar
          searchQuery={inputSearch}
          onSearchChange={handleSearchChange}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          isLoadingCategories={isLoadingCategories}
          totalResults={
            !isLoadingPotentials && potentialsData
              ? potentialsData.meta.total
              : undefined
          }
        />

        {/* Results grid */}
        <DirectoryGrid
          potentials={potentialsData?.data ?? []}
          meta={potentialsData?.meta ?? null}
          isLoading={isLoadingPotentials}
          isError={isError}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onClearFilters={handleClearFilters}
          skeletonCount={DEFAULT_PER_PAGE}
        />
      </div>
    </div>
  );
}
