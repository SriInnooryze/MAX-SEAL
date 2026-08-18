/* Max-Seal — shared content data.
 *
 * FAMILIES, INDUSTRIES, DOCS, PRICE_LISTS and RESOURCE_LIBS below are
 * generated from catalog/MAXSEAL_CATALOG.xlsx (see scripts/generate-catalog.mjs)
 * — this is catalog content, not hand-edited here. Editing the workbook and
 * running "npm run catalog:generate" (or npm run dev / build) is the only
 * way to change it; any literal edit made directly in this file to those
 * five exports will be silently overwritten on the next generate.
 */
import { routes } from '../router/paths';
import catalog from './generated/catalog.json';

export const HERO_INDUSTRY_IMAGE = '/assets/maxseal/industries/hero.png';


/* Simplified primary navigation. Dropdowns are previews, not full mega-menus. */
export const NAV = [
  { id: 'home', label: 'Home', href: routes.home },
  { id: 'products', label: 'Products', href: routes.products(), dropdown: 'products' },
  { id: 'industries', label: 'Industries', href: routes.industries(), dropdown: 'industries' },
  { id: 'solutions', label: 'Solutions', href: routes.solutions },
  { id: 'resources', label: 'Resources', href: routes.resources, dropdown: 'resources' },
  { id: 'about', label: 'About', href: routes.about, dropdown: 'about' },
  { id: 'contact', label: 'Contact', href: routes.contact },
];

export const FAMILIES = catalog.products;
export const CATEGORIES = catalog.categories;
export const SUBCATEGORIES = catalog.subcategories;

/* Products page filter facets */
export const FACETS = [
  {
    id: 'types', label: 'Valve type', options: [
      { v: 'resilient', l: 'Resilient seated' }, { v: 'high-performance', l: 'High performance' },
      { v: 'triple-offset', l: 'Triple offset' }, { v: 'lined', l: 'PFA lined' },
      { v: 'alloy', l: 'Special alloy' }, { v: 'automated', l: 'Automated' }, { v: 'custom', l: 'Customized' }]
  },
  {
    id: 'apps', label: 'Application', options: [
      { v: 'isolation', l: 'Isolation' }, { v: 'control', l: 'Control' },
      { v: 'shutoff', l: 'Bubble-tight shutoff' }, { v: 'corrosive', l: 'Corrosive media' }, { v: 'severe', l: 'Severe service' }]
  },
  {
    id: 'industries', label: 'Industry', options: [
      { v: 'oil-gas', l: 'Oil and gas' }, { v: 'refining', l: 'Refining' }, { v: 'petrochemical', l: 'Petrochemical' },
      { v: 'chemical', l: 'Chemical' }, { v: 'power', l: 'Power' }, { v: 'data-centers', l: 'Data centers' },
      { v: 'hvac', l: 'HVAC' }, { v: 'marine', l: 'Marine' }, { v: 'pharma', l: 'Pharmaceuticals' },
      { v: 'food-beverage', l: 'Food and beverage' }, { v: 'pulp-paper', l: 'Pulp and paper' }, { v: 'mining', l: 'Mining' }, { v: 'transportation', l: 'Transportation' }]
  },
  {
    id: 'service', label: 'Service requirement', options: [
      { v: 'low-pressure', l: 'Low pressure' }, { v: 'high-pressure', l: 'High pressure' },
      { v: 'high-temp', l: 'High temperature' }, { v: 'corrosive', l: 'Corrosive' },
      { v: 'severe', l: 'Severe service' }, { v: 'cycling', l: 'Cycling duty' }, { v: 'clean', l: 'Clean service' }]
  },
  {
    id: 'automation', label: 'Automation', options: [
      { v: 'manual', l: 'Manual' }, { v: 'actuated', l: 'Actuated' }]
  },
];

export const INDUSTRIES = catalog.industries;

export const WHY = [
  { k: 'ENGINEERING', t: 'Built for demanding applications', d: 'Custom valve designs, special materials and application review for complex piping configurations and severe service conditions.' },
  { k: 'EXPERTISE', t: 'Selection support before configuration', d: 'Experienced valve professionals help customers review valve type, materials, actuation and operating requirements before selection.' },
  { k: 'SERVICE', t: 'Responsive supply and technical support', d: 'Product availability, automation capability and technical sales support help keep requirements moving from review through delivery.' },
];

/* Story-led groupings for the homepage cinematic stages.
   families reference FAMILIES ids; sectors are storytelling groupings, not technical claims. */
