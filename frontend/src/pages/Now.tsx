import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Radio, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useLenis } from '@/hooks/useLenis';

// Sprint: personal-website features — /now page
// Update this whenever focus shifts. Last touched: see `updated` below.
const NOW = {
  updated: '2026-06-17',
  location: 'Kigali, Rwanda',
  building: [
    {
      name: 'HandyRwanda',
      detail: 'Sprint 13+ — artisan earnings intelligence with sklearn forecasting and a Recharts dashboard.',
      href: 'https://github.com/Enochrwa/HandyRwanda',
    },
    {
      name: 'INZIRA EDRPS',
      detail:
        'Five-module clinical AI system (AnemIA, CardioSense, NephroCheck, GlucoSense, HepatoScan) with SHAP explainability, targeting OpenMRS/FHIR integration.',
      href: 'https://github.com/Enochrwa',
    },
    {
      name: 'BaruaDigital',
      detail:
        'Multilingual document generation platform (FastAPI + React/Vite) for English, French, and Kinyarwanda speakers, with CI/CD to Render and Vercel.',
      href: 'https://github.com/Enochrwa',
    },
  ],
  learning: [
    'Rust via NAPI-RS — replaced ffmpeg-next with symphonia in Zovyra for zero-dependency audio decoding.',
    'Turborepo + Webpack Module Federation for micro-frontend decomposition.',
    'WebGPU fundamentals — early exploration, nothing shipped yet.',
  ],
  reading: [
    'Clinical AI papers on explainability (SHAP) for low-resource healthcare settings.',
    'OpenMRS/FHIR integration guides for the INZIRA EDRPS pipeline.',
  ],
  watching: [
    'Wuxia and xianxia dramas — mostly for the choreography and pacing, occasionally for plot inspiration in app onboarding flows (sounds unlikely, but pacing is pacing).',
  ],
  availability:
    'Open to remote, contract, or full-time roles. Based in Kigali (CAT, UTC+2) — happy to overlap with US/EU hours.',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section variants={item} className="mb-12">
      <h2 className="text-sm font-mono uppercase tracking-widest text-primary mb-5">{title}</h2>
      {children}
    </motion.section>
  );
}

export default function NowPage() {
  useLenis();
  const updatedLabel = new Date(NOW.updated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <SEO
        title="Now — Enock Uwumukiza"
        description="What I'm building, learning, and focused on right now. Updated regularly."
        url="/now"
      />
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-32 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Radio className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-mono text-primary uppercase tracking-widest">
                Status
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-5">
              Now
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-4">
              A snapshot of what I'm actually spending time on — not a highlight reel. Inspired by
              the{' '}
              <a
                href="https://nownownow.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                /now page movement
              </a>
              .
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Last updated {updatedLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {NOW.location}
              </span>
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show">
            <Section title="Building">
              <div className="space-y-5">
                {NOW.building.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-border/50 bg-gradient-card p-5 hover-lift transition-all duration-300 hover:border-primary/30 group"
                  >
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                      {p.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
                  </a>
                ))}
              </div>
            </Section>

            <Section title="Learning">
              <ul className="space-y-3">
                {NOW.learning.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 flex-shrink-0">→</span>
                    {line}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Reading">
              <ul className="space-y-3">
                {NOW.reading.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 flex-shrink-0">→</span>
                    {line}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Watching">
              <ul className="space-y-3">
                {NOW.watching.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 flex-shrink-0">→</span>
                    {line}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Availability">
              <div className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-5">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block mr-2" />
                  Open
                </Badge>
                <p className="text-sm text-muted-foreground leading-relaxed">{NOW.availability}</p>
              </div>
            </Section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
