import { Link } from 'react-router-dom';
import { FAMILIES, RESOURCE_LIBS, INDUSTRIES } from '../data/data';
import { ArrowRight } from '../icons/icons';
import { routes } from '../router/paths';

export default function DropdownContent({ kind }) {
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
        {INDUSTRIES.slice(0, 8).map(x => (
          <Link key={x.id} className="drop-link" to={routes.industryDetail(x.id)}>
            <strong>{x.name}</strong>
          </Link>
        ))}
        <div className="drop-foot"><Link className="link-arrow" to={routes.industries()}>All industries <ArrowRight size={17} /></Link></div>
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
        <div className="drop-foot"><Link className="link-arrow" to={routes.resources}>All resources <ArrowRight size={17} /></Link></div>
      </div>
    );
  }
  if (kind === 'about') {
    const links = [
      { t: 'Company', d: 'Overview, history and quality', href: routes.about + '#company' },
      { t: 'Team', d: 'Leadership and people', href: routes.about + '#team' },
      { t: 'End Users', d: 'Who we serve', href: routes.about + '#end-users' },
      { t: 'Global Partners', d: 'Distributors worldwide', href: routes.partners },
    ];
    return (
      <div className="dropdown">
        {links.map(l => (
          <Link key={l.t} className="drop-link" to={l.href}><strong>{l.t}</strong><span>{l.d}</span></Link>
        ))}
      </div>
    );
  }
  return null;
}
