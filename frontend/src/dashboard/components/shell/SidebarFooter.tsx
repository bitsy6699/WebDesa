import { memo } from 'react';

export const SidebarFooter = memo(function SidebarFooter() {
  return (
    <div className="border-t border-[#e6eae9] px-4 py-4 text-xs text-[#64748b]">
      <p className="font-medium text-[#334155]">Workspace ready</p>
      <p className="mt-1">Operational CMS shell for phase 10.4.</p>
    </div>
  );
});
