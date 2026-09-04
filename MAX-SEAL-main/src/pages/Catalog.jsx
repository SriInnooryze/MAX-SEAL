/* Max-Seal — Catalog: enterprise technical document library. */
import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import DocDrawer from '../components/DocDrawer';
import { DOCS, DOC_TYPES, FAMILIES } from '../data/data';
import { FileText, Download, Eye, X, ArrowRight, Search } from '../icons/icons';
import { routes } from '../router/paths';

export default function Catalog() {
  // Product Detail pages read DOCS directly (unfiltered) — this page only
  // shows the curated subset marked ShowInCatalog in the workbook, so
  // trimming this list never removes a document from its product page.
  const docs = DOCS.filter(d => d.showInCatalog !== false);
  const [searchParams, setSearchParams] = useSearchParams();
  const catalogSlug = searchParams.get('catalog');

  const [q, setQ] = useState('');
  const [fam, setFam] = useState('All');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('updated');
  const [doc, setDoc] = useState(null);
  const hasActiveFilters = !!q || fam !== 'All' || type !== 'All' || sort !== 'updated';
  const clearFilters = () => { setQ(''); setFam('All'); setType('All'); setSort('updated'); };

  const fams = ['All', ...FAMILIES.map(f => f.name), 'All families'];
  const types = ['All', ...DOC_TYPES, 'Datasheet', 'Brochure'];

  const selectCatalogDoc = (selected) => {
    setSearchParams({ catalog: selected.slug });
  };

  const norm = (t) => (t === 'Product Catalog' ? 'Catalog' : t);
  const shown = useMemo(() => docs
    .filter(d => fam === 'All' || d.fam === fam)
    .filter(d => type === 'All' || d.type === norm(type) || d.type === type)
    .filter(d => !q || (d.title + ' ' + d.fam + ' ' + d.type).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : 0), [q, fam, type, sort]);

  return (
    <main>
        <PageHero className="page-hero--slim" kicker="Catalog" title="Technical document library"
          lead="Product catalogs, datasheets, bulletins and guides. Preview any document, then download the PDF. Sample titles are clearly marked until confirmed."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Resources', href: routes.resources }, { label: 'Catalog' }]}
          mediaId="catalog-hero" mediaPlaceholder="Documents visual" />

        <section className="section cat-section">
          <div className="wrap">
            {/* Search + filters */}
            <div className="cat-controls">
              <div className="cat-search">
                <Search size={17} />
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents" aria-label="Search documents" />
                {q && <button aria-label="Clear search" onClick={() => setQ('')}><X size={15} /></button>}
              </div>
              <div className="cat-filters">
                <label className="cat-sel"><span>Family</span>
                  <select value={fam} onChange={(e) => setFam(e.target.value)}>{fams.filter((v,i,a)=>a.indexOf(v)===i).map(v => <option key={v}>{v}</option>)}</select>
                </label>
                <label className="cat-sel"><span>Type</span>
                  <select value={type} onChange={(e) => setType(e.target.value)}>{types.filter((v,i,a)=>a.indexOf(v)===i).map(v => <option key={v}>{v}</option>)}</select>
                </label>
                <label className="cat-sel"><span>Sort</span>
                  <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="updated">Recently updated</option><option value="title">Title A–Z</option></select>
                </label>
              </div>
              {hasActiveFilters && (
                <button type="button" className="link-arrow cat-clear" onClick={clearFilters}>
                  <X size={14} /> Clear filters
                </button>
              )}
            </div>

            {/* Document list */}
            <div className="results__count">
              <b>{shown.length}</b> {shown.length === 1 ? 'document' : 'documents'} found
            </div>
            <div className="doc-list">
              {shown.map(d => {
                const isSelected = !!catalogSlug && d.slug === catalogSlug;
                const openDoc = () => {
                  selectCatalogDoc(d);
                  if (d.pdfAsset) window.open(d.pdfAsset, '_blank', 'noopener,noreferrer');
                  else setDoc(d);
                };
                return (
                  <div
                    className={'doc-row' + (isSelected ? ' doc-row--selected' : '')}
                    key={d.id}
                    onClick={openDoc}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') openDoc(); }}
                  >
                    <div className="doc-ic"><FileText size={20} /></div>
                    <div className="doc-main">
                      <div className="doc-main__t">{d.title}</div>
                      <div className="doc-main__m">
                        <span>{d.type}</span>
                        {d.date && <span>Updated {d.date}</span>}
                        <span>PDF{d.size ? ` · ${d.size}` : ''}</span>
                        {!!d.pages && <span>{d.pages} pages</span>}
                      </div>
                      <div className="doc-main__fam">{d.fam}</div>
                    </div>
                    <div className="doc-actions">
                      {d.pdfAsset ? (
                        <a
                          className="doc-mini"
                          aria-label="Preview"
                          title="Preview"
                          href={d.pdfAsset}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => { e.stopPropagation(); selectCatalogDoc(d); }}
                        >
                          <Eye size={17} /><span className="doc-mini__label">Preview</span>
                        </a>
                      ) : (
                        <button
                          className="doc-mini"
                          aria-label="Preview"
                          title="Preview"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectCatalogDoc(d);
                            setDoc(d);
                          }}
                        >
                          <Eye size={17} /><span className="doc-mini__label">Preview</span>
                        </button>
                      )}
                      {d.pdfAsset ? (
                        <a
                          className="doc-mini"
                          aria-label="Download"
                          title="Download"
                          href={d.pdfAsset}
                          download
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={17} /><span className="doc-mini__label">Download</span>
                        </a>
                      ) : (
                        <button
                          className="doc-mini"
                          aria-label="Download"
                          title="Download"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectCatalogDoc(d);
                            setDoc(d);
                          }}
                        >
                          <Download size={17} /><span className="doc-mini__label">Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              {shown.length === 0 && <p className="mx__empty" style={{ padding: '1.5rem' }}>No documents match. Try clearing the search or filters.</p>}
            </div>
            <div className="cat-cta">
              <p className="cat-cta__q">Can&rsquo;t find the document you need?</p>
              <Link className="ms-btn ms-btn--outline" to={routes.enquiry({ intent: 'general' })}>Request a specific document <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <DocDrawer doc={doc} onClose={() => setDoc(null)} kind="catalog" />
    </main>
  );
}
