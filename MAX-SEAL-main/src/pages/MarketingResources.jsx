/* Max-Seal — Marketing Resources: visual library. */
import { useState } from 'react';
import PageHero from '../components/PageHero';
import DocDrawer from '../components/DocDrawer';
import { DOCS } from '../data/data';
import { Eye, Download, X, Search } from '../icons/icons';
import { routes } from '../router/paths';

export default function MarketingResources() {
  const base = DOCS.filter(d => ['Brochure', 'Application Guide', 'Selection Guide'].includes(d.type));
  const items = base.concat([
    { id: 'm1', type: 'Product Image', title: 'Resilient Seated Product Imagery', fam: 'Resilient Seated', date: 'Apr 2025', size: '8.4 MB', pages: 12, industry: 'General' },
    { id: 'm2', type: 'Sales Presentation', title: 'Company Capability Presentation', fam: 'All families', date: 'Mar 2025', size: '5.2 MB', pages: 20, industry: 'General' },
    { id: 'm3', type: 'Application Material', title: 'Data Center Cooling Application Sheet', fam: 'High Performance', date: 'Feb 2025', size: '1.7 MB', pages: 4, industry: 'Data Centers' },
  ]);
  const [type, setType] = useState('All');
  const [q, setQ] = useState('');
  const [doc, setDoc] = useState(null);
  const types = ['All', 'Brochure', 'Application Material', 'Application Guide', 'Product Image', 'Sales Presentation', 'Selection Guide'];
  const featured = items.find(i => i.type === 'Brochure') || items[0];
  const shown = items.filter(i => (type === 'All' || i.type === type) && (!q || (i.title + ' ' + i.fam).toLowerCase().includes(q.toLowerCase())));

  return (
    <main>
        <PageHero kicker="Marketing Resources" title="Approved materials for sales and distributors"
          lead="Brochures, application materials, product imagery and presentations. Approved for use by distributors, sales teams and customers."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Resources', href: routes.resources }, { label: 'Marketing Resources' }]}
          mediaId="marketing-hero" mediaPlaceholder="Marketing visual" />

        <section className="section">
          <div className="wrap">
            {/* Featured resource */}
            <div className="mkt-feature">
              <div className="mkt-feature__visual"><image-slot id="mkt-feature" shape="rect" fit="cover" placeholder="Featured brochure or application image" />
                <div className="mkt-feature__cap"><span className="resx__type">{featured.type}</span><h2 className="mkt-feature__t">{featured.title}</h2></div>
              </div>
              <div className="mkt-feature__side">
                <div className="kicker">Featured resource</div>
                <p className="mkt-feature__d">A featured marketing item for distributor and sales use. Preview the visual or download the file.</p>
                <dl className="mkt-feature__meta">
                  <div><dt>Type</dt><dd>{featured.type}</dd></div>
                  <div><dt>Related</dt><dd>{featured.fam}</dd></div>
                  <div><dt>Updated</dt><dd>{featured.date}</dd></div>
                </dl>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
                  <button className="ms-btn ms-btn--primary ms-btn--sm" onClick={() => setDoc(featured)}><Eye size={15} /> Preview resource</button>
                  <a className="ms-btn ms-btn--outline ms-btn--sm" href="#"><Download size={15} /> Download resource</a>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="cat-controls">
              <div className="cat-search">
                <Search size={17} />
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search resources" aria-label="Search resources" />
                {q && <button aria-label="Clear search" onClick={() => setQ('')}><X size={15} /></button>}
              </div>
              <div className="fchips" role="tablist" aria-label="Resource type">
                {types.map(t => <button key={t} role="tab" aria-selected={t === type} className={'fchip' + (t === type ? ' on' : '')} onClick={() => setType(t)}>{t}</button>)}
              </div>
            </div>

            {/* Visual gallery */}
            <div className="mkt-gallery">
              {shown.map(i => (
                <button className="mkt-card" key={i.id} onClick={() => setDoc(i)}>
                  <div className="mkt-card__visual"><image-slot id={'mkt-' + i.id} shape="rect" fit="cover" placeholder={i.type} /><span className="mkt-card__eye"><Eye size={18} /></span></div>
                  <div className="mkt-card__body">
                    <div className="mkt-card__type">{i.type}</div>
                    <div className="mkt-card__t">{i.title}</div>
                    <div className="mkt-card__m">{i.fam}{i.industry ? ' · ' + i.industry : ''}</div>
                  </div>
                </button>
              ))}
              {shown.length === 0 && <p className="mx__empty" style={{ padding: '1.5rem' }}>No resources match. Try a different type or search.</p>}
            </div>
          </div>
        </section>

        <DocDrawer doc={doc} onClose={() => setDoc(null)} usage kind="marketing" />
    </main>
  );
}
