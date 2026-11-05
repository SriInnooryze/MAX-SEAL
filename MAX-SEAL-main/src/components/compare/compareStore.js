/* Max-Seal — shared Compare selection (context + hook). Kept apart from
   Compare.jsx so that file exports only components (React fast refresh).
   See Compare.jsx for the provider, tray and comparison table. */
import { createContext, useContext } from 'react';

export const MAX_COMPARE = 3;
export const CompareContext = createContext(null);

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used inside <CompareProvider>');
  return ctx;
}
