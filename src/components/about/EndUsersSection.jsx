import Slot from '../Slot';
import { Star } from '../../icons/icons';

export default function EndUsersSection() {
  return (
    <section className="section" id="end-users">
      <div className="wrap">
        <div className="kicker">End users and trust</div>
        <h2 className="about__h" style={{ marginBottom: '1.4rem' }}>
          Who we serve
        </h2>
        <p className="about__p" style={{ maxWidth: '60ch', marginBottom: '1.8rem' }}>
          We supply distributors and industrial customers across data centers, oil and gas, refining, chemical processing, power, marine, HVAC and more.
        </p>
        <div className="logo-strip">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="logo-cell" key={i}>
              <Slot id={'enduser-' + i} shape="rect" fit="contain" placeholder="Logo" />
            </div>
          ))}
        </div>
        <span className="placeholder-note">
          <span className="pdot" /> Approved end-user logos load here once confirmed
        </span>

        <div className="reviews">
          <div className="reviews__head">
            <div className="reviews__stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} />
              ))}
            </div>
            <div className="reviews__k">Google Reviews</div>
          </div>
          <p className="reviews__note">
            Verified Google Reviews connect here once the integration is approved. Review scores and text are not shown until confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
