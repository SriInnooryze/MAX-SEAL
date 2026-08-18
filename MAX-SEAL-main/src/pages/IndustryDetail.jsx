/* Max-Seal — Industry Detail (reusable template, one representative sample). */
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { INDUSTRIES, FAMILIES, APP_NEEDS, PROOF } from '../data/data';
import { ArrowRight, Headset, FileText, Compass } from '../icons/icons';
import { routes } from '../router/paths';

export default function IndustryDetail() {
  const { id: idParam } = useParams();
  const id = idParam || INDUSTRIES[0].id;
  const ind = INDUSTRIES.find(x => x.id === id) || INDUSTRIES[0];
  const famObjs = ind.families.map(n => FAMILIES.find(f => f.name === n)).filter(Boolean);
  const indFams = FAMILIES.filter(f => f.industries.includes(ind.id));
  const needs = APP_NEEDS.filter(a => indFams.some(f => f.apps.includes(a.id) || f.service.includes(a.id))).slice(0, 5);
  const challenges = [
    { k: 'Service condition', v: 'Match seat, trim and body materials to the media and operating window.' },
    { k: 'Reliability', v: 'Support dependable isolation and control across the duty cycle.' },
    { k: 'Maintenance', v: 'Keep selection practical to install, operate and service.' },
  ];

  return (
    <main>
        <PageHero kicker="Industry" title={ind.name} lead={ind.ctx}
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Industries', href: routes.industries() }, { label: ind.name }]}
          mediaId={'inddetail-' + ind.id} mediaSrc={ind.image} mediaPlaceholder={ind.name + ' application visual'} />

        <section className="section">
          <div className="wrap idet">
            <div className="idet__main">
              <div className="kicker">Industry overview</div>
              <h2 className="idet__h">Where Max-Seal valves fit in {ind.name.toLowerCase()}</h2>
              <p className="idet__p">{ind.ctx}</p>
              <p className="idet__p">Our team can help match seat, trim and body materials to the media and operating conditions in your {ind.name.toLowerCase()} application.</p>

              <div className="idet__sub">Operating challenges</div>
              <div className="idet__chal">
                {challenges.map(c => (
                  <div className="idet__chalrow" key={c.k}><div className="idet__chalk">{c.k}</div><div className="idet__chalv">{c.v}</div></div>
                ))}
              </div>

              <div className="idet__sub">Typical application areas</div>
              <div className="idet__needs">
                {needs.map(n => <Link key={n.id} className="idet__need" to={routes.products({ industry: ind.id, application: n.id })}>{n.l}</Link>)}
              </div>

              {/* Featured story placeholder (CMS-ready) */}
              <div className="idet__story">
                <div className="idet__story-media"><image-slot id={'idet-story-' + ind.id} shape="rect" fit="cover" src={ind.image} placeholder="Project or application photo" /><span className="proofx__badge">{PROOF.type}</span></div>
                <div className="idet__story-body">
                  <div className="idet__story-k">Featured story · placeholder</div>
                  <h3 className="idet__story-t">{PROOF.title}</h3>
                  <p className="idet__story-s">{PROOF.summary}</p>
                  <a className="link-arrow" href="#">View story <ArrowRight size={15} /></a>
                </div>
              </div>
            </div>

            <aside className="idet__rail">
              <div className="idet__railcard">
                <div className="kicker" style={{ marginBottom: '1rem' }}>Related product families</div>
                <div className="rlist">
                  {famObjs.map(f => (
                    <Link key={f.id} className="rrow rrow--compact" to={routes.productDetail(f.id)}>
                      <div className="rrow__thumb"><image-slot id={'inddet-fam-' + ind.id + '-' + f.id} src={f.image} shape="rect" fit="contain" placeholder={f.code} /></div>
                      <div><div className="rrow__name">{f.name}</div><div className="rrow__purpose">{f.need}</div></div>
                      <span className="rrow__meta" style={{ color: 'var(--azure-700)' }}><ArrowRight size={18} /></span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="idet__railcard">
                <div className="kicker" style={{ marginBottom: '0.9rem' }}>Documents</div>
                <Link className="idet__doc" to={routes.catalog()}><FileText size={17} /> Catalog and datasheets</Link>
                <Link className="idet__doc" to={routes.resources}><FileText size={17} /> Marketing resources</Link>
              </div>
              <div className="idet__railcta">
                <h4>Specifying for {ind.name.toLowerCase()}?</h4>
                <Link className="ms-btn ms-btn--primary ms-btn--block" to={routes.enquiry({ intent: 'pricing' })}>Request a Quote <ArrowRight size={16} /></Link>
                <Link className="ms-btn ms-btn--outline ms-btn--block" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask a technical question</Link>
                <Link className="link-arrow" to={routes.industries()}><Compass size={16} /> Back to the matrix</Link>
              </div>
            </aside>
          </div>
        </section>
    </main>
  );
}
