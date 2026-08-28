/* Max-Seal — Product Detail (reusable template). */
import { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FAMILIES, DOCS, INDUSTRIES } from '../data/data';
import { ArrowRight, Headset, Download, FileText, Compass, Search, Eye } from '../icons/icons';
import { routes } from '../router/paths';
import Tabs from '../components/ds/Tabs';
import SpecTable from '../components/ds/SpecTable';
import Badge from '../components/ds/Badge';

export default function ProductDetail() {
  const { family: familyParam } = useParams();
  const id = familyParam || FAMILIES[0].id;
  const f = FAMILIES.find(x => x.id === id) || FAMILIES[0];
  const related = f.relatedProducts.map(rid => FAMILIES.find(x => x.id === rid)).filter(Boolean);
  // f.industries is the direct ProductIndustryLinks mapping for this product
  // (catalog/MAXSEAL_CATALOG.xlsx, ProductIndustryLinks sheet — SortOrder
  // preserved from generate-catalog.mjs). Reading it directly, with no cap,
  // so "Where it's used" shows every industry actually mapped to this
  // product — a name-based reverse lookup capped at 4 was silently dropping
  // a real mapping for any product with more than 4 links (most have 5).
  const relIndustries = f.industries.map(iid => INDUSTRIES.find(x => x.id === iid)).filter(Boolean);
  const famDocs = DOCS.filter(d => d.familyIds.includes('ALL') || d.familyIds.includes(f.id));
  // Every product's Gallery rows (catalog/MAXSEAL_CATALOG.xlsx, Gallery
  // sheet) provide exactly 3 shots — Main View / View 2 / View 3 — so the
  // thumbnail strip renders the same for every product, data-driven, never
  // hardcoded to one product. Main View defaults to selected (index 0), and
  // its ImagePath is always Products.ImagePath (f.image); View 2/View 3
  // temporarily reuse that same image until distinct shots exist in the
  // catalog — swapping them there is a data change, no component change
  // needed. `shots.length ? 0 : null` is a defensive fallback only, for the
  // unlikely case a product has no Gallery rows at all.
  const [shot, setShot] = useState(() => (f.gallery.length ? 0 : null));
  const shots = f.gallery;
  const activeImage = (shot != null && shots[shot]?.imagePath) || f.image;

  // Reset to the primary image when navigating from one product to another
  // — React Router reuses this component instance across /products/:family
  // param changes, so a thumbnail picked on the previous product would
  // otherwise stay "selected" and show the wrong image on the new one.
  useEffect(() => { setShot(f.gallery.length ? 0 : null); }, [f.id, f.gallery.length]);

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
    setImgSize(null);
    if (!activeImage) return undefined;
    const img = new Image();
    img.onload = () => { if (!cancelled) setImgSize({ w: img.naturalWidth, h: img.naturalHeight }); };
    img.onerror = () => { if (!cancelled) setImgSize(null); };
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
    // Guard on imgSize (set only once activeImage has actually loaded) so a
    // still-loading or failed-to-load image never opens an empty panel —
    // see the load effect above, which resets imgSize to null on error.
    if (!panel || !activeImage || !imgSize) return;
    // encodeURI + quoting: several catalog image filenames contain spaces
    // and other characters (e.g. "Double Flanged Butterfly Valve.png") that
    // are valid in an <img src>/URL but break an unquoted CSS url(...) token,
    // which silently no-ops and left the panel showing its plain white
    // background — this was the actual cause of the blank zoom preview.
    panel.style.backgroundImage = `url("${encodeURI(activeImage)}")`;
    panel.style.backgroundSize = `${ZOOM * 100}% auto`;
    setZooming(true);
  };

  // Automation is only shown when Excel actually specifies it — an empty
  // Automation cell means "not applicable / not yet specified", not "manual"
  // by default (that silently invented a fact the catalog doesn't have).
  const automationLabel = f.automation.length
    ? (f.automation.includes('manual') && f.automation.includes('actuated') ? 'Manual / Actuated'
      : f.automation.includes('actuated') ? 'Actuated' : 'Manual')
    : null;

  // Overview only renders when Products.Short actually carries text — it's
  // an Excel-required field so this is normally always true, but the guard
  // keeps the tab from ever appearing over an empty paragraph if that ever
  // changes.
  const overview = f.short ? (
    <div className="prose" style={{ maxWidth: '64ch' }}>
      <p style={{ fontSize: '1.1rem' }}>{f.short}</p>
      {(f.need || f.where) && (
        <p>{[f.need, f.where].filter(Boolean).join(' ')} The {f.name} family is supplied with options to suit your service condition. Talk to our team for sizing, seat and trim selection.</p>
      )}
    </div>
  ) : null;

  // Technical Data is gated on real spec content — Sizes/Rating/Application/
  // Automation (Products sheet) or ProductSpecifications rows — not on
  // 'Series' alone, which is just the product code already shown in the
  // header badge and isn't itself a specification.
  const hasTechData = Boolean(f.sizes || f.rating || f.application || automationLabel || f.specifications.length);
  const specRows = [
    ['Series', f.code],
    f.sizes && ['Size range', f.sizes],
    f.rating && ['Pressure rating', f.rating],
    f.application && ['Typical application', f.application],
    automationLabel && ['Automation', automationLabel],
    ...f.specifications.map(s => [s.label, s.value]),
  ].filter(Boolean);
  const tech = hasTechData ? <SpecTable caption="Technical data" rows={specRows} /> : null;
  const applications = f.application ? (
    <div className="prose"><p>Typical applications include {f.application.toLowerCase()}. Material and seat options are matched to media and operating conditions.</p></div>
  ) : null;

  // Materials tab only appears once at least one field carries a real,
  // confirmed value — an all-blank or all-"To be validated" materials
  // record means nothing is actually known yet, so the section is hidden
  // rather than rendered as a table of placeholder rows.
  const materialsRows = [
    ['Body materials', f.materials.bodyMaterials],
    ['Seat or lining options', f.materials.seatLiningOptions],
    ['Disc and stem', f.materials.discAndStem],
    ['Configurations', f.materials.configurations],
  ].filter(([, v]) => v && v !== 'To be validated');
  const materials = materialsRows.length ? (
    <div className="prose" style={{ maxWidth: '64ch' }}>
      <table className="cmptable"><tbody>
        {materialsRows.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
      </tbody></table>
    </div>
  ) : null;

  // Only documents with an actual PDF asset are shown — a title with no
  // real file behind it is a dead download link, which counts as "broken"
  // rather than as real document content.
  const realDocs = famDocs.filter(d => d.pdfAsset);
  const documents = realDocs.length ? (
    <div className="rlist">
      {realDocs.map((d, i) => {
        // encodeURI (not encodeURIComponent) so the "/" path separators
        // survive while spaces and other special characters in the actual
        // on-disk filename resolve correctly as a browser request.
        const href = encodeURI(d.pdfAsset);
        const fileName = d.pdfAsset.split('/').pop();
        return (
          <div className="doc-row" key={i}>
            <div className="doc-ic"><FileText size={20} /></div>
            <div className="doc-main">
              <div className="doc-main__t">{d.title}</div>
              <div className="doc-main__m">
                {d.type && <span>{d.type}</span>}
                {d.date && <span>Updated {d.date}</span>}
                {d.size && <span>PDF · {d.size}</span>}
              </div>
            </div>
            <span className="doc-fam">{d.fam}</span>
            <div className="doc-actions">
              <a className="doc-mini" href={href} target="_blank" rel="noreferrer" aria-label="View PDF" title="View PDF"><Eye size={17} /></a>
              <a className="doc-mini" href={href} download={fileName} aria-label="Download PDF" title="Download PDF"><Download size={17} /></a>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
  const sectionContent = { overview, specifications: tech, applications, materials, documents };
  // Excel's per-product Sections rows (if any) still take priority and are
  // still filtered against real content below; when a product has none, the
  // full standard template is offered and each tab self-hides per data.
  const defaultSections = [
    { type: 'overview', title: 'Overview' },
    { type: 'specifications', title: 'Technical Data' },
    { type: 'applications', title: 'Applications' },
    { type: 'materials', title: 'Materials' },
    { type: 'documents', title: 'Documents' },
  ];
  const sectionsToShow = (f.sections.length ? f.sections : defaultSections)
    .filter(s => sectionContent[s.type] != null);
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
                {shots.length > 1 && (
                  <div className="pdet__thumbs">
                    {shots.map((s, i) => (
                      <button key={i} className={'pdet__thumb' + (i === shot ? ' on' : '')} aria-label={s.label} aria-pressed={i === shot} onClick={() => setShot(i)}>
                        <image-slot id={'pd-thumb-' + f.id + '-' + i} src={s.imagePath} shape="rect" fit="contain" placeholder={s.label} />
                        <span className="pdet__thumb-label">{s.label}</span>
                      </button>
                    ))}
                  </div>
                )}
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
                <p className="pdet__purpose">{f.short || 'Details coming soon — contact our engineers for current availability and specifications.'}</p>
                {(f.sizes || f.rating || f.application || automationLabel) && (
                  <dl className="pstage2__specs" style={{ marginTop: '1.4rem' }}>
                    {f.sizes && <div><dt>Size range</dt><dd>{f.sizes}</dd></div>}
                    {f.rating && <div><dt>Pressure</dt><dd>{f.rating}</dd></div>}
                    {f.application && <div><dt>Typical</dt><dd>{f.application}</dd></div>}
                    {automationLabel && <div><dt>Automation</dt><dd>{automationLabel}</dd></div>}
                  </dl>
                )}
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

            {tabItems.length > 0 && (
              <div className="pdet__tabs">
                {/* Tabs self-manages its active tab in internal state and never
                    resets it on its own; keying by product id forces a fresh
                    mount on navigation so the first available tab for the new
                    product is what's active, instead of possibly matching no
                    tab at all if the previous product's active tab type
                    doesn't exist here. */}
                <Tabs items={tabItems} key={f.id} />
              </div>
            )}

            {relIndustries.length > 0 && (
              <div className="pdet__section">
                <div className="kicker" style={{ marginBottom: '1rem' }}>Where it is used</div>
                <div className="mx__appchips">
                  {relIndustries.map(x => <Link key={x.id} className="mx__appchip" to={routes.industryDetail(x.id)}>{x.name}</Link>)}
                </div>
              </div>
            )}

            {related.length > 0 && (
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
            )}
          </div>
        </section>
    </main>
  );
}
