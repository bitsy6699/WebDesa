import { Search } from 'lucide-react';

export interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TableSearch({ value, onChange, placeholder = 'Search records' }: TableSearchProps) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-[#e6eae9] bg-white px-3 py-2 text-sm text-[#64748b] shadow-[0_1px_2px_rgba(15,23,32,0.02)]">
      <Search className="h-4 w-4" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full min-w-[180px] bg-transparent text-sm text-[#0f1720] outline-none placeholder:text-[#94a3b8]"
      />
    </label>
  );
}
