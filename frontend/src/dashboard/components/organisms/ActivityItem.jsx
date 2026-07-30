import { clsx } from 'clsx';

export function ActivityItem({ icon, title, description, timestamp, variant = 'neutral' }) {
  const Icon = icon;
  const iconClasses = variant === 'teal'
    ? 'border-[#184D47]/10 bg-[#184D47]/5 text-[#184D47]'
    : 'border-[#E7E7E7] bg-neutral-50 text-neutral-500';

  return (
    <li className="flex gap-3 rounded-xl border border-[#E7E7E7] bg-white p-4">
      <div className={clsx('mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border', iconClasses)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.8125rem] font-medium text-neutral-800">{title}</p>
            <p className="mt-0.5 text-[0.75rem] leading-relaxed text-neutral-500">{description}</p>
          </div>
          <time className="text-[0.75rem] text-neutral-400">{timestamp}</time>
        </div>
      </div>
    </li>
  );
}
