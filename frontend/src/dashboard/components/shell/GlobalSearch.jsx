import { Search } from 'lucide-react';

export function GlobalSearch() {
  return (
    <label className="hidden items-center gap-2 rounded-xl border border-[#E7E7E7] bg-[#F8FAF8] px-3 py-2 text-[0.8125rem] text-neutral-500 transition-all duration-150 hover:border-neutral-300 focus-within:border-[#184D47] focus-within:ring-2 focus-within:ring-[#184D47]/20 md:flex">
      <Search className="h-4 w-4" />
      <span className="min-w-[220px]">Cari potensi, kategori, media...</span>
      <span className="ml-auto rounded-lg border border-[#E7E7E7] bg-white px-1.5 py-0.5 text-[0.65rem] text-neutral-500">⌘K</span>
    </label>
  );
}
