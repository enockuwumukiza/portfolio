import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, PanInfo } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Download, Terminal, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const TerminalEmulator = lazy(() => import('./TerminalEmulator'));

const NAV_ITEMS = [
  { name: 'About', href: '#about', external: false },
  { name: 'Projects', href: '#projects', external: false },
  { name: 'Skills', href: '#skills', external: false },
  { name: 'Experience', href: '#experience', external: false },
  { name: 'Blog', href: '/blog', external: true },
  { name: 'Contact', href: '#contact', external: false },
];

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'contact'];

// ─── Lightweight theme hook ───────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, toggle };
}

// ─── Active section via IntersectionObserver ──────────────────────────────────
function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero');
  const ratioMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ratioMap.current.set(id, entry.intersectionRatio);
          } else {
            ratioMap.current.delete(id);
          }
          let best = 'hero';
          let bestRatio = 0;
          ratioMap.current.forEach((ratio, sid) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sid;
            }
          });
          setActiveSection(best);
        },
        { threshold: [0.15, 0.35, 0.5], rootMargin: '-80px 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return activeSection;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const activeSection = useActiveSection();

  const { scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setIsMobileOpen(false);
      const id = href.replace('#', '');
      setTimeout(
        () => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        },
        isMobileOpen ? 350 : 0
      );
    },
    [isMobileOpen]
  );

  // Swipe-down or swipe-left to close mobile menu
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 80 || info.offset.x < -80) {
      setIsMobileOpen(false);
    }
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left"
        style={{ scaleX: progressScaleX, background: 'var(--gradient-accent)' }}
        aria-hidden="true"
      />

      {/* ── Main nav ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-[2px] left-0 right-0 z-[60] transition-all duration-400 ${
          isScrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_20px_hsl(30_40%_4%/0.4)]'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[64px]">
            {/* ── Logo ── */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="text-xl font-display font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded select-none"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Enock Uwumukiza — scroll to top"
            >
              <span className="gradient-text">EU</span>
              <motion.span
                className="text-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                .
              </motion.span>
            </motion.a>

            {/* ── Desktop nav ── */}
            <div className="hidden md:flex items-center gap-1" role="list">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                const sharedClass = `relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary`;
                const colorStyle = {
                  color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                };
                const inner = (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute bottom-0.5 left-4 right-4 h-[2px] rounded-full"
                        style={{ background: 'var(--gradient-accent)' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </>
                );
                if (item.external) {
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      role="listitem"
                      className={sharedClass}
                      style={colorStyle}
                    >
                      {inner}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    role="listitem"
                    className={sharedClass}
                    style={colorStyle}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {inner}
                  </a>
                );
              })}
            </div>

            {/* ── Desktop actions ── */}
            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="text-muted-foreground hover:text-primary hover:bg-primary/8 rounded-full"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.div>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTerminal(true)}
                className="text-muted-foreground hover:text-primary hover:bg-primary/8 font-mono text-xs"
                aria-label="Open terminal easter egg (Ctrl+`)"
              >
                <Terminal className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden lg:inline">_terminal</span>
              </Button>

              <a
                href="/Enock_Resume.pdf"
                download="Enock_Uwumukiza_Resume.pdf"
                aria-label="Download Enock's resume PDF"
              >
                <Button
                  size="sm"
                  className="ml-1 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full font-medium"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  Resume
                </Button>
              </a>
            </div>

            {/* ── Mobile: theme + hamburger ── */}
            <div className="md:hidden flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="text-muted-foreground rounded-full"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen((v) => !v)}
                aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-nav"
                className="text-foreground rounded-full"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen overlay — swipe down or left to dismiss ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-nav"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[50] bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center touch-none"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {/* Swipe hint */}
            <motion.div
              className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border/60"
              aria-hidden="true"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Amber blob */}
            <div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, hsl(37 91% 55% / 0.08) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              aria-hidden="true"
            />

            <nav className="relative flex flex-col items-center gap-1 w-full max-w-xs px-6">
              {NAV_ITEMS.map((item, i) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                const sharedClass = `w-full text-center py-4 text-3xl font-display font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded-lg ${
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                }`;
                const inner = (
                  <span className="relative">
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="mobile-active-dot"
                        className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </span>
                );
                if (item.external) {
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.06 * i + 0.1,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="w-full"
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={sharedClass}
                      >
                        {inner}
                      </Link>
                    </motion.div>
                  );
                }
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={sharedClass}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {inner}
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="flex gap-3 mt-8 pt-6 border-t border-border/30 w-full justify-center"
              >
                <a href="/Enock_Resume.pdf" download="Enock_Uwumukiza_Resume.pdf">
                  <Button
                    size="sm"
                    className="bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground rounded-full"
                  >
                    <Download className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    Resume
                  </Button>
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsMobileOpen(false);
                    setTimeout(() => setShowTerminal(true), 350);
                  }}
                  className="text-muted-foreground hover:text-primary rounded-full"
                >
                  <Terminal className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  Terminal
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Terminal easter egg ── */}
      <AnimatePresence>
        {showTerminal && (
          <Suspense fallback={null}>
            <TerminalEmulator onClose={() => setShowTerminal(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
