import { Link } from 'react-router-dom';
import { ArrowRight } from '../../icons/icons';
import { routes } from '../../router/paths';

/* Reuses Home's .convert closing-CTA pattern (src/styles/home.css), same as
   About's ClosingCTA, so this reads as one shared site pattern rather than
   the page-specific light .contact-cta treatment it replaced. Rendered as a
   top-level section in Solutions.jsx (outside .wrap) so the navy background
   runs full-bleed instead of being constrained to the content width. */
export default function ClosingCTA() {
  return (
    <section className="convert">
      <div className="wrap convert__inner reveal">
        <div className="kicker kicker--ondark">CUSTOM ENGINEERING</div>
        <h2 className="convert__t">Need a customized sizing or selection?</h2>
        <p className="convert__lead">Work directly with our North Carolina and Texas-based engineers to configure the right valve, seat material, and actuator packages for your process conditions.</p>
        <div className="convert__actions">
          <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'technical' })}>
            Request Engineering Support <ArrowRight size={16} />
          </Link>
          <Link className="ms-btn ms-btn--on-dark" to={routes.contact}>
            Find a Partner
          </Link>
        </div>
      </div>
    </section>
  );
}
