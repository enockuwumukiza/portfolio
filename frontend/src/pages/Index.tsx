import { useState, useCallback } from 'react';
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
import { useLenis } from '@/hooks/useLenis';

function PortfolioContent() {
  useLenis();

  return (
    <div className="min-h-screen bg-background">
      <SEO />
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
