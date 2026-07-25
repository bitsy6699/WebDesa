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
        className="border-t border-primary/8 bg-white text-primary"
        aria-label="Footer"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="text-[13px] text-neutral-500">
            &copy; {currentYear} Desa Karamatwangi
          </div>
          <p className="text-[13px] text-neutral-400">Terima kasih telah mengenal Desa Karamatwangi.</p>

          <div className="flex flex-col items-center gap-3 sm:items-end">
            <span className="text-[13px] font-medium text-neutral-500">Supported by</span>
            <div className="flex items-center gap-4 sm:gap-5">
              <Link
                to="/"
                className="inline-flex items-center transition-opacity duration-300 hover:-translate-y-0.5 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Desa Karamatwangi"
              >
                <img
                  src="/assets/images/logo-desa.png"
                  alt="Logo Desa Karamatwangi"
                  width="140"
                  height="34"
                  className="h-[34px] w-auto object-contain"
                />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center transition-opacity duration-300 hover:-translate-y-0.5 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="KKN Tematik"
              >
                <img
                  src="/assets/images/logo-kkn.png"
                  alt="Logo KKN"
                  width="140"
                  height="34"
                  className="h-[34px] w-auto object-contain"
                />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center transition-opacity duration-300 hover:-translate-y-0.5 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Kampus Partner"
              >
                <img
                  src="/assets/images/logo-kampus.png"
                  alt="Logo Kampus"
                  width="140"
                  height="34"
                  className="h-[34px] w-auto object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer
      id="kontak"
      className="bg-white text-primary border-t border-primary/10"
      aria-label="Footer"
    >
      <div className="mx-auto max-w-[1120px] px-6 pt-20 pb-14 sm:px-8 lg:px-10">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Village Identity */}
          <div className="flex flex-col items-start gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-lg transition-opacity duration-200"
              aria-label="Portal Potensi Desa Karamatwangi"
            >
              {!logosError.logoCol ? (
                <img
                  src="/assets/images/logo-desa.png"
                  alt="Logo Desa"
                  width="48"
                  height="48"
                  className="w-12 h-12 object-contain"
                  onError={() => setLogosError(prev => ({ ...prev, logoCol: true }))}
                />
              ) : (
                <Leaf className="w-12 h-12 text-primary" aria-hidden="true" />
              )}
              <div className="flex flex-col text-left">
                <span className="text-[16px] font-bold leading-tight tracking-tight text-primary">
                  Portal Potensi Desa
                </span>
                <span className="text-[15px] text-neutral-500">
                  Karamatwangi
                </span>
              </div>
            </Link>

            <p className="text-[15px] text-neutral-500 leading-relaxed max-w-[320px]">
              Menghubungkan potensi desa dengan masyarakat — secara terbuka, akurat, dan mudah diakses.
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-primary">
              Navigasi
            </h3>
            <nav aria-label="Tautan Footer">
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'Beranda', to: '/' },
                  { label: 'Potensi Desa', to: '/potentials' },
                  { label: 'Kategori', to: '/categories' },
                  { label: 'Statistik', to: '/statistics' },
                  { label: 'Tentang', to: '/about' },
                  { label: 'Kontak', to: '/contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="inline-block text-[15px] text-neutral-500 hover:text-primary transition-all duration-300 hover:translate-x-[2px] active:text-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm"
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
            <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-primary">
              Kontak
            </h3>
            <address className="flex flex-col gap-4 not-italic text-[15px] text-neutral-500">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
                <span className="leading-relaxed">
                  Jl. Raya Karamatwangi No. 1, Kec. Cikajang, Kab. Garut, Jawa Barat 44171
                </span>
              </div>
              <div>
                <a
                  href="tel:+6202321234567"
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm"
                >
                  <Phone className="w-5 h-5 shrink-0 text-primary" aria-hidden="true" />
                  (0232) 123-4567
                </a>
              </div>
              <div>
                <a
                  href="mailto:info@karamatwangi.desa.id"
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-sm"
                >
                  <Mail className="w-5 h-5 shrink-0 text-primary" aria-hidden="true" />
                  info@karamatwangi.desa.id
                </a>
              </div>
            </address>
          </div>

          {/* Column 4: Lokasi */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-primary">
              Lokasi
            </h3>
            <div className="flex flex-col items-start gap-4 text-[15px] text-neutral-500">
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
                className="inline-flex items-center justify-center px-4 py-2 border border-primary/20 text-[14px] font-medium text-primary rounded-full hover:bg-primary/5 transition-colors duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                Buka Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div
          className="mt-14 pt-8 border-t border-primary/8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Bottom Area Left */}
          <div className="text-[15px] text-neutral-500">
            &copy; {currentYear} Desa Karamatwangi
          </div>
          <p className="text-[13px] text-neutral-400">Terima kasih telah mengenal Desa Karamatwangi.</p>

          {/* Bottom Area Right */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <span className="text-[13px] text-neutral-500">Supported by</span>
            <div className="flex items-center gap-6">
              {!logosError.desaPartner ? (
                <img
                  src="/assets/images/logo-desa.png"
                  alt="Desa Karamatwangi"
                  width="160"
                  height="40"
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  onError={() => setLogosError(prev => ({ ...prev, desaPartner: true }))}
                />
              ) : (
                <span className="text-xs text-neutral-500/60 bg-primary/5 px-2.5 py-1 rounded">Desa</span>
              )}

              {!logosError.kkn ? (
                <img
                  src="/assets/images/logo-kkn.png"
                  alt="KKN Tematik"
                  width="160"
                  height="40"
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  onError={() => setLogosError(prev => ({ ...prev, kkn: true }))}
                />
              ) : (
                <span className="text-xs text-neutral-500/60 bg-primary/5 px-2.5 py-1 rounded">KKN</span>
              )}

              {!logosError.kampus ? (
                <img
                  src="/assets/images/logo-kampus.png"
                  alt="Kampus Partner"
                  width="160"
                  height="40"
                  className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  onError={() => setLogosError(prev => ({ ...prev, kampus: true }))}
                />
              ) : (
                <span className="text-xs text-neutral-500/60 bg-primary/5 px-2.5 py-1 rounded">Kampus</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
