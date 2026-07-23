import { SOLUTIONS_SERVICES } from '../../data/solutionsData';

export default function EngineeringServicesTab() {
  return (
    <div className="services-grid tab-content">
      {SOLUTIONS_SERVICES.map((s, idx) => (
        <div key={idx} className="service-item">
          <h4>{s.title}</h4>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
