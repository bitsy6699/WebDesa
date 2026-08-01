import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { HERO_2 } from '@/lib/imageCompositions';
import { usePublicContact } from '@/hooks/usePublicSettings';

const OFFICE_HOURS = [
  { day: 'Senin – Jumat', time: '08:00 – 16:00 WIB' },
  { day: 'Sabtu', time: '08:00 – 12:00 WIB' },
  { day: 'Minggu & Libur', time: 'Tutup' },
];

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const contact = usePublicContact();

  const contactMethods = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat Langsung',
      href: contact.whatsappUrl,
      color: '#22C55E',
    },
    {
      icon: Phone,
      label: 'Telepon',
      value: contact.phone ?? '—',
      href: contact.phoneHref,
      color: '#3B82F6',
    },
    {
      icon: Mail,
      label: 'Email',
      value: contact.email ?? '—',
      href: contact.emailHref,
      color: '#F59E0B',
    },
  ].filter((m) => m.href);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'var(--bg-surface-alt)',
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(72px, 8vw, 104px)',
      }}
    >
      <div
        className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full pointer-events-none opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${HERO_2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(30px)',
        }}
      />

      <div className="relative mx-auto max-w-[1120px] px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Bab 06 — Terhubung
          </p>
          <h2 className="mt-3 font-heading text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[2.5rem] lg:text-[2.75rem]">
            Ada yang Ingin Anda Tanyakan?
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)] max-w-[480px] mx-auto">
            Kami di sini untuk mendengar. Baik tentang potensi desa, layanan administrasi, atau sekadar ingin tahu lebih banyak.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex flex-col items-center gap-4 rounded-[20px] border border-[#E8EFEC] bg-white/80 backdrop-blur-sm p-7 text-center shadow-[0_1px_3px_rgba(15,61,52,0.03),0_4px_12px_rgba(15,61,52,0.06)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(15,61,52,0.06),0_16px_40px_rgba(15,61,52,0.10)] hover:border-[#D1D9D6] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 70, damping: 14 }}
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-2xl text-white transition-transform duration-300 group-hover:scale-110"
                  style={{ background: method.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[var(--text-primary)]">{method.label}</p>
                  <p className="text-[13px] text-[var(--text-muted)] mt-1">{method.value}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          className="mt-10 mx-auto max-w-[400px] rounded-[20px] border border-[#E8EFEC] bg-white/80 backdrop-blur-sm p-6 shadow-[0_1px_3px_rgba(15,61,52,0.03),0_4px_12px_rgba(15,61,52,0.06)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 70, damping: 14 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-primary" />
            <h3 className="text-[13px] font-semibold text-[var(--text-primary)]">Jam Kerja</h3>
          </div>
          <div className="flex flex-col gap-1.5">
            {OFFICE_HOURS.map((item) => (
              <div key={item.day} className="flex justify-between text-[13px]">
                <span className="text-[var(--text-body)]">{item.day}</span>
                <span className="font-medium text-[var(--text-primary)]">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:bg-primary-dark hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Hubungi Kami
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
