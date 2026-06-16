import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Twitter, Linkedin, Link2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getPostBySlug, getRelatedPosts } from '@/content/blog';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { useLenis } from '@/hooks/useLenis';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* ── Inline code block with copy button ── */
function CodeBlock({ children, className }: { children?: React.ReactNode; className?: string }) {
  const language = className?.replace('language-', '') ?? '';
  const code = String(children).trimEnd();

  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
  };

  return (
    <div className="relative group my-6 rounded-xl overflow-hidden border border-border/50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/60 border-b border-border/40">
        <span className="text-xs font-mono text-primary/80 uppercase tracking-wider">
          {language || 'code'}
        </span>
        <button
          onClick={copy}
          className="text-xs text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          Copy
        </button>
      </div>
      {/* Code */}
      <pre className="overflow-x-auto p-5 bg-[#0D0A06] text-sm leading-relaxed">
        <code className={`font-mono text-foreground/90 ${className ?? ''}`}>{children}</code>
      </pre>
    </div>
  );
}

/* ── Markdown components map ── */
const mdComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-2xl font-display font-bold text-foreground mt-12 mb-4 scroll-mt-24">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl font-display font-semibold text-foreground mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-base text-muted-foreground leading-[1.85] mb-5">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="space-y-2 mb-6 ml-1">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="space-y-2 mb-6 ml-1 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-muted-foreground text-base leading-relaxed flex items-start gap-2.5">
      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-foreground/80">{children}</em>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-primary hover:underline underline-offset-2"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-primary/60 pl-5 py-1 my-6 bg-muted/20 rounded-r-lg">
      <div className="text-muted-foreground italic">{children}</div>
    </blockquote>
  ),
  hr: () => <hr className="border-border/40 my-10" />,
  code: ({ inline, className, children }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
    if (inline) {
      return (
        <code className="px-1.5 py-0.5 rounded bg-muted/60 text-primary font-mono text-sm border border-border/30">
          {children}
        </code>
      );
    }
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
  pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-border/50">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left font-semibold text-foreground bg-muted/40 border-b border-border/50">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-3 text-muted-foreground border-b border-border/20">{children}</td>
  ),
};

export default function BlogPostPage() {
  useLenis();
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const related = slug ? getRelatedPosts(slug) : [];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const shareUrl = `https://enockuwumukiza.dev/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} — by @enochrw7`);

  return (
    <>
      <SEO
        title={`${post.title} — Enock Uwumukiza`}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
      />
      <CustomCursor />
      <Navigation />

      <main className="min-h-screen bg-background pt-24 pb-32 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            All posts
          </Link>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/30 text-primary text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-5 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-border/40">
              {/* Author + meta */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background font-bold text-sm flex-shrink-0">
                  EU
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Enock Uwumukiza</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Share:</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(shareUrl).catch(() => {})}
                  className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  aria-label="Copy link"
                >
                  <Link2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.header>

          {/* Article content */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="prose-custom"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents as Record<string, React.ElementType>}>
              {post.content}
            </ReactMarkdown>
          </motion.article>

          {/* Author bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 p-6 rounded-xl border border-border/50 bg-gradient-card"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background font-bold flex-shrink-0">
                EU
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Enock Uwumukiza</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Full-Stack & ML engineer based in Kigali, Rwanda. I build service marketplaces,
                  clinical AI systems, and real-time apps. Currently working on{' '}
                  <a
                    href="https://github.com/Enochrwa/HandyRwanda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    HandyRwanda
                  </a>{' '}
                  and INZIRA EDRPS.
                </p>
                <a
                  href="https://twitter.com/enochrw7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary mt-2 inline-block hover:underline"
                >
                  @enochrw7 on Twitter →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Related posts */}
          {related.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <h2 className="text-xl font-display font-bold text-foreground mb-6">
                Related posts
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group block rounded-xl border border-border/50 bg-gradient-card p-5 hover-lift transition-all hover:border-primary/30"
                  >
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {rp.tags.slice(0, 2).map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                      {rp.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {rp.readingTime}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
