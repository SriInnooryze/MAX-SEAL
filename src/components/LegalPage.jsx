import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PageHero from './PageHero';
import { FileText, ArrowRight } from '../icons/icons';
import { routes } from '../router/paths';

/* Shared Terms / Privacy layout with TOC + back to top. */
export default function LegalPage({ kind }) {
  const isTerms = kind === 'terms';
  const title = isTerms ? 'Terms and Conditions' : 'Privacy Policy';
  const intro = isTerms
    ? 'These terms govern use of the Max-Seal website and the supply of products and information. This is placeholder text for the prototype and is not legal advice.'
    : 'This policy explains how Max-Seal handles information collected through this website. This is placeholder text for the prototype and is not legal advice.';
  const heads = isTerms
    ? ['Use of this website', 'Product information', 'Orders and quotations', 'Intellectual property', 'Liability', 'Governing law']
    : ['Information we collect', 'How we use information', 'Form submissions', 'Cookies', 'Third party services', 'Data retention', 'Your rights', 'Contact'];
  const slug = (h) => h.toLowerCase().replace(/[^a-z]+/g, '-');

  return (
    <>
      <Header current={null} />
      <main>
        <PageHero kicker="Legal" title={title}
          crumbs={[{ label: 'Home', href: routes.home }, { label: title }]} />
        <section className="section">
          <div className="wrap legal">
            <aside className="legal__toc">
              <div className="legal__toc-k">On this page</div>
              <nav aria-label="Table of contents">
                {heads.map((h, i) => <a key={i} href={'#' + slug(h)}>{i + 1}. {h}</a>)}
              </nav>
              <div className="legal__toc-actions">
                <button className="link-arrow" onClick={() => window.print()}><FileText size={15} /> Print</button>
                <a className="link-arrow" href="#">Download PDF</a>
              </div>
            </aside>
            <div className="legal__body prose">
              <p className="legal__updated">Last updated: placeholder for legal review</p>
              <p style={{ fontSize: '1.08rem' }}>{intro}</p>
              <div className="legal__flag"><span className="pdot" /> Placeholder content. Approved legal copy replaces every section before launch.</div>
              {heads.map((h, i) => (
                <section key={i} id={slug(h)} className="legal__section">
                  <h2>{i + 1}. {h}</h2>
                  <p>Section content connects through the CMS. This placeholder requires client and legal review before publication.</p>
                  <p>Additional clauses, definitions and references will be added here as approved.</p>
                  <a className="legal__top" href="#top">Back to top</a>
                </section>
              ))}
              <div className="legal__contact">
                <h3>Questions about this {isTerms ? 'agreement' : 'policy'}?</h3>
                <Link className="ms-btn ms-btn--outline ms-btn--sm" to={routes.contact}>Contact Max-Seal <ArrowRight size={15} /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
