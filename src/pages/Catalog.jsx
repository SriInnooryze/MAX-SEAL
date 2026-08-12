/* Max-Seal — Catalog: enterprise technical document library. */
import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import DocDrawer from '../components/DocDrawer';
import { DOCS, DOC_TYPES, FAMILIES } from '../data/data';
import { FileText, Download, Eye, X, ArrowRight, Search, Sliders } from '../icons/icons';
import { routes } from '../router/paths';

export default function Catalog() {
  const docs = DOCS;
  const [searchParams, setSearchParams] = useSearchParams();
  const catalogSlug = searchParams.get('catalog');

  const [q, setQ] = useState('');
  const [fam, setFam] = useState('All');
  const [type, setType] = useState('All');
  const [sort, setSort] = useState('updated');
  const [doc, setDoc] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const fams = ['All', ...FAMILIES.map(f => f.name), 'All families'];
  const types = ['All', ...DOC_TYPES, 'Datasheet', 'Brochure'];

  // Single source of truth: URL query parameter ?catalog=<slug> drives featured selection
  const featured = useMemo(() => {
    if (catalogSlug) {
      const match = docs.find(d => d.slug === catalogSlug);
      if (match) return match;
    }
    return docs.find(d => d.type === 'Catalog') || docs[0];
  }, [docs, catalogSlug]);

  const selectCatalogDoc = (selected) => {
    setSearchParams({ catalog: selected.slug });
  };

  const norm = (t) => (t === 'Product Catalog' ? 'Catalog' : t);
  const shown = useMemo(() => docs
    .filter(d => fam === 'All' || d.fam === fam)
    .filter(d => type === 'All' || d.type === norm(type) || d.type === type)
    .filter(d => !q || (d.title + ' ' + d.fam + ' ' + d.type).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : 0), [q, fam, type, sort]);

  const recent = docs.slice(0, 3);

  return (
    <>
      <Header current="resources" />
      <main>
        <PageHero kicker="Catalog" title="Technical document library"
          lead="Product catalogs, datasheets, bulletins and guides. Preview any document, then download the PDF. Sample titles are clearly marked until confirmed."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Resources', href: routes.resources }, { label: 'Catalog' }]}
          mediaId="catalog-hero" mediaPlaceholder="Documents visual" />

        <section className="section">
          <div className="wrap">
            {/* Featured catalog */}
            <div className="cat-feature">
              <div className="cat-feature__cover">
                {featured.coverAsset ? (
                  <img
                    src={featured.coverAsset}
                    alt={featured.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                  />
                ) : (
                  <image-slot id={'cat-feature-cover-' + featured.id} shape="rect" fit="cover" placeholder="Featured catalog cover" />
                )}
                <span className="resx__filetag">{featured.fileType || 'PDF'}</span>
              </div>
              <div className="cat-feature__body">
                <div className="kicker">FEATURED CATALOGS</div>
                <h2 className="cat-feature__t">{featured.title}</h2>
                <p className="cat-feature__d">
                  {featured.desc || `The current product document for the ${featured.fam} family. Preview the pages or download the PDF.`}
                </p>
                <dl className="pstage2__specs" style={{ maxWidth: '420px' }}>
                  <div><dt>Family</dt><dd>{featured.fam}</dd></div>
                  <div><dt>Updated</dt><dd>{featured.date}</dd></div>
                  <div><dt>Pages</dt><dd>{featured.pages}</dd></div>
                  <div><dt>File</dt><dd>{featured.fileType || 'PDF'} · {featured.size}</dd></div>
                </dl>
                <div className="cat-feature__actions">
                  {featured.pdfAsset ? (
                    <a className="ms-btn ms-btn--primary" href={featured.pdfAsset} target="_blank" rel="noopener noreferrer">
                      <Eye size={16} /> Preview catalog
                    </a>
                  ) : (
                    <button className="ms-btn ms-btn--primary" onClick={() => setDoc(featured)}>
                      <Eye size={16} /> Preview catalog
                    </button>
                  )}
                  {featured.pdfAsset ? (
                    <a className="ms-btn ms-btn--secondary" href={featured.pdfAsset} download>
                      <Download size={16} /> Download PDF
                    </a>
                  ) : (
                    <a className="ms-btn ms-btn--secondary" href="#" onClick={(e) => { e.preventDefault(); setDoc(featured); }}>
                      <Download size={16} /> Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Recently updated */}
            <div className="kicker" style={{ margin: '0 0 1rem' }}>Recently updated</div>
            <div className="cat-recent">
              {recent.map(d => (
                <button className="cat-recent__card" key={d.id} onClick={() => selectCatalogDoc(d)}>
                  <div className="cat-recent__thumb">
                    {d.coverAsset ? (
                      <img
                        src={d.coverAsset}
                        alt={d.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                      />
                    ) : (
                      <image-slot id={'cat-rec-' + d.id} shape="rect" fit="cover" placeholder={d.type} />
                    )}
                  </div>
                  <div className="cat-recent__type">{d.type}</div>
                  <div className="cat-recent__t">{d.title}</div>
                  <div className="cat-recent__m">Updated {d.date} · PDF · {d.size}</div>
                </button>
              ))}
            </div>

            {/* Search + filters */}
            <div className="cat-controls">
              <div className="cat-search">
                <Search size={17} />
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents" aria-label="Search documents" />
                {q && <button aria-label="Clear search" onClick={() => setQ('')}><X size={15} /></button>}
              </div>
              <button className="filt-toggle" onClick={() => setPanelOpen(p => !p)}><Sliders size={16} /> Filters</button>
              <div className={'cat-filters' + (panelOpen ? ' open' : '')}>
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
            </div>

            {/* Document list */}
            <div className="results__count" style={{ margin: '0 0 1rem' }}><b>{shown.length}</b> documents</div>
            <div className="doc-list">
              {shown.map(d => {
                const isSelected = d.slug === featured.slug;
                return (
                  <div
                    className={'doc-row' + (isSelected ? ' doc-row--selected' : '')}
                    key={d.id}
                    onClick={() => selectCatalogDoc(d)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') selectCatalogDoc(d); }}
                  >
                    <div className="doc-ic"><FileText size={20} /></div>
                    <div className="doc-main">
                      <div className="doc-main__t">{d.title}</div>
                      <div className="doc-main__m">
                        <span>{d.type}</span>
                        <span>Updated {d.date}</span>
                        <span>PDF · {d.size}</span>
                        <span>{d.pages} pages</span>
                      </div>
                    </div>
                    <span className="doc-fam">{d.fam}</span>
                    <div className="doc-actions">
                      <button
                        className="doc-mini"
                        aria-label="Preview"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectCatalogDoc(d);
                          if (!d.pdfAsset) setDoc(d);
                        }}
                      >
                        <Eye size={17} />
                      </button>
                      {d.pdfAsset ? (
                        <a
                          className="doc-mini"
                          aria-label="Download"
                          href={d.pdfAsset}
                          download
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={17} />
                        </a>
                      ) : (
                        <button
                          className="doc-mini"
                          aria-label="Download"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectCatalogDoc(d);
                            setDoc(d);
                          }}
                        >
                          <Download size={17} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              {shown.length === 0 && <p className="mx__empty" style={{ padding: '1.5rem' }}>No documents match. Try clearing the search or filters.</p>}
            </div>
            <div style={{ marginTop: '1.6rem' }}>
              <Link className="ms-btn ms-btn--outline" to={routes.enquiry({ intent: 'general' })}>Request a specific document <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <DocDrawer doc={doc} onClose={() => setDoc(null)} kind="catalog" />
      </main>
      <Footer />
    </>
  );
}
