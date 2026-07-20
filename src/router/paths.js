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
  industries: (params) => withQuery('/industries', params),
  industryDetail: (id) => '/industry/' + id,
  solutions: '/solutions',
  about: '/about',
  contact: '/contact',
  resources: '/resources',
  catalog: '/resources/catalog',
  marketing: '/resources/marketing',
  priceLists: '/resources/price-lists',
  search: (params) => withQuery('/search', params),
  enquiry: (params) => withQuery('/enquiry', params),
  partners: '/partners',
  privacy: '/privacy-policy',
  terms: '/terms',
  documentPreview: (id) => '/resources/document-preview/' + id,
};
