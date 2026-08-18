import { Link } from 'react-router-dom';
import { ArrowRight, Headset } from '../../icons/icons';
import PageHero from '../PageHero';
import { routes } from '../../router/paths';
// src/assets/about/team-photo.jpg no longer exists on disk (replaced by the
// dedicated timeline photo set) — using the 2008 founding photo here too so
// this import doesn't break the build.
import teamPhotoImg from '../../assets/about/timeline-2008-founding.jpg';

export default function AboutHero() {
  return (
    <PageHero
      className="page-hero--about"
      kicker="About Max-Seal"
      title="Engineered butterfly valves for demanding industrial applications"
      lead="Since 2008, Max-Seal has manufactured and supplied manual and automated butterfly valve solutions for distributors, OEMs and industrial customers across demanding process applications."
      crumbs={[{ label: 'Home', href: routes.home }, { label: 'About' }]}
      mediaId="about-hero"
      mediaSrc={teamPhotoImg}
      mediaPosition="center top"
      mediaPlaceholder="Max-Seal operations and valve support"
    >
      <div className="phero__actions">
        <Link className="ms-btn ms-btn--primary ms-btn--lg" to={routes.enquiry({ intent: 'pricing' })}>
          Request a Quote <ArrowRight size={16} />
        </Link>
        <Link className="ms-btn ms-btn--on-dark ms-btn--lg" to={routes.enquiry({ intent: 'technical' })}>
          <Headset size={16} /> Ask the Engineers
        </Link>
      </div>
    </PageHero>
  );
}
