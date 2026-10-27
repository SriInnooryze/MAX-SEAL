/* Max-Seal — dispatcher for the single-segment /products/:family route.
   That URL shape is shared by two different things: a Main Category slug
   (/products/butterfly-valves) and a Product id (/products/PROD-014).
   React Router can only bind one element to a given path pattern, so this
   checks which one :family actually is against the Excel-generated catalog
   data and renders the matching page — ProductCategory.jsx and
   ProductDetail.jsx both stay untouched and fully unaware of each other.
   Anything else (an inactive/removed product such as PROD-018, or a typo)
   gets a not-found page instead of ProductDetail's first-product fallback. */
import { Link, useParams } from 'react-router-dom';
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
  const { family } = useParams();
  const isCategory = CATEGORIES.some(c => c.slug === family && c.status === 'active');
  if (isCategory) return <ProductCategory />;
  return FAMILIES.some(f => f.id === family) ? <ProductDetail /> : <ProductNotFound />;
}
