import type { StatisticsSummary } from '@/types/Statistic';

export interface StatItemRaw {
  label: string;
  value: number;
  suffix?: string;
  iconKey?: 'star' | 'grid' | 'sprout' | 'home';
}

export function buildMetricItems(summary?: Partial<StatisticsSummary>): StatItemRaw[] {
  const items: StatItemRaw[] = [];

  if (typeof summary?.total_potentials === 'number') {
    items.push({ label: 'Total Potensi', value: summary.total_potentials, iconKey: 'star' });
  }
  if (typeof summary?.total_categories === 'number') {
    items.push({ label: 'Total Kategori', value: summary.total_categories, iconKey: 'grid' });
  }
  if (typeof summary?.total_umkm === 'number') {
    items.push({ label: 'Total UMKM', value: summary.total_umkm, iconKey: 'sprout' });
  }
  if (typeof summary?.total_dusun === 'number') {
    items.push({ label: 'Total Dusun', value: summary.total_dusun, iconKey: 'home' });
  }

  return items;
}

export function CountUp(value: number, triggered: boolean): string {
  if (!triggered) {
    return '0';
  }

  return value.toLocaleString('id-ID');
}

export function CountUpString(value: number) {
  return CountUp(value, true);
}
