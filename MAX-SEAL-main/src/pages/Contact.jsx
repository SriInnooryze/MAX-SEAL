/* Max-Seal — Contact. */
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { COMPANY } from '../data/data';
import { Phone, Mail, MessageCircle, MapPin, FileText, ArrowRight, Headset } from '../icons/icons';
import { routes } from '../router/paths';
import useSiteChrome from '../hooks/useSiteChrome';
import contactHero from '../assets/contact/Contact-Hero.png';

export default function Contact() {
  useSiteChrome();
  return (
    <main className="contact-page">
        <PageHero className="page-hero--slim" kicker="Contact" title="Talk to Max-Seal"
          lead="Reach our team by phone, email or WhatsApp. For pricing or technical support, start an enquiry and choose your intent."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Contact' }]}
          mediaId="contact-hero" mediaSrc={contactHero} mediaPlaceholder="Facility visual" />
        <section className="section">
          <div className="wrap">
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-block">
                  <div className="contact-block__ic"><Phone size={20} /></div>
                  <div><h4>Call</h4><a href={'tel:+1' + COMPANY.phone.replace(/\D/g, '')}>{COMPANY.phone}</a></div>
                </div>
                <div className="contact-block">
                  <div className="contact-block__ic"><FileText size={20} /></div>
                  <div><h4>Fax</h4><a href={'tel:+1' + COMPANY.fax.replace(/\D/g, '')}>{COMPANY.fax}</a></div>
                </div>
                <div className="contact-block">
                  <div className="contact-block__ic"><Mail size={20} /></div>
                  <div><h4>Email</h4><a href={'mailto:' + COMPANY.email}>{COMPANY.email}</a></div>
                </div>
                <div className="contact-block">
                  <div className="contact-block__ic"><MessageCircle size={20} /></div>
                  <div><h4>WhatsApp</h4><a href="#" aria-label="Message our team on WhatsApp">Message our team</a></div>
                </div>
                <div className="contact-block">
                  <div className="contact-block__ic"><MapPin size={20} /></div>
                  <div>
                    <h4>US locations</h4>
                    <div className="contact-locs">
                      {COMPANY.facilities.map(f => (
                        <p key={f.id}>{f.addressLine || `${f.city}, ${f.state}`}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-map"><image-slot id="contact-map" shape="rect" fit="cover" src={contactHero} placeholder="Map or facility photo" /></div>
            </div>
          </div>
        </section>

        {/* Reuses Home's .convert closing-CTA pattern (src/styles/home.css)
            so this reads as the same shared site pattern used on Home and
            About's closing sections, instead of the page-specific light
            .contact-cta treatment it replaced. */}
        <section className="convert">
          <div className="wrap convert__inner reveal">
            <div className="kicker kicker--ondark">ENQUIRIES</div>
            <h2 className="convert__t">Have a specific requirement?</h2>
            <p className="convert__lead">Start an enquiry and choose request pricing, ask a technical question, general enquiry or a price list request. One form, the right team. We aim to respond within one business day.</p>
            <div className="convert__actions">
              <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'pricing' })}>Request a Quote <ArrowRight size={16} /></Link>
              <Link className="ms-btn ms-btn--on-dark" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask a technical question</Link>
            </div>
          </div>
        </section>
    </main>
  );
}
