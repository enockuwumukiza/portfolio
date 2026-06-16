import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, X, Zap, GitBranch } from 'lucide-react';

const BUILDS = [
  {
    label: 'HandyRwanda',
    detail: 'Sprint 10 — artisan skill verification videos',
    href: 'https://github.com/Enochrwa/HandyRwanda',
    sprint: 'Sprint 10',
    color: 'from-primary/90 to-accent/90',
  },
  {
    label: 'SOMA Connect',
    detail: 'MTN MoMo payments + Rwanda data compliance',
    href: 'https://github.com/enockuwumukiza',
    sprint: 'Active',
    color: 'from-accent/90 to-primary/80',
  },
];

const STORAGE_KEY = 'portfolio_currently_building_dismissed_v2';

export default function CurrentlyBuilding() {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });
  const [buildIdx, setBuildIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const id = setInterval(() => setBuildIdx((i) => (i + 1) % BUILDS.length), 4500);
    return () => clearInterval(id);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch { /* storage unavailable */ }
  };

  const build = BUILDS[buildIdx];

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r ${build.color} backdrop-blur-sm text-primary-foreground`}
          style={{ background: 'hsl(var(--primary) / 0.95)' }}
        >
          <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4 px-4 py-2">
            {/* Left: icon + content */}
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider opacity-75 hidden sm:flex">
                <Zap className="h-3 w-3 animate-pulse" />
                Building
              </span>

              <span className="hidden sm:block w-px h-3.5 bg-primary-foreground/30 flex-shrink-0" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={buildIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="flex items-center gap-2 text-sm font-medium min-w-0"
                >
                  <span className="font-bold text-primary-foreground">{build.label}</span>
                  <span className="flex items-center gap-1 text-primary-foreground/70 text-xs hidden md:flex flex-shrink-0">
                    <GitBranch className="h-3 w-3" />
                    {build.sprint}
                  </span>
                  <span className="text-primary-foreground/60 hidden lg:inline text-xs">
                    — {build.detail}
                  </span>
                </motion.div>
              </AnimatePresence>

              <a
                href={build.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-primary-foreground/80 hover:text-primary-foreground underline-offset-2 hover:underline flex-shrink-0 transition-colors ml-1"
                aria-label={`View ${build.label} on GitHub`}
              >
                <Github className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>

            {/* Right: dot indicators + close */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Pagination dots */}
              <div className="hidden sm:flex items-center gap-1" aria-hidden="true">
                {BUILDS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setBuildIdx(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === buildIdx ? 'bg-primary-foreground w-4' : 'bg-primary-foreground/40'
                    }`}
                    aria-label={`Show build ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={dismiss}
                className="p-1 rounded hover:bg-primary-foreground/15 transition-colors flex-shrink-0"
                aria-label="Dismiss currently building banner"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
