import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Industries from '../pages/Industries';
import IndustryDetail from '../pages/IndustryDetail';
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
   restore that behavior on client-side navigation. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:family" element={<ProductDetail />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industry/:id" element={<IndustryDetail />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/catalog" element={<Catalog />} />
        <Route path="/resources/marketing" element={<MarketingResources />} />
        <Route path="/resources/price-lists" element={<PriceLists />} />
        <Route path="/resources/document-preview/:doc" element={<DocumentPreview />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/partners" element={<GlobalPartners />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
