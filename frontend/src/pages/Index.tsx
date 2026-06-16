import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import SEO from '@/components/SEO';
import CurrentlyBuilding from '@/components/CurrentlyBuilding';
import TerminalEmulator from '@/components/TerminalEmulator';
import { useLenis } from '@/hooks/useLenis';
import { track } from '@/lib/analytics';

// Konami code: ↑↑↓↓←→←→BA
const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

function useKonamiCode(callback: () => void) {
  useEffect(() => {
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          idx = 0;
          callback();
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}

// Ctrl + ` shortcut
function useTerminalShortcut(callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
}

function PortfolioContent() {
  useLenis();
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Fire page_view on mount
  useEffect(() => {
    track('page_view', { path: '/', referrer: document.referrer || undefined });
  }, []);

  const openTerminal = useCallback(() => {
    setTerminalOpen(true);
    track('contact_open', { context: 'terminal_easter_egg' });
  }, []);

  useKonamiCode(openTerminal);
  useTerminalShortcut(openTerminal);

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <CurrentlyBuilding />
      <CustomCursor />
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
      {/* Terminal easter egg */}
      <AnimatePresence>
        {terminalOpen && (
          <TerminalEmulator onClose={() => setTerminalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

const Index = () => {
  const [loading, setLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  return (
    <HelmetProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={handleLoadComplete} />
        ) : (
          <PortfolioContent key="portfolio" />
        )}
      </AnimatePresence>
    </HelmetProvider>
  );
};

export default Index;
