import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Leaf,
  Globe, ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { APP_NAME } from '@/constants/app';

const QUICK_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Desa', href: '/#tentang' },
  { label: 'Potensi Desa', href: '/potentials' },
  { label: 'Peta Potensi', href: '/map' },
  { label: 'Berita & Kegiatan', href: '/#berita' },
  { label: 'Statistik Desa', href: '/#statistik' },
];

const SOCIAL_LINKS = [
  { icon: <Globe className="w-4 h-4" />, label: 'Website Desa', href: 'https://karamatwangi.desa.id' },
  { icon: <ExternalLink className="w-4 h-4" />, label: 'Portal Nasional', href: 'https://prodeskel.binapemdes.kemendagri.go.id' },
];

/**
 * Footer — 4-column layout matching DS v2.0 §20 + UI_UX_SPEC.md §11.
 *
 * Column 1: Village identity — logo, description, social media
 * Column 2: Quick Links
 * Column 3: Contact info (address, phone, email)
 * Column 4: Village location (embedded map placeholder / address block)
 *
 * Background: #0B3C35 (DS Primary Green)
 *
 * @see docs/design/DESIGN_SYSTEM.md v2.0 §20 Footer
 * @see docs/design/UI_UX_SPEC.md §11 Footer
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-white"
      style={{ backgroundColor: '#0B3C35' }}
      aria-label="Footer"
    >
      {/* ── Top wave divider ──────────────────────────────────────────── */}
      <div className="w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          className="w-full h-12 fill-[#F8F9FA]"
          focusable="false"
        >
          <path d="M0,32 C240,56 480,0 720,24 C960,48 1200,8 1440,32 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-4 pb-10">

        {/* ── 4-column grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Column 1 — Village identity */}
          <div className="space-y-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label={APP_NAME}
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 border border-white/25">
                <Leaf className="w-5 h-5 text-white" aria-hidden="true" />
              </span>
              <span className="text-xl font-bold text-white">{APP_NAME}</span>
            </Link>

            <p className="text-[15px] text-white/70 leading-relaxed max-w-[220px]">
              Platform digital resmi Desa Karamatwangi untuk mempromosikan potensi lokal, wisata, pertanian, dan kearifan budaya desa.
            </p>

            {/* Social media icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <nav aria-label="Tautan Cepat" className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Tautan Cepat
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="inline-flex items-center gap-1.5 text-[14px] text-white/65 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact */}
          <address className="space-y-4 not-italic">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Kontak
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[14px] text-white/65">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#F59E0B]" aria-hidden="true" />
                <span className="leading-relaxed">
                  Jl. Raya Karamatwangi No. 1<br />
                  Kec. Cikajang, Kab. Garut<br />
                  Jawa Barat 44171
                </span>
              </li>
              <li>
                <a
                  href="tel:+6202321234567"
                  className="flex items-center gap-3 text-[14px] text-white/65 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                  (0232) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@karamatwangi.desa.id"
                  className="flex items-center gap-3 text-[14px] text-white/65 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                  info@karamatwangi.desa.id
                </a>
              </li>
            </ul>
          </address>

          {/* Column 4 — Village Location */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">
              Lokasi Desa
            </h3>
            {/* Embedded location card */}
            <div className="rounded-[20px] overflow-hidden border border-white/15 bg-white/5">
              {/* Map placeholder — static illustration */}
              <div
                className="h-28 flex items-center justify-center relative"
                style={{ background: 'linear-gradient(135deg, #0f5339 0%, #1a7a55 100%)' }}
                aria-label="Ilustrasi peta lokasi desa"
              >
                <div className="absolute inset-0 opacity-20" aria-hidden="true">
                  {/* Grid overlay for map aesthetic */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-x-0 border-t border-white/30"
                      style={{ top: `${(i + 1) * 20}%` }}
                    />
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-y-0 border-l border-white/30"
                      style={{ left: `${(i + 1) * 20}%` }}
                    />
                  ))}
                </div>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-lg">
                    <MapPin className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-medium text-white/90">Desa Karamatwangi, Garut</span>
                </div>
              </div>
              {/* Address summary */}
              <div className="px-4 py-3">
                <p className="text-[13px] text-white/65 leading-relaxed">
                  Kec. Cikajang, Kab. Garut<br />
                  Jawa Barat — Indonesia
                </p>
                <a
                  href="https://maps.app.goo.gl/KbRwkAn84srD3k9KA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-[13px] text-[#F59E0B] hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                >
                  Buka di Google Maps
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Divider ─────────────────────────────────────────────────── */}
        <div className="border-t border-white/10" />

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/45">
          <p>&copy; {currentYear} {APP_NAME}. Hak Cipta Dilindungi.</p>
          <p>Dikelola oleh Pemerintah Desa Karamatwangi</p>
        </div>

      </div>
    </footer>
  );
}
