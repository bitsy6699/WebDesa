import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { DirectoryToolbar } from '@/components/organisms/DirectoryToolbar';
import { DirectoryGrid } from '@/components/organisms/DirectoryGrid';
import { usePotentials } from '@/hooks/usePotentials';
import { useCategories } from '@/hooks/useCategories';

/**
 * Debounce delay in ms for the search input.
 */
const SEARCH_DEBOUNCE_MS = 400;

export default function PotentialsDirectory() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Derive state from URL params ──────────────────────────────────────────
  const currentPage = Number(searchParams.get('page') ?? '1');
  const activeCategory = searchParams.get('category') ?? null;
  const activeSort = searchParams.get('sort') ?? 'latest';

  const [committedSearch, setCommittedSearch] = useState(
    searchParams.get('search') ?? '',
  );
  const [inputSearch, setInputSearch] = useState(committedSearch);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync state if URL changes externally
  useEffect(() => {
    const urlSearch = searchParams.get('search') ?? '';
    setInputSearch(urlSearch);
    setCommittedSearch(urlSearch);
  }, [searchParams]);

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

  const handleSortChange = useCallback(
    (sort: string) => {
      updateParam({ sort });
    },
    [updateParam],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateParam({ page: String(page) });
      const mainContainer = document.getElementById('potentials-list-container');
      if (mainContainer) {
        mainContainer.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [updateParam],
  );

  const handleClearFilters = useCallback(() => {
    setInputSearch('');
    setCommittedSearch('');
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('search');
      next.delete('page');
      return next;
    }, { replace: true });
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

  const { data: featuredData, isLoading: isLoadingFeatured } = usePotentials({
    featured: true,
    category: activeCategory || undefined,
  });

  // Fetch all potentials for dynamic category statistics
  const { data: allPotentialsData } = usePotentials({
    per_page: 200,
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  // Determine if we should show the full editorial flow (Page 1, no search)
  const isSearchActive = !!committedSearch;
  const showEditorialFlow = currentPage === 1 && !isSearchActive;

  return (
    <div className="bg-[#F8FAF8] text-[#184D47] overflow-x-hidden font-sans">
      {/* 1 ── Mini Hero */}
      <section 
        className="relative h-[300px] w-full flex items-center justify-start overflow-hidden px-6 sm:h-[340px] sm:px-8 lg:h-[380px] lg:px-10"
        aria-label="Mini Hero"
      >
        <img
          src="/hero/hero-karamatwangi.jpg"
          alt="Lanskap Desa Karamatwangi"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, rgba(15, 61, 52, 0.92) 0%, rgba(24, 77, 71, 0.8) 50%, rgba(15, 61, 52, 0.4) 100%)',
          }}
        />
        
        <div className="relative z-20 max-w-[760px] text-left space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-white/70">
            <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Potensi Desa</span>
          </nav>

          <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-white/75 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full">
            POTENSI DESA
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight">
            Eksplorasi Potensi Desa Karamatwangi
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
            Temukan berbagai potensi unggulan Desa Karamatwangi mulai dari sektor pertanian, peternakan, produk lokal, hingga wisata alam yang dikelola oleh masyarakat desa.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative mx-auto max-w-[1320px] px-6 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12 lg:px-10 lg:pb-16 lg:pt-14">
        {/* Subtle radial lights background */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full blur-3xl opacity-35 bg-radial-light z-0" 
          style={{ background: 'radial-gradient(circle, rgba(24,77,71,0.06) 0%, transparent 70%)' }} 
        />
        <div className="pointer-events-none absolute -right-40 top-3/4 h-[500px] w-[500px] rounded-full blur-3xl opacity-35 bg-radial-light z-0" 
          style={{ background: 'radial-gradient(circle, rgba(24,77,71,0.05) 0%, transparent 70%)' }} 
        />

        <div className="relative z-10 space-y-10 sm:space-y-14">
          {/* 2 ── Quick Explorer & Search */}
          <DirectoryToolbar
            searchQuery={inputSearch}
            onSearchChange={handleSearchChange}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
            isLoadingCategories={isLoadingCategories}
            activeSort={activeSort}
            onSortChange={handleSortChange}
            onReset={handleClearFilters}
          />

          {/* 3, 4, 5, 6 ── Editorial Grid & Results */}
          <DirectoryGrid
            potentials={potentialsData?.data ?? []}
            featuredPotentials={featuredData?.data ?? []}
            allPotentialsForCounts={allPotentialsData?.data ?? []}
            categories={categories}
            meta={potentialsData?.meta ?? null}
            isLoading={isLoadingPotentials || isLoadingFeatured}
            isError={isError}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onClearFilters={handleClearFilters}
            onCategoryClick={handleCategoryChange}
            showEditorialFlow={showEditorialFlow}
            activeSort={activeSort}
          />
        </div>
      </main>
    </div>
  );
}
