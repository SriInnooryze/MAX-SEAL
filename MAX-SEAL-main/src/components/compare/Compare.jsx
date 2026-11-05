/* Max-Seal — site-wide product Compare.
   Moved out of Products.jsx so any page can add products to the same
   selection: the Products results list, the Sub Category-1 series cards, the
   single-product cards on Explore All / Main Category pages, and the product
   detail page. CompareProvider (mounted once in AppRouter.jsx, above the
   routes) holds the selection; CompareDock renders the floating tray, the
   comparison table and the toast on every page. The selection is kept in
   localStorage so it survives a reload; unknown/switched-off product ids are
   dropped on load. Holds up to MAX_COMPARE products. */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FAMILIES, DOCS } from '../../data/data';
import { Check, X, ArrowRight, Scale, ChevronDown } from '../../icons/icons';
import { routes } from '../../router/paths';
import { CompareContext, MAX_COMPARE, useCompare } from './compareStore';

const STORAGE_KEY = 'maxseal-compare';
const famById = (id) => FAMILIES.find(f => f.id === id);

function loadSaved() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(raw) ? raw.filter(id => famById(id)).slice(0, MAX_COMPARE) : [];
  } catch { return []; }
}

export function CompareProvider({ children }) {
  const [compare, setCompare] = useState(loadSaved);
  const [showCompare, setShowCompare] = useState(false);
  const [toast, setToast] = useState('');
  const toastT = useRef(null);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(compare)); } catch { /* storage unavailable */ }
  }, [compare]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToast(''), 2200);
  }, []);

  const toggleCompare = useCallback((id) => {
    if (compare.includes(id)) {
      setCompare(c => c.filter(x => x !== id));
      showToast('Removed from compare');
    } else if (compare.length >= MAX_COMPARE) {
      showToast('Compare holds up to ' + MAX_COMPARE + ' products');
    } else {
      setCompare(c => [...c, id]);
      showToast('Added ' + famById(id).name + ' to compare');
    }
  }, [compare, showToast]);

  const clearCompare = useCallback(() => { setCompare([]); setShowCompare(false); }, []);

  const value = useMemo(() => ({
    compare, toggleCompare, clearCompare, showCompare, setShowCompare, toast,
  }), [compare, toggleCompare, clearCompare, showCompare, toast]);

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

/* Compare on/off control with a clear, fully clickable label. */
export function CompareToggle({ id, block, className }) {
  const { compare, toggleCompare } = useCompare();
  const on = compare.includes(id);
  return (
    <button type="button" className={'cmpcheck' + (on ? ' on' : '') + (block ? ' cmpcheck--block' : '') + (className ? ' ' + className : '')} aria-pressed={on}
      onClick={(e) => { e.stopPropagation(); toggleCompare(id); }}>
      <span className="cmpcheck__box">{on && <Check size={13} />}</span>
      <span className="cmpcheck__lbl">{on ? 'Added to Compare' : 'Add to Compare'}</span>
    </button>
  );
}

const docFor = (fam) => DOCS.find(d => d.fam === fam.name);

