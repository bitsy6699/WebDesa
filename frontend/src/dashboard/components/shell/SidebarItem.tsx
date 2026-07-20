import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { type LucideIcon } from 'lucide-react';

export interface SidebarItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
  collapsed?: boolean;
  badge?: string;
}

export const SidebarItem = memo(function SidebarItem({ to, label, icon: Icon, collapsed = false, badge }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'group flex items-center rounded-[0.9rem] px-3 py-2.5 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-[#ecfdf3] text-[#0f766e] shadow-[inset_2px_0_0_#0f766e]'
            : 'text-[#334155] hover:bg-[#f3f5f5] hover:text-[#0f1720]',
          collapsed && 'justify-center px-2.5',
        )
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed ? <span className="ml-3 flex-1 text-left">{label}</span> : null}
      {!collapsed && badge ? <span className="rounded-full border border-[#e6eae9] bg-white px-2 py-0.5 text-[0.7rem] font-medium text-[#64748b]">{badge}</span> : null}
    </NavLink>
  );
});
