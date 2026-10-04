import { useCallback, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { IntroContext } from './lib/intro';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import NoticeTicker from './components/NoticeTicker';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import PageTransition from './components/PageTransition';
import SchoolSchema from './components/SchoolSchema';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Facilities from './pages/Facilities';
import Gallery from './pages/Gallery';
import Notices from './pages/Notices';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Disclosure from './pages/Disclosure';
import NotFound from './pages/NotFound';

const routes = [
  ['/', Home],
  ['/about', About],
  ['/academics', Academics],
  ['/admissions', Admissions],
  ['/facilities', Facilities],
  ['/gallery', Gallery],
  ['/notices', Notices],
  ['/reviews', Reviews],
  ['/contact', Contact],
  ['/disclosure', Disclosure],
  ['*', NotFound],
];

export default function App() {
  const location = useLocation();
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={ready}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Preloader onDone={onIntroDone} />
        <ScrollProgress />
        <CustomCursor />
        <div className="app">
          <NoticeTicker />
          <Navbar />
          <main id="main">
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
              <Routes location={location} key={location.pathname}>
                {routes.map(([path, Page]) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <PageTransition>
                        <Page />
                      </PageTransition>
                    }
                  />
                ))}
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
        <WhatsAppFab />
        <SchoolSchema />
      </IntroContext.Provider>
    </MotionConfig>
  );
}
