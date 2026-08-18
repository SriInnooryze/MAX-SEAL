import { Link } from 'react-router-dom';
import { ArrowRight } from '../../icons/icons';
import { routes } from '../../router/paths';

/* Reuses Home's .convert closing-CTA pattern (src/styles/home.css) so the
   final section reads as one shared site pattern rather than a page-specific
   treatment — .convert already renders a solid navy background on its own
   (no image required), so this stays image-free. The lead paragraph reuses
   the same .convert__lead class Home's Conversion section already uses, so
   it centers correctly with no CSS changes needed. */
export default function ClosingCTA() {
  return (
    <section className="convert">
      <div className="wrap convert__inner reveal">
        <div className="kicker kicker--ondark">LET'S TALK</div>
        <h2 className="convert__t">Talk to the Max-Seal team</h2>
        <p className="convert__lead">Share your valve requirement, application question or support need and the team will help route the next step.</p>
        <div className="convert__actions">
          <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'pricing' })}>
            Request a Quote <ArrowRight size={16} />
          </Link>
          <Link className="ms-btn ms-btn--on-dark" to={routes.contact}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
