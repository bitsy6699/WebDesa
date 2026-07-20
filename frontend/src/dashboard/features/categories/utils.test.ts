import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCategoryRecord, formatCategoryStatus, mapServerErrorsToFormState, validateCategoryDraft } from './utils.ts';

test('validateCategoryDraft flags missing name and slug', () => {
  const result = validateCategoryDraft({ name: '   ', slug: '   ', description: '' });

  assert.deepEqual(result, {
    isValid: false,
    errors: {
      name: 'Name is required.',
      slug: 'Slug is required.',
    },
    normalizedSlug: '',
  });
});

test('validateCategoryDraft normalizes slug input and accepts valid values', () => {
  const result = validateCategoryDraft({ name: 'UMKM', slug: ' UMKM Category ', description: 'Example' });

  assert.equal(result.isValid, true);
  assert.equal(result.normalizedSlug, 'umkm-category');
  assert.deepEqual(result.errors, {});
});

test('buildCategoryRecord derives a dashboard row from a category payload', () => {
  const record = buildCategoryRecord({
    id: 'cat-1',
    label: 'UMKM',
    slug: 'umkm',
    icon_key: 'sparkles',
    color_code: '#16A34A',
    description: 'Micro enterprises',
  });

  assert.equal(record.name, 'UMKM');
  assert.equal(record.slug, 'umkm');
  assert.equal(record.status, 'Published');
  assert.equal(formatCategoryStatus(record.status), 'Published');
});

test('mapServerErrorsToFormState converts Laravel validation details into form-friendly data', () => {
  const result = mapServerErrorsToFormState({
    response: {
      data: {
        error: {
          code: 'VALIDATION_FAILED',
          message: 'Validation failed.',
          details: {
            name: ['Name is required.'],
            slug: ['Slug is already taken.'],
          },
        },
      },
    },
  });

  assert.deepEqual(result, {
    message: 'Validation failed.',
    fieldErrors: {
      name: 'Name is required.',
      slug: 'Slug is already taken.',
    },
  });
});
