export function buildMetricItems(summary) {
  const items = [];

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

export function CountUp(value, triggered) {
  if (!triggered) {
    return '0';
  }

  return value.toLocaleString('id-ID');
}
