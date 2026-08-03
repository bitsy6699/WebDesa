import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
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

function ContactMethodCard({ icon: Icon, title, value, helper, color, href, delay }) {
  const content = (
    <>
      <div
        className="flex items-center justify-center w-14 h-14 rounded-2xl text-white transition-transform duration-300 group-hover:scale-110"
        style={{ background: color }}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-[14px] font-semibold text-[var(--text-primary)]">{title}</p>
        <p className="text-[13px] text-[var(--text-muted)] mt-1">{value}</p>
        <p className="text-[12px] text-[var(--text-muted)]/70 mt-1">{helper}</p>
      </div>
    </>
  );

  const className =
    'group flex h-full flex-col items-center justify-center gap-4 rounded-[20px] border border-[#E8EFEC] bg-white/80 backdrop-blur-sm p-7 text-center shadow-[0_1px_3px_rgba(15,61,52,0.03),0_4px_12px_rgba(15,61,52,0.06)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(15,61,52,0.06),0_16px_40px_rgba(15,61,52,0.10)] hover:border-[#D1D9D6] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.4, delay }}
    >
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={className}
        >
          {content}
        </a>
      ) : (
        <div className={className}>{content}</div>
      )}
    </motion.div>
  );
}

export default function ContactPage() {
  const contact = usePublicContact();

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: contact.whatsappNumber || 'Chat Langsung',
      helper: 'Respons paling cepat',
      color: '#22C55E',
      href: contact.whatsappUrl,
    },
    {
      icon: Phone,
      title: 'Telepon',
      value: contact.phone ?? '—',
      helper: 'Senin–Jumat 08:00–16:00, Sabtu 08:00–12:00 WIB',
      color: '#3B82F6',
      href: contact.phoneHref,
    },
    {
      icon: Mail,
      title: 'Email',
      value: contact.email ?? '—',
      helper: 'Balasan dalam 1×24 jam',
      color: '#F59E0B',
      href: contact.emailHref,
    },
  ];

  return (
    <>
      <SEO
        title="Mari Berbicara"
        description="Hubungi Pemerintah Desa Karamatwangi — telepon, email, WhatsApp, dan jam kerja."
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

      {/* ── 3. Contact Methods ──────────────────────────── */}
      <PageSection>
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Saluran Komunikasi
          </p>
          <h2 className="mt-3 font-heading text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem] lg:text-[2.75rem]">
            Hubungi Kami
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)] max-w-[480px] mx-auto">
            Kami percaya setiap warga berhak mendapat layanan yang mudah diakses.
            Pilih saluran yang paling nyaman bagi Anda, dan tim kami akan membantu.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactMethods.map((method, i) => (
            <ContactMethodCard
              key={method.title}
              icon={method.icon}
              title={method.title}
              value={method.value}
              helper={method.helper}
              color={method.color}
              href={method.href}
              delay={i * 0.05}
            />
          ))}
        </div>
      </PageSection>

      {/* ── 4. Office Hours ─────────────────────────────── */}
      <PageSection>
        <div className="max-w-[560px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
              Waktu Layanan
            </p>
            <h2 className="mt-3 font-heading text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem] lg:text-[2.75rem]">
              Jam Kerja
            </h2>
            <p className="mt-3 text-[15px] text-[var(--text-muted)] max-w-[480px] mx-auto">
              Waktu layanan kantor desa untuk warga yang membutuhkan bantuan.
            </p>
          </div>

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

      {/* ── 6. FAQ ──────────────────────────────────────── */}
      <FAQSection faqs={FAQ_ITEMS} showAllLink={false} />

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
