import { useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { SearchInput } from '@/components/atoms/SearchInput';
import { Chip } from '@/components/atoms/Chip';
import { CategoryChip } from '@/components/molecules/CategoryChip';
import { Skeleton } from '@/components/atoms/Skeleton';
import type { Category } from '@/types/Category';
import { clsx } from 'clsx';

export interface DirectoryToolbarProps {
  /** Current search query value. */
  searchQuery: string;
  /** Called when the search input value changes (debounced upstream). */
  onSearchChange: (value: string) => void;
  /** Slug of the currently selected category, or null for all. */
  activeCategory: string | null;
  /** Called when a category chip is toggled. */
  onCategoryChange: (slug: string | null) => void;
  /** Category list from API. */
  categories: Category[];
  /** True while categories are being fetched. */
  isLoadingCategories?: boolean;
  /** Total number of results (shown as label). */
  totalResults?: number;
  className?: string;
}

/**
 * DirectoryToolbar — Organism combining search input and category filter chips
 * for the PotentialsDirectory page.
 *
 * @see docs/design/DESIGN_SYSTEM.md §8.3 Search Bar, §8.4 Category Chip
 * @see docs/engineering/ACA.md §7 Search & Filter Architecture
 */
export function DirectoryToolbar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  categories,
  isLoadingCategories = false,
  totalResults,
  className,
}: DirectoryToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCategoryClick = (slug: string) => {
    // Toggle off if already active
    onCategoryChange(activeCategory === slug ? null : slug);
  };

  return (
    <div className={clsx('space-y-4', className)}>
      {/* Search row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <SearchInput
            ref={inputRef}
            placeholder="Cari nama atau deskripsi potensi..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Cari potensi desa"
            className="max-w-none"
          />
        </div>
        {totalResults !== undefined && (
          <p
            className="text-sm text-[--neutral-500] shrink-0 self-center"
            aria-live="polite"
            aria-atomic="true"
          >
            {totalResults.toLocaleString('id-ID')} potensi ditemukan
          </p>
        )}
      </div>

      {/* Category filter chips */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        role="group"
        aria-label="Filter berdasarkan kategori"
      >
        {/* "Semua" chip */}
        <Chip
          active={activeCategory === null}
          onClick={() => onCategoryChange(null)}
          aria-pressed={activeCategory === null}
          className="shrink-0"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Semua
        </Chip>

        {/* Category chips */}
        {isLoadingCategories
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-[--radius-full] shrink-0" />
            ))
          : categories.map((cat) => (
              <CategoryChip
                key={cat.id}
                category={cat}
                active={activeCategory === cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className="shrink-0"
              />
            ))}
      </div>
    </div>
  );
}
