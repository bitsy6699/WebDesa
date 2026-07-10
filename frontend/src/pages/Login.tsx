/**
 * Login — Admin login page placeholder.
 * Full implementation (form, Sanctum auth) in authentication phase.
 *
 * @see docs/product/FEATURE_SPEC.md PG-10 Admin Login
 * @see docs/engineering/API_SPEC.md §3.1 Admin Login
 */
export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[--bg-page] p-8 text-center">
      <h1 className="text-2xl font-bold text-[--neutral-900]">
        Login Administrator
      </h1>
      <p className="max-w-sm text-[--neutral-500]">
        Form login akan diimplementasikan pada fase berikutnya.
      </p>
    </div>
  );
}
