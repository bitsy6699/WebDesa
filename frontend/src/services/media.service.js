import api from './api';
import { API_ROUTES } from '@/constants/routes';

/** Fetch paginated media list (admin). */
export async function fetchMediaList(params = {}) {
  const response = await api.get(API_ROUTES.ADMIN_MEDIA_LIST, { params });
  return response.data;
}

/** Upload a media file (admin). */
export async function uploadMedia(
  file,
  onProgress,
) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(
    API_ROUTES.ADMIN_MEDIA_UPLOAD,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (e.total && onProgress) {
          onProgress(Math.round((e.loaded * 100) / e.total));
        }
      },
    },
  );
  return response.data.data;
}

/** Delete a media asset (admin). */
export async function deleteMedia(id) {
  await api.delete(API_ROUTES.ADMIN_MEDIA_DELETE(id));
}
