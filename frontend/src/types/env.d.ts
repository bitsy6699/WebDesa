/**
 * App-wide TypeScript environment variable declarations.
 * Extends the Vite `ImportMeta` type with project-specific env vars.
 */
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
