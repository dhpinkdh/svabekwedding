import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Story from './pages/Story';
import Location from './pages/Location';
import Travel from './pages/Travel';
import Rsvp from './pages/Rsvp';
import Registry from './pages/Registry';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<Story />} />
          <Route path="/location" element={<Location />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/rsvp" element={<Rsvp />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
