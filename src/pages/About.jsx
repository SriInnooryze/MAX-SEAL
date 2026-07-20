/* Max-Seal — About: company story with confirmed facts. */
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { COMPANY, TEAM } from '../data/data';
import { ArrowRight, Star, Globe } from '../icons/icons';
import { routes } from '../router/paths';

const ABOUT_TIMELINE = [
  { period: '2008', title: 'A dedicated valve company is founded', text: 'Max-Seal Inc. was established to design, manufacture and supply industrial butterfly valves for distributors and industrial customers.', mediaPh: 'Early company or facility photo' },
  { period: 'Leadership', title: 'Decades of valve experience at the helm', text: 'President Martin Gibbons leads the company with more than 40 years of valve industry experience, shaping how Max-Seal selects, configures and supports every valve.', mediaPh: null },
  { period: 'United States', title: 'Manufacturing and supply in North Carolina and Texas', text: 'Operations are anchored by facilities in Lumberton, North Carolina and Houston, Texas, supporting both manual and automated process valve solutions.', mediaPh: 'Facility or production photo' },
  { period: 'Latin America', title: 'Regional sales offices across the region', text: 'Sales offices in Argentina, Chile and Mexico bring local support to distributors and industrial teams across Latin America.', mediaPh: null },
  { period: 'Worldwide', title: 'A growing distributor network', text: 'Distributor relationships across the United States and other regions extend Max-Seal supply and support to industrial customers worldwide.', mediaPh: 'Distribution or logistics photo' },
  { period: 'Today', title: 'Engineered solutions, supplied with support', text: 'Max-Seal continues to supply manual and automated butterfly valves, with customized solutions and practical engineering support for demanding applications.', mediaPh: null },
];
const ABOUT_FACTS = [
  { v: '2008', l: 'Established', s: 'Founded as a dedicated butterfly valve manufacturer and supplier.' },
  { v: '40+ yrs', l: 'Leadership experience', s: 'Valve industry experience guiding selection and support.' },
  { v: '2', l: 'US facilities', s: 'Lumberton, North Carolina and Houston, Texas.' },
  { v: '3', l: 'Regional offices', s: 'Sales offices in Argentina, Chile and Mexico.' },
  { v: 'Worldwide', l: 'Distribution', s: 'Distributor relationships across the US and other regions.' },
];

