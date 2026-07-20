/* Max-Seal — Solutions page. */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { ArrowRight, Settings, Compass, Layers, Gauge, Headset, Check, Info } from '../icons/icons';
import { routes } from '../router/paths';

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('applications');
  const [sizingMedia, setSizingMedia] = useState('utility');
  const [sizingPressure, setSizingPressure] = useState('low');
  const [sizingOperation, setSizingOperation] = useState('manual');

  const solutions = [
    {
      id: 'reliable-isolation',
      icon: <Check size={22} />,
      title: 'Reliable Isolation & Utility',
      desc: 'Repeatable bubble-tight shutoff and general utility service. Engineered with resilient seats to deliver zero-leakage performance under standard operating cycles.',
      linkText: 'Explore resilient seated valves',
      href: routes.products({ type: 'resilient' })
    },
    {
      id: 'severe-service',
      icon: <Gauge size={22} />,
      title: 'Severe Service & High Pressure',
      desc: 'Double-offset high performance and triple-offset metal-seated valves designed to withstand high pressure drops, extreme temperatures, and severe process cycles.',
      linkText: 'Explore high performance range',
      href: routes.products({ type: 'high-performance' })
    },
    {
      id: 'corrosive-media',
      icon: <Layers size={22} />,
      title: 'Corrosive & Aggressive Media',
      desc: 'Fully wetted parts protection utilizing PFA lining and exotic special alloy bodies (marine, chemical processing, petrochemical) built to resist hostile chemicals.',
      linkText: 'Explore lined and alloy options',
      href: routes.products({ type: 'lined' })
    },
    {
      id: 'automation',
      icon: <Settings size={22} />,
      title: 'Automated Valve Packages',
      desc: 'Fully configured and pre-tested valve-actuator packages. Integrated with pneumatic, electric, or hydraulic actuators, limit switches, and positioners for immediate installation.',
      linkText: 'Explore automated packages',
      href: routes.products({ type: 'automated' })
    },
    {
      id: 'customized',
      icon: <Headset size={22} />,
      title: 'Customized Solutions',
      desc: 'Tailor-made modifications and engineered-to-order configurations to fit specific face-to-face dimensions, custom mounting pads, or unique process conditions.',
      linkText: 'Contact engineers for custom designs',
      href: routes.enquiry({ intent: 'technical' })
    }
  ];

  const seriesList = [
    {
      id: 'iso-series',
      title: 'ISO Series',
      desc: 'Heavy-duty resilient seated butterfly valves. Features an ISO 5211 mounting pad for direct automation mounting, extra-heavy shafts, and low operating torques.',
      href: routes.products({ type: 'resilient' })
    },
    {
      id: 'high-perf-series',
      title: 'High Performance Series',
      desc: 'Double offset high-performance series designed for steam, gas, oil, and chemical duties. Features ANSI Class 150/300/600/900 ratings with positive bubble-tight shutoff.',
      href: routes.products({ type: 'high-performance' })
    },
    {
      id: 'trimax-series',
      title: 'High Performance Tri-Max Series',
      desc: 'Triple offset metal-seated series built for severe services. Eliminates seat wear, ensures bidirectional zero-leakage, and operates in extreme temperatures.',
      href: routes.products({ type: 'triple-offset' })
    },
    {
      id: 'performance-series',
      title: 'Performance Series',
      desc: 'General industrial and commercial service resilient seated butterfly valves. Reliable construction, standard layouts, and fast delivery.',
      href: routes.products({ type: 'resilient' })
    },
    {
      id: 'hitek-series',
      title: 'Hi-Tek Series',
      desc: 'High performance control and automation valves engineered for modulating control, offering precise flow coefficients and tight shutoff.',
      href: routes.products({ type: 'automated' })
    },
    {
      id: 'chem-flo-series',
      title: 'Chem Flo Series',
      desc: 'Lined industrial butterfly valves protecting wetted parts from hostile chemicals, acids, and high purity wetted medias.',
      href: routes.products({ type: 'lined' })
    },
    {
      id: 'chem-tek-series',
      title: 'Chem Tek Series',
      desc: 'Robust wetted protection and lined options designed for chemical processing and industrial manufacturing.',
      href: routes.products({ type: 'lined' })
    },
    {
      id: 'actuators-gear',
      title: 'Gear Ops & Pneumatic Actuators',
      desc: 'Pneumatic double-acting and spring-return actuators, manual gear operators, limit switches, and positioners pre-tested for immediate deployment.',
      href: routes.products({ type: 'automated' })
    }
  ];

  const engineeringServices = [
    {
      title: 'Custom Stem Extensions',
      desc: 'Engineered stem and shaft extensions for insulated pipes, buried services, or high-temperature lines. Built to match your specific torque and height needs.'
    },
    {
      title: 'Mounting Brackets & Hardware',
      desc: 'Custom mounting brackets, couplings, and adapter plates designed and machined in-house for seamless valve-to-actuator pairing.'
    },
    {
      title: 'Valve & Actuator Repair',
      desc: 'Full refurbishment, seat replacement, actuator recalibration, and leak testing services at our Lumberton and Houston depots.'
    },
    {
      title: 'Custom Testing & QA',
      desc: 'API 598 pressure testing, shell/leak tests, and custom certification reports for compliance and severe service verification.'
    }
  ];

  const affiliates = [
    {
      name: 'Flo-Tite Valves',
      desc: 'Partner brand supplying ball valves, control valves, check valves, and specialty wetted options. A leading name in process valve engineering.',
      link: 'https://flotite.com'
    },
    {
      name: 'Titan FCI',
      desc: 'Leading manufacturer of industrial piping strainers (Y-strainers, basket strainers), check valves, and duplex strainers.',
      link: 'http://www.titanfci.com'
    },
    {
      name: 'Aircon Actuators',
      desc: 'High-quality pneumatic actuators, limit switches, solenoids, and positioners built for process automation packages.',
      link: 'http://www.airconactuators.com'
    },
    {
      name: 'IV-Controls (IVC)',
      desc: 'Valve automation and controls, assembling complex multi-valve automated manifolds and process packages.',
      link: 'http://iv-controls.com'
    },
    {
      name: 'International Valve Tech (IVT)',
      desc: 'Specialized valve technologies, custom fabrications, and niche industrial application engineering.',
      link: 'http://www.internationalvalvetech.com'
    }
  ];

  const getRecommendation = () => {
    if (sizingMedia === 'corrosive') {
      return {
        title: "PFA Lined (Chem Flo/Chem Tek) or Special Alloy Series",
        desc: "Designed specifically to protect wetted parts from aggressive chemicals, acids, and exotic media. We recommend wetted w/ PFA liners or special alloy construction (Monel, Hastelloy, Duplex) to resist corrosion.",
        link: routes.products({ type: 'lined' }),
        linkText: "Explore Lined Valves",
        ctaText: "Ask Chemical Engineers"
      };
    }
    if (sizingMedia === 'process' || sizingPressure === 'high') {
      return {
        title: "High Performance Double Offset or Tri-Max Triple Offset Series",
        desc: "Engineered for high temperature, steam, oil, and gas applications. The Tri-Max Series features a metal-to-metal torque-seated design for severe service zero-leakage shutoff.",
        link: routes.products({ type: 'high-performance' }),
        linkText: "Explore High Performance",
        ctaText: "Request High-Pressure Quote"
      };
    }
    if (sizingMedia === 'slurry') {
      return {
        title: "Heavy-Duty Resilient Seated or Custom Engineered Valve",
        desc: "For slurry, mining, and abrasive processes, we recommend a heavy-duty resilient seated valve with specialized abrasion-resistant liners and customized disc coatings to maximize service life.",
        link: routes.products({ type: 'resilient' }),
        linkText: "Explore Resilient Valves",
        ctaText: "Consult Application Engineer"
      };
    }
    // Default utility or low/medium pressure
    return {
      title: "Resilient Seated ISO Series or Performance Series",
      desc: "Perfect for everyday water, air, HVAC, and general utility isolation. The ISO Series includes direct ISO 5211 mounting pads for easy, low-cost actuator installation.",
      link: routes.products({ type: 'resilient' }),
      linkText: "Explore Resilient Valves",
      ctaText: "Request Sizing Quote"
    };
  };

  const rec = getRecommendation();

  return (
    <>
      <style>{`
        .solutions-intro {
          max-width: 680px;
          margin-bottom: 2rem;
        }
        .solutions-intro p {
          font-size: 1.15rem;
          color: var(--graphite-700);
          line-height: 1.62;
        }

        /* Premium Tabbed Navigation Styles */
        .solutions-tabs-nav {
          display: flex;
          gap: 0.5rem;
          border-bottom: 1px solid var(--steel-200);
          margin-bottom: 2.5rem;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
        }
        .solutions-tabs-nav::-webkit-scrollbar {
          display: none; /* Safari/Chrome */
        }
        .solutions-tab-btn {
          background: none;
          border: none;
          padding: 1rem 1.5rem;
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 500;
          color: var(--graphite-600);
          cursor: pointer;
          position: relative;
          white-space: nowrap;
          transition: color 200ms ease;
        }
        .solutions-tab-btn:hover {
          color: var(--graphite-900);
        }
        .solutions-tab-btn.on {
          color: var(--azure-500);
          font-weight: 600;
        }
        .solutions-tab-btn.on::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--azure-500);
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 1rem;
        }
        .solution-card {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 2.2rem;
          display: flex;
          flex-direction: column;
          transition: all 260ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .solution-card:hover {
          transform: translateY(-2px);
          border-color: var(--azure-500);
          box-shadow: var(--shadow-md);
        }
        .solution-card__ic {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          background: var(--paper-50);
          border: 1px solid var(--steel-200);
          color: var(--azure-500);
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
        }
        .solution-card__title {
          font-size: 1.28rem;
          font-weight: 600;
          color: var(--graphite-900);
          margin-bottom: 0.8rem;
        }
        .solution-card__desc {
          color: var(--graphite-700);
          font-size: 0.96rem;
          line-height: 1.6;
          margin-bottom: 1.8rem;
          flex: 1;
        }

        /* Product Series Listing */
        .series-card {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 200ms ease;
        }
        .series-card:hover {
          border-color: var(--azure-500);
          box-shadow: var(--shadow-sm);
        }
        .series-card__title {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--graphite-900);
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .series-card__desc {
          color: var(--graphite-700);
          font-size: 0.92rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        /* Services Layout */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .service-item {
          border-left: 2px solid var(--azure-500);
          padding-left: 1.5rem;
        }
        .service-item h4 {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--graphite-900);
          margin: 0 0 0.5rem 0;
        }
        .service-item p {
          color: var(--graphite-700);
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0;
        }

        /* Affiliates Section */
        .affiliates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .affiliate-card {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .affiliate-card__name {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--graphite-900);
          margin-bottom: 0.5rem;
        }
        .affiliate-card__desc {
          color: var(--graphite-600);
          font-size: 0.88rem;
          line-height: 1.5;
          margin-bottom: 1.2rem;
          flex: 1;
        }

        /* Sizing Tool Panel */
        .sizing-tool {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 2.5rem;
          margin-top: 4rem;
        }
        .sizing-tool__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        @media (max-width: 768px) {
          .sizing-tool__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .sizing-tool__title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--graphite-900);
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .sizing-tool__subtitle {
          color: var(--graphite-600);
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }
        .sizing-selector {
          margin-bottom: 1.5rem;
        }
        .sizing-selector__label {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--graphite-800);
          margin-bottom: 0.6rem;
        }
        .sizing-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .sizing-chip-btn {
          background: var(--paper-50);
          border: 1px solid var(--steel-200);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--graphite-800);
          cursor: pointer;
          transition: all 150ms ease;
        }
        .sizing-chip-btn:hover {
          border-color: var(--azure-500);
          color: var(--azure-500);
        }
        .sizing-chip-btn.on {
          background: var(--navy-800);
          color: var(--paper-50);
          border-color: var(--navy-800);
        }
        .sizing-rec {
          background: var(--navy-800);
          color: var(--paper-50);
          padding: 2.2rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .sizing-rec__header {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--azure-500);
          font-weight: 600;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .sizing-rec__title {
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--paper-50);
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }
        .sizing-rec__desc {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--steel-200);
          margin-bottom: 2rem;
          flex: 1;
        }

        /* YouTube Videos Gallery styling */
        .video-section {
          margin-top: 4.5rem;
        }
        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .video-card {
          background: var(--paper-0);
          border: 1px solid var(--steel-200);
          border-radius: var(--radius-sm);
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          transition: all 200ms ease;
        }
        .video-card:hover {
          border-color: var(--azure-500);
        }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 Ratio */
          height: 0;
          overflow: hidden;
          border-radius: 4px;
          background: #000;
          margin-bottom: 1rem;
        }
        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
        .video-card__title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--graphite-900);
          margin: 0 0 0.4rem 0;
        }
        .video-card__desc {
          font-size: 0.85rem;
          color: var(--graphite-600);
          margin: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-content {
          animation: fadeIn 300ms ease forwards;
        }
      `}</style>
      <Header current="solutions" />
      <main>
        <PageHero
          kicker="Solutions"
          title="Engineered Solutions & Applications"
          lead="From standard isolation duties to extreme severe service, Max-Seal designs, configures, and automates butterfly valves to fit your specific operating window."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Solutions' }]}
          mediaId="solutions-hero"
          mediaPlaceholder="Solutions engineering and application overview"
        />

        <section className="section">
          <div className="wrap">
            <div className="solutions-intro reveal">
              <p>We work from your application parameters back to the valve, matching material selections, pressure ratings, and automation packages to the duty cycle. Explore our solutions, specific product series, and engineering capabilities below.</p>
            </div>

            {/* Tab Switcher */}
            <div className="solutions-tabs-nav reveal" role="tablist" aria-label="Solutions navigation tabs">
              <button
                role="tab"
                aria-selected={activeTab === 'applications'}
                className={`solutions-tab-btn ${activeTab === 'applications' ? 'on' : ''}`}
                onClick={() => setActiveTab('applications')}
              >
                Applications
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'series'}
                className={`solutions-tab-btn ${activeTab === 'series' ? 'on' : ''}`}
                onClick={() => setActiveTab('series')}
              >
                Product Series
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'services'}
                className={`solutions-tab-btn ${activeTab === 'services' ? 'on' : ''}`}
                onClick={() => setActiveTab('services')}
              >
                Engineering & Services
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'affiliates'}
                className={`solutions-tab-btn ${activeTab === 'affiliates' ? 'on' : ''}`}
                onClick={() => setActiveTab('affiliates')}
              >
                Partners & Affiliates
              </button>
            </div>

            {/* Tab content 1: Applications */}
            {activeTab === 'applications' && (
              <div className="solutions-grid tab-content">
                {solutions.map((s) => (
                  <div key={s.id} className="solution-card">
                    <div className="solution-card__ic">{s.icon}</div>
                    <h3 className="solution-card__title">{s.title}</h3>
                    <p className="solution-card__desc">{s.desc}</p>
                    <div>
                      <Link className="link-arrow" to={s.href}>{s.linkText} <ArrowRight size={15} /></Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab content 2: Product Series */}
            {activeTab === 'series' && (
              <div className="solutions-grid tab-content">
                {seriesList.map((s) => (
                  <div key={s.id} className="series-card">
                    <div>
                      <h3 className="series-card__title"><Settings size={18} style={{ color: 'var(--azure-500)' }} /> {s.title}</h3>
                      <p className="series-card__desc">{s.desc}</p>
                    </div>
                    <div>
                      <Link className="link-arrow" to={s.href}>View series specifications <ArrowRight size={15} /></Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab content 3: Engineering Services */}
            {activeTab === 'services' && (
              <div className="services-grid tab-content">
                {engineeringServices.map((s, idx) => (
                  <div key={idx} className="service-item">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab content 4: Partners & Affiliates */}
            {activeTab === 'affiliates' && (
              <div className="affiliates-grid tab-content">
                {affiliates.map((a, idx) => (
                  <div key={idx} className="affiliate-card">
                    <div>
                      <div className="affiliate-card__name">{a.name}</div>
                      <p className="affiliate-card__desc">{a.desc}</p>
                    </div>
                    <div>
                      <a className="link-arrow" href={a.link} target="_blank" rel="noopener noreferrer">
                        Visit brand website <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sizing Assistant Tool */}
            <div className="sizing-tool reveal">
              <div className="sizing-tool__grid">
                <div>
                  <h3 className="sizing-tool__title"><Compass size={22} style={{ color: 'var(--azure-500)' }} /> Quick Selection Assistant</h3>
                  <p className="sizing-tool__subtitle">Select your system wetted media, pressure limits, and actuation preference to identify the recommended valve class.</p>

                  <div className="sizing-selector">
                    <div className="sizing-selector__label">1. Wetted Media</div>
                    <div className="sizing-chips">
                      <button
                        className={`sizing-chip-btn ${sizingMedia === 'utility' ? 'on' : ''}`}
                        onClick={() => setSizingMedia('utility')}
                      >
                        Water / HVAC / Utility
                      </button>
                      <button
                        className={`sizing-chip-btn ${sizingMedia === 'process' ? 'on' : ''}`}
                        onClick={() => setSizingMedia('process')}
                      >
                        Steam / Oil / Gas
                      </button>
                      <button
                        className={`sizing-chip-btn ${sizingMedia === 'corrosive' ? 'on' : ''}`}
                        onClick={() => setSizingMedia('corrosive')}
                      >
                        Corrosive Chemicals
                      </button>
                      <button
                        className={`sizing-chip-btn ${sizingMedia === 'slurry' ? 'on' : ''}`}
                        onClick={() => setSizingMedia('slurry')}
                      >
                        Slurry / Abrasives
                      </button>
                    </div>
                  </div>

                  <div className="sizing-selector">
                    <div className="sizing-selector__label">2. Pressure Class</div>
                    <div className="sizing-chips">
                      <button
                        className={`sizing-chip-btn ${sizingPressure === 'low' ? 'on' : ''}`}
                        onClick={() => setSizingPressure('low')}
                      >
                        Low (PN10 / PN16 / 150 PSI)
                      </button>
                      <button
                        className={`sizing-chip-btn ${sizingPressure === 'medium' ? 'on' : ''}`}
                        onClick={() => setSizingPressure('medium')}
                      >
                        Medium (ANSI 150#)
                      </button>
                      <button
                        className={`sizing-chip-btn ${sizingPressure === 'high' ? 'on' : ''}`}
                        onClick={() => setSizingPressure('high')}
                      >
                        High (ANSI 300#+)
                      </button>
                    </div>
                  </div>

                  <div className="sizing-selector">
                    <div className="sizing-selector__label">3. Operation Method</div>
                    <div className="sizing-chips">
                      <button
                        className={`sizing-chip-btn ${sizingOperation === 'manual' ? 'on' : ''}`}
                        onClick={() => setSizingOperation('manual')}
                      >
                        Manual Handle / Gear
                      </button>
                      <button
                        className={`sizing-chip-btn ${sizingOperation === 'automated' ? 'on' : ''}`}
                        onClick={() => setSizingOperation('automated')}
                      >
                        Automated Actuator
                      </button>
                    </div>
                  </div>
                </div>

                <div className="sizing-rec">
                  <div>
                    <div className="sizing-rec__header"><Info size={14} /> Recommended Configuration</div>
                    <h4 className="sizing-rec__title">{rec.title}</h4>
                    <p className="sizing-rec__desc">{rec.desc}</p>
                    {sizingOperation === 'automated' && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--azure-500)', marginTop: '-1rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                        ★ Recommended with pre-tested pneumatic or electric actuator package.
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <Link className="ms-btn ms-btn--primary ms-btn--sm" to={rec.link}>
                      {rec.linkText} <ArrowRight size={15} />
                    </Link>
                    <Link className="ms-btn ms-btn--outline ms-btn--on-dark ms-btn--sm" to={routes.enquiry({ intent: 'technical' })}>
                      {rec.ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Demos Section */}
            <div className="video-section reveal">
              <div className="shead">
                <div className="kicker">Demonstrations</div>
                <h3 className="shead__title">Product Design & Operation Videos</h3>
              </div>
              <div className="video-grid">
                <div className="video-card">
                  <div className="video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/Br-8P-sG6Ws"
                      title="Max-Seal Valve Design and Capabilities Overview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h4 className="video-card__title">Design & Capabilities Overview</h4>
                  <p className="video-card__desc">A detailed walkthrough of Max-Seal's design features including heavy-duty stems, ISO mounting pads, and low torque sealing mechanisms.</p>
                </div>
                <div className="video-card">
                  <div className="video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/LyE8vXhN3m4"
                      title="Automated Process Valve Demonstration"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <h4 className="video-card__title">Automated Process Valve Demo</h4>
                  <p className="video-card__desc">Watch Max-Seal automated valve packages in operation, showing smooth pneumatic cycling and positioner responses for process loops.</p>
                </div>
              </div>
            </div>

            {/* General CTA */}
            <div className="contact-cta reveal" style={{ marginTop: '4.5rem' }}>
              <h3>Need a customized sizing or selection?</h3>
              <p>Work directly with our North Carolina and Texas-based engineers to configure the right valve, seat material, and actuator packages for your process conditions.</p>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <Link className="ms-btn ms-btn--primary" to={routes.enquiry({ intent: 'technical' })}>Request Engineering Support <ArrowRight size={16} /></Link>
                <Link className="ms-btn ms-btn--outline" to={routes.contact}>Find a Partner</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
