import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

export interface ActivityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  timestamp: string;
  variant?: 'teal' | 'neutral';
}

export function ActivityItem({ icon, title, description, timestamp, variant = 'neutral' }: ActivityItemProps) {
  const Icon = icon;
  const iconClasses = variant === 'teal' ? 'border-[#dff6f2] bg-[#f3fbf8] text-[#0f766e]' : 'border-[#e6eae9] bg-[#f8faf9] text-[#64748b]';

  return (
    <li className="flex gap-3 rounded-[1rem] border border-[#f0f3f2] bg-[#fcfdfd] p-4">
      <div className={clsx('mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border', iconClasses)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-[#0f1720]">{title}</p>
            <p className="mt-1 text-sm leading-6 text-[#64748b]">{description}</p>
          </div>
          <time className="text-sm text-[#64748b]">{timestamp}</time>
        </div>
      </div>
    </li>
  );
}
