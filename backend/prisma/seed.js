import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  {
    label: 'Wisata Alam',
    slug: 'wisata-alam',
    description: 'Destinasi wisata alam dan keindahan desa',
    iconKey: 'mountain',
    colorCode: '#22c55e',
    schemaDefinition: { fields: [{ name: 'fasilitas', type: 'text', label: 'Fasilitas' }, { name: 'jamBuka', type: 'text', label: 'Jam Buka' }, { name: 'tiketMasuk', type: 'number', label: 'Tiket Masuk' }] },
  },
  {
    label: 'Pertanian',
    slug: 'pertanian',
    description: 'Hasil pertanian dan produk tani unggulan',
    iconKey: 'sprout',
    colorCode: '#eab308',
    schemaDefinition: { fields: [{ name: 'jenisTanaman', type: 'text', label: 'Jenis Tanaman' }, { name: 'luasLahan', type: 'text', label: 'Luas Lahan' }, { name: 'musimPanen', type: 'text', label: 'Musim Panen' }] },
  },
  {
    label: 'Perkebunan',
    slug: 'perkebunan',
    description: 'Komoditas perkebunan desa',
    iconKey: 'tree-pine',
    colorCode: '#16a34a',
    schemaDefinition: { fields: [{ name: 'jenisTanaman', type: 'text', label: 'Jenis Tanaman' }, { name: 'luasLahan', type: 'text', label: 'Luas Lahan (ha)' }, { name: 'hasilTahunan', type: 'text', label: 'Hasil Tahunan' }] },
  },
  {
    label: 'Peternakan',
    slug: 'peternakan',
    description: 'Usaha peternakan dan produk turunannya',
    iconKey: 'beef',
    colorCode: '#f97316',
    schemaDefinition: { fields: [{ name: 'jenisTernak', type: 'text', label: 'Jenis Ternak' }, { name: 'jumlahPopulasi', type: 'number', label: 'Jumlah Populasi' }, { name: 'produkUnggulan', type: 'text', label: 'Produk Unggulan' }] },
  },
  {
    label: 'UMKM',
    slug: 'umkm',
    description: 'Usaha mikro kecil dan menengah desa',
    iconKey: 'store',
    colorCode: '#ec4899',
    schemaDefinition: { fields: [{ name: 'pemilik', type: 'text', label: 'Nama Pemilik' }, { name: 'produkUtama', type: 'text', label: 'Produk Utama' }, { name: 'omsetBulanan', type: 'text', label: 'Omzet Bulanan' }] },
  },
  {
    label: 'Agroforestri',
    slug: 'agroforestri',
    description: 'Sistem pengelolaan hutan berbasis masyarakat',
    iconKey: 'forest',
    colorCode: '#059669',
    schemaDefinition: { fields: [{ name: 'luasKawasan', type: 'text', label: 'Luas Kawasan' }, { name: 'jenisPohon', type: 'text', label: 'Jenis Pohon' }, { name: 'kelompokTani', type: 'text', label: 'Kelompok Tani' }] },
  },
];

