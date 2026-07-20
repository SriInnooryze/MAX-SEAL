/* Max-Seal — Price Lists: controlled document register. */
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { PRICE_LISTS } from '../data/data';
import { ArrowRight, FileText, Download } from '../icons/icons';
import { routes } from '../router/paths';

export default function PriceLists() {
  return (
    <>
      <Header current="resources" />
      <main>
        <PageHero kicker="Price Lists" title="Controlled pricing documents"
          lead="Current price lists by family, with effective date, version and access status. Final pricing may depend on configuration, quantity, application, region and commercial terms."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Resources', href: routes.resources }, { label: 'Price Lists' }]}
          mediaId="pricelists-hero" mediaPlaceholder="Pricing document visual" />

        <section className="section">
          <div className="wrap">
            <div className="pl-note"><span className="pdot" /> No prices are published here. Each list is a controlled document. Final pricing is confirmed on enquiry.</div>
            <div className="pl-table">
              <div className="pl-head">
                <span>Document</span><span>Family</span><span>Effective</span><span>Version</span><span>Access</span><span></span>
              </div>
              {PRICE_LISTS.map(p => {
                const open = p.access === 'download';
                return (
                  <div className="pl-row" key={p.id}>
                    <div className="pl-doc"><div className="pl-doc__ic"><FileText size={20} /></div><div><div className="pl-doc__t">{p.title}</div><div className="pl-doc__m">Updated {p.updated} · PDF · {p.size}</div></div></div>
                    <div className="pl-cell" data-k="Family">{p.fam}</div>
                    <div className="pl-cell pl-mono" data-k="Effective">{p.effective}</div>
                    <div className="pl-cell pl-mono" data-k="Version">{p.version}</div>
                    <div className="pl-cell" data-k="Access"><span className={'pl-badge' + (open ? ' pl-badge--open' : '')}>{open ? 'Available to download' : 'Request access'}</span></div>
                    <div className="pl-act">
                      {open
                        ? <a className="ms-btn ms-btn--primary ms-btn--sm" href="#"><Download size={15} /> Download</a>
                        : <Link className="ms-btn ms-btn--secondary ms-btn--sm" to={routes.enquiry({ intent: 'pricelist' })}>Request access</Link>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pl-foot">
              <div className="pl-foot__col"><h4>Why request access</h4><p>Distributor and account pricing is controlled. Requesting access lets us confirm the right list and current terms for your region.</p></div>
              <div className="pl-foot__col"><h4>Need a clarification</h4><p>For configuration, quantity or regional questions, send a quick enquiry and our team will help.</p>
                <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginTop: '0.9rem' }}>
                  <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.enquiry({ intent: 'pricelist' })}>Request a price list <ArrowRight size={15} /></Link>
                  <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.enquiry({ intent: 'pricing' })}>Request a quote</Link>
                </div>
              </div>
            </div>
            <p className="placeholder-note" style={{ marginTop: '1.6rem' }}><span className="pdot" /> Archived versions appear here once approved for publication.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
