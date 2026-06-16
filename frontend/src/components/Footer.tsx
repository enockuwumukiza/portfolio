import { motion } from 'framer-motion';
import { Heart, Code, Coffee, Terminal, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

const SOCIAL = [
  { Icon: Github,   href: 'https://github.com/enockuwumukiza',                  label: 'GitHub'   },
  { Icon: Linkedin, href: 'https://linkedin.com/in/enock-uwumukiza-3086082b4',  label: 'LinkedIn' },
  { Icon: Twitter,  href: 'https://twitter.com/enochrw7',                       label: 'Twitter'  },
  { Icon: Mail,     href: 'mailto:wwwenockuwumukiza@gmail.com',                 label: 'Email'    },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 py-14 px-4">
      <div className="container mx-auto max-w-6xl">
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
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-2 rounded-full text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/40 transition-all duration-200 hover:scale-110"
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
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Did You Know?</h4>
            <div className="space-y-3">
              {[
                { Icon: Code,     text: '50,000+ lines shipped' },
                { Icon: Coffee,   text: 'Fuelled by Rwandan coffee ☕' },
                { Icon: Terminal, text: 'Try typing "help" in the terminal' },
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
            © {year} Enock Uwumukiza · Made with
            <Heart className="h-3.5 w-3.5 text-red-500 animate-pulse" aria-hidden="true" />
            in Kigali
          </div>
          <div>React · TypeScript · Tailwind · Framer Motion</div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
