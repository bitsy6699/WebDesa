import type { NewsArticle } from '@/types/News';

/**
 * Mock news articles for landing page NewsSection.
 * No backend endpoint for news yet — mock data allowed per Phase 13E spec.
 */
export const NEWS_MOCK: NewsArticle[] = [
  {
    id: '1',
    slug: 'festival-panen-raya-2026',
    title: 'Festival Panen Raya Desa Karamatwangi 2026',
    excerpt:
      'Masyarakat Desa Karamatwangi merayakan panen raya dengan festival budaya yang meriah. Ratusan warga dan pengunjung hadir menyaksikan parade hasil bumi dan pertunjukan seni tradisional.',
    cover_image_url: null,
    date: '2026-07-08',
    category: 'Budaya',
  },
  {
    id: '2',
    slug: 'pelatihan-umkm-digital',
    title: 'Pelatihan Digital Marketing untuk UMKM Lokal',
    excerpt:
      'Pemerintah desa bersama Dinas Koperasi mengadakan pelatihan digital marketing gratis untuk pelaku UMKM. Program ini bertujuan memperluas jangkauan pasar produk lokal ke tingkat nasional.',
    cover_image_url: null,
    date: '2026-07-03',
    category: 'UMKM',
  },
  {
    id: '3',
    slug: 'infrastruktur-jalan-baru',
    title: 'Pembangunan Jalan Desa Sepanjang 2,4 Km Selesai',
    excerpt:
      'Proyek pembangunan jalan penghubung antar dusun sepanjang 2,4 kilometer resmi selesai. Infrastruktur baru ini diharapkan memperlancar mobilitas warga dan distribusi hasil pertanian.',
    cover_image_url: null,
    date: '2026-06-28',
    category: 'Infrastruktur',
  },
];
