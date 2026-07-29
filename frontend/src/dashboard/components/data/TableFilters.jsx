import { DashboardButton } from '@/dashboard/components/atoms/DashboardButton';

export function TableFilters({ filters, onReset }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters}
      {onReset ? (
        <DashboardButton variant="ghost" size="sm" onClick={onReset}>
          Atur Ulang Filter
        </DashboardButton>
      ) : null}
    </div>
  );
}
