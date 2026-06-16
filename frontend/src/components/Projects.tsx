import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Github, Brain, Zap, Globe, Layers, Smartphone, RefreshCw } from 'lucide-react';
import { track } from '@/lib/analytics';
import wardrobeImage from '../../public/images/wardrobe.webp';
import chatImage from '../../public/images/chat.webp';
import resumeImage from '../../public/images/resume.webp';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

interface Project {
  slug?: string;
  title: string;
  description: string;
  tagline?: string;
  problem: string;
  solution: string;
  outcome: string;
  image?: string;
  imageUrl?: string;
  tech: string[];
  category: string;
  icon?: React.ElementType;
  features: string[];
  demo?: string | null;
  demoUrl?: string | null;
  github?: string;
  githubUrl?: string;
  featured?: boolean;
  year?: number;
}

// Fallback data (used when API is unreachable)
const FALLBACK_PROJECTS: Project[] = [
  {
    slug: 'handyrwanda',
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
    slug: 'ai-digital-wardrobe',
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
    slug: 'resume-builder',
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
    slug: 'echat',
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

const ICON_MAP: Record<string, React.ElementType> = {
  ml: Brain,
  fullstack: Layers,
  realtime: Globe,
  mobile: Smartphone,
  'Full-Stack': Layers,
  'ML/AI': Brain,
  'Real-Time': Globe,
  Mobile: Smartphone,
};

function normalizeProject(p: Project): Project & { resolvedImage: string; resolvedDemo: string | null; resolvedGithub: string; resolvedCategory: string } {
  const categoryMap: Record<string, string> = { ml: 'ML/AI', fullstack: 'Full-Stack', realtime: 'Real-Time', mobile: 'Mobile' };
  const rawCategory = p.category ?? 'Full-Stack';
  const resolvedCategory = categoryMap[rawCategory] ?? rawCategory;
  return {
    ...p,
    resolvedImage: p.image ?? p.imageUrl ?? wardrobeImage,
    resolvedDemo: p.demo ?? p.demoUrl ?? null,
    resolvedGithub: p.github ?? p.githubUrl ?? '#',
    resolvedCategory,
    icon: p.icon ?? ICON_MAP[rawCategory] ?? ICON_MAP[resolvedCategory] ?? Layers,
  };
}

const FILTERS = ['All', 'Full-Stack', 'ML/AI', 'Real-Time', 'Mobile'] as const;
type Filter = (typeof FILTERS)[number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function SkeletonCard() {
  return (
    <Card className="bg-gradient-card border-border/50 h-full">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-24 rounded-lg" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="aspect-video rounded-lg w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-3 w-full" />)}
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

// Featured project hero card — full-width treatment
function FeaturedProjectCard({ project }: { project: ReturnType<typeof normalizeProject> }) {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const Icon = project.icon ?? Layers;

  return (
    <motion.div
      variants={itemVariants}
      className="col-span-full mb-4"
    >
      <Card className="bg-gradient-card border-primary/30 border-2 hover-lift group relative overflow-hidden">
        {/* Gold accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="aspect-video md:aspect-auto md:min-h-[280px] bg-muted/20 overflow-hidden relative">
            {!imageLoaded && <Skeleton className="absolute inset-0" />}
            <img
              src={project.resolvedImage}
              alt={`Screenshot of ${project.title}`}
              width={600}
              height={400}
              loading="eager"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60 hidden md:block" />
          </div>
          {/* Content */}
          <CardContent className="p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/40 text-xs">⭐ Featured Project</Badge>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary">{project.resolvedCategory}</Badge>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors mb-1">{project.title}</h3>
                {project.tagline && <p className="text-sm text-primary/70 font-medium mb-2">{project.tagline}</p>}
                <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
              </div>
              <ul className="space-y-1.5">
                {project.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {/* Case study */}
              <div>
                <button
                  onClick={() => setExpanded(v => !v)}
                  className="text-xs font-medium text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded"
                  aria-expanded={expanded}
                >
                  {expanded ? '▴ Hide case study' : '▾ Read case study'}
                </button>
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
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
            </div>
            <div className="space-y-3 pt-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <Badge key={t} variant="secondary" className="text-xs bg-muted/30 text-foreground border-border/40">{t}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                {project.resolvedDemo ? (
                  <a
                    href={project.resolvedDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('project_click', { project: project.title, type: 'demo' })}
                    className="flex-1"
                  >
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  </a>
                ) : (
                  <Button size="sm" disabled className="flex-1 opacity-40 cursor-not-allowed">Demo Coming Soon</Button>
                )}
                <a
                  href={project.resolvedGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('project_click', { project: project.title, type: 'github' })}
                  aria-label={`View ${project.title} source on GitHub`}
                >
                  <Button variant="outline" size="sm" className="border-border/50 hover:bg-muted/20">
                    <Github className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: ReturnType<typeof normalizeProject> }) {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const Icon = project.icon ?? Layers;

  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-gradient-card border-border/50 hover-lift group h-full flex flex-col">
        <CardHeader className="space-y-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs border-primary/30 text-primary">{project.resolvedCategory}</Badge>
            </div>
            {project.year && <span className="text-xs text-muted-foreground font-mono">{project.year}</span>}
          </div>
          <div className="aspect-video rounded-lg bg-muted/20 border border-border/50 overflow-hidden relative">
            {!imageLoaded && <Skeleton className="absolute inset-0 rounded-lg" />}
            <img
              src={project.resolvedImage}
              alt={`Screenshot of ${project.title}`}
              width={400}
              height={225}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 flex-1 flex flex-col">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Highlights</h4>
            <ul className="space-y-1.5">
              {project.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
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
          <div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map(t => (
                <Badge key={t} variant="secondary" className="text-xs bg-muted/30 text-foreground border-border/40">{t}</Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2 mt-auto">
            {project.resolvedDemo ? (
              <a
                href={project.resolvedDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('project_click', { project: project.title, type: 'demo' })}
                className="flex-1"
              >
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Button>
              </a>
            ) : (
              <Button size="sm" disabled className="flex-1 opacity-40 cursor-not-allowed" aria-label="Demo not yet available">
                Demo TBD
              </Button>
            )}
            <a
              href={project.resolvedGithub}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('project_click', { project: project.title, type: 'github' })}
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

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  // Backend wraps in { success, data } or returns array directly
  return Array.isArray(json) ? json : json.data ?? json.projects ?? [];
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const { data: apiProjects, isLoading, isError, refetch } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const rawProjects = isError || !apiProjects?.length ? FALLBACK_PROJECTS : apiProjects;
  const normalized = rawProjects.map(normalizeProject);

  const featuredProject = normalized.find(p => p.featured);
  const nonFeatured = normalized.filter(p => !p.featured);

  // Available filters based on actual data
  const availableCategories = new Set(normalized.map(p => p.resolvedCategory));
  const visibleFilters = FILTERS.filter(f => f === 'All' || availableCategories.has(f));

  const filteredNonFeatured = nonFeatured.filter(
    p => activeFilter === 'All' || p.resolvedCategory === activeFilter
  );
  const showFeatured = activeFilter === 'All' || (featuredProject && featuredProject.resolvedCategory === activeFilter);

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
          {isError && (
            <p className="text-xs text-muted-foreground/60 mt-3 flex items-center justify-center gap-2">
              Showing local data.{' '}
              <button onClick={() => refetch()} className="text-primary underline inline-flex items-center gap-1 hover:no-underline">
                <RefreshCw className="h-3 w-3" /> Retry
              </button>
            </p>
          )}
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Project category filter">
          {visibleFilters.map(f => (
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
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {showFeatured && featuredProject && (
                <FeaturedProjectCard project={featuredProject} />
              )}
              {filteredNonFeatured.map(project => (
                <ProjectCard key={project.slug ?? project.title} project={project} />
              ))}
            </motion.div>
          )}
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
            onClick={() => track('github_click', { context: 'projects_cta' })}
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
