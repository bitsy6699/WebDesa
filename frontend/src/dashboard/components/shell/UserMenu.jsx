import { ChevronDown, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const username = user?.username ?? 'Admin';
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border border-[#E7E7E7] bg-white px-2 py-1 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#184D47]"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#184D47] text-[0.55rem] font-bold text-white">
          {initial}
        </div>
        <span className="hidden text-[0.8125rem] font-medium text-neutral-700 sm:block">{username}</span>
        <ChevronDown className="h-3 w-3 text-neutral-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-lg border border-[#E7E7E7] bg-white shadow-lg">
            <div className="border-b border-[#E7E7E7] px-3 py-2">
              <p className="text-[0.8125rem] font-medium text-neutral-800">{username}</p>
              <p className="text-[0.6875rem] text-neutral-400">Admin Desa</p>
            </div>
            <button
              type="button"
              onClick={() => { setOpen(false); logout(); }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-[0.8125rem] text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              Keluar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
