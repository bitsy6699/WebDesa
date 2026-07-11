import { Layers, Briefcase, Users, Map as MapIcon, Activity } from 'lucide-react';
import { Card } from '@/components/atoms/Card';
import type { Statistic } from '@/types/Statistic';
import { clsx } from 'clsx';

export interface StatisticCardProps {
  statistic: Statistic;
  className?: string;
}

function getIcon(iconName?: string) {
  switch (iconName) {
    case 'layers': return <Layers className="w-8 h-8 text-[--color-primary]" />;
    case 'briefcase': return <Briefcase className="w-8 h-8 text-[--color-secondary]" />;
    case 'users': return <Users className="w-8 h-8 text-[--color-accent]" />;
    case 'map': return <MapIcon className="w-8 h-8 text-[--color-warning]" />;
    default: return <Activity className="w-8 h-8 text-[--color-info]" />;
  }
}

/**
 * StatisticCard - Displays a single village statistic.
 */
export function StatisticCard({ statistic, className }: StatisticCardProps) {
  return (
    <Card className={clsx('flex flex-col items-center justify-center p-6 text-center', className)}>
      <div className="mb-4 rounded-full bg-[--neutral-50] p-4">
        {getIcon(statistic.icon)}
      </div>
      <h3 className="text-3xl font-bold text-[--neutral-900]">{statistic.value}</h3>
      <p className="mt-1 text-sm font-medium text-[--neutral-500] uppercase tracking-wider">
        {statistic.label}
      </p>
    </Card>
  );
}
