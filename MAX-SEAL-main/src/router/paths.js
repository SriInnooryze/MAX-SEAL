/* Max-Seal — central route path builders. Every internal <Link> in the app
   goes through these helpers so the URL scheme lives in exactly one place. */

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
  products: (params) => withQuery('/products', params),
  productDetail: (id) => '/products/' + id,
  /* Main Category page (dynamic Products navigation) — shows a category's
     Sub Category-1 tiles. Shares the single-segment /products/:family URL
     shape with productDetail; ProductOrCategory.jsx decides which one a
     given slug/id resolves to. */
  productCategory: (categorySlug) => '/products/' + categorySlug,
  /* Category > Subcategory hierarchy page (dynamic Products navigation) —
     shows a subcategory's own Sub Category-2 tiles (the individual product
     series). Slugs come from the Categories/Subcategories catalog data. */
  productSubcategory: (categorySlug, subcategorySlug) => '/products/' + categorySlug + '/' + subcategorySlug,
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
