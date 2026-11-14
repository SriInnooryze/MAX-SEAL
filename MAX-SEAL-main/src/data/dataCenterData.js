/* Max-Seal — Data Centers landing page content (src/pages/DataCenters.jsx).

   Product facts (names, sizes, ratings, images, links) are NOT repeated here:
   the page reads them live from the catalog (FAMILIES, generated from the
   Excel workbook), so a product edit in the workbook flows straight through.

   What this file holds is the page's own copy and the proposed mapping of
   cooling-system zones to Max-Seal products. That mapping is a DRAFT based
   on each product's listed applications (water / HVAC / building services,
   large-diameter water service, chemical service, automation) — it should be
   confirmed by Max-Seal engineering before the page goes live. */

/* Products shown in the selection matrix, in column order. */
export const DC_MATRIX_PRODUCTS = [
  { id: 'PROD-009', short: 'Performance' },
  { id: 'PROD-010', short: 'ISO' },
  { id: 'PROD-011', short: 'Global' },
  { id: 'PROD-003', short: '52DF' },
  { id: 'PROD-004', short: 'AWWA C504' },
  { id: 'PROD-012', short: 'Chem-Tek' },
  { id: 'PROD-006', short: 'Fluoro-Tek' },
  { id: 'PROD-034', short: 'Electric act.' },
  { id: 'PROD-024', short: 'Pneumatic act.' },
];

/* Cooling-system zones: the hotspots on the Cooling Loop Explorer, the rows
   of the selection matrix and the first question of the Spec Builder.
   fit: 'primary' = first choice for the zone, 'option' = also suitable. */
export const DC_ZONES = [
  {
    id: 'tower', n: '01', title: 'Cooling towers & condenser water',
    short: 'Heat rejection loop',
    role: 'Isolates individual tower cells and condenser pumps so one unit can be serviced while the rest keep rejecting heat.',
    needs: ['Large-diameter isolation', 'Outdoor, continuous duty', 'Tower cell isolation for maintenance'],
    products: [
      { id: 'PROD-003', fit: 'primary', why: 'Double-flanged body for large condenser headers.' },
      { id: 'PROD-004', fit: 'primary', why: 'AWWA C504 design for large water lines.' },
      { id: 'PROD-009', fit: 'option', why: 'Wafer and lug isolation on branch lines.' },
    ],
  },
  {
    id: 'chiller', n: '02', title: 'Chiller plant isolation',
    short: 'Redundant chillers (N+1)',
    role: 'Shuts off a chiller on both the evaporator and condenser sides, so it can be staged off or serviced while standby units carry the load.',
    needs: ['Bubble-tight shutoff', 'Automated isolation for chiller staging', 'Frequent operation'],
    products: [
      { id: 'PROD-009', fit: 'primary', why: 'Resilient-seated, bidirectional water/HVAC isolation.' },
      { id: 'PROD-010', fit: 'primary', why: 'ISO 5211 top flange for direct actuator mounting.' },
      { id: 'PROD-034', fit: 'primary', why: 'Electric actuation for BMS-controlled staging.' },
      { id: 'PROD-024', fit: 'option', why: 'Pneumatic actuation where plant air is available.' },
    ],
  },
  {
    id: 'headers', n: '03', title: 'Chilled water headers & distribution',
    short: 'Supply and return mains',
    role: 'Sectionalises the chilled-water supply and return mains so a branch or riser can be isolated without draining the whole loop.',
    needs: ['Sizes up to large mains', 'Low-maintenance shutoff', 'Loop sectionalising'],
    products: [
      { id: 'PROD-009', fit: 'primary', why: '2"–48" resilient-seated isolation.' },
      { id: 'PROD-003', fit: 'primary', why: 'Double-flanged option for the largest mains.' },
      { id: 'PROD-004', fit: 'option', why: 'AWWA C504 for large water headers.' },
      { id: 'PROD-011', fit: 'option', why: 'Economical choice for smaller branch lines.' },
    ],
  },
  {
    id: 'crah', n: '04', title: 'CRAH & air handler coils',
    short: 'Data hall air cooling',
    role: 'Isolates each computer-room air handler coil, so one unit can be swapped or serviced while its neighbours hold the room temperature.',
    needs: ['Compact face-to-face', 'Isolation at every unit', 'Automation-ready'],
    products: [
      { id: 'PROD-010', fit: 'primary', why: 'Compact, direct-mount design for unit isolation.' },
      { id: 'PROD-011', fit: 'primary', why: 'Cast iron wafer/lug for general HVAC branches.' },
      { id: 'PROD-009', fit: 'option', why: 'Where a heavier-duty resilient seat is specified.' },
      { id: 'PROD-034', fit: 'option', why: 'Motorised isolation tied into the BMS.' },
    ],
  },
  {
    id: 'cdu', n: '05', title: 'Liquid cooling & CDU loops',
    short: 'High-density racks',
    role: 'Isolates coolant distribution units (CDUs) and their facility-water connections for direct-to-chip and rear-door cooling.',
    needs: ['Automated isolation', 'Compact mechanical spaces', 'Tight, dependable shutoff'],
    products: [
      { id: 'PROD-010', fit: 'primary', why: 'Direct-mount automation on compact lines.' },
      { id: 'PROD-034', fit: 'primary', why: 'Electric actuators for remote open/close.' },
      { id: 'PROD-009', fit: 'option', why: 'Resilient-seated isolation on facility water.' },
    ],
  },
  {
    id: 'treatment', n: '06', title: 'Water treatment & chemical dosing',
    short: 'Corrosive service',
    role: 'Handles the treatment chemicals that protect cooling water, where standard wetted materials would corrode.',
    needs: ['Corrosion-resistant wetted parts', 'Chemical compatibility', 'Leak-tight service'],
    products: [
      { id: 'PROD-006', fit: 'primary', why: 'PTFE/PFA-lined for aggressive chemicals.' },
      { id: 'PROD-012', fit: 'primary', why: 'Stainless steel body for corrosive service.' },
    ],
  },
];

