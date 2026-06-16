import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code2, Database, Brain, Cloud, Terminal, GitBranch,
  Smartphone, Layers
} from 'lucide-react';

// Sprint 3.5: Kill progress bars. Replace with tech grid + tooltips.

interface Skill {
  name: string;
  usedIn: string[];
  level: 'core' | 'proficient' | 'learning';
}

interface Category {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    title: 'Frontend',
    icon: Code2,
    color: 'primary',
    skills: [
      { name: 'React',          usedIn: ['HandyRwanda', 'eChat', 'AI Wardrobe'], level: 'core' },
      { name: 'TypeScript',     usedIn: ['HandyRwanda', 'KivuNova', 'Portfolio'],  level: 'core' },
      { name: 'Next.js',        usedIn: ['Resume Builder'],                         level: 'proficient' },
      { name: 'Tailwind CSS',   usedIn: ['HandyRwanda', 'Portfolio'],               level: 'core' },
      { name: 'Framer Motion',  usedIn: ['Portfolio', 'HandyRwanda'],               level: 'proficient' },
      { name: 'TanStack Query', usedIn: ['KivuNova', 'HandyRwanda'],                level: 'proficient' },
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    color: 'secondary',
    skills: [
      { name: 'Node.js',      usedIn: ['eChat', 'Resume Builder', 'Portfolio'],     level: 'core' },
      { name: 'FastAPI',      usedIn: ['HandyRwanda', 'INZIRA EDRPS'],              level: 'core' },
      { name: 'Express',      usedIn: ['eChat', 'Portfolio API'],                   level: 'core' },
      { name: 'PostgreSQL',   usedIn: ['HandyRwanda', 'KivuNova'],                  level: 'core' },
      { name: 'MongoDB',      usedIn: ['eChat'],                                    level: 'proficient' },
      { name: 'Redis',        usedIn: ['Resume Builder', 'HandyRwanda'],            level: 'proficient' },
      { name: 'GraphQL',      usedIn: ['KivuNova'],                                 level: 'proficient' },
    ],
  },
  {
    title: 'ML / AI',
    icon: Brain,
    color: 'accent',
    skills: [
      { name: 'Python',       usedIn: ['HandyRwanda', 'INZIRA EDRPS', 'AI Wardrobe'], level: 'core' },
      { name: 'scikit-learn', usedIn: ['HandyRwanda earnings', 'INZIRA EDRPS'],       level: 'core' },
      { name: 'XGBoost',      usedIn: ['INZIRA EDRPS'],                               level: 'proficient' },
      { name: 'TensorFlow',   usedIn: ['AI Wardrobe'],                                level: 'proficient' },
      { name: 'Pandas/NumPy', usedIn: ['HandyRwanda', 'INZIRA EDRPS'],               level: 'core' },
      { name: 'SHAP',         usedIn: ['INZIRA EDRPS explainability'],                level: 'proficient' },
    ],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    color: 'primary',
    skills: [
      { name: 'React Native', usedIn: ['HandyRwanda mobile app'],  level: 'proficient' },
      { name: 'Expo',         usedIn: ['HandyRwanda mobile app'],  level: 'proficient' },
    ],
  },
  {
    title: 'DevOps & Cloud',
    icon: Cloud,
    color: 'secondary',
    skills: [
      { name: 'Docker',       usedIn: ['eChat', 'HandyRwanda', 'Portfolio'],  level: 'proficient' },
      { name: 'GitHub Actions', usedIn: ['HandyRwanda CI', 'Portfolio CI'],   level: 'proficient' },
      { name: 'Vercel',       usedIn: ['Resume Builder', 'Portfolio'],        level: 'proficient' },
      { name: 'Nginx',        usedIn: ['Portfolio Docker'],                   level: 'proficient' },
    ],
  },
  {
    title: 'Tools',
    icon: Terminal,
    color: 'accent',
    skills: [
      { name: 'Git',          usedIn: ['Every project'],                  level: 'core' },
      { name: 'Zod',          usedIn: ['HandyRwanda', 'Portfolio API'],   level: 'proficient' },
      { name: 'Prisma',       usedIn: ['Portfolio API'],                  level: 'proficient' },
      { name: 'Vite',         usedIn: ['Portfolio', 'HandyRwanda'],       level: 'core' },
    ],
  },
];

const CURRENTLY_LEARNING = [
  { name: 'Rust (NAPI-RS)',   why: 'Native audio engine for Zovyra media player' },
  { name: 'WebGPU',           why: 'Next-gen browser graphics for immersive portfolios' },
  { name: 'Turborepo',        why: 'Monorepo tooling for multi-domain SaaS HR platform' },
];

const LEVEL_DOT: Record<Skill['level'], string> = {
  core:       'bg-primary',
  proficient: 'bg-primary/60',
  learning:   'bg-muted-foreground/40',
};

const CERTIFICATIONS = [
  { name: 'Scientific Computing with Python',          year: '2023', issuer: 'freeCodeCamp' },
  { name: 'TensorFlow Developer',                      year: '2023', issuer: 'Google'        },
  { name: 'Back End Development & APIs',               year: '2024', issuer: 'freeCodeCamp' },
  { name: 'JavaScript Algorithms & Data Structures',   year: '2023', issuer: 'freeCodeCamp' },
  { name: 'Data Analysis with Python',                 year: '2025', issuer: 'freeCodeCamp' },
];

function SkillBadge({ skill }: { skill: Skill }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
          border border-border/50 bg-muted/20 text-foreground
          hover:border-primary/50 hover:bg-primary/10 hover:text-primary
          transition-all duration-200 cursor-default
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-describedby={`tooltip-${skill.name}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${LEVEL_DOT[skill.level]}`} />
        {skill.name}
      </button>

      {open && (
        <motion.div
          id={`tooltip-${skill.name}`}
          role="tooltip"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20
            bg-card border border-border/60 rounded-lg px-3 py-2 shadow-card
            w-max max-w-[200px] text-left pointer-events-none"
        >
          <p className="text-xs font-semibold text-foreground mb-1">Used in:</p>
          <ul className="space-y-0.5">
            {skill.usedIn.map(p => (
              <li key={p} className="text-xs text-muted-foreground">{p}</li>
            ))}
          </ul>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border/60" />
        </motion.div>
      )}
    </div>
  );
}

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4">
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
            Skills & Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Hover any badge to see exactly which projects it's been used in.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" /> Core
            </span>
            <span className="inline-flex items-center gap-1 ml-4">
              <span className="w-2 h-2 rounded-full bg-primary/60 inline-block" /> Proficient
            </span>
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-card border-border/50 hover-lift h-full">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <cat.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">{cat.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <SkillBadge key={skill.name} skill={skill} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Currently learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="bg-gradient-card border-primary/20 border">
            <CardContent className="p-6">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                Currently Learning
              </h3>
              <div className="flex flex-wrap gap-3">
                {CURRENTLY_LEARNING.map(item => (
                  <div
                    key={item.name}
                    title={item.why}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                      border border-primary/30 bg-primary/5 text-primary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
                    {item.name}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/60 mt-3">Hover to see why I'm learning each one.</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-5 text-center">Certifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-card border-border/50 hover-lift">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Badge variant="outline" className="shrink-0 border-primary/40 text-primary text-xs">
                      {cert.year}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium leading-snug">{cert.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
