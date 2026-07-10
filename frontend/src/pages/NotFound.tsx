import { Link } from 'react-router-dom';

/**
 * NotFound — 404 fallback page.
 * Displayed when no route matches the current URL.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[--bg-page] p-8 text-center">
      <p className="text-6xl font-extrabold text-[--color-primary]">404</p>
      <h1 className="text-2xl font-bold text-[--neutral-900]">
        Halaman Tidak Ditemukan
      </h1>
      <p className="max-w-sm text-[--neutral-500]">
        Halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <Link
        to="/"
        className="rounded-[--radius-md] bg-[--color-primary] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[--color-primary-dark]"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