export const PRODUCT_STORIES = [
  {
    id: 'reliable-isolation', title: 'Reliable isolation',
    teaser: 'Dependable shutoff for repeatable service conditions, with resilient seated and high performance options configured around system requirements.',
    line: 'Dependable shutoff and control for systems that must operate consistently.',
    story: 'Many systems simply need to start and stop flow without fuss, every time they are asked to. Max-Seal builds resilient seated and high performance valves around that need for repeatable shutoff. Where duties cycle often, automated packages help keep operation steady.',
    families: ['PROD-001', 'PROD-002', 'PROD-006'], app: 'Water, HVAC, building services and general utility isolation',
    image: FAMILIES.find((f) => f.id === 'PROD-001').image
  },
  {
    id: 'performance-pressure', title: 'Performance under pressure',
    teaser: 'High performance and triple offset designs support more demanding pressure and temperature conditions, with seat and trim selections matched to the duty.',
    line: 'Valve configurations designed for demanding service conditions and application requirements.',
    story: 'Some service conditions ask more of a valve than everyday duties. High performance and triple offset designs are configured for demanding pressure and temperature ranges. The right seat and trim choice is matched to each application.',
    families: ['PROD-002', 'PROD-003'], app: 'Process, refining and power duties across a wide range',
    image: FAMILIES.find((f) => f.id === 'PROD-002').image
  },
  {
    id: 'corrosive-service', title: 'Corrosive service',
    teaser: 'PFA lined and special alloy constructions help protect wetted parts in aggressive media where material selection is critical to valve life.',
    line: 'Material and lining options for environments where media compatibility matters.',
    story: 'When the media is aggressive, material compatibility decides how long a valve keeps working. PFA lined and special alloy constructions protect wetted parts in corrosive environments. Selections are guided by the chemistry of your process.',
    families: ['PROD-004', 'PROD-005'], app: 'Chemical, petrochemical and other aggressive media',
    image: FAMILIES.find((f) => f.id === 'PROD-004').image
  },
  {
    id: 'automated-control', title: 'Automated control',
    teaser: 'Valve and actuator packages are prepared around control needs, operating response and accessories suited to the application.',
    line: 'Valve and actuator packages prepared around control, response, and operating needs.',
    story: 'Control systems need valves that respond predictably and integrate cleanly. Max-Seal assembles valve and actuator packages around control, response and operating needs. Accessories and controls are prepared to suit the duty.',
    families: ['PROD-006', 'PROD-002', 'PROD-007'], app: 'Process automation and control loops',
    image: FAMILIES.find((f) => f.id === 'PROD-006').image
  },
  {
    id: 'application-specific', title: 'Application-specific solutions',
    teaser: 'When standard configurations are not enough, Max-Seal can support customized valve solutions based on service conditions and project requirements.',
    line: 'Customized configurations supported by practical engineering input.',
    story: 'Not every requirement fits a standard configuration. Customized solutions are engineered to order with practical input from our team. We work from your application to the valve, not the other way around.',
    families: ['PROD-007', 'PROD-005'], app: 'Project specific requirements',
    image: FAMILIES.find((f) => f.id === 'PROD-007').image
  },
  {
    id: 'engineered-support', title: 'Engineering support',
    teaser: 'Practical valve review helps customers evaluate series, seat, trim, materials and actuation before configuration.',
    line: 'Practical engineering input from selection through configuration.',
    story: 'Choosing the right valve is easier with engineering input alongside it. Max-Seal helps match series, seat and trim to your service condition. Support continues from selection through sizing and configuration.',
    families: ['PROD-007', 'PROD-006', 'PROD-002'], app: 'Selection, sizing and application support',
    image: FAMILIES.find((f) => f.id === 'PROD-005').image
  },
];

/* `id` is this story's own stable slug (React key, aria-labels). `industryId`
   is the closest matching real src/data/data.js INDUSTRIES entry, used only
   to build the "Explore Industries" CTA route — kept as a separate field
   because most of these six client-facing groupings (e.g. "Oil, Gas and
   Refining" spans two real INDUSTRIES entries) don't have a single exact
   INDUSTRIES id of their own. Previously the CTA used the story's own id
   directly as the ?industry= value, which never matched any real INDUSTRIES
   id (see src/pages/Industries.jsx's lookup), so "Explore Industries" never
   actually pre-selected anything — this also fixes that. */
