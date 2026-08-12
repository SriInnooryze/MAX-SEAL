/* Max-Seal — shared content data. */
import { routes } from '../router/paths';

import dataCentersImg from '../assets/industries/data-centers.png';
import oilGasImg from '../assets/industries/oil-gas.png';
import refiningImg from '../assets/industries/refining.png';
import petrochemicalImg from '../assets/industries/petrochemical.png';
import chemicalImg from '../assets/industries/chemical.png';
import powerImg from '../assets/industries/power.png';
import pulpPaperImg from '../assets/industries/pulp-paper.png';
import miningImg from '../assets/industries/mining.png';
import marineImg from '../assets/industries/marine.png';
import hvacImg from '../assets/industries/hvac.png';
import foodBeverageImg from '../assets/industries/food-beverage.png';
import pharmaImg from '../assets/industries/pharma.png';
import transportationImg from '../assets/industries/transportation.png';
import industryHeroImg from '../assets/industries/hero.png';
import resilientSeatedImg from '../assets/products/resilient-seated.png';
import highPerformanceImg from '../assets/products/high-performance.png';
import tripleOffsetImg from '../assets/products/triple-offset.png';
import pfaLinedImg from '../assets/products/pfa-lined.png';
import specialAlloyImg from '../assets/products/special-alloy.png';
import automatedImg from '../assets/products/automated.png';
import customizedImg from '../assets/products/customized.png';
import catalogPdf from '../assets/home/Resilient Seated Butterfly Valves — Performance Series.pdf';
import catalogCoverImg from '../assets/home/performance-series-catalog-cover.png';

export const HERO_INDUSTRY_IMAGE = industryHeroImg;


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

