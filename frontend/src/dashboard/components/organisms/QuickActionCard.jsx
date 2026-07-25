import { clsx } from 'clsx';

export function QuickActionCard({ icon, title, description, onClick, className }) {
  const Icon = icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      className={clsx(
        'group flex items-start gap-3 rounded-xl border border-[#E7E7E7] bg-white p-4 text-left transition-colors hover:bg-neutral-50',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#184D47]',
        className,
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#184D47]/5 text-[#184D47]">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <h3 className="text-[0.8125rem] font-medium text-neutral-800">{title}</h3>
        <p className="mt-0.5 text-[0.75rem] text-neutral-500">{description}</p>
      </div>
    </button>
  );
}
