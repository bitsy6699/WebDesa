import { type ReactNode, memo } from 'react';

export interface SidebarGroupProps {
  label: string;
  children: ReactNode;
  collapsed?: boolean;
}

export const SidebarGroup = memo(function SidebarGroup({ label, children, collapsed = false }: SidebarGroupProps) {
  return (
    <div className="space-y-2">
      {!collapsed ? <p className="px-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#94a3b8]">{label}</p> : null}
      <div className="space-y-1">{children}</div>
    </div>
  );
});
