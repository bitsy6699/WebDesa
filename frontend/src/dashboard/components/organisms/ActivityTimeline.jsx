import { ActivityItem } from '@/dashboard/components/organisms/ActivityItem';

export function ActivityTimeline({ items }) {
  return (
    <ol className="space-y-3">
      {items.map((item) => (
        <ActivityItem key={`${item.title}-${item.timestamp}`} {...item} />
      ))}
    </ol>
  );
}