const potentials = [
  {
    title: 'Air Terjun Curug Putri',
    slug: 'air-terjun-curug-putri',
    description: 'Air terjun setinggi 25 meter dengan kolam alami yang jernih. Cocok untuk wisata keluarga dan foto alam.',
    status: 'published',
    isFeatured: true,
    latitude: -7.2345,
    longitude: 107.8912,
    address: 'Dusun Cikembang, Desa Karamatwangi',
    dusun: 'Cikembang',
    categorySlug: 'wisata-alam',
    metadata: { fasilitas: 'Warung makan, area parkir, toilet', jamBuka: '08:00 - 17:00', tiketMasuk: 10000 },
  },
  {
    title: 'Bukit Panorama Karamat',
    slug: 'bukit-panorama-karamat',
    description: 'Bukit dengan pemandangan sunrise dan hamparan perkebunan teh dari ketinggian 1200 mdpl.',
    status: 'published',
    isFeatured: true,
    latitude: -7.2189,
    longitude: 107.8765,
    address: 'Dusun Pasir Muncang, Desa Karamatwangi',
    dusun: 'Pasir Muncang',
    categorySlug: 'wisata-alam',
    metadata: { fasilitas: 'Camping ground, gardu pandang', jamBuka: '24 jam', tiketMasuk: 5000 },
  },
  {
    title: 'Lahan Jagung Organik Makmur',
    slug: 'lahan-jagung-organik-makmur',
    description: 'Lahan demonstrasi jagung organik seluas 5 hektar milik Kelompok Tani Makmur.',
    status: 'published',
    isFeatured: false,
    latitude: -7.2456,
    longitude: 107.9023,
    address: 'Dusun Cikalong, Desa Karamatwangi',
    dusun: 'Cikalong',
    categorySlug: 'pertanian',
    metadata: { jenisTanaman: 'Jagung Hibrida', luasLahan: '5 ha', musimPanen: 'Oktober - Desember' },
  },
  {
    title: 'Sentra Cabai Merah Keraton',
    slug: 'sentra-cabai-merah-keraton',
    description: 'Pusat produksi cabai merah dengan sistem irigasi tetes modern. Hasil panen mencapai 2 ton per musim.',
    status: 'published',
    isFeatured: false,
    latitude: -7.2411,
    longitude: 107.9100,
    address: 'Dusun Keraton, Desa Karamatwangi',
    dusun: 'Keraton',
    categorySlug: 'pertanian',
    metadata: { jenisTanaman: 'Cabai Merah Keriting', luasLahan: '3 ha', musimPanen: 'Januari - Maret, Juli - September' },
  },
  {
    title: 'Kebun Kelapa Sawit Sejahtera',
    slug: 'kebun-kelapa-sawit-sejahtera',
    description: 'Perkebunan kelapa sawit plasma seluas 20 hektar yang dikelola oleh Koperasi Unit Desa.',
    status: 'published',
    isFeatured: false,
    latitude: -7.2567,
    longitude: 107.8856,
    address: 'Dusun Babakan, Desa Karamatwangi',
    dusun: 'Babakan',
    categorySlug: 'perkebunan',
    metadata: { jenisTanaman: 'Kelapa Sawit Varietas DxP', luasLahan: '20 ha', hasilTahunan: '60 ton TBS' },
  },
  {
    title: 'Perkebunan Kakao Lestari',
    slug: 'perkebunan-kakao-lestari',
    description: 'Kebun kakao organik dengan sistem agroforestri sederhana. Biji kakao difermentasi sendiri untuk menghasilkan cita rasa premium.',
    status: 'draft',
    isFeatured: false,
    latitude: -7.2289,
    longitude: 107.8945,
    address: 'Dusun Cileungsir, Desa Karamatwangi',
    dusun: 'Cileungsir',
    categorySlug: 'perkebunan',
    metadata: { jenisTanaman: 'Kakao Forastero & Trinitario', luasLahan: '8 ha', hasilTahunan: '12 ton biji kering' },
  },
  {
    title: 'Ternak Sapi Perah Barokah',
    slug: 'ternak-sapi-perah-barokah',
    description: 'Peternakan sapi perah dengan 50 ekor sapi FH. Produksi susu segar 400 liter/hari.',
    status: 'published',
    isFeatured: false,
    latitude: -7.2389,
    longitude: 107.8789,
    address: 'Dusun Sukamaju, Desa Karamatwangi',
    dusun: 'Sukamaju',
    categorySlug: 'peternakan',
    metadata: { jenisTernak: 'Sapi Perah FH', jumlahPopulasi: 50, produkUnggulan: 'Susu Segar Pasteurisasi' },
  },
  {
    title: 'Budidaya Ikan Lele Berkah',
    slug: 'budidaya-ikan-lele-berkah',
    description: 'Kolam budidaya lele sistem bioflok dengan 20 kolam terpal. Produksi 5 ton per siklus panen.',
    status: 'published',
    isFeatured: false,
    latitude: -7.2512,
    longitude: 107.9012,
    address: 'Dusun Ciparay, Desa Karamatwangi',
    dusun: 'Ciparay',
    categorySlug: 'peternakan',
    metadata: { jenisTernak: 'Ikan Lele Sangkuriang', jumlahPopulasi: 40000, produkUnggulan: 'Lele Segar & Nugget Lele' },
  },
  {
    title: 'Batik Tulis Mekar Sari',
    slug: 'batik-tulis-mekar-sari',
    description: 'Produksi batik tulis khas Garut dengan motif alam pegunungan. Dikerjakan oleh 15 perajin perempuan.',
    status: 'published',
    isFeatured: true,
    latitude: -7.2356,
    longitude: 107.8878,
    address: 'Dusun Panyairan, Desa Karamatwangi',
    dusun: 'Panyairan',
    categorySlug: 'umkm',
    metadata: { pemilik: 'Ibu Siti Nurjanah', produkUtama: 'Batik Tulis & Batik Cap', omsetBulanan: 'Rp 25.000.000' },
  },
  {
    title: 'Keripik Pisang Lestari',
    slug: 'keripik-pisang-lestari',
    description: 'UKM penghasil keripik pisang aneka rasa (original, cokelat, keju). Sudah berizin PIRT dan dipasarkan hingga luar kota.',
    status: 'published',
    isFeatured: false,
    latitude: -7.2444,
    longitude: 107.8956,
    address: 'Dusun Cikadu, Desa Karamatwangi',
    dusun: 'Cikadu',
    categorySlug: 'umkm',
    metadata: { pemilik: 'Bapak Asep Permana', produkUtama: 'Keripik Pisang Aneka Rasa', omsetBulanan: 'Rp 8.000.000' },
  },
  {
    title: 'Hutan Rakyat Lestari',
    slug: 'hutan-rakyat-lestari',
    description: 'Kawasan hutan rakyat seluas 50 ha yang dikelola Kelompok Tani Hutan (KTH) Lestari dengan sistem tumpang sari.',
    status: 'published',
    isFeatured: false,
    latitude: -7.2267,
    longitude: 107.8690,
    address: 'Dusun Gunung Leutik, Desa Karamatwangi',
    dusun: 'Gunung Leutik',
    categorySlug: 'agroforestri',
    metadata: { luasKawasan: '50 ha', jenisPohon: 'Sengon, Mahoni, Durian', kelompokTani: 'KTH Lestari' },
  },
  {
    title: 'Kebun Campur Sari',
    slug: 'kebun-campur-sari',
    description: 'Kebun campuran antara pohon kayu-kayuan dengan tanaman kopi dan buah-buahan di bawah tegakan.',
    status: 'draft',
    isFeatured: false,
    latitude: -7.2322,
    longitude: 107.8823,
    address: 'Dusun Legok Sari, Desa Karamatwangi',
    dusun: 'Legok Sari',
    categorySlug: 'agroforestri',
    metadata: { luasKawasan: '15 ha', jenisPohon: 'Kopi Robusta, Pisang, Pete, Jengkol', kelompokTani: 'KTH Campur Sari' },
  },
];

