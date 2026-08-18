import Header from '../Header';
import Footer from '../Footer';

/* Shared site chrome — every routed page renders through this so Header/Footer
   are controlled from one place (see AppRouter.jsx) instead of being
   imported and repeated inside each page file. `current` is passed through
   to Header for nav active-state highlighting, exactly as each page used to
   set it directly (e.g. GlobalPartners intentionally passes "about" despite
   living at /partners; several pages intentionally pass null). */
export default function SiteLayout({ current, children }) {
  return (
    <>
      <Header current={current} />
      {children}
      <Footer />
    </>
  );
}
