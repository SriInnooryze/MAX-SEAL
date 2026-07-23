import { useState, useMemo } from 'react';
import { routes } from '../router/paths';

export function useRecommendation() {
  const [sizingMedia, setSizingMedia] = useState('utility');
  const [sizingPressure, setSizingPressure] = useState('low');
  const [sizingOperation, setSizingOperation] = useState('manual');

  const recommendation = useMemo(() => {
    let rec;
    if (sizingMedia === 'corrosive') {
      rec = {
        title: 'PFA Lined (Chem Flo/Chem Tek) or Special Alloy Series',
        desc: 'Designed specifically to protect wetted parts from aggressive chemicals, acids, and exotic media. We recommend wetted w/ PFA liners or special alloy construction (Monel, Hastelloy, Duplex) to resist corrosion.',
        link: routes.products({ type: 'lined' }),
        linkText: 'Explore Lined Valves',
        ctaText: 'Ask Chemical Engineers',
      };
    } else if (sizingMedia === 'process' || sizingPressure === 'high') {
      rec = {
        title: 'High Performance Double Offset or Tri-Max Triple Offset Series',
        desc: 'Engineered for high temperature, steam, oil, and gas applications. The Tri-Max Series features a metal-to-metal torque-seated design for severe service zero-leakage shutoff.',
        link: routes.products({ type: 'high-performance' }),
        linkText: 'Explore High Performance',
        ctaText: 'Request High-Pressure Quote',
      };
    } else if (sizingMedia === 'slurry') {
      rec = {
        title: 'Heavy-Duty Resilient Seated or Custom Engineered Valve',
        desc: 'For slurry, mining, and abrasive processes, we recommend a heavy-duty resilient seated valve with specialized abrasion-resistant liners and customized disc coatings to maximize service life.',
        link: routes.products({ type: 'resilient' }),
        linkText: 'Explore Resilient Valves',
        ctaText: 'Consult Application Engineer',
      };
    } else {
      rec = {
        title: 'Resilient Seated ISO Series or Performance Series',
        desc: 'Perfect for everyday water, air, HVAC, and general utility isolation. The ISO Series includes direct ISO 5211 mounting pads for easy, low-cost actuator installation.',
        link: routes.products({ type: 'resilient' }),
        linkText: 'Explore Resilient Valves',
        ctaText: 'Request Sizing Quote',
      };
    }

    return {
      ...rec,
      isAutomated: sizingOperation === 'automated',
    };
  }, [sizingMedia, sizingPressure, sizingOperation]);

  return {
    sizingMedia,
    setSizingMedia,
    sizingPressure,
    setSizingPressure,
    sizingOperation,
    setSizingOperation,
    recommendation,
  };
}

export default useRecommendation;
