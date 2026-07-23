import { Link } from 'react-router-dom';
import { ArrowRight } from '../../icons/icons';
import { routes } from '../../router/paths';

export default function ClosingCTA() {
  return (
    <div className="contact-cta reveal" style={{ marginTop: '4.5rem' }}>
      <h3>Need a customized sizing or selection?</h3>
      <p>
        Work directly with our North Carolina and Texas-based engineers to configure the right valve, seat material, and actuator packages for your process conditions.
      </p>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'technical' })}>
          Request Engineering Support <ArrowRight size={16} />
        </Link>
        <Link className="ms-btn ms-btn--outline" to={routes.contact}>
          Find a Partner
        </Link>
      </div>
    </div>
  );
}
