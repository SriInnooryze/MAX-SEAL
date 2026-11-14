import { useEffect, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import SiteLayout from '../components/layout/SiteLayout';
import { CompareProvider, CompareDock } from '../components/compare/Compare';
import Home from '../pages/Home';
/* Pages other than Home load on demand (their own JS/CSS files), so a visit
   downloads only the page it opens. SiteLayout holds the Suspense boundary. */
const Products = lazy(() => import('../pages/Products'));
const ExploreAllProducts = lazy(() => import('../pages/ExploreAllProducts'));
const ProductSubcategory = lazy(() => import('../pages/ProductSubcategory'));
const ProductOrCategory = lazy(() => import('../pages/ProductOrCategory'));
const Industries = lazy(() => import('../pages/Industries'));
const DataCenters = lazy(() => import('../pages/DataCenters'));
const Solutions = lazy(() => import('../pages/Solutions'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Resources = lazy(() => import('../pages/Resources'));
const Catalog = lazy(() => import('../pages/Catalog'));
const MarketingResources = lazy(() => import('../pages/MarketingResources'));
const PriceLists = lazy(() => import('../pages/PriceLists'));
const SearchResults = lazy(() => import('../pages/SearchResults'));
const Enquiry = lazy(() => import('../pages/Enquiry'));
const GlobalPartners = lazy(() => import('../pages/GlobalPartners'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const Terms = lazy(() => import('../pages/Terms'));
const DocumentPreview = lazy(() => import('../pages/DocumentPreview'));

/* Every page load in the original static site started scrolled to top;
   restore that behavior on client-side navigation. Skipped when a hash is
   present (e.g. /about#global-partners) — that case is owned by the
   target page's own hash-scroll handler (see src/pages/About.jsx), and
   resetting to 0 here first would just be a redundant jump before it
   scrolls back down to the anchored section. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);
  return null;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Compare selection is site-wide: one provider above every route, one
          tray + comparison table shown on whichever page is open. */}
      <CompareProvider>
      <Routes>
        <Route path="/" element={<SiteLayout current="home"><Home /></SiteLayout>} />
        {/* Home 2 became the Home page and Home 3 was retired; old links go Home. */}
        <Route path="/home-2" element={<Navigate to="/" replace />} />
        <Route path="/home-3" element={<Navigate to="/" replace />} />
        <Route path="/products" element={<SiteLayout current="products"><Products /></SiteLayout>} />
        <Route path="/products/explore-all" element={<SiteLayout current="products"><ExploreAllProducts /></SiteLayout>} />
        <Route path="/products/:categorySlug/:subcategorySlug" element={<SiteLayout current="products"><ProductSubcategory /></SiteLayout>} />
        <Route path="/products/*" element={<SiteLayout current="products"><ProductOrCategory /></SiteLayout>} />
        <Route path="/industries" element={<SiteLayout current="industries"><Industries /></SiteLayout>} />
        <Route path="/data-centers" element={<SiteLayout current="data-centers"><DataCenters /></SiteLayout>} />
        <Route path="/solutions" element={<SiteLayout current="solutions"><Solutions /></SiteLayout>} />
        <Route path="/about" element={<SiteLayout current="about"><About /></SiteLayout>} />
        <Route path="/contact" element={<SiteLayout current="contact"><Contact /></SiteLayout>} />
        <Route path="/resources" element={<SiteLayout current="resources"><Resources /></SiteLayout>} />
        <Route path="/resources/catalog" element={<SiteLayout current="resources"><Catalog /></SiteLayout>} />
        <Route path="/resources/marketing" element={<SiteLayout current="resources"><MarketingResources /></SiteLayout>} />
        <Route path="/resources/price-lists" element={<SiteLayout current="resources"><PriceLists /></SiteLayout>} />
        <Route path="/resources/document-preview/:doc" element={<SiteLayout current={null}><DocumentPreview /></SiteLayout>} />
        <Route path="/search" element={<SiteLayout current={null}><SearchResults /></SiteLayout>} />
        <Route path="/enquiry" element={<SiteLayout current={null}><Enquiry /></SiteLayout>} />
        <Route path="/partners" element={<SiteLayout current="about"><GlobalPartners /></SiteLayout>} />
        <Route path="/privacy-policy" element={<SiteLayout current={null}><PrivacyPolicy /></SiteLayout>} />
        <Route path="/terms" element={<SiteLayout current={null}><Terms /></SiteLayout>} />
        <Route path="*" element={<SiteLayout current="home"><Home /></SiteLayout>} />
      </Routes>
      <CompareDock />
      </CompareProvider>
    </BrowserRouter>
  );
}
