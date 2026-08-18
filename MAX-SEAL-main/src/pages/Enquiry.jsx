/* Max-Seal — Enquiry page: shared form, 4 intents, intent-adaptive fields.
   Data-driven via INTENTS[].fields. Includes validation, loading and success
   states. Preselects from ?intent= and ?product=. */
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import PageHero from '../components/PageHero';
import { INTENTS, FAMILIES, INDUSTRIES } from '../data/data';
import * as Icons from '../icons/icons';
import { routes } from '../router/paths';
import Input from '../components/ds/Input';
import Select from '../components/ds/Select';
import Textarea from '../components/ds/Textarea';
import Checkbox from '../components/ds/Checkbox';

export default function Enquiry() {
  useSiteChrome();
  const [searchParams] = useSearchParams();
  const getParam = (name) => searchParams.get(name);

  const valid = ['pricing', 'technical', 'general', 'pricelist'];
  const initial = valid.includes(getParam('intent')) ? getParam('intent') : 'pricing';
  const [intent, setIntent] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState(false);
  const [consent, setConsent] = useState(false);
  const cur = INTENTS.find(i => i.id === intent);
  const presetProduct = getParam('product');

  const famOptions = FAMILIES.map(f => ({ value: f.id, label: f.name }));
  const indOptions = INDUSTRIES.map(x => ({ value: x.id, label: x.name }));
  const countryOptions = [
    { value: 'us', label: 'United States' }, { value: 'ca', label: 'Canada' }, { value: 'mx', label: 'Mexico' },
    { value: 'ar', label: 'Argentina' }, { value: 'cl', label: 'Chile' }, { value: 'other', label: 'Other / International' },
  ];
  const distributorOptions = [
    { value: 'distributor', label: 'Existing distributor' }, { value: 'prospective', label: 'Prospective distributor' },
    { value: 'enduser', label: 'End user' }, { value: 'other', label: 'Other' },
  ];

  // Field registry — each renders an input. half = sits in 2-col grid, else full width.
  const F = {
    name: () => <Input label="Full name" placeholder="Your name" required />,
    company: () => <Input label="Company name" placeholder="Company" required />,
    email: () => <Input label="Email" type="email" placeholder="you@company.com" required />,
    mobile: () => <Input label="Mobile number" type="tel" placeholder="Optional" />,
    state: () => <Input label="State or region" placeholder="Optional" />,
    country: () => <Select label="Country" placeholder="Select country" options={countryOptions} />,
    family: () => <Select label="Product family" placeholder="Select a family" defaultValue={presetProduct || ''} options={famOptions} />,
    industry: () => <Select label="Industry" placeholder="Select industry" options={indOptions} />,
    application: () => <Input label="Application" placeholder="e.g. chemical processing" />,
    quantity: () => <Input label="Quantity" placeholder="e.g. 10" />,
    requiredDate: () => <Input label="Required date" type="date" />,
    operating: () => <Input label="Operating conditions" placeholder="Media, pressure, temperature" />,
    distributor: () => <Select label="Distributor status" placeholder="Select status" options={distributorOptions} />,
    message: () => <Textarea label="Message" placeholder="How can we help?" rows={5} />,
    question: () => <Textarea label="Technical question" placeholder="Describe the service condition, media and any selection questions you have." rows={5} />,
    reason: () => <Input label="Reason for contact" placeholder="Brief reason" />,
  };
  const fullWidth = ['application', 'operating', 'message', 'question', 'reason', 'requiredDate'];
  const renderField = (key) => {
    if (key === 'attachment') return null;
    const node = F[key] && F[key]();
    if (!node) return null;
    return <div className={fullWidth.includes(key) ? 'full' : ''} key={key}>{node}</div>;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!consent) { setErr(true); return; }
    setErr(false); setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 900);
  };

  const switchIntent = (id) => { setIntent(id); setDone(false); setErr(false); };

  return (
    <main>
        <PageHero
          kicker="Enquiry"
          title="Start a conversation"
          lead="Choose how you would like to begin. The form adapts to your enquiry so our team can respond with the right information."
          crumbs={[{ label: 'Home', href: routes.home }, { label: 'Enquiry' }]}
          mediaId="enquiry-hero" mediaPlaceholder="Facility or product visual" />

        <section className="section">
          <div className="wrap enq">
            <div>
              <div className="kicker" style={{ marginBottom: '1.3rem' }}>How can we help</div>
              <div className="intent-list" role="tablist" aria-label="Enquiry type">
                {INTENTS.map((it) => {
                  const Ic = Icons[it.icon];
                  return (
                    <button key={it.id} role="tab" aria-selected={it.id === intent}
                      className={'intent' + (it.id === intent ? ' on' : '')} onClick={() => switchIntent(it.id)}>
                      <span className="intent__ic"><Ic size={20} /></span>
                      <span className="intent__txt"><span className="intent__t">{it.t}</span><span className="intent__d">{it.d}</span></span>
                    </button>
                  );
                })}
              </div>
              <div className="enq__aside">
                <h4>Other ways to reach us</h4>
                <div className="enq__contact">
                  <Link to={routes.contact}><Icons.Phone size={17} /> Call our team</Link>
                  <Link to={routes.contact}><Icons.Mail size={17} /> Email an enquiry</Link>
                  <Link to={routes.contact}><Icons.MessageCircle size={17} /> Message on WhatsApp</Link>
                </div>
              </div>
            </div>

            <div className="qform">
              {done ? (
                <div className="qform__success" role="status">
                  <div className="qform__success-ic"><Icons.Check size={26} /></div>
                  <h2 className="qform__h">Thank you, your enquiry is on its way</h2>
                  <p className="qform__lead">This is a prototype, so nothing was actually sent. In production your message would reach the right Max-Seal team and you would receive a confirmation by email.</p>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.4rem' }}>
                    <button className="ms-btn ms-btn--outline" onClick={() => setDone(false)}>Start another enquiry</button>
                    <Link className="ms-btn ms-btn--primary" to={routes.home}>Back to home <Icons.ArrowRight size={16} /></Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="qform__lbl">{cur.t}</div>
                  <h2 className="qform__h">{cur.t}</h2>
                  <p className="qform__lead">{cur.lead}</p>
                  <div className="qgrid">
                    {cur.fields.map(renderField)}
                    <div className="full enq__file">
                      <span className="enq__file-lbl">Attachment</span>
                      <label className="enq__drop">
                        <Icons.Download size={18} />
                        <span>Drag a file or browse. PDF, DOC or image up to 10 MB.</span>
                        <input type="file" aria-label="Attachment" style={{ display: 'none' }} />
                      </label>
                    </div>
                    <div className="full">
                      <Checkbox label="I agree to be contacted about this enquiry." onChange={(e) => setConsent(e.target ? e.target.checked : !consent)} />
                      {err && <p className="enq__err" role="alert">Please confirm consent so we can reply to your enquiry.</p>}
                    </div>
                  </div>
                  <p className="enq__privacy">We use your details only to respond to your enquiry. See our <Link to={routes.privacy}>Privacy Policy</Link>.</p>
                  <div className="qform__actions">
                    <button type="submit" className="ms-btn ms-btn--primary ms-btn--lg" disabled={submitting}>
                      {submitting ? 'Sending...' : cur.submit} {!submitting && <Icons.ArrowRight size={16} />}
                    </button>
                    <Link className="ms-btn ms-btn--outline ms-btn--lg" to={routes.contact}>Back to Contact</Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
    </main>
  );
}
