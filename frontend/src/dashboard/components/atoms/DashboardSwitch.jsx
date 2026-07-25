import { clsx } from 'clsx';

export function DashboardSwitch({ label, description, className, id, ...props }) {
  const switchId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label htmlFor={switchId} className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-white px-4 py-3 transition-colors hover:bg-neutral-50">
      <span className="space-y-0.5">
        <span className="block text-sm font-medium text-neutral-800">{label}</span>
        {description ? <span className="block text-xs text-neutral-500">{description}</span> : null}
      </span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input id={switchId} type="checkbox" className="peer sr-only focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" {...props} />
        <span className="absolute h-5 w-9 rounded-full bg-neutral-300 transition-colors peer-checked:bg-primary" />
        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
      </span>
    </label>
  );
}
