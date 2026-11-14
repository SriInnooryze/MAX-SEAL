/* Max-Seal — Data Centers landing page (/data-centers).

   Built to engage visitors and rank for data center cooling searches:
   1. Hero with proof points read from the catalog (sizes, standards).
   2. Cooling Loop Explorer — an interactive schematic of a data center
      cooling plant. Each numbered point opens what the valve does there and
      which Max-Seal valves fit; "Maintenance mode" isolates Chiller 1 and
      shows the standby chiller taking over (why isolation valves matter).
   3. Selection matrix (zones × products), linked to the explorer.
   4. 60-second Spec Builder that sends the answers to the enquiry form.
   5. Why Max-Seal, documents, FAQ (also emitted as FAQPage JSON-LD), CTA.

   Product facts come from FAMILIES (the Excel catalog); the page copy and the
   zone → product mapping live in src/data/dataCenterData.js. */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import useSeo from '../hooks/useSeo';
import { FAMILIES, bestDocForFamily } from '../data/data';
import { DC_ZONES, DC_MATRIX_PRODUCTS, DC_SIZES, DC_OPERATION, DC_MEDIA, DC_CHALLENGES, DC_FAQ } from '../data/dataCenterData';
import { dataCentersSeo } from '../seo/pageSeo';
import { routes } from '../router/paths';
import { ArrowRight, Headset, Check, FileText, ChevronDown, Settings } from '../icons/icons';
import '../styles/datacenters.css';

const famById = (id) => FAMILIES.find((f) => f.id === id);
const ACTUATORS = ['PROD-034', 'PROD-024'];

/* Largest / smallest inch size in a catalog size string such as
   '1½"–48"' or 'DN50–DN2200 (2"–88")'. */