export const INDUSTRY_STORIES = [
  {
    id: 'data-centers', industryId: 'data-centers', title: 'Data Centers',
    teaser: 'Data center facilities rely on cooling and water systems that must operate consistently. Max-Seal supports dependable isolation and automated valve packages for critical support systems.',
    line: 'Valve support for cooling and infrastructure systems.',
    story: 'Data center facilities rely on cooling and water systems that need to operate consistently. Dependable isolation and automated valve packages support these critical support systems.',
    sectors: ['Data Centers', 'HVAC', 'Cooling Systems'], families: ['PROD-001', 'PROD-002', 'PROD-006'],
    app: 'Cooling loops and water distribution for data center facilities',
    image: INDUSTRIES.find((i) => i.id === 'data-centers').image
  },
  {
    id: 'water-infrastructure', industryId: 'hvac', title: 'Water Infrastructure',
    teaser: 'Water and utility applications need dependable isolation, material compatibility and long service life. Max-Seal supports valve selection for infrastructure and process-water requirements.',
    line: 'Butterfly valve solutions for water and utility systems.',
    story: 'Water and utility systems need dependable isolation and material compatibility built for long service life. Valve selection is reviewed against infrastructure and process-water requirements.',
    sectors: ['Water Infrastructure', 'Utilities', 'Process Water'], families: ['PROD-001', 'PROD-002', 'PROD-007'],
    app: 'Water distribution, treatment and utility infrastructure',
    image: INDUSTRIES.find((i) => i.id === 'hvac').image
  },
  {
    id: 'power-generation', industryId: 'power', title: 'Power Generation',
    teaser: 'Power generation environments involve demanding operating conditions across cooling, process and balance-of-plant systems. Valve configurations are reviewed against pressure, temperature and service needs.',
    line: 'Flow control support for power and plant systems.',
    story: 'Power generation environments span cooling, process and balance-of-plant systems, each with its own operating conditions. Valve configurations are reviewed against pressure, temperature and service requirements.',
    sectors: ['Power Generation', 'Cooling', 'Plant Systems'], families: ['PROD-002', 'PROD-003', 'PROD-006'],
    app: 'Cooling water, process and balance-of-plant duties',
    image: INDUSTRIES.find((i) => i.id === 'power').image
  },
  {
    id: 'oil-gas-refining', industryId: 'oil-gas', title: 'Oil, Gas and Refining',
    teaser: 'Oil, gas and refining applications involve varied pressure, temperature and media conditions. Max-Seal supports valve configurations for dependable isolation and control in demanding service.',
    line: 'Valve options for demanding energy and refining service.',
    story: 'Oil, gas and refining operations work across a wide range of pressures, temperatures and media. Valve configurations are matched to each service condition for dependable isolation and control.',
    sectors: ['Oil and Gas', 'Refining', 'Energy'], families: ['PROD-003', 'PROD-002', 'PROD-006'],
    app: 'Isolation and control across oil, gas and refining duties',
    image: INDUSTRIES.find((i) => i.id === 'oil-gas').image
  },
  {
    id: 'chemical-process', industryId: 'chemical', title: 'Chemical and Process Industries',
    teaser: 'Chemical and process plants may involve aggressive media, frequent cycling and demanding service conditions. Lined, alloy and high performance options help support the right valve selection.',
    line: 'Material and sealing support for process environments.',
    story: 'Chemical and process plants handle aggressive media and frequent cycling. Material and sealing choices are matched to the chemistry of each process, with lined and alloy constructions protecting wetted parts.',
    sectors: ['Chemical Processing', 'Petrochemical', 'Pulp and Paper'], families: ['PROD-004', 'PROD-005', 'PROD-003'],
    app: 'Corrosive media and cycling process duties',
    image: INDUSTRIES.find((i) => i.id === 'chemical').image
  },
  {
    id: 'marine-transportation-mining', industryId: 'marine', title: 'Marine, Transportation and Mining',
    teaser: 'Marine, transportation and mining systems can face corrosion, vibration and heavy service. Material selection and rugged construction help support long-term operation.',
    line: 'Durable valve options for harsh operating environments.',
    story: 'Marine, transportation and mining systems face corrosion, vibration and heavy-duty service. Corrosion-aware materials and rugged construction are matched to the duty, with practical maintenance in mind.',
    sectors: ['Marine', 'Transportation', 'Mining'], families: ['PROD-005', 'PROD-001', 'PROD-007'],
    app: 'Seawater, transfer and heavy-duty service',
    image: INDUSTRIES.find((i) => i.id === 'marine').image
  },
];

