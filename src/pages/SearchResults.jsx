/* Max-Seal — Search Results. */
import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { FAMILIES, INDUSTRIES, DOCS, PRICE_LISTS } from '../data/data';
import { Search, X, ArrowRight } from '../icons/icons';
import { routes } from '../router/paths';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  // Build a lightweight search index across content types
  const index = useMemo(() => {
    const items = [];
    FAMILIES.forEach(f => items.push({ type: 'Product', title: f.name + ' Butterfly Valve', excerpt: f.short, href: routes.productDetail(f.id), date: '' }));
    INDUSTRIES.forEach(x => items.push({ type: 'Industry', title: x.name, excerpt: x.ctx, href: routes.industryDetail(x.id), date: '' }));
    DOCS.forEach(d => items.push({ type: 'Catalog', title: d.title, excerpt: d.type + ' · ' + d.fam, href: routes.catalog({ catalog: d.slug }), date: d.date }));
    PRICE_LISTS.forEach(p => items.push({ type: 'Price List', title: p.title, excerpt: 'Effective ' + p.effective + ' · ' + p.version, href: routes.priceLists, date: p.updated }));
    [['About Max-Seal', 'Company overview, history and leadership', routes.about], ['Global Partners', 'Worldwide distributor network', routes.partners], ['Contact', 'Reach the Max-Seal team', routes.contact], ['Marketing Resources', 'Approved sales and application materials', routes.marketing]]
      .forEach(([t, e, h]) => items.push({ type: 'Company', title: t, excerpt: e, href: h, date: '' }));
    return items;
  }, []);

  const initialQ = searchParams.get('q') || '';
  const [q, setQ] = useState(initialQ);
  const [ctype, setCtype] = useState('All');
  const types = ['All', 'Product', 'Industry', 'Catalog', 'Marketing', 'Price List', 'Company'];
  const matches = index.filter(i => (ctype === 'All' || i.type === ctype) && (!q || (i.title + ' ' + i.excerpt).toLowerCase().includes(q.toLowerCase())));
  const suggestions = ['Triple offset', 'PFA lined', 'Data centers', 'Catalog', 'Price list'];

  return (
    <>
      <Header current={null} />
      <main>
        <PageHero kicker="Search" title="Search results"
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Search' }]} />
        <section className="section">
          <div className="wrap">
            <div className="cat-search cat-search--lg">
              <Search size={19} />
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, industries, documents and pages" aria-label="Search the site" autoFocus />
              {q && <button aria-label="Clear search" onClick={() => setQ('')}><X size={16} /></button>}
            </div>

            <div className="srch-bar">
              <div className="results__count"><b>{matches.length}</b> result{matches.length === 1 ? '' : 's'}{q ? ' for "' + q + '"' : ''}</div>
              <div className="fchips" role="tablist" aria-label="Filter by content type">
                {types.map(t => <button key={t} role="tab" aria-selected={t === ctype} className={'fchip' + (t === ctype ? ' on' : '')} onClick={() => setCtype(t)}>{t}</button>)}
              </div>
            </div>

            {matches.length === 0 ? (
              <div className="srch-empty">
                <p>No results{q ? ' for "' + q + '"' : ''}. Try a different term.</p>
                <div className="srch-sugg">{suggestions.map(s => <button key={s} className="fchip" onClick={() => setQ(s)}>{s}</button>)}</div>
              </div>
            ) : (
              <div className="srch-list">
                {matches.map((m, i) => (
                  <Link className="srch-row" key={i} to={m.href}>
                    <span className="srch-type">{m.type}</span>
                    <div className="srch-main"><div className="srch-t">{m.title}</div><div className="srch-ex">{m.excerpt}</div>{m.date && <div className="srch-date">Updated {m.date}</div>}</div>
                    <span className="srch-arr"><ArrowRight size={18} /></span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
