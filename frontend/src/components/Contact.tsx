import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Linkedin, Github, Twitter, Send, Coffee, Briefcase, MessageSquare, Calendar, CheckCircle, AlertCircle, Clock, Video } from 'lucide-react';
import { track } from '@/lib/analytics';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(4, 'Subject must be at least 4 characters').max(120),
  message: z.string().min(20, 'Message must be at least 20 characters').max(2000),
  type: z.enum(['collaboration', 'hiring', 'general']),
});

type ContactFormData = z.infer<typeof contactSchema>;

const CONTACT_METHODS = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'wwwenockuwumukiza@gmail.com',
    href: 'mailto:wwwenockuwumukiza@gmail.com',
    description: 'Best for detailed discussions',
  },
  {
    Icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/enock-uwumukiza-3086082b4',
    href: 'https://linkedin.com/in/enock-uwumukiza-3086082b4',
    description: 'Professional networking',
  },
  {
    Icon: Github,
    label: 'GitHub',
    value: '@enockuwumukiza',
    href: 'https://github.com/enockuwumukiza',
    description: 'Code & projects',
  },
  {
    Icon: Twitter,
    label: 'Twitter / X',
    value: '@enochrw7',
    href: 'https://twitter.com/enochrw7',
    description: 'Quick updates & thoughts',
  },
];

const INQUIRY_TYPES = [
  { type: 'collaboration' as const, Icon: Coffee, title: 'Collaboration', description: "Let's build something together" },
  { type: 'hiring' as const, Icon: Briefcase, title: 'Hiring', description: 'Full-time or contract roles' },
  { type: 'general' as const, Icon: MessageSquare, title: 'General', description: 'Questions, feedback, hi!' },
];

const SMART_SUGGESTIONS: Record<ContactFormData['type'], { subject: string; message: string }> = {
  collaboration: { subject: 'Project Collaboration Opportunity', message: "Hi Enock! I have a project I'd love your expertise on…" },
  hiring: { subject: 'Job Opportunity', message: "Hi Enock! We're looking for a developer with your background…" },
  general: { subject: 'Reaching Out', message: "Hi Enock! I came across your portfolio and wanted to…" },
};

const Contact = () => {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const trackedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !trackedRef.current) {
          trackedRef.current = true;
          track('contact_open', { context: 'viewport' });
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { type: 'collaboration' },
  });

  const selectedType = watch('type');
  const suggestion = SMART_SUGGESTIONS[selectedType];

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('loading');
    track('contact_open', { type: data.type });
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Server error');
      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-4" ref={sectionRef}>
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
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got a project, an opportunity, or just want to say hi? I reply within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Inquiry type */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
                    What's this about?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {INQUIRY_TYPES.map(({ type, Icon, title, description }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setValue('type', type)}
                        aria-pressed={selectedType === type}
                        className={`p-3 rounded-lg border text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                          selectedType === type
                            ? 'border-primary bg-primary/10'
                            : 'border-border/50 hover:border-primary/40'
                        }`}
                      >
                        <Icon className={`h-4 w-4 mb-1 ${selectedType === type ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div className="text-xs font-medium">{title}</div>
                        <div className="text-xs text-muted-foreground hidden sm:block">{description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-sm font-medium mb-1.5 block">
                        Name <span className="text-destructive" aria-hidden="true">*</span>
                      </label>
                      <Input
                        id="contact-name"
                        {...register('name')}
                        placeholder="Your name"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className="bg-background/50 border-border/50"
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-destructive mt-1" role="alert">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-sm font-medium mb-1.5 block">
                        Email <span className="text-destructive" aria-hidden="true">*</span>
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        {...register('email')}
                        placeholder="you@email.com"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className="bg-background/50 border-border/50"
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-destructive mt-1" role="alert">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="text-sm font-medium mb-1.5 block">
                      Subject <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <Input
                      id="contact-subject"
                      {...register('subject')}
                      placeholder={suggestion.subject}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      className="bg-background/50 border-border/50"
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-xs text-destructive mt-1" role="alert">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-sm font-medium mb-1.5 block">
                      Message <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <Textarea
                      id="contact-message"
                      {...register('message')}
                      placeholder={suggestion.message}
                      rows={5}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className="bg-background/50 border-border/50 resize-none"
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-destructive mt-1" role="alert">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit state feedback */}
                  {submitState === 'success' && (
                    <div className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3" role="status">
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      Message sent! I'll reply within 24 hours.
                    </div>
                  )}
                  {submitState === 'error' && (
                    <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3" role="alert">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      Something went wrong. Please email me directly at wwwenockuwumukiza@gmail.com
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={submitState === 'loading' || submitState === 'success'}
                    className="w-full bg-gradient-hero hover:opacity-90 shadow-glow text-primary-foreground"
                  >
                    {submitState === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : submitState === 'success' ? (
                      <span className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Sent!</span>
                    ) : (
                      <span className="flex items-center gap-2"><Send className="h-4 w-4" /> Send Message</span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Contact methods */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Direct Channels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {CONTACT_METHODS.map(({ Icon, label, value, href, description }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/10 transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground">{description}</div>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Book a call */}
            <Card className="bg-gradient-card border-primary/20 border">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">Prefer to talk?</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Book a free 30-min intro call — no sales pitch, just a real conversation about your project or opportunity.
                </p>
                <a
                  href="https://calendly.com/wwwenockuwumukiza"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('contact_open', { context: 'calendly_book_call' })}
                >
                  <Button size="sm" variant="outline" className="w-full border-primary/40 text-primary hover:bg-primary/10">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book a 30-min call
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Usually responds within 24 hours
                </p>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Status',         value: <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Open to Opportunities</Badge> },
                  { label: 'Response Time',  value: 'Within 24 hours' },
                  { label: 'Timezone',       value: 'CAT (UTC+2) · Kigali, Rwanda' },
                  { label: 'Preferred Work', value: 'Remote · Contract · Full-time' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    {typeof value === 'string' ? <span className="text-foreground font-medium">{value}</span> : value}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
