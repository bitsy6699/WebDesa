import { APP_NAME } from '@/constants/app';

/**
 * Home — Public homepage placeholder.
 * Full implementation (hero section, stats, directory grid) in Phase 13B.
 *
 * @see docs/product/FEATURE_SPEC.md PG-01 Homepage
 */
export default function Home() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold text-[--neutral-900]">
        Selamat Datang di {APP_NAME}
      </h1>
      <p className="max-w-sm text-[--neutral-500]">
        Halaman utama akan diimplementasikan pada fase berikutnya.
      </p>
    </div>
  );
}
