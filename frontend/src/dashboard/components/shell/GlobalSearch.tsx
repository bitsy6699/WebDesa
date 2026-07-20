import { Search } from 'lucide-react';

export function GlobalSearch() {
  return (
    <label className="hidden items-center gap-2 rounded-full border border-[#e6eae9] bg-[#f7f8f8] px-3 py-2 text-sm text-[#64748b] md:flex">
      <Search className="h-4 w-4" />
      <span className="min-w-[220px]">Search potentials, categories, media…</span>
      <span className="ml-auto rounded-full border border-[#e6eae9] bg-white px-2 py-0.5 text-[0.7rem] text-[#64748b]">⌘K</span>
    </label>
  );
}
