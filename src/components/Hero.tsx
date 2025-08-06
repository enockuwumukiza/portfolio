import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-glow animate-pulse-slow opacity-30" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Name and Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-2 font-light tracking-wide">
              Hello, I'm
            </h2>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 gradient-text animate-glow leading-tight">
              ENOCK UWUMUKIZA
            </h1>
            <div className="text-2xl md:text-4xl font-semibold text-foreground/90 mb-6">
              <span className="text-primary">Full-Stack Developer</span>
              <span className="text-muted-foreground mx-3">•</span>
              <span className="text-accent">ML Engineer</span>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Crafting intelligent web experiences with modern technologies, specializing in{" "}
            <span className="text-primary font-semibold">React</span>,{" "}
            <span className="text-secondary font-semibold">Node.js</span>, and{" "}
            <span className="text-accent font-semibold">Machine Learning</span>
          </motion.p>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-muted/20 border border-border rounded-full text-sm font-medium glass-effect hover-lift"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button 
              size="lg" 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-hero hover:opacity-90 transition-all duration-300 shadow-glow hover-lift group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Mail className="mr-2 h-5 w-5 relative z-10" />
              <span className="relative z-10">Let's Collaborate</span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                // Add resume download functionality
                const link = document.createElement('a');
                link.href = '/resume.pdf'; // You'll need to add this file
                link.download = 'Enock_Uwumukiza_Resume.pdf';
                link.click();
              }}
              className="border-primary/50 text-primary hover:bg-primary/10 hover-lift group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Download className="mr-2 h-5 w-5 relative z-10 group-hover:animate-bounce" />
              <span className="relative z-10">Download Resume</span>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center space-x-4 sm:space-x-6 mb-16"
          >
            {[
              { Icon: Github, href: "https://github.com/enockuwumukiza", label: "GitHub" },
              { Icon: Linkedin, href: "https://linkedin.com/in/enockuwumukiza", label: "LinkedIn" },
              { Icon: Mail, href: "mailto:enock@uwumukiza.dev", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 sm:p-4 rounded-full bg-muted/20 border border-border glass-effect hover-lift group transition-all duration-300 relative overflow-hidden"
                aria-label={label}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="h-8 w-8 text-muted-foreground animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;