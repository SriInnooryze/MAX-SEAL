/* Max-Seal — Global Partners: region selector + location panel. */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { REGIONS } from '../data/data';
import { ArrowRight, Globe, MapPin, Headset } from '../icons/icons';
import { routes } from '../router/paths';

export default function GlobalPartners() {
  const [active, setActive] = useState(REGIONS[0].id);
  const region = REGIONS.find(r => r.id === active) || REGIONS[0];

  return (
    <main>
        <PageHero kicker="Global Partners" title="A worldwide distributor network"
          lead="Max-Seal sells through distribution and supports industrial teams worldwide. Choose a region to see facilities, sales offices and partner contacts."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'About', href: routes.about }, { label: 'Global Partners' }]}
          mediaId="partners-hero" mediaPlaceholder="World map or facility visual" />

        <section className="section">
          <div className="wrap">
            <div className="gp">
              <div className="gp__regions" role="tablist" aria-label="Regions">
                {REGIONS.map(r => (
                  <button key={r.id} role="tab" aria-selected={r.id === active} className={'gp__region' + (r.id === active ? ' on' : '')} onClick={() => setActive(r.id)}>
                    <span className="gp__region-bar" />
                    <span className="gp__region-body"><span className="gp__region-name">{r.name}</span><span className="gp__region-blurb">{r.blurb}</span></span>
                    <span className="gp__region-arr"><ArrowRight size={17} /></span>
                  </button>
                ))}
              </div>

              <div className="gp__panel" key={region.id}>
                <div className="gp__map"><image-slot id={'gp-map-' + region.id} shape="rect" fit="cover" placeholder={region.name + ' map or facility visual'} />
                  <div className="gp__map-cap"><Globe size={16} /> {region.name}</div>
                </div>
                <div className="gp__locations">
                  {region.locations.map((l, i) => (
                    <div className="gp__loc" key={i}>
                      <div className="gp__loc-ic"><MapPin size={18} /></div>
                      <div><div className="gp__loc-kind">{l.kind}</div><div className="gp__loc-place">{l.place}</div><div className="gp__loc-country">{l.country}</div></div>
                    </div>
                  ))}
                  <span className="placeholder-note"><span className="pdot" /> Partner names and addresses load through the CMS once confirmed</span>
                </div>
                <div className="gp__actions">
                  <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.enquiry({ intent: 'general' })}>Distributor enquiry <ArrowRight size={15} /></Link>
                  <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.enquiry({ intent: 'technical' })}><Headset size={15} /> Request support</Link>
                </div>
              </div>
            </div>

            <div className="gp__become">
              <div><h3>Become a distributor</h3><p>Interested in representing Max-Seal in your region? Start a general enquiry and our team will follow up.</p></div>
              <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'general' })}>Become a partner <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
    </main>
  );
}
