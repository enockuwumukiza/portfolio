import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
}

const DEFAULTS = {
  title: 'Enock Uwumukiza — Full-Stack Developer from Kigali, Rwanda',
  description:
    'Full-Stack Developer & ML Engineer based in Kigali, Rwanda. I build full-stack products and intelligent systems — from service marketplaces to clinical AI — that solve real problems.',
  image: 'https://enockuwumukiza.dev/og-image.png',
  url: 'https://enockuwumukiza.dev',
  author: 'Enock Uwumukiza',
};

export default function SEO({
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  image = DEFAULTS.image,
  url = DEFAULTS.url,
  type = 'website',
  author = DEFAULTS.author,
  publishedTime,
}: SEOProps) {
  const fullTitle = title === DEFAULTS.title ? title : `${title} — Enock Uwumukiza`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Enock Uwumukiza Portfolio" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@enochrw7" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