/* Spec Builder questions after the zone. Each option says how it filters. */
export const DC_SIZES = [
  { id: 's12', label: 'Up to 12"', max: 12 },
  { id: 's24', label: '14"–24"', max: 24 },
  { id: 's48', label: '28"–48"', max: 48 },
  { id: 's96', label: 'Over 48"', max: 96 },
];
export const DC_OPERATION = [
  { id: 'manual', label: 'Manual (lever or gear)' },
  { id: 'automated', label: 'Automated (BMS / remote)' },
];
export const DC_MEDIA = [
  { id: 'water', label: 'Water or glycol' },
  { id: 'chemical', label: 'Treatment chemicals' },
];

/* Why-Max-Seal points for data centers (from INDUSTRY_DETAILS) plus proof
   points that are read from the catalog on the page. */
export const DC_CHALLENGES = [
  { k: 'Continuity', v: 'Isolation at every chiller, pump and air handler lets you service one unit while the redundant path keeps cooling.' },
  { k: 'Automation readiness', v: 'Valves supplied as automated packages with electric or pneumatic actuators, limit switches and positioners for BMS integration.' },
  { k: 'Space constraints', v: 'Compact wafer and lug bodies with direct ISO 5211 actuator mounting suit tight mechanical rooms and pipe runs.' },
  { k: 'Scale', v: 'From small branch lines to the largest condenser and chilled-water mains, from one supplier.' },
];

export const DC_FAQ = [
  {
    q: 'What valves are used in data center chilled water systems?',
    a: 'Resilient-seated butterfly valves are widely used to isolate chillers, pumps, air handlers and branch lines in chilled-water and condenser-water loops. Max-Seal supplies the Performance, ISO and Global Series in wafer and lug styles, with double-flanged and AWWA C504 valves for the largest mains.',
  },
  {
    q: 'Which valve sizes can Max-Seal supply for data center cooling?',
    a: 'Max-Seal butterfly valves cover small branch lines from 1½" (ISO Series) up to large water mains of 96" (MSI AWWA C504 Series, Class 150). Our engineers can confirm the right series for each line size and pressure.',
  },
  {
    q: 'Can the valves be automated and connected to a building management system?',
    a: 'Yes. Max-Seal butterfly valves can be supplied as automated packages with electric or pneumatic actuators, plus accessories such as limit switches, positioners and solenoid valves for feedback and control.',
  },
  {
    q: 'How do isolation valves support N+1 cooling redundancy?',
    a: 'Isolation valves on both sides of each chiller, pump and air handler let one unit be taken out of service while the standby unit carries the load, so cooling continues during maintenance. Use the Maintenance mode in the Cooling Loop Explorer above to see this in action.',
  },
  {
    q: 'Which valves suit cooling water treatment and chemical dosing?',
    a: 'For treatment chemicals, the Fluoro-Tek Series (PTFE/PFA-lined) and the Chem-Tek Series (stainless steel) protect wetted parts from corrosive media.',
  },
  {
    q: 'How do I get a valve recommendation for my project?',
    a: 'Use the 60-second Spec Builder on this page and send your answers to our engineers, or start an enquiry with your line sizes, pressures and automation requirements.',
  },
];
