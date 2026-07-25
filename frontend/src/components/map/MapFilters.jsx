import { getCategoryColor, getCategoryIcon } from './constants';

/**
 * MapFilters — horizontal filter bar for categories + search.
 * Renders category chips and a search input.
 */
export function MapFilters({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  resultCount,
}) {
  return (
    <div className="absolute top-4 left-4 right-4 z-[500] flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-0 sm:max-w-[280px]">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7B78] pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Cari potensi..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-white/90 backdrop-blur-sm pl-9 pr-4 py-2.5 text-[14px] text-[#0F1A18] placeholder:text-[#8A9C99] shadow-[0_2px_12px_rgba(0,0,0,0.08)] focus:outline-none focus:ring-2 focus:ring-[#184D47]/30 focus:border-[#184D47]/40 transition-all duration-200"
          aria-label="Cari potensi di peta"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-[#E8EFEC] transition-colors duration-150"
            aria-label="Hapus pencarian"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7B78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
        <button
          onClick={() => onCategoryChange(null)}
          className={`flex-shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 border ${
            activeCategory === null
              ? 'bg-[#184D47] text-white border-[#184D47] shadow-[0_2px_8px_rgba(24,77,71,0.25)]'
              : 'bg-white/90 text-[#4A5C58] border-[#D1D9D6] hover:bg-[#F0F4F2] hover:border-[#B8C4C0]'
          } focus-visible:ring-2 focus-visible:ring-[#184D47] focus-visible:ring-offset-2`}
        >
          Semua
        </button>
        {categories?.map((cat) => {
          const color = getCategoryColor(cat.slug);
          const icon = getCategoryIcon(cat.slug);
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(isActive ? null : cat.slug)}
              className={`flex-shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 border ${
                isActive
                  ? 'text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
                  : 'bg-white/90 text-[#4A5C58] border-[#D1D9D6] hover:bg-[#F0F4F2] hover:border-[#B8C4C0]'
              } focus-visible:ring-2 focus-visible:ring-[#184D47] focus-visible:ring-offset-2`}
              style={isActive ? { background: color, borderColor: color } : undefined}
            >
              {icon} {cat.label}
            </button>
          );
        })}
      </div>

      {/* Result count */}
      {resultCount !== undefined && (
        <div className="hidden sm:flex items-center text-[12px] text-[#6B7B78] whitespace-nowrap">
          {resultCount} lokasi ditemukan
        </div>
      )}
    </div>
  );
}
