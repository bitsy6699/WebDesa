

function normalizeSlug(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function validateCategoryDraft(draft) {
  const errors = {};

  if (!draft.name?.trim()) {
    errors.name = 'Name is required.';
  }

  if (!draft.slug?.trim()) {
    errors.slug = 'Slug is required.';
  }

  const normalizedSlug = normalizeSlug(draft.slug ?? '');
  if (draft.slug?.trim() && !normalizedSlug) {
    errors.slug = 'Slug must contain letters or numbers.';
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
    status: 'Published',
    type: 'Taxonomy',
    updatedAt: 'Just now',
    description: category.description ?? null,
    colorCode: category.color_code ?? null,
    iconKey: category.icon_key ?? null,
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
    message: responseData?.error?.message ?? 'Unable to process your request.',
    fieldErrors,
  };
}

export function getCategoryErrorMessage(error) {
  if (error && typeof error === 'object' && 'response' in error) {
    const status = error.response?.status;
    const message = error.response?.data?.error?.message;

    if (status === 404) {
      return 'The requested category could not be found.';
    }

    if (status === 409) {
      return 'This category conflicts with an existing record.';
    }

    if (status === 422) {
      return message ?? 'The provided category details are invalid.';
    }

    if (status === 500) {
      return 'The server is currently unavailable. Please try again shortly.';
    }
  }

  if (error && typeof error === 'object' && 'code' in error) {
    const code = error.code;
    if (code === 'ERR_NETWORK') {
      return 'The network is unavailable. Please check your connection and try again.';
    }

    if (code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return 'The request timed out. Please try again.';
    }
  }

  return 'We could not complete the request. Please try again.';
}