export const FAMILIES = [
  {
    id: 'resilient', code: 'RS', name: 'Resilient Seated', menuName: 'Resilient Seated Butterfly Valves', menuDesc: 'General service isolation and control', short: 'Bubble-tight bidirectional shutoff for general industrial and utility service.',
    image: resilientSeatedImg,
    need: 'Repeatable bubble-tight isolation for everyday duties.', where: 'Common in water, HVAC and building services.',
    application: 'Water, HVAC, building services', sizes: 'DN50–DN600', rating: 'PN10–PN16',
    categories: ['butterfly'], types: ['resilient'], apps: ['isolation', 'shutoff'], industries: ['data-centers', 'hvac', 'pulp-paper', 'transportation', 'food-beverage'], service: ['low-pressure', 'clean'], automation: ['manual']
  },
  {
    id: 'high-performance', code: 'HP', name: 'High Performance', menuName: 'High Performance Butterfly Valves', menuDesc: 'Built for more demanding operating conditions', short: 'Double-offset design for higher pressure and temperature duties.',
    image: highPerformanceImg,
    need: 'Isolation and control across higher pressure and temperature.', where: 'Considered in process, refining and power.',
    application: 'Process, refining, power', sizes: 'DN50–DN900', rating: '150–300#',
    categories: ['butterfly'], types: ['high-performance'], apps: ['isolation', 'control'], industries: ['oil-gas', 'refining', 'power', 'hvac', 'pulp-paper'], service: ['high-pressure', 'high-temp'], automation: ['manual', 'actuated']
  },
  {
    id: 'triple-offset', code: 'TO', name: 'Triple Offset', menuName: 'Triple Offset Butterfly Valves', menuDesc: 'For severe service and critical shutoff needs', short: 'Metal-seated, torque-seated shutoff for severe and critical service.',
    image: tripleOffsetImg,
    need: 'Tight, repeatable shutoff for severe and critical service.', where: 'Used in demanding isolation duties.',
    application: 'Severe service, isolation', sizes: 'DN80–DN1200', rating: '150–300#',
    categories: ['butterfly'], types: ['triple-offset'], apps: ['isolation', 'shutoff', 'severe'], industries: ['oil-gas', 'refining', 'petrochemical', 'power'], service: ['high-pressure', 'high-temp', 'severe'], automation: ['manual', 'actuated']
  },
  {
    id: 'pfa-lined', code: 'PL', name: 'PFA Lined', menuName: 'PFA Lined Butterfly Valves', menuDesc: 'For corrosive media and chemical applications', short: 'Fully lined wetted parts for aggressive and corrosive media.',
    image: pfaLinedImg,
    need: 'Protection of wetted parts in corrosive media.', where: 'Considered in chemical and process service.',
    application: 'Chemical, corrosive media', sizes: 'DN50–DN600', rating: 'PN10–PN16',
    categories: ['butterfly'], types: ['lined'], apps: ['isolation', 'corrosive'], industries: ['petrochemical', 'chemical', 'pharma', 'food-beverage'], service: ['corrosive', 'clean'], automation: ['manual', 'actuated']
  },
  {
    id: 'special-alloy', code: 'SA', name: 'Special Alloy', menuName: 'Special Alloy Butterfly Valves', menuDesc: 'For marine, chemical and specialized environments', short: 'Exotic alloy bodies and trims for demanding chemistries.',
    image: specialAlloyImg,
    need: 'Material compatibility for aggressive chemistries.', where: 'Used in marine, chemical and exotic media.',
    application: 'Marine, chemical, exotic media', sizes: 'DN50–DN900', rating: '150–300#',
    categories: ['butterfly'], types: ['alloy'], apps: ['isolation', 'corrosive', 'severe'], industries: ['marine', 'chemical', 'petrochemical', 'pharma'], service: ['corrosive', 'severe'], automation: ['manual', 'actuated']
  },
  {
    id: 'automated', code: 'AP', name: 'Automated Packages', menuName: 'Automated Packages', menuDesc: 'Valve and actuator packages for controlled operation', short: 'Valves assembled with actuators, controls and accessories.',
    image: automatedImg,
    need: 'Valves prepared for control and automated operation.', where: 'Considered where systems are automated.',
    application: 'Process automation', sizes: 'DN50–DN1200', rating: 'Per base valve',
    categories: ['package'], types: ['automated'], apps: ['control', 'isolation'], industries: ['data-centers', 'oil-gas', 'power', 'hvac', 'pulp-paper'], service: ['cycling', 'high-pressure'], automation: ['actuated']
  },
  {
    id: 'customized', code: 'CS', name: 'Customized Solutions', menuName: 'Customized Solutions', menuDesc: 'Application-specific configurations and support', short: 'Engineered-to-order valves built around your application.',
    image: customizedImg,
    need: 'Engineered-to-order configurations for specific needs.', where: 'Used where standard options do not fit.',
    application: 'Project specific', sizes: 'Project specific', rating: 'Project specific',
    categories: ['package', 'butterfly'], types: ['custom'], apps: ['isolation', 'control', 'corrosive', 'severe'], industries: ['chemical', 'mining', 'marine', 'pharma', 'food-beverage'], service: ['cycling', 'severe', 'corrosive', 'clean'], automation: ['manual', 'actuated']
  },
];

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

