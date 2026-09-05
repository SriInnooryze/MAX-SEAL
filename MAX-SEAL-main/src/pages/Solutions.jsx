/* Max-Seal — Solutions page. */
import { useState } from 'react';
import useSiteChrome from '../hooks/useSiteChrome';

import HeroSection from '../components/solutions/HeroSection';
import SolutionTabs from '../components/solutions/SolutionTabs';
import ApplicationsTab from '../components/solutions/ApplicationsTab';
import EngineeringServicesTab from '../components/solutions/EngineeringServicesTab';
import PartnersTab from '../components/solutions/PartnersTab';
import VideoSection from '../components/solutions/VideoSection';
import ClosingCTA from '../components/solutions/ClosingCTA';

export default function Solutions() {
  useSiteChrome();
  const [activeTab, setActiveTab] = useState('applications');

  return (
    <>
      <style>{`
        .solutions-intro {
          max-width: 680px;
          margin-bottom: 2rem;
        }
        .solutions-intro p {
          font-size: 1.15rem;
          color: var(--graphite-700);
          line-height: 1.62;
        }

        /* Premium Tabbed Navigation Styles */
        .solutions-tabs-nav-wrap {
          position: relative;
          margin-bottom: 2.5rem;
        }
        .solutions-tabs-nav {
          display: flex;
          gap: 0.5rem;
          border-bottom: 1px solid var(--steel-200);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          scrollbar-width: none; /* Firefox */
        }
        .solutions-tabs-nav::-webkit-scrollbar {
          display: none; /* Safari/Chrome */
        }
        /* Visible cue that the row scrolls — a right-edge fade, only shown
           once content actually overflows (mobile widths), so it's obvious
           "Partners & Affiliates" is reachable by swiping instead of the tab
           silently vanishing off-screen with no hint. */
        .solutions-tabs-nav-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 1px;
          width: 2.5rem;
          background: linear-gradient(to right, rgba(255,255,255,0), var(--paper-0));
          pointer-events: none;
        }
        @media (min-width: 769px) {
          .solutions-tabs-nav-wrap::after { display: none; }
        }
        .solutions-tab-btn {
          background: none;
          border: none;
          padding: 1rem 1.5rem;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 500;
          color: var(--graphite-600);
          cursor: pointer;
          position: relative;
          white-space: nowrap;
          transition: color 200ms ease;
        }
        .solutions-tab-btn:hover {
          color: var(--graphite-900);
        }
        .solutions-tab-btn.on {
          color: var(--azure-500);
          font-weight: 600;
        }
        .solutions-tab-btn.on::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--azure-500);
        }
        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 1rem;
        }
        .solution-card {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
          transition: all 260ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .solution-card:hover {
          transform: translateY(-2px);
          border-color: var(--azure-500);
          box-shadow: var(--shadow-md);
        }
        .solution-card__ic {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: var(--paper-50);
          border: 1px solid var(--steel-200);
          color: var(--azure-500);
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
        }
        .solution-card__title {
          font-size: 1.28rem;
          font-weight: 600;
          color: var(--graphite-900);
          margin-bottom: 0.8rem;
        }
        .solution-card__desc {
          color: var(--graphite-700);
          font-size: 0.96rem;
          line-height: 1.6;
          margin-bottom: 1.8rem;
          flex: 1;
        }

        /* Product Series Listing */
        .series-card {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 200ms ease;
        }
        .series-card:hover {
          border-color: var(--azure-500);
          box-shadow: var(--shadow-sm);
        }
        .series-card__title {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--graphite-900);
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .series-card__desc {
          color: var(--graphite-700);
          font-size: 0.92rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        /* Engineering & Services — reuses .solution-card for the card shell
           (colors, border, hover) and only defines the 2x2 grid shape here:
           two equal columns on tablet/desktop, one column on mobile. */
        .services-grid-2x2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 1rem;
        }
        @media (max-width: 768px) {
          .services-grid-2x2 {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* Affiliates Section */
        .affiliates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .affiliate-card {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .affiliate-card__name {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--graphite-900);
          margin-bottom: 0.5rem;
        }
        .affiliate-card__desc {
          color: var(--graphite-600);
          font-size: 0.88rem;
          line-height: 1.5;
          margin-bottom: 1.2rem;
          flex: 1;
        }

        /* Sizing Tool Panel */
        .sizing-tool {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 2.5rem;
          margin-top: 4rem;
        }
        .sizing-tool__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        @media (max-width: 768px) {
          .sizing-tool__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .sizing-tool__title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--graphite-900);
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .sizing-tool__subtitle {
          color: var(--graphite-600);
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }
        .sizing-selector {
          margin-bottom: 1.5rem;
        }
        .sizing-selector__label {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--graphite-800);
          margin-bottom: 0.6rem;
        }
        .sizing-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .sizing-chip-btn {
          background: var(--paper-50);
          border: 1px solid var(--steel-200);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--graphite-800);
          cursor: pointer;
          transition: all 150ms ease;
        }
        .sizing-chip-btn:hover {
          border-color: var(--azure-500);
          color: var(--azure-500);
        }
        .sizing-chip-btn.on {
          background: var(--navy-800);
          color: var(--paper-50);
          border-color: var(--navy-800);
        }
        .sizing-rec {
          background: var(--navy-800);
          color: var(--paper-50);
          padding: 2.2rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .sizing-rec__header {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--azure-500);
          font-weight: 600;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .sizing-rec__title {
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--paper-50);
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }
        .sizing-rec__desc {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--steel-200);
          margin-bottom: 2rem;
          flex: 1;
        }

        /* YouTube Videos Gallery styling */
        .video-section {
          margin-top: 4.5rem;
        }
        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .video-card {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          transition: all 200ms ease;
        }
        .video-card:hover {
          border-color: var(--azure-500);
        }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Ratio */
          height: 0;
          overflow: hidden;
          border-radius: 4px;
          background: #000;
          margin-bottom: 1rem;
        }
        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .video-card__title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--graphite-900);
          margin: 0 0 0.4rem 0;
        }
        .video-card__desc {
          font-size: 0.85rem;
          color: var(--graphite-600);
          margin: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-content {
          animation: fadeIn 300ms ease forwards;
        }
      `}</style>
      <main>
        <HeroSection />

        <section className="section">
          <div className="wrap">
            <div className="solutions-intro reveal">
              <p>
                We work from your application parameters back to the valve, matching material selections, pressure ratings, and automation packages to the duty cycle. Explore our solutions, specific product series, and engineering capabilities below.
              </p>
            </div>

            {/* Four-tab Navigation */}
            <SolutionTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Contents */}
            {activeTab === 'applications' && <ApplicationsTab />}
            {activeTab === 'services' && <EngineeringServicesTab />}
            {activeTab === 'affiliates' && <PartnersTab />}

            {/* Video Demos Section */}
            <VideoSection />
          </div>
        </section>

        {/* Closing CTA — rendered outside .wrap so its .convert background
            runs full-bleed, matching Home and About's closing sections. */}
        <ClosingCTA />
      </main>
    </>
  );
}
