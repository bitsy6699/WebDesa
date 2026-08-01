

function normalizeSlug(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function validateCategoryDraft(draft) {
  const errors = {};

  if (!draft.name?.trim()) {
    errors.name = 'Nama wajib diisi.';
  }

  if (!draft.slug?.trim()) {
    errors.slug = 'Tautan wajib diisi.';
  }

  const normalizedSlug = normalizeSlug(draft.slug ?? '');
  if (draft.slug?.trim() && !normalizedSlug) {
    errors.slug = 'Tautan harus mengandung huruf atau angka.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedSlug,
  };
}

function buildCategoryRecord(category) {
  return {
    id: category.id,
    name: category.label,
    slug: category.slug,
    status: 'Diterbitkan',
    type: 'Taksonomi',
    updatedAt: 'Baru saja',
    description: category.description ?? null,
    colorCode: category.colorCode ?? null,
    iconKey: category.iconKey ?? null,
  };
}

export function mapCategoriesToRows(categories) {
  return categories.map(buildCategoryRecord);
}

export function mapServerErrorsToFormState(error) {
  const responseData = error && typeof error === 'object' && 'response' in error ? error.response?.data : null;
  const details = responseData?.error?.details;
  const fieldErrors = Object.fromEntries(
    Object.entries(details ?? {}).map(([field, messages]) => [field, Array.isArray(messages) ? messages[0] : String(messages ?? '')]),
  );

  return {
    message: responseData?.error?.message ?? 'Gagal memproses permintaan Anda.',
    fieldErrors,
  };
}

export function getCategoryErrorMessage(error) {
  if (error && typeof error === 'object' && 'response' in error) {
    const status = error.response?.status;
    const message = error.response?.data?.error?.message;

    if (status === 404) {
      return 'Kategori yang diminta tidak ditemukan.';
    }

    if (status === 409) {
      return 'Kategori ini bertentangan dengan data yang sudah ada.';
    }

    if (status === 422) {
      return message ?? 'Data kategori yang diberikan tidak valid.';
    }

    if (status === 500) {
      return 'Server sedang tidak tersedia. Silakan coba lagi.';
    }
  }

  if (error && typeof error === 'object' && 'code' in error) {
    const code = error.code;
    if (code === 'ERR_NETWORK') {
      return 'Jaringan tidak tersedia. Periksa koneksi Anda dan coba lagi.';
    }

    if (code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return 'Permintaan waktu habis. Silakan coba lagi.';
    }
  }

  return 'Gagal menyelesaikan permintaan. Silakan coba lagi.';
}
