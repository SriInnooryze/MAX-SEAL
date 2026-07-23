/* Max-Seal — About: company story with confirmed facts. */
import useSiteChrome from '../hooks/useSiteChrome';
import Header from '../components/Header';
import Footer from '../components/Footer';

import AboutHero from '../components/about/AboutHero';
import CompanyIntro from '../components/about/CompanyIntro';
import HistoryTimeline from '../components/about/HistoryTimeline';
import LeadershipSection from '../components/about/LeadershipSection';
import FactsSection from '../components/about/FactsSection';
import TeamSection from '../components/about/TeamSection';
import EndUsersSection from '../components/about/EndUsersSection';
import ClosingCTA from '../components/about/ClosingCTA';

export default function About() {
  useSiteChrome();

  return (
    <>
      <Header current="about" />
      <main>
        {/* 1. Hero Section */}
        <AboutHero />

        {/* 2. Company Introduction */}
        <CompanyIntro />

        {/* 3. History Timeline (Restored) */}
        <HistoryTimeline />

        {/* 4. Leadership Section */}
        <LeadershipSection />

        {/* 5. Facts & Statistics */}
        <FactsSection />

        {/* 6. Team */}
        <TeamSection />

        {/* 7. End Users & Trust */}
        <EndUsersSection />

        {/* 8. Closing CTA */}
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
