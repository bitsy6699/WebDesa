/**
 * Map constants — center, zoom, category colors, defaults.
 */

export const MAP_CENTER = [-7.35, 107.85];
export const MAP_ZOOM = 13;
export const MIN_ZOOM = 11;
export const MAX_ZOOM = 18;

export const CATEGORY_COLORS = {
  wisata: '#22C55E',
  umkm: '#F59E0B',
  pertanian: '#3B82F6',
  budaya: '#A855F7',
  default: '#184D47',
};

export function getCategoryColor(slug) {
  return CATEGORY_COLORS[slug?.toLowerCase()] || CATEGORY_COLORS.default;
}

export function getCategoryIcon(slug) {
  const icons = {
    wisata: '🏔️',
    umkm: '🏪',
    pertanian: '🌾',
    budaya: '🎭',
  };
  return icons[slug?.toLowerCase()] || '📍';
}

export const KARAMATWANGI_BOUNDS = [
  [-7.40, 107.80],
  [-7.30, 107.90],
];
