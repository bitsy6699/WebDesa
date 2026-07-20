/**
 * Statistics summary returned by GET /statistics/summary.
 * @see docs/engineering/API_SPEC.md §7.1
 */
export interface StatisticsSummary {
  total_potentials: number;
  total_umkm: number;
  total_categories: number;
  total_dusun: number;
}

