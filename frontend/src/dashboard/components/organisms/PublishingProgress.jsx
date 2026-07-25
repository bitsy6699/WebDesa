import { ProgressIndicator } from '@/dashboard/components/molecules/ProgressIndicator';

export function PublishingProgress({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[0.8125rem] font-medium text-neutral-700">{item.label}</span>
            <span className="text-[0.75rem] text-neutral-500">{item.value}/{item.max ?? 100}</span>
          </div>
          <ProgressIndicator value={item.value} label="" max={item.max ?? 100} />
        </div>
      ))}
    </div>
  );
}
