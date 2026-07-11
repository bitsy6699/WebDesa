import type { Category } from '@/types/Category';
import type { Potential } from '@/types/Potential';
import type { Statistic } from '@/types/Statistic';
import heroPlaceholder from '@/assets/images/placeholder-hero.svg';
import cardPlaceholder from '@/assets/images/placeholder-card.svg';

export const hero = {
  title: 'Jelajahi Potensi Luar Biasa Desa Karamatwangi',
  subtitle: 'Temukan keindahan alam, produk lokal unggulan, dan kearifan budaya di desa kami.',
  image: heroPlaceholder,
};

export const categories: Category[] = [
  { id: '1', name: 'Pariwisata', slug: 'pariwisata', description: 'Destinasi wisata alam dan buatan', icon: 'map', color: 'blue' },
  { id: '2', name: 'Pertanian', slug: 'pertanian', description: 'Hasil bumi dan agrowisata', icon: 'tractor', color: 'green' },
  { id: '3', name: 'UMKM', slug: 'umkm', description: 'Produk lokal dan kerajinan', icon: 'store', color: 'secondary' },
  { id: '4', name: 'Seni Budaya', slug: 'seni-budaya', description: 'Kesenian dan tradisi lokal', icon: 'music', color: 'accent' },
];

export const statistics: Statistic[] = [
  { id: '1', label: 'Total Potensi', value: 45, icon: 'layers' },
  { id: '2', label: 'UMKM Aktif', value: 24, icon: 'briefcase' },
  { id: '3', label: 'Wisatawan / Bulan', value: '1.2K', icon: 'users' },
  { id: '4', label: 'Luas Wilayah (Ha)', value: 350, icon: 'map' },
];

export const featuredPotentials: Potential[] = [
  {
    id: '1',
    title: 'Curug Cikaso',
    slug: 'curug-cikaso',
    description: 'Air terjun bertingkat dengan air jernih kebiruan yang memukau.',
    thumbnail: cardPlaceholder,
    category: categories[0],
    is_featured: true,
    published_at: '2026-07-01T00:00:00Z',
    location: 'Dusun Cibitung',
  },
  {
    id: '2',
    title: 'Kopi Karamatwangi',
    slug: 'kopi-karamatwangi',
    description: 'Kopi robusta asli dari perkebunan warga dengan cita rasa khas.',
    thumbnail: cardPlaceholder,
    category: categories[1],
    is_featured: true,
    published_at: '2026-07-05T00:00:00Z',
  },
  {
    id: '3',
    title: 'Kerajinan Bambu',
    slug: 'kerajinan-bambu',
    description: 'Berbagai produk anyaman bambu fungsional dan dekoratif.',
    thumbnail: cardPlaceholder,
    category: categories[2],
    is_featured: true,
    published_at: '2026-07-10T00:00:00Z',
    location: 'Dusun Karangtengah',
  },
];
