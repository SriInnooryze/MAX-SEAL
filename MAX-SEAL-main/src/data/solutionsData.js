import { routes } from '../router/paths';

export const SOLUTIONS_TABS = [
  { id: 'applications', label: 'Applications' },
  { id: 'services', label: 'Engineering & Services' },
  { id: 'affiliates', label: 'Partners & Affiliates' },
];

export const SOLUTIONS_APPLICATIONS = [
  {
    id: 'reliable-isolation',
    iconType: 'check',
    title: 'Reliable Isolation & Utility',
    desc: 'Repeatable bubble-tight shutoff and general utility service. Engineered with resilient seats to deliver zero-leakage performance under standard operating cycles.',
    linkText: 'Explore resilient seated valves',
    href: routes.products({ type: 'resilient' }),
    imageSlotId: 'sol-app-reliable-isolation',
    imagePlaceholder: 'Resilient Seated Valve Isolation'
  },
  {
    id: 'severe-service',
    iconType: 'gauge',
    title: 'Severe Service & High Pressure',
    desc: 'Double-offset high performance and triple-offset metal-seated valves designed to withstand high pressure drops, extreme temperatures, and severe process cycles.',
    linkText: 'Explore high performance range',
    href: routes.products({ type: 'high-performance' }),
    imageSlotId: 'sol-app-severe-service',
    imagePlaceholder: 'High Performance & Severe Service'
  },
  {
    id: 'corrosive-media',
    iconType: 'layers',
    title: 'Corrosive & Aggressive Media',
    desc: 'Fully wetted parts protection utilizing PFA lining and exotic special alloy bodies (marine, chemical processing, petrochemical) built to resist hostile chemicals.',
    linkText: 'Explore lined and alloy options',
    href: routes.products({ type: 'lined' }),
    imageSlotId: 'sol-app-corrosive-media',
    imagePlaceholder: 'Corrosive Media & PFA Lined Valves'
  },
  {
    id: 'automation',
    iconType: 'settings',
    title: 'Automated Valve Packages',
    desc: 'Fully configured and pre-tested valve-actuator packages. Integrated with pneumatic, electric, or hydraulic actuators, limit switches, and positioners for immediate installation.',
    linkText: 'Explore automated packages',
    href: routes.products({ type: 'automated' }),
    imageSlotId: 'sol-app-automation',
    imagePlaceholder: 'Automated Actuator Packages'
  },
  {
    id: 'customized',
    iconType: 'headset',
    title: 'Customized Solutions',
    desc: 'Tailor-made modifications and engineered-to-order configurations to fit specific face-to-face dimensions, custom mounting pads, or unique process conditions.',
    linkText: 'Contact engineers for custom designs',
    href: routes.enquiry({ intent: 'technical' }),
    imageSlotId: 'sol-app-customized',
    imagePlaceholder: 'Custom Engineered Valve Solutions'
  }
];

