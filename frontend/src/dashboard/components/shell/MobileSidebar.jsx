import { memo, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sprout } from 'lucide-react';
import { dashboardNavigation, dashboardNavigationGroups } from '@/dashboard/navigation/navigation';
import { LineSidebar } from '@/dashboard/components/shell/LineSidebar';

export const MobileSidebar = memo(function MobileSidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

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
      if (item?.route) {
        navigate(item.route);
        onClose();
      }
    },
    [navigate, onClose],
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: 280 }}
            animate={{ x: 0 }}
            exit={{ x: 280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 flex w-[280px] flex-col border-l border-black/[.06] bg-white shadow-xl lg:hidden"
            role="dialog"
            aria-label="Navigasi mobile"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-black/[.06] px-4">
              <Link to="/dashboard/overview" className="flex items-center gap-2.5" onClick={onClose}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#184D47] text-white">
                  <Sprout className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.8125rem] font-semibold text-neutral-900 leading-tight">Desa Admin</span>
                  <span className="text-[0.625rem] text-neutral-400 leading-tight">Karamatwangi</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100"
                aria-label="Tutup navigasi"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3" aria-label="Navigasi mobile">
              <LineSidebar
                groups={groupedNavigation}
                activeIndex={activeIndex}
                onItemClick={handleItemClick}
                collapsed={false}
                showMarker={true}
                proximityRadius={80}
                maxShift={20}
                markerLength={40}
                itemGap={2}
                fontSize={0.8125}
                smoothing={100}
              />
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});
