import type { CategoryEmbed } from './Category';

/** Location embedded in potential responses. */
export interface PotentialLocation {
  latitude: number;
  longitude: number;
  address: string | null;
}

/** Contact block embedded in potential responses. */
export interface PotentialContact {
  whatsapp: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
}

/**
 * Potential list item returned by GET /potentials.
 * @see docs/engineering/API_SPEC.md §5.1
 */
export interface PotentialListItem {
  id: string;
  title: string;
  slug: string;
  category: CategoryEmbed;
  short_description: string;
  cover_image_url: string | null;
  location: PotentialLocation | null;
  contact: Pick<PotentialContact, 'whatsapp'> | null;
  /** ISO 8601 publish timestamp from GET /potentials */
  created_at?: string;
}

/**
 * Full potential detail returned by GET /potentials/:category_slug/:slug.
 * @see docs/engineering/API_SPEC.md §5.2
 */
export interface PotentialDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: CategoryEmbed;
  cover_image_url: string | null;
  gallery: string[];
  location: PotentialLocation | null;
  contact: PotentialContact | null;
  /** ACA key-value metadata object. Keys and values are strings. */
  metadata: Record<string, string> | null;
  created_at?: string;
}
