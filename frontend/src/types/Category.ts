/**
 * Category as returned by the API.
 * @see docs/engineering/API_SPEC.md §4.1
 */
export interface Category {
  id: string;
  label: string;        // e.g. "UMKM"
  slug: string;
  icon_key: string | null;
  color_code: string | null; // hex e.g. "#16A34A"
}

/**
 * Minimal category embed returned inside Potential list items.
 */
export interface CategoryEmbed {
  label: string;
  slug: string;
  color_code: string | null;
}
