import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import SEO from '@/components/SEO';
import { faqSchema, breadcrumbSchema } from '@/lib/structuredData';
import { PageHero } from '@/components/molecules/PageHero';
import { PageSection } from '@/components/molecules/PageSection';
import { PageCTA } from '@/components/molecules/PageCTA';
import { FAQSection } from '@/components/organisms/FAQSection';
import { usePublicContact } from '@/hooks/usePublicSettings';

const FAQ_ITEMS = [
  {
    question: 'Bagaimana cara mengurus surat pengantar?',
    answer: 'Silakan kunjungi kantor desa dengan membawa KTP dan KK. Tim kami akan membantu proses pembuatan surat pengantar untuk keperluan administrasi Anda.',
  },
  {
    question: 'Apakah kantor desa buka pada hari Sabtu?',
    answer: 'Kantor desa melayani warga pada hari Senin hingga Jumat, pukul 08:00–16:00 WIB, dan Sabtu pukul 08:00–12:00 WIB. Hari Minggu kantor tutup.',
  },
  {
    question: 'Bagaimana cara menghubungi perangkat desa?',
    answer: 'Anda dapat menghubungi kami melalui telepon, email, atau datang langsung ke kantor desa. Untuk respons cepat, silakan hubungi via WhatsApp.',
  },
  {
    question: 'Di mana lokasi kantor desa?',
    answer: 'Kantor Desa Karamatwangi terletak di Jl. Raya Karamatwangi No. 1, Kec. Cikajang, Kabupaten Garut, Jawa Barat 44171.',
  },
];

function ContactMethodCard({ icon: Icon, title, value, helper, href, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.4, delay }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full rounded-[24px] border border-primary/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      >
        <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-[12px] bg-primary/8 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold text-primary mb-1">{title}</p>
        <p className="text-[15px] text-neutral-600 font-medium mb-1">{value}</p>
        <p className="text-xs text-neutral-400">{helper}</p>
      </a>
    </motion.div>
  );
}

