import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { dashboardNavigation, dashboardNavigationGroups } from '@/dashboard/navigation/navigation';
import { SidebarGroup } from '@/dashboard/components/shell/SidebarGroup';
import { SidebarItem } from '@/dashboard/components/shell/SidebarItem';
import { DashboardIconButton } from '@/dashboard/components/atoms/DashboardIconButton';

export interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const MobileSidebar = memo(function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 bg-[#0f1720]/56 lg:hidden" role="presentation" onClick={onClose}>
      <div className="h-full w-[82%] max-w-[280px] bg-white" onClick={(event) => event.stopPropagation()}>
        <div className="flex h-[72px] items-center justify-between border-b border-[#e6eae9] px-5">
          <Link to="/dashboard/overview" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f766e] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-[0.95rem] font-semibold tracking-tight text-[#0f1720]">Admin CMS</span>
          </Link>
          <DashboardIconButton icon={<ChevronLeft className="h-4 w-4" />} aria-label="Close navigation" onClick={onClose} />
        </div>

        <nav className="overflow-y-auto px-3 py-4">
          <div className="space-y-5">
            {dashboardNavigationGroups.map((group) => (
              <SidebarGroup key={group.key} label={group.label}>
                {dashboardNavigation
                  .filter((item) => item.group === group.key)
                  .map((item) => (
                    <SidebarItem key={item.route} to={item.route} label={item.title} icon={item.icon} badge={item.badge} />
                  ))}
              </SidebarGroup>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
});
