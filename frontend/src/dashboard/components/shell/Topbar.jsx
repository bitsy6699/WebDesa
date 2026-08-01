import { memo, useEffect, useRef, useState } from 'react';
import { Menu, Search, Bell, LogIn, LogOut, Plus, Pencil, Trash2, Upload, Star, Settings } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumb } from '@/dashboard/components/molecules/Breadcrumb';
import { UserMenu } from '@/dashboard/components/shell/UserMenu';
import { SearchCommandPalette } from '@/dashboard/components/shell/SearchCommandPalette';
import { useActivityLogs } from '@/hooks/useActivityLogs';

const notifIcons = {
  login: LogIn, logout: LogOut, create_potential: Plus, update_potential: Pencil,
  delete_potential: Trash2, toggle_featured: Star, import_potentials: Upload,
  upload_media: Upload, delete_media: Trash2, create_category: Plus,
  update_category: Pencil, delete_category: Trash2, update_settings: Settings,
};

function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return 'baru saja';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} menit lalu`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} jam lalu`;
  return `${Math.floor(seconds / 86400)} hari lalu`;
}

function getBreadcrumbs(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ label: 'Dasbor', to: '/dashboard' }];
  if (segments.length <= 1) return items;
  const [, current] = segments;
  const routeLabels = {
    overview: 'Ringkasan', potentials: 'Potensi', categories: 'Kategori',
    media: 'Media', statistics: 'Statistik', settings: 'Pengaturan',
    activity: 'Aktivitas', new: 'Baru', edit: 'Ubah',
  };
  const label = routeLabels[current] ?? current.charAt(0).toUpperCase() + current.slice(1);
  return [...items, { label }];
}

export const Topbar = memo(function Topbar({ onOpenMobileMenu }) {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState(() => getBreadcrumbs(location.pathname));
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const { data: activityData, isLoading: activityLoading } = useActivityLogs({ per_page: 5 });

  useEffect(() => {
    setBreadcrumbs(getBreadcrumbs(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
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
        <div className="md:hidden">
          {breadcrumbs.length > 1 && (
            <span className="text-[0.8125rem] font-medium text-neutral-600">
              {breadcrumbs[breadcrumbs.length - 1].label}
            </span>
          )}
        </div>
        <div className="hidden md:block">
          <Breadcrumb items={breadcrumbs} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search - icon on mobile, full on desktop */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex items-center justify-center rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 md:hidden"
          aria-label="Cari"
        >
          <Search className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="hidden items-center gap-2 rounded-lg border border-black/[.06] bg-neutral-50 px-3 py-1.5 text-[0.8125rem] text-neutral-400 transition-colors hover:border-neutral-300 hover:bg-white md:flex"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span>Cari...</span>
          <kbd className="ml-2 rounded border border-black/[.06] bg-white px-1 py-0.5 text-[0.6rem] font-medium text-neutral-400">⌘K</kbd>
        </button>

        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100"
            aria-label="Notifikasi"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#184D47]" />
          </button>
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-lg border border-[#E7E7E7] bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-[#E7E7E7] px-4 py-3">
                  <p className="text-[0.8125rem] font-semibold text-neutral-800">Aktivitas Terbaru</p>
                  <Link
                    to="/dashboard/activity"
                    className="text-[0.6875rem] font-medium text-[#184D47] hover:underline"
                    onClick={() => setNotifOpen(false)}
                  >
                    Lihat semua
                  </Link>
                </div>
                {activityLoading ? (
                  <div className="space-y-3 px-4 py-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-4 animate-pulse rounded bg-neutral-100" />
                    ))}
                  </div>
                ) : activityData?.data?.length ? (
                  <div className="max-h-72 overflow-y-auto">
                    {activityData.data.map((log) => {
                      const Icon = notifIcons[log.action] ?? Settings;
                      return (
                        <div key={log.id} className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[0.75rem] text-neutral-700">
                              <span className="font-medium text-neutral-800">{log.user?.username ?? 'System'}</span>
                              <span className="text-neutral-400"> · {log.action?.replace(/_/g, ' ')}</span>
                            </p>
                            {log.subjectTitle && (
                              <p className="truncate text-[0.6875rem] text-neutral-400">“{log.subjectTitle}”</p>
                            )}
                            <p className="mt-0.5 text-[0.6875rem] text-neutral-400">{timeAgo(log.created_at)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Bell className="mx-auto h-6 w-6 text-neutral-300" />
                    <p className="mt-2 text-[0.8125rem] text-neutral-400">Belum ada aktivitas</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <UserMenu />
      </div>
    </header>
    <SearchCommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
  </>
  );
});
