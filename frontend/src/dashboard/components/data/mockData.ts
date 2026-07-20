export interface MockRecord {
  id: number;
  name: string;
  status: 'Published' | 'Draft' | 'Archived';
  category: string;
  updatedAt: string;
}

export const mockPotentials: MockRecord[] = [
  { id: 1, name: 'Curug Cikoneng', status: 'Published', category: 'Wisata Alam', updatedAt: 'Today' },
  { id: 2, name: 'UMKM Kopi', status: 'Draft', category: 'Kuliner', updatedAt: 'Yesterday' },
  { id: 3, name: 'Bukit Panorama', status: 'Archived', category: 'Wisata Alam', updatedAt: '2 days ago' },
];

export const mockCategories: MockRecord[] = [
  { id: 10, name: 'Wisata Alam', status: 'Published', category: 'Taxonomy', updatedAt: 'Today' },
  { id: 11, name: 'Kuliner', status: 'Draft', category: 'Taxonomy', updatedAt: 'Yesterday' },
  { id: 12, name: 'Budaya', status: 'Published', category: 'Taxonomy', updatedAt: '3 days ago' },
];

export const mockMedia: MockRecord[] = [
  { id: 20, name: 'Hero-01.jpg', status: 'Published', category: 'Images', updatedAt: 'Today' },
  { id: 21, name: 'Gallery-02.png', status: 'Draft', category: 'Images', updatedAt: '2 hrs ago' },
  { id: 22, name: 'Guidebook.pdf', status: 'Archived', category: 'Documents', updatedAt: '1 week ago' },
];
