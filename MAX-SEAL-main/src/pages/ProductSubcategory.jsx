/* Max-Seal — Product Subcategory page (dynamic Products navigation).
   Route: /products/:categorySlug/:subcategorySlug — the Sub Category-1 page
   in the Category > Subcategory > Product hierarchy. Shows the subcategory's
   own info plus its Sub Category-2 tiles (individual product/series entries
   from FAMILIES whose subcategoryId matches). Tiles link into the existing
   ProductDetail.jsx page, unchanged. All content is data-driven from
   CATEGORIES/SUBCATEGORIES/FAMILIES (catalog.json, generated from the Excel
   workbook) — nothing here is hardcoded. */
import { Link, Navigate, useParams } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import PageHero from '../components/PageHero';
import { CATEGORIES, SUBCATEGORIES, FAMILIES } from '../data/data';
import { ArrowRight, Headset } from '../icons/icons';
import { routes } from '../router/paths';

export default function ProductSubcategory() {
  useSiteChrome();
  const { categorySlug, subcategorySlug } = useParams();

  const category = CATEGORIES.find(c => c.slug === categorySlug && c.status === 'active');
  const subcategory = category
    ? SUBCATEGORIES.find(s => s.slug === subcategorySlug && s.categoryId === category.id && s.status === 'active')
    : null;

  if (!category || !subcategory) {
    return (
      <main>
        <PageHero
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Products', href: routes.products() }]}
          title="This product category could not be found"
          lead="The link you followed may be out of date. Browse the full product range instead."
        />
        <section className="section"><div className="wrap">
          <Link className="ms-btn ms-btn--primary" to={routes.products()}>Browse all products <ArrowRight size={16} /></Link>
        </div></section>
      </main>
    );
  }

  const series = FAMILIES.filter(f => f.subcategoryId === subcategory.id);

  // A Sub Category-1 with exactly one product has no real Sub Category-2 /
  // Series choice to make — send it straight to the product, even for a
  // direct/bookmarked URL, instead of an intermediate page with one card.
  // (Card links already skip this page entirely via subcategoryTarget() in
  // data.js; this covers navigating here directly.)
  if (series.length === 1) {
    return <Navigate to={routes.productDetail(series[0].id)} replace />;
  }

  return (
    <main>
      <PageHero
        crumbs={[
          { label: 'Home', href: routes.home },
          { label: 'Products', href: routes.products() },
          { label: category.name, href: routes.products({ category: category.id }) },
          { label: subcategory.name },
        ]}
        title={subcategory.menuName || subcategory.name}
        lead={subcategory.description}
        mediaId={'subcat-' + subcategory.id}
        mediaSrc={subcategory.image}
        mediaPlaceholder={subcategory.name + ' visual'}
      />
      <section className="section">
        <div className="wrap">
          {series.length === 0 ? (
            <div className="rempty">
              <p>Series details for {subcategory.name} are being added. Ask our team for current availability and specifications.</p>
              <div className="rempty__actions">
                <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask a technical question</Link>
                <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.products({ category: category.id })}>Browse {category.name}</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="matchsum">
                <h2 className="matchsum__count">{series.length} {series.length === 1 ? 'series' : 'series'} in {subcategory.name}</h2>
                <p className="matchsum__note">Select a series to view full specifications, documents and related products.</p>
              </div>
              <div className="subcategory-series-grid">
                {series.map(f => (
                  <article className="subcategory-series-card" key={f.id}>
                    <div className="subcategory-series-card__media">
                      <image-slot id={'subcat-tile-' + f.id} src={f.image} shape="rect" fit="contain" placeholder={f.name + ' image'} />
                    </div>
                    <div className="subcategory-series-card__body">
                      <h3 className="subcategory-series-card__name">{f.name}</h3>
                      <p className="subcategory-series-card__desc">{f.short}</p>
                      <Link className="subcategory-series-card__cta" to={routes.productDetail(f.id)}>View Details <ArrowRight size={15} /></Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