export default function ContactPage() {
  const contact = usePublicContact();

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: 'Chat Langsung',
      helper: 'Respons paling cepat',
      href: contact.whatsappUrl,
    },
    {
      icon: Phone,
      title: 'Telepon',
      value: contact.phone ?? '—',
      helper: 'Senin – Sabtu, 08:00–16:00 WIB',
      href: contact.phoneHref,
    },
    {
      icon: Mail,
      title: 'Email',
      value: contact.email ?? '—',
      helper: 'Balasan dalam 1×24 jam',
      href: contact.emailHref,
    },
    {
      icon: MapPin,
      title: 'Alamat',
      value: contact.address ?? 'Kantor Desa',
      helper: 'Kec. Cikajang, Kab. Garut',
      href: 'https://maps.app.goo.gl/KbRwkAn84srD3k9KA',
    },
  ].filter((m) => m.href);

  return (
    <>
      <SEO
        title="Mari Berbicara"
        description="Hubungi Pemerintah Desa Karamatwangi — alamat, telepon, email, dan jam kerja."
        path="/contact"
        image="/hero/hero-karamatwangi.jpg"
        schema={[
          faqSchema(FAQ_ITEMS),
          breadcrumbSchema([
            { label: 'Beranda', to: '/' },
            { label: 'Kontak' },
          ]),
        ]}
      />

      {/* ── 1. Hero ─────────────────────────────────────── */}
      <PageHero
        title="Mari Berbicara"
        description="Setiap pertanyaan adalah awal dari hubungan yang baik. Kami di sini untuk mendengar Anda."
        variant="slim"
        breadcrumb={[
          { label: 'Beranda', to: '/' },
          { label: 'Kontak' },
        ]}
      />

      {/* ── 2. Welcome Message ──────────────────────────── */}
      <PageSection>
        <div className="text-center max-w-[560px] mx-auto mb-0">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[17px] text-neutral-500 leading-relaxed"
          >
            Kami percaya setiap warga berhak mendapat layanan yang mudah diakses.
            Hubungi kami melalui saluran di bawah ini, dan tim kami akan
            membantu Anda sebaik mungkin.
          </motion.p>
        </div>
      </PageSection>

      {/* ── 3. Contact Methods ──────────────────────────── */}
      <PageSection>
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
            Saluran Komunikasi
          </p>
          <h2 className="font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-primary-dark sm:text-[1.75rem]">
            Hubungi Kami
          </h2>
          <p className="mt-3 text-[15px] leading-[1.75] text-neutral-500 max-w-[560px] mx-auto">
            Pilih saluran yang paling nyaman bagi Anda.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {contactMethods.map((method, i) => (
            <ContactMethodCard
              key={method.title}
              icon={method.icon}
              title={method.title}
              value={method.value}
              helper={method.helper}
              href={method.href}
              delay={i * 0.05}
            />
          ))}
        </div>
      </PageSection>

      {/* ── 4. Office Hours ─────────────────────────────── */}
      <PageSection>
        <div className="max-w-[560px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Waktu Layanan
            </p>
            <h2 className="font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-primary-dark sm:text-[1.75rem]">
              Jam Kerja
            </h2>
            <p className="mt-3 text-[15px] leading-[1.75] text-neutral-500 max-w-[560px] mx-auto">
              Waktu layanan kantor desa untuk warga yang membutuhkan bantuan.
            </p>
          </motion.div>

          <div className="rounded-[24px] border border-primary/10 bg-white shadow-sm overflow-hidden">
            {[
              { day: 'Senin – Jumat', time: '08:00 – 16:00 WIB', open: true },
              { day: 'Sabtu', time: '08:00 – 12:00 WIB', open: true },
              { day: 'Minggu', time: 'Tutup', open: false },
            ].map(({ day, time, open }, i) => (
              <div
                key={day}
                className={`flex items-center justify-between px-6 py-4 ${
                  i < 2 ? 'border-b border-primary/5' : ''
                }`}
              >
                <span className="text-[15px] text-neutral-600 font-medium">
                  {day}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    open ? 'text-primary' : 'text-neutral-300'
                  }`}
                >
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* ── 5. Location ─────────────────────────────────── */}
      <PageSection>
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
            Alamat Kantor
          </p>
          <h2 className="font-heading text-[1.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-primary-dark sm:text-[1.75rem]">
            Lokasi Desa Karamatwangi
          </h2>
          <p className="mt-3 text-[15px] leading-[1.75] text-neutral-500 max-w-[560px] mx-auto">
            Kunjungi langsung kantor desa kami untuk bertemu dengan tim.
          </p>
        </div>
<div className="max-w-[560px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[24px] border border-primary/10 bg-white p-8 shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-[12px] bg-primary/8 text-primary mb-5">
              <MapPin className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="font-heading text-lg font-bold text-primary mb-2">
              Kantor Desa Karamatwangi
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-6">
              Jl. Raya Karamatwangi No. 1, Kec. Cikajang, Kabupaten Garut,
              Jawa Barat 44171
            </p>
            <div className="mt-auto">
              <a
                href="https://maps.app.goo.gl/KbRwkAn84srD3k9KA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/8 text-primary text-sm font-semibold transition-colors hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Buka di Maps
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </PageSection>

      {/* ── 6. FAQ ──────────────────────────────────────── */}
      <FAQSection faqs={FAQ_ITEMS} />

      {/* ── 7. Final CTA ────────────────────────────────── */}
      <PageCTA
        title="Ada yang Ingin Anda Tanyakan?"
        description="Baik itu tentang potensi desa, layanan administrasi, atau sekadar ingin tahu lebih banyak — kami siap menjawab."
        ctaTo="/potentials"
        ctaLabel="Jelajahi Potensi"
        ctaTo2="/"
        ctaLabel2="Kembali ke Beranda"
        variant="light"
      />
    </>
  );
}
