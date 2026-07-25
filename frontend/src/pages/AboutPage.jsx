import { MapPin, Mountain, Briefcase, Ruler } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import SEO from '@/components/SEO';
import { breadcrumbSchema } from '@/lib/structuredData';
import { LazyImage } from '@/components/molecules/LazyImage';
import { PageHero } from '@/components/molecules/PageHero';
import { PageCTA } from '@/components/molecules/PageCTA';
import { PageSection } from '@/components/molecules/PageSection';
import { StoryDivider } from '@/components/organisms/StoryDivider';
import { FeatureShowcase } from '@/components/organisms/FeatureShowcase';

const FADE = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const QUICK_FACTS = [
  { icon: MapPin, value: 'Cikajang', label: 'Kecamatan' },
  { icon: Mountain, value: '700+ m', label: 'Ketinggian' },
  { icon: Briefcase, value: 'Pertanian', label: 'Mata Pencaharian' },
  { icon: Ruler, value: 'Desa', label: 'Luas Wilayah' },
];

const STRUKTUR = [
  { jabatan: 'Kepala Desa', nama: 'Desa Karamatwangi' },
  { jabatan: 'Sekretaris Desa', nama: 'Sekretariat Desa' },
  { jabatan: 'Kaur Umum', nama: 'Bagian Umum' },
  { jabatan: 'Kaur Keuangan', nama: 'Bagian Keuangan' },
  { jabatan: 'Kaur Tata Usaha', nama: 'Bagian TU' },
];

const VISI = 'Mewujudkan Desa Karamatwangi yang mandiri, sejahtera, dan berkelanjutan berbasis potensi lokal dan partisipasi masyarakat.';

