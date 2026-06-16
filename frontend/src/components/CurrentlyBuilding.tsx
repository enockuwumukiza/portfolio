import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, X, Zap } from 'lucide-react';

const BUILDS = [
  {
    label: 'HandyRwanda',
    detail: 'Sprint 10 — artisan skill verification videos',
    href: 'https://github.com/Enochrwa/HandyRwanda',
  },
  {
    label: 'SOMA Connect',
    detail: 'MTN MoMo payments + Rwanda data compliance',
    href: 'https://github.com/enockuwumukiza',
  },
];

const STORAGE_KEY = 'portfolio_currently_building_dismissed';

export default function CurrentlyBuilding() {
  const [dismissed, setDismissed] = useState<boolean>(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });
  const [buildIdx, setBuildIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setBuildIdx(i => (i + 1) % BUILDS.length), 4000);
    return () => clearInterval(id);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(STORAGE_KEY, 'true'); } catch {}
  };

  const build = BUILDS[buildIdx];

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[60] bg-primary/95 backdrop-blur-sm text-primary-foreground px-4 py-1.5"
        >
          <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <Zap className="h-3.5 w-3.5 flex-shrink-0 animate-pulse" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={buildIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-xs font-medium truncate"
                >
                  <span className="font-semibold hidden sm:inline">Currently building:</span>
                  <span className="font-semibold sm:font-normal">{build.label}</span>
                  <span className="text-primary-foreground/70 hidden md:inline">— {build.detail}</span>
                  <a
                    href={build.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 underline underline-offset-2 hover:no-underline flex-shrink-0"
                  >
                    <Github className="h-3 w-3" />
                    <span className="hidden sm:inline">View on GitHub</span>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={dismiss}
              className="flex-shrink-0 p-1 rounded hover:bg-primary-foreground/20 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
