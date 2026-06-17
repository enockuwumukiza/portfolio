import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, BookOpen, Send, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useLenis } from '@/hooks/useLenis';
import { track } from '@/lib/analytics';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

const guestbookSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60),
  message: z.string().min(3, 'Say a little more than that').max(500),
  link: z.string().trim().url('Must be a valid URL').max(200).optional().or(z.literal('')),
});

type GuestbookFormData = z.infer<typeof guestbookSchema>;

type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  link: string | null;
  createdAt: string;
};

function EntrySkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="rounded-xl border border-border/40 bg-muted/10 p-5 animate-pulse">
          <div className="h-4 w-32 bg-muted/30 rounded mb-3" />
          <div className="h-3 w-full bg-muted/20 rounded mb-2" />
          <div className="h-3 w-2/3 bg-muted/20 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function GuestbookPage() {
  useLenis();
  const [entries, setEntries] = useState<GuestbookEntry[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GuestbookFormData>({ resolver: zodResolver(guestbookSchema) });

  const loadEntries = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/guestbook`);
      if (!res.ok) throw new Error('Failed to load');
      const json = await res.json();
      setEntries(json.data ?? []);
      setLoadError(false);
    } catch {
      setLoadError(true);
      setEntries([]);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const onSubmit = async (data: GuestbookFormData) => {
    setSubmitState('loading');
    try {
      const res = await fetch(`${API_URL}/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, link: data.link || undefined }),
      });
      if (!res.ok) throw new Error('Server error');
      const json = await res.json();
      setSubmitState('success');
      track('contact_open', { context: 'guestbook_sign' });
      reset();
      // Optimistically prepend the new entry so it's visible immediately
      if (json.data) {
        setEntries((prev) => [json.data, ...(prev ?? [])]);
      }
      setTimeout(() => setSubmitState('idle'), 4000);
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <>
      <SEO
        title="Guestbook — Enock Uwumukiza"
        description="Leave a note. A small, honest guestbook for people passing through."
        url="/guestbook"
      />
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-32 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to portfolio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-mono text-primary uppercase tracking-widest">
                Guestbook
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-5">
              Sign the Guestbook
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Visited, found something useful, or just passing through? Leave a note — no account
              needed.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Your name"
                        {...register('name')}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive mt-1.5">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Input
                        placeholder="Link (optional) — github.com/you"
                        {...register('link')}
                        aria-invalid={!!errors.link}
                      />
                      {errors.link && (
                        <p className="text-xs text-destructive mt-1.5">{errors.link.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Textarea
                      placeholder="Leave a note…"
                      rows={3}
                      {...register('message')}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive mt-1.5">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={submitState === 'loading'}
                    className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow w-full sm:w-auto"
                  >
                    {submitState === 'loading' ? (
                      <>
                        <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Signing…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Sign Guestbook
                      </>
                    )}
                  </Button>

                  <AnimatePresence>
                    {submitState === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 text-sm text-green-400"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Thanks for signing!
                      </motion.div>
                    )}
                    {submitState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 text-sm text-destructive"
                      >
                        <AlertCircle className="h-4 w-4" />
                        Something went wrong. Please try again.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Entries */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-5">
              {entries && entries.length > 0
                ? `${entries.length} note${entries.length === 1 ? '' : 's'}`
                : 'Notes'}
            </p>

            {entries === null && <EntrySkeleton />}

            {entries !== null && entries.length === 0 && !loadError && (
              <p className="text-sm text-muted-foreground py-10 text-center border border-dashed border-border/50 rounded-xl">
                No notes yet — be the first to sign.
              </p>
            )}

            {loadError && entries?.length === 0 && (
              <p className="text-sm text-muted-foreground py-10 text-center border border-dashed border-border/50 rounded-xl">
                Couldn't load the guestbook right now. Try refreshing in a bit.
              </p>
            )}

            {entries && entries.length > 0 && (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                className="space-y-4"
              >
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }}
                    className="rounded-xl border border-border/50 bg-gradient-card p-5 hover-lift transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-display font-semibold text-foreground">{entry.name}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {entry.message}
                    </p>
                    {entry.link && (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer ugc"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        {entry.link.replace(/^https?:\/\//, '')}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
