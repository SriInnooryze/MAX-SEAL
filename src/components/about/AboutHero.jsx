import PageHero from '../PageHero';
import { routes } from '../../router/paths';
import teamPhotoImg from '../../assets/about/team-photo.jpg';

export default function AboutHero() {
  return (
    <PageHero
      kicker="About Max-Seal"
      title="Highly engineered valves, supplied with real support"
      lead="A US based manufacturer and supplier of manual and automated butterfly valve solutions, working with distributors and industrial teams since 2008."
      crumbs={[{ label: 'Home', href: routes.home }, { label: 'About' }]}
      mediaId="about-hero"
      mediaSrc={teamPhotoImg}
      mediaPosition="center top"
      mediaPlaceholder="Max-Seal Team"
    />
  );
}
