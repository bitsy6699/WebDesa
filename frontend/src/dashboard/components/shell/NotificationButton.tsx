import { Bell } from 'lucide-react';
import { DashboardIconButton } from '@/dashboard/components/atoms/DashboardIconButton';

export function NotificationButton() {
  return (
    <div className="relative">
      <DashboardIconButton icon={<Bell className="h-5 w-5" />} aria-label="Notifications" />
      <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-[#0f766e]" />
      <span className="sr-only">2 unread notifications</span>
    </div>
  );
}
