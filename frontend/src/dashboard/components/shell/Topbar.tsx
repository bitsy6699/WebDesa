import { memo, useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { DashboardIconButton } from '@/dashboard/components/atoms/DashboardIconButton';
import { Breadcrumb } from '@/dashboard/components/molecules/Breadcrumb';
import { GlobalSearch } from '@/dashboard/components/shell/GlobalSearch';
import { QuickCreate } from '@/dashboard/components/shell/QuickCreate';
import { NotificationButton } from '@/dashboard/components/shell/NotificationButton';
import { UserMenu } from '@/dashboard/components/shell/UserMenu';
import { useLocation } from 'react-router-dom';

export interface TopbarProps {
  onOpenMobileMenu: () => void;
}

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ label: 'Dashboard', to: '/dashboard' }];

  if (segments.length <= 1) {
    return items;
  }

  const [, current] = segments;
  const label = current.charAt(0).toUpperCase() + current.slice(1);
  return [...items, { label }];
}

export const Topbar = memo(function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState(() => getBreadcrumbs(location.pathname));

  useEffect(() => {
    setBreadcrumbs(getBreadcrumbs(location.pathname));
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-20 border-b border-[#e6eae9] bg-white">
      <div className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <DashboardIconButton icon={<Menu className="h-5 w-5" />} className="lg:hidden" aria-label="Open navigation" onClick={onOpenMobileMenu} />
          <div className="hidden md:block">
            <Breadcrumb items={breadcrumbs} />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <GlobalSearch />
          <QuickCreate />
          <NotificationButton />
          <UserMenu />
        </div>
      </div>
    </header>
  );
});
