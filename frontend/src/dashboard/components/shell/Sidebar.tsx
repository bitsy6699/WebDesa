import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PanelLeftClose, PanelLeftOpen, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { dashboardNavigation, dashboardNavigationGroups } from '@/dashboard/navigation/navigation';
import { SidebarGroup } from '@/dashboard/components/shell/SidebarGroup';
import { SidebarItem } from '@/dashboard/components/shell/SidebarItem';

export interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = memo(function Sidebar({ collapsed = false, onToggleCollapse }: SidebarProps) {
  const groupedNavigation = useMemo(() => {
    return dashboardNavigationGroups.map((group) => ({
      ...group,
      items: dashboardNavigation.filter((item) => item.group === group.key),
    }));
  }, []);

  return (
    <aside className={clsx('hidden h-screen flex-col border-r border-[#e6eae9] bg-white lg:flex', collapsed ? 'w-[72px]' : 'w-[280px]')}>
      <div className="flex h-[72px] items-center justify-between border-b border-[#e6eae9] px-5">
        <Link to="/dashboard/overview" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed ? <span className="text-[0.95rem] font-semibold tracking-tight text-[#0f1720]">Admin CMS</span> : null}
        </Link>
        <button
          type="button"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="rounded-full p-2 text-[#64748b] transition-colors hover:bg-[#f3f5f5] hover:text-[#0f1720]"
          onClick={onToggleCollapse}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-5">
          {groupedNavigation.map((group) => (
            <SidebarGroup key={group.key} label={group.label} collapsed={collapsed}>
              {group.items.map((item) => (
                <SidebarItem key={item.route} to={item.route} label={item.title} icon={item.icon} collapsed={collapsed} badge={item.badge} />
              ))}
            </SidebarGroup>
          ))}
        </div>
      </nav>
    </aside>
  );
});
