/* Max-Seal — Contact. */
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { COMPANY } from '../data/data';
import { Phone, Mail, MessageCircle, MapPin, ArrowRight, Headset } from '../icons/icons';
import { routes } from '../router/paths';

export default function Contact() {
  return (
    <main>
        <PageHero kicker="Contact" title="Talk to Max-Seal"
          lead="Reach our team by phone, email or WhatsApp. For pricing or technical support, start an enquiry and choose your intent."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Contact' }]}
          mediaId="contact-hero" mediaPlaceholder="Facility visual" />
        <section className="section">
          <div className="wrap">
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-block">
                  <div className="contact-block__ic"><Phone size={20} /></div>
                  <div><h4>Call</h4><a href="tel:+10000000000">Add phone number</a><p style={{ color: 'var(--steel-500)', fontSize: '0.85rem' }}>Confirmed number loads through the CMS</p></div>
                </div>
                <div className="contact-block">
                  <div className="contact-block__ic"><Mail size={20} /></div>
                  <div><h4>Email</h4><a href="mailto:info@max-seal.com">info@max-seal.com</a></div>
                </div>
                <div className="contact-block">
                  <div className="contact-block__ic"><MessageCircle size={20} /></div>
                  <div><h4>WhatsApp</h4><a href="#">Message our team</a></div>
                </div>
                <div className="contact-block">
                  <div className="contact-block__ic"><MapPin size={20} /></div>
                  <div><h4>US locations</h4>{COMPANY.facilities.map(f => <p key={f.id}>{f.city}, {f.state}</p>)}<p style={{ color: 'var(--steel-500)', fontSize: '0.85rem' }}>Full addresses load through the CMS</p></div>
                </div>
              </div>
              <div className="contact-map"><image-slot id="contact-map" shape="rect" fit="cover" placeholder="Map or facility photo" /></div>
            </div>
            <div className="contact-cta">
              <h3>Have a specific requirement?</h3>
              <p>Start an enquiry and choose request pricing, ask a technical question, general enquiry or a price list request. One form, the right team. We aim to respond within one business day.</p>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'pricing' })}>Request a Quote <ArrowRight size={16} /></Link>
                <Link className="ms-btn ms-btn--outline" to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask a technical question</Link>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}
