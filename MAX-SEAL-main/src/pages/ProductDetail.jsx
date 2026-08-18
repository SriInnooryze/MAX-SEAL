/* Max-Seal — Product Detail (reusable template). */
import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FAMILIES, DOCS, INDUSTRIES } from '../data/data';
import { ArrowRight, Headset, Download, FileText, Compass, Search } from '../icons/icons';
import { routes } from '../router/paths';
import Tabs from '../components/ds/Tabs';
import SpecTable from '../components/ds/SpecTable';
import Badge from '../components/ds/Badge';

export default function ProductDetail() {
  const { family: familyParam } = useParams();
  const id = familyParam || FAMILIES[0].id;
  const f = FAMILIES.find(x => x.id === id) || FAMILIES[0];
  const related = f.relatedProducts.map(rid => FAMILIES.find(x => x.id === rid)).filter(Boolean);
  const relIndustries = INDUSTRIES.filter(x => x.families.includes(f.name)).slice(0, 4);
  const famDocs = DOCS.filter(d => d.familyIds.includes('ALL') || d.familyIds.includes(f.id));
  const [shot, setShot] = useState(0);
  const shots = f.gallery;
  const activeImage = shots[shot]?.imagePath || f.image;

  // Amazon-style hover zoom: a lens square tracks the cursor over the small
  // image, and a floating panel beside it shows that region magnified via a
  // panned background-image. Math accounts for the image's actual rendered
  // box within its container (fit=contain can letterbox), so the lens/panel
  // line up with the real picture, not the padding around it.
  // Zoom strength is a 0-100% slider, not a fixed value: 0% = subtle (1.3x),
  // 100% = strong (4x). Works on whichever shot is active, since it's just a
  // multiplier applied to activeImage.
  const [zoomPct, setZoomPct] = useState(40);
  const ZOOM = 1.3 + (zoomPct / 100) * 2.7;
  const [zooming, setZooming] = useState(false);
  const [imgSize, setImgSize] = useState(null);
  const zoomRef = useRef(null);
  const lensRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => { if (!cancelled) setImgSize({ w: img.naturalWidth, h: img.naturalHeight }); };
    img.src = activeImage;
    return () => { cancelled = true; };
  }, [activeImage]);

  // Keep the panel's magnification in sync if the slider moves mid-hover.
  useEffect(() => {
    if (zooming && panelRef.current) {
      panelRef.current.style.backgroundSize = `${ZOOM * 100}% auto`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomPct, zooming]);

  const containBox = (container) => {
    if (!imgSize || !container) return null;
    const scale = Math.min(container.width / imgSize.w, container.height / imgSize.h);
    const renderW = imgSize.w * scale, renderH = imgSize.h * scale;
    return { offsetX: (container.width - renderW) / 2, offsetY: (container.height - renderH) / 2, renderW, renderH };
  };

  const handleZoomMove = (e) => {
    const el = zoomRef.current, lens = lensRef.current, panel = panelRef.current;
    if (!el || !lens || !panel) return;
    const rect = el.getBoundingClientRect();
    const box = containBox(rect);
    if (!box || box.renderW === 0 || box.renderH === 0) return;
    const mx = Math.max(box.offsetX, Math.min(box.offsetX + box.renderW, e.clientX - rect.left));
    const my = Math.max(box.offsetY, Math.min(box.offsetY + box.renderH, e.clientY - rect.top));
    const xPct = ((mx - box.offsetX) / box.renderW) * 100;
    const yPct = ((my - box.offsetY) / box.renderH) * 100;

    const lensW = box.renderW / ZOOM, lensH = box.renderH / ZOOM;
    const lensX = Math.max(box.offsetX, Math.min(box.offsetX + box.renderW - lensW, mx - lensW / 2));
    const lensY = Math.max(box.offsetY, Math.min(box.offsetY + box.renderH - lensH, my - lensH / 2));
    lens.style.left = `${lensX}px`; lens.style.top = `${lensY}px`;
    lens.style.width = `${lensW}px`; lens.style.height = `${lensH}px`;

    panel.style.backgroundPosition = `${xPct}% ${yPct}%`;
  };

  const handleZoomEnter = () => {
    const panel = panelRef.current;
    if (panel) {
      panel.style.backgroundImage = `url(${activeImage})`;
      panel.style.backgroundSize = `${ZOOM * 100}% auto`;
    }
    setZooming(true);
  };

  const specRows = [
    ['Series', f.code], ['Size range', f.sizes], ['Pressure rating', f.rating],
    ['Typical application', f.application], ['Automation', f.automation.includes('actuated') ? 'Manual or actuated' : 'Manual'],
    ...f.specifications.map(s => [s.label, s.value]),
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
        <tr><th>Body materials</th><td>{f.materials.bodyMaterials || <span className="tbv">To be validated</span>}</td></tr>
        <tr><th>Seat or lining options</th><td>{f.materials.seatLiningOptions || <span className="tbv">To be validated</span>}</td></tr>
        <tr><th>Disc and stem</th><td>{f.materials.discAndStem || <span className="tbv">To be validated</span>}</td></tr>
        <tr><th>Configurations</th><td>{f.materials.configurations || <span className="tbv">To be validated</span>}</td></tr>
      </tbody></table>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--steel-500)', marginTop: '0.8rem' }}>Confirmed materials connect through the future CMS.</p>
    </div>
  );
  const documents = (
    <div className="rlist">
      {famDocs.map((d, i) => (
        <div className="doc-row" key={i}>
          <div className="doc-ic"><FileText size={20} /></div>
          <div className="doc-main"><div className="doc-main__t">{d.title}</div><div className="doc-main__m"><span>{d.type}</span><span>Updated {d.date}</span><span>PDF · {d.size}</span></div></div>
          <span className="doc-fam">{d.fam}</span>
          <div className="doc-actions"><Link className="doc-mini" to={routes.catalog()} aria-label="Download"><Download size={17} /></Link></div>
        </div>
      ))}
    </div>
  );
  const sectionContent = { overview, specifications: tech, applications, materials, documents };
  const sectionsToShow = f.sections.length ? f.sections : [{ type: 'overview', title: 'Overview' }];
  const tabItems = sectionsToShow.map(s => ({ id: s.type, label: s.title, content: sectionContent[s.type] }));

  return (
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
                <div
                  className="pdet__main pdet__main--zoom"
                  ref={zoomRef}
                  onMouseMove={handleZoomMove}
                  onMouseEnter={handleZoomEnter}
                  onMouseLeave={() => setZooming(false)}
                >
                  <image-slot id={'pd-media-' + f.id + '-' + shot} src={activeImage} shape="rect" fit="contain" placeholder={f.name + ' · ' + (shots[shot]?.label || '')} />
                  <span className="pdet__zoomhint"><Search size={14} /> Hover to zoom</span>
                  {zooming && <span className="pdet__lens" ref={lensRef} />}
                </div>
                {/* Rendered as a sibling, not a child of .pdet__main, so its own
                    overflow:hidden (needed to keep thumbnails/gallery images
                    cropped correctly) doesn't clip the floating panel. */}
                <div className={'pdet__zoompanel' + (zooming ? ' pdet__zoompanel--active' : '')} ref={panelRef} aria-hidden="true" />
                <div className="pdet__thumbs">
                  {shots.map((s, i) => (
                    <button key={i} className={'pdet__thumb' + (i === shot ? ' on' : '')} aria-label={s.label} aria-pressed={i === shot} onClick={() => setShot(i)}>
                      <image-slot id={'pd-thumb-' + f.id + '-' + i} src={s.imagePath} shape="rect" fit="contain" placeholder={s.label} />
                    </button>
                  ))}
                </div>
                <div className="pdet__zoomctrl">
                  <label htmlFor="pdet-zoom-range">Zoom strength</label>
                  <input
                    id="pdet-zoom-range"
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={zoomPct}
                    onChange={(e) => setZoomPct(Number(e.target.value))}
                  />
                  <span className="pdet__zoomctrl-val">{zoomPct}%</span>
                </div>
              </div>
              {/* Summary */}
              <div className="pdet__head">
                <div style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Badge variant="primary">{f.code} Series</Badge>
                  {f.sku && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--steel-500)' }}>SKU: {f.sku}</span>}
                </div>
                <h1 className="pdet__name">{f.name}</h1>
                <p className="pdet__purpose">{f.short}</p>
                <dl className="pstage2__specs" style={{ marginTop: '1.4rem' }}>
                  <div><dt>Size range</dt><dd>{f.sizes}</dd></div>
                  <div><dt>Pressure</dt><dd>{f.rating}</dd></div>
                  <div><dt>Typical</dt><dd>{f.application}</dd></div>
                  <div><dt>Automation</dt><dd>{f.automation.includes('actuated') ? 'Manual / Actuated' : 'Manual'}</dd></div>
                </dl>
                <div className="pdet__approvals">
                  <span className="pdet__appr-k">Approvals</span>
                  {f.approvals === 'To be validated'
                    ? <span className="tbv">{f.approvals}</span>
                    : <span>{f.approvals}</span>}
                </div>
                <div className="pdet__actions">
                  <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'pricing', product: f.id })}>Request a Quote <ArrowRight size={16} /></Link>
                  <Link className="ms-btn ms-btn--outline" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask the Engineers</Link>
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
                    <div className="rrow__thumb"><image-slot id={'pd-rel-' + f.id + '-' + r.id} src={r.image} shape="rect" fit="contain" placeholder={r.code} /></div>
                    <div style={{ gridColumn: 'span 2' }}><div className="rrow__name">{r.name}</div><div className="rrow__purpose">{r.need}</div></div>
                    <span className="rrow__meta" style={{ color: 'var(--azure-700)' }}><ArrowRight size={18} /></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}
