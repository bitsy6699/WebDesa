import api from './api';
import { API_ROUTES } from '@/constants/routes';

/** Fetch paginated potential listings (public). */
export async function fetchPotentials(
  params = {},
) {
  const response = await api.get(
    API_ROUTES.POTENTIALS,
    { params },
  );
  return response.data;
}

/** Fetch single potential detail (public). */
export async function fetchPotentialDetail(
  categorySlug,
  slug,
) {
  const response = await api.get(
    API_ROUTES.POTENTIAL_DETAIL(categorySlug, slug),
  );
  return response.data.data;
}

/** Create a new potential (admin). */
export async function createPotential(data) {
  const response = await api.post(
    API_ROUTES.ADMIN_POTENTIALS,
    data,
  );
  return response.data.data;
}

/** Update an existing potential (admin). */
export async function updatePotential(
  id,
  data,
) {
  const response = await api.put(
    API_ROUTES.ADMIN_POTENTIAL(id),
    data,
  );
  return response.data.data;
}

/** Delete a potential (admin). */
export async function deletePotential(id) {
  await api.delete(API_ROUTES.ADMIN_POTENTIAL(id));
}

/** Toggle featured status (admin). */
export async function togglePotentialFeatured(id) {
  const response = await api.patch(
    API_ROUTES.ADMIN_POTENTIAL_TOGGLE(id),
  );
  return response.data.data;
}
