import { SOLUTIONS_SERVICES } from '../../data/solutionsData';
import { Sliders, Layers, Settings, Gauge } from '../../icons/icons';

const ICON_MAP = {
  sliders: <Sliders size={22} />,
  layers: <Layers size={22} />,
  settings: <Settings size={22} />,
  gauge: <Gauge size={22} />,
};

/* Reuses the existing .solution-card treatment (shared with ApplicationsTab)
   so icon/title/desc styling, colors and hover state all come from the same
   system pattern — only the grid layout below is service-specific (2x2 on
   desktop/tablet, single column on mobile). No "Learn More" link is added:
   these are capability descriptions, not entries with a dedicated detail
   page, so a link would have nowhere real to go. */
export default function EngineeringServicesTab() {
  return (
    <div className="services-grid-2x2 tab-content">
      {SOLUTIONS_SERVICES.map((s, idx) => (
        <div key={idx} className="solution-card">
          <div className="solution-card__ic">
            {ICON_MAP[s.iconType] || <Settings size={22} />}
          </div>
          <h3 className="solution-card__title">{s.title}</h3>
          <p className="solution-card__desc">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
