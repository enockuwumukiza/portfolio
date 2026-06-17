import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Code, Cpu, Wrench } from 'lucide-react';
import GitHubActivity from './GitHubActivity';

// Sprint 3.4: Replace stat cards with career timeline, authentic quote, animated stagger

const TIMELINE = [
  {
    period: '2025 – Present',
    role: 'Full-Stack Developer & ML Engineer',
    context: 'Freelance & Open Source · Kigali, Rwanda',
    achievement:
      'Built HandyRwanda (Sprint 13+), CropMind offline AI, eCyber security platform, SOMA Market, and INZIRA EDRPS clinical AI — all solo.',
    icon: Cpu,
  },
  {
    period: '2024',
    role: 'Backend & Integrations',
    context: 'Self-directed projects',
    achievement:
      'Shipped full Socket.IO migration across 3 layers, MTN MoMo/Airtel Money payments, Expo push notifications.',
    icon: Code,
  },
  {
    period: '2022 – 2023',
    role: 'Biomedical Laboratory Sciences Student',
    context: 'INES Ruhengeri · Rwanda Military Hospital (internship)',
    achievement:
      'Collected clinical data for AI research at RMH, started INZIRA EDRPS targeting 5 disease modules.',
    icon: Rocket,
  },
];

const BADGE_GROUPS = [
  { label: 'Languages', items: ['TypeScript', 'Python', 'JavaScript', 'Rust (learning)'] },
  {
    label: 'Currently',
    items: [
      '🚧 HandyRwanda — Sprint 13 shipped',
      '🌱 CropMind — offline AI for farmers',
      '🔐 eCyber — security platform',
      '🛒 SOMA Market — Rwanda marketplace',
    ],
  },
];

const badgeContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const badgeItemVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
};

function useCountUp(target: number, trigger: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, trigger, duration]);
  return count;
}

function AnimatedStat({
  value,
  label,
  suffix = '+',
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-display font-bold text-primary tabular-nums">
        {count}
        {suffix}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

const About = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-5">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm a self-taught full-stack developer and biomedical sciences student from Kigali,
            Rwanda. I build end-to-end products — marketplaces, clinical AI, SaaS — alone, from
            scratch, at sprint pace.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start mb-16">
          {/* Career timeline */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-semibold mb-7">Career Path</h3>
            <div className="relative space-y-0">
              {/* Vertical line */}
              <div className="absolute left-5 top-5 bottom-5 w-px bg-border" aria-hidden="true" />

              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative flex gap-5 pb-9 last:pb-0"
                >
                  {/* Icon node */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center shadow-card">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>

                  <div className="pt-1">
                    <time className="text-xs font-mono text-muted-foreground">{item.period}</time>
                    <h4 className="font-semibold text-sm mt-0.5">{item.role}</h4>
                    <p className="text-xs text-muted-foreground">{item.context}</p>
                    <p className="text-sm text-muted-foreground/80 mt-2 leading-relaxed">
                      {item.achievement}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column: stats + badges */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick stats */}
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6 grid grid-cols-3 gap-4 divide-x divide-border/40">
                <AnimatedStat value={3} label="Years building" />
                <AnimatedStat value={14} label="Projects shipped" />
                <AnimatedStat value={6} label="Active projects" />
              </CardContent>
            </Card>

            {/* Badge groups */}
            {BADGE_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Wrench className="h-3 w-3" /> {group.label}
                </p>
                <motion.div
                  variants={badgeContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {group.items.map((item) => (
                    <motion.div key={item} variants={badgeItemVariants}>
                      <Badge
                        variant="secondary"
                        className="bg-muted/20 text-foreground border-border/40 text-xs"
                      >
                        {item}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Philosophy quote — authentic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Card className="bg-gradient-card border-primary/20 max-w-3xl mx-auto">
            <CardContent className="p-8 text-center">
              <blockquote className="text-lg italic text-muted-foreground leading-relaxed">
                "I grew up in Rwanda, where access to quality tech infrastructure is a daily
                constraint. That taught me to build lean, ship fast, and make things that work even
                in the hardest conditions."
              </blockquote>
              <p className="text-sm text-primary mt-4 font-medium">— Enock Uwumukiza</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* GitHub Activity Heatmap */}
        <GitHubActivity />
      </div>
    </section>
  );
};

export default About;
