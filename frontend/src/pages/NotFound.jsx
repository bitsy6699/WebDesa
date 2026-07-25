import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import SEO from '@/components/SEO';

const FADE = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

/**
 * NotFound — 404 fallback page.
 * Displayed when no route matches the current URL.
 * Uses editorial styling consistent with the rest of the site.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[--bg-page] p-8 text-center">
      <SEO title="Halaman Tidak Ditemukan" robots="noindex,nofollow" />
      <motion.div
        variants={FADE}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/8 text-primary">
          <Leaf className="w-8 h-8" aria-hidden="true" />
        </div>

        <div>
          <p className="text-6xl font-extrabold text-primary tracking-tight">404</p>
        </div>

        <h1 className="font-heading text-2xl font-bold tracking-[-0.02em] text-primary-dark">
          Halaman Ini Tidak Ditemukan
        </h1>

        <p className="max-w-md text-[15px] text-neutral-500 leading-relaxed">
          Sepertinya halaman ini sudah berpindah tempat atau belum tersedia.
          Mari kita kembali menjelajah potensi Desa Karamatwangi.
        </p>
      </motion.div>

      <motion.div
        variants={FADE}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <Link
          to="/"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(15,61,52,0.08),0_8px_24px_rgba(15,61,52,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Kembali ke Beranda
        </Link>
        <Link
          to="/potentials"
          className="rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary/5 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Jelajahi Potensi
        </Link>
      </motion.div>
    </div>
  );
}
