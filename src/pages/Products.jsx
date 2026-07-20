/* Max-Seal — Products page.
   Two clear paths after the hero: Help Me Choose (a two-step guided journey)
   or Browse All Products. Both land on a clean match-results view with a
   Featured / List toggle, advanced filters tucked behind Refine Results, and a
   Compare tray that only appears once the first product is selected. */
import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { FAMILIES, FACETS, DOCS } from '../data/data';
import * as Icons from '../icons/icons';
import { Check, X, ArrowRight, ArrowLeft, Headset, Scale, Plus, Compass, ChevronDown, Sliders, Layers } from '../icons/icons';
import { routes } from '../router/paths';

const FACET_TO_FIELD = { types: 'types', apps: 'apps', industries: 'industries', service: 'service', automation: 'automation' };
const EMPTY_SEL = () => ({ types: [], apps: [], industries: [], service: [], automation: [] });

/* Step 1 — what the customer needs the valve to do (plain language). */
const GOALS = [
  { id: 'isolation', t: 'General isolation', d: 'For everyday shutoff and control requirements.', icon: 'Gauge', sel: { apps: ['isolation'] } },
  { id: 'control', t: 'Control flow', d: 'For regulating and throttling flow, not just stopping it.', icon: 'Sliders', sel: { apps: ['control'] } },
  { id: 'demanding', t: 'Handle demanding service', d: 'For higher pressure, temperature or severe duty.', icon: 'Layers', sel: { service: ['high-pressure', 'severe'] } },
  { id: 'corrosive', t: 'Work with corrosive media', d: 'For aggressive or corrosive process media.', icon: 'Compass', sel: { apps: ['corrosive'] } },
  { id: 'automate', t: 'Support automated operation', d: 'For actuated valves and control system integration.', icon: 'Settings', sel: { automation: ['actuated'] } },
  { id: 'unsure', t: 'I am not sure', d: 'See the full range with guidance along the way.', icon: 'Info', sel: {} },
];

/* Step 2 — where it will be used (top-level groupings, not all 13 industries). */
const PLACES = [
  { id: 'process', t: 'Process industries', d: 'Petrochemical, chemical, pulp and paper.', sel: ['petrochemical', 'chemical', 'pulp-paper'] },
  { id: 'energy', t: 'Energy and refining', d: 'Oil and gas, refining and power.', sel: ['oil-gas', 'refining', 'power'] },
  { id: 'water', t: 'Water, HVAC and infrastructure', d: 'Data centers, HVAC and building services.', sel: ['data-centers', 'hvac'] },
  { id: 'food', t: 'Food and life sciences', d: 'Food and beverage and pharmaceuticals.', sel: ['food-beverage', 'pharma'] },
  { id: 'marine', t: 'Marine and transportation', d: 'Marine, transportation and mining.', sel: ['marine', 'transportation', 'mining'] },
  { id: 'general', t: 'General industrial use', d: 'Broad utility and general plant service.', sel: [] },
  { id: 'unsure', t: 'I am not sure', d: 'Skip this and see all matching families.', sel: [] },
];

/* Advanced filter groups shown only inside Refine. Uses validated facet data. */
const ADV_FACET_IDS = ['apps', 'service', 'automation', 'types', 'industries'];

