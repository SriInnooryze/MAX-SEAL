/* Max-Seal — About: company story with confirmed facts. */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';

import AboutHero from '../components/about/AboutHero';
import CompanyIntro from '../components/about/CompanyIntro';
import HistoryTimeline from '../components/about/HistoryTimeline';
import LeadershipSection from '../components/about/LeadershipSection';
import FactsSection from '../components/about/FactsSection';
import TeamSection from '../components/about/TeamSection';
import EndUsersSection from '../components/about/EndUsersSection';
import GlobalPartnersSection from '../components/about/GlobalPartnersSection';
import ClosingCTA from '../components/about/ClosingCTA';

/* The About submenu (desktop dropdown, mobile drawer, footer) links here as
   /about#section-id instead of separate pages — see Header/DropdownContent/
   MobileNav/Footer. react-router-dom's BrowserRouter (not a data router) has
   no built-in scroll-to-hash behavior, for either a fresh cross-page load or
   a same-page hash-only click, so this effect owns it directly: whenever the
   hash changes, scroll the matching section into view. scroll-margin-top on
   `.about-page section[id]` (pages.css) keeps the heading clear of the
   sticky header without any manual offset math here.
   A single early rAF isn't safe: HistoryTimeline's own mobile sticky stage
   attaches (and adds ~1 viewport-height per milestone to the page) a tick
   after mount, once its `enhanced` effect flips. Calling scrollIntoView
   before that lands computes a target against a page that's about to grow
   taller, and the in-progress smooth-scroll animation doesn't retarget once
   it's moved shorter of it. So this polls document.documentElement.
   scrollHeight across a few animation frames and only scrolls once it's
   stopped changing between two consecutive frames — capped at 10 attempts
   (~160ms at 60fps) so it can never loop indefinitely even if something
   never settles.
   That covers the timeline's own layout growth, but not every possible
   late shift (e.g. a web font swapping in after its network request
   settles reflows text sitting above the target). Rather than chase every
   such source individually, a single bounded correction covers all of
   them: ~2s after the first scroll starts — comfortably past how long a
   smooth scroll across this page's full height takes to finish — re-check
   the target's position and re-issue scrollIntoView only if it's still off
   by more than a few pixels. Exactly one correction, never a loop. */
function useHashScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    let cancelled = false;
    let lastHeight = -1;
    let attempts = 0;
    let raf;
    let correctionTimer;

    function scrollToTarget() {
      const el = document.getElementById(id);
      if (!el) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }

    function attempt() {
      if (cancelled) return;
      const height = document.documentElement.scrollHeight;
      attempts += 1;
      if (height !== lastHeight && attempts < 10) {
        lastHeight = height;
        raf = requestAnimationFrame(attempt);
        return;
      }
      scrollToTarget();
      correctionTimer = setTimeout(() => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (!el) return;
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        const offBy = Math.abs(el.getBoundingClientRect().top - margin);
        if (offBy > 4) scrollToTarget();
      }, 2000);
    }

    raf = requestAnimationFrame(attempt);
    return () => { cancelled = true; cancelAnimationFrame(raf); clearTimeout(correctionTimer); };
  }, [hash]);
}

export default function About() {
  useSiteChrome();
  useHashScroll();

  return (
    <main className="about-page">
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Company Introduction — #who-we-are */}
      <CompanyIntro />

      {/* 3. History Timeline — #how-we-grew */}
      <HistoryTimeline />

      {/* 4. Leadership Section */}
      <LeadershipSection />

      {/* 5. Facts & Statistics */}
      <FactsSection />

      {/* 6. Team */}
      <TeamSection />

      {/* 7. End Users & Trust — #who-we-serve */}
      <EndUsersSection />

      {/* 8. Global Partners — #global-partners */}
      <GlobalPartnersSection />

      {/* 9. Closing CTA */}
      <ClosingCTA />
    </main>
  );
}
