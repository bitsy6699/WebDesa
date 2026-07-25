import { Helmet } from 'react-helmet-async';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';

const SITE_NAME = 'Portal Potensi Desa Karamatwangi';
const DEFAULT_DESCRIPTION = 'Menyediakan informasi potensi Desa Karamatwangi secara terbuka, akurat, dan mudah diakses masyarakat.';
const SITE_URL = 'https://karamatwangi.desa.id';

function resolveImageUrl(image) {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  const path = image.startsWith('/') ? image : `/${image}`;
  return `${SITE_URL}${path}`;
}

/**
 * SEO — Reusable <head> management via react-helmet-async.
 *
 * Injects global Organization + Website schemas on every page.
 * Additional page-specific schemas can be passed via `schema` prop.
 *
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.path]
 * @param {string} [props.image]
 * @param {string} [props.type='website']
 * @param {Array<object>} [props.schema] — Additional JSON-LD schemas
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image,
  type = 'website',
  robots = 'index, follow',
  schema = [],
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;
  const resolvedImage = resolveImageUrl(image);

  /* Global schemas: Organization + Website (on every page) */
  const globalSchemas = [organizationSchema(), websiteSchema()];
  const allSchemas = [...globalSchemas, ...schema];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="id_ID" />
      {resolvedImage && <meta property="og:image" content={resolvedImage} />}
      {resolvedImage && <meta property="og:image:width" content="1200" />}
      {resolvedImage && <meta property="og:image:height" content="630" />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={resolvedImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {resolvedImage && <meta name="twitter:image" content={resolvedImage} />}

      {/* JSON-LD Structured Data */}
      {allSchemas.map((s, i) => (
        <script
          key={s?.['@type'] || i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </Helmet>
  );
}