export const INDUSTRIES = [
  { id: 'data-centers', name: 'Data Centers', image: dataCentersImg, ctx: 'Cooling loops and water distribution where reliable isolation keeps critical infrastructure running.', families: ['Resilient Seated', 'High Performance', 'Automated Packages'] },
  { id: 'oil-gas', name: 'Oil and Gas', image: oilGasImg, ctx: 'Upstream and midstream service that calls for robust shutoff across a wide pressure and temperature range.', families: ['Triple Offset', 'High Performance', 'Special Alloy'] },
  { id: 'refining', name: 'Refining', image: refiningImg, ctx: 'Process isolation and control where metal-seated performance supports severe operating conditions.', families: ['Triple Offset', 'High Performance', 'Automated Packages'] },
  { id: 'petrochemical', name: 'Petrochemical', image: petrochemicalImg, ctx: 'Demanding media and cycling duties with sealing options matched to the process.', families: ['Triple Offset', 'PFA Lined', 'Special Alloy'] },
  { id: 'chemical', name: 'Chemical Processing', image: chemicalImg, ctx: 'Corrosive and aggressive media where lined and alloy constructions protect wetted parts.', families: ['PFA Lined', 'Special Alloy', 'Customized Solutions'] },
  { id: 'power', name: 'Power', image: powerImg, ctx: 'Cooling water, balance of plant and process duties across conventional and renewable generation.', families: ['Triple Offset', 'High Performance', 'Automated Packages'] },
  { id: 'pulp-paper', name: 'Pulp and Paper', image: pulpPaperImg, ctx: 'Stock, water and chemical lines that benefit from durable seating and dependable cycling.', families: ['Resilient Seated', 'High Performance', 'Automated Packages'] },
  { id: 'mining', name: 'Mining', image: miningImg, ctx: 'Slurry, water and process duties that demand rugged construction and serviceable designs.', families: ['Resilient Seated', 'High Performance', 'Customized Solutions'] },
  { id: 'marine', name: 'Marine', image: marineImg, ctx: 'Seawater and onboard systems where corrosion resistance and compact design matter.', families: ['Special Alloy', 'Resilient Seated', 'Automated Packages'] },
  { id: 'hvac', name: 'HVAC', image: hvacImg, ctx: 'Chilled and condenser water systems that rely on tight shutoff and smooth control.', families: ['Resilient Seated', 'High Performance', 'Automated Packages'] },
  { id: 'food-beverage', name: 'Food and Beverage', image: foodBeverageImg, ctx: 'Clean and utility service where material selection supports process hygiene.', families: ['Resilient Seated', 'PFA Lined', 'Customized Solutions'] },
  { id: 'pharma', name: 'Pharmaceuticals', image: pharmaImg, ctx: 'Process and utility lines that call for careful material choices and consistent performance.', families: ['PFA Lined', 'Special Alloy', 'Customized Solutions'] },
  { id: 'transportation', name: 'Transportation', image: transportationImg, ctx: 'Fluid handling for terminals and transfer systems with practical maintenance in mind.', families: ['Resilient Seated', 'High Performance', 'Automated Packages'] },
];

export const WHY = [
  { k: 'ENGINEERING', t: 'Engineered for demanding applications', d: 'Custom valve designs, special materials, and engineering support for complex piping configurations and severe service conditions.' },
  { k: 'EXPERTISE', t: 'Practical valve engineering support', d: 'Experienced valve professionals help customers select the right valve, materials, actuator, and configuration for their application.' },
  { k: 'SERVICE', t: 'Responsive supply and support', d: 'A broad product inventory, automation capabilities, and technical sales support help keep projects moving from selection through delivery.' },
];

/* Story-led groupings for the homepage cinematic stages.
   families reference FAMILIES ids; sectors are storytelling groupings, not technical claims. */
