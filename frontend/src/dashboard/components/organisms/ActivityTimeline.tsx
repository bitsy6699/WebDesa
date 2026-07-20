import { ActivityItem, type ActivityItemProps } from '@/dashboard/components/organisms/ActivityItem';

export interface ActivityTimelineProps {
  items: ActivityItemProps[];
}

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <ol className="space-y-3">
      {items.map((item) => (
        <ActivityItem key={`${item.title}-${item.timestamp}`} {...item} />
      ))}
    </ol>
  );
}
