import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, Rss } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ALL_POSTS } from '@/content/blog';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useLenis } from '@/hooks/useLenis';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function BlogListPage() {
  useLenis();
  const featured = ALL_POSTS[0];
  const rest = ALL_POSTS.slice(1);

  const allTags = useMemo(() => Array.from(new Set(ALL_POSTS.flatMap((p) => p.tags))).sort(), []);

  return (
    <>
      <SEO
        title="Blog — Enock Uwumukiza"
        description="Technical writing on full-stack development, ML, React Native, and building software from Kigali, Rwanda."
        url="/blog"
      />
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-32 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to portfolio
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Rss className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-mono text-primary uppercase tracking-widest">
                Writing
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-5">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Technical deep-dives, sprint retrospectives, and honest reflections on building
              software from Kigali. No hot takes — only things I've actually shipped.
            </p>
          </motion.div>

          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
              Latest post
            </p>
            <Link to={`/blog/${featured.slug}`} className="group block">
              <article className="relative rounded-2xl border border-border/60 bg-gradient-card overflow-hidden hover-lift transition-all duration-300 group-hover:border-primary/40">
                {/* Gold accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-transparent" />
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featured.tags.slice(0, 4).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-primary/30 text-primary text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(featured.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {featured.readingTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                      Read article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>

          {/* All tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            <span className="text-xs text-muted-foreground self-center mr-1 font-mono">
              Topics:
            </span>
            {allTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-muted/30 border border-border/40 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors cursor-default"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Rest of posts */}
          {rest.length > 0 && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 gap-6"
            >
              {rest.map((post) => (
                <motion.div key={post.slug} variants={item}>
                  <Link to={`/blog/${post.slug}`} className="group block h-full">
                    <article className="h-full rounded-xl border border-border/50 bg-gradient-card p-6 hover-lift transition-all duration-300 group-hover:border-primary/30 flex flex-col">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-muted/20 border-border/40"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-lg font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug flex-1">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readingTime}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 text-center"
          >
            <p className="text-sm text-muted-foreground">
              More posts coming as I ship. Follow{' '}
              <a
                href="https://twitter.com/enochrw7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @enochrw7
              </a>{' '}
              for updates.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
