import { useEffect, useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';

// Deterministic orb positions — no Math.random() in render
const ORB_POSITIONS = [
  { left: '10%', top: '20%', size: 80, delay: 0, duration: 6 },
  { left: '22%', top: '65%', size: 60, delay: 1, duration: 7 },
  { left: '38%', top: '15%', size: 70, delay: 0.5, duration: 5 },
  { left: '55%', top: '75%', size: 90, delay: 1.5, duration: 8 },
  { left: '68%', top: '30%', size: 55, delay: 2, duration: 6 },
  { left: '80%', top: '55%', size: 75, delay: 0.8, duration: 7 },
  { left: '90%', top: '20%', size: 65, delay: 1.2, duration: 5 },
  { left: '5%', top: '80%',  size: 50, delay: 2.5, duration: 9 },
];

const ORB_COLORS = [
  'rgba(245, 166, 35, 0.25)',
  'rgba(196, 80, 26, 0.2)',
  'rgba(245, 242, 238, 0.1)',
  'rgba(245, 166, 35, 0.15)',
  'rgba(196, 80, 26, 0.25)',
  'rgba(245, 166, 35, 0.2)',
  'rgba(245, 242, 238, 0.08)',
  'rgba(196, 80, 26, 0.15)',
];

// Text reveal animation — characters stagger
const CHAR_VARIANTS = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { delay: 0.05 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

function RevealText({ text, className, startDelay = 0 }: { text: string; className?: string; startDelay?: number }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <span className={className}>{text}</span>;
  return (
    <span className={`inline-block overflow-hidden ${className ?? ''}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i + startDelay * 20}
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

const SOCIAL_LINKS = [
  { Icon: Github,   href: 'https://github.com/enockuwumukiza',                     label: 'GitHub',   event: 'github_click'   },
  { Icon: Linkedin, href: 'https://linkedin.com/in/enock-uwumukiza-3086082b4',     label: 'LinkedIn', event: 'linkedin_click' },
  { Icon: Mail,     href: 'mailto:wwwenockuwumukiza@gmail.com',                    label: 'Email',    event: 'email_click'    },
];

const Hero = () => {
  const prefersReduced = useReducedMotion();
  const particlesInit = useRef(false);

  const particlesOptions: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: !prefersReduced, mode: 'grab' },
        onClick: { enable: false },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } },
      },
    },
    particles: {
      color: { value: '#F5A623' },
      links: {
        color: '#F5A623',
        distance: 150,
        enable: true,
        opacity: 0.15,
        width: 1,
      },
      move: {
        enable: !prefersReduced,
        speed: 0.6,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'bounce' },
      },
      number: { density: { enable: true }, value: 60 },
      opacity: { value: 0.4 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }), [prefersReduced]);

  const handleParticlesInit = async (engine: Engine) => {
    if (!particlesInit.current) {
      await loadSlim(engine);
      particlesInit.current = true;
    }
  };

  // Track resume download
  const handleResumeDownload = () => {
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
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Particle constellation */}
      {!prefersReduced && (
        <div className="absolute inset-0 z-0">
          <Particles
            id="hero-particles"
            init={handleParticlesInit}
            options={particlesOptions}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Animated grid background */}
      <div
        className="absolute inset-0 z-0 opacity-20 grid-bg animate-grid-flow"
        aria-hidden="true"
      />

      {/* Deterministic warm orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {ORB_POSITIONS.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${ORB_COLORS[i]} 0%, transparent 70%)`,
            }}
            animate={prefersReduced ? {} : {
              y: [0, -18, 0],
              opacity: [0.6, 1, 0.6],
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

      {/* Radial glow at center */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'var(--gradient-glow)' }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">

          {/* Eyebrow */}
          <motion.p
            className="text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Full-Stack Developer · ML Engineer · Kigali, Rwanda
          </motion.p>

          {/* Name — text-reveal */}
          <div className="mb-6">
            <h1 className="font-display leading-none tracking-tight">
              <span className="block text-4xl sm:text-7xl md:text-8xl font-bold gradient-text mb-2">
                <RevealText text="Enock" startDelay={0} />
              </span>
              <span className="block text-4xl sm:text-7xl md:text-8xl font-bold text-foreground">
                <RevealText text="Uwumukiza" startDelay={0.3} />
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-4 font-light max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            From Kigali, building for the world.
          </motion.p>

          {/* Subtitle — no clichés */}
          <motion.p
            className="text-base md:text-lg text-muted-foreground/80 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            I build full-stack products and intelligent systems — from service marketplaces
            to clinical AI — that solve real problems for real people.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <button
              onClick={scrollToProjects}
              className="
                relative overflow-hidden px-8 py-4 rounded-full font-semibold text-primary-foreground
                bg-gradient-hero hover:opacity-90
                transform hover:scale-105 transition-all duration-300
                shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary
              "
            >
              See My Work
            </button>

            <button
              onClick={handleResumeDownload}
              className="
                relative px-8 py-4 rounded-full font-semibold
                border border-primary/40 text-primary
                hover:bg-primary/10 transform hover:scale-105 transition-all duration-300
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary
              "
            >
              <Download className="inline mr-2 h-4 w-4" />
              Download CV
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex justify-center gap-6 mb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}
          >
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="
                  p-3 rounded-full text-muted-foreground hover:text-primary
                  border border-border hover:border-primary/40
                  hover:bg-primary/10 hover:scale-110
                  transition-all duration-300
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary
                "
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>

          {/* Scroll indicator — single elegant arrow */}
          <motion.button
            onClick={scrollDown}
            aria-label="Scroll down"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
