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
    outcome:
      'Reduced outfit decision time by ~80% in user testing. Accepted 500+ clothing items in beta.',
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
    solution:
      'Built a focused, fast resume editor with opinionated templates that actually pass ATS systems.',
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
    outcome:
      'Handles 50+ concurrent WebSocket connections in testing. Fully dockerized for easy deployment.',
    demoUrl: null,
    githubUrl: 'https://github.com/enockuwumukiza/e-chat',
    imageUrl: '/images/chat.png',
    featured: true,
    year: 2023,
  },
  {
    slug: 'ecyber-security',
    title: 'eCyber Security Platform',
    tagline: 'AI-powered cybersecurity monitoring and intrusion detection',
    description:
      'Full-stack cybersecurity platform combining a Python backend with an Electron/React frontend. Provides real-time network traffic analysis, ML-based intrusion detection, system monitoring, firewall management, and a unified security dashboard for SMEs.',
    category: 'ml',
    tech: ['TypeScript', 'Python', 'React', 'Electron', 'FastAPI', 'scikit-learn', 'Socket.io'],
    features: [
      'Real-time network packet analysis and anomaly detection',
      'ML-based intrusion detection and prevention (IDS/IPS)',
      'Unified security dashboard with live threat feed',
      'System health monitoring and vulnerability scanning',
      'Firewall rule management UI',
    ],
    problem:
      'Enterprise-grade cybersecurity tools are expensive and complex, leaving SMEs exposed to network threats they cannot detect or respond to.',
    solution:
      'Built an open-source, all-in-one security platform with a Python analysis engine and Electron desktop frontend — giving SMEs proactive threat detection without the enterprise price tag.',
    outcome:
      'Largest codebase across all projects (2.1M+ TypeScript + 1.7M+ Python lines). Actively maintained with ML anomaly detection pipeline.',
    demoUrl: null,
    githubUrl: 'https://github.com/Enochrwa/ecyber-system',
    imageUrl: '/images/wardrobe.jpeg',
    featured: true,
    year: 2025,
  },
  {
    slug: 'cropmind',
    title: 'CropMind',
    tagline: 'Offline-first AI crop disease diagnosis for smallholder farmers',
    description:
      'Mobile-first AI platform that lets farmers photograph a diseased plant and get an instant offline diagnosis on a $60 Android. Built with React Native + Expo, TensorFlow Lite on-device model (2 MB), and a FastAPI backend for enriched analysis.',
    category: 'ml',
    tech: ['React Native', 'Expo', 'FastAPI', 'Python', 'TensorFlow Lite', 'SQLite', 'Whisper'],
    features: [
      'On-device disease detection — works fully offline',
      'Step-by-step treatment plan in local language (EN / Kinyarwanda / FR)',
      'Voice Q&A with AI agronomist (Whisper ASR)',
      'Nearest supplier lookup with current stock',
      'Local crop price feed and farm history tracking',
      'Micro-payment monetisation (from 500 RWF / ~$0.40)',
    ],
    problem:
      '500 million smallholder farmers lose 20–40% of harvests yearly to crop disease, with no access to agronomists and unreliable internet.',
    solution:
      'Put a 2 MB TFLite model directly on the device so diagnosis works offline. Enriched reports (supplier, price, treatment) are fetched when connectivity is available.',
    outcome:
      'Targets the African smallholder market; offline detection always free. Active development as of June 2026.',
    demoUrl: null,
    githubUrl: 'https://github.com/Enochrwa/CropMind',
    imageUrl: '/images/wardrobe.jpeg',
    featured: true,
    year: 2026,
  },
  {
    slug: 'inzira-edrps',
    title: 'INZIRA EDRPS',
    tagline: 'Clinical AI for early disease risk prediction in Rwanda',
    description:
      'Multi-disease clinical decision support system for Rwanda\'s hospitals. Uses routine CBC and biochemistry lab data to screen for Anemia, CVD, CKD, Type 2 Diabetes, and Liver Disease with AUC-ROC up to 1.000. Built with Streamlit, XGBoost, CatBoost, and SHAP explainability.',
    category: 'ml',
    tech: ['Python', 'Streamlit', 'XGBoost', 'CatBoost', 'LightGBM', 'scikit-learn', 'SHAP', 'Pandas'],
    features: [
      'Five disease modules: AnemIA, CardioScan, NephroCheck, GlucoSense, HepatoScan',
      'AUC-ROC: 1.000 (Anemia & CKD), 0.976 (T2DM), 0.962 (Liver), 0.802 (CVD)',
      'Explainable AI — SHAP rationales for every prediction',
      'KDIGO / ADA 2025 / WHO clinical staging',
      'Print-ready clinical reports with cross-disease insights',
      'Clinical safety alerts (Hypertensive Crisis, Advanced CKD)',
    ],
    problem:
      'Rwanda\'s district hospitals lack access to specialist diagnostics, causing late detection of NCDs that are treatable if caught early from routine lab work.',
    solution:
      'Trained stacking ensembles on Rwanda-representative clinical data and wrapped them in a 3-screen clinical workstation: patient registration → multi-parameter entry → parallel inference and report generation.',
    outcome:
      'Started from RMH internship data collection. Five disease modules deployed, with clinical-grade accuracy validated against WHO / ADA / KDIGO standards.',
    demoUrl: null,
    githubUrl: 'https://github.com/james7dev/Early-Disease-Risk-Prediction-System',
    imageUrl: '/images/resume.jpeg',
    featured: false,
    year: 2024,
  },
  {
    slug: 'soma-market',
    title: 'SOMA Market',
    tagline: "Rwanda's offline-capable digital marketplace",
    description:
      'Full-stack e-commerce marketplace built for African users with offline support, Kinyarwanda / French / English i18n, MTN MoMo and Airtel Money payment integration, AI-powered product recommendations via Hugging Face, and real-time Socket.IO notifications.',
    category: 'fullstack',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Socket.IO', 'Redis'],
    features: [
      'Three-language i18n: English, Kinyarwanda, Français',
      'MTN MoMo / Airtel Money payment integration',
      'AI product recommendations (Mistral-7B via Hugging Face)',
      'Offline-capable PWA with service worker',
      'Real-time notifications via Socket.IO',
      'Google OAuth + Email OTP authentication',
      'Cloudinary media storage + Leaflet maps',
    ],
    problem:
      'Rwanda\'s growing e-commerce sector lacks a platform designed for local connectivity constraints, local payment methods, and local languages.',
    solution:
      'Built a mobile-first marketplace with offline capability, native MTN MoMo / Airtel Money checkout, and full Kinyarwanda localisation — all on a zero-cost infrastructure stack.',
    outcome: 'Active development as of June 2026. CI pipeline configured on GitHub Actions.',
    demoUrl: null,
    githubUrl: 'https://github.com/Enochrwa/soma-connect',
    imageUrl: '/images/chat.png',
    featured: false,
    year: 2025,
  },
  {
    slug: 'handyrwanda',
    title: 'HandyRwanda',
    tagline: 'Service marketplace connecting Rwandan clients with skilled artisans',
    description:
      'Full-stack marketplace platform for Rwanda with FastAPI backend, React web frontend, and React Native mobile app. Features job posting, bidding, voice messaging, and Rwanda administrative address hierarchy.',
    category: 'fullstack',
    tech: [
      'FastAPI',
      'Python',
      'React',
      'TypeScript',
      'React Native',
      'Expo',
      'PostgreSQL',
      'TanStack Query',
    ],
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
