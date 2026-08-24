/* Application Explorer — interactive butterfly valve component guide for
   the Home page. Replaces the visible Case Studies block (see
   src/pages/Home.jsx — CaseStudies is still rendered there, just
   commented out and preserved).

   Visual: the real Resilient Seated Butterfly Valve product photo
   (same asset FAMILIES PROD-001 uses on the product pages/catalog — not
   a new image, not a generic diagram, not a third-party illustration),
   with numbered hotspot buttons positioned over its actual components
   (actuator, stem, disc, seat, body, end connection). Hotspot positions
   are percentage offsets tuned by eye against this specific photo; if the
   asset is ever swapped, these will need re-tuning against the new image. */
import { useState } from 'react';
import { EXPLORER_ITEMS } from '../../data/data';
import valveImg from '../../assets/products/resilient-seated.png';

const cx = (...parts) => parts.filter(Boolean).join(' ');

/* left/top as % of the image box, matched by eye to
   src/assets/products/resilient-seated.png (a lug-style resilient seated
   butterfly valve with a pneumatic actuator, shot front-on). */
const HOTSPOTS = {
  actuator: { left: '52%', top: '15%' },
  stem: { left: '52%', top: '35%' },
  disc: { left: '50%', top: '68%' },
  seat: { left: '24%', top: '70%' },
  body: { left: '18%', top: '52%' },
  'end-connection': { left: '80%', top: '58%' },
};

export default function ApplicationExplorer() {
  const [active, setActive] = useState('disc');
  const cur = EXPLORER_ITEMS.find((i) => i.id === active) || EXPLORER_ITEMS[0];

  return (
    <section className="explorer">
      <div className="wrap">
        <div className="explorer__head reveal">
          <div className="kicker">APPLICATION EXPLORER</div>
          <h2 className="shead__title explorer__title-main">Explore valve components and application considerations</h2>
          <p className="explorer__lead">Select a key valve area to understand what it does and what to review during product selection.</p>
        </div>

        <div className="explorer__panel reveal">
          <div className="explorer__visual">
            <img src={valveImg} alt="Max-Seal resilient seated butterfly valve with pneumatic actuator" className="explorer__img" />
            {EXPLORER_ITEMS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={cx('explorer__hotspot', active === item.id && 'on')}
                style={HOTSPOTS[item.id]}
                aria-pressed={active === item.id}
                aria-label={item.label}
                onClick={() => setActive(item.id)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="explorer__card">
            <div key={cur.id}>
              <span className="explorer__ctag">{cur.label}</span>
              <h3 className="explorer__ctitle">{cur.title}</h3>
              <p className="explorer__cbody">{cur.body}</p>
              <ul className="explorer__bullets">
                {cur.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>

            <div className="explorer__labels" role="tablist" aria-label="Valve components">
              {EXPLORER_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={active === item.id}
                  className={cx('explorer__label', active === item.id && 'on')}
                  onClick={() => setActive(item.id)}
                >
                  <span className="explorer__label-no">{i + 1}</span>{item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
