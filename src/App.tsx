/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/common/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Membership from './pages/Membership';
import Training from './pages/Training';
import Projects from './pages/Projects';
import Insights from './pages/Insights';
import SubmitProposal from './pages/SubmitProposal';
import Admin from './pages/Admin';

const Partner = () => (
  <div className="py-32 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <h1 className="text-5xl font-black mb-6">Partner with Us</h1>
    <p className="text-gray-500 max-w-2xl text-lg">Join our network of global partners and help us empower the next generation of food researchers.</p>
    <button className="mt-12 bg-brand-black text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-red transition-all">Download Partnership Deck</button>
  </div>
);

import { FirebaseProvider } from './components/FirebaseProvider';

export default function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="membership" element={<Membership />} />
            <Route path="training" element={<Training />} />
            <Route path="projects" element={<Projects />} />
            <Route path="insights" element={<Insights />} />
            <Route path="partner" element={<Partner />} />
            <Route path="proposals/submit" element={<SubmitProposal />} />
          </Route>
          <Route path="admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
}


