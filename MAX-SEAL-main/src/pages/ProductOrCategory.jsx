/* Max-Seal — dispatcher for the /products/* route (everything except the
   2-segment subcategory pages, which have their own route). The path is
   matched against the Excel-generated catalog data:
   - a Main Category slug (/products/butterfly-valves) → category page
   - a product UrlPath (/products/butterfly-valves/resilient-seated/
     performance-series-butterfly-valve/prf-series) → product page
   - an old product Id link (/products/PROD-009) → redirect to its UrlPath
   Anything else (an inactive/removed product such as PROD-018, or a typo)
   gets a not-found page instead of ProductDetail's first-product fallback. */
import { Link, Navigate, useParams } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import PageHero from '../components/PageHero';
import { CATEGORIES, FAMILIES } from '../data/data';
import { ArrowRight } from '../icons/icons';
import { routes } from '../router/paths';
import ProductCategory from './ProductCategory';
import ProductDetail from './ProductDetail';

function ProductNotFound() {
  useSiteChrome();
  return (
    <main>
      <PageHero
        crumbs={[{ label: 'Home', href: routes.home }, { label: 'Products', href: routes.products() }]}
        title="This product could not be found"
        lead="The link you followed may be out of date. Browse the full product range instead."
      />
      <section className="section"><div className="wrap">
        <Link className="ms-btn ms-btn--primary" to={routes.products()}>Browse all products <ArrowRight size={16} /></Link>
      </div></section>
    </main>
  );
}

export default function ProductOrCategory() {
  // Everything after /products/ except the 2-segment subcategory pages,
  // which have their own route. Trailing slashes are ignored.
  const path = (useParams()['*'] || '').replace(/\/+$/, '');
  const isCategory = CATEGORIES.some(c => c.slug === path && c.status === 'active');
  if (isCategory) return <ProductCategory />;
  const product = FAMILIES.find(f => f.urlPath === path);
  if (product) return <ProductDetail id={product.id} />;
  // Old /products/PROD-xxx links redirect to the product's current URL.
  const byId = FAMILIES.find(f => f.id === path);
  if (byId) return <Navigate to={routes.productDetail(byId.id)} replace />;
  return <ProductNotFound />;
}
