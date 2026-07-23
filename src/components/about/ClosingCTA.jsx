import { Link } from 'react-router-dom';
import { ArrowRight } from '../../icons/icons';
import { routes } from '../../router/paths';

export default function ClosingCTA() {
  return (
    <section className="section section--sunken">
      <div className="wrap about__cta">
        <h2 className="about__h">Talk to the Max-Seal team</h2>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'pricing' })}>
            Request a Quote <ArrowRight size={16} />
          </Link>
          <Link className="ms-btn ms-btn--outline" to={routes.contact}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
