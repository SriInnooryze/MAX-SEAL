import Slot from '../Slot';
import { TEAM } from '../../data/data';

export default function TeamSection() {
  return (
    <section className="section section--sunken" id="team">
      <div className="wrap">
        <div className="kicker">Team</div>
        <h2 className="about__h" style={{ marginBottom: '1.6rem' }}>
          Leadership and people
        </h2>
        <div className="team-grid">
          {TEAM.map((m) => (
            <div className="team-card" key={m.id}>
              <div className="team-card__photo">
                <Slot
                  id={'team-' + m.id}
                  shape="rect"
                  fit="cover"
                  placeholder={m.confirmed ? m.name : 'Team photo'}
                />
              </div>
              <div className="team-card__name">{m.name}</div>
              <div className="team-card__role">{m.role}</div>
              <div className="team-card__region">{m.region}</div>
              {!m.confirmed && (
                <span className="team-card__ph">
                  <span className="pdot" /> Placeholder
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