const MISI = [
  'Menggali dan mengembangkan potensi desa di bidang pertanian, UMKM, dan wisata.',
  'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan.',
  'Memperkuat infrastruktur desa untuk mendukung kegiatan produktif masyarakat.',
  'Membuka akses informasi dan pasar bagi produk unggulan desa.',
  'Melestarikan budaya dan kearifan lokal Desa Karamatwangi.',
];

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <SEO
        title="Mengenal Karamatwangi"
        description="Profil Desa Karamatwangi, Kecamatan Cikajang, Kabupaten Garut — sejarah, visi misi, dan potensi desa."
        path="/about"
        image="/hero/hero-karamatwangi.jpg"
        schema={[
          breadcrumbSchema([
            { label: 'Beranda', to: '/' },
            { label: 'Tentang' },
          ]),
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════════════ */}
      <PageHero
        title="Mengenal Karamatwangi"
        description="Di kaki pegunungan Garut, sebuah desa tumbuh dari kebun teh, sawah, dan semangat komunitasnya."
        variant="slim"
        breadcrumb={[
          { label: 'Beranda', to: '/' },
          { label: 'Tentang' },
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          2. EDITORIAL QUOTE
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(223,246,242,0.2) 50%, transparent 100%)',
        }}
      >
        <div className="mx-auto max-w-[680px] px-5 sm:px-6 py-16 sm:py-20 text-center">
          <motion.div
            variants={FADE}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div
              className="mx-auto h-px w-16 mb-8"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(24,77,71,0.2), transparent)' }}
            />
            <blockquote>
              <p
                className="text-[20px] sm:text-[24px] lg:text-[28px] font-normal italic leading-[1.65] tracking-[-0.01em] text-primary-dark"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;Di kaki pegunungan Garut, Desa Karamatwangi tumbuh sebagai desa yang menjaga
                keseimbangan antara alam, pertanian, dan kehidupan masyarakat.&rdquo;
              </p>
            </blockquote>
            <div
              className="mx-auto h-px w-10 mt-8"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(24,77,71,0.15), transparent)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. VILLAGE STORY
      ═══════════════════════════════════════════════════════════════ */}
      <FeatureShowcase
        category="Cerita Desa"
        title="Desa yang Hidup dari Alam"
        description="Desa Karamatwangi adalah sebuah desa yang terletak di Kecamatan Cikajang, Kabupaten Garut, Provinsi Jawa Barat. Desa ini dikenal dengan keindahan alamnya yang asri, hamparan sawah yang luas, serta keramahan masyarakatnya."
        image="/hero/hero-karamatwangi.jpg"
        imageAlt="Hamparan sawah dan perbukitan Desa Karamatwangi"
        stats={[
          { label: 'Ketinggian', value: '700+ meter' },
          { label: 'Penduduk', value: 'Aktif & Produktif' },
          { label: 'Mata Pencaharian', value: 'Pertanian & Peternakan' },
        ]}
        align="left"
        className="py-16 sm:py-20 lg:py-24"
      >
        <p className="text-[15px] leading-[1.8] text-neutral-500 sm:text-[16px]">
          Dengan potensi alam yang melimpah di bidang pertanian, perkebunan, dan peternakan,
          Desa Karamatwangi memiliki peluang besar untuk berkembang menjadi desa yang mandiri
          dan sejahtera.
        </p>
      </FeatureShowcase>

      <StoryDivider
        title="Setiap sudut desa menyimpan cerita yang menunggu untuk didengar."
        subtitle="Desa Karamatwangi"
        variant="sage"
      />

      {/* ═══════════════════════════════════════════════════════════════
          4. FEATURED IMAGE
      ═══════════════════════════════════════════════════════════════ */}
      <PageSection background="surface">
        <motion.div
          className="mx-auto max-w-[960px] relative overflow-hidden rounded-[28px]"
          style={{ aspectRatio: '4 / 3' }}
          variants={FADE}
          initial="hidden"
          whileInView={prefersReducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
        >
          <LazyImage
            src="/hero/hero-karamatwangi2.jpg"
            alt="Pemandangan Desa Karamatwangi dari kejauhan"
            width="960"
            height="720"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 55%, rgba(15,61,52,0.1) 100%)',
            }}
          />
        </motion.div>
      </PageSection>

      {/* ═══════════════════════════════════════════════════════════════
          5. QUICK FACTS
      ═══════════════════════════════════════════════════════════════ */}
      <PageSection>
        <div className="mx-auto max-w-[960px]">
          <motion.div
            className="grid grid-cols-2 gap-4 lg:gap-5"
            variants={FADE}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {QUICK_FACTS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-[24px] border border-primary/8 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-primary/12 hover:shadow-[0_4px_12px_rgba(15,61,52,0.04),0_8px_24px_rgba(15,61,52,0.06)]"
              >
                <Icon className="w-5 h-5 text-primary mb-3" aria-hidden="true" />
                <p className="text-[20px] sm:text-[24px] font-bold text-primary-dark tracking-[-0.01em]">
                  {value}
                </p>
                <p className="mt-1 text-[12px] sm:text-[13px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </PageSection>

      {/* ═══════════════════════════════════════════════════════════════
          6. VILLAGE GOVERNMENT
      ═══════════════════════════════════════════════════════════════ */}
      <PageSection>
        <div className="mx-auto max-w-[720px]">
          <motion.div variants={FADE} initial="hidden" whileInView={prefersReducedMotion ? undefined : 'visible'} viewport={{ once: true, amount: 0.2 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Pemerintahan
            </span>
            <h2 className="mt-3 font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.015em] text-primary-dark sm:text-[1.75rem]">
              Struktur Pemerintahan Desa
            </h2>
          </motion.div>

          <motion.div
            className="mt-8 rounded-[24px] border border-primary/8 bg-white p-6 sm:p-8 shadow-sm"
            variants={FADE}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...FADE.visible.transition, delay: 0.1 }}
          >
            <div className="space-y-0">
              {STRUKTUR.map(({ jabatan, nama }, i) => (
                <div
                  key={jabatan}
                  className="flex items-center justify-between py-3.5 border-b border-neutral-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/8 text-primary text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-[14px] sm:text-[15px] font-medium text-primary-dark">
                      {jabatan}
                    </span>
                  </div>
                  <span className="text-[13px] sm:text-[14px] text-neutral-500">
                    {nama}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageSection>

      {/* ═══════════════════════════════════════════════════════════════
          7. VISION & MISSION
      ═══════════════════════════════════════════════════════════════ */}
      <StoryDivider
        title="Dari tanah ini, lahir semangat yang membawa desa ke depan."
        subtitle="Visi & Misi"
        variant="sage"
      />
      <PageSection background="surface">
        <div className="mx-auto max-w-[720px]">
          <motion.div variants={FADE} initial="hidden" whileInView={prefersReducedMotion ? undefined : 'visible'} viewport={{ once: true, amount: 0.2 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Arah Kebijakan
            </span>
            <h2 className="mt-3 font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.015em] text-primary-dark sm:text-[1.75rem]">
              Visi & Misi
            </h2>
          </motion.div>

          {/* ── Vision ───────────────────────────────────────── */}
          <motion.div
            className="mt-8 rounded-[24px] border-l-[3px] border-primary bg-white p-6 sm:p-8 shadow-sm"
            variants={FADE}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...FADE.visible.transition, delay: 0.1 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/60">
              Visi
            </span>
            <p
              className="mt-3 text-[17px] sm:text-[19px] font-normal italic leading-[1.7] text-primary-dark"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              &ldquo;{VISI}&rdquo;
            </p>
          </motion.div>

          {/* ── Mission ──────────────────────────────────────── */}
          <motion.div
            className="mt-6"
            variants={FADE}
            initial="hidden"
            whileInView={prefersReducedMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ ...FADE.visible.transition, delay: 0.15 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/60">
              Misi
            </span>

            <div className="mt-5 space-y-3">
              {MISI.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-[20px] bg-white p-4 sm:p-5 shadow-sm border border-primary/5"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/8 text-primary text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-[14px] sm:text-[15px] leading-[1.75] text-neutral-600 pt-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </PageSection>

      {/* ═══════════════════════════════════════════════════════════════
          8. CTA
      ═══════════════════════════════════════════════════════════════ */}
      <PageCTA
        title="Sudah Kenal Karamatwangi?"
        description="Sekarang saatnya menjelajahi potensi nyata — dari kebun teh hingga UMKM lokal yang menggerakkan perekonomian desa."
        ctaTo="/potentials"
        ctaLabel="Jelajahi Potensi"
        ctaTo2="/map"
        ctaLabel2="Lihat di Peta"
        variant="light"
      />
    </>
  );
}
