import { ChevronDown } from 'lucide-react';
import { DashboardIconButton } from '@/dashboard/components/atoms/DashboardIconButton';

export function UserMenu() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[#e6eae9] bg-[#f7f8f8] px-2 py-1.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f766e] text-sm font-semibold text-white">A</div>
      <div className="hidden text-left text-sm sm:block">
        <div className="font-medium text-[#0f1720]">Admin</div>
        <div className="text-[#64748b]">Administrator</div>
      </div>
      <DashboardIconButton icon={<ChevronDown className="h-4 w-4" />} aria-label="Open user menu" variant="ghost" className="h-8 w-8" />
    </div>
  );
}
