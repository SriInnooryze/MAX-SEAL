import { Link } from 'react-router-dom';
import { FAMILIES, SUBCATEGORIES } from '../data/data';
import { Phone, Mail, MessageCircle } from '../icons/icons';
import { routes } from '../router/paths';
import logo from '../assets/maxseal-logo.png';

export default function Footer() {
  const subNameById = Object.fromEntries(SUBCATEGORIES.map(s => [s.id, s.name]));
  const colProducts = FAMILIES.map(f => ({ label: subNameById[f.subcategoryId] || f.name, href: routes.productDetail(f.id) }));
  const colCompany = [
    { label: 'About', href: routes.about }, { label: 'Team', href: routes.about + '#how-we-grew' },
    { label: 'End Users', href: routes.about + '#who-we-serve' }, { label: 'Global Partners', href: routes.about + '#global-partners' },
    { label: 'Contact', href: routes.contact },
  ];
  const colResources = [
    { label: 'Catalog', href: routes.catalog() }, { label: 'Marketing Resources', href: routes.marketing },
    { label: 'Price Lists', href: routes.priceLists },
  ];
  const colSupport = [
    { label: 'Request a Quote', href: routes.enquiry({ intent: 'pricing' }) },
    { label: 'Ask the Engineers', href: routes.enquiry({ intent: 'technical' }) },
    { label: 'Contact', href: routes.contact },
  ];
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div className="foot__top">
          <div className="foot__brand">
            <img src={logo} alt="Max-Seal" />
            <p className="foot__tagline">Highly engineered butterfly valves and automation packages supplied to distributors and industrial teams since 2008.</p>
          </div>
          <div className="foot__col"><h5>Products</h5>{colProducts.map(l => <Link key={l.label} to={l.href}>{l.label}</Link>)}</div>
          <div className="foot__col"><h5>Company</h5>{colCompany.map(l => <Link key={l.label} to={l.href}>{l.label}</Link>)}</div>
          <div className="foot__col"><h5>Resources</h5>{colResources.map(l => <Link key={l.label} to={l.href}>{l.label}</Link>)}</div>
          <div className="foot__col">
            <h5>Support</h5>
            {colSupport.map(l => <Link key={l.label} to={l.href}>{l.label}</Link>)}
            <div className="foot__contacts">
              <Link to={routes.contact}><Phone size={16} /> Call our team</Link>
              <Link to={routes.contact}><Mail size={16} /> Email an enquiry</Link>
              <Link to={routes.contact}><MessageCircle size={16} /> Message on WhatsApp</Link>
            </div>
          </div>
        </div>
        <div className="foot__bottom">
          <span className="foot__copyright">© 2026 Max-Seal Inc. All rights reserved.</span>
          <span className="foot__attribution">Designed by InnooRyze</span>
          <div className="foot__legal">
            <Link to={routes.terms}>Terms and Conditions</Link>
            <Link to={routes.privacy}>Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
