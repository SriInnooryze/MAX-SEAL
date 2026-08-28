/* Max-Seal — Explore All Products page.
   Route: /products/explore-all. A complete sitemap-style overview of the
   whole catalog — every active Main Category with its active Sub Category-1
   tiles, all on one page — distinct from /products (the guided "Help Me
   Choose" / filtered-browse selection experience). All content is
   data-driven from CATEGORIES/SUBCATEGORIES (catalog.json, generated from
   the Excel workbook) via the same subcategoryTarget() rule every other
   product nav surface uses, so hierarchy and routing stay in one place. */
import { Link } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import PageHero from '../components/PageHero';
import { CATEGORIES, SUBCATEGORIES, subcategoryTarget } from '../data/data';
import { ArrowRight, Headset } from '../icons/icons';
import { routes } from '../router/paths';

export default function ExploreAllProducts() {
  useSiteChrome();

  const activeCategories = CATEGORIES.filter(c => c.status === 'active');

  return (
    <main>
      <PageHero
        crumbs={[
          { label: 'Home', href: routes.home },
          { label: 'Products', href: routes.products() },
          { label: 'Explore All Products' },
        ]}
        title="Explore all products"
        lead="Browse the complete Max-Seal valve and automation range, organized by category."
        mediaId="explore-products-hero"
        mediaPlaceholder="Full product range visual"
      />
      <section className="section">
        <div className="wrap">
          {activeCategories.map(category => {
            const subcategories = SUBCATEGORIES.filter(s => s.categoryId === category.id && s.status === 'active');
            return (
              <div className="catalog-block" key={category.id}>
                <div className="matchsum">
                  <h2 className="matchsum__count">{category.name}</h2>
                  {category.description && <p className="matchsum__note">{category.description}</p>}
                </div>

                {subcategories.length === 0 ? (
                  <div className="rempty">
                    <p>Subcategory details for {category.name} are being added. Ask our team for current availability and specifications.</p>
                    <div className="rempty__actions">
                      <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask a technical question</Link>
                      <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.productCategory(category.slug)}>View {category.name}</Link>
                    </div>
                  </div>
                ) : (
                  <div className="subcategory-series-grid">
                    {subcategories.map(s => (
                      <article className="subcategory-series-card" key={s.id}>
                        <div className="subcategory-series-card__media">
                          <image-slot id={'explore-tile-' + s.id} src={s.image} shape="rect" fit="contain" placeholder={s.name + ' image'} />
                        </div>
                        <div className="subcategory-series-card__body">
                          <h3 className="subcategory-series-card__name">{s.menuName || s.name}</h3>
                          {s.description && <p className="subcategory-series-card__desc">{s.description}</p>}
                          <Link className="subcategory-series-card__cta" to={subcategoryTarget(category, s)}>View Details <ArrowRight size={15} /></Link>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
