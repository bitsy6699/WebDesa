import { memo, useEffect, useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from '@/dashboard/components/molecules/Breadcrumb';
import { UserMenu } from '@/dashboard/components/shell/UserMenu';

function getBreadcrumbs(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ label: 'Dashboard', to: '/dashboard' }];
  if (segments.length <= 1) return items;
  const [, current] = segments;
  const routeLabels = {
    overview: 'Ringkasan', potentials: 'Potensi', categories: 'Kategori',
    media: 'Media', statistics: 'Statistik', settings: 'Pengaturan',
    activity: 'Aktivitas', new: 'Baru', edit: 'Edit',
  };
  const label = routeLabels[current] ?? current.charAt(0).toUpperCase() + current.slice(1);
  return [...items, { label }];
}

export const Topbar = memo(function Topbar({ onOpenMobileMenu }) {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState(() => getBreadcrumbs(location.pathname));

  useEffect(() => {
    setBreadcrumbs(getBreadcrumbs(location.pathname));
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-20 flex h-[56px] md:h-[72px] shrink-0 items-center justify-between border-b border-black/[.06] bg-white px-4 sm:px-6 max-md:px-4 max-sm:px-3">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 lg:hidden"
          aria-label="Buka navigasi"
          onClick={onOpenMobileMenu}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden md:block">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-black/[.06] bg-neutral-50 px-3 py-1.5 text-[0.8125rem] text-neutral-400 transition-colors hover:border-neutral-300 hover:bg-white md:flex"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span>Cari...</span>
          <kbd className="ml-2 rounded border border-black/[.06] bg-white px-1 py-0.5 text-[0.6rem] font-medium text-neutral-400">⌘K</kbd>
        </button>

        {/* Notification */}
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100"
          aria-label="Notifikasi"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#184D47]" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
});
