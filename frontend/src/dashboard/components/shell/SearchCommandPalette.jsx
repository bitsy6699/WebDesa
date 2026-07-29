import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { dashboardNavigation } from '@/dashboard/navigation/navigation';

export function SearchCommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    if (!query.trim()) return dashboardNavigation;
    const q = query.toLowerCase();
    return dashboardNavigation.filter(
      (item) => item.title.toLowerCase().includes(q) || item.route.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (!open) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && filtered[activeIndex]) {
        navigate(filtered[activeIndex].route);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filtered, activeIndex, navigate, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed left-1/2 top-[15vh] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-[#E7E7E7] bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-[#E7E7E7] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari menu..."
            className="min-w-0 flex-1 text-[0.875rem] text-neutral-800 outline-none placeholder:text-neutral-400"
          />
          <kbd className="shrink-0 rounded border border-[#E7E7E7] bg-neutral-50 px-1.5 py-0.5 text-[0.65rem] text-neutral-400">Esc</kbd>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-[0.8125rem] text-neutral-400">Tidak ada hasil</p>
          ) : (
            filtered.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.route}
                  type="button"
                  onMouseDown={() => { navigate(item.route); onClose(); }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[0.8125rem] transition-colors ${
                    i === activeIndex ? 'bg-[#184D47]/10 text-[#184D47]' : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="font-medium">{item.title}</span>
                  <span className="ml-auto text-[0.6875rem] text-neutral-400">{item.group === 'content' ? 'Konten' : item.group === 'system' ? 'Sistem' : 'Umum'}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
