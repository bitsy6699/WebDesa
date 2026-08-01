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

/** Fetch paginated potential listings (admin — includes all statuses). */
export async function fetchAdminPotentials(
  params = {},
) {
  const response = await api.get(
    API_ROUTES.ADMIN_POTENTIALS,
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

/** Fetch single potential detail (admin — includes all statuses). */
export async function fetchAdminPotential(id) {
  const response = await api.get(
    API_ROUTES.ADMIN_POTENTIAL(id),
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

/** Toggle publish status between draft and published (admin). */
export async function togglePotentialStatus(id, currentStatus) {
  let newStatus;
  if (currentStatus === 'published') {
    newStatus = 'draft';
  } else if (currentStatus === 'archived') {
    newStatus = 'draft';
  } else {
    newStatus = 'published';
  }
  const response = await api.put(
    API_ROUTES.ADMIN_POTENTIAL(id),
    { status: newStatus },
  );
  return response.data.data;
}

/** Download the XLSX import template (admin). */
export async function downloadImportTemplate() {
  const response = await api.get(
    API_ROUTES.ADMIN_IMPORT_TEMPLATE,
    { responseType: 'blob' },
  );
  return response.data;
}

/** Import potentials from an XLSX file (admin). */
export async function importPotentials(file) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post(
    API_ROUTES.ADMIN_IMPORT,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return response.data.data;
}

/** Export all potentials as an XLSX file (admin). */
export async function exportPotentials() {
  const response = await api.get(
    API_ROUTES.ADMIN_EXPORT,
    { responseType: 'blob' },
  );
  return response.data;
}
