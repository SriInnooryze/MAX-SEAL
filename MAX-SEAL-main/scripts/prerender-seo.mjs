/**
 * Runs after `vite build`. The site renders in the browser, so on its own
 * every URL serves the same dist/index.html with one generic <title>. This
 * script gives search engines and link previews real page-level SEO without
 * JavaScript:
 *
 *  - dist/data-centers/index.html — a copy of index.html with that page's
 *    title, description, canonical, Open Graph / Twitter tags and JSON-LD
 *    (BreadcrumbList, ItemList, FAQPage) written into <head>. The same values
 *    come from src/seo/pageSeo.js, which the page also uses at runtime.
 *  - dist/sitemap.xml — every page, including all product pages.
 *  - dist/robots.txt — allows crawling and points at the sitemap.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dataCentersSeo, SITE_URL, SITE_NAME } from '../src/seo/pageSeo.js';
import { DC_FAQ, DC_MATRIX_PRODUCTS } from '../src/data/dataCenterData.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/generated/catalog.json'), 'utf8'));
const productUrl = (id) => {
  const p = catalog.products.find((x) => x.id === id);
  return p ? '/products/' + p.urlPath : null;
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function headTags(seo) {
  // data-seo="1" lets useSeo.js remove these when the visitor moves on to
  // another page inside the app.
  const m = (attr, k, v) => `<meta ${attr}="${k}" content="${esc(v)}" data-seo="1" />`;
  return [
    m('name', 'description', seo.description),
    m('name', 'keywords', seo.keywords),
    `<link rel="canonical" href="${seo.url}" data-seo="1" />`,
    m('property', 'og:type', 'website'),
    m('property', 'og:site_name', SITE_NAME),
    m('property', 'og:title', seo.title),
    m('property', 'og:description', seo.description),
    m('property', 'og:url', seo.url),
    m('property', 'og:image', seo.image),
    m('name', 'twitter:card', 'summary_large_image'),
    m('name', 'twitter:title', seo.title),
    m('name', 'twitter:description', seo.description),
    m('name', 'twitter:image', seo.image),
    `<script type="application/ld+json" data-seo="1">${JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}

const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const pages = [
  dataCentersSeo({
    faq: DC_FAQ,
    products: DC_MATRIX_PRODUCTS.map((c) => {
      const p = catalog.products.find((x) => x.id === c.id);
      return p && { name: p.name, url: productUrl(p.id) };
    }).filter(Boolean),
  }),
];

for (const seo of pages) {
  const html = indexHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(seo.title)}</title>\n    ${headTags(seo)}`);
  const out = path.join(DIST, seo.path.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log('SEO page written:', path.relative(ROOT, out));
}

// Sitemap: main pages, the data centers page first after home, then every
// category, subcategory and product page from the catalog.
const today = new Date().toISOString().slice(0, 10);
const catSlug = Object.fromEntries(catalog.categories.map((c) => [c.id, c.slug]));
const urls = [
  ['/', '1.0'], ['/data-centers', '0.9'], ['/products', '0.9'], ['/industries', '0.8'], ['/solutions', '0.7'],
  ['/about', '0.6'], ['/contact', '0.6'], ['/resources', '0.6'], ['/resources/catalog', '0.6'],
  ['/resources/marketing', '0.5'], ['/resources/price-lists', '0.5'], ['/partners', '0.5'], ['/enquiry', '0.6'],
  ...catalog.categories.filter((c) => c.status === 'active').map((c) => ['/products/' + c.slug, '0.7']),
  ...catalog.subcategories.filter((s) => s.status === 'active' && catSlug[s.categoryId]).map((s) => [`/products/${catSlug[s.categoryId]}/${s.slug}`, '0.6']),
  ...catalog.products.map((p) => ['/products/' + p.urlPath, '0.7']),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...new Map(urls).entries()].map(([u, pr]) => `  <url><loc>${SITE_URL}${encodeURI(u)}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`Sitemap written: ${new Map(urls).size} URLs; robots.txt written.`);
