import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FAMILIES, INDUSTRIES } from '../data/data';
import { INDUSTRY_MENU_IDS } from './DropdownContent';
import { Search, ChevronDown, Phone, Mail, MessageCircle, ArrowRight, X } from '../icons/icons';
import { routes } from '../router/paths';
import logo from '../assets/maxseal-logo.png';

/* Mobile navigation — full drawer with focus trap, Esc, outside click, scroll lock.
   Matches the desktop nav order and dropdown grouping (Priority 4 nav cleanup):
   Home, Products, Industries, Solutions, Resources, About, Contact — Support
   stays the persistent CTA in .mnav__foot below, same decision as desktop
   (see Priority 4 nav report). */
const MOBILE_NAV = [
  { id: 'home', label: 'Home', href: routes.home },
  {
    id: 'products', label: 'Products', href: routes.products(), children: [
      ...FAMILIES.map(f => ({ label: f.menuName, href: routes.productDetail(f.id) })),
      { label: 'Explore all products', href: routes.products(), all: true },
    ]
  },
  {
    id: 'industries', label: 'Industries', href: routes.industries(), children: [
      ...INDUSTRY_MENU_IDS.map(id => INDUSTRIES.find(x => x.id === id)).filter(Boolean).map(x => ({ label: x.name, href: routes.industryDetail(x.id) })),
      { label: 'View all industries', href: routes.industries(), all: true },
    ]
  },
  { id: 'solutions', label: 'Solutions', href: routes.solutions },
  {
    id: 'resources', label: 'Resources', href: routes.resources, children: [
      { label: 'Catalog', href: routes.catalog() },
      { label: 'Marketing Resources', href: routes.marketing },
      { label: 'Price Lists', href: routes.priceLists },
      { label: 'View all resources', href: routes.resources, all: true },
    ]
  },
  {
    // Same-page anchors into /about, matching the desktop dropdown — see
    // DropdownContent.jsx and the hash scroll handler in src/pages/About.jsx.
    id: 'about', label: 'About', href: routes.about, children: [
      { label: 'Company', href: routes.about + '#who-we-are' },
      { label: 'Team', href: routes.about + '#how-we-grew' },
      { label: 'End Users', href: routes.about + '#who-we-serve' },
      { label: 'Global Partners', href: routes.about + '#global-partners' },
    ]
  },
  { id: 'contact', label: 'Contact', href: routes.contact },
];

export default function MobileNav({ open, onClose, current }) {
  const [expanded, setExpanded] = useState({});
  const panelRef = useRef(null);
  const firstRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    // iOS Safari does not honor `overflow: hidden` on <body> as a scroll
    // lock — the background page still rubber-bands/pans under the fixed
    // drawer, which steals real (non-zero-movement) touches meant for the
    // dropdown toggles/links inside it. Pinning body with `position: fixed`
    // at the current scroll offset is the standard cross-browser fix; we
    // restore the exact scroll position on close.
    const scrollY = window.scrollY;
    const body = document.body;
    const prevStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const raf = requestAnimationFrame(() => { if (firstRef.current) firstRef.current.focus(); });
    return () => {
      body.style.position = prevStyle.position;
      body.style.top = prevStyle.top;
      body.style.left = prevStyle.left;
      body.style.right = prevStyle.right;
      body.style.width = prevStyle.width;
      body.style.overflow = prevStyle.overflow;
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const toggleSection = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }));

  return (
    <>
      <div className={'mnav-scrim' + (open ? ' open' : '')} onClick={onClose} aria-hidden="true" />
      <div className={'mnav' + (open ? ' open' : '')} role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open} ref={panelRef}>
        <div className="mnav__head">
          <Link className="brand brand--mnav" to={routes.home} onClick={onClose}><img src={logo} alt="Max-Seal Valves and Controls home" /></Link>
          <button className="mnav__close" aria-label="Close menu" onClick={onClose} ref={firstRef}><X size={22} /></button>
        </div>
        <nav className="mnav__list" aria-label="Primary">
          {MOBILE_NAV.map(n => (
            <div className="mnav__item" key={n.id}>
              <div className="mnav__row">
                <Link
                  className={'mnav__link' + (current === n.id ? ' active' : '')}
                  to={n.href}
                  onClick={onClose}
                  aria-current={current === n.id ? 'page' : undefined}
                >
                  {n.label}
                </Link>
                {n.children && (
                  <button
                    type="button"
                    className={'mnav__toggle' + (expanded[n.id] ? ' open' : '')}
                    aria-label={(expanded[n.id] ? 'Collapse ' : 'Expand ') + n.label}
                    aria-expanded={!!expanded[n.id]}
                    onClick={() => toggleSection(n.id)}
                  >
                    <ChevronDown size={20} />
                  </button>
                )}
              </div>
              {n.children && (
                <div className={'mnav__sub' + (expanded[n.id] ? ' open' : '')}>
                  {n.children.map(c => (
                    <Link key={c.label} className={'mnav__sublink' + (c.all ? ' mnav__sublink--all' : '')} to={c.href} onClick={onClose}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mnav__foot">
          <Link className="ms-btn ms-btn--primary ms-btn--block ms-btn--lg" to={routes.enquiry({ intent: 'pricing' })} onClick={onClose}>Support <ArrowRight size={16} /></Link>
          <Link className="ms-btn ms-btn--outline ms-btn--block" to={routes.search()} onClick={onClose}><Search size={17} /> Search the site</Link>
          <div className="mnav__contacts">
            <Link to={routes.contact} onClick={onClose}><Phone size={16} /> Call</Link>
            <Link to={routes.contact} onClick={onClose}><Mail size={16} /> Email</Link>
            <Link to={routes.contact} onClick={onClose}><MessageCircle size={16} /> WhatsApp</Link>
          </div>
        </div>
      </div>
    </>
  );
}
