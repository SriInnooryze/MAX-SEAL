/* Max-Seal — per-page SEO definitions.

   Plain JS (no JSX, no browser APIs) so it is shared by:
   - the page itself, through src/hooks/useSeo.js (sets the tags when the
     page opens in the browser), and
   - scripts/prerender-seo.mjs, which writes the same tags into a static
     dist/<path>/index.html at build time, so search engines and link
     previews see them without running JavaScript.

   SITE_URL is the public address used for canonical and og:url links. */
export const SITE_URL = 'https://max-seal.vercel.app';
export const SITE_NAME = 'Max-Seal Valves & Controls';
export const DEFAULT_TITLE = 'Max-Seal — Industrial Valves & Controls';

/* faq: [{q, a}], products: [{name, url, image}] (absolute or root paths). */
export function dataCentersSeo({ faq = [], products = [] } = {}) {
  const path = '/data-centers';
  const url = SITE_URL + path;
  const abs = (p) => (p && p.startsWith('http') ? p : SITE_URL + encodeURI(p || ''));
  const image = abs('/assets/maxseal/industries/data-centers.png');
  const title = 'Data Center Cooling Valves | Chilled Water Butterfly Valves | Max-Seal';
  const description = 'Butterfly valves for data center cooling: chiller isolation, chilled & condenser water, CRAH and CDU liquid cooling. 1½"–96", manual or automated for BMS. Explore the interactive cooling loop.';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title, description, url,
      about: 'Valves for data center cooling systems',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL, logo: SITE_URL + '/favicon.png' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: 'Industries', item: SITE_URL + '/industries' },
        { '@type': 'ListItem', position: 3, name: 'Data Centers', item: url },
      ],
    },
    products.length && {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Max-Seal valves for data center cooling',
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem', position: i + 1, url: abs(p.url), name: p.name,
      })),
    },
    faq.length && {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ].filter(Boolean);
  return {
    path, url, title, description, image,
    keywords: 'data center valves, data center cooling valves, chilled water butterfly valve, chiller isolation valve, condenser water valve, CRAH valve, CDU liquid cooling valve, BMS actuated butterfly valve',
    jsonLd,
  };
}
