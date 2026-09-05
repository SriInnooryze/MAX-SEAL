import { useRef } from 'react';
import { SOLUTIONS_TABS } from '../../data/solutionsData';
import useCenterActiveInScroller from '../../hooks/useCenterActiveInScroller';

export default function SolutionTabs({ activeTab, onTabChange }) {
  const navRef = useRef(null);

  // Same auto-scroll-into-view fix as the Industries page's horizontal
  // industry nav: center the active tab in the scrollable row whenever it
  // changes.
  useCenterActiveInScroller(navRef, '.solutions-tab-btn.on', activeTab);

  return (
    <div className="solutions-tabs-nav-wrap reveal">
      <div className="solutions-tabs-nav" role="tablist" aria-label="Solutions navigation tabs" ref={navRef}>
        {SOLUTIONS_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`solutions-tab-btn ${activeTab === tab.id ? 'on' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
