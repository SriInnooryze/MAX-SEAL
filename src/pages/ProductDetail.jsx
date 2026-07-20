/* Max-Seal — Product Detail (reusable template). */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FAMILIES, DOCS, INDUSTRIES } from '../data/data';
import { ArrowRight, Headset, Download, FileText, Compass } from '../icons/icons';
import { routes } from '../router/paths';
import Tabs from '../components/ds/Tabs';
import SpecTable from '../components/ds/SpecTable';
import Badge from '../components/ds/Badge';

export default function ProductDetail() {
  const { family: familyParam } = useParams();
  const id = familyParam || FAMILIES[0].id;
  const f = FAMILIES.find(x => x.id === id) || FAMILIES[0];
  const related = FAMILIES.filter(x => x.id !== f.id).slice(0, 3);
  const relIndustries = INDUSTRIES.filter(x => x.families.includes(f.name)).slice(0, 4);
  const doc = DOCS.find(d => d.fam === f.name);
  const [shot, setShot] = useState(0);
  const shots = ['Primary view', 'Section view', 'In application'];

  const specRows = [
    ['Series', f.code], ['Size range', f.sizes], ['Pressure rating', f.rating],
    ['Typical application', f.application], ['Automation', f.automation.includes('actuated') ? 'Manual or actuated' : 'Manual'],
  ];
  const overview = (
    <div className="prose" style={{ maxWidth: '64ch' }}>
      <p style={{ fontSize: '1.1rem' }}>{f.short}</p>
      <p>{f.need} {f.where} The {f.name} family is supplied with options to suit your service condition. Talk to our team for sizing, seat and trim selection.</p>
    </div>
  );
  const tech = <SpecTable caption="Technical data" rows={specRows} />;
  const applications = (<div className="prose"><p>Typical applications include {f.application.toLowerCase()}. Material and seat options are matched to media and operating conditions.</p></div>);
  const materials = (
    <div className="prose" style={{ maxWidth: '64ch' }}>
      <table className="cmptable"><tbody>
        <tr><th>Body materials</th><td><span className="tbv">To be validated</span></td></tr>
        <tr><th>Seat or lining options</th><td><span className="tbv">To be validated</span></td></tr>
        <tr><th>Disc and stem</th><td><span className="tbv">To be validated</span></td></tr>
        <tr><th>Configurations</th><td><span className="tbv">To be validated</span></td></tr>
      </tbody></table>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--steel-500)', marginTop: '0.8rem' }}>Confirmed materials connect through the future CMS.</p>
    </div>
  );
  const documents = (
    <div className="rlist">
      {(doc ? [doc] : []).concat(DOCS.filter(d => d.type === 'Datasheet').slice(0, 2)).map((d, i) => (
        <div className="doc-row" key={i}>
          <div className="doc-ic"><FileText size={20} /></div>
          <div className="doc-main"><div className="doc-main__t">{d.title}</div><div className="doc-main__m"><span>{d.type}</span><span>Updated {d.date}</span><span>PDF · {d.size}</span></div></div>
          <span className="doc-fam">{d.fam}</span>
          <div className="doc-actions"><Link className="doc-mini" to={routes.catalog} aria-label="Download"><Download size={17} /></Link></div>
        </div>
      ))}
    </div>
  );
  const tabItems = [
    { id: 'overview', label: 'Overview', content: overview },
    { id: 'tech', label: 'Technical Data', content: tech },
    { id: 'applications', label: 'Applications', content: applications },
    { id: 'materials', label: 'Materials', content: materials },
    { id: 'documents', label: 'Documents', content: documents },
  ];

  return (
    <>
      <Header current="products" />
      <main>
        <section className="page-hero page-hero--slim">
          <div className="page-hero__scrim" />
          <div className="wrap page-hero__inner" style={{ maxWidth: 'none' }}>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link to={routes.home}>Home</Link><span className="sep">/</span>
              <Link to={routes.products()}>Products</Link><span className="sep">/</span><span className="cur">{f.name}</span>
            </nav>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 'clamp(2rem,3vw,3rem)' }}>
          <div className="wrap">
            <div className="pdet">
              {/* Gallery */}
              <div className="pdet__gallery">
                <div className="pdet__main"><image-slot id={'pd-media-' + f.id + '-' + shot} shape="rect" fit="cover" placeholder={f.name + ' · ' + shots[shot]} /><span className="feature__series">{f.code} SERIES</span></div>
                <div className="pdet__thumbs">
                  {shots.map((s, i) => (
                    <button key={i} className={'pdet__thumb' + (i === shot ? ' on' : '')} aria-label={s} aria-pressed={i === shot} onClick={() => setShot(i)}>
                      <image-slot id={'pd-thumb-' + f.id + '-' + i} shape="rect" fit="cover" placeholder={s} />
                    </button>
                  ))}
                </div>
              </div>
              {/* Summary */}
              <div className="pdet__head">
                <div style={{ marginBottom: '0.8rem' }}><Badge variant="primary">{f.code} Series</Badge></div>
                <h1 className="pdet__name">{f.name} Butterfly Valve</h1>
                <p className="pdet__purpose">{f.short}</p>
                <dl className="pstage2__specs" style={{ marginTop: '1.4rem' }}>
                  <div><dt>Size range</dt><dd>{f.sizes}</dd></div>
                  <div><dt>Pressure</dt><dd>{f.rating}</dd></div>
                  <div><dt>Typical</dt><dd>{f.application}</dd></div>
                  <div><dt>Automation</dt><dd>{f.automation.includes('actuated') ? 'Manual / Actuated' : 'Manual'}</dd></div>
                </dl>
                <div className="pdet__approvals">
                  <span className="pdet__appr-k">Approvals</span>
                  <span className="tbv">To be validated</span>
                </div>
                <div className="pdet__actions">
                  <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'pricing', product: f.id })}>Request a Quote <ArrowRight size={16} /></Link>
                  <Link className="ms-btn ms-btn--secondary" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask the Engineers</Link>
                </div>
                {relIndustries.length > 0 && (
                  <Link className="link-arrow pdet__relind" to={routes.industries({ family: f.id })}><Compass size={16} /> View related industries</Link>
                )}
              </div>
            </div>

            <div className="pdet__tabs">
              <Tabs items={tabItems} />
            </div>

            {relIndustries.length > 0 && (
              <div className="pdet__section">
                <div className="kicker" style={{ marginBottom: '1rem' }}>Where it is used</div>
                <div className="mx__appchips">
                  {relIndustries.map(x => <Link key={x.id} className="mx__appchip" to={routes.industryDetail(x.id)}>{x.name}</Link>)}
                </div>
              </div>
            )}

            <div className="pdet__section">
              <div className="kicker" style={{ marginBottom: '1.2rem' }}>Related products</div>
              <div className="rlist">
                {related.map(r => (
                  <Link key={r.id} className="rrow" to={routes.productDetail(r.id)}>
                    <div className="rrow__thumb"><image-slot id={'pd-rel-' + f.id + '-' + r.id} shape="rect" fit="cover" placeholder={r.code} /></div>
                    <div style={{ gridColumn: 'span 2' }}><div className="rrow__name">{r.name}</div><div className="rrow__purpose">{r.need}</div></div>
                    <span className="rrow__meta" style={{ color: 'var(--azure-700)' }}><ArrowRight size={18} /></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
