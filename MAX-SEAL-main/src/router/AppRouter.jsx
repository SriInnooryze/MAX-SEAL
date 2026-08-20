import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import SiteLayout from '../components/layout/SiteLayout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductSubcategory from '../pages/ProductSubcategory';
import ProductDetail from '../pages/ProductDetail';
import Industries from '../pages/Industries';
import Solutions from '../pages/Solutions';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Resources from '../pages/Resources';
import Catalog from '../pages/Catalog';
import MarketingResources from '../pages/MarketingResources';
import PriceLists from '../pages/PriceLists';
import SearchResults from '../pages/SearchResults';
import Enquiry from '../pages/Enquiry';
import GlobalPartners from '../pages/GlobalPartners';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Terms from '../pages/Terms';
import DocumentPreview from '../pages/DocumentPreview';

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
      <Routes>
        <Route path="/" element={<SiteLayout current="home"><Home /></SiteLayout>} />
        <Route path="/products" element={<SiteLayout current="products"><Products /></SiteLayout>} />
        <Route path="/products/:categorySlug/:subcategorySlug" element={<SiteLayout current="products"><ProductSubcategory /></SiteLayout>} />
        <Route path="/products/:family" element={<SiteLayout current="products"><ProductDetail /></SiteLayout>} />
        <Route path="/industries" element={<SiteLayout current="industries"><Industries /></SiteLayout>} />
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
    </BrowserRouter>
  );
}
