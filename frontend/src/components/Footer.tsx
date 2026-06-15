import { motion } from "framer-motion";
import { Heart, Code, Coffee, Terminal } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text">Portfolio</h3>
            <p className="text-muted-foreground leading-relaxed">
              Building the future, one line of code at a time. 
              Passionate about creating intelligent, beautiful, and meaningful experiences.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Projects", href: "#projects" },
                { label: "Skills", href: "#skills" },
                { label: "Experience", href: "#experience" },
                { label: "Contact", href: "#contact" }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Fun Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold">Fun Stats</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Code className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Lines of code written: 50,000+</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Coffee className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Cups of coffee consumed: ∞</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Terminal className="h-4 w-4 text-secondary" />
                <span className="text-muted-foreground">
                  Type <code className="bg-muted/20 px-1 rounded text-primary">help</code> in terminal
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>and lots of</span>
            <Coffee className="h-4 w-4 text-accent" />
            <span>By <em>Enock</em></span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Built with React, TypeScript, Tailwind CSS & ❤️
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;