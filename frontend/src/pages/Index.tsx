import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import SEO from '@/components/SEO';
import CurrentlyBuilding from '@/components/CurrentlyBuilding';
import { useLenis } from '@/hooks/useLenis';
import { track } from '@/lib/analytics';

// Below-the-fold — lazy loaded for faster FCP/LCP
const About = lazy(() => import('@/components/About'));
const Projects = lazy(() => import('@/components/Projects'));
const Skills = lazy(() => import('@/components/Skills'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const Experience = lazy(() => import('@/components/Experience'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));
const TerminalEmulator = lazy(() => import('@/components/TerminalEmulator'));

function SectionFallback() {
  return (
    <div className="w-full py-24 flex items-center justify-center" aria-hidden="true">
      <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

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
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
        <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>
      {/* Terminal easter egg */}
      <AnimatePresence>
        {terminalOpen && (
          <Suspense fallback={null}>
            <TerminalEmulator onClose={() => setTerminalOpen(false)} />
          </Suspense>
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
