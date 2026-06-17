import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Laptop, Terminal as TerminalIcon, Wrench, Cloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useLenis } from '@/hooks/useLenis';

const SETUP = [
  {
    icon: Laptop,
    title: 'Hardware',
    items: [
      { name: 'MacBook (macOS 12)', note: '16GB RAM — everything in this portfolio was built on it, no external budget for cloud dev boxes.' },
    ],
  },
  {
    icon: TerminalIcon,
    title: 'Editor & Terminal',
    items: [
      { name: 'VS Code', note: 'Primary editor — ESLint, Prettier, and Prisma extensions on by default.' },
      { name: 'iTerm2 + zsh', note: 'Daily driver shell.' },
      { name: 'Git + GitHub CLI', note: 'For everything from solo commits to managing org repos under EnochLabs.' },
    ],
  },
  {
    icon: Wrench,
    title: 'Languages & Frameworks',
    items: [
      { name: 'TypeScript / React / Next.js', note: 'Frontend default for client and personal work.' },
      { name: 'FastAPI / Node.js (Express)', note: 'Backend — FastAPI for Python/ML-heavy services, Express for lighter Node APIs like this one.' },
      { name: 'React Native (Expo)', note: 'Mobile layer for HandyRwanda and similar marketplace apps.' },
      { name: 'Python (scikit-learn, XGBoost, LightGBM, SHAP)', note: 'ML work, primarily INZIRA EDRPS.' },
      { name: 'Prisma + PostgreSQL', note: 'ORM and database of choice for new backend services.' },
    ],
  },
  {
    icon: Cloud,
    title: 'Infra & Deployment',
    items: [
      { name: 'Docker + Docker Compose', note: 'Local full-stack dev parity with Postgres and Redis.' },
      { name: 'Render', note: 'Backend hosting for most production services.' },
      { name: 'Vercel', note: 'Frontend hosting — this portfolio included.' },
      { name: 'GitHub Actions', note: 'CI for lint, type-check, and build on every push.' },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function UsesPage() {
  useLenis();

  return (
    <>
      <SEO
        title="Uses — Enock Uwumukiza"
        description="The hardware, editor, languages, and infrastructure I actually use to ship production software solo."
        url="/uses"
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
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-mono text-primary uppercase tracking-widest">
                Setup
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-5">
              Uses
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              What I actually build with — no sponsorships, no aspirational gear. Everything here
              has shipped at least one production feature.
            </p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
            {SETUP.map(({ icon: Icon, title, items }) => (
              <motion.section key={title} variants={item}>
                <div className="flex items-center gap-2.5 mb-5">
                  <Icon className="h-4 w-4 text-primary" />
                  <h2 className="text-sm font-mono uppercase tracking-widest text-primary">
                    {title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {items.map((entry) => (
                    <div
                      key={entry.name}
                      className="rounded-xl border border-border/50 bg-gradient-card p-5 hover-lift transition-all duration-300 hover:border-primary/30"
                    >
                      <h3 className="font-display font-semibold text-foreground mb-1.5">
                        {entry.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{entry.note}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center"
          >
            <Badge variant="outline" className="border-primary/30 text-primary">
              No budget, all shipped
            </Badge>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
