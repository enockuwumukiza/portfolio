import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Award, BookOpen } from 'lucide-react';

// Sprint fix: replaced placeholder TechCorp/DesignStudio/BigTech with real experience

const EXPERIENCES = [
  {
    title: 'Full-Stack Developer (Solo)',
    company: 'Freelance & Open Source',
    location: 'Kigali, Rwanda (Remote-capable)',
    period: '2024 – Present',
    type: 'Freelance',
    description:
      'Designing, building, and shipping end-to-end products solo — from architecture to deployment. Clients and personal projects span service marketplaces, clinical AI, and SaaS HR platforms.',
    achievements: [
      'HandyRwanda (Sprint 7): Full-stack Rwanda service marketplace — FastAPI, React, Expo, Socket.IO, MTN MoMo/Airtel payments',
      'KivuNova: Multi-domain SaaS HR platform with Turborepo, Module Federation, GraphQL, and TanStack Query',
      'Implemented ML earnings forecasting (sklearn LinearRegression) with FastAPI endpoints',
      'Migrated real-time layer from raw WebSockets to Socket.IO across 3 codebases',
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Socket.IO', 'Expo', 'Docker'],
  },
  {
    title: 'ML Research Developer',
    company: 'INZIRA EDRPS (Personal Research Project)',
    location: 'Rwanda Military Hospital · INES Ruhengeri',
    period: '2022 – Present',
    type: 'Research',
    description:
      'Sole developer of a clinical AI platform for early disease risk prediction targeting five modules: AnemIA, CardioSense, NephroCheck, GlucoSense, HepatoScan — designed for Rwanda\'s national health infrastructure (RHIE/DHIS2).',
    achievements: [
      'Ensemble ML pipeline: XGBoost, LightGBM, scikit-learn with SHAP explainability',
      'Clinical standards: CKD-EPI, KDIGO, ALBI, ADA 2025, Rwanda MOH STGs',
      'Data collection at Rwanda Military Hospital via COBAS/Sysmex analyzers and OpenClinic GA',
      'Streamlit batch prediction interface; targeting Lancet Digital Health publication',
    ],
    tech: ['Python', 'XGBoost', 'LightGBM', 'scikit-learn', 'SHAP', 'FastAPI', 'Streamlit'],
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
            Real work, real projects — no placeholder companies.
          </p>
        </motion.div>

        {/* Experience timeline */}
        <h3 className="text-xl font-semibold mb-8">Professional Experience</h3>
        <div className="relative mb-20">
          <div className="absolute left-5 top-4 bottom-4 w-px bg-border hidden sm:block" aria-hidden="true" />

          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Timeline dot */}
              <div className="hidden sm:flex flex-shrink-0 relative z-10 w-10 h-10 rounded-full bg-card border border-primary/40 items-center justify-center shadow-card mt-1">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              </div>

              <Card className="bg-gradient-card border-border/50 hover-lift flex-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                    <div>
                      <h4 className="text-base font-bold text-primary">{exp.title}</h4>
                      <p className="text-sm font-semibold">{exp.company}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/40 text-primary text-xs flex-shrink-0">
                      {exp.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />{exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />{exp.location}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

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

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map(t => (
                      <Badge key={t} variant="secondary" className="text-xs bg-muted/20 border-border/40">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <h3 className="text-xl font-semibold mb-8">Education</h3>
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
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0 mt-0.5">
                      <BookOpen className="h-4 w-4 text-primary" />
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

                  <Badge variant="outline" className="mb-4 border-primary/30 text-primary text-xs">
                    {edu.focus}
                  </Badge>

                  <ul className="space-y-1.5">
                    {edu.achievements.map((a, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
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