export const PRODUCT_STORIES = [
  {
    id: 'reliable-isolation', title: 'Reliable isolation',
    teaser: 'Dependable shutoff for systems that run the same way every time. Resilient seated and high performance valves handle repeatable isolation, with automated packages where duties cycle often.',
    line: 'Dependable shutoff and control for systems that must operate consistently.',
    story: 'Many systems simply need to start and stop flow without fuss, every time they are asked to. Max-Seal builds resilient seated and high performance valves around that need for repeatable shutoff. Where duties cycle often, automated packages help keep operation steady.',
    families: ['resilient', 'high-performance', 'automated'], app: 'Water, HVAC, building services and general utility isolation',
    image: resilientSeatedImg
  },
  {
    id: 'performance-pressure', title: 'Performance under pressure',
    teaser: 'Some duties ask more than everyday service. High performance and triple offset designs are configured for demanding pressure and temperature, with seat and trim matched to the application.',
    line: 'Valve configurations designed for demanding service conditions and application requirements.',
    story: 'Some service conditions ask more of a valve than everyday duties. High performance and triple offset designs are configured for demanding pressure and temperature ranges. The right seat and trim choice is matched to each application.',
    families: ['high-performance', 'triple-offset'], app: 'Process, refining and power duties across a wide range',
    image: highPerformanceImg
  },
  {
    id: 'corrosive-service', title: 'Corrosive service',
    teaser: 'When media is aggressive, material choice decides valve life. PFA lined and special alloy constructions protect wetted parts, guided by the chemistry of your process.',
    line: 'Material and lining options for environments where media compatibility matters.',
    story: 'When the media is aggressive, material compatibility decides how long a valve keeps working. PFA lined and special alloy constructions protect wetted parts in corrosive environments. Selections are guided by the chemistry of your process.',
    families: ['pfa-lined', 'special-alloy'], app: 'Chemical, petrochemical and other aggressive media',
    image: pfaLinedImg
  },
  {
    id: 'automated-control', title: 'Automated control',
    teaser: 'Control systems need valves that respond predictably. Max-Seal prepares valve and actuator packages around control, response and operating needs, with accessories suited to the duty.',
    line: 'Valve and actuator packages prepared around control, response, and operating needs.',
    story: 'Control systems need valves that respond predictably and integrate cleanly. Max-Seal assembles valve and actuator packages around control, response and operating needs. Accessories and controls are prepared to suit the duty.',
    families: ['automated', 'high-performance', 'customized'], app: 'Process automation and control loops',
    image: automatedImg
  },
  {
    id: 'application-specific', title: 'Application-specific solutions',
    teaser: 'Not every requirement fits a standard configuration. Customized solutions are engineered to order with practical input, working from your application to the valve.',
    line: 'Customized configurations supported by practical engineering input.',
    story: 'Not every requirement fits a standard configuration. Customized solutions are engineered to order with practical input from our team. We work from your application to the valve, not the other way around.',
    families: ['customized', 'special-alloy'], app: 'Project specific requirements',
    image: customizedImg
  },
  {
    id: 'engineered-support', title: 'Engineered support',
    teaser: 'Choosing the right valve is easier with engineering alongside it. We help match series, seat and trim to your service condition, from selection through configuration.',
    line: 'Practical engineering input from selection through configuration.',
    story: 'Choosing the right valve is easier with engineering input alongside it. Max-Seal helps match series, seat and trim to your service condition. Support continues from selection through sizing and configuration.',
    families: ['customized', 'automated', 'high-performance'], app: 'Selection, sizing and application support',
    image: specialAlloyImg
  },
];

export const INDUSTRY_STORIES = [
  {
    id: 'critical-infrastructure', title: 'Critical infrastructure',
    teaser: 'Critical facilities depend on cooling and water systems that cannot stop. Dependable isolation keeps these environments running around the clock, with automated packages supporting steady control.',
    line: 'Flow control for sites that cannot afford downtime.',
    story: 'Critical facilities depend on cooling and water systems that need to run without interruption. Dependable isolation helps keep these environments operating around the clock. Automated packages support the steady control these sites rely on.',
    sectors: ['Data centers', 'HVAC'], families: ['resilient', 'high-performance', 'automated'],
    app: 'Cooling loops and water distribution for critical sites',
    image: dataCentersImg
  },
  {
    id: 'energy-refining', title: 'Energy and refining',
    teaser: 'Energy and refining work across a wide range of pressures and temperatures. Robust isolation and control are matched to each service condition for dependable performance.',
    line: 'Reliable valve solutions for demanding energy and refining applications.',
    story: 'Energy and refining operations work across a wide range of pressures and temperatures. Robust isolation and control are matched to each service condition. The aim is dependable performance across demanding duties.',
    sectors: ['Oil and gas', 'Refining', 'Power'], families: ['triple-offset', 'high-performance', 'automated'],
    app: 'Isolation and control across energy and refining duties',
    image: oilGasImg
  },
  {
    id: 'process-industries', title: 'Process industries',
    teaser: 'Process plants handle aggressive media and frequent cycling. Material and sealing choices are matched to the chemistry of each process, with lined and alloy options protecting wetted parts.',
    line: 'Engineered for demanding process and refining environments.',
    story: 'Process plants handle aggressive media and frequent cycling. Material and sealing choices are matched to the chemistry of each process. Lined and alloy constructions help protect wetted parts.',
    sectors: ['Petrochemical', 'Chemical processing', 'Pulp and paper'], families: ['pfa-lined', 'special-alloy', 'triple-offset'],
    app: 'Corrosive media and cycling process duties',
    image: chemicalImg
  },
  {
    id: 'food-life-sciences', title: 'Food and life sciences',
    teaser: 'Production environments place careful demands on material selection and cleanliness. Valve choices support consistent, safe operation, matched to the needs of each process.',
    line: 'Reliable flow control for food, beverage, pharmaceutical, and life science applications.',
    story: 'Production environments place careful demands on material selection and cleanliness. Valve choices support consistent, safe operation across these sectors. Configurations are matched to the needs of each process.',
    sectors: ['Food and beverage', 'Pharmaceuticals'], families: ['resilient', 'pfa-lined', 'customized'],
    app: 'Clean and utility duties with careful material choices',
    image: foodBeverageImg
  },
  {
    id: 'marine-transportation', title: 'Marine and transportation',
    teaser: 'Marine and transport systems face corrosion, vibration and heavy service. Corrosion aware materials and rugged construction are matched to the duty, with practical maintenance in mind.',
    line: 'Durable solutions for demanding marine and transportation systems.',
    story: 'Marine and transport systems face corrosion, vibration and heavy-duty service. Corrosion-aware materials and rugged construction are matched to the duty. Designs keep practical maintenance in mind.',
    sectors: ['Marine', 'Transportation', 'Mining'], families: ['special-alloy', 'resilient', 'customized'],
    app: 'Seawater, transfer and heavy-duty service',
    image: marineImg
  },
  {
    id: 'industrial-automation', title: 'Industrial automation',
    teaser: 'Automated operations need flow control that integrates cleanly. Valve and actuator packages are prepared around control and response for reliable, repeatable operation.',
    line: 'Precision valve and automation solutions for integrated industrial systems.',
    story: 'Automated operations need flow control that integrates with wider systems. Valve and actuator packages are prepared around control and response. The result supports reliable, repeatable operation.',
    sectors: ['Manufacturing', 'Automated systems'], families: ['automated', 'high-performance', 'customized'],
    app: 'Manufacturing and automated process operations',
    image: powerImg
  },
];

