/* Each milestone supports one image. The actual asset imports live in
   HistoryTimeline.jsx (keeps this file asset-import-free); `imageAlt` here
   is the alt text used once that real image renders. `mediaPh` remains as
   the placeholder caption for any future milestone added without a photo
   yet — all six current milestones now have a real asset. */
export const ABOUT_TIMELINE = [
  {
    id: 'timeline-2008',
    label: '2008',
    period: '2008',
    title: 'A butterfly valve company is established',
    description: 'Max-Seal Inc. was established to manufacture and supply industrial butterfly valves for distributors and industrial customers.',
    mediaPh: 'Early company or facility photo',
    imageAlt: 'Max-Seal team at the company’s founding',
    imageSlotId: 'about-tl-0'
  },
  {
    id: 'timeline-leadership',
    label: 'Leadership',
    period: 'Leadership',
    title: 'Valve experience guides the business',
    description: 'Led by President Martin Gibbons, Max-Seal brings more than 35 years of valve industry experience to product selection, application support and customer service.',
    mediaPh: 'Leadership or engineering review photo',
    imageAlt: 'Engineering leadership discussion around butterfly valve application support',
    imageSlotId: 'about-tl-1'
  },
  {
    id: 'timeline-us',
    label: 'United States',
    period: 'United States',
    title: 'Operations in North Carolina and Texas',
    description: 'Max-Seal operates from facilities in Lumberton, North Carolina and Houston, Texas, supporting manual and automated process valve requirements.',
    mediaPh: 'Facility or production photo',
    imageAlt: 'United States industrial operations and valve supply facility',
    imageSlotId: 'about-tl-2'
  },
  {
    id: 'timeline-latam',
    label: 'Latin America',
    period: 'Latin America',
    title: 'Regional sales support across Latin America',
    description: 'Sales offices in Argentina, Chile and Mexico help support distributors and industrial customers across the region.',
    mediaPh: 'Regional sales or distribution photo',
    imageAlt: 'Latin America regional sales and distribution network',
    imageSlotId: 'about-tl-3'
  },
  {
    id: 'timeline-worldwide',
    label: 'Worldwide',
    period: 'Worldwide',
    title: 'Partners supporting customers worldwide',
    description: 'Max-Seal works with partners in key locations around the world, extending support beyond its U.S. operations and regional sales offices.',
    mediaPh: 'Distribution or logistics photo',
    imageAlt: 'Worldwide distributor network and global industrial supply routes',
    imageSlotId: 'about-tl-4'
  },
  {
    id: 'timeline-today',
    label: 'Today',
    period: 'Today',
    title: 'Engineered valve solutions with practical support',
    description: 'Max-Seal continues to supply manual and automated butterfly valves, customized solutions and practical engineering support for demanding industrial applications.',
    mediaPh: 'Applied engineering or technical support photo',
    imageAlt: 'Engineering workstation with valve CAD review and application support materials',
    imageSlotId: 'about-tl-5'
  }
];

export const ABOUT_FACTS = [
  { v: '2008', l: 'Established as a butterfly valve company', s: 'Max-Seal, Inc. was established in 2008.' },
  { v: '35+', l: 'Years of valve experience behind the business', s: 'President Martin Gibbons brings more than 35 years of valve industry experience.' },
  { v: '2', l: 'U.S. facilities', s: 'Main facilities in Lumberton, North Carolina and Houston, Texas.' },
  { v: '3', l: 'Regional sales offices in Latin America', s: 'Sales offices in Argentina, Chile and Mexico.' },
  { v: 'Global', l: 'Partner support in key markets', s: 'Partner relationships and product-use references extend across multiple markets.' },
];

/* Used by the Leadership/Team no-photo identity badges (LeadershipSection,
   TeamSection) — up to two initials from an existing real name, never a
   substitute for the name itself (the badge is marked aria-hidden; the
   name always renders as real text alongside it). */
export function getInitials(name) {
  return (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}