/* Featured application-focus story — clearly labelled placeholder until CMS content is approved. */
export const PROOF = {
  type: 'Application focus',
  industry: 'Data Centers',
  customer: 'Cooling Systems',
  title: 'Butterfly Valve Support for Cooling Loop Applications',
  summary: 'Cooling loop applications require dependable isolation, automation readiness and careful valve selection. Max-Seal supports valve packages based on service conditions, system requirements and operating needs.',
  image: INDUSTRIES.find((i) => i.id === 'data-centers').image,
  details: [
    { k: 'Requirement', v: 'Support consistent flow control and isolation in cooling loop service.' },
    { k: 'Max-Seal support', v: 'Review valve type, seat, trim, actuation and accessories against the application requirement.' },
    { k: 'Application value', v: 'Help customers specify a practical valve package for installation, operation and long-term support.' },
  ],
};

export const DOCS = catalog.docs;
export const DOC_TYPES = ['Product Catalog', 'Technical Bulletin', 'Selection Guide', 'Installation Document', 'Maintenance Document', 'Application Guide'];

/* Confirmed company facts (client supplied). Do not add unconfirmed claims. */
export const COMPANY = {
  founded: '2008',
  president: 'Martin Gibbons',
  experience: '35+ years of valve industry experience',
  facilities: [
    { id: 'lumberton', city: 'Lumberton', state: 'North Carolina', country: 'United States', kind: 'Facility' },
    { id: 'houston', city: 'Houston', state: 'Texas', country: 'United States', kind: 'Facility' },
  ],
  salesOffices: [
    { id: 'ar', country: 'Argentina', kind: 'Sales office' },
    { id: 'cl', country: 'Chile', kind: 'Sales office' },
    { id: 'mx', country: 'Mexico', kind: 'Sales office' },
  ],
};

/* Team — verified leadership and personnel. */
export const TEAM = [
  { id: 't1', name: 'Martin Gibbons', role: 'President', experience: 'Over 35 years of valve industry experience.' },
  { id: 't2', name: 'John Franklin', role: 'IVC Manager' },
  { id: 't3', name: 'Jose Villa', role: 'General Manager' },
  { id: 't4', name: 'Keith Britt', role: 'Inside/Outside Sales' },
  { id: 't5', name: 'Dillan Skipper', role: 'Inside/Outside Sales' },
];

/* Global partners — confirmed countries only; partner names are placeholders.
   Used by the standalone /partners page (src/pages/GlobalPartners.jsx) only.
   Left as-is on purpose: ABOUT_PARTNER_REGIONS below is the About page's own
   dataset so a content fix there can never silently change this page too. */
export const REGIONS = [
  {
    id: 'na', name: 'North America', blurb: 'Facilities and distributor partners across the United States.',
    locations: [
      { kind: 'Facility', country: 'United States', place: 'Lumberton, North Carolina' },
      { kind: 'Facility', country: 'United States', place: 'Houston, Texas' },
      { kind: 'Distributors', country: 'United States', place: 'Partners across multiple states' },
    ]
  },
  {
    id: 'latam', name: 'Latin America', blurb: 'Sales offices supporting distributors and industrial teams.',
    locations: [
      { kind: 'Sales office', country: 'Argentina', place: 'Regional support' },
      { kind: 'Sales office', country: 'Chile', place: 'Regional support' },
      { kind: 'Sales office', country: 'Mexico', place: 'Regional support' },
    ]
  },
  {
    id: 'intl', name: 'Other markets', blurb: 'Distributor relationships in additional markets worldwide.',
    locations: [
      { kind: 'Distributors', country: 'Worldwide', place: 'Regional partner details connect through the CMS' },
    ]
  },
];

/* Global Partners content for the About page section only
   (src/components/about/GlobalPartnersSection.jsx). Client-safe: the third
   region is deliberately labelled "Listed market reference" / "End-user
   reference", never "partner office", "sales office" or "distributor" —
   those three entries are markets where Max-Seal products already appear
   in current end-user materials, not confirmed partner locations. No CMS
   or placeholder wording, no invented partner names. */
