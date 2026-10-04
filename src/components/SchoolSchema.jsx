import { site } from '../data/site';

export default function SchoolSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: site.name,
    url: typeof window !== 'undefined' ? window.location.origin : undefined,
    telephone: site.phone,
    email: site.email,
    foundingDate: String(site.established),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line1,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pin,
      addressCountry: 'IN',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
