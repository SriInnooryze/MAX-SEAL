import { Link } from 'react-router-dom';
import { SOLUTIONS_APPLICATIONS } from '../../data/solutionsData';
import { ArrowRight, Check, Gauge, Layers, Settings, Headset } from '../../icons/icons';

const ICON_MAP = {
  check: <Check size={22} />,
  gauge: <Gauge size={22} />,
  layers: <Layers size={22} />,
  settings: <Settings size={22} />,
  headset: <Headset size={22} />,
};

export default function ApplicationsTab() {
  return (
    <div className="solutions-grid tab-content">
      {SOLUTIONS_APPLICATIONS.map((s) => (
        <div key={s.id} className="solution-card">
          <div className="solution-card__ic">
            {ICON_MAP[s.iconType] || <Check size={22} />}
          </div>
          <h3 className="solution-card__title">{s.title}</h3>
          <p className="solution-card__desc">{s.desc}</p>
          <div>
            <Link className="link-arrow" to={s.href}>
              {s.linkText} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
