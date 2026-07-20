import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { dashboardFocusRingClassName } from '@/dashboard/theme/dashboardStyles';

export interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function QuickActionCard({ icon, title, description, onClick, className }: QuickActionCardProps) {
  const Icon = icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'group flex h-full flex-col items-start gap-4 rounded-[1.25rem] border border-[#e6eae9] bg-white p-5 text-left shadow-[0_1px_2px_rgba(15,23,32,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(15,23,32,0.06)]',
        dashboardFocusRingClassName,
        className,
      )}
    >
      <div className="rounded-2xl border border-[#dff6f2] bg-[#f3fbf8] p-3 text-[#0f766e] transition-colors duration-200 group-hover:bg-[#dff6f2]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-[1rem] font-semibold tracking-tight text-[#0f1720]">{title}</h3>
        <p className="text-sm leading-6 text-[#64748b]">{description}</p>
      </div>
    </button>
  );
}
