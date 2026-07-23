/* Max-Seal — Industries matrix.
   Level 1 industry  ·  Level 2 application need  ·  Level 3 families
   Click to lock. Hover only previews. Nothing auto-cycles. */
import { useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { INDUSTRIES, FAMILIES, APP_NEEDS, HERO_INDUSTRY_IMAGE } from '../data/data';
import { ArrowRight, Headset, Compass, ChevronRight, Layers } from '../icons/icons';
import { routes } from '../router/paths';

export default function Industries() {
  useSiteChrome();
  const [searchParams] = useSearchParams();
  const qp = (name) => searchParams.get(name);

  const indFamilies = (ind) => FAMILIES.filter(f => f.industries.includes(ind.id));
  const appsForInd = (ind) => { const fams = indFamilies(ind); return APP_NEEDS.filter(a => fams.some(f => f.apps.includes(a.id) || f.service.includes(a.id))); };
  const famsForApp = (ind, appId) => indFamilies(ind).filter(f => f.apps.includes(appId) || f.service.includes(appId));

  // seed from cross-nav: ?family= highlights an industry that uses it; ?industry= selects directly
  const seedInd = () => {
    const indParam = qp('industry'); if (indParam && INDUSTRIES.find(x => x.id === indParam)) return indParam;
    const fam = qp('family'); if (fam) { const f = FAMILIES.find(x => x.id === fam); if (f) { const hit = INDUSTRIES.find(x => x.families.includes(f.name)); if (hit) return hit.id; } }
    return INDUSTRIES[0].id;
  };
  const highlightFam = (() => { const fam = qp('family'); const f = fam && FAMILIES.find(x => x.id === fam); return f ? f.name : null; })();

  const [activeInd, setActiveInd] = useState(seedInd);
  const [activeApp, setActiveApp] = useState(null);
  const workspaceRef = useRef(null);

  const ind = INDUSTRIES.find(x => x.id === activeInd) || INDUSTRIES[0];
  const apps = appsForInd(ind);
  const fams = activeApp ? famsForApp(ind, activeApp) : indFamilies(ind);
  const appObj = APP_NEEDS.find(a => a.id === activeApp);

  const selectInd = (id) => { setActiveInd(id); setActiveApp(null); };
  const exploreHref = routes.products({ industry: ind.id, application: activeApp || undefined });

  return (
    <>
      <Header current="industries" />
      <main>
        <PageHero kicker="Industries and Applications"
          title="Explore the operating environments behind every valve decision"
          lead="Select an industry, application need, or operating condition to explore the Max-Seal product families connected to that requirement."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Industries' }]}
          mediaId="industries-hero" mediaSrc={HERO_INDUSTRY_IMAGE} mediaPlaceholder="Industrial application visual">
          <div className="phero__actions">
            <button className="ms-btn ms-btn--primary ms-btn--lg" onClick={() => workspaceRef.current && workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Explore the Matrix <ArrowRight size={16} /></button>
            <Link className="ms-btn ms-btn--on-dark ms-btn--lg" to={routes.enquiry({ intent: 'technical' })}>Ask a Technical Question</Link>
          </div>
        </PageHero>

        <section className="section" ref={workspaceRef}>
          <div className="wrap">
            <div className="mx__intro">
              <p>Every industry runs to different pressures, media and service conditions. Pick an industry, then narrow by the application need to see the Max-Seal families that fit, with a path straight to products or an enquiry.</p>
            </div>
            <div className="mx__steps">
              <span className="mx__step on"><b>1</b> Choose an industry</span>
              <ChevronRight size={16} />
              <span className={'mx__step' + (apps.length ? ' on' : '')}><b>2</b> Choose an application need</span>
              <ChevronRight size={16} />
              <span className={'mx__step' + (activeApp ? ' on' : '')}><b>3</b> View product families</span>
            </div>

            <div className="mx">
              {/* Level 1 — industries */}
              <div className="mx__col mx__col--ind">
                <div className="mx__coltitle">Industry</div>
                <div className="mx__list" role="tablist" aria-label="Industries">
                  {INDUSTRIES.map(x => (
                    <button key={x.id} role="tab" aria-selected={x.id === activeInd}
                      className={'mx__ind' + (x.id === activeInd ? ' on' : '')} onClick={() => selectInd(x.id)}>
                      <span className="mx__ind-bar" />
                      <span className="mx__ind-name">{x.name}</span>
                      <span className="mx__ind-arr"><ChevronRight size={16} /></span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Center — media stage + Level 2 applications */}
              <div className="mx__col mx__col--stage">
                <div className="mx__media">
                  {INDUSTRIES.map(x => (
                    <div key={x.id} className={'mx__img' + (x.id === activeInd ? ' on' : '')} aria-hidden={x.id !== activeInd}>
                      <image-slot id={'mx-ind-' + x.id} shape="rect" fit="cover" src={x.image} placeholder={x.name + ' application image'} />
                    </div>
                  ))}
                  <div className="mx__media-scrim" />
                  <div className="mx__media-cap" key={ind.id}>
                    <div className="mx__media-k">Industry</div>
                    <div className="mx__media-name">{ind.name}</div>
                  </div>
                </div>
                <div className="mx__apps">
                  <div className="mx__coltitle">Application need <span className="mx__hint">select to refine</span></div>
                  <div className="mx__appchips" role="tablist" aria-label="Application needs">
                    <button role="tab" aria-selected={!activeApp} className={'mx__appchip' + (!activeApp ? ' on' : '')} onClick={() => setActiveApp(null)}>All needs</button>
                    {apps.map(a => (
                      <button key={a.id} role="tab" aria-selected={a.id === activeApp} className={'mx__appchip' + (a.id === activeApp ? ' on' : '')} onClick={() => setActiveApp(a.id === activeApp ? null : a.id)}>{a.l}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Level 3 — story panel + relevant families */}
              <div className="mx__col mx__col--panel">
                <div className="mx__panel" key={ind.id + (activeApp || '')}>
                  <div className="mx__panel-k">{ind.name}{appObj ? ' · ' + appObj.l : ''}</div>
                  <p className="mx__panel-ctx">{appObj ? appObj.ctx : ind.ctx}</p>
                  <div className="mx__panel-fams-k"><Layers size={15} /> Relevant product families</div>
                  <div className="mx__fams">
                    {fams.map(f => (
                      <Link key={f.id} className={'mx__fam' + (highlightFam === f.name ? ' hot' : '')} to={routes.productDetail(f.id)}>
                        <span className="mx__fam-code">{f.code}</span>
                        <span className="mx__fam-body"><span className="mx__fam-name">{f.name}</span><span className="mx__fam-need">{f.need}</span></span>
                        <span className="mx__fam-arr"><ArrowRight size={16} /></span>
                      </Link>
                    ))}
                    {fams.length === 0 && <p className="mx__empty">No families mapped to this combination yet. Ask our team for guidance.</p>}
                  </div>
                  <div className="mx__panel-actions">
                    <Link className="ms-btn ms-btn--primary ms-btn--sm" to={exploreHref}>Explore related products <ArrowRight size={15} /></Link>
                    <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.enquiry({ intent: 'pricing' })}>Request a Quote</Link>
                  </div>
                  <Link className="link-arrow mx__panel-ask" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask a technical question</Link>
                  <Link className="link-arrow" to={routes.industryDetail(ind.id)}><Compass size={16} /> Full {ind.name} overview</Link>
                </div>
              </div>
            </div>

            <div className="mx__next">
              <div>
                <h3>Found the environment that matches yours?</h3>
                <p>Continue to the full product range, or send your operating conditions to our team for a recommendation.</p>
              </div>
              <div className="mx__next-actions">
                <Link className="ms-btn ms-btn--primary" to={exploreHref}>Continue to products <ArrowRight size={16} /></Link>
                <Link className="ms-btn ms-btn--outline" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask a technical question</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