export const SOLUTIONS_SERIES = [
  {
    id: 'iso-series',
    title: 'ISO Series',
    desc: 'Heavy-duty resilient seated butterfly valves. Features an ISO 5211 mounting pad for direct automation mounting, extra-heavy shafts, and low operating torques.',
    href: routes.products({ type: 'resilient' }),
    imageSlotId: 'sol-series-iso',
    imagePlaceholder: 'ISO Series Butterfly Valve'
  },
  {
    id: 'high-perf-series',
    title: 'High Performance Series',
    desc: 'Double offset high-performance series designed for steam, gas, oil, and chemical duties. Features ANSI Class 150/300/600/900 ratings with positive bubble-tight shutoff.',
    href: routes.products({ type: 'high-performance' }),
    imageSlotId: 'sol-series-hp',
    imagePlaceholder: 'High Performance Series'
  },
  {
    id: 'trimax-series',
    title: 'High Performance Tri-Max Series',
    desc: 'Triple offset metal-seated series built for severe services. Eliminates seat wear, ensures bidirectional zero-leakage, and operates in extreme temperatures.',
    href: routes.products({ type: 'triple-offset' }),
    imageSlotId: 'sol-series-trimax',
    imagePlaceholder: 'Tri-Max Triple Offset Series'
  },
  {
    id: 'performance-series',
    title: 'Performance Series',
    desc: 'General industrial and commercial service resilient seated butterfly valves. Reliable construction, standard layouts, and fast delivery.',
    href: routes.products({ type: 'resilient' }),
    imageSlotId: 'sol-series-performance',
    imagePlaceholder: 'Performance Series Valve'
  },
  {
    id: 'hitek-series',
    title: 'Hi-Tek Series',
    desc: 'High performance control and automation valves engineered for modulating control, offering precise flow coefficients and tight shutoff.',
    href: routes.products({ type: 'automated' }),
    imageSlotId: 'sol-series-hitek',
    imagePlaceholder: 'Hi-Tek Control Series'
  },
  {
    id: 'chem-flo-series',
    title: 'Chem Flo Series',
    desc: 'Lined industrial butterfly valves protecting wetted parts from hostile chemicals, acids, and high purity wetted medias.',
    href: routes.products({ type: 'lined' }),
    imageSlotId: 'sol-series-chemflo',
    imagePlaceholder: 'Chem Flo Lined Series'
  },
  {
    id: 'chem-tek-series',
    title: 'Chem Tek Series',
    desc: 'Robust wetted protection and lined options designed for chemical processing and industrial manufacturing.',
    href: routes.products({ type: 'lined' }),
    imageSlotId: 'sol-series-chemtek',
    imagePlaceholder: 'Chem Tek Lined Series'
  },
  {
    id: 'actuators-gear',
    title: 'Gear Ops & Pneumatic Actuators',
    desc: 'Pneumatic double-acting and spring-return actuators, manual gear operators, limit switches, and positioners pre-tested for immediate deployment.',
    href: routes.products({ type: 'automated' }),
    imageSlotId: 'sol-series-actuators',
    imagePlaceholder: 'Pneumatic Actuators & Gear Ops'
  }
];

export const SOLUTIONS_SERVICES = [
  {
    title: 'Custom Stem Extensions',
    desc: 'Engineered stem and shaft extensions for insulated pipes, buried services, or high-temperature lines. Built to match your specific torque and height needs.',
    iconType: 'sliders'
  },
  {
    title: 'Mounting Brackets & Hardware',
    desc: 'Custom mounting brackets, couplings, and adapter plates designed and machined in-house for seamless valve-to-actuator pairing.',
    iconType: 'layers'
  },
  {
    title: 'Valve & Actuator Repair',
    desc: 'Full refurbishment, seat replacement, actuator recalibration, and leak testing services at our Lumberton and Houston depots.',
    iconType: 'settings'
  },
  {
    title: 'Custom Testing & QA',
    desc: 'API 598 pressure testing, shell/leak tests, and custom certification reports for compliance and severe service verification.',
    iconType: 'gauge'
  }
];

export const SOLUTIONS_PARTNERS = [
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

export const SOLUTIONS_VIDEOS = [
  {
    id: 'video-1',
    embedUrl: 'https://www.youtube.com/embed/Br-8P-sG6Ws',
    title: 'Design & Capabilities Overview',
    desc: 'A detailed walkthrough of Max-Seal\'s design features including heavy-duty stems, ISO mounting pads, and low torque sealing mechanisms.'
  },
  {
    id: 'video-2',
    embedUrl: 'https://www.youtube.com/embed/LyE8vXhN3m4',
    title: 'Automated Process Valve Demo',
    desc: 'Watch Max-Seal automated valve packages in operation, showing smooth pneumatic cycling and positioner responses for process loops.'
  }
];

export const MEDIA_OPTIONS = [
  { id: 'utility', label: 'Water / HVAC / Utility' },
  { id: 'process', label: 'Steam / Oil / Gas' },
  { id: 'corrosive', label: 'Corrosive Chemicals' },
  { id: 'slurry', label: 'Slurry / Abrasives' }
];

export const PRESSURE_OPTIONS = [
  { id: 'low', label: 'Low (PN10 / PN16 / 150 PSI)' },
  { id: 'medium', label: 'Medium (ANSI 150#)' },
  { id: 'high', label: 'High (ANSI 300#+)' }
];

export const OPERATION_OPTIONS = [
  { id: 'manual', label: 'Manual Handle / Gear' },
  { id: 'automated', label: 'Automated Actuator' }
];
