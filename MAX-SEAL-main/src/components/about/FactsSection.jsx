import { Link } from 'react-router-dom';
import { ABOUT_FACTS } from '../../data/aboutData';
import { Globe } from '../../icons/icons';
import { routes } from '../../router/paths';

export default function FactsSection() {
  return (
    <section className="section section--sunken" id="facts">
      <div className="wrap">
        <div className="kicker">THE COMPANY AT A GLANCE</div>
        <h2 className="about__h" style={{ marginBottom: 'clamp(1.8rem,3vw,2.6rem)' }}>
          Max-Seal at a Glance
        </h2>
        <div className="factsx">
          {ABOUT_FACTS.map((f, i) => (
            <div className="factsx__item" key={i}>
              <div className="factsx__v">{f.v}</div>
              <div className="factsx__l">{f.l}</div>
              <p className="factsx__s">{f.s}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1.8rem' }}>
          <Link className="link-arrow" to={routes.about + '#global-partners'}>
            <Globe size={16} /> See our global partner network
          </Link>
        </div>
      </div>
    </section>
  );
}
