import { Bell } from 'lucide-react';
import { DashboardIconButton } from '@/dashboard/components/atoms/DashboardIconButton';

export function NotificationButton() {
  return (
    <div className="relative">
      <DashboardIconButton icon={<Bell className="h-4 w-4" />} aria-label="Notifikasi" />
      <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#184D47]" />
      <span className="sr-only">2 notifikasi belum dibaca</span>
    </div>
  );
}
