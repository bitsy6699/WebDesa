import type { Category } from '@/types/Category';

export type CategoryStatus = 'Draft' | 'Published' | 'Archived';

export interface CategoryDraft {
  name: string;
  slug: string;
  description?: string;
  colorCode?: string;
  iconKey?: string;
}

export interface CategoryRow extends Omit<Category, 'label' | 'icon_key' | 'color_code' | 'description'> {
  id: string;
  name: string;
  slug: string;
  status: CategoryStatus;
  type: string;
  updatedAt: string;
  description?: string | null;
  colorCode?: string | null;
  iconKey?: string | null;
}

export type CategoryFormMode = 'create' | 'edit';
