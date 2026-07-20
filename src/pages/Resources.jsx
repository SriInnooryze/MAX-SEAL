/* Max-Seal — Resources landing: three distinct panels. */
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { RESOURCE_LIBS, DOCS, PRICE_LISTS } from '../data/data';
import { ArrowRight, FileText, Eye } from '../icons/icons';
import { routes } from '../router/paths';

export default function Resources() {
  const cat = RESOURCE_LIBS.find(r => r.id === 'catalog');
  const mkt = RESOURCE_LIBS.find(r => r.id === 'marketing');
  const pl = PRICE_LISTS[0];
  const bulletin = DOCS.find(d => d.type === 'Technical Bulletin');

  return (
    <>
      <Header current="resources" />
      <main>
        <PageHero kicker="Resources" title="Documents, materials and pricing in one place"
          lead="Three separate libraries: technical product documents, approved marketing materials, and controlled price lists. Each is managed and updated on its own."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Resources' }]}
          mediaId="resources-hero" mediaPlaceholder="Documents visual" />

        <section className="section">
          <div className="wrap">
            <div className="resx resx--landing">
              {/* Catalog — technical document treatment */}
              <article className="resx__card resx--catalog">
                <div className="resx__cover">
                  <image-slot id="res-catalog-cover" shape="rect" fit="cover" placeholder="Catalog cover" />
                  <span className="resx__filetag">{cat.fileType}</span>
                </div>
                <div className="resx__body">
                  <div className="resx__eyebrow">Catalog</div>
                  <h2 className="resx__title">Technical product information and selection documents</h2>
                  <dl className="resx__spec">
                    <div><dt>Latest</dt><dd>{cat.latest}</dd></div>
                    <div><dt>Updated</dt><dd>{cat.date}</dd></div>
                    <div><dt>Bulletin</dt><dd>{bulletin ? bulletin.date : 'See library'}</dd></div>
                  </dl>
                  <div className="resx__actions">
                    <Link className="link-arrow" to={routes.catalog}><Eye size={16} /> Preview</Link>
                    <Link className="link-arrow" to={routes.catalog}>View Catalog <ArrowRight size={16} /></Link>
                  </div>
                </div>
              </article>

              {/* Marketing — visual content treatment */}
              <article className="resx__card resx--marketing">
                <div className="resx__visual">
                  <image-slot id="res-marketing-visual" shape="rect" fit="cover" placeholder="Brochure or application image" />
                  <div className="resx__visual-cap">
                    <span className="resx__type">{mkt.resType}</span>
                    <h2 className="resx__title resx__title--ondark">Approved sales, application and distributor materials</h2>
                  </div>
                </div>
                <div className="resx__body">
                  <div className="resx__eyebrow">Marketing Resources</div>
                  <p className="resx__desc">Brochures, product imagery and application materials. Related to {mkt.related}.</p>
                  <div className="resx__actions">
                    <Link className="link-arrow" to={routes.marketing}><Eye size={16} /> Preview</Link>
                    <Link className="link-arrow" to={routes.marketing}>View Marketing Resources <ArrowRight size={16} /></Link>
                  </div>
                </div>
              </article>

              {/* Price Lists — controlled document treatment */}
              <article className="resx__card resx--price">
                <div className="resx__body resx__body--price">
                  <div className="resx__eyebrow resx__eyebrow--ondark">Price Lists</div>
                  <h2 className="resx__title resx__title--ondark">Controlled pricing documents and current versions</h2>
                  <div className="resx__doc">
                    <div className="resx__doc-icon"><FileText size={20} /></div>
                    <dl className="resx__docmeta">
                      <div><dt>Effective</dt><dd>{pl.effective}</dd></div>
                      <div><dt>Version</dt><dd>{pl.version}</dd></div>
                    </dl>
                  </div>
                  <div className="resx__access"><span className="resx__lock" /> {pl.access === 'download' ? 'Available to download' : 'Request access'}</div>
                  <div className="resx__actions resx__actions--price">
                    <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.priceLists}><ArrowRight size={15} /> View Price Lists</Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
