import { post as handyrwanda } from './building-handyrwanda';
import { post as voiceMessaging } from './voice-messaging-react-native';
import { post as fastapiVsNodejs } from './fastapi-vs-nodejs';

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
  content: string;
};

export const ALL_POSTS: BlogPost[] = [fastapiVsNodejs, voiceMessaging, handyrwanda].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return ALL_POSTS.filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const sharedA = a.tags.filter((t) => current.tags.includes(t)).length;
      const sharedB = b.tags.filter((t) => current.tags.includes(t)).length;
      return sharedB - sharedA;
    })
    .slice(0, count);
}
