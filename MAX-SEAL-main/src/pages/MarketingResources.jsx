/* Max-Seal — Marketing Resources: visual library. */
import { useState, useRef } from 'react';
import PageHero from '../components/PageHero';
// TEMPORARY: DocDrawer (the side preview panel) and the /resources/document-preview
// route are intentionally not used on this page right now — client asked for
// Preview/Download to act directly on the PDF instead of opening that panel.
// DocDrawer itself is untouched and still used by Catalog.jsx; to restore the
// panel here, re-import DocDrawer, add back a `doc` state, and swap the
// window.open/href calls below for `setDoc(...)` the way Catalog.jsx does it.
import { DOCS } from '../data/data';
import { Eye, Download, X, Search, FileText } from '../icons/icons';
import { routes } from '../router/paths';
import useCenterActiveInScroller from '../hooks/useCenterActiveInScroller';

export default function MarketingResources() {
  // Marketing Resources is driven entirely by the Docs sheet's ShowInMarketing/
  // Featured columns (see scripts/generate-catalog.mjs) — no items are
  // hard-coded here, so adding/removing a resource is an Excel + regenerate
  // change, not a code change.
  const items = DOCS.filter(d => d.showInMarketing);
  const [type, setType] = useState('All');
  const [q, setQ] = useState('');
  const types = ['All', ...Array.from(new Set(items.map(i => i.type)))];
  const chipsRef = useRef(null);

  // On narrow screens .fchips scrolls horizontally (see .mkt-section .fchip
  // in pages.css) — without this, selecting a chip near the edge (e.g.
  // "Application Guide") left it clipped instead of scrolling into view.
  useCenterActiveInScroller(chipsRef, '.fchip.on', type);
  // Featured resource is always whichever Marketing Resource doc was added
  // most recently in Excel (the last ShowInMarketing row, by sheet order) --
  // no manual flag to set, so a newly added PDF is featured automatically.
  const featured = items[items.length - 1] || null;
  const shown = items.filter(i => (type === 'All' || i.type === type) && (!q || (i.title + ' ' + i.fam).toLowerCase().includes(q.toLowerCase())));

  return (
    <main>
        <PageHero kicker="Marketing Resources" title="Approved materials for sales and distributors"
          lead="Brochures, application materials, product imagery and presentations. Approved for use by distributors, sales teams and customers."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Resources', href: routes.resources }, { label: 'Marketing Resources' }]}
          mediaId="marketing-hero" mediaPlaceholder="Marketing visual" />

        <section className="section mkt-section">
          <div className="wrap">
            {/* Featured resource — information-focused, no image dependency */}
            {featured && (
              <div className="mkt-feature">
                <div className="mkt-feature__head">
                  <div className="doc-ic mkt-feature__ic"><FileText size={22} /></div>
                  <div>
                    <div className="kicker">Featured resource</div>
                    <h2 className="mkt-feature__t">{featured.title}</h2>
                  </div>
                </div>
                <dl className="resx__spec mkt-feature__meta">
                  <div><dt>Type</dt><dd>{featured.type}</dd></div>
                  {featured.fam && <div><dt>Related</dt><dd>{featured.fam}</dd></div>}
                  {featured.date && <div><dt>Updated</dt><dd>{featured.date}</dd></div>}
                </dl>
                <div className="mkt-feature__actions">
                  {featured.pdfAsset && (
                    <a className="ms-btn ms-btn--primary ms-btn--sm" href={featured.pdfAsset} target="_blank" rel="noopener noreferrer">
                      <Eye size={15} /> Preview resource
                    </a>
                  )}
                  {featured.pdfAsset && (
                    <a className="ms-btn ms-btn--outline ms-btn--sm" href={featured.pdfAsset} download>
                      <Download size={15} /> Download resource
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="cat-controls">
              <div className="cat-search">
                <Search size={17} />
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search resources" aria-label="Search resources" />
                {q && <button aria-label="Clear search" onClick={() => setQ('')}><X size={15} /></button>}
              </div>
              <div className="fchips" role="tablist" aria-label="Resource type" ref={chipsRef}>
                {types.map(t => <button key={t} role="tab" aria-selected={t === type} className={'fchip' + (t === type ? ' on' : '')} onClick={() => setType(t)}>{t}</button>)}
              </div>
            </div>

            {/* Resource cards — compact document-icon treatment, no thumbnails */}
            <div className="mkt-gallery">
              {shown.map(i => (
                <a
                  className="mkt-card"
                  key={i.id}
                  href={i.pdfAsset || undefined}
                  target={i.pdfAsset ? '_blank' : undefined}
                  rel={i.pdfAsset ? 'noopener noreferrer' : undefined}
                >
                  <div className="mkt-card__ic"><FileText size={20} /></div>
                  <div className="mkt-card__body">
                    <div className="mkt-card__type">{i.type}</div>
                    <div className="mkt-card__t">{i.title}</div>
                    <div className="mkt-card__m">{i.fam}</div>
                  </div>
                </a>
              ))}
              {shown.length === 0 && <p className="mx__empty" style={{ padding: '1.5rem' }}>No resources match. Try a different type or search.</p>}
            </div>
          </div>
        </section>
    </main>
  );
}
