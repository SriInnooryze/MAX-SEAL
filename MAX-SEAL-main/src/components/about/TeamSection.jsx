import { TEAM } from '../../data/data';
import { getInitials } from '../../data/aboutData';
import martinImg from '../../assets/about/martin.png';
import joseImg from '../../assets/about/jose-villa.png';

/* Martin and Jose already get full photo cards in LeadershipSection above —
   mirrored here (photo instead of initials) so the same two people don't
   look inconsistent between the two sections. Everyone else on the team
   keeps the initials badge (no photo asset supplied for them yet). */
const TEAM_PHOTOS = {
  'Martin Gibbons': martinImg,
  'Jose Villa': joseImg,
};

export default function TeamSection() {
  return (
    <section className="section section--sunken" id="team">
      <div className="wrap">
        <div className="kicker">LEADERSHIP AND PEOPLE</div>
        <h2 className="about__h" style={{ marginBottom: '1rem' }}>
          People supporting product selection and customer needs
        </h2>
        <p className="about__p" style={{ marginBottom: '1.8rem' }}>
          Max-Seal's team supports customers across valve selection, inside sales, outside sales, operations and application requirements.
        </p>
        <div className="team-grid">
          {TEAM.map((m) => {
            const photo = TEAM_PHOTOS[m.name];
            return (
              <div className="team-card" key={m.id}>
                {photo ? (
                  <img className="team-card__photo" src={photo} alt={m.name} style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                ) : (
                  <span className="team-card__badge" aria-hidden="true">{getInitials(m.name)}</span>
                )}
                <div className="team-card__name">{m.name}</div>
                <div className="team-card__role">{m.role}</div>
                {m.experience && <p className="team-card__exp">{m.experience}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
