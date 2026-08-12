/* Max-Seal — Document Preview. */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DOCS, FAMILIES } from '../data/data';
import { Download, ArrowRight, ArrowLeft, FileText, Headset } from '../icons/icons';
import { routes } from '../router/paths';

export default function DocumentPreview() {
  const { doc: docParam } = useParams();
  const id = docParam || DOCS[0].id;
  const doc = DOCS.find(d => d.id === id) || DOCS[0];
  const fam = FAMILIES.find(f => f.name === doc.fam);
  const related = DOCS.filter(d => d.id !== doc.id).slice(0, 3);
  const [page, setPage] = useState(0);
  const pages = Math.min(doc.pages || 3, 4);

  return (
    <>
      <Header current={null} />
      <main>
        <section className="page-hero page-hero--slim">
          <div className="page-hero__scrim" />
          <div className="wrap page-hero__inner" style={{ maxWidth: 'none' }}>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to={routes.home}>Home</Link><span className="sep">/</span>
              <Link to={routes.catalog()}>Catalog</Link><span className="sep">/</span><span className="cur">{doc.title}</span>
            </nav>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 'clamp(1.6rem,2.5vw,2.4rem)' }}>
          <div className="wrap docp">
            <div className="docp__viewer">
              <div className="docp__stage"><image-slot id={'docp-page-' + doc.id + '-' + page} shape="rect" fit="contain" placeholder={doc.title + ' · page ' + (page + 1)} /></div>
              <div className="docp__pager">
                <button className="cine__arrow cine__arrow--light" aria-label="Previous page" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}><ArrowLeft size={18} /></button>
                <span className="docp__pageno">Page {page + 1} of {pages}</span>
                <button className="cine__arrow cine__arrow--light" aria-label="Next page" onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={page === pages - 1}><ArrowRight size={18} /></button>
              </div>
              <p className="docp__fallback">If the preview does not load, download the PDF or open it in a new tab. Previews use a safe fallback rather than an embedded viewer.</p>
            </div>

            <aside className="docp__side">
              <div className="docp__card">
                <span className="docp__type">{doc.type}</span>
                <h1 className="docp__title">{doc.title}</h1>
                <table className="drawer__meta"><tbody>
                  <tr><th>Product family</th><td>{doc.fam}</td></tr>
                  <tr><th>Updated</th><td>{doc.date}</td></tr>
                  <tr><th>Version</th><td className="pl-mono">2025.1</td></tr>
                  <tr><th>Pages</th><td>{doc.pages}</td></tr>
                  <tr><th>File</th><td>PDF · {doc.size}</td></tr>
                </tbody></table>
                <div className="docp__actions">
                  <a className="ms-btn ms-btn--primary ms-btn--block" href="#"><Download size={16} /> Download PDF</a>
                  <a className="ms-btn ms-btn--outline ms-btn--block" href="#" target="_blank" rel="noopener">Open in new window</a>
                  <Link className="ms-btn ms-btn--outline ms-btn--block" to={routes.enquiry({ intent: 'general' })}><Headset size={15} /> Request help</Link>
                </div>
                {fam && <Link className="link-arrow docp__rel" to={routes.productDetail(fam.id)}>Related product: {fam.name} <ArrowRight size={15} /></Link>}
              </div>
              <div className="docp__card">
                <div className="kicker" style={{ marginBottom: '0.9rem' }}>Related documents</div>
                <div className="rlist">
                  {related.map(d => (
                    <Link className="rrow rrow--compact" key={d.id} to={routes.documentPreview(d.id)}>
                      <div className="rrow__thumb"><FileText size={18} /></div>
                      <div><div className="rrow__name" style={{ fontSize: '0.98rem' }}>{d.title}</div><div className="rrow__purpose">{d.type} · {d.date}</div></div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
