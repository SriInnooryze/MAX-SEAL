/* Max-Seal — dispatcher for the single-segment /products/:family route.
   That URL shape is shared by two different things: a Main Category slug
   (/products/butterfly-valves) and a Product id (/products/PROD-014).
   React Router can only bind one element to a given path pattern, so this
   checks which one :family actually is against the Excel-generated catalog
   data and renders the matching page — ProductCategory.jsx and
   ProductDetail.jsx both stay untouched and fully unaware of each other. */
import { useParams } from 'react-router-dom';
import { CATEGORIES } from '../data/data';
import ProductCategory from './ProductCategory';
import ProductDetail from './ProductDetail';

export default function ProductOrCategory() {
  const { family } = useParams();
  const isCategory = CATEGORIES.some(c => c.slug === family && c.status === 'active');
  return isCategory ? <ProductCategory /> : <ProductDetail />;
}
