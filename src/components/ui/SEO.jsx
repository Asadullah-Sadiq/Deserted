import { Helmet } from 'react-helmet-async'

const BASE_URL = 'https://digitechofferings.com'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Digitech Offerings',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  description: 'World-class B2B AI & technology services. We engineer the future with cutting-edge AI solutions, cloud architecture, and digital transformation.',
  email: 'hello@digitechofferings.com',
  sameAs: [
    'https://twitter.com/digitechofferings',
    'https://linkedin.com/company/digitechofferings',
    'https://github.com/digitechofferings',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@digitechofferings.com',
    availableLanguage: 'English',
  },
}

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} | Digitech Offerings`
    : 'Digitech Offerings | B2B AI & Tech Services'

  const metaDesc = description ||
    'World-class B2B AI & technology services. We engineer the future with cutting-edge AI solutions, cloud architecture, and digital transformation.'

  const canonical = `${BASE_URL}${path}`
  const structuredData = jsonLd || ORG_JSON_LD

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Digitech Offerings — B2B AI & Tech Services" />
      <meta property="og:site_name" content="Digitech Offerings" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}