export default function Products() {
  useSiteChrome();
  const [searchParams] = useSearchParams();
  const qpP = (name) => searchParams.get(name);

  // Seed from URL (cross-navigation from Industries / Home goes straight to results)
  const seedAdv = () => {
    const s = EMPTY_SEL();
    const ind = qpP('industry'); if (ind) s.industries = [ind];
    const app = qpP('application'); if (app) { if (['isolation', 'control', 'corrosive', 'severe', 'shutoff'].includes(app)) s.apps = [app]; else if (['high-pressure', 'high-temp', 'cycling', 'low-pressure', 'clean'].includes(app)) s.service = [app]; }
    const type = qpP('type'); if (type) s.types = [type];
    return s;
  };
  const hasSeed = !!(qpP('industry') || qpP('application') || qpP('type') || qpP('family') || qpP('story'));

  const [phase, setPhase] = useState(hasSeed ? 'results' : 'choose'); // choose · q1 · q2 · results
  const [goal, setGoal] = useState(null);
  const [place, setPlace] = useState(null);
  const [adv, setAdv] = useState(seedAdv);          // applied advanced filters
  const [advDraft, setAdvDraft] = useState(seedAdv); // working copy inside refine
  const [view, setView] = useState('featured');      // featured · list
  const [compare, setCompare] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [refineOpen, setRefineOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);   // step 2 "refine with more details"
  const [trayOpen, setTrayOpen] = useState(false);   // mobile compare sheet expanded
  const [toast, setToast] = useState('');
  const topRef = useRef(null);
  const toastT = useRef(null);

  const goalObj = GOALS.find(g => g.id === goal);
  const placeObj = PLACES.find(p => p.id === place);

  // Effective selection = goal + place + applied advanced filters (union per facet)
  const sel = useMemo(() => {
    const s = EMPTY_SEL();
    if (goalObj && goalObj.sel) Object.keys(goalObj.sel).forEach(k => { s[k] = [...goalObj.sel[k]]; });
    if (placeObj && placeObj.sel.length) s.industries = [...placeObj.sel];
    Object.keys(adv).forEach(k => adv[k].forEach(v => { if (!s[k].includes(v)) s[k].push(v); }));
    return s;
  }, [goal, place, adv]);

  const matchFam = (fam) => Object.keys(sel).every(facet => {
    const chosen = sel[facet]; if (!chosen.length) return true;
    const field = fam[FACET_TO_FIELD[facet]] || [];
    return chosen.some(v => field.includes(v));
  });
  const results = useMemo(() => FAMILIES.filter(matchFam), [sel]);

  const docFor = (fam) => DOCS.find(d => d.fam === fam.name);
  const facetLabel = (facetId, v) => { const f = FACETS.find(x => x.id === facetId); const o = f && f.options.find(o => o.v === v); return o ? o.l : v; };

  const showToast = (msg) => { setToast(msg); clearTimeout(toastT.current); toastT.current = setTimeout(() => setToast(''), 2200); };
  const toggleCompare = (id) => setCompare(c => {
    if (c.includes(id)) { showToast('Removed from compare'); return c.filter(x => x !== id); }
    if (c.length >= 3) { showToast('Compare holds up to 3 products'); return c; }
    showToast('Added ' + FAMILIES.find(x => x.id === id).name + ' to compare');
    return [...c, id];
  });

  const scrollTop = () => requestAnimationFrame(() => { if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  const go = (p) => { setPhase(p); scrollTop(); };

  // Journey controls
  const startGuided = () => { setGoal(null); setPlace(null); setAdv(EMPTY_SEL()); setAdvDraft(EMPTY_SEL()); go('q1'); };
  const browseAll = () => { setGoal(null); setPlace(null); setAdv(EMPTY_SEL()); setAdvDraft(EMPTY_SEL()); go('results'); };
  const startOver = () => { setGoal(null); setPlace(null); setAdv(EMPTY_SEL()); setAdvDraft(EMPTY_SEL()); setRefineOpen(false); setMoreOpen(false); go('choose'); };
  const toResultsFromStep2 = () => { setAdv(advDraft); go('results'); }; // apply step-2 refinements

  // Advanced filter editing (draft only; applied via Apply)
  const toggleDraft = (facet, v) => setAdvDraft(s => {
    const cur = s[facet]; const next = cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v];
    return { ...s, [facet]: next };
  });
  const applyFilters = () => { setAdv(advDraft); };
  const clearFilters = () => { setAdv(EMPTY_SEL()); setAdvDraft(EMPTY_SEL()); };
  const advCount = Object.values(adv).reduce((n, a) => n + a.length, 0);

  // "Your selections" chips
  const chips = [];
  if (goalObj) chips.push({ key: 'goal', label: goalObj.t, onRemove: () => setGoal(null) });
  if (placeObj && placeObj.sel.length) chips.push({ key: 'place', label: placeObj.t, onRemove: () => setPlace(null) });
  Object.keys(adv).forEach(facet => adv[facet].forEach(v => chips.push({
    key: facet + '-' + v, label: facetLabel(facet, v),
    onRemove: () => { const nx = { ...adv, [facet]: adv[facet].filter(x => x !== v) }; setAdv(nx); setAdvDraft(nx); },
  })));

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setShowCompare(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* ---------- Reusable pieces ---------- */
  const PickTile = ({ on, title, desc, onClick, IconC }) => (
    <button type="button" className={'pick' + (on ? ' on' : '')} aria-pressed={on} onClick={onClick}>
      <span className="pick__check">{on ? <Check size={18} /> : (IconC ? <IconC size={20} /> : <Plus size={16} />)}</span>
      <span className="pick__body">
        <span className="pick__t">{title}</span>
        <span className="pick__d">{desc}</span>
      </span>
    </button>
  );

  const Stepper = ({ active }) => (
    <ol className="jsteps" aria-label="Selection progress">
      {[['1', 'What you need'], ['2', 'Where it is used'], ['3', 'Your matches']].map(([n, l]) => {
        const ni = +n; const state = active > ni ? 'done' : active === ni ? 'on' : '';
        return (
          <li key={n} className={'jstep' + (state ? ' ' + state : '')}>
            <span className="jstep__n">{active > ni ? <Check size={14} /> : n}</span>
            <span className="jstep__l">{l}</span>
          </li>
        );
      })}
    </ol>
  );

  const AdvancedFilters = () => (
    <div className="advfields">
      {ADV_FACET_IDS.map(fid => {
        const f = FACETS.find(x => x.id === fid);
        return (
          <div className="advgroup" key={fid}>
            <div className="advgroup__lbl">{f.label}</div>
            <div className="fchips">
              {f.options.map(o => {
                const on = advDraft[fid].includes(o.v);
                return (
                  <button key={o.v} type="button" className={'fchip' + (on ? ' on' : '')} aria-pressed={on} onClick={() => toggleDraft(fid, o.v)}>
                    {on && <Check size={13} />}{o.l}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  /* Compare on/off control with a clear, fully clickable label (PART 7). */
  const CompareToggle = ({ id, block }) => {
    const on = compare.includes(id);
    return (
      <button type="button" className={'cmpcheck' + (on ? ' on' : '') + (block ? ' cmpcheck--block' : '')} aria-pressed={on}
        onClick={(e) => { e.stopPropagation(); toggleCompare(id); }}>
        <span className="cmpcheck__box">{on && <Check size={13} />}</span>
        <span className="cmpcheck__lbl">{on ? 'Added to Compare' : 'Add to Compare'}</span>
      </button>
    );
  };

  const ResultCard = (r) => (
    <article className="pcard" key={r.id}>
      <div className="pcard__media">
        <image-slot id={'pcard-' + r.id} shape="rect" fit="cover" placeholder={r.name + ' image'} />
        <span className="pcard__series">{r.code} SERIES</span>
      </div>
      <div className="pcard__body">
        <div className="pcard__fit">
          <span className="pcard__fitk">Why it may fit</span>
          <p>{r.need}</p>
        </div>
        <h3 className="pcard__name">{r.name} Butterfly Valve</h3>
        <p className="pcard__desc">{r.short}</p>
        <div className="pcard__apps"><span className="pcard__appk">Typical applications</span> {r.application}</div>
        <div className="pcard__actions">
          <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.productDetail(r.id)}>View Product <ArrowRight size={15} /></Link>
          <CompareToggle id={r.id} />
          <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.enquiry({ intent: 'pricing', product: r.id })}>Request a Quote</Link>
        </div>
      </div>
    </article>
  );

  const compareActive = compare.length > 0;

  return (
    <>
      <Header current="products" />
      <main>
        <PageHero
          kicker="Product Range"
          title="Find the right valve for your application"
          lead="Start with what you need. We will help you narrow the Max-Seal product families that may be relevant."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Products' }]}
          mediaId="products-hero" mediaPlaceholder="Product range visual">
          <div className="phero__actions">
            <button className="ms-btn ms-btn--primary ms-btn--lg" onClick={startGuided}>Start Product Selection <ArrowRight size={16} /></button>
            <button className="ms-btn ms-btn--on-dark ms-btn--lg" onClick={browseAll}>View All Products</button>
          </div>
        </PageHero>

        <section className="section" ref={topRef} style={compareActive ? { paddingBottom: '7.5rem' } : undefined}>
          <div className="wrap">

            {/* OPENING — two paths */}
            {phase === 'choose' && (
              <div className="paths" key="choose">
                <button type="button" className="path" onClick={startGuided}>
                  <span className="path__ic"><Compass size={26} /></span>
                  <span className="path__t">Help Me Choose</span>
                  <span className="path__d">Answer two simple questions and view product families that may fit your requirement.</span>
                  <span className="path__go">Start <ArrowRight size={16} /></span>
                </button>
                <button type="button" className="path" onClick={browseAll}>
                  <span className="path__ic"><Layers size={26} /></span>
                  <span className="path__t">Browse All Products</span>
                  <span className="path__d">Explore the full Max-Seal valve range directly.</span>
                  <span className="path__go">Browse <ArrowRight size={16} /></span>
                </button>
              </div>
            )}

            {/* STEP 1 — what you need */}
            {phase === 'q1' && (
              <div className="jpanel" key="q1">
                <Stepper active={1} />
                <div className="jpanel__head">
                  <div className="kicker kicker--plain">Step 1 of 2</div>
                  <h2 className="jpanel__h">What do you need the valve to do?</h2>
                  <p className="jpanel__lead">Choose the closest fit. This is a starting point and you can change it at any time.</p>
                </div>
                <div className="pick-grid">
                  {GOALS.map(g => <PickTile key={g.id} on={goal === g.id} title={g.t} desc={g.d} IconC={Icons[g.icon]} onClick={() => setGoal(g.id)} />)}
                </div>
                <div className="jnav">
                  <button className="ms-btn ms-btn--outline" onClick={() => go('choose')}><ArrowLeft size={16} /> Back</button>
                  <div className="jnav__spacer" />
                  <button className="ms-btn ms-btn--primary" disabled={!goal} onClick={() => go('q2')}>Continue <ArrowRight size={16} /></button>
                </div>
                <button className="jnav__skip" onClick={browseAll}>Skip and view all products</button>
              </div>
            )}

            {/* STEP 2 — where it is used */}
            {phase === 'q2' && (
              <div className="jpanel" key="q2">
                <Stepper active={2} />
                <div className="jpanel__head">
                  <div className="kicker kicker--plain">Step 2 of 2</div>
                  <h2 className="jpanel__h">Where will it be used?</h2>
                  <p className="jpanel__lead">Pick the closest environment. This is optional and helps sharpen your matches.</p>
                </div>
                <div className="pick-grid">
                  {PLACES.map(p => <PickTile key={p.id} on={place === p.id} title={p.t} desc={p.d} onClick={() => setPlace(p.id)} />)}
                </div>

                <div className={'more' + (moreOpen ? ' open' : '')}>
                  <button type="button" className="more__toggle" aria-expanded={moreOpen} onClick={() => setMoreOpen(o => !o)}>
                    <Sliders size={16} /> Refine with more details <ChevronDown size={16} />
                  </button>
                  {moreOpen && (
                    <div className="more__body">
                      <p className="more__hint">All optional. Add only the criteria you are sure about.</p>
                      <AdvancedFilters />
                    </div>
                  )}
                </div>

                <div className="jnav">
                  <button className="ms-btn ms-btn--outline" onClick={() => go('q1')}><ArrowLeft size={16} /> Back</button>
                  <div className="jnav__spacer" />
                  <button className="ms-btn ms-btn--ghost ms-btn--sm jnav__restart" onClick={startOver}>Start over</button>
                  <button className="ms-btn ms-btn--primary" onClick={toResultsFromStep2}>See matches <ArrowRight size={16} /></button>
                </div>
                <button className="jnav__skip" onClick={browseAll}>Skip and view all products</button>
              </div>
            )}

            {/* RESULTS */}
            {phase === 'results' && (
              <div className="results" key="results">
                {chips.length > 0 && (
                  <div className="selrow">
                    <span className="selrow__lbl">Your selections</span>
                    <div className="selchips">
                      {chips.map(c => (
                        <span className="selchip" key={c.key}>
                          {c.label}
                          <button type="button" className="selchip__x" aria-label={'Remove ' + c.label} onClick={c.onRemove}><X size={12} /></button>
                        </span>
                      ))}
                      <button type="button" className="selchip__clear" onClick={startOver}>Clear all</button>
                    </div>
                  </div>
                )}

                <div className="matchsum">
                  <h2 className="matchsum__count">{results.length} product {results.length === 1 ? 'family' : 'families'} may be relevant</h2>
                  <p className="matchsum__note">These results are based on the needs you selected. Review the product details or ask our team for guidance.</p>
                </div>

                <div className="resbar">
                  <button className="ms-btn ms-btn--outline ms-btn--sm" onClick={startOver}><ArrowLeft size={15} /> Start Over</button>
                  <div className="resbar__spacer" />
                  <div className="viewtoggle" role="tablist" aria-label="Result view">
                    <button role="tab" aria-selected={view === 'featured'} className={view === 'featured' ? 'on' : ''} onClick={() => setView('featured')}>Featured</button>
                    <button role="tab" aria-selected={view === 'list'} className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>List</button>
                  </div>
                </div>

                {/* Refine Results — advanced filters, collapsed by default */}
                <div className={'refine' + (refineOpen ? ' open' : '')}>
                  <button type="button" className="refine__toggle" aria-expanded={refineOpen} onClick={() => setRefineOpen(o => !o)}>
                    <Sliders size={16} /> Refine Results {advCount ? '(' + advCount + ' applied)' : ''} <ChevronDown size={16} />
                  </button>
                  {refineOpen && (
                    <div className="refine__body">
                      <AdvancedFilters />
                      <div className="refine__foot">
                        <button className="ms-btn ms-btn--primary ms-btn--sm" onClick={applyFilters}>Apply Filters</button>
                        <button className="ms-btn ms-btn--outline ms-btn--sm" onClick={clearFilters} disabled={!advCount && !Object.values(advDraft).some(a => a.length)}>Clear Filters</button>
                      </div>
                    </div>
                  )}
                </div>

                {results.length === 0 ? (
                  <div className="rempty">
                    <p>No families match every selection. Try removing a filter, or ask our team to help with your selection.</p>
                    <div className="rempty__actions">
                      <button className="ms-btn ms-btn--outline ms-btn--sm" onClick={startOver}>Start over</button>
                      <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask a technical question</Link>
                    </div>
                  </div>
                ) : view === 'featured' ? (
                  <div className="resgrid">{results.map(ResultCard)}</div>
                ) : (
                  <div className="rlist">
                    {results.map(r => {
                      const on = compare.includes(r.id);
                      return (
                        <div key={r.id} className={'rrow' + (on ? ' cmp' : '')}>
                          <div className="rrow__thumb"><image-slot id={'rrow-' + r.id} shape="rect" fit="cover" placeholder={r.code} /></div>
                          <div className="rrow__main">
                            <div className="rrow__name">{r.name}</div>
                            <div className="rrow__purpose">{r.need}</div>
                            <div className="rrow__meta">{r.sizes} · {r.rating}</div>
                          </div>
                          <div className="rrow__actions">
                            <CompareToggle id={r.id} />
                            <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.productDetail(r.id)}>View Product</Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Compare tray — only appears after the first product is selected */}
        {compareActive && (
          <div className={'cmptray' + (trayOpen ? ' cmptray--open' : '')} role="region" aria-label="Compare tray">
            <div className="wrap cmptray__inner">
              <button type="button" className="cmptray__handle" aria-expanded={trayOpen} aria-label={trayOpen ? 'Collapse compare tray' : 'Expand compare tray'} onClick={() => setTrayOpen(o => !o)}>
                <Scale size={16} />
                <b>{compare.length} product{compare.length > 1 ? 's' : ''} selected</b>
                <ChevronDown size={16} className="cmptray__chev" />
              </button>
              <div className="cmptray__items">
                {compare.map(id => { const f = FAMILIES.find(x => x.id === id); return (
                  <span className="cmptray__item" key={id}>
                    {f.name}
                    <button type="button" aria-label={'Remove ' + f.name} onClick={() => toggleCompare(id)}><X size={13} /></button>
                  </span>
                ); })}
                {compare.length < 3 && <span className="cmptray__hint">Add another product to compare</span>}
              </div>
              <div className="cmptray__actions">
                <button className="ms-btn ms-btn--ghost ms-btn--sm cmptray__clear" onClick={() => setCompare([])}>Clear</button>
                <button className="ms-btn ms-btn--primary ms-btn--sm" onClick={() => setShowCompare(true)} disabled={compare.length < 2}>Compare Now</button>
              </div>
            </div>
          </div>
        )}

        {/* Compare modal */}
        <div className={'cmpmodal-scrim' + (showCompare ? ' open' : '')} onClick={() => setShowCompare(false)} />
        <div className={'cmpmodal' + (showCompare ? ' open' : '')} role="dialog" aria-modal="true" aria-label="Compare products">
          <div className="cmpmodal__head">
            <span className="cmpmodal__lbl">Compare · {compare.length} product{compare.length > 1 ? 's' : ''}</span>
            <button className="drawer__close" aria-label="Close comparison" onClick={() => setShowCompare(false)}><X size={18} /></button>
          </div>
          <div className="cmpmodal__scroll">
            <table className="cmptable">
              <thead>
                <tr>
                  <th scope="col">Product Family</th>
                  {compare.map(id => { const f = FAMILIES.find(x => x.id === id); return (
                    <th key={id} scope="col">
                      <span className="cmptable__thumb"><image-slot id={'cmp-h-' + id} shape="rect" fit="cover" placeholder={f.code} /></span>
                      {f.name}
                    </th>
                  ); })}
                </tr>
              </thead>
              <tbody>
                <tr><th scope="row">Best Suited For</th>{compare.map(id => <td key={id}>{FAMILIES.find(f => f.id === id).need}</td>)}</tr>
                <tr><th scope="row">Typical Applications</th>{compare.map(id => <td key={id}>{FAMILIES.find(f => f.id === id).application}</td>)}</tr>
                <tr><th scope="row">Automation Availability</th>{compare.map(id => <td key={id}>{FAMILIES.find(f => f.id === id).automation.includes('actuated') ? 'Manual or actuated' : 'Manual'}</td>)}</tr>
                <tr><th scope="row">Material or Lining Options</th>{compare.map(id => <td key={id}><span className="tbv">To be confirmed</span></td>)}</tr>
                <tr><th scope="row">Technical Documents</th>{compare.map(id => { const d = docFor(FAMILIES.find(x => x.id === id)); return <td key={id}>{d ? d.type + ' · PDF' : <span className="tbv">To be confirmed</span>}</td>; })}</tr>
                <tr><th scope="row">Engineering Support</th>{compare.map(id => <td key={id}><Link className="link-arrow" to={routes.enquiry({ intent: 'technical', product: id })}>Ask a question</Link></td>)}</tr>
                <tr><th scope="row"></th>{compare.map(id => <td key={id}><Link className="link-arrow" to={routes.productDetail(id)}>Full details <ArrowRight size={14} /></Link></td>)}</tr>
              </tbody>
            </table>
            <p className="cmpmodal__note"><span className="pdot" /> Fields marked to be confirmed connect to validated data through the future CMS.</p>
          </div>
        </div>

        <div className={'toast' + (toast ? ' show' : '')} role="status" aria-live="polite">{toast && <><Check size={16} /> {toast}</>}</div>
      </main>
      <Footer />
    </>
  );
}
