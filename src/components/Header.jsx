import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NAV } from '../data/data';
import { Search, ChevronDown, Phone, Mail, MessageCircle, ArrowRight, Menu } from '../icons/icons';
import { routes } from '../router/paths';
import DropdownContent from './DropdownContent';
import MobileNav from './MobileNav';
import logo from '../assets/maxseal-logo.png';

export default function Header({ current }) {
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeT = useRef(null);
  const enter = (id) => { clearTimeout(closeT.current); setOpen(id); };
  const leave = () => { closeT.current = setTimeout(() => setOpen(null), 130); };

  return (
    <>
      <div className="topbar">
        <div className="wrap topbar__row">
          <span className="topbar__tagline">US based manufacturer and supplier of industrial butterfly valves</span>
          <div className="topbar__group">
            <Link to={routes.contact}><Phone size={14} /> Call</Link>
            <span className="topbar__sep" />
            <Link to={routes.contact}><Mail size={14} /> Email</Link>
            <span className="topbar__sep" />
            <Link to={routes.contact}><MessageCircle size={14} /> WhatsApp</Link>
          </div>
        </div>
      </div>

      <header className="site-header" onMouseLeave={leave}>
        <div className="wrap site-header__row">
          <Link className="brand" to={routes.home}><img src={logo} alt="Max-Seal Valves and Controls" /></Link>
          <nav className="mainnav">
            {NAV.map((n) => (
              <div key={n.id} className={'navitem' + (n.dropdown && open === n.id ? ' open' : '') + (current === n.id ? ' active' : '')}
                onMouseEnter={() => n.dropdown ? enter(n.id) : leave()}>
                <Link to={n.href}>{n.label}{n.dropdown && <ChevronDown size={15} />}</Link>
                {n.dropdown && <DropdownContent kind={n.dropdown} />}
              </div>
            ))}
          </nav>
          <div className="header__actions">
            <Link className="ms-iconbtn" aria-label="Search" to={routes.search()}><Search size={20} /></Link>
            <Link className="ms-btn ms-btn--primary header__quote" to={routes.enquiry({ intent: 'pricing' })}>Support <ArrowRight size={16} /></Link>
            <button className="ms-iconbtn menu-toggle" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} current={current} />
    </>
  );
}
