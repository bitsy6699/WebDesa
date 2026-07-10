/**
 * AdminPanel — Generic admin panel placeholder.
 * CMS CRUD screens will be implemented in the CMS admin phase.
 *
 * @see docs/product/FEATURE_SPEC.md PG-11 CMS Dashboard
 */
export default function AdminPanel() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-bold text-[--neutral-800]">
        Panel Administrasi
      </h1>
      <p className="max-w-sm text-[--neutral-500]">
        Fitur CMS akan diimplementasikan pada fase berikutnya.
      </p>
    </div>
  );
}
