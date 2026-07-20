import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Leaf } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [logosError, setLogosError] = useState({
    logoCol: false,
    desaPartner: false,
    kkn: false,
    kampus: false,
  });

  if (!isLandingPage) {
    return (
      <footer
        id="kontak"
        className="border-t border-[#184D47]/8 bg-white text-[#184D47]"
        aria-label="Footer"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="text-[13px] text-[#5F6B68]">
            &copy; {currentYear} Desa Karamatwangi
          </div>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <span className="text-[13px] font-medium text-[#5F6B68]">Supported by</span>
            <div className="flex items-center gap-4 sm:gap-5">
              <a
                href="/"
                className="inline-flex items-center transition duration-200 hover:-translate-y-0.5 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47]/50"
                aria-label="Desa Karamatwangi"
              >
                <img
                  src="/assets/images/logo-desa.png"
                  alt="Logo Desa Karamatwangi"
                  className="h-[34px] w-auto object-contain"
                />
              </a>
              <a
                href="/"
                className="inline-flex items-center transition duration-200 hover:-translate-y-0.5 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47]/50"
                aria-label="KKN Tematik"
              >
                <img
                  src="/assets/images/logo-kkn.png"
                  alt="Logo KKN"
                  className="h-[34px] w-auto object-contain"
                />
              </a>
              <a
                href="/"
                className="inline-flex items-center transition duration-200 hover:-translate-y-0.5 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47]/50"
                aria-label="Kampus Partner"
              >
                <img
                  src="/assets/images/logo-kampus.png"
                  alt="Logo Kampus"
                  className="h-[34px] w-auto object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      id="kontak"
      className="bg-white text-[#184D47]"
      style={{
        borderTop: '1px solid rgba(24, 77, 71, 0.10)',
      }}
      aria-label="Footer"
    >
      <div className="mx-auto max-w-[1120px] px-6 pt-16 pb-12 sm:px-8 lg:px-10">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Village Identity */}
          <div className="flex flex-col items-start gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47]/60 rounded-lg transition-opacity duration-200"
              aria-label="Portal Potensi Desa Karamatwangi"
            >
              {!logosError.logoCol ? (
                <img
                  src="/assets/images/logo-desa.png"
                  alt="Logo Desa"
                  className="w-12 h-12 object-contain"
                  onError={() => setLogosError(prev => ({ ...prev, logoCol: true }))}
                />
              ) : (
                <Leaf className="w-12 h-12 text-[#184D47]" aria-hidden="true" />
              )}
              <div className="flex flex-col text-left">
                <span className="text-[16px] font-bold leading-tight tracking-tight text-[#184D47]">
                  Portal Potensi Desa
                </span>
                <span className="text-[15px] text-[#5F6B68]">
                  Karamatwangi
                </span>
              </div>
            </Link>

            <p className="text-[15px] text-[#5F6B68] leading-relaxed max-w-[320px]">
              Menyediakan informasi potensi Desa Karamatwangi secara terbuka, akurat, dan mudah diakses masyarakat.
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold text-[#184D47]">
              Navigasi
            </h3>
            <nav aria-label="Tautan Footer">
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'Beranda', to: '/' },
                  { label: 'Potensi Desa', to: '/potentials' },
                  { label: 'Kategori', to: '/categories' },
                  { label: 'Statistik', to: '/statistics' },
                  { label: 'Kontak', to: '/#kontak' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="inline-block text-[15px] text-[#5F6B68] hover:text-[#184D47] transition-all duration-200 hover:translate-x-[3px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47]/60 rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Kontak */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold text-[#184D47]">
              Kontak
            </h3>
            <address className="flex flex-col gap-4 not-italic text-[15px] text-[#5F6B68]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[#184D47]" aria-hidden="true" />
                <span className="leading-relaxed">
                  Jl. Raya Karamatwangi No. 1, Kec. Cikajang, Kab. Garut, Jawa Barat 44171
                </span>
              </div>
              <div>
                <a
                  href="tel:+6202321234567"
                  className="flex items-center gap-3 hover:text-[#184D47] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47]/60 rounded-sm"
                >
                  <Phone className="w-5 h-5 shrink-0 text-[#184D47]" aria-hidden="true" />
                  (0232) 123-4567
                </a>
              </div>
              <div>
                <a
                  href="mailto:info@karamatwangi.desa.id"
                  className="flex items-center gap-3 hover:text-[#184D47] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47]/60 rounded-sm"
                >
                  <Mail className="w-5 h-5 shrink-0 text-[#184D47]" aria-hidden="true" />
                  info@karamatwangi.desa.id
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: Lokasi */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[18px] font-bold text-[#184D47]">
              Lokasi
            </h3>
            <div className="flex flex-col items-start gap-4 text-[15px] text-[#5F6B68]">
              <div className="flex flex-col gap-0.5 leading-relaxed">
                <span>Desa Karamatwangi</span>
                <span>Kecamatan Cikajang</span>
                <span>Kabupaten Garut</span>
                <span>Provinsi Jawa Barat</span>
              </div>
              <a
                href="https://maps.app.goo.gl/KbRwkAn84srD3k9KA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-[#184D47]/20 text-[14px] font-medium text-[#184D47] rounded-full hover:bg-[#184D47]/5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#184D47]/60"
              >
                Buka Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            borderTop: '1px solid rgba(24, 77, 71, 0.10)',
          }}
        >
          {/* Bottom Area Left */}
          <div className="text-[15px] text-[#5F6B68]">
            &copy; {currentYear} Desa Karamatwangi
          </div>

          {/* Bottom Area Right */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <span className="text-[13px] text-[#5F6B68]">Supported by</span>
            <div className="flex items-center gap-6">
              {!logosError.desaPartner ? (
                <img
                  src="/assets/images/logo-desa.png"
                  alt="Desa Karamatwangi"
                  className="h-10 object-contain opacity-75 hover:opacity-100 transition-opacity duration-200"
                  onError={() => setLogosError(prev => ({ ...prev, desaPartner: true }))}
                />
              ) : (
                <span className="text-xs text-[#5F6B68]/60 bg-[#184D47]/5 px-2.5 py-1 rounded">Desa</span>
              )}

              {!logosError.kkn ? (
                <img
                  src="/assets/images/logo-kkn.png"
                  alt="KKN Tematik"
                  className="h-10 object-contain opacity-75 hover:opacity-100 transition-opacity duration-200"
                  onError={() => setLogosError(prev => ({ ...prev, kkn: true }))}
                />
              ) : (
                <span className="text-xs text-[#5F6B68]/60 bg-[#184D47]/5 px-2.5 py-1 rounded">KKN</span>
              )}

              {!logosError.kampus ? (
                <img
                  src="/assets/images/logo-kampus.png"
                  alt="Kampus Partner"
                  className="h-10 object-contain opacity-75 hover:opacity-100 transition-opacity duration-200"
                  onError={() => setLogosError(prev => ({ ...prev, kampus: true }))}
                />
              ) : (
                <span className="text-xs text-[#5F6B68]/60 bg-[#184D47]/5 px-2.5 py-1 rounded">Kampus</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
