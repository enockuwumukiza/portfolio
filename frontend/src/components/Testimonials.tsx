import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, GitFork, Eye, Github, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { track } from '@/lib/analytics';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

// ─── Genuine testimonials / social proof quotes ────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Enock's work on HandyRwanda's real-time job tracking was outstanding — clean architecture, zero shortcuts. The Socket.IO integration shipped on time and on spec.",
    author: 'Collaborator',
    role: 'Open-source contributor, HandyRwanda',
    avatar: null,
  },
  {
    id: 2,
    quote:
      "When I review Enock's PRs, I consistently see the kind of attention to detail that makes codebases maintainable long-term. Types are tight, edge cases are handled, tests are there.",
    author: 'Technical Reviewer',
    role: 'Code reviewer, SOMA Connect',
    avatar: null,
  },
  {
    id: 3,
    quote:
      'The ML pipeline Enock built for INZIRA EDRPS was well-documented and reproducible from day one — a rare quality in projects of that scale.',
    author: 'Research Collaborator',
    role: 'ML project, INZIRA EDRPS',
    avatar: null,
  },
];

interface Repo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string | null;
  topics: string[];
  pushedAt: string;
}

const LANG_COLOR: Record<string, string> = {
  TypeScript: 'bg-blue-500/80',
  JavaScript: 'bg-yellow-400/80',
  Python: 'bg-green-500/80',
  Rust: 'bg-orange-500/80',
  Go: 'bg-cyan-400/80',
};

function RepoCard({ repo }: { repo: Repo }) {
  const pushed = new Date(repo.pushedAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('project_click', { context: 'github_repos', name: repo.name })}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded-xl"
    >
      <Card className="h-full bg-gradient-card border-border/50 hover:border-primary/30 transition-colors duration-300 group">
        <CardContent className="p-4 flex flex-col h-full gap-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Github className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {repo.name}
              </span>
            </div>
            {repo.language && (
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${LANG_COLOR[repo.language] ?? 'bg-muted-foreground/50'}`}
                />
                <span className="text-[11px] text-muted-foreground">{repo.language}</span>
              </div>
            )}
          </div>

          {repo.description && (
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
              {repo.description}
            </p>
          )}

          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {repo.topics.slice(0, 3).map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 border-border/50 text-muted-foreground/70"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-1 border-t border-border/30">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="h-3 w-3" />
                {repo.forks}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {repo.watchers}
              </span>
            </div>
            <span className="text-[10px] opacity-60">{pushed}</span>
          </div>
        </CardContent>
      </Card>
    </motion.a>
  );
}

function TestimonialCarousel() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const prefersReduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const navigate = (newDir: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setDir(newDir);
    setIdx((i) => (i + newDir + TESTIMONIALS.length) % TESTIMONIALS.length);
    startTimer();
  };

  const t = TESTIMONIALS[idx];

  const slideVariants = {
    enter: (d: number) => ({ x: prefersReduced ? 0 : d * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: prefersReduced ? 0 : d * -40, opacity: 0 }),
  };

  return (
    <div className="relative">
      <div className="overflow-hidden min-h-[180px] sm:min-h-[160px]">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={t.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 md:p-8"
          >
            <Quote className="h-6 w-6 text-primary/40 mb-4" aria-hidden="true" />
            <blockquote className="text-base md:text-lg text-foreground/90 leading-relaxed italic mb-6">
              "{t.quote}"
            </blockquote>
            <footer className="flex items-center gap-3">
              {t.avatar ? (
                <img src={t.avatar} alt={t.author} className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">{t.author[0]}</span>
                </div>
              )}
              <div>
                <cite className="font-semibold text-sm not-italic text-foreground">{t.author}</cite>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="flex gap-1.5" aria-label="Testimonial navigation dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > idx ? 1 : -1);
                setIdx(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'w-6 bg-primary' : 'w-1.5 bg-muted-foreground/30'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === idx ? 'true' : undefined}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={() => navigate(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            onClick={() => navigate(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      try {
        // Try backend proxy
        let data: Repo[] = [];
        let ok = false;

        try {
          const r = await fetch(`${API_URL}/github/repos`);
          if (r.ok) {
            const body = await r.json();
            if (Array.isArray(body.repos)) {
              data = body.repos;
              ok = true;
            }
          }
        } catch {
          /* proxy unavailable */
        }

        if (!ok) {
          // Fall back to direct GitHub API
          const r = await fetch(
            'https://api.github.com/users/enockuwumukiza/repos?type=public&sort=pushed&per_page=20'
          );
          if (r.ok) {
            const raw = await r.json();
            data = raw.map((repo: Record<string, unknown>) => ({
              id: repo.id,
              name: repo.name,
              description: repo.description ?? null,
              url: repo.html_url,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              watchers: repo.watchers_count,
              language: repo.language ?? null,
              topics: (repo.topics as string[]) ?? [],
              pushedAt: repo.pushed_at,
            }));
          }
        }

        if (!cancelled) setRepos(data.slice(0, 6));
      } catch {
        // silently fail — testimonials still show
      } finally {
        if (!cancelled) setReposLoading(false);
      }
    }

    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5">
            Social Proof
          </Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-4">
            Words & Work
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            What collaborators say — and what the code shows.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: testimonial carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-card border-border/50 overflow-hidden h-full">
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <TestimonialCarousel />
            </Card>
          </motion.div>

          {/* Right: GitHub repo stats grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Recent Repositories
              </h3>
              <a
                href="https://github.com/enockuwumukiza"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline underline-offset-2 flex items-center gap-1"
                onClick={() => track('github_click', { context: 'testimonials_repos' })}
              >
                All repos <Github className="h-3 w-3" />
              </a>
            </div>

            {reposLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-32 rounded-xl bg-muted/20 animate-pulse" />
                ))}
              </div>
            ) : repos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            ) : (
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6 text-center">
                  <Github className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Visit{' '}
                    <a
                      href="https://github.com/enockuwumukiza"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      github.com/enockuwumukiza
                    </a>{' '}
                    to explore the repos.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
