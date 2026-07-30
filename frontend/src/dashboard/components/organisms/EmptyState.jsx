import { Inbox } from 'lucide-react';

export function EmptyState({ title, description, action, icon: IconComponent }) {
  const Icon = IconComponent ?? Inbox;

  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-[#E7E7E7] bg-neutral-50/50 px-6 py-16 text-center"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h3 className="text-[0.9375rem] font-semibold text-neutral-800">{title}</h3>
      {description ? <p className="mt-1.5 max-w-sm text-[0.8125rem] leading-relaxed text-neutral-500">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
