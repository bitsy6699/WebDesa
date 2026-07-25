import { FeatureShowcase } from '@/components/organisms/FeatureShowcase';
import { StoryDivider } from '@/components/organisms/StoryDivider';

const HERO = '/hero/hero-karamatwangi.jpg';

/**
 * FeatureShowcaseDemo — Visual demo of the FeatureShowcase component.
 *
 * Shows both left-aligned and right-aligned variants with realistic
 * village content (Tourism and UMKM). Not linked from navigation —
 * accessible only via /demo/feature-showcase.
 */
export default function FeatureShowcaseDemo() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Page header */}
      <div className="mx-auto max-w-[720px] px-5 pt-32 pb-12 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Component Demo
        </p>
        <h1 className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-primary-dark sm:text-[2rem]">
          Feature Showcase
        </h1>
        <p className="mt-4 text-[15px] leading-[1.75] text-neutral-500">
          Editorial storytelling block for Tourism, UMKM, Culture, and Agriculture.
          Two layout variants: image left and image right.
        </p>
      </div>

      {/* Variant 1 — Image left (default) */}
      <FeatureShowcase
        title="Wisata Alam Dataran Tinggi Garut"
        category="Wisata"
        description="Desa Karamatwangi menawarkan pengalaman wisata alam yang autentik di kaki Gunung Api Cikajang. Dengan hamparan kebun teh, hutan pinus, dan udara pegunungan yang segar, desa ini menjadi surga tersembunyi bagi para pencinta alam."
        image={HERO}
        imageAlt="Pemandangan hamparan hijau dataran tinggi Desa Karamatwangi"
        stats={[
          { label: 'Ketinggian', value: '1.200 mdpl' },
          { label: 'Suhu Rata-rata', value: '18–24°C' },
          { label: 'Jarak dari Garut Kota', value: '25 km' },
        ]}
        cta={{ to: '/potentials?category=wisata', label: 'Jelajahi Wisata' }}
        align="left"
      />

      <StoryDivider
        title="Setiap sudut desa menyimpan keindahan yang menunggu untuk ditemukan."
        variant="sage"
      />

      {/* Variant 2 — Image right */}
      <FeatureShowcase
        title="UMKM Lokal: Rasa dari Kebun"
        category="UMKM"
        description="Produk UMKM Desa Karamatwangi lahir dari tanah subur dataran tinggi. Teh hijau, madu hutan, dan olahan sayuran segar diproses oleh tangan-tangan terampil masyarakat lokal — menghadirkan cita rasa autentik yang tidak dapat ditemukan di tempat lain."
        image={HERO}
        imageAlt="Produk UMKM lokal Desa Karamatwangi — teh dan hasil kebun"
        stats={[
          { label: 'UMKM Aktif', value: '45+ Usaha' },
          { label: 'Jenis Produk', value: 'Pertanian & Kerajinan' },
          { label: 'Pasar Utama', value: 'Garut & Bandung' },
        ]}
        cta={{ to: '/potentials?category=umkm', label: 'Lihat UMKM' }}
        align="right"
      />

      {/* Variant 3 — Left, with children slot */}
      <FeatureShowcase
        title="Pertanian Dataran Tinggi yang Produktif"
        category="Pertanian"
        description="Iklim dataran tinggi dengan curah hujan optimal menjadikan Desa Karamatwangi sebagai lumbung pertanian sayuran dan perkebunan teh. Petani lokal membudidayakan tanaman dengan metode tradisional yang menjaga kesuburan tanah."
        image={HERO}
        imageAlt="Sawah berundak dan kebun teh di Desa Karamatwangi"
        stats={[
          { label: 'Luas Pertanian', value: '~320 hektar' },
          { label: 'Komoditas Utama', value: 'Teh & Sayuran' },
        ]}
        cta={{ to: '/potentials?category=pertanian', label: 'Lihat Pertanian' }}
        align="left"
      >
        {/* Children slot — extra content below description */}
        <div className="flex flex-wrap gap-2 pt-1">
          {['Teh Hijau', 'Wortel', 'Kentang', 'Kubis', 'Bawang'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[12px] font-medium text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </FeatureShowcase>

      {/* Bottom breathing room */}
      <div className="h-24 sm:h-32" />
    </div>
  );
}
