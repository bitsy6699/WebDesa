import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen, Sprout } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { dashboardNavigation, dashboardNavigationGroups } from '@/dashboard/navigation/navigation';
import { LineSidebar } from '@/dashboard/components/shell/LineSidebar';

export const Sidebar = memo(function Sidebar({ collapsed = false, onToggleCollapse }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const groupedNavigation = useMemo(() => {
    return dashboardNavigationGroups.map((group) => ({
      ...group,
      items: dashboardNavigation.filter((item) => item.group === group.key),
    }));
  }, []);

  const activeIndex = useMemo(() => {
    let flatIndex = 0;
    for (const group of dashboardNavigationGroups) {
      for (const item of dashboardNavigation) {
        if (item.group === group.key) {
          if (location.pathname === item.route || location.pathname.startsWith(item.route + '/')) {
            return flatIndex;
          }
          flatIndex++;
        }
      }
    }
    return null;
  }, [location.pathname]);

  const handleItemClick = useCallback(
    (_index, item) => {
      if (item?.route) navigate(item.route);
    },
    [navigate],
  );

  const username = user?.username ?? 'Admin';
  const initial = username.charAt(0).toUpperCase();

  return (
    <motion.aside
      animate={{ width: collapsed ? 88 : 260 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="hidden h-screen flex-shrink-0 flex-col border-r border-black/[.06] bg-white overflow-hidden lg:flex"
    >
      {/* Header — three-part layout: Left(Logo+Title) / Right(Toggle) */}
      <div
        className={`flex h-[72px] shrink-0 items-center justify-between border-b border-black/[.06] ${collapsed ? 'px-2' : 'px-4'}`}
      >
        {/* Left: Logo + Title */}
        <Link
          to="/dashboard/overview"
          className={`flex items-center ${collapsed ? 'gap-0' : 'gap-[14px]'}`}
        >
          <div className="flex h-12 w-12 min-w-[48px] shrink-0 items-center justify-center rounded-xl bg-[#184D47] text-white overflow-visible">
            <Sprout className="h-6 w-6" />
          </div>
          <div
            className="overflow-hidden whitespace-nowrap"
            style={{
              pointerEvents: collapsed ? 'none' : 'auto',
              maxWidth: collapsed ? 0 : 400,
              opacity: collapsed ? 0 : 1,
              transform: collapsed ? 'translateX(-8px)' : 'translateX(0)',
              transition: collapsed
                ? 'opacity 150ms ease-out 0ms, transform 150ms ease-out 0ms'
                : 'opacity 220ms ease-out 200ms, transform 220ms ease-out 200ms',
            }}
          >
            <div className="flex flex-col">
              <span className="truncate text-[0.8125rem] font-semibold text-neutral-900 leading-tight">Desa Admin</span>
              <span className="truncate text-[0.625rem] text-neutral-400 leading-tight">Karamatwangi</span>
            </div>
          </div>
        </Link>

        {/* Right: Toggle */}
        <button
          type="button"
          aria-label={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
          className={`flex items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 ${collapsed ? 'h-6 w-6' : 'h-7 w-7'}`}
          onClick={onToggleCollapse}
        >
          {collapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-4" aria-label="Navigasi dashboard">
        <LineSidebar
          groups={groupedNavigation}
          activeIndex={activeIndex}
          onItemClick={handleItemClick}
          collapsed={collapsed}
          showMarker={true}
          proximityRadius={80}
          maxShift={20}
          markerLength={40}
          itemGap={2}
          fontSize={0.8125}
          smoothing={100}
        />
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-black/[.06] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#184D47] text-[0.6rem] font-bold text-white">
            {initial}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.75rem] font-medium text-neutral-700">{username}</p>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[0.625rem] text-neutral-400">Online</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
});
