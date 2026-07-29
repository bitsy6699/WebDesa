import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '@/dashboard/components/shell/Sidebar';
import { Topbar } from '@/dashboard/components/shell/Topbar';
import { MobileSidebar } from '@/dashboard/components/shell/MobileSidebar';
import { DashboardContainer } from '@/dashboard/components/organisms/DashboardContainer';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('dashboard-sidebar-collapsed') === 'true';
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dashboard-sidebar-collapsed', String(collapsed));
    }
  }, [collapsed]);

  return (
    <>
      <div className="grid h-screen overflow-hidden bg-[#F6F7F8] text-neutral-800 antialiased lg:grid-cols-[auto_1fr]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#184D47] focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none"
        >
          Loncat ke konten utama
        </a>

        <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />

        <div className="flex min-w-0 min-h-0 flex-col">
          <Topbar onOpenMobileMenu={() => setMobileOpen(true)} />
          <main
            id="main-content"
            role="main"
            tabIndex={-1}
            className="flex-1 overflow-y-auto"
          >
            <DashboardContainer>
              <Outlet />
            </DashboardContainer>
          </main>
        </div>
      </div>

      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
