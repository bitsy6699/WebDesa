/**
 * API response type shapes aligned to API_SPEC.md §2.
 * These are the envelope types that wrap all backend responses.
 */

/** Standard success wrapper for single-resource responses. */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/** Standard success wrapper for collection responses with pagination. */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

/** Pagination meta block returned on list endpoints. §2.3 */
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

/** Pagination links block. §2.3 */
export interface PaginationLinks {
  prev: string | null;
  next: string | null;
}

/** Standard API error envelope. §2.2 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}
