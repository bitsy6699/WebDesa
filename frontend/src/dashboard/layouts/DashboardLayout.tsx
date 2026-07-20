import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DashboardContainer } from '@/dashboard/components/organisms/DashboardContainer';
import { Sidebar } from '@/dashboard/components/shell/Sidebar';
import { Topbar } from '@/dashboard/components/shell/Topbar';
import { MobileSidebar } from '@/dashboard/components/shell/MobileSidebar';

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const stored = window.localStorage.getItem('dashboard-sidebar-collapsed');
    return stored === 'true';
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dashboard-sidebar-collapsed', String(collapsed));
    }
  }, [collapsed]);

  const shellClassName = useMemo(() => (collapsed ? 'lg:ml-[72px]' : 'lg:ml-[280px]'), [collapsed]);

  return (
    <div className="min-h-screen bg-[#f7f8f8] text-[#0f1720]">
      <div className="flex min-h-screen">
        <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((current) => !current)} />
        <div className={`flex-1 transition-all duration-200 ${shellClassName}`}>
          <Topbar onOpenMobileMenu={() => setMobileOpen(true)} />
          <DashboardContainer>
            <Outlet />
          </DashboardContainer>
        </div>
      </div>
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
