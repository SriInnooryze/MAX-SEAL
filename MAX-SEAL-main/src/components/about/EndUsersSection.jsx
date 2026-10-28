import { Link } from 'react-router-dom';
import { INDUSTRIES } from '../../data/data';
import { Headset } from '../../icons/icons';
import { routes } from '../../router/paths';

/* Real logo files placed at src/assets/about/end-users/ — extensions are
   mixed (svg/png/webp) by design, so a glob (not named imports) is what
   actually satisfies "don't assume every file is SVG": Vite resolves every
   file in the folder up front regardless of extension, keyed by its full
   path. If a given id has no matching file (missing, renamed, or a future
   entry added before its asset lands), `findLogo` simply returns null and
   the card below falls back to a plain text tile instead of a broken
   <img> or a failed build. */
const logoModules = import.meta.glob('../../assets/about/end-users/*', { eager: true, import: 'default' });
function findLogo(id) {
  const key = Object.keys(logoModules).find((k) => k.includes('/' + id + '.'));
  return key ? logoModules[key] : null;
}

/* Exactly the 9 logo assets currently provided — preserved real names,
   never extended with names that don't have an approved asset yet
   (Pemex, Obeikan Paper Industries, Pakistan Oilfields are intentionally
   excluded until their logos are supplied). */
const END_USER_IDS = [
  ['logo-3m', '3M, Inc.'],
  ['logo-basf', 'BASF Corporation'],
  ['logo-cargill', 'Cargill'],
  ['logo-caterpillar', 'Caterpillar'],
  ['logo-nasa', 'NASA'],
  ['logo-spacex', 'SpaceX'],
  ['logo-spie', 'SPIE Oil & Gas Services Congo'],
  ['logo-pakistan-tobacco', 'Pakistan Tobacco Company'],
  ['logo-intel-israel', 'Intel Israel'],
];
const END_USERS = END_USER_IDS.map(([id, name]) => ({ id, name, logo: findLogo(id) }));

/* Client-supplied list (About page feedback), in the client's own wording
   and order. A market with a matching INDUSTRIES entry links to it; the rest
   (Steel & iron, LNG, HRSG, Desalination, Fiber) have none and stay plain. */
const SERVED_MARKETS = [
  ['Chemical & petrochemical', 'petrochemical'],
  ['Power generation plants', 'power'],
  ['Ship building industries', 'marine'],
  ['Steel & iron industries'],
  ['Pulp & paper plants', 'pulp-paper'],
  ['Coal & mining industries', 'mining'],
  ['Higher Pressure HVAC Applications', 'hvac'],
  ['Food industries', 'food-beverage'],
  ['LNG'],
  ['HRSG industries'],
  ['Oil refinery industries', 'refining'],
  ['Desalination industries'],
  ['Fiber Industries'],
].map(([name, id]) => ({ name, industry: INDUSTRIES.some((x) => x.id === id) ? id : null }));

export default function EndUsersSection() {
  return (
    <section className="section about-serve" id="who-we-serve">
      <div className="wrap about-serve__wrap">
        <div className="about-serve__intro">
          <div className="kicker">WHO WE SERVE</div>
          <h2 className="about__h" style={{ marginBottom: '1rem' }}>
            Supporting industrial teams across demanding markets
          </h2>
          <p className="about__p" style={{ maxWidth: '46ch' }}>
            Max-Seal supports distributors, OEMs and industrial customers with butterfly valve solutions for process, infrastructure and industrial applications.
          </p>
          <p className="about-serve__note">
            Selected end-user examples shown here are listed in current Max-Seal materials. They are presented as product-use references, not endorsements.
          </p>

          <div className="about-serve__cta">
            <span className="about-serve__cta-text">Need support for a specific application?</span>
            <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.enquiry({ intent: 'technical' })}>
              <Headset size={15} /> Ask the Engineers
            </Link>
          </div>
        </div>

        <div className="about-serve__panel">
          <span className="about-serve__panel-label">Selected end-user examples</span>
          <div className="about-serve__logos">
            {END_USERS.map((item) => (
              <div className="about-serve__logo-card" key={item.id}>
                {item.logo ? (
                  <img className="about-serve__logo" src={item.logo} alt={item.name} loading="lazy" />
                ) : (
                  <span className="about-serve__logo-fallback">{item.name}</span>
                )}
              </div>
            ))}
          </div>
          <p className="about-serve__caption">
            Max-Seal products are listed in current Max-Seal materials across industrial, infrastructure, energy, food, aerospace and international market applications.
          </p>

          <div className="about-serve__markets">
            <span className="about-serve__panel-label">Markets served</span>
            <div className="about-serve__chips">
              {SERVED_MARKETS.map((m) => (m.industry
                ? <Link className="about-serve__chip about-serve__chip--link" key={m.name} to={routes.industryDetail(m.industry)}>{m.name}</Link>
                : <span className="about-serve__chip" key={m.name}>{m.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
