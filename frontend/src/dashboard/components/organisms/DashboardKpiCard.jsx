import { clsx } from 'clsx';

export function DashboardKpiCard({ icon, title, value, helperText, trend, className }) {
  const Icon = icon;

  return (
    <article
      className={clsx(
        'flex flex-col rounded-2xl border border-[#E7E7E7] bg-white p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#184D47]/5 text-[#184D47]">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </div>
        {trend && trend !== '-' ? (
          <span className="rounded-full bg-[#184D47]/5 px-2 py-0.5 text-[0.65rem] font-medium text-[#184D47]">
            {trend}
          </span>
        ) : null}
      </div>
      <div className="mt-3">
        <p className="text-[0.75rem] text-neutral-500">{title}</p>
        <p className="mt-0.5 text-[1.25rem] md:text-[1.5rem] font-bold tracking-tight text-neutral-900 leading-none">{value}</p>
      </div>
      {helperText && (
        <div className="mt-auto pt-3">
          <p className="text-[0.6875rem] text-neutral-400 truncate">{helperText}</p>
        </div>
      )}
    </article>
  );
}
