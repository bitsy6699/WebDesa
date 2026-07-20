import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import type { Category } from '@/types/Category';

export interface DirectoryToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  categories: Category[];
  isLoadingCategories?: boolean;
  activeSort?: string;
  onSortChange?: (sort: string) => void;
  onReset?: () => void;
}

export function DirectoryToolbar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  categories,
  isLoadingCategories: _isLoadingCategories = false,
  activeSort = 'latest',
  onSortChange,
  onReset,
}: DirectoryToolbarProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchChange(localSearch);
  };

  const handleClear = () => {
    setLocalSearch('');
    onSearchChange('');
  };

  const categoryLabel = activeCategory
    ? categories.find((cat) => cat.slug === activeCategory)?.label ?? 'Semua Kategori'
    : 'Semua Kategori';

  const sortLabel =
    activeSort === 'name_asc'
      ? 'Nama A-Z'
      : activeSort === 'name_desc'
        ? 'Nama Z-A'
        : 'Terbaru';

  return (
    <div className="w-full">
      <form
        onSubmit={handleSearchSubmit}
        className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 rounded-[32px] border border-white/60 bg-white/45 p-3 shadow-[0_20px_60px_rgba(15,61,52,0.06)] backdrop-blur-[24px] sm:gap-4 sm:p-4 lg:p-5"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <div className="flex min-h-[56px] items-center rounded-full border border-white/70 bg-white/25 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-200 ease-out focus-within:border-[#184D47]/20 focus-within:bg-white/35 focus-within:shadow-[0_10px_30px_rgba(24,77,71,0.12)] focus-within:ring-2 focus-within:ring-[--border-focus] focus-within:ring-offset-2">
              <Search className="mr-3 h-5 w-5 shrink-0 text-[#5F6B68]" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Cari potensi desa..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full border-none bg-transparent text-[15px] text-[#184D47] outline-none placeholder:text-[#5F6B68]/65"
                aria-label="Cari potensi desa"
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="ml-2 rounded-full p-1.5 text-[#5F6B68] transition-colors hover:bg-black/5"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsCategoryOpen((prev) => !prev);
                  setIsSortOpen(false);
                }}
                className="flex h-[48px] min-w-[168px] items-center justify-between rounded-full border border-white/70 bg-white/18 px-4 py-2.5 text-sm font-semibold text-[#184D47] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-white/25 hover:shadow-[0_8px_24px_rgba(24,77,71,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2 sm:h-[52px]"
                aria-haspopup="listbox"
                aria-expanded={isCategoryOpen}
              >
                <span className="flex items-center gap-2 truncate">
                  <SlidersHorizontal className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{categoryLabel}</span>
                </span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <div className="absolute left-0 top-full z-20 mt-2 w-full min-w-[220px] origin-top overflow-hidden rounded-[24px] border border-white/70 bg-white/80 p-2.5 shadow-[0_20px_50px_rgba(15,61,52,0.14)] backdrop-blur-[24px]">
                  <button
                    type="button"
                    onClick={() => {
                      onCategoryChange(null);
                      setIsCategoryOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-[16px] px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                      activeCategory === null
                        ? 'bg-[#184D47] text-white shadow-[0_10px_24px_rgba(24,77,71,0.16)]'
                        : 'text-[#184D47] hover:bg-[#184D47]/8 hover:text-[#0F3D34]'
                    }`}
                  >
                    <span>Semua Kategori</span>
                    {activeCategory === null && <Check className="h-4 w-4" />}
                  </button>

                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          onCategoryChange(isActive ? null : cat.slug);
                          setIsCategoryOpen(false);
                        }}
                        className={`mt-1 flex w-full items-center justify-between rounded-[16px] px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[#184D47] text-white shadow-[0_10px_24px_rgba(24,77,71,0.16)]'
                            : 'text-[#184D47] hover:bg-[#184D47]/8 hover:text-[#0F3D34]'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isActive && <Check className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {onSortChange && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsSortOpen((prev) => !prev);
                    setIsCategoryOpen(false);
                  }}
                  className="flex h-[48px] min-w-[152px] items-center justify-between rounded-full border border-white/70 bg-white/18 px-4 py-2.5 text-sm font-semibold text-[#184D47] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-white/25 hover:shadow-[0_8px_24px_rgba(24,77,71,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-focus] focus-visible:ring-offset-2 sm:h-[52px]"
                  aria-haspopup="listbox"
                  aria-expanded={isSortOpen}
                >
                  <span className="flex items-center gap-2 truncate">
                    <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{sortLabel}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortOpen && (
                  <div className="absolute left-0 top-full z-20 mt-2 w-full min-w-[180px] origin-top overflow-hidden rounded-[24px] border border-white/70 bg-white/80 p-2.5 shadow-[0_20px_50px_rgba(15,61,52,0.14)] backdrop-blur-[24px]">
                    <button
                      type="button"
                      onClick={() => {
                        onSortChange('latest');
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-[16px] px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                        activeSort === 'latest'
                          ? 'bg-[#184D47] text-white shadow-[0_10px_24px_rgba(24,77,71,0.16)]'
                          : 'text-[#184D47] hover:bg-[#184D47]/8 hover:text-[#0F3D34]'
                      }`}
                    >
                      <span>Terbaru</span>
                      {activeSort === 'latest' && <Check className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSortChange('name_asc');
                        setIsSortOpen(false);
                      }}
                      className={`mt-1 flex w-full items-center justify-between rounded-[16px] px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                        activeSort === 'name_asc'
                          ? 'bg-[#184D47] text-white shadow-[0_10px_24px_rgba(24,77,71,0.16)]'
                          : 'text-[#184D47] hover:bg-[#184D47]/8 hover:text-[#0F3D34]'
                      }`}
                    >
                      <span>Nama A-Z</span>
                      {activeSort === 'name_asc' && <Check className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSortChange('name_desc');
                        setIsSortOpen(false);
                      }}
                      className={`mt-1 flex w-full items-center justify-between rounded-[16px] px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                        activeSort === 'name_desc'
                          ? 'bg-[#184D47] text-white shadow-[0_10px_24px_rgba(24,77,71,0.16)]'
                          : 'text-[#184D47] hover:bg-[#184D47]/8 hover:text-[#0F3D34]'
                      }`}
                    >
                      <span>Nama Z-A</span>
                      {activeSort === 'name_desc' && <Check className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              </div>
            )}

            {onReset && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  onReset();
                }}
                className="h-[48px] rounded-full border border-transparent px-4 text-sm font-semibold text-[#5F6B68] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-white/30 hover:text-[#184D47] sm:h-[52px]"
              >
                Reset
              </button>
            )}

            <button
              type="submit"
              className="h-[48px] rounded-full bg-[#184D47] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(24,77,71,0.16)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-[#0F3D34] hover:shadow-[0_10px_24px_rgba(24,77,71,0.18)] sm:h-[52px]"
            >
              Cari
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
