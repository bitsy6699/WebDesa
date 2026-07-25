import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DirectoryToolbar } from '@/components/organisms/DirectoryToolbar';
import { DirectoryGrid } from '@/components/organisms/DirectoryGrid';
import { usePotentials } from '@/hooks/usePotentials';
import { useCategories } from '@/hooks/useCategories';
import SEO from '@/components/SEO';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/structuredData';
import { PageHero } from '@/components/molecules/PageHero';
import { PageSection } from '@/components/molecules/PageSection';

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
  const debounceTimer = useRef(null);

  // Sync state if URL changes externally
  useEffect(() => {
    const urlSearch = searchParams.get('search') ?? '';
    setInputSearch(urlSearch);
    setCommittedSearch(urlSearch);
  }, [searchParams]);

  // ── Sync URL ────────────────────────────────────────────────────────────────
  const updateParam = useCallback(
    (updates) => {
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
    (value) => {
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
    (slug) => {
      updateParam({ category: slug, page: null });
    },
    [updateParam],
  );

  const handleSortChange = useCallback(
    (sort) => {
      updateParam({ sort });
    },
    [updateParam],
  );

  const handlePageChange = useCallback(
    (page) => {
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
    <>
    <SEO title="Potensi yang Tumbuh dari Tanah Desa" description="Jelajahi seluruh potensi Desa Karamatwangi — UMKM, wisata, pertanian, dan lainnya." path="/potentials" image="/hero/hero-karamatwangi.jpg"
      schema={[
        collectionPageSchema('Potensi Desa Karamatwangi', 'Jelajahi seluruh potensi Desa Karamatwangi — UMKM, wisata, pertanian, dan lainnya.', '/potentials'),
        breadcrumbSchema([
          { label: 'Beranda', to: '/' },
          { label: 'Potensi' },
        ]),
      ]}
    />
    <div className="bg-surface-alt text-primary overflow-x-hidden font-sans">
      <PageHero
        image="/hero/hero-karamatwangi.jpg"
        imageAlt="Lanskap Desa Karamatwangi"
        title="Potensi yang Tumbuh dari Tanah Desa"
        description="Dari tanah yang subur, lahir potensi yang dikelola dengan penuh cinta oleh masyarakat Desa Karamatwangi."
        variant="editorial"
        breadcrumb={[
          { label: 'Beranda', to: '/' },
          { label: 'Potensi Desa' },
        ]}
      />

      {/* Main Content Area */}
      <PageSection container="wide" animated={false}>
        <div className="space-y-10 sm:space-y-14">
          {/* 1 ── Page Heading */}
          <div className="text-center max-w-[640px] mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Semua Potensi
            </p>
            <h2 className="font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-primary-dark sm:text-[1.75rem]">
              Potensi Desa Karamatwangi
            </h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-neutral-500 max-w-[580px] mx-auto">
              Jelajahi seluruh potensi yang dimiliki desa — dari pertanian hingga wisata. Temukan cerita di balik setiap data.
            </p>
          </div>

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
      </PageSection>

      <PageSection>
        <div className="text-center">
          <p className="text-[15px] text-neutral-500 max-w-[560px] mx-auto leading-relaxed">
            Tertarik dengan potensi tertentu? Jelajahi lebih lanjut atau lihat semuanya di peta desa.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-[1px] hover:bg-primary-dark hover:shadow-lg"
            >
              Lihat per Kategori
            </a>
            <a
              href="/map"
              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-6 py-3 text-sm font-semibold text-primary-dark transition-all duration-200 hover:-translate-y-[1px] hover:bg-primary/5"
            >
              Lihat di Peta
            </a>
          </div>
        </div>
      </PageSection>
    </div>
    </>
  );
}
