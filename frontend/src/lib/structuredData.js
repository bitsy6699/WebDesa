const SITE_URL = 'https://karamatwangi.desa.id';
const SITE_NAME = 'Portal Potensi Desa Karamatwangi';

function resolveImageUrl(image) {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  const path = image.startsWith('/') ? image : `/${image}`;
  return `${SITE_URL}${path}`;
}

/**
 * Organization schema — reused globally across all pages.
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'Pemerintah Desa Karamatwangi',
    url: SITE_URL,
    logo: resolveImageUrl('/assets/images/logo-desa.png'),
    description: 'Portal resmi Potensi Desa Karamatwangi, Kecamatan Cikajang, Kabupaten Garut, Jawa Barat.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Raya Karamatwangi No. 1',
      addressLocality: 'Cikajang',
      addressRegion: 'Kabupaten Garut, Jawa Barat',
      postalCode: '44171',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-232-123-4567',
      email: 'info@karamatwangi.desa.id',
      contactType: 'customer service',
      availableLanguage: 'Indonesian',
    },
    sameAs: [],
  };
}

/**
 * Website schema with SearchAction.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/potentials?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * BreadcrumbList schema from an array of breadcrumb items.
 * @param {Array<{label: string, to?: string}>} items
 */
export function breadcrumbSchema(items) {
  if (!items || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.to ? { item: `${SITE_URL}${item.to}` } : {}),
    })),
  };
}

/**
 * FAQPage schema from an array of FAQ items.
 * @param {Array<{question: string, answer: string}>} items
 */
export function faqSchema(items) {
  if (!items || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Article schema for Potential Detail pages.
 * @param {object} potential
 */
export function articleSchema(potential) {
  if (!potential) return null;
  const { title, description, cover_image_url, category, created_at, updated_at, slug } = potential;
  const categoryName = typeof category === 'object' ? (category?.label || category?.name || '') : (category || '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description?.slice(0, 300),
    image: resolveImageUrl(cover_image_url),
    author: {
      '@type': 'GovernmentOrganization',
      name: 'Pemerintah Desa Karamatwangi',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: resolveImageUrl('/assets/images/logo-desa.png'),
      },
    },
    datePublished: created_at || new Date().toISOString(),
    dateCreated: created_at || new Date().toISOString(),
    dateModified: updated_at || created_at || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/potentials/${category}/${slug}`,
    },
    articleSection: categoryName,
  };
}

/**
 * CollectionPage schema for directory/listing pages.
 * @param {string} name
 * @param {string} description
 * @param {string} path
 */
export function collectionPageSchema(name, description, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
  };
}
