import { Link } from 'react-router-dom';
import { SOLUTIONS_SERIES } from '../../data/solutionsData';
import { ArrowRight, Settings } from '../../icons/icons';

export default function ProductSeriesTab() {
  return (
    <div className="solutions-grid tab-content">
      {SOLUTIONS_SERIES.map((s) => (
        <div key={s.id} className="series-card">
          <div>
            <h3 className="series-card__title">
              <Settings size={18} style={{ color: 'var(--azure-500)', flexShrink: 0 }} />
              {s.title}
            </h3>
            <p className="series-card__desc">{s.desc}</p>
          </div>
          <div>
            <Link className="link-arrow" to={s.href}>
              View series specifications <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
