// Shared types between frontend and backend
// Import these in both packages to keep contract in sync

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'collaboration' | 'hiring' | 'general';
}

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'ml' | 'fullstack' | 'realtime' | 'mobile';
  tech: string[];
  features: string[];
  problem: string;
  solution: string;
  outcome: string;
  demoUrl: string | null;
  githubUrl: string;
  imageUrl: string;
  featured: boolean;
  year: number;
}

export type AnalyticsEvent =
  | 'page_view'
  | 'project_click'
  | 'resume_download'
  | 'contact_open'
  | 'github_click'
  | 'linkedin_click';
