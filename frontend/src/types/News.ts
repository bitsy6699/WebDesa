/**
 * News article shape.
 * No backend endpoint yet — mock data used on landing page.
 */
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  /** ISO 8601 date string e.g. "2026-07-08" */
  date: string;
  category: string;
}
