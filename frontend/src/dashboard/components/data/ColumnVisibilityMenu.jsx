import { useEffect, useRef, useState } from 'react';
import { Columns3 } from 'lucide-react';

export function ColumnVisibilityMenu({ columns, visibleKeys, onToggle }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-[#E7E7E7] bg-white px-3 py-2 text-[0.8125rem] font-medium text-neutral-700 outline-none transition-all duration-150 hover:border-neutral-300 focus:border-[#184D47] focus:ring-2 focus:ring-[#184D47]/20"
      >
        <Columns3 className="h-3.5 w-3.5" />
        Kolom
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-[#E7E7E7] bg-white shadow-lg">
            <div className="border-b border-[#E7E7E7] px-4 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-neutral-400">
              Tampilkan Kolom
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {columns.map((column) => {
                const key = String(column.key);
                return (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 hover:bg-neutral-50"
                  >
                    <input
                      type="checkbox"
                      checked={visibleKeys.includes(key)}
                      onChange={() => onToggle(key)}
                      className="h-4 w-4 rounded border-neutral-300 text-[#184D47] focus:ring-[#184D47]"
                    />
                    <span className="text-[0.8125rem] text-neutral-700">{column.header}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
