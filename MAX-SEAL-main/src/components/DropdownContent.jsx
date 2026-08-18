import { Link } from 'react-router-dom';
import { FAMILIES, RESOURCE_LIBS, INDUSTRIES } from '../data/data';
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

export default function DropdownContent({ kind, onNavigate }) {
  if (kind === 'products') {
    return (
      <div className="dropdown dropdown--wide">
        {FAMILIES.map(f => (
          <Link key={f.id} className="drop-link" to={routes.productDetail(f.id)}>
            <strong>{f.menuName}</strong><span>{f.menuDesc}</span>
          </Link>
        ))}
        <div className="drop-foot"><Link className="link-arrow" to={routes.products()}>Explore all products <ArrowRight size={17} /></Link></div>
      </div>
    );
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
