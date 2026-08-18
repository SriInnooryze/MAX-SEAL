import { SOLUTIONS_PARTNERS } from '../../data/solutionsData';
import { ArrowRight } from '../../icons/icons';

export default function PartnersTab() {
  return (
    <div className="affiliates-grid tab-content">
      {SOLUTIONS_PARTNERS.map((a, idx) => (
        <div key={idx} className="affiliate-card">
          <div>
            <div className="affiliate-card__name">{a.name}</div>
            <p className="affiliate-card__desc">{a.desc}</p>
          </div>
          <div>
            <a
              className="link-arrow"
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit brand website <ArrowRight size={15} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