async function upsertUser() {
  const username = 'admin';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 12);

  return await prisma.user.upsert({
    where: { username },
    update: {},
    create: { username, password: hashedPassword },
  });
}

async function upsertCategories() {
  const created = [];
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { label: cat.label, description: cat.description, iconKey: cat.iconKey, colorCode: cat.colorCode },
      create: { label: cat.label, slug: cat.slug, description: cat.description, iconKey: cat.iconKey, colorCode: cat.colorCode },
    });

    await prisma.categorySchema.upsert({
      where: { categoryId: category.id },
      update: { schemaDefinition: cat.schemaDefinition },
      create: { categoryId: category.id, schemaDefinition: cat.schemaDefinition },
    });

    created.push(category);
  }
  return created;
}

async function upsertPotentials(categoryMap, userId) {
  for (const pot of potentials) {
    const categoryId = categoryMap[pot.categorySlug];

    const location = await prisma.location.upsert({
      where: {
        id: pot.slug,
      },
      update: {
        latitude: pot.latitude,
        longitude: pot.longitude,
        address: pot.address,
        dusun: pot.dusun,
      },
      create: {
        id: pot.slug,
        latitude: pot.latitude,
        longitude: pot.longitude,
        address: pot.address,
        dusun: pot.dusun,
      },
    });

    await prisma.potential.upsert({
      where: { slug: pot.slug },
      update: {
        title: pot.title,
        description: pot.description,
        status: pot.status,
        isFeatured: pot.isFeatured,
        metadata: pot.metadata,
        categoryId,
        locationId: location.id,
        createdById: userId,
      },
      create: {
        slug: pot.slug,
        title: pot.title,
        description: pot.description,
        status: pot.status,
        isFeatured: pot.isFeatured,
        metadata: pot.metadata,
        categoryId,
        locationId: location.id,
        createdById: userId,
      },
    });
  }
}

async function main() {
  console.log('Mulai seed...\n');

  const user = await upsertUser();
  console.log(`User: ${user.username} (${user.id})`);

  const categories = await upsertCategories();
  const categoryMap = {};
  for (const cat of categories) {
    categoryMap[cat.slug] = cat.id;
    console.log(`Kategori: ${cat.label} (${cat.slug})`);
  }

  await upsertPotentials(categoryMap, user.id);
  console.log(`\nPotensi: ${potentials.length} item berhasil di-seed`);

  console.log('\nSeed selesai!');
  console.log(`Login: POST /api/v1/auth/login`);
  console.log(`Username: ${user.username}`);
  console.log(`Password: password123`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
