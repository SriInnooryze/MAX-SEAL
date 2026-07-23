import PageHero from '../PageHero';
import { routes } from '../../router/paths';

export default function HeroSection() {
  return (
    <PageHero
      kicker="Solutions"
      title="Engineered Solutions & Applications"
      lead="From standard isolation duties to extreme severe service, Max-Seal designs, configures, and automates butterfly valves to fit your specific operating window."
      crumbs={[{ label: 'Home', href: routes.home }, { label: 'Solutions' }]}
      mediaId="solutions-hero"
      mediaPlaceholder="Solutions engineering and application overview"
    />
  );
}
