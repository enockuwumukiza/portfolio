import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Award, BookOpen, ChevronDown, Github, ExternalLink, Microscope, Cpu, Globe } from 'lucide-react';

/* ── Icon components representing each role ── */
function RoleIcon({ type }: { type: 'freelance' | 'research' | 'open-source' | 'education' }) {
  const base = 'flex items-center justify-center w-12 h-12 rounded-xl border flex-shrink-0 shadow-card';
  if (type === 'freelance')
    return (
      <div className={`${base} bg-primary/10 border-primary/30`}>
        <Globe className="h-5 w-5 text-primary" />
      </div>
    );
  if (type === 'research')
    return (
      <div className={`${base} bg-accent/10 border-accent/30`}>
        <Microscope className="h-5 w-5 text-accent" />
      </div>
    );
  if (type === 'open-source')
    return (
      <div className={`${base} bg-green-500/10 border-green-500/30`}>
        <Github className="h-5 w-5 text-green-400" />
      </div>
    );
  return (
    <div className={`${base} bg-blue-500/10 border-blue-500/30`}>
      <BookOpen className="h-5 w-5 text-blue-400" />
    </div>
  );
}

const EXPERIENCES = [
  {
    id: 'freelance',
    iconType: 'freelance' as const,
    title: 'Full-Stack Developer',
    company: 'Freelance & Open Source',
    location: 'Kigali, Rwanda (Remote-capable)',
    period: '2024 – Present',
    type: 'Freelance',
    description:
      'Designing, building, and shipping end-to-end products solo — from architecture to deployment. Projects span service marketplaces, clinical AI platforms, and SaaS HR tools.',
    achievements: [
      'HandyRwanda (Sprint 10): Full-stack service marketplace — FastAPI, React, Expo, Socket.IO, MTN MoMo / Airtel payments',
      'KivuNova: Multi-domain SaaS HR platform with Turborepo, Module Federation, GraphQL, and TanStack Query',
    ],
    expandedAchievements: [
      'Implemented ML earnings forecasting (sklearn LinearRegression) with FastAPI endpoints served to mobile clients',
      'Migrated real-time layer from raw WebSockets to Socket.IO across 3 codebases — reduced reconnection failures by ~90%',
      'Built end-to-end voice messaging in React Native (Sprint 7): Opus codec, waveform visualization, S3 chunked upload',
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Socket.IO', 'Expo', 'Docker'],
    links: [
      { label: 'HandyRwanda', href: 'https://github.com/Enochrwa/HandyRwanda', icon: Github },
    ],
  },
  {
    id: 'research',
    iconType: 'research' as const,
    title: 'ML Research Developer',
    company: 'INZIRA EDRPS',
    location: 'Rwanda Military Hospital · INES Ruhengeri',
    period: '2022 – Present',
    type: 'Research',
    description:
      'Sole developer of a clinical AI platform for early disease risk prediction targeting five modules — AnemIA, CardioSense, NephroCheck, GlucoSense, HepatoScan — designed for Rwanda\u2019s national health infrastructure.',
    achievements: [
      'Ensemble ML pipeline: XGBoost, LightGBM, scikit-learn with SHAP explainability dashboards',
      'Clinical standards compliance: CKD-EPI, KDIGO, ALBI, ADA 2025, Rwanda MOH STGs',
    ],
    expandedAchievements: [
      'Data collection at Rwanda Military Hospital via COBAS/Sysmex analyzers and OpenClinic GA',
      'Streamlit batch prediction interface for clinicians; targeting Lancet Digital Health publication',
      'DHIS2 and RHIE integration design for national deployment',
    ],
    tech: ['Python', 'XGBoost', 'LightGBM', 'scikit-learn', 'SHAP', 'FastAPI', 'Streamlit', 'Pandas'],
    links: [
      { label: 'INZIRA EDRPS', href: 'https://github.com/Enochrwa/inzira-edrps', icon: Github },
    ],
  },
];

const OPEN_SOURCE = [
  {
    name: 'eChat',
    description: 'Real-time team chat with WebRTC video/audio, Socket.IO, and E2E encryption',
    tech: ['React', 'Socket.IO', 'WebRTC', 'Node.js'],
    href: 'https://github.com/enockuwumukiza/e-chat',
  },
  {
    name: 'AI Wardrobe',
    description: 'Outfit detection and recommendation system using TensorFlow.js and custom CNN',
    tech: ['TensorFlow', 'React', 'Python'],
    href: 'https://github.com/Enochrwa/myward',
  },
  {
    name: 'Resume Builder',
    description: 'Professional résumé builder with live preview and PDF export — live on Vercel',
    tech: ['React', 'TypeScript', 'PDF'],
    href: 'https://resumeforge-five.vercel.app',
    demo: true,
  },
];

const EDUCATION = [
  {
    degree: 'Bachelor of Science — Biomedical Laboratory Sciences',
    school: 'INES Ruhengeri University',
    location: 'Musanze, Rwanda',
    period: '2022 – 2025',
    focus: 'Clinical AI & Health Informatics',
    achievements: [
      'Final-year project: INZIRA EDRPS — clinical AI for 5 disease modules',
      'Hospital internship at Rwanda Military Hospital (Kigali)',
      'Data collection & analysis using COBAS analyzers, OpenClinic GA, DHIS2',
    ],
  },
];

function ExperienceCard({ exp }: { exp: typeof EXPERIENCES[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative flex gap-4 sm:gap-6 pb-10 last:pb-0"
    >
      {/* Timeline vertical line */}
      <div className="hidden sm:flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
        <RoleIcon type={exp.iconType} />
        <div className="w-px flex-1 bg-border/40 mt-4" />
      </div>

      <Card className="bg-gradient-card border-border/50 hover-lift flex-1 overflow-hidden">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
            <div className="sm:hidden mb-2">
              <RoleIcon type={exp.iconType} />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold text-primary">{exp.title}</h4>
              <p className="text-sm font-semibold text-foreground">{exp.company}</p>
            </div>
            <Badge variant="outline" className="border-primary/40 text-primary text-xs flex-shrink-0">
              {exp.type}
            </Badge>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />{exp.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />{exp.location}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

          {/* Key achievements */}
          <div className="mb-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-primary" /> Key Achievements
            </h5>
            <ul className="space-y-1.5">
              {exp.achievements.map((a, j) => (
                <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Expandable more achievements */}
          {exp.expandedAchievements.length > 0 && (
            <>
              <button
                onClick={() => setExpanded(e => !e)}
                className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors mb-3 group"
                aria-expanded={expanded}
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                />
                {expanded ? 'Show less' : `Show ${exp.expandedAchievements.length} more achievements`}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-1.5 mb-4 border-l-2 border-primary/20 pl-4">
                      {exp.expandedAchievements.map((a, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {exp.tech.map(t => (
              <Badge key={t} variant="secondary" className="text-xs bg-muted/20 border-border/40">
                {t}
              </Badge>
            ))}
          </div>

          {/* Links */}
          {exp.links.length > 0 && (
            <div className="flex gap-3">
              {exp.links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors border border-border/40 hover:border-primary/30 rounded-lg px-3 py-1.5"
                >
                  <link.icon className="h-3 w-3" />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-5">
            Experience & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real work, real products — building from Kigali for the world.
          </p>
        </motion.div>

        {/* Experience timeline */}
        <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-primary" />
          Professional Experience
        </h3>
        <div className="relative mb-20">
          {EXPERIENCES.map(exp => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>

        {/* Open Source & Freelance Projects */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
            <Github className="h-5 w-5 text-green-400" />
            Open Source Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OPEN_SOURCE.map((proj, i) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <a
                  href={proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                >
                  <Card className="h-full bg-gradient-card border-border/50 hover-lift transition-all duration-300 group-hover:border-primary/30">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {proj.name}
                        </h4>
                        {proj.demo ? (
                          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        ) : (
                          <Github className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {proj.tech.map(t => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full bg-muted/30 border border-border/30 text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-400" />
          Education
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-card border-border/50 hover-lift h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 flex-shrink-0 mt-0.5">
                      <BookOpen className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-primary leading-snug">{edu.degree}</h4>
                      <p className="text-sm font-semibold">{edu.school}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{edu.period}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{edu.location}</span>
                  </div>

                  <Badge variant="outline" className="mb-4 border-blue-500/30 text-blue-400 text-xs">
                    {edu.focus}
                  </Badge>

                  <ul className="space-y-1.5">
                    {edu.achievements.map((a, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-1.5 flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
