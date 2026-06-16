import { useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Download, ArrowRight, Zap } from 'lucide-react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { track } from '@/lib/analytics';

// ─── Deterministic orb positions — zero Math.random() in render ───────────────
const ORB_POSITIONS = [
  { left: '8%',  top: '18%', size: 320, delay: 0,   duration: 9  },
  { left: '70%', top: '12%', size: 280, delay: 1.5, duration: 11 },
  { left: '15%', top: '68%', size: 200, delay: 0.8, duration: 8  },
  { left: '78%', top: '62%', size: 240, delay: 2.2, duration: 10 },
  { left: '48%', top: '80%', size: 160, delay: 1.1, duration: 7  },
];

const ORB_COLORS = [
  'radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)',
  'radial-gradient(circle, rgba(196,80,26,0.15) 0%, transparent 70%)',
  'radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)',
  'radial-gradient(circle, rgba(196,80,26,0.18) 0%, transparent 70%)',
  'radial-gradient(circle, rgba(245,242,238,0.06) 0%, transparent 70%)',
];

// ─── Text reveal — character-level stagger ────────────────────────────────────
const CHAR_VARIANTS = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: 0.04 * i,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function RevealText({
  text,
  className,
  startDelay = 0,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <span className={className}>{text}</span>;

  return (
    <span className={`inline-block overflow-hidden ${className ?? ''}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + startDelay * 25}
          variants={CHAR_VARIANTS}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Magnetic button — follows cursor on hover ────────────────────────────────
function MagneticButton({
  children,
  onClick,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  }, [x, y]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

// ─── Animated counter badge ───────────────────────────────────────────────────
function CountBadge({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <span className="text-2xl md:text-3xl font-display font-bold gradient-text tabular-nums leading-none">
        {value}
      </span>
      <span className="text-xs text-muted-foreground mt-1 tracking-wide">{label}</span>
    </motion.div>
  );
}

// ─── Social links ─────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { Icon: Github,   href: 'https://github.com/enockuwumukiza',                  label: 'GitHub',   event: 'github_click'   as const },
  { Icon: Linkedin, href: 'https://linkedin.com/in/enock-uwumukiza-3086082b4', label: 'LinkedIn', event: 'linkedin_click' as const },
  { Icon: Mail,     href: 'mailto:wwwenockuwumukiza@gmail.com',                 label: 'Email',    event: 'email_click'    as const },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const prefersReduced = useReducedMotion();
  const particlesInit = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-300, 300], [4, -4]), { stiffness: 60, damping: 20 });
  const tiltY = useSpring(useTransform(mouseX, [-300, 300], [-4, 4]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (prefersReduced) return;
    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, prefersReduced]);

  // tsParticles options — amber constellation
  const particlesOptions: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: !prefersReduced, mode: ['grab', 'bubble'] },
        onClick: { enable: false },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.6 } },
        bubble: { distance: 120, size: 5, duration: 0.3, opacity: 0.8 },
      },
    },
    particles: {
      color: { value: ['#F5A623', '#C4501A', '#F5F2EE'] },
      links: {
        color: '#F5A623',
        distance: 160,
        enable: true,
        opacity: 0.12,
        width: 1,
        triangles: { enable: false },
      },
      move: {
        enable: !prefersReduced,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'bounce' },
        attract: { enable: true, rotate: { x: 600, y: 1200 } },
      },
      number: { density: { enable: true, area: 1000 }, value: 70 },
      opacity: { value: { min: 0.2, max: 0.5 }, animation: { enable: true, speed: 0.8, minimumValue: 0.1 } },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 2.5 } },
    },
    detectRetina: true,
  }), [prefersReduced]);

  const handleParticlesInit = async (engine: Engine) => {
    if (!particlesInit.current) {
      await loadSlim(engine);
      particlesInit.current = true;
    }
  };

  const handleResumeDownload = () => {
    track('resume_download');
    const link = document.createElement('a');
    link.href = '/Enock_Resume.pdf';
    link.download = 'Enock_Uwumukiza_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
      aria-label="Hero section"
    >
      {/* ── Layer 0: Particle constellation ── */}
      {!prefersReduced && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Particles
            id="hero-particles"
            init={handleParticlesInit}
            options={particlesOptions}
            className="w-full h-full"
          />
        </div>
      )}

      {/* ── Layer 1: Animated grid ── */}
      <div className="absolute inset-0 z-[1] opacity-[0.06] grid-bg animate-grid-flow" aria-hidden="true" />

      {/* ── Layer 2: Warm depth orbs ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        {ORB_POSITIONS.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.size,
              height: orb.size,
              background: ORB_COLORS[i],
              filter: 'blur(60px)',
            }}
            animate={prefersReduced ? {} : {
              y: [0, -24, 0],
              scale: [1, 1.08, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Layer 3: Central radial glow ── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, hsl(37 91% 55% / 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Layer 4: Perspective tilt wrapper ── */}
      <motion.div
        className="container mx-auto px-4 relative z-10 flex flex-col items-center"
        style={prefersReduced ? {} : { rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
      >
        {/* ── Status chip ── */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-10 mt-24 md:mt-20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs font-medium tracking-[0.22em] text-muted-foreground uppercase">
            Open to new opportunities
          </span>
          <span className="text-xs text-muted-foreground/50">·</span>
          <span className="text-xs font-medium text-primary/80 tracking-wide">Kigali, Rwanda</span>
        </motion.div>

        {/* ── Name headline ── */}
        <div className="text-center mb-6">
          <h1 className="font-display tracking-tight leading-[0.9]">
            {/* First name — gradient */}
            <span className="block text-[clamp(4rem,12vw,9rem)] font-bold gradient-text mb-1">
              <RevealText text="Enock" startDelay={0} />
            </span>
            {/* Last name — outline style for contrast */}
            <span
              className="block text-[clamp(4rem,12vw,9rem)] font-bold"
              style={{
                WebkitTextStroke: '1px hsl(var(--foreground) / 0.4)',
                color: 'transparent',
                letterSpacing: '-0.01em',
              }}
            >
              <RevealText text="Uwumukiza" startDelay={0.35} />
            </span>
          </h1>
        </div>

        {/* ── Tagline ── */}
        <motion.p
          className="text-[clamp(1.1rem,2.5vw,1.5rem)] text-foreground/90 font-light mb-3 text-center max-w-xl leading-snug tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          From Kigali, building for the world.
        </motion.p>

        {/* ── Subtitle ── */}
        <motion.p
          className="text-base md:text-lg text-muted-foreground mb-12 text-center max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          I build full-stack products and intelligent systems — from service marketplaces
          to clinical AI — that solve real problems for real people.
        </motion.p>

        {/* ── CTA pair ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          {/* Primary — See My Work */}
          <MagneticButton
            onClick={scrollToProjects}
            ariaLabel="Scroll to projects"
            className="
              group relative overflow-hidden px-8 py-4 rounded-full font-semibold
              text-primary-foreground bg-gradient-hero
              shadow-glow hover:shadow-[0_0_60px_hsl(37_91%_55%/0.6)]
              transition-shadow duration-500
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              See My Work
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 ease-out pointer-events-none"
              aria-hidden="true"
            />
          </MagneticButton>

          {/* Secondary — Download CV */}
          <MagneticButton
            onClick={handleResumeDownload}
            ariaLabel="Download resume PDF"
            className="
              group relative px-8 py-4 rounded-full font-semibold
              border border-primary/40 text-primary
              hover:bg-primary/8 hover:border-primary/70
              transition-all duration-300
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary
            "
          >
            <span className="flex items-center gap-2">
              <Download className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
              Download CV
            </span>
          </MagneticButton>
        </motion.div>

        {/* ── Social links ── */}
        <motion.div
          className="flex justify-center gap-4 mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.55, duration: 0.7 }}
        >
          {SOCIAL_LINKS.map(({ Icon, href, label, event }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              onClick={() => track(event)}
              className="
                group p-3 rounded-full text-muted-foreground hover:text-primary
                border border-border/50 hover:border-primary/50
                hover:bg-primary/8 hover:scale-110 hover:-translate-y-1
                transition-all duration-300
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary
              "
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="flex items-center justify-center gap-10 md:gap-16 mb-20 pb-4"
        >
          <CountBadge value="10+" label="Projects shipped" />
          <div className="w-px h-8 bg-border/60" aria-hidden="true" />
          <CountBadge value="3+" label="Years building" />
          <div className="w-px h-8 bg-border/60" aria-hidden="true" />
          <CountBadge value="∞" label="Problems to solve" />
        </motion.div>

        {/* ── Currently building chip ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-muted/20 mb-8"
        >
          <Zap className="h-3.5 w-3.5 text-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">
            Currently building:{' '}
            <a
              href="https://github.com/Enochrwa/HandyRwanda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              HandyRwanda
            </a>
            {' '}— Sprint 7 shipped voice messaging
          </span>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={scrollDown}
        aria-label="Scroll down to learn more"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.7 }}
      >
        <motion.span
          className="text-[10px] tracking-[0.3em] uppercase font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      {/* ── Decorative horizontal line at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--border)), transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
