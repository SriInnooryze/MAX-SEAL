import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, SUBCATEGORIES, RESOURCE_LIBS, INDUSTRIES } from '../data/data';
import { ArrowRight } from '../icons/icons';
import { routes } from '../router/paths';

/* Client-priority order for the Industries dropdown preview (Priority 4 nav
   cleanup). This curates which of the 13 real INDUSTRIES entries appear in
   the menu and in what order — it intentionally does not reorder the
   INDUSTRIES array itself, so the full Industries matrix page is untouched.
   Two client-requested categories ("Critical Infrastructure",
   "Industrial Automation") have no matching INDUSTRIES entry yet and are
   left out rather than linked to a fake/mismatched page — see Priority 4
   nav report for follow-up. */
export const INDUSTRY_MENU_IDS = ['data-centers', 'hvac', 'power', 'oil-gas', 'refining', 'petrochemical', 'food-beverage', 'marine', 'transportation'];
const industryMenuItems = INDUSTRY_MENU_IDS.map(id => INDUSTRIES.find(x => x.id === id)).filter(Boolean);

/* Two-level Products flyout: Categories (Sub Category-1's parent) on the
   left, and — once a category is hovered/focused/tapped — that category's
   active Subcategories on the right. Both columns come straight from the
   Categories/Subcategories catalog data (CategoryId is the FK), so adding a
   row in Excel is the only way to add or move an entry here. */
function ProductsDropdown({ onNavigate }) {
  const activeCategories = CATEGORIES.filter(c => c.status === 'active');
  const [openCat, setOpenCat] = useState(null);
  const activeCategory = activeCategories.find(c => c.id === openCat) || null;
  const subs = activeCategory
    ? SUBCATEGORIES.filter(s => s.categoryId === activeCategory.id && s.status === 'active')
    : [];

  return (
    <div
      className={'dropdown dropdown--products' + (activeCategory && subs.length ? ' has-sub' : '')}
      onMouseLeave={() => setOpenCat(null)}
    >
      <div className="dropdown__col">
        {activeCategories.map(c => (
          <Link
            key={c.id}
            className={'drop-link' + (c.id === openCat ? ' on' : '')}
            to={routes.products({ category: c.id })}
            onMouseEnter={() => setOpenCat(c.id)}
            onFocus={() => setOpenCat(c.id)}
            onClick={onNavigate}
          >
            <strong>{c.name}</strong>
          </Link>
        ))}
        <div className="drop-foot"><Link className="link-arrow" to={routes.products()} onClick={onNavigate}>Explore all products <ArrowRight size={17} /></Link></div>
      </div>
      {activeCategory && subs.length > 0 && (
        <div className="dropdown__col dropdown__col--sub" onMouseEnter={() => setOpenCat(activeCategory.id)}>
          <div className="dropdown__col-title">{activeCategory.name}</div>
          {subs.map(s => (
            <Link key={s.id} className="drop-link" to={routes.productSubcategory(activeCategory.slug, s.slug)} onClick={onNavigate}>
              <strong>{s.name}</strong>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DropdownContent({ kind, onNavigate, isOpen }) {
  if (kind === 'products') {
    // Header.jsx keeps every nav item's DropdownContent mounted at all
    // times and only toggles CSS visibility (see .navitem.open .dropdown)
    // — this component itself never unmounts between opens/closes, so its
    // local "hovered category" state would otherwise leak from one open
    // session into the next (a category hovered last time would still show
    // its Sub Category-1 panel immediately on the next open, with no hover
    // at all). Keying on isOpen forces a real remount on every open/close
    // transition, which resets that state via the useState initializer —
    // the same fix already used for the Industries matrix remount.
    return <ProductsDropdown key={isOpen ? 'open' : 'closed'} onNavigate={onNavigate} />;
  }
  if (kind === 'industries') {
    return (
      <div className="dropdown dropdown--wide">
        {industryMenuItems.map(x => (
          <Link key={x.id} className="drop-link" to={routes.industryDetail(x.id)}>
            <strong>{x.name}</strong>
          </Link>
        ))}
        <div className="drop-foot"><Link className="link-arrow" to={routes.industries()}>View all industries <ArrowRight size={17} /></Link></div>
      </div>
    );
  }
  if (kind === 'resources') {
    return (
      <div className="dropdown">
        {RESOURCE_LIBS.map(r => (
          <Link key={r.id} className="drop-link" to={r.href}>
            <strong>{r.label}</strong><span>{r.desc}</span>
          </Link>
        ))}
        <div className="drop-foot"><Link className="link-arrow" to={routes.resources}>View all resources <ArrowRight size={17} /></Link></div>
      </div>
    );
  }
  if (kind === 'about') {
    // Same-page anchors into /about (client feedback: the About submenu
    // should not behave like separate disconnected pages) — see the hash
    // scroll handler in src/pages/About.jsx. onNavigate closes the dropdown
    // immediately on click: a same-page hash link doesn't remount Header
    // the way a real route change does, so without this the menu would
    // stay hover-open (mouse hasn't moved) while the page scrolls beneath it.
    const links = [
      { t: 'Company', d: 'Overview, history and quality', href: routes.about + '#who-we-are' },
      { t: 'Team', d: 'How the company grew', href: routes.about + '#how-we-grew' },
      { t: 'End Users', d: 'Who we serve', href: routes.about + '#who-we-serve' },
      { t: 'Global Partners', d: 'Distributors worldwide', href: routes.about + '#global-partners' },
    ];
    return (
      <div className="dropdown">
        {links.map(l => (
          <Link key={l.t} className="drop-link" to={l.href} onClick={onNavigate}><strong>{l.t}</strong><span>{l.d}</span></Link>
        ))}
      </div>
    );
  }
  return null;
}
