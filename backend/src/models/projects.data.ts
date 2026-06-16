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

export const projects: Project[] = [
  {
    slug: 'ai-digital-wardrobe',
    title: 'AI-Powered Digital Wardrobe',
    tagline: 'Smart outfit detection and recommendation engine',
    description:
      'Full-stack wardrobe management system with ML-powered outfit matching, background removal, and real-time clothing classification using TensorFlow.',
    category: 'ml',
    tech: ['React', 'TypeScript', 'Python', 'TensorFlow', 'scikit-learn', 'MySQL', 'FastAPI'],
    features: [
      'Outfit type detection with 94% accuracy',
      'Background removal via rembg',
      'Personalized outfit recommendations',
      'Real-time image processing pipeline',
    ],
    problem:
      'Users struggle to manage growing wardrobes and find outfit combinations, wasting 30+ minutes daily on clothing decisions.',
    solution:
      'Built a computer vision pipeline to classify uploaded clothing items and a recommendation engine that suggests outfits based on style, weather, and occasion.',
    outcome: 'Reduced outfit decision time by ~80% in user testing. Accepted 500+ clothing items in beta.',
    demoUrl: null,
    githubUrl: 'https://github.com/Enochrwa/myward',
    imageUrl: '/images/wardrobe.jpeg',
    featured: true,
    year: 2024,
  },
  {
    slug: 'resume-builder',
    title: 'Resume Builder',
    tagline: 'Professional résumés in minutes with built-in templates',
    description:
      'Streamlined resume builder with smart templates, dynamic pricing, and one-click PDF export. Built with Next.js and deployed on Vercel.',
    category: 'fullstack',
    tech: ['Next.js', 'React', 'Node.js', 'Redis', 'Vercel'],
    features: [
      'Multiple professional templates',
      'Real-time PDF preview',
      'Smart export (PDF/DOCX)',
      'Dynamic pricing tiers',
    ],
    problem: 'Most resume builders are bloated, slow, or lock exports behind expensive paywalls.',
    solution: 'Built a focused, fast resume editor with opinionated templates that actually pass ATS systems.',
    outcome: 'Live at resumeforge-five.vercel.app. Used by 50+ job seekers.',
    demoUrl: 'https://resumeforge-five.vercel.app',
    githubUrl: 'https://github.com/Enochrwa/resumee-craft-studio',
    imageUrl: '/images/resume.jpeg',
    featured: true,
    year: 2024,
  },
  {
    slug: 'echat-realtime',
    title: 'eChat — Real-Time Communication',
    tagline: 'Full-featured team chat with live video and audio calls',
    description:
      'Modern real-time messaging platform with WebRTC video/audio calls, screen sharing, message reactions, and Docker deployment.',
    category: 'realtime',
    tech: ['React', 'Socket.io', 'MongoDB', 'Express', 'Docker', 'WebRTC'],
    features: [
      'Live video and audio calls (WebRTC)',
      'Screen sharing',
      'Real-time typing indicators',
      'Message reactions and threads',
      'Audio/video message recording',
    ],
    problem:
      'Building a real-time communication platform that handles concurrent WebRTC sessions without degrading message delivery.',
    solution:
      'Architected a Socket.io room system with Redis adapter for horizontal scaling, WebRTC signaling server, and MongoDB for persistent message history.',
    outcome: 'Handles 50+ concurrent WebSocket connections in testing. Fully dockerized for easy deployment.',
    demoUrl: null,
    githubUrl: 'https://github.com/enockuwumukiza/e-chat',
    imageUrl: '/images/chat.png',
    featured: true,
    year: 2023,
  },
  {
    slug: 'handyrwanda',
    title: 'HandyRwanda',
    tagline: 'Service marketplace connecting Rwandan clients with skilled artisans',
    description:
      'Full-stack marketplace platform for Rwanda with FastAPI backend, React web frontend, and React Native mobile app. Features job posting, bidding, voice messaging, and Rwanda administrative address hierarchy.',
    category: 'fullstack',
    tech: ['FastAPI', 'Python', 'React', 'TypeScript', 'React Native', 'Expo', 'PostgreSQL', 'TanStack Query'],
    features: [
      'End-to-end voice messaging in chat',
      'Rwanda 8-level address hierarchy',
      'Real-time job bidding system',
      'Cross-platform (web + mobile)',
      'Alembic database migrations',
    ],
    problem:
      "Rwanda's informal artisan economy lacks a trusted digital platform for clients to discover, hire, and pay skilled workers.",
    solution:
      'Built a three-layer platform (API + web + mobile) with Rwanda-specific UX including local address hierarchy, WhatsApp-style voice messages, and mobile-first design.',
    outcome: 'Active development under EnochLabs. Sprint 7 shipped voice messaging end-to-end.',
    demoUrl: null,
    githubUrl: 'https://github.com/enockuwumukiza',
    imageUrl: '/images/wardrobe.jpeg',
    featured: false,
    year: 2025,
  },
];
