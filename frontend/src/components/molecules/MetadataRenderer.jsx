import { clsx } from 'clsx';

/**
 * Formats a snake_case or camelCase key into a human-readable label.
 */
function formatLabel(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Renders a metadata value. Handles comma-separated lists as tags.
 */
function MetadataValue({ value }) {
  const isCommaSeparated = value.includes(',') && !value.match(/\d,\d/);

  if (isCommaSeparated) {
    const items = value.split(',').map((s) => s.trim()).filter(Boolean);
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return <span className="text-sm text-neutral-800">{value}</span>;
}

/**
 * MetadataRenderer — Dynamically renders ACA category-specific metadata.
 */
export function MetadataRenderer({ metadata, title = 'Informasi Tambahan', className }) {
  if (!metadata) return null;

  const entries = Object.entries(metadata).filter(
    ([key, v]) => v !== null && v !== '' && v !== undefined && typeof v !== 'object'
  );
  if (entries.length === 0) return null;

  return (
    <section className={clsx('space-y-4', className)} aria-label={title}>
      <h2 className="font-heading text-xl font-bold text-primary-dark">{title}</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="rounded-[24px] border border-neutral-200 bg-white p-5 space-y-1.5 shadow-sm"
          >
            <dt className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {formatLabel(key)}
            </dt>
            <dd>
              <MetadataValue value={String(value)} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