/* Featured proof story — clearly labelled placeholder until CMS content is approved. */
export const PROOF = {
  type: 'Project story',
  industry: 'Data Centers',
  customer: 'Data Center Cooling Partner',
  title: 'Data Center Cooling Loop Valve Solution',
  summary: 'High-availability butterfly valve packages engineered for critical data center cooling loops, ensuring 100% uptime and bubble-tight isolation.',
  image: dataCentersImg,
  details: [
    { k: 'Challenge', v: 'Maintain continuous cooling loop circulation with reliable isolation under strict uptime requirements.' },
    { k: 'Max-Seal support', v: 'Supplied high performance and resilient seated automated valve assemblies.' },
    { k: 'Outcome', v: 'Zero downtime and dependable automated flow control across primary cooling circuits.' },
  ],
};

export const DOCS = [
  { id: 'd1', slug: 'resilient-seated', type: 'Catalog', title: 'Resilient Seated Series Catalog', fam: 'Resilient Seated', date: 'May 2025', size: '0.7 MB', pages: 4, pdfAsset: catalogPdf, coverAsset: catalogCoverImg },
  { id: 'd2', slug: 'triple-offset', type: 'Datasheet', title: 'Triple Offset Technical Datasheet', fam: 'Triple Offset', date: 'Apr 2025', size: '1.8 MB', pages: 6, pdfAsset: null, coverAsset: null },
  { id: 'd3', slug: 'high-performance', type: 'Catalog', title: 'High Performance Series Catalog', fam: 'High Performance', date: 'Mar 2025', size: '3.6 MB', pages: 22, pdfAsset: null, coverAsset: null },
  { id: 'd4', slug: 'pfa-lined', type: 'Brochure', title: 'PFA Lined Valves Overview', fam: 'PFA Lined', date: 'Feb 2025', size: '2.1 MB', pages: 12, pdfAsset: null, coverAsset: null },
  { id: 'd5', slug: 'automated-packages', type: 'Selection Guide', title: 'Automated Packages Selection Guide', fam: 'Automated Packages', date: 'Jan 2025', size: '2.7 MB', pages: 16, pdfAsset: null, coverAsset: null },
  { id: 'd6', slug: 'special-alloy', type: 'Datasheet', title: 'Special Alloy Materials Reference', fam: 'Special Alloy', date: 'Dec 2024', size: '1.4 MB', pages: 8, pdfAsset: null, coverAsset: null },
  { id: 'd7', slug: 'seat-selection', type: 'Technical Bulletin', title: 'Seat Selection Bulletin (sample)', fam: 'Resilient Seated', date: 'May 2025', size: '0.6 MB', pages: 3, pdfAsset: null, coverAsset: null },
  { id: 'd8', slug: 'installation', type: 'Installation Document', title: 'Installation and Handling (sample)', fam: 'All families', date: 'Apr 2025', size: '1.1 MB', pages: 10, pdfAsset: null, coverAsset: null },
  { id: 'd9', slug: 'maintenance', type: 'Maintenance Document', title: 'Maintenance and Service (sample)', fam: 'All families', date: 'Mar 2025', size: '1.0 MB', pages: 9, pdfAsset: null, coverAsset: null },
  { id: 'd10', slug: 'chemical-processing', type: 'Application Guide', title: 'Chemical Processing Application Guide (sample)', fam: 'PFA Lined', date: 'Feb 2025', size: '1.9 MB', pages: 14, pdfAsset: null, coverAsset: null },
];
export const DOC_TYPES = ['Product Catalog', 'Technical Bulletin', 'Selection Guide', 'Installation Document', 'Maintenance Document', 'Application Guide'];

