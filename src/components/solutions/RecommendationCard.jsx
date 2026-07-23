import { Link } from 'react-router-dom';
import { ArrowRight, Info } from '../../icons/icons';
import { routes } from '../../router/paths';

export default function RecommendationCard({ recommendation }) {
  const { title, desc, link, linkText, ctaText, isAutomated } = recommendation;

  return (
    <div className="sizing-rec">
      <div>
        <div className="sizing-rec__header">
          <Info size={14} /> Recommended Configuration
        </div>
        <h4 className="sizing-rec__title">{title}</h4>
        <p className="sizing-rec__desc">{desc}</p>
        {isAutomated && (
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--azure-500)',
              marginTop: '-1rem',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}
          >
            ★ Recommended with pre-tested pneumatic or electric actuator package.
          </p>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        <Link className="ms-btn ms-btn--primary ms-btn--sm" to={link}>
          {linkText} <ArrowRight size={15} />
        </Link>
        <Link
          className="ms-btn ms-btn--outline ms-btn--on-dark ms-btn--sm"
          to={routes.enquiry({ intent: 'technical' })}
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
