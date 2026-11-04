/* Max-Seal — central route path builders. Every internal <Link> in the app
   goes through these helpers so the URL scheme lives in exactly one place. */
import catalog from '../data/generated/catalog.json';

const productUrlPaths = new Map(catalog.products.map((p) => [p.id, p.urlPath]));

function withQuery(path, params) {
  if (!params) return path;
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  });
  const s = qs.toString();
  return s ? path + '?' + s : path;
}

export const routes = {
  home: '/',
  home2: '/home-2',
  products: (params) => withQuery('/products', params),
  /* Product page — /products/<category>/<subcategory>/<product>/<code>-series,
     from Products.UrlPath in the workbook (catalog.json `urlPath`). Callers
     still pass the product Id; an unknown Id falls back to /products/<id>,
     which ProductOrCategory.jsx redirects or shows as not found. */
  productDetail: (id) => '/products/' + (productUrlPaths.get(id) || id),
  /* Main Category page (dynamic Products navigation) — shows a category's
     Sub Category-1 tiles. Single-segment /products/<slug>; the old
     /products/PROD-xxx links share that shape and ProductOrCategory.jsx
     redirects them to the product's current URL. */
  productCategory: (categorySlug) => '/products/' + categorySlug,
  /* Category > Subcategory hierarchy page (dynamic Products navigation) —
     shows a subcategory's own Sub Category-2 tiles (the individual product
     series). Slugs come from the Categories/Subcategories catalog data. */
  productSubcategory: (categorySlug, subcategorySlug) => '/products/' + categorySlug + '/' + subcategorySlug,
  /* Full-catalog sitemap page — deliberately distinct from `products` (the
     guided selection/discovery experience). Kept under the /products/
     namespace as a static segment so it still ranks above the dynamic
     /products/:family route in React Router's matching, without needing a
     separate top-level path. */
  exploreProducts: '/products/explore-all',
  industries: (params) => withQuery('/industries', params),
  /* Individual industry pages were consolidated into the Industries matrix
     (see src/pages/Industries.jsx) — this now points every existing caller
     (nav dropdown, mobile nav, related-industries links, search results,
     About's "Markets served" chips) at the matrix with that industry
     pre-selected via ?industry=, instead of a separate /industry/:id page.
     Kept the function name unchanged so no call site needed to change. */
  industryDetail: (id) => withQuery('/industries', { industry: id }),
  solutions: '/solutions',
  about: '/about',
  contact: '/contact',
  resources: '/resources',
  catalog: (params) => withQuery('/resources/catalog', params),
  marketing: '/resources/marketing',
  priceLists: '/resources/price-lists',
  search: (params) => withQuery('/search', params),
  enquiry: (params) => withQuery('/enquiry', params),
  partners: '/partners',
  privacy: '/privacy-policy',
  terms: '/terms',
  documentPreview: (id) => '/resources/document-preview/' + id,
};
