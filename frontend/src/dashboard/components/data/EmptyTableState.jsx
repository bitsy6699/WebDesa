import { Inbox } from 'lucide-react';

export function EmptyTableState({ title, description, action }) {
  return (
    <div className="rounded-xl border border-dashed border-[#E7E7E7] bg-neutral-50/50 p-10 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-400">
        <Inbox className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h3 className="text-[0.875rem] font-medium text-neutral-800">{title}</h3>
      <p className="mt-1 text-[0.8125rem] text-neutral-500">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
