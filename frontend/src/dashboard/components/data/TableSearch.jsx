import { Search } from 'lucide-react';

export function TableSearch({ value, onChange, placeholder = 'Cari...' }) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-[#E8ECEA] bg-white px-3.5 py-2 text-[0.8125rem] text-neutral-500 transition-all duration-150 hover:border-neutral-300 focus-within:border-[#184D47] focus-within:ring-2 focus-within:ring-[#184D47]/10">
      <Search className="h-4 w-4 shrink-0 text-neutral-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full min-w-[160px] bg-transparent text-[0.8125rem] text-neutral-800 outline-none placeholder:text-neutral-400"
      />
    </label>
  );
}
