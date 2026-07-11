import api from './api';
import { API_ROUTES } from '@/constants/routes';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type { PotentialListItem, PotentialDetail } from '@/types/Potential';

export interface FetchPotentialsParams {
  page?: number;
  search?: string;
  category?: string;
  featured?: boolean;
}

/**
 * Fetches paginated potential listings.
 * @see docs/engineering/API_SPEC.md §5.1
 */
export async function fetchPotentials(
  params: FetchPotentialsParams = {},
): Promise<PaginatedResponse<PotentialListItem>> {
  const response = await api.get<PaginatedResponse<PotentialListItem>>(
    API_ROUTES.POTENTIALS,
    { params },
  );
  return response.data;
}

/**
 * Fetches a single potential detail by category slug + slug.
 * @see docs/engineering/API_SPEC.md §5.2
 */
export async function fetchPotentialDetail(
  categorySlug: string,
  slug: string,
): Promise<PotentialDetail> {
  const response = await api.get<ApiResponse<PotentialDetail>>(
    API_ROUTES.POTENTIAL_DETAIL(categorySlug, slug),
  );
  return response.data.data;
}
