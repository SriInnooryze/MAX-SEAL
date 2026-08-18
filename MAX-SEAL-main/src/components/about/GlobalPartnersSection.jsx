import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_PARTNER_REGIONS as REGIONS } from '../../data/data';
import { ChevronRight, Globe, Headset, MapPin } from '../../icons/icons';
import { routes } from '../../router/paths';

/* ABOUT_PARTNER_REGIONS (src/data/data.js) is this section's own dataset —
   deliberately separate from REGIONS, which stays owned by the standalone
   /partners page (src/pages/GlobalPartners.jsx) so a content fix here can
   never silently change that page too. No invented partners, locations or
   claims. Two-column panel with a clickable region selector on the right,
   built with its own about-partners__* classes (not a reuse of .gp__*).
   Location counts are exact `.length` of the real data below, never an
   invented total. */
export default function GlobalPartnersSection() {
  const [activeId, setActiveId] = useState(REGIONS[0].id);
  const region = REGIONS.find((r) => r.id === activeId) || REGIONS[0];

  return (
    <section className="section section--sunken about-partners" id="global-partners">
      <div className="wrap about-partners__wrap">
        <div className="about-partners__intro">
          <div className="kicker">GLOBAL PARTNERS</div>
          <h2 className="about__h" style={{ marginBottom: '1rem' }}>
            Partner support in key locations around the world
          </h2>
          <p className="about__p" style={{ maxWidth: '46ch' }}>
            Max-Seal works through U.S. operations, regional sales offices and partner relationships to support distributors and industrial customers across key markets.
          </p>

          <p className="about-partners__note">
            For location-specific support or distributor coordination, the Max-Seal team can help route the request to the right contact.
          </p>

          <div className="about-partners__pathways">
            <div className="about-partners__pathway">
              <span className="about-partners__pathway-ic"><MapPin size={16} /></span>
              <span>
                <span className="about-partners__pathway-label">Location support</span>
                <span className="about-partners__pathway-text">Reach the right regional contact for a site or customer requirement.</span>
              </span>
            </div>
            <div className="about-partners__pathway">
              <span className="about-partners__pathway-ic"><Headset size={16} /></span>
              <span>
                <span className="about-partners__pathway-label">Distributor coordination</span>
                <span className="about-partners__pathway-text">Connect with the Max-Seal team on partner and distributor requests.</span>
              </span>
            </div>
          </div>

          <div className="about-partners__actions">
            <Link className="ms-btn ms-btn--primary ms-btn--sm" to={routes.enquiry({ intent: 'technical' })}>
              <Headset size={15} /> Ask the Engineers
            </Link>
          </div>
        </div>

        <div className="about-partners__panel">
          <div className="about-partners__panel-head">
            <span className="about-partners__panel-label"><Globe size={15} /> Regional network</span>
            <span className="about-partners__nodes" aria-hidden="true">
              {REGIONS.map((r) => (
                <span key={r.id} className={'about-partners__node' + (r.id === activeId ? ' is-active' : '')} />
              ))}
            </span>
          </div>

          <p style={{ padding: '0.9rem 1.3rem 0', fontSize: '0.82rem', color: 'var(--steel-500)' }}>
            Select a region to view available support locations.
          </p>

          <div className="about-partners__selector" role="tablist" aria-label="Regions">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={r.id === activeId}
                className={'about-partners__tab' + (r.id === activeId ? ' is-active' : '')}
                onClick={() => setActiveId(r.id)}
              >
                <span className="about-partners__tab-bar" aria-hidden="true" />
                <span className="about-partners__tab-body">
                  <span className="about-partners__tab-name">{r.name}</span>
                  <span className="about-partners__tab-count">{r.cards.length} location{r.cards.length === 1 ? '' : 's'}</span>
                </span>
                <ChevronRight size={16} className="about-partners__tab-arr" />
              </button>
            ))}
          </div>

          <div className="about-partners__detail" key={region.id}>
            <p className="about-partners__detail-blurb">{region.blurb}</p>
            <div className="about-partners__locs">
              {region.cards.map((c, i) => (
                <div className="about-partners__loc" key={i}>
                  <span className="about-partners__loc-ic"><MapPin size={16} /></span>
                  <span>
                    <span className="about-partners__loc-kind">{c.type}</span>
                    <span className="about-partners__loc-place">{c.title}</span>
                    <span className="about-partners__loc-detail">{c.detail}</span>
                    <span className="about-partners__loc-meta">{c.meta}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
