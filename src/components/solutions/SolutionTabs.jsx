import { SOLUTIONS_TABS } from '../../data/solutionsData';

export default function SolutionTabs({ activeTab, onTabChange }) {
  return (
    <div className="solutions-tabs-nav reveal" role="tablist" aria-label="Solutions navigation tabs">
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
  );
}