function inchRange(sizes) {
  const vals = [...String(sizes || '').matchAll(/(\d+(?:\.\d+)?)(½|¼|¾)?\s*["″”]/g)]
    .map((m) => Number(m[1]) + ({ '½': 0.5, '¼': 0.25, '¾': 0.75 }[m[2]] || 0));
  return vals.length ? { min: Math.min(...vals), max: Math.max(...vals) } : null;
}
const fmtIn = (n) => (n % 1 === 0.5 ? `${Math.floor(n)}½` : String(n)) + '″';

function enquiryLink(intent, { product, details } = {}) {
  return routes.enquiry({ intent, industry: 'data-centers', product, details });
}

/* ---------------------------------------------------------------- Explorer */

const HOTSPOTS = { tower: [130, 96], chiller: [405, 202], headers: [760, 200], crah: [670, 318], cdu: [870, 318], treatment: [234, 416] };

function Valve({ x, y, closed, vertical }) {
  return (
    <g className={'dcx-valve' + (closed ? ' is-closed' : '')} transform={`translate(${x} ${y})${vertical ? ' rotate(90)' : ''}`}>
      <path d="M-9,-7 L0,0 L-9,7 Z M9,-7 L0,0 L9,7 Z" />
    </g>
  );
}

function CoolingLoopSvg({ zone, setZone, maint }) {
  // Chiller 1 runs normally; in maintenance mode it is isolated and the
  // standby Chiller 2 carries the load.
  const ch1 = maint ? 'off' : 'on';
  const ch2 = maint ? 'on' : 'off';
  const pipe = (cls, d, state = 'on') => <path className={`dcx-pipe ${cls} is-${state}`} d={d} />;
  return (
    <svg className="dcx-svg" viewBox="0 0 1000 500" role="img" aria-labelledby="dcx-title dcx-desc">
      <title id="dcx-title">Data center cooling loop</title>
      <desc id="dcx-desc">Schematic of a data center cooling plant: cooling tower, two chillers in N+1, chilled water headers, CRAH air handlers, liquid cooling CDUs and water treatment, with the valve points Max-Seal supplies.</desc>

      {/* zone backdrops */}
      <rect className="dcx-zone" x="610" y="215" width="350" height="185" rx="6" />
      <text className="dcx-zone-l" x="738" y="236">DATA HALL</text>
      <rect className="dcx-zone dcx-zone--plant" x="20" y="20" width="560" height="460" rx="6" />
      <text className="dcx-zone-l" x="32" y="42">CENTRAL PLANT</text>

      {/* condenser water (warm) */}
      {pipe('cw', 'M200 112 H300 V282')}
      {pipe('cw', 'M300 122 H330', ch1)}
      {pipe('cw', 'M300 282 H330', ch2)}
      {pipe('cw cw--ret', 'M200 158 H262 V312')}
      {pipe('cw cw--ret', 'M330 150 H262', ch1)}
      {pipe('cw cw--ret', 'M330 312 H262', ch2)}

      {/* chilled water supply (cold) and return */}
      {pipe('chw', 'M480 122 H540', ch1)}
      {pipe('chw', 'M480 282 H540', ch2)}
      {pipe('chw', 'M540 122 V282 M540 200 H945')}
      {pipe('chw', 'M670 200 V245 M870 200 V245')}
      {pipe('chwr', 'M670 360 V430 M870 360 V430 M945 430 H520 V150')}
      {pipe('chwr', 'M520 150 H480', ch1)}
      {pipe('chwr', 'M520 312 H480', ch2)}
      {pipe('chwr', 'M520 300 V312')}

      {/* chemical dosing */}
      {pipe('dose', 'M135 385 V340 H262')}

      {/* equipment */}
      <g className="dcx-eq">
        <path d="M70 175 L90 60 H190 L210 175 Z" />
        <text x="140" y="196" textAnchor="middle">Cooling tower</text>
      </g>
      <g className={'dcx-eq dcx-chiller is-' + ch1}>
        <rect x="330" y="98" width="150" height="70" rx="4" />
        <text x="405" y="128" textAnchor="middle">Chiller 1</text>
        <text className="dcx-state" x="405" y="148" textAnchor="middle">{maint ? 'Isolated for service' : 'Running'}</text>
      </g>
      <g className={'dcx-eq dcx-chiller is-' + ch2}>
        <rect x="330" y="258" width="150" height="70" rx="4" />
        <text x="405" y="288" textAnchor="middle">Chiller 2</text>
        <text className="dcx-state" x="405" y="308" textAnchor="middle">{maint ? 'Running' : 'Standby (N+1)'}</text>
      </g>
      <g className="dcx-eq">
        <rect x="620" y="245" width="100" height="115" rx="4" />
        <text x="670" y="272" textAnchor="middle">CRAH</text>
        <text className="dcx-sub" x="670" y="290" textAnchor="middle">air handlers</text>
      </g>
      <g className="dcx-eq">
        <rect x="820" y="245" width="100" height="115" rx="4" />
        <text x="870" y="272" textAnchor="middle">CDU</text>
        <text className="dcx-sub" x="870" y="290" textAnchor="middle">liquid cooling</text>
        {[0, 1, 2].map((i) => <rect key={i} className="dcx-rack" x={935} y={252 + i * 36} width="16" height="30" rx="2" />)}
      </g>
      <g className="dcx-eq">
        <rect x="60" y="385" width="150" height="62" rx="4" />
        <text x="135" y="412" textAnchor="middle">Water treatment</text>
        <text className="dcx-sub" x="135" y="430" textAnchor="middle">chemical dosing</text>
      </g>
      <text className="dcx-pipe-l" x="560" y="192">Chilled water supply</text>
      <text className="dcx-pipe-l" x="560" y="448">Chilled water return</text>
      <text className="dcx-pipe-l dcx-pipe-l--cw" x="208" y="104">Condenser water</text>

      {/* chiller isolation valves */}
      <Valve x={316} y={122} closed={ch1 === 'off'} />
      <Valve x={292} y={150} closed={ch1 === 'off'} />
      <Valve x={510} y={122} closed={ch1 === 'off'} />
      <Valve x={500} y={150} closed={ch1 === 'off'} />
      <Valve x={316} y={282} closed={ch2 === 'off'} />
      <Valve x={292} y={312} closed={ch2 === 'off'} />
      <Valve x={510} y={282} closed={ch2 === 'off'} />
      <Valve x={500} y={312} closed={ch2 === 'off'} />
      {/* other valve points */}
      <Valve x={240} y={112} /><Valve x={700} y={200} /><Valve x={670} y={228} vertical /><Valve x={870} y={228} vertical /><Valve x={135} y={362} vertical />

      {/* hotspots */}
      {DC_ZONES.map((z) => {
        const [x, y] = HOTSPOTS[z.id];
        const on = zone === z.id;
        return (
          <g key={z.id} className={'dcx-hot' + (on ? ' is-on' : '')} transform={`translate(${x} ${y})`}
            role="button" tabIndex={0} aria-pressed={on} aria-label={`${z.n} ${z.title}`}
            onClick={() => setZone(z.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setZone(z.id); } }}>
            <circle className="dcx-hot__pulse" r="22" />
            <circle className="dcx-hot__dot" r="16" />
            <text textAnchor="middle" dy="4.5">{Number(z.n)}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ProductMini({ id, fit, why }) {
  const f = famById(id);
  if (!f) return null;
  return (
    <Link className="dc-pmini" to={routes.productDetail(f.id)}>
      <span className="dc-pmini__img"><img src={f.image} alt="" loading="lazy" /></span>
      <span className="dc-pmini__body">
        <span className="dc-pmini__name">{f.name}{fit === 'primary' && <span className="dc-fit">Best fit</span>}</span>
        <span className="dc-pmini__why">{why}</span>
        {f.sizes && <span className="dc-pmini__meta">{f.sizes}</span>}
      </span>
      <ArrowRight size={16} className="dc-pmini__arr" />
    </Link>
  );
}

function Explorer({ zone, setZone }) {
  const [maint, setMaint] = useState(false);
  const z = DC_ZONES.find((x) => x.id === zone);
  return (
    <section className="section dc-explorer" id="cooling-loop">
      <div className="wrap">
        <div className="shead shead--row">
          <div>
            <div className="kicker">Cooling Loop Explorer</div>
            <h2 className="shead__title">Click any point in the cooling loop to see the right valve</h2>
          </div>
          <p className="shead__sub">Every chiller, pump and air handler in a data center needs a valve that isolates it cleanly, so cooling keeps running while one unit is serviced.</p>
        </div>

        <div className="dcx">
          <div className="dcx__stage">
            <div className="dcx__bar">
              <div className="dcx__legend">
                <span><i className="lg lg--chw" />Chilled water</span>
                <span><i className="lg lg--chwr" />Return</span>
                <span><i className="lg lg--cw" />Condenser water</span>
                <span><i className="lg lg--valve" />Valve point</span>
              </div>
              <button type="button" className={'dcx__maint' + (maint ? ' on' : '')} aria-pressed={maint} onClick={() => setMaint((m) => !m)}>
                <span className="dcx__switch" aria-hidden="true"><span /></span>
                Maintenance mode
              </button>
            </div>
            <p className="dcx__swipe" aria-hidden="true">Swipe sideways to see the whole loop →</p>
            <div className="dcx__svgwrap"><CoolingLoopSvg zone={zone} setZone={setZone} maint={maint} /></div>
            <p className="dcx__status" role="status">
              {maint
                ? 'Chiller 1 is isolated by its four valves for service. Chiller 2 has taken over, and the data hall stays cool.'
                : 'Normal operation: Chiller 1 runs, Chiller 2 stands by (N+1). Switch on Maintenance mode to see the valves at work.'}
            </p>
            <div className="dcx__chips" role="tablist" aria-label="Cooling system points">
              {DC_ZONES.map((x) => (
                <button key={x.id} type="button" role="tab" aria-selected={zone === x.id} className={'dcx__chip' + (zone === x.id ? ' on' : '')} onClick={() => setZone(x.id)}>
                  <b>{x.n}</b> {x.short}
                </button>
              ))}
            </div>
          </div>

          <aside className="dcx__panel" aria-live="polite" key={z.id}>
            <div className="dcx__panel-k">Point {z.n}</div>
            <h3 className="dcx__panel-t">{z.title}</h3>
            <p className="dcx__panel-role">{z.role}</p>
            <ul className="dcx__needs">{z.needs.map((n) => <li key={n}><Check size={14} />{n}</li>)}</ul>
            <div className="dcx__panel-k dcx__panel-k--sub">Recommended Max-Seal valves</div>
            <div className="dcx__prods">{z.products.map((p) => <ProductMini key={p.id} {...p} />)}</div>
            <Link className="link-arrow dcx__ask" to={enquiryLink('technical', { product: z.products[0].id, details: `Data center point: ${z.title}` })}>
              <Headset size={16} /> Ask an engineer about this point
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Matrix */

function Matrix({ zone, setZone }) {
  const [col, setCol] = useState(null);
  const cols = DC_MATRIX_PRODUCTS.map((c) => ({ ...c, fam: famById(c.id) })).filter((c) => c.fam);
  const fitOf = (z, pid) => z.products.find((p) => p.id === pid)?.fit;
  const colZones = col ? DC_ZONES.filter((z) => fitOf(z, col)) : [];
  const colFam = col && famById(col);
  return (
    <section className="section section--sunken dc-matrix" id="selection-matrix">
      <div className="wrap">
        <div className="shead shead--row">
          <div>
            <div className="kicker">Selection matrix</div>
            <h2 className="shead__title">Which Max-Seal valve fits where</h2>
          </div>
          <div className="dcm__legend">
            <span><i className="dcm__mark is-primary" /> Best fit</span>
            <span><i className="dcm__mark is-option" /> Also suitable</span>
          </div>
        </div>
        <p className="dcm__hint">Select a row to open it in the explorer above, or a product column to see every point it covers.</p>
        <div className="dcm__scroll">
          <div className="dcm" style={{ '--dcm-cols': cols.length }} role="grid" aria-label="Cooling system zones by Max-Seal product">
            <div className="dcm__cell dcm__corner" role="columnheader">Cooling system point</div>
            {cols.map((c) => (
              <button key={c.id} type="button" role="columnheader" className={'dcm__cell dcm__head' + (col === c.id ? ' is-col' : '')}
                onMouseEnter={() => setCol(c.id)} onFocus={() => setCol(c.id)} onClick={() => setCol(c.id)} title={c.fam.name}>
                <span className="dcm__code">{c.fam.code}</span>{c.short}
              </button>
            ))}
            {DC_ZONES.map((z) => (
              <div className="dcm__row" role="row" key={z.id}>
                <button type="button" role="rowheader" className={'dcm__cell dcm__rowhead' + (zone === z.id ? ' is-row' : '')}
                  onClick={() => { setZone(z.id); document.getElementById('cooling-loop')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
                  <span className="dcm__n">{z.n}</span>{z.title}
                </button>
                {cols.map((c) => {
                  const fit = fitOf(z, c.id);
                  return (
                    <div key={c.id} role="gridcell" aria-label={fit ? `${c.fam.name}: ${fit === 'primary' ? 'best fit' : 'also suitable'}` : `${c.fam.name}: not mapped`}
                      className={'dcm__cell dcm__dotcell' + (zone === z.id ? ' is-row' : '') + (col === c.id ? ' is-col' : '')}
                      onClick={() => { setZone(z.id); setCol(c.id); }}>
                      <i className={'dcm__mark' + (fit ? ' is-' + fit : '')} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="dcm__detail" aria-live="polite">
          {colFam ? (
            <>
              <img src={colFam.image} alt="" loading="lazy" />
              <div>
                <div className="dcm__detail-k">{colFam.code} · {colFam.sizes || 'Sizes on request'}</div>
                <div className="dcm__detail-t">{colFam.name}</div>
                <p>Fits {colZones.length} cooling point{colZones.length === 1 ? '' : 's'}: {colZones.map((z) => z.title).join(', ')}.</p>
              </div>
              <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.productDetail(colFam.id)}>View product <ArrowRight size={15} /></Link>
            </>
          ) : (
            <p className="dcm__detail-empty">Hover or tap a product column to see where it fits.</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Spec Builder */

function Group({ label, options, value, onChange }) {
  return (
    <fieldset className="dcs__group">
      <legend>{label}</legend>
      <div className="dcs__opts">
        {options.map((o) => (
          <button key={o.id} type="button" aria-pressed={value === o.id} className={'dcs__opt' + (value === o.id ? ' on' : '')} onClick={() => onChange(o.id)}>{o.label}</button>
        ))}
      </div>
    </fieldset>
  );
}

function SpecBuilder({ zone, setZone }) {
  const [size, setSize] = useState('s24');
  const [op, setOp] = useState('automated');
  const [media, setMedia] = useState('water');
  const z = DC_ZONES.find((x) => x.id === zone);
  const sz = DC_SIZES.find((s) => s.id === size);

  const result = useMemo(() => {
    let ids = media === 'chemical'
      ? ['PROD-006', 'PROD-012']
      : z.products.map((p) => p.id).filter((id) => !ACTUATORS.includes(id));
    const fits = ids.map(famById).filter(Boolean).filter((f) => {
      const r = inchRange(f.sizes);
      if (!r) return false;
      const lower = DC_SIZES[DC_SIZES.indexOf(sz) - 1]?.max ?? 0;
      return r.max > lower; // covers at least part of the chosen size band
    }).filter((f) => op === 'manual' || f.automation.includes('actuated'));
    const actuator = op === 'automated' ? famById('PROD-034') : null;
    return { picks: fits, actuator };
  }, [z, sz, op, media]);

  const details = `Data center spec — Point: ${z.title}; Line size: ${sz.label}; Operation: ${DC_OPERATION.find((o) => o.id === op).label}; Media: ${DC_MEDIA.find((m) => m.id === media).label}`;
  const top = result.picks[0];

  return (
    <section className="section dc-spec" id="spec-builder">
      <div className="wrap dcs">
        <div className="dcs__q">
          <div className="kicker">60-second Spec Builder</div>
          <h2 className="shead__title">Tell us the job. Get a valve shortlist.</h2>
          <Group label="1. Where in the system?" options={DC_ZONES.map((x) => ({ id: x.id, label: x.short }))} value={zone} onChange={setZone} />
          <Group label="2. Line size" options={DC_SIZES} value={size} onChange={setSize} />
          <Group label="3. Operation" options={DC_OPERATION} value={op} onChange={setOp} />
          <Group label="4. Media" options={DC_MEDIA} value={media} onChange={setMedia} />
        </div>
        <div className="dcs__r" aria-live="polite">
          <div className="dcs__r-k"><Settings size={15} /> Your shortlist</div>
          {top ? (
            <>
              <div className="dcs__top">
                <img src={top.image} alt="" />
                <div>
                  <div className="dcs__top-k">Best match</div>
                  <div className="dcs__top-t">{top.name}</div>
                  <div className="dcs__top-m">{[top.sizes, top.rating].filter(Boolean).join(' · ')}</div>
                </div>
              </div>
              {result.picks.length > 1 && (
                <div className="dcs__alts">Also consider: {result.picks.slice(1).map((f, i) => (
                  <span key={f.id}>{i > 0 && ', '}<Link to={routes.productDetail(f.id)}>{f.name}</Link></span>
                ))}</div>
              )}
              {result.actuator && (
                <div className="dcs__alts">Automation: <Link to={routes.productDetail(result.actuator.id)}>{result.actuator.name}</Link> or <Link to={routes.productDetail('PROD-024')}>Pneumatic Actuator</Link>, with limit switches and positioners for BMS feedback.</div>
              )}
              <div className="dcs__actions">
                <Link className="ms-btn ms-btn--primary" to={enquiryLink('technical', { product: top.id, details })}>Send this spec to an engineer <ArrowRight size={16} /></Link>
                <Link className="ms-btn ms-btn--on-dark" to={routes.productDetail(top.id)}>View {top.code} Series</Link>
              </div>
            </>
          ) : (
            <>
              <p className="dcs__none">No standard series in this combination — our engineers can still help with a custom or alternative selection.</p>
              <div className="dcs__actions">
                <Link className="ms-btn ms-btn--primary" to={enquiryLink('technical', { details })}>Ask an engineer <ArrowRight size={16} /></Link>
              </div>
            </>
          )}
          <p className="dcs__note">A shortlist to start the conversation — final selection is confirmed by Max-Seal engineering against your pressures, temperatures and specifications.</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- Page */

export default function DataCenters() {
  useSiteChrome();
  const [zone, setZone] = useState('chiller');

  const valves = DC_MATRIX_PRODUCTS.map((c) => famById(c.id)).filter((f) => f && !ACTUATORS.includes(f.id));
  const ranges = valves.map((f) => inchRange(f.sizes)).filter(Boolean);
  const minIn = Math.min(...ranges.map((r) => r.min));
  const maxIn = Math.max(...ranges.map((r) => r.max));

  const seo = useMemo(() => dataCentersSeo({
    faq: DC_FAQ,
    products: DC_MATRIX_PRODUCTS.map((c) => famById(c.id)).filter(Boolean).map((f) => ({ name: f.name, url: routes.productDetail(f.id) })),
  }), []);
  useSeo(seo);

  const docs = [...new Map(valves.map((f) => bestDocForFamily(f.id)).filter(Boolean).map((d) => [d.id, d])).values()].slice(0, 6);
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="dc-page">
      <section className="dc-hero">
        <img className="dc-hero__img" src="/assets/maxseal/industries/data-centers.png" alt="Chilled water pipework and butterfly valves in a data center mechanical room" />
        <div className="dc-hero__scrim" />
        <div className="wrap dc-hero__inner">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to={routes.home}>Home</Link><span className="sep">/</span>
            <Link to={routes.industries()}>Industries</Link><span className="sep">/</span>
            <span className="cur">Data Centers</span>
          </nav>
          <h1 className="dc-hero__title">Butterfly valves for data center cooling</h1>
          <p className="dc-hero__lead">Chilled water and condenser loops that must never stop. Max-Seal supplies isolation and automated valve packages for chillers, cooling towers, air handlers and liquid cooling, built for redundant cooling paths and tight mechanical rooms.</p>
          <div className="dc-hero__actions">
            <a className="ms-btn ms-btn--primary ms-btn--lg" href="#cooling-loop">Explore the cooling loop <ArrowRight size={16} /></a>
            <Link className="ms-btn ms-btn--on-dark ms-btn--lg" to={enquiryLink('pricing')}>Request a Quote</Link>
          </div>
          <ul className="dc-hero__proof">
            <li><b>{fmtIn(minIn)}–{fmtIn(maxIn)}</b><span>line sizes covered</span></li>
            <li><b>Manual or automated</b><span>electric &amp; pneumatic actuation</span></li>
            <li><b>API 609 · AWWA C504</b><span>designs available</span></li>
          </ul>
        </div>
      </section>

      <Explorer zone={zone} setZone={setZone} />
      <Matrix zone={zone} setZone={setZone} />
      <SpecBuilder zone={zone} setZone={setZone} />

      <section className="section section--sunken dc-why">
        <div className="wrap">
          <div className="shead">
            <div className="kicker">Why Max-Seal for data centers</div>
            <h2 className="shead__title">Valve support for cooling that can't go down</h2>
          </div>
          <div className="dc-why__grid">
            {DC_CHALLENGES.map((c, i) => (
              <div className="dc-why__card reveal" key={c.k}>
                <span className="dc-why__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{c.k}</h3>
                <p>{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {docs.length > 0 && (
        <section className="section dc-docs">
          <div className="wrap">
            <div className="shead shead--row">
              <div>
                <div className="kicker">Technical documents</div>
                <h2 className="shead__title">Catalogs for data center valve selection</h2>
              </div>
              <Link className="link-arrow" to={routes.catalog()}>All documents <ArrowRight size={15} /></Link>
            </div>
            <div className="dc-docs__grid">
              {docs.map((d) => (
                <a key={d.id} className="dc-doc" href={encodeURI(d.pdfAsset)} target="_blank" rel="noreferrer">
                  <FileText size={20} />
                  <span><b>{d.title}</b><small>{d.fam}{d.size ? ' · PDF ' + d.size : ''}</small></span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--sunken dc-faq" id="faq">
        <div className="wrap dc-faq__wrap">
          <div className="shead">
            <div className="kicker">FAQ</div>
            <h2 className="shead__title">Data center valve questions</h2>
          </div>
          <div className="dc-faq__list">
            {DC_FAQ.map((f, i) => (
              <div className={'dc-faq__item' + (openFaq === i ? ' open' : '')} key={f.q}>
                <h3>
                  <button type="button" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}<ChevronDown size={18} />
                  </button>
                </h3>
                <div className="dc-faq__a" hidden={openFaq !== i}><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="convert">
        <div className="wrap convert__inner reveal">
          <div className="kicker kicker--ondark">DATA CENTER PROJECTS</div>
          <h2 className="convert__t">Planning a new build or a cooling upgrade?</h2>
          <p className="convert__lead">Send us your line list or cooling schematic. Our engineers will help match valve type, seat, actuation and accessories to every point in the loop.</p>
          <div className="convert__actions">
            <Link className="ms-btn ms-btn--primary" to={enquiryLink('pricing')}>Request a Quote <ArrowRight size={16} /></Link>
            <Link className="ms-btn ms-btn--on-dark" to={enquiryLink('technical')}><Headset size={16} /> Ask the Engineers</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
