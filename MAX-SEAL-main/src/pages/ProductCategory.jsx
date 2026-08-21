/* Max-Seal — Product Category page (dynamic Products navigation).
   Route: /products/:categorySlug — the Main Category page in the
   Category > Subcategory > Product hierarchy. Shows the category's own
   info plus its Sub Category-1 tiles (from SUBCATEGORIES whose categoryId
   matches). Tiles link into the existing ProductSubcategory.jsx page,
   unchanged. All content is data-driven from CATEGORIES/SUBCATEGORIES
   (catalog.json, generated from the Excel workbook) — nothing here is
   hardcoded. */
import { Link, useParams } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import PageHero from '../components/PageHero';
import { CATEGORIES, SUBCATEGORIES, subcategoryTarget } from '../data/data';
import { ArrowRight, Headset } from '../icons/icons';
import { routes } from '../router/paths';

export default function ProductCategory() {
  useSiteChrome();
  // Mounted on the shared /products/:family route (see ProductOrCategory.jsx)
  // — the param is named "family" there, not "categorySlug".
  const { family: categorySlug } = useParams();

  const category = CATEGORIES.find(c => c.slug === categorySlug && c.status === 'active');

  if (!category) {
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

  const subcategories = SUBCATEGORIES.filter(s => s.categoryId === category.id && s.status === 'active');

  return (
    <main>
      <PageHero
        crumbs={[
          { label: 'Home', href: routes.home },
          { label: 'Products', href: routes.products() },
          { label: category.name },
        ]}
        title={category.name}
        lead={category.description}
        mediaId={'cat-' + category.id}
        mediaSrc={category.image}
        mediaPlaceholder={category.name + ' visual'}
      />
      <section className="section">
        <div className="wrap">
          {subcategories.length === 0 ? (
            <div className="rempty">
              <p>Subcategory details for {category.name} are being added. Ask our team for current availability and specifications.</p>
              <div className="rempty__actions">
                <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask a technical question</Link>
                <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.products()}>Browse all products</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="matchsum">
                <h2 className="matchsum__count">{subcategories.length} {subcategories.length === 1 ? 'category' : 'categories'} in {category.name}</h2>
                <p className="matchsum__note">Select a category to view its available series and products.</p>
              </div>
              <div className="subcategory-series-grid">
                {subcategories.map(s => (
                  <article className="subcategory-series-card" key={s.id}>
                    <div className="subcategory-series-card__media">
                      <image-slot id={'cat-tile-' + s.id} src={s.image} shape="rect" fit="contain" placeholder={s.name + ' image'} />
                    </div>
                    <div className="subcategory-series-card__body">
                      <h3 className="subcategory-series-card__name">{s.menuName || s.name}</h3>
                      {s.description && <p className="subcategory-series-card__desc">{s.description}</p>}
                      <Link className="subcategory-series-card__cta" to={subcategoryTarget(category, s)}>View Details <ArrowRight size={15} /></Link>
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
