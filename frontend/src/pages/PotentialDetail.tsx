import { useParams } from 'react-router-dom';

/**
 * PotentialDetail — Public potential detail page placeholder.
 * Full implementation (ACA metadata renderer, contact block) in Phase 13B.
 *
 * @see docs/product/FEATURE_SPEC.md PG-03 Detail Page
 * @see docs/engineering/ACA.md Dynamic Renderer
 */
export default function PotentialDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold text-[--neutral-900]">
        Detail Potensi
      </h1>
      <p className="max-w-sm text-[--neutral-500]">
        Kategori: <strong>{category}</strong> — Slug: <strong>{slug}</strong>
      </p>
      <p className="text-sm text-[--neutral-400]">
        Halaman detail akan diimplementasikan pada fase berikutnya.
      </p>
    </div>
  );
}
