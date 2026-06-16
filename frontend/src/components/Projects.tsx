import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Github, Brain, Zap, Globe, Layers } from 'lucide-react';
import { track } from '@/lib/analytics';
import wardrobeImage from '../../public/images/wardrobe.jpeg';
import chatImage from '../../public/images/chat.png';
import resumeImage from '../../public/images/resume.jpeg';

interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  image: string;
  tech: string[];
  category: string;
  icon: React.ElementType;
  features: string[];
  demo: string | null;
  github: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'HandyRwanda',
    description:
      'A full-stack service marketplace connecting artisans and clients across Rwanda — with payments, real-time messaging, and GPS-based matching.',
    problem: 'Rwanda has thousands of skilled artisans with no digital presence, making it hard for clients to find and trust local services.',
    solution:
      'Built a full-stack marketplace with MTN MoMo/Airtel Money payments, Socket.IO real-time messaging, Expo push notifications, and Rwanda address hierarchy (Province→Village).',
    outcome:
      'Sprint 7 shipped: ML earnings forecasting dashboard, FastAPI backend, React Native mobile app with offline support.',
    image: wardrobeImage,
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Socket.IO', 'Expo', 'sklearn'],
    category: 'Full-Stack',
    icon: Layers,
    features: ['MTN MoMo / Airtel Money payments', 'Real-time chat (Socket.IO)', 'ML earnings forecasting'],
    demo: null,
    github: 'https://github.com/Enochrwa/HandyRwanda',
    featured: true,
  },
  {
    title: 'AI-Powered Digital Wardrobe',
    description:
      'AI wardrobe management system with outfit matching, background removal, and smart recommendations.',
    problem: 'People forget what clothing they own and struggle to build cohesive outfits.',
    solution: 'Built a computer vision pipeline (TensorFlow + sklearn) for clothing type detection and outfit scoring with background removal.',
    outcome: 'Fully functional MVP with real-time outfit recommendations, running locally without cloud GPU.',
    image: wardrobeImage,
    tech: ['React', 'TypeScript', 'Python', 'TensorFlow', 'sklearn', 'MySQL'],
    category: 'ML/AI',
    icon: Brain,
    features: ['Outfit type detection', 'Background removal', 'Real-time recommendations'],
    demo: null,
    github: 'https://github.com/Enochrwa/myward',
  },
  {
    title: 'Resume Builder',
    description:
      'Simplified resume builder with professional templates, dynamic pricing, and one-click PDF export.',
    problem: 'Most resume builders are either too complex or too limited for developers and students.',
    solution: 'Built with Next.js + Redis for fast template rendering, with dynamic pricing tiers and smart export.',
    outcome: 'Live on Vercel with steady organic traffic from shared links.',
    image: resumeImage,
    tech: ['Next.js', 'Node.js', 'Redis', 'React'],
    category: 'Full-Stack',
    icon: Zap,
    features: ['Built-in templates', 'Dynamic pricing', 'Smart PDF export'],
    demo: 'https://resumeforge-five.vercel.app',
    github: 'https://github.com/Enochrwa/resumee-craft-studio',
  },
  {
    title: 'Real-Time Chat Application',
    description:
      'Modern team collaboration platform with live video/audio calls, voice recording, and smart notifications.',
    problem: 'Existing tools are either too heavy (Slack/Teams) or too limited for self-hosted deployments.',
    solution: 'Built on Socket.IO with WebRTC for peer-to-peer video/audio, MongoDB for message persistence, Docker for self-hosting.',
    outcome: 'Full real-time chat with video/audio recording, notification system, and Docker Compose one-command deploy.',
    image: chatImage,
    tech: ['React', 'Socket.IO', 'MongoDB', 'Express', 'Docker', 'WebRTC'],
    category: 'Real-Time',
    icon: Globe,
    features: ['Live video & audio calls', 'Voice recording', 'Smart notifications'],
    demo: null,
    github: 'https://github.com/enockuwumukiza/e-chat',
  },
];

const FILTERS = ['All', 'Full-Stack', 'ML/AI', 'Real-Time'] as const;
type Filter = (typeof FILTERS)[number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDemoClick = () => {
    if (!project.demo) return;
    track('project_click', { project: project.title, type: 'demo' });
  };

  const handleGithubClick = () => {
    track('project_click', { project: project.title, type: 'github' });
  };

  return (
    <motion.div key={project.title} variants={itemVariants}>
      <Card className="bg-gradient-card border-border/50 hover-lift group h-full flex flex-col">
        <CardHeader className="space-y-4 pb-4">
          {/* Meta row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <project.icon className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                {project.category}
              </Badge>
            </div>
            {project.featured && (
              <Badge className="text-xs bg-primary/20 text-primary border-primary/40">
                Featured
              </Badge>
            )}
          </div>

          {/* Image */}
          <div className="aspect-video rounded-lg bg-muted/20 border border-border/50 overflow-hidden relative">
            {!imageLoaded && (
              <Skeleton className="absolute inset-0 rounded-lg" />
            )}
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 flex-1 flex flex-col">
          {/* Features */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Highlights
            </h4>
            <ul className="space-y-1.5">
              {project.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Case study expand */}
          <div>
            <button
              onClick={() => setExpanded(v => !v)}
              className="text-xs font-medium text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
              aria-expanded={expanded}
            >
              {expanded ? '▴ Hide case study' : '▾ View case study'}
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground border-l-2 border-primary/30 pl-3">
                    <p><span className="font-semibold text-foreground">Problem:</span> {project.problem}</p>
                    <p><span className="font-semibold text-foreground">Solution:</span> {project.solution}</p>
                    <p><span className="font-semibold text-foreground">Outcome:</span> {project.outcome}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tech */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map(t => (
                <Badge key={t} variant="secondary" className="text-xs bg-muted/30 text-foreground border-border/40">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions — pushed to bottom */}
          <div className="flex gap-2 pt-2 mt-auto">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDemoClick}
                className="flex-1"
              >
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
              </a>
            ) : (
              <Button size="sm" disabled className="flex-1 opacity-50 cursor-not-allowed" aria-label="Demo not available">
                Demo TBD
              </Button>
            )}

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGithubClick}
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Button variant="outline" size="sm" className="border-border/50 hover:bg-muted/20">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered = PROJECTS.filter(
    p => activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-5">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each project is a real problem solved. Click "View case study" for the full story.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Project category filter">
          {FILTERS.map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                activeFilter === f
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground border border-border/50 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/enockuwumukiza"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View all projects on GitHub"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10 hover-lift"
            >
              <Github className="mr-2 h-5 w-5" />
              All Projects on GitHub
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
