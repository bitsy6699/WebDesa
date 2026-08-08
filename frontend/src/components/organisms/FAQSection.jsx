import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

const DEFAULT_FAQS = [
  {
    question: 'Apa itu Portal Potensi Desa Karamatwangi?',
    answer: 'Portal ini adalah platform digital yang menampilkan potensi Desa Karamatwangi — mulai dari sektor pertanian, UMKM, wisata, hingga budaya. Tujuannya agar masyarakat luas dapat mengenal dan menjelajahi potensi desa.',
  },
  {
    question: 'Bagaimana cara menghubungi pemerintah desa?',
    answer: 'Anda dapat menghubungi kami melalui WhatsApp, telepon di (0232) 123-4567, atau email ke info@karamatwangi.desa.id. Jam kerja kantor desa adalah Senin–Jumat, 08:00–16:00 WIB.',
  },
  {
    question: 'Apakah data potensi desa selalu diperbarui?',
    answer: 'Ya, data dikelola dan diperbarui oleh pemerintah desa secara berkala. Setiap potensi yang tercatat adalah data resmi yang dipublikasikan oleh pengelola portal.',
  },
  {
    question: 'Di mana lokasi Desa Karamatwangi?',
    answer: 'Desa Karamatwangi terletak di Kecamatan Cikajang, Kabupaten Garut, Provinsi Jawa Barat. Desa ini berada di dataran tinggi dengan pemandangan kebun teh dan sawah berundak.',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div
      className={[
        'border-b border-[#E0E8E4] last:border-b-0 px-4 sm:px-6 transition-colors duration-200',
        isOpen ? 'bg-[var(--bg-surface-muted)]' : 'hover:bg-[var(--bg-surface-muted)]/50',
      ].join(' ')}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-200 sm:py-5"
        aria-expanded={isOpen}
      >
        <span className="relative pl-5">
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{ backgroundColor: isOpen ? '#184D47' : '#D6D3D1' }}
          />
          <span className="text-[15px] font-semibold leading-snug text-[var(--text-primary)]">
            {faq.question}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.8 }}
            className="overflow-hidden"
          >
            <div className="relative pl-5 pb-5 sm:pb-6">
              <div
                className="absolute left-0 top-0 bottom-5 w-px bg-primary/20"
                aria-hidden="true"
              />
              <p className="text-[14px] leading-[1.8] text-[var(--text-body)]">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ faqs = DEFAULT_FAQS, showAllLink = true }) {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-page)',
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(72px, 8vw, 104px)',
      }}
    >

      <div className="relative mx-auto max-w-[720px] px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Pertanyaan Umum
          </p>
          <h2 className="mt-3 font-heading text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem] lg:text-[2.75rem]">
            Yang Sering Ditanyakan
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)] max-w-[480px] mx-auto">
            Jawaban singkat atas pertanyaan yang paling sering diajukan warga dan pengunjung.
          </p>
        </div>

        <div className="overflow-hidden rounded-[20px] bg-white border border-[#E8EFEC] shadow-[0_1px_3px_rgba(15,61,52,0.03),0_4px_12px_rgba(15,61,52,0.06)]">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {showAllLink && (
          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:text-primary-dark transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg px-2 py-1"
            >
              Lihat Semua Pertanyaan
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