/* Floating tray (only with ≥1 selection), comparison table and toast. */
export function CompareDock() {
  const { compare, toggleCompare, clearCompare, showCompare, setShowCompare, toast } = useCompare();
  const [trayOpen, setTrayOpen] = useState(false); // mobile compare sheet expanded
  const fams = compare.map(famById).filter(Boolean);
  const hasTray = fams.length > 0;
  const trayRef = useRef(null);
  const spacerRef = useRef(null);

  /* The tray grows when names wrap (or the mobile sheet opens), so the spacer
     follows its real height: tray + its gap from the bottom + breathing room. */
  useEffect(() => {
    const tray = trayRef.current, spacer = spacerRef.current;
    if (!hasTray || !tray || !spacer) return;
    const fit = () => { spacer.style.height = (window.innerHeight - tray.getBoundingClientRect().top + 16) + 'px'; };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(tray);
    window.addEventListener('resize', fit);
    return () => { ro.disconnect(); window.removeEventListener('resize', fit); };
  }, [hasTray]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setShowCompare(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setShowCompare]);

  return (
    <>
      {hasTray && (
        <>
          {/* Keeps the end of every page (footer) clear of the fixed tray. */}
          <div className="cmptray-spacer" ref={spacerRef} aria-hidden="true" />
          <div ref={trayRef} className={'cmptray' + (trayOpen ? ' cmptray--open' : '')} role="region" aria-label="Compare tray">
            <div className="wrap cmptray__inner">
              <button type="button" className="cmptray__handle" aria-expanded={trayOpen} aria-label={trayOpen ? 'Collapse compare tray' : 'Expand compare tray'} onClick={() => setTrayOpen(o => !o)}>
                <Scale size={16} />
                <b>{fams.length} product{fams.length > 1 ? 's' : ''} selected</b>
                <ChevronDown size={16} className="cmptray__chev" />
              </button>
              <div className="cmptray__items">
                {fams.map(f => (
                  <span className="cmptray__item" key={f.id}>
                    {f.name}
                    <button type="button" aria-label={'Remove ' + f.name} onClick={() => toggleCompare(f.id)}><X size={13} /></button>
                  </span>
                ))}
                {fams.length < MAX_COMPARE && <span className="cmptray__hint">Add another product to compare</span>}
              </div>
              <div className="cmptray__actions">
                <button className="ms-btn ms-btn--ghost ms-btn--sm cmptray__clear" onClick={clearCompare}>Clear</button>
                <button className="ms-btn ms-btn--primary ms-btn--sm" onClick={() => setShowCompare(true)} disabled={fams.length < 2}>Compare Now</button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className={'cmpmodal-scrim' + (showCompare ? ' open' : '')} onClick={() => setShowCompare(false)} />
      <div className={'cmpmodal' + (showCompare ? ' open' : '')} role="dialog" aria-modal="true" aria-label="Compare products">
        <div className="cmpmodal__head">
          <span className="cmpmodal__lbl">Compare · {fams.length} product{fams.length > 1 ? 's' : ''}</span>
          <button className="drawer__close" aria-label="Close comparison" onClick={() => setShowCompare(false)}><X size={18} /></button>
        </div>
        <div className="cmpmodal__scroll">
          <table className="cmptable">
            <thead>
              <tr>
                <th scope="col">Product Family</th>
                {fams.map(f => (
                  <th key={f.id} scope="col">
                    <span className="cmptable__thumb"><image-slot id={'cmp-h-' + f.id} src={f.image} shape="rect" fit="contain" placeholder={f.code} /></span>
                    {f.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><th scope="row">Best Suited For</th>{fams.map(f => <td key={f.id}>{f.need}</td>)}</tr>
              <tr><th scope="row">Typical Applications</th>{fams.map(f => <td key={f.id}>{f.application}</td>)}</tr>
              <tr><th scope="row">Automation Availability</th>{fams.map(f => <td key={f.id}>{f.automation.includes('actuated') ? 'Manual or actuated' : 'Manual'}</td>)}</tr>
              <tr><th scope="row">Material or Lining Options</th>{fams.map(f => { const m = f.materials.seatLiningOptions; return <td key={f.id}>{m && m !== 'To be validated' ? m : <span className="tbv">To be confirmed</span>}</td>; })}</tr>
              <tr><th scope="row">Technical Documents</th>{fams.map(f => { const d = docFor(f); return <td key={f.id}>{d ? d.type + ' · PDF' : <span className="tbv">To be confirmed</span>}</td>; })}</tr>
              <tr><th scope="row">Engineering Support</th>{fams.map(f => <td key={f.id}><Link className="link-arrow" to={routes.enquiry({ intent: 'technical', product: f.id })} onClick={() => setShowCompare(false)}>Ask a question</Link></td>)}</tr>
              <tr><th scope="row"></th>{fams.map(f => <td key={f.id}><Link className="link-arrow" to={routes.productDetail(f.id)} onClick={() => setShowCompare(false)}>Full details <ArrowRight size={14} /></Link></td>)}</tr>
            </tbody>
          </table>
          <p className="cmpmodal__note"><span className="pdot" /> Fields marked to be confirmed connect to validated data through the future CMS.</p>
        </div>
      </div>

      <div className={'toast' + (toast ? ' show' : '')} role="status" aria-live="polite">{toast && <><Check size={16} /> {toast}</>}</div>
    </>
  );
}