export default function About() {
  return (
    <>
      <Header current="about" />
      <main>
        <PageHero kicker="About Max-Seal" title="Highly engineered valves, supplied with real support"
          lead="A US based manufacturer and supplier of manual and automated butterfly valve solutions, working with distributors and industrial teams since 2008."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'About' }]}
          mediaId="about-hero" mediaPlaceholder="Facility or team photo" />

        {/* Opening statement + large year marker */}
        <section className="section" id="company">
          <div className="wrap histop">
            <div className="histop__statement">
              <div className="kicker">Our company</div>
              <p className="histop__lead">Max-Seal is a focused butterfly valve manufacturer and supplier. We design, build and support manual and automated valve solutions, and we put real engineering help behind every order so distributors and industrial teams can specify with confidence.</p>
            </div>
            <div className="histop__year">
              <span className="histop__year-k">Established</span>
              <span className="histop__year-v">2008</span>
              <span className="histop__year-s">United States</span>
            </div>
          </div>
        </section>

        {/* Editorial history timeline */}
        <section className="section section--sunken" id="history">
          <div className="wrap">
            <div className="kicker">How the company grew</div>
            <h2 className="about__h" style={{ marginBottom: 'clamp(2rem,3.5vw,3rem)' }}>From a focused start to worldwide supply</h2>
            <ol className="tl">
              {ABOUT_TIMELINE.map((t, i) => (
                <li className="tl__item reveal" key={i}>
                  <div className="tl__marker"><span className="tl__dot" /><span className="tl__line" /></div>
                  <div className="tl__content">
                    <span className="tl__period">{t.period}</span>
                    <h3 className="tl__title">{t.title}</h3>
                    <p className="tl__text">{t.text}</p>
                  </div>
                  {t.mediaPh && <div className="tl__media"><image-slot id={'about-tl-' + i} shape="rect" fit="cover" placeholder={t.mediaPh} /></div>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Leadership */}
        <section className="section" id="leadership">
          <div className="wrap about__split">
            <div>
              <div className="kicker">Leadership</div>
              <h2 className="about__h">Experience behind the company</h2>
              <p className="about__p">Max-Seal is led by President {COMPANY.president}, with more than 40 years of valve industry experience. That experience shapes how we select, configure and support every valve we supply.</p>
              <ul className="about__values">
                <li><span>Practical engineering</span> Help to match the right series, seat and trim to each service condition.</li>
                <li><span>Dependable supply</span> Manual and automated products with responsive turnaround.</li>
                <li><span>Customized solutions</span> Engineered configurations for challenging applications.</li>
              </ul>
            </div>
            <div className="about__leadcard">
              <div className="about__leadphoto"><image-slot id="about-president" shape="rect" fit="cover" placeholder="Leadership photo" /></div>
              <div className="about__leadbody">
                <div className="about__leadname">{COMPANY.president}</div>
                <div className="about__leadrole">President</div>
                <p>More than 40 years of valve industry experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Elevated facts area */}
        <section className="section section--sunken" id="facts">
          <div className="wrap">
            <div className="kicker">The company at a glance</div>
            <h2 className="about__h" style={{ marginBottom: 'clamp(1.8rem,3vw,2.6rem)' }}>What we can confirm</h2>
            <div className="factsx">
              {ABOUT_FACTS.map((f, i) => (
                <div className="factsx__item" key={i}>
                  <div className="factsx__v">{f.v}</div>
                  <div className="factsx__l">{f.l}</div>
                  <p className="factsx__s">{f.s}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.8rem' }}><Link className="link-arrow" to={routes.partners}><Globe size={16} /> See our global partner network</Link></div>
          </div>
        </section>

        {/* Team */}
        <section className="section section--sunken" id="team">
          <div className="wrap">
            <div className="kicker">Team</div>
            <h2 className="about__h" style={{ marginBottom: '1.6rem' }}>Leadership and people</h2>
            <div className="team-grid">
              {TEAM.map(m => (
                <div className="team-card" key={m.id}>
                  <div className="team-card__photo"><image-slot id={'team-' + m.id} shape="rect" fit="cover" placeholder={m.confirmed ? m.name : 'Team photo'} /></div>
                  <div className="team-card__name">{m.name}</div>
                  <div className="team-card__role">{m.role}</div>
                  <div className="team-card__region">{m.region}</div>
                  {!m.confirmed && <span className="team-card__ph"><span className="pdot" /> Placeholder</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* End users + reviews */}
        <section className="section" id="end-users">
          <div className="wrap">
            <div className="kicker">End users and trust</div>
            <h2 className="about__h" style={{ marginBottom: '1.4rem' }}>Who we serve</h2>
            <p className="about__p" style={{ maxWidth: '60ch', marginBottom: '1.8rem' }}>We supply distributors and industrial customers across data centers, oil and gas, refining, chemical processing, power, marine, HVAC and more.</p>
            <div className="logo-strip">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="logo-cell" key={i}><image-slot id={'enduser-' + i} shape="rect" fit="contain" placeholder="Logo" /></div>
              ))}
            </div>
            <span className="placeholder-note"><span className="pdot" /> Approved end-user logos load here once confirmed</span>

            <div className="reviews">
              <div className="reviews__head">
                <div className="reviews__stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} />)}</div>
                <div className="reviews__k">Google Reviews</div>
              </div>
              <p className="reviews__note">Verified Google Reviews connect here once the integration is approved. Review scores and text are not shown until confirmed.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section section--sunken">
          <div className="wrap about__cta">
            <h2 className="about__h">Talk to the Max-Seal team</h2>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'pricing' })}>Request a Quote <ArrowRight size={16} /></Link>
              <Link className="ms-btn ms-btn--outline" to={routes.contact}>Contact us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