export const ABOUT_PARTNER_REGIONS = [
  {
    id: 'na', name: 'North America', blurb: 'U.S. operations and distributor support.',
    cards: [
      { type: 'Facility', title: 'Lumberton, North Carolina', detail: 'Main manufacturing facility and headquarters.', meta: '4815 West 5th Street, Lumberton, NC 28358' },
      { type: 'Facility', title: 'Houston, Texas', detail: 'U.S. facility supporting manual and automated process valve requirements.', meta: 'United States' },
      { type: 'Distributors', title: 'Partners across multiple states', detail: 'Distributing partners support customers across the United States.', meta: 'United States' },
    ]
  },
  {
    id: 'latam', name: 'Latin America', blurb: 'Regional sales offices supporting distributors and industrial teams.',
    cards: [
      { type: 'Sales office', title: 'Argentina', detail: 'Regional sales office supporting distributors and industrial customers.', meta: 'Latin America' },
      { type: 'Sales office', title: 'Chile', detail: 'Regional sales office supporting distributors and industrial customers.', meta: 'Latin America' },
      { type: 'Sales office', title: 'Mexico', detail: 'Regional sales office supporting distributors and industrial customers.', meta: 'Latin America' },
    ]
  },
  {
    id: 'additional', name: 'Additional Markets', blurb: 'Listed market references from current Max-Seal materials.',
    cards: [
      { type: 'Listed market reference', title: 'Africa', detail: 'SPIE Oil & Gas Services Congo', meta: 'End-user reference' },
      { type: 'Listed market reference', title: 'Pakistan', detail: 'Pakistan Tobacco Company', meta: 'End-user reference' },
      { type: 'Listed market reference', title: 'Israel', detail: 'Intel Israel', meta: 'End-user reference' },
    ]
  },
];

/* Price lists — controlled documents with access status. No invented prices. */
export const PRICE_LISTS = catalog.priceLists;

/* href is routing wiring (not catalog content), so it's attached here rather than stored in Excel. */
const ROUTE_BY_ID = { catalog: routes.catalog(), marketing: routes.marketing, pricelists: routes.priceLists };
export const RESOURCE_LIBS = catalog.resourceLibs.map((r) => ({ ...r, href: ROUTE_BY_ID[r.id] }));

/* Enquiry intents (shared page). `fields` lists which fields to show, in order.
   Field definitions live in ENQ_FIELDS so the form is data-driven and CMS-ready. */
export const INTENTS = [
  {
    id: 'pricing', icon: 'FileText', t: 'Request pricing', d: 'Commercial and product requirement enquiry.',
    lead: 'Tell us what you need to size and price. Include media, size, pressure class and quantity where known.',
    fields: ['name', 'company', 'email', 'mobile', 'state', 'country', 'family', 'application', 'quantity', 'requiredDate', 'message', 'attachment'],
    submit: 'Submit request'
  },
  {
    id: 'technical', icon: 'Headset', t: 'Ask a technical question', d: 'Technical selection and application support.',
    lead: 'Share your application and operating conditions. Our team will help you select the right valve.',
    fields: ['name', 'company', 'email', 'mobile', 'country', 'industry', 'family', 'application', 'operating', 'question', 'attachment'],
    submit: 'Send to engineers'
  },
  {
    id: 'general', icon: 'MessageCircle', t: 'General enquiry', d: 'Company, distributor and general contact request.',
    lead: 'For general questions, distributor enquiries or to reach a specific location.',
    fields: ['name', 'company', 'email', 'mobile', 'state', 'country', 'reason', 'message'],
    submit: 'Send message'
  },
  {
    id: 'pricelist', icon: 'Scale', t: 'Price list request', d: 'Access request for current price list documents.',
    lead: 'Request access to current price lists. Distributor status helps us route your request.',
    fields: ['name', 'company', 'email', 'mobile', 'country', 'family', 'distributor', 'message'],
    submit: 'Request price list'
  },
];

/* Application / operating needs for the Industries matrix and Products filters.
   ids match values used in FAMILIES.apps and FAMILIES.service, so relationships
   are computed from existing data rather than hardcoded. CMS-ready: edit this list
   and the family fields to change the matrix. */
export const APP_NEEDS = [
  { id: 'isolation', l: 'Isolation and shutoff', ctx: 'Dependable on and off control for lines that must isolate cleanly.' },
  { id: 'control', l: 'Throttling and control', ctx: 'Smooth modulation where flow needs to be regulated, not just stopped.' },
  { id: 'corrosive', l: 'Corrosive media', ctx: 'Material and lining choices that protect wetted parts from aggressive media.' },
  { id: 'severe', l: 'Severe service', ctx: 'Construction matched to demanding pressure, temperature and cycling.' },
  { id: 'high-pressure', l: 'High pressure', ctx: 'Configurations suited to higher pressure classes.' },
  { id: 'high-temp', l: 'High temperature', ctx: 'Seat and trim options for elevated temperature duties.' },
  { id: 'clean', l: 'Clean service', ctx: 'Material selection that supports clean and hygienic operation.' },
  { id: 'cycling', l: 'Cycling duty', ctx: 'Designs that hold up to frequent operation and automation.' },
];