/* Confirmed company facts (client supplied). Do not add unconfirmed claims. */
export const COMPANY = {
  founded: '2008',
  president: 'Martin Gibbons',
  experience: 'More than 40 years of valve industry experience',
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

/* Team — confirmed leadership only; rest are reusable placeholders. CMS-managed. */
export const TEAM = [
  { id: 't1', name: 'Martin Gibbons', role: 'President', region: 'United States', bio: 'Leads Max-Seal with more than 40 years of valve industry experience.', confirmed: true },
  { id: 't2', name: 'Team member', role: 'Engineering support', region: 'United States', bio: 'Profile connects through the CMS once approved.', confirmed: false },
  { id: 't3', name: 'Team member', role: 'Sales and distribution', region: 'Latin America', bio: 'Profile connects through the CMS once approved.', confirmed: false },
  { id: 't4', name: 'Team member', role: 'Customer support', region: 'United States', bio: 'Profile connects through the CMS once approved.', confirmed: false },
];

/* Global partners — confirmed countries only; partner names are placeholders. */
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

/* Price lists — controlled documents with access status. No invented prices. */
export const PRICE_LISTS = [
  { id: 'pl1', title: 'Distributor Price List', fam: 'All families', effective: 'Jan 2025', version: '2025.1', updated: 'Jan 2025', access: 'request', size: '1.1 MB' },
  { id: 'pl2', title: 'Resilient Seated Price List', fam: 'Resilient Seated', effective: 'Jan 2025', version: '2025.1', updated: 'Jan 2025', access: 'request', size: '0.7 MB' },
  { id: 'pl3', title: 'Published List Pricing Summary', fam: 'All families', effective: 'Jan 2025', version: '2025.1', updated: 'Feb 2025', access: 'download', size: '0.5 MB' },
];

export const RESOURCE_LIBS = [
  {
    id: 'catalog', href: routes.catalog(), label: 'Catalog', desc: 'Product catalogs and technical datasheets by family.',
    latest: 'Resilient Seated Butterfly Valves — Performance Series', family: 'Performance Series', fileType: 'PDF', pages: '4 pages', catalogDocSlug: 'resilient-seated'
  },
  {
    id: 'marketing', href: routes.marketing, label: 'Marketing Resources', desc: 'Brochures, presentations and approved brand assets.',
    latest: 'Company Overview Brochure', resType: 'Brochure', related: 'Company overview', date: 'Apr 2025'
  },
  {
    id: 'pricelists', href: routes.priceLists, label: 'Price Lists', desc: 'Current price lists for distributors and partners.',
    latest: 'Distributor Price List', effective: 'Effective Jan 2025', version: 'Version 2025.1', access: 'Distributor access'
  },
];

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
