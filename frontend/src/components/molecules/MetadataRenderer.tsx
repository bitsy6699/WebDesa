import { clsx } from 'clsx';

export interface MetadataRendererProps {
  /**
   * ACA metadata object from the API.
   * Keys are field names (snake_case), values are strings.
   * @see docs/engineering/ACA.md §5 Adaptive Metadata Modeling
   */
  metadata: Record<string, string> | null | undefined;
  /** Optional title displayed above the metadata block. */
  title?: string;
  className?: string;
}

/**
 * Formats a snake_case or camelCase key into a human-readable label.
 * e.g. "owner_name" → "Owner Name", "priceRange" → "Price Range"
 */
function formatLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Renders a metadata value. Handles comma-separated lists as tags.
 */
function MetadataValue({ value }: { value: string }) {
  const isCommaSeparated = value.includes(',') && !value.match(/\d,\d/);

  if (isCommaSeparated) {
    const items = value.split(',').map((s) => s.trim()).filter(Boolean);
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center px-2.5 py-0.5 rounded-[--radius-full] text-xs font-medium bg-[--neutral-100] text-[--neutral-700] border border-[--neutral-200]"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return <span className="text-sm text-[--neutral-800]">{value}</span>;
}

/**
 * MetadataRenderer — Molecule for dynamically rendering ACA category-specific
 * metadata key-value pairs on the Potential Detail page.
 *
 * This is the core of the ACA dynamic rendering engine on the frontend.
 * No category-specific conditional code is used — all fields are rendered
 * by iterating over the metadata object returned by the API.
 *
 * @see docs/engineering/ACA.md §6.1 Dynamic Rendering Engine
 */
export function MetadataRenderer({ metadata, title = 'Informasi Tambahan', className }: MetadataRendererProps) {
  if (!metadata) return null;

  const entries = Object.entries(metadata).filter(([, v]) => v !== null && v !== '' && v !== undefined);
  if (entries.length === 0) return null;

  return (
    <section className={clsx('space-y-4', className)} aria-label={title}>
      <h2 className="text-lg font-semibold text-[--neutral-900]">{title}</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="rounded-[--radius-lg] border border-[--border-default] bg-[--bg-surface] p-4 space-y-1"
          >
            <dt className="text-xs font-semibold uppercase tracking-wider text-[--neutral-500]">
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
