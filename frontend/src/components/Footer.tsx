import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Code, Coffee, Terminal, Github, Linkedin, Twitter, Mail, Download, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { track } from '@/lib/analytics';

const QUICK_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

const SOCIAL = [
  { Icon: Github,   href: 'https://github.com/enockuwumukiza',                  label: 'GitHub',   event: 'github_click'   as const },
  { Icon: Linkedin, href: 'https://linkedin.com/in/enock-uwumukiza-3086082b4',  label: 'LinkedIn', event: 'linkedin_click' as const },
  { Icon: Twitter,  href: 'https://twitter.com/enochrw7',                       label: 'Twitter',  event: 'github_click'   as const },
  { Icon: Mail,     href: 'mailto:wwwenockuwumukiza@gmail.com',                 label: 'Email',    event: 'email_click'    as const },
];

function KigaliClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Kigali',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date()));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-primary tabular-nums">
      <Clock className="h-3.5 w-3.5" />
      {time || '--:--:--'} CAT
    </span>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();
  const OPEN_TO_WORK = true; // toggle this when not available

  return (
    <footer className="bg-background border-t border-border/50 px-4">
      {/* Full-width CTA */}
      <div className="border-b border-border/50">
        <div className="container mx-auto max-w-6xl py-16 text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold gradient-text"
          >
            Let's build something together.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Whether it's a product, a contract role, or just a good technical conversation — I'm reachable.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#contact">
              <Button className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow">
                Get in Touch
              </Button>
            </a>
            <a
              href="/Enock_Resume.pdf"
              download
              onClick={() => track('resume_download', { context: 'footer' })}
            >
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </a>
            {OPEN_TO_WORK && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block mr-2" />
                Open to Opportunities
              </Badge>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container mx-auto max-w-6xl py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-display font-bold gradient-text">EU.</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-Stack Developer & ML Engineer from Kigali, Rwanda. Building for the world, one sprint at a time.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Kigali, Rwanda 🇷🇼 ·{' '}
              <KigaliClock />
            </div>
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, href, label, event }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  onClick={() => track(event, { context: 'footer' })}
                  className="p-2 rounded-full text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/40 transition-all duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Navigation</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {QUICK_LINKS.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/Enock_Resume.pdf"
                    download
                    onClick={() => track('resume_download', { context: 'footer_nav' })}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                  >
                    Resume ↓
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>

          {/* Fun stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Fun Facts</h4>
            <div className="space-y-3">
              {[
                { Icon: Code,     text: '50,000+ lines of code shipped' },
                { Icon: Coffee,   text: 'Powered by Rwandan coffee ☕' },
                { Icon: Terminal, text: 'Try Ctrl+` for a terminal 👀' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-1.5">
            © {year} Enock Uwumukiza · Designed & built with
            <Heart className="h-3.5 w-3.5 text-red-500 animate-pulse" aria-hidden="true" />
            in Kigali
          </div>
          <a
            href="https://github.com/enockuwumukiza/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            React · TypeScript · Tailwind · Framer Motion
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
