# 🚀 Portfolio Upgrade Sprint Plan — v2
## Enock Uwumukiza — World-Class Full-Stack Developer Portfolio

> **Goal:** Transform the current portfolio from "impressive starter" into a globally award-worthy experience — the kind of site that wins Awwwards SOTD, gets shared on Twitter, and makes recruiters and clients remember Enock above every other candidate.
>
> **Benchmarks studied:** Bruno Simon, Brittany Chiang, Lusion, Cyd Stumpel, Samsy (WebGPU), Jordan Breton (FWA winner), Grégory Lallé, Sharlee, Adenekan Wonderful, and 15+ Awwwards Portfolio Honor winners.
>
> **Updated:** June 2026 — reflects completed monorepo restructure.

---

## ✅ Completed: Monorepo Restructure (Done — June 2026)

The entire repository has been restructured into a production-grade fullstack monorepo. All items below are **shipped and pushed to `main`**.

```
portfolio/
├── frontend/                  ✅ React 18 + TypeScript + Vite + Tailwind + Framer Motion
│   ├── src/                   ✅ All components, pages, hooks, lib
│   ├── public/                ✅ Images, resume PDF, robots.txt
│   ├── Dockerfile             ✅ Multi-stage: Node build → nginx serve
│   ├── nginx.conf             ✅ SPA routing + 1yr asset cache + security headers
│   ├── vercel.json            ✅ Vercel deploy config + SPA rewrites + security headers
│   └── .env.example           ✅ VITE_API_URL, VITE_SITE_URL, feature flags
├── backend/                   ✅ Node.js + Express + TypeScript (port 4000)
│   ├── src/
│   │   ├── app.ts             ✅ Helmet, CORS, dual rate limiting, compression, morgan
│   │   ├── index.ts           ✅ Server bootstrap + graceful SIGTERM shutdown
│   │   ├── config/            ✅ Zod env validation, CORS whitelist
│   │   ├── controllers/       ✅ contact, project, analytics
│   │   ├── middleware/        ✅ Zod-aware errorHandler, notFound
│   │   ├── models/            ✅ projects.data.ts — full case-study schema (4 projects)
│   │   ├── routes/            ✅ health, contact (rate-limited), projects, analytics
│   │   ├── services/          ✅ Resend email with branded HTML template
│   │   └── utils/             ✅ Winston logger (colorized dev / JSON prod)
│   ├── prisma/schema.prisma   ✅ ContactMessage + AnalyticsEvent models
│   ├── Dockerfile             ✅ Multi-stage production Node build
│   └── .env.example           ✅ RESEND_API_KEY, DATABASE_URL, JWT_SECRET
├── shared/types/index.ts      ✅ Shared TS contracts (ContactFormData, Project, ApiResponse)
├── docker-compose.yml         ✅ PostgreSQL + Redis + backend + frontend services
├── .github/workflows/ci.yml   ✅ Frontend + backend lint / typecheck / build CI
├── .gitignore                 ✅ Covers node_modules, .env, dist, logs, prisma DB
├── .prettierrc                ✅ Unified formatter (singleQuote, 100 width, LF)
└── package.json               ✅ Root workspace scripts (dev, build, lint, format, clean)
```

**Backend API (live at port 4000):**

| Method | Endpoint | Status | Notes |
|--------|----------|--------|-------|
| GET | `/api/health` | ✅ | Uptime + env + version |
| POST | `/api/contact` | ✅ | Zod validated → Resend email, 5 msg/hr limit |
| GET | `/api/projects` | ✅ | All 4 projects with full case-study data |
| GET | `/api/projects/:slug` | ✅ | Single project by slug |
| POST | `/api/analytics/track` | ✅ | 6 event types, in-memory (ready for DB) |
| GET | `/api/analytics/stats` | ✅ | Event count summary |

---

## Audit: Current State vs. World-Class

| Dimension | Current State (post-restructure) | World-Class Target |
|---|---|---|
| **Monorepo structure** | ✅ Done — frontend / backend / shared / docker | — |
| **Backend API** | ✅ Done — Express + Zod + Resend + rate limiting | — |
| **CI/CD pipeline** | ✅ Done — GitHub Actions on push/PR | Add deploy step (Sprint 5) |
| **Docker** | ✅ Done — compose with Postgres + Redis | — |
| **Visual identity** | ❌ Generic blue/purple gradient, floating orbs | Unique, narrative-driven aesthetic |
| **Hero** | ❌ Typing animation + Math.random() orbs | Immersive, interactive centerpiece |
| **Scroll experience** | ❌ Standard browser scroll | Lenis inertia scroll + scroll-driven reveals |
| **Contact form** | ❌ Form UI exists, not wired to backend | Wire to `/api/contact` — backend is ready |
| **Projects** | ⚠️ 3 basic cards (backend has 4 case studies) | Frontend consumes API, video previews |
| **Skills** | ❌ Outdated progress bars | Interactive constellation or tech radar |
| **Performance** | ❌ Bundle not audited, no lazy loading | Lighthouse 95+, Core Web Vitals green |
| **SEO / OG** | ❌ No metadata | Full OpenGraph + JSON-LD Person schema |
| **Personality** | ❌ Generic dev clichés | Authentic Rwanda/Africa developer voice |
| **Accessibility** | ❌ Missing alt text, no focus styles | WCAG 2.1 AA |
| **Mobile** | ⚠️ Responsive but untested | Delightful on mobile, gesture interactions |
| **Dark/Light mode** | ❌ Dark only | System-aware, smooth transition |
| **Custom cursor** | ❌ None | Branded cursor with interaction states |
| **Blog** | ❌ None | MDX blog — thought leadership |
| **Analytics** | ⚠️ Backend endpoint exists, not wired to UI | Frontend fires events to `/api/analytics/track` |
| **Deployment** | ❌ Not deployed | Vercel (frontend) + Railway/Render (backend) |

---

## Sprint 1 — Foundation & Identity Redesign
**Duration:** 1 week
**Theme:** "Before you build on sand, build on bedrock."
**Working directory:** `frontend/`

### 1.1 — Rebrand & Design System Overhaul
**What to build:**
- Define a unique visual identity. Choose one:
  - **Option A — "African Tech Noir" (Recommended):** Deep warm blacks (`#0D0A06`), amber-gold accents (`#F5A623`), cream text (`#F5F2EE`) — warmth and distinctiveness, rooted in Rwanda
  - **Option B — "Minimal Brutalist":** Off-white background, heavy black typography, single bold accent (electric green or burnt orange)
  - **Option C — "Glassmorphism Pro":** Rich navy (`#050D1F`), frosted glass cards, ultra-thin borders, one signature hue
- Update `frontend/src/index.css` CSS custom properties to reflect the chosen identity systemically — no hardcoded colors in component files
- Define a typography scale: **Clash Display** (headings) + **Inter** or **DM Sans** (body) — import via `frontend/index.html`
- Update `frontend/tailwind.config.ts` to extend theme with brand tokens

**Files to touch:** `frontend/src/index.css`, `frontend/tailwind.config.ts`, `frontend/index.html`

### 1.2 — Smooth Scroll with Lenis
**What to build:**
- `cd frontend && npm install lenis`
- Create `frontend/src/hooks/useLenis.ts` — initialize Lenis, expose RAF loop
- Wrap `frontend/src/App.tsx` with a `<SmoothScrollProvider>`
- Integrate Lenis with Framer Motion's `useScroll` for scroll-driven animations

**Why:** Every Awwwards winner uses inertia scroll. Single biggest perceived-quality upgrade for near-zero effort.

### 1.3 — Custom Cursor
**What to build:**
- `frontend/src/components/CustomCursor.tsx`
- Small dot + larger ring follower with Framer Motion `useSpring` physics
- States: `default`, `hover` (expand + label), `click` (compress), `text` (I-beam)
- Disable on touch devices via `matchMedia('(pointer: coarse)')`
- Register in `frontend/src/App.tsx` at root level

### 1.4 — Loading Screen
**What to build:**
- `frontend/src/components/LoadingScreen.tsx` — full-screen intro, once per session
- SVG stroke-dasharray animation drawing the `EU` initials
- Progress bar counting to 100%
- Smooth fade-out transition handing off to main page
- `sessionStorage.setItem('hasLoaded', 'true')` guard — plays only on first visit

### 1.5 — SEO & Metadata
**What to build:**
- `cd frontend && npm install react-helmet-async`
- `frontend/src/components/SEO.tsx` — reusable metadata component
- OpenGraph: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type`
- Twitter Card: `twitter:card`, `twitter:creator`, `twitter:image`
- JSON-LD `Person` schema: name, jobTitle, url, sameAs (GitHub, LinkedIn)
- Update `frontend/index.html`: base title, description, favicon (SVG with EU initials), theme-color

---

## Sprint 2 — Hero & Navigation Transformation
**Duration:** 1 week
**Theme:** "The first 5 seconds decide everything."
**Working directory:** `frontend/`

### 2.1 — Hero Section Full Rebuild
**Current bugs to fix first (in `frontend/src/components/Hero.tsx`):**
- Remove `Math.random()` in orb positioning (lines 53–58) — causes flicker on every re-render
- Remove `<style jsx>` block — move keyframes to `frontend/src/index.css` under `@layer components`
- Fix resume download path: currently `/resume.pdf` → must be `/Enock_Resume.pdf` (matches `frontend/public/Enock_Resume.pdf`)
- Remove floating code symbols (`{`, `}`, `<`) — feel template-ish

**What to build — Option A (Recommended, fastest):**
- Full-viewport Canvas particle constellation: `cd frontend && npm install @tsparticles/react @tsparticles/slim`
- Particles react to mouse proximity (push/attract), connect with lines at short range
- Name renders with **text-reveal** (slide-up characters with stagger via Framer Motion) — NOT typing
- Headline: `"From Kigali, building for the world."` — one clear, memorable, authentic sentence
- Subtitle: one sentence, no "cutting-edge" or "crafting" clichés
- CTA hierarchy: primary = `"See My Work"` (scroll to Projects), secondary = `"Download Resume"`
- Single consolidated social links row (currently duplicated across sections)
- Elegant scroll indicator (single animated arrow, not triple chevron)

**Option B (High-impact, longer build):**
- `cd frontend && npm install three @react-three/fiber @react-three/drei`
- Low-poly floating abstract 3D form with `<Float>` and `<Environment>` from drei
- Transparent background overlaid on existing dark gradient
- `prefers-reduced-motion` fallback → static gradient only
- Mobile fallback → 2D hero (skip canvas/WebGL entirely)

### 2.2 — Navigation Redesign (`frontend/src/components/Navigation.tsx`)
**What to build:**
- Sticky nav: blur + `backdrop-filter` background activates on scroll > 80px
- Active section detection via `IntersectionObserver` — highlight current nav link
- Mobile: hamburger → full-screen overlay with large nav links (not a dropdown)
- Scroll progress bar at very top of viewport (`position: fixed; top: 0; height: 2px`)
- Dark/light mode toggle button (wired in Sprint 3.5)
- Nav link active state using Framer Motion `layoutId="underline"` shared animation

---

## Sprint 3 — Frontend Sections Upgrade + API Integration
**Duration:** 1.5 weeks
**Theme:** "Substance matches style — and the backend is already built."
**Key insight:** The Node.js backend has rich project data and a working contact endpoint. This sprint wires the frontend to consume them.

### 3.1 — Contact Form → Wire to Backend API
**This is the lowest-effort, highest-impact sprint item.** The backend `/api/contact` endpoint is fully built with Zod validation, Resend email, and rate limiting. The frontend form UI exists. They just need to be connected.

**What to build in `frontend/src/components/Contact.tsx`:**
- Replace the dummy `handleSubmit` with a real `fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })`
- Use `react-hook-form` + `zod` (both already installed) for client-side validation matching the backend schema
- Loading spinner state on submit button
- Success toast: "Message received! I'll get back to you within 24 hours." (use installed `sonner`)
- Error toast with retry prompt
- Add Calendly embed or link: `"Book a 30-min call"` for higher-intent visitors
- Add "Usually responds within 24 hours" badge

**Environment:** `frontend/.env` → `VITE_API_URL=http://localhost:4000/api`

### 3.2 — Projects Section — Consume Backend API
**Current bugs to fix in `frontend/src/components/Projects.tsx`:**
- `<img src={project?.image}/>` — missing `alt`, missing `object-fit: cover`
- `<Link>` used for external URLs — replace with `<a target="_blank" rel="noopener noreferrer">`
- Demo links go to `"#"` — backend now has real `demoUrl` and `githubUrl` per project

**What to build:**
- Replace hardcoded project array with `useQuery` (TanStack Query, already installed) fetching from `GET /api/projects`
- Loading skeleton cards while fetching (use existing `Skeleton` component from `frontend/src/components/ui/skeleton.tsx`)
- Error state with retry
- The backend returns `problem`, `solution`, `outcome` fields — surface them in an expandable "Case Study" drawer per project card
- Video preview on hover: short `.webm` looping clip, muted, autoplay on hover, pause on mouse-leave
- Project filter tabs: All | Full-Stack | ML/AI | Real-Time | Mobile — animate with Framer Motion `AnimatePresence`
- Featured project (`featured: true`) gets full-width hero treatment at top
- Fix `<img>` → `<img alt={project.title} className="object-cover w-full h-full" />`

### 3.3 — Analytics: Wire Frontend Events to Backend
**Backend `/api/analytics/track` is ready. Frontend just needs to fire events.**

**What to build:**
- `frontend/src/lib/analytics.ts` — thin wrapper:
  ```ts
  export const track = (event: AnalyticsEvent, meta?: Record<string, unknown>) =>
    fetch(`${import.meta.env.VITE_API_URL}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, meta }),
    }).catch(() => {}); // fire-and-forget, never block UX
  ```
- Fire `page_view` in `frontend/src/pages/Index.tsx` on mount
- Fire `project_click` when a project demo/github link is clicked
- Fire `resume_download` when the resume button is clicked
- Fire `contact_open` when the Contact section enters viewport
- Fire `github_click` / `linkedin_click` on social link clicks
- Guard with `VITE_ENABLE_ANALYTICS=true` feature flag (already in `frontend/.env.example`)

### 3.4 — About Section Rebuild (`frontend/src/components/About.tsx`)
**What to build:**
- Professional headshot or SVG illustrated avatar in brand colors
- Replace stat cards (3+, 10+, 5+) with a vertical **career timeline** component: date range, role, context, key achievement
- Personal philosophy quote: replace the generic one with something authentic to Enock's story — building tech from Rwanda for the world
- Animated skill badges: scroll-enter stagger via Framer Motion `variants` with `staggerChildren`
- "Currently building" live chip: `🚧 HandyRwanda — Sprint 7 shipped`

### 3.5 — Skills Section Rebuild (`frontend/src/components/Skills.tsx`)
**Kill the progress bars.** They are the single most mocked pattern in developer portfolios — arbitrary percentages ("95% React") communicate nothing.

**What to build — replace with:**
- **Tech Grid with context:** SVG icon grid (Devicons or inline SVGs) grouped by category
- Hover tooltip per skill: "Used in: HandyRwanda, eChat" — concrete, not percentages
- "Currently learning" row at the bottom: 2-3 active technologies (shows growth mindset)
- Optional: interactive SVG constellation where skill nodes are sized by usage depth

### 3.6 — Dark / Light Mode
**What to build:**
- `next-themes` is already installed — wire it up properly
- Add `<ThemeProvider>` wrapping `frontend/src/App.tsx`
- System preference on first load, `localStorage` persistence after
- Add `transition-colors duration-300` to `body` in `frontend/src/index.css` — smooth switch
- Audit all components to work in both modes
- Toggle button in Navigation (Sprint 2.2 placeholder)

---

## Sprint 4 — Blog, Terminal Easter Egg & Experience Section
**Duration:** 1 week
**Working directory:** `frontend/`

### 4.1 — MDX Blog
**What to build:**
- `cd frontend && npm install @mdx-js/rollup gray-matter`
- Update `frontend/vite.config.ts` to include MDX rollup plugin
- `frontend/src/content/blog/` — directory for `.mdx` posts
- Route: `/blog` (list) and `/blog/:slug` (post) — add to `frontend/src/App.tsx` routes
- Seed with 3 posts:
  - `building-handyrwanda.mdx` — "Building a Service Marketplace for Rwanda: What I Learned"
  - `voice-messaging-react-native.mdx` — "End-to-End Voice Messaging in React Native: Sprint 7 Debrief"
  - `fastapi-vs-nodejs.mdx` — "Why I Chose FastAPI Over Node.js for HandyRwanda's Backend"
- Syntax highlighting with `rehype-highlight` or `rehype-pretty-code`
- Reading time estimate (`reading-time` package)
- Open Graph tags per post via `frontend/src/components/SEO.tsx`

**Why it matters:** Blog posts = SEO gold + proof of communication skills. A developer who writes is rare and memorable.

### 4.2 — Terminal Easter Egg (Elevate Existing Component)
`frontend/src/components/TerminalEmulator.tsx` exists but isn't surfaced anywhere. Make it a memorable hidden feature.

**What to build:**
- Trigger: Konami code (`↑↑↓↓←→←→BA`) OR keyboard shortcut `Ctrl + ~`
- Renders as a **draggable floating modal** using Framer Motion `drag` with boundary constraints
- Commands to implement:
  - `help` — list all available commands
  - `whoami` — ASCII art banner + Enock's bio
  - `skills` — categorized tech stack
  - `projects` — list with slugs and GitHub URLs (pull from backend if available)
  - `contact` — show email + LinkedIn
  - `blog` — list recent posts
  - `sudo hire enock` — trigger confetti animation + a fun response
  - `clear` — clear output
  - `exit` / `q` — close the terminal
- Blinking cursor, command history with arrow keys, tab autocomplete
- Registers the Konami sequence listener in `frontend/src/App.tsx`

### 4.3 — Experience Section Enhancement (`frontend/src/components/Experience.tsx`)
**What to build:**
- Company logo / icon per role
- Tech stack badges per role (using existing `Badge` component)
- Max 2 key achievements per role — force prioritization, no walls of text
- Expandable "Read more" for older/longer entries using Framer Motion `AnimatePresence`
- If no employment history yet: rename to "Open Source & Freelance" — HandyRwanda, eChat, AI Wardrobe, Resume Builder all qualify

---

## Sprint 5 — Performance, Accessibility & Deployment
**Duration:** 1 week
**Theme:** "Fast is a feature. Accessible is non-negotiable."

### 5.1 — Frontend Performance Optimization
**Working directory:** `frontend/`

**What to fix:**
- All `<img>` tags → add `loading="lazy"`, `width`, `height`, `alt`
- Convert project images in `frontend/public/images/` to `.webp` (saves 30–50%)
- `<link rel="preload">` in `frontend/index.html` for hero font and critical CSS
- `React.lazy` + `Suspense` for all below-the-fold section components in `frontend/src/pages/Index.tsx`
- Audit and remove unused Radix UI packages from `frontend/package.json` (30+ installed, ~10 actually used)
- Run: `cd frontend && npx vite-bundle-visualizer` — identify and split large chunks
- Target: FCP < 1.2s, TBT < 200ms, LCP < 2.5s

### 5.2 — Accessibility Audit
**What to fix across `frontend/src/components/`:**
- All `<img>` tags → descriptive `alt` (currently `<img src={project?.image}/>` has no alt anywhere)
- All icon-only buttons → `aria-label`
- Add visible `:focus-visible` styles to `frontend/src/index.css` (stripped by Tailwind reset)
- Color contrast audit — all text must pass WCAG AA (4.5:1 minimum)
- Keyboard nav: all interactive elements reachable via Tab, interactive via Enter/Space
- `useReducedMotion()` in every Framer Motion component — instant transition fallback when set

### 5.3 — Mobile Polish
**What to fix:**
- Deterministic orb positions (post Hero rebuild from Sprint 2 — no more `Math.random()`)
- Hero text overflow test on 375px (iPhone SE) — `text-4xl sm:text-7xl md:text-9xl` is aggressive
- Project card hover states → tap states (`:active` pseudo-class or `onTouchStart` handlers)
- Navigation mobile overlay → swipe-down or swipe-left to close (Framer Motion `drag` + `dragConstraints`)
- Custom cursor disabled on touch devices (Sprint 1.3 handles this)

### 5.4 — Frontend Deployment (Vercel)
**What to build:**
- Connect `github.com/enockuwumukiza/portfolio` to Vercel
- Set **Root Directory** to `frontend` in Vercel project settings
- `frontend/vercel.json` is already committed with SPA rewrites + security headers ✅
- Set environment variables in Vercel dashboard:
  - `VITE_API_URL` = backend production URL
  - `VITE_SITE_URL` = `https://enockuwumukiza.dev` (or chosen domain)
  - `VITE_ENABLE_ANALYTICS=true`
- Enable **Preview Deployments** — every PR gets a live URL
- Custom domain: `enockuwumukiza.dev` or `enock.dev`
- Update CI in `.github/workflows/ci.yml` to add Vercel deploy step on merge to `main`

### 5.5 — Backend Deployment (Railway or Render)
**What to build:**
- Deploy `backend/` to **Railway** (recommended) or **Render** (free tier)
- Railway: connect repo, set root to `backend/`, set `npm run build && npm start` as start command
- Set environment variables:
  - `NODE_ENV=production`
  - `RESEND_API_KEY=re_xxx`
  - `DATABASE_URL=postgresql://...` (Railway provisions Postgres automatically)
  - `FRONTEND_URL=https://enockuwumukiza.dev`
  - `JWT_SECRET=<random 64-char string>`
- Run Prisma migration on first deploy: `npx prisma migrate deploy`
- Once DATABASE_URL is set, update `backend/src/controllers/analytics.controller.ts` to persist events to Prisma instead of in-memory array
- Update `backend/src/controllers/contact.controller.ts` to also persist messages to `ContactMessage` model (currently only emails via Resend)
- Update CI `.github/workflows/ci.yml` — add backend deploy step post-merge

### 5.6 — Update CI/CD for Full Deploy Pipeline
**Update `.github/workflows/ci.yml`:**
```yaml
# Add after existing lint/build jobs:
deploy-frontend:
  needs: [frontend]
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        working-directory: frontend
        vercel-args: '--prod'

deploy-backend:
  needs: [backend]
  if: github.ref == 'refs/heads/main'
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: railwayapp/railway-github-action@v1  # or Render deploy hook
      with:
        railway-token: ${{ secrets.RAILWAY_TOKEN }}
```

---

## Sprint 6 — Differentiators & World-Class Polish
**Duration:** 1 week
**Theme:** "The 1% that separates good from unforgettable."

### 6.1 — "Currently Building" Live Banner
**What to build:**
- Subtle sticky top banner or section widget in `frontend/src/components/Hero.tsx` or `Navigation.tsx`
- Content: `🚧 Currently building: HandyRwanda — Sprint 7 shipped voice messaging`
- Links to GitHub
- Dismissable with `localStorage` persistence
- Shows Enock is active, not a portfolio-and-forget developer

### 6.2 — GitHub Activity Heatmap
**What to build:**
- `frontend/src/components/GitHubActivity.tsx`
- Fetch via GitHub REST API: `https://api.github.com/users/enockuwumukiza/events`
- Display a contribution-style heatmap (12 weeks × 7 days grid)
- Backend proxy option: add `GET /api/github/activity` to `backend/src/routes/` to avoid CORS + rate limit issues
- Place in About or Skills section
- Powerful social proof — shows consistent, daily coding activity

### 6.3 — Testimonials / Social Proof
**What to build:**
- `frontend/src/components/Testimonials.tsx`
- Even 2-3 genuine quotes from collaborators, mentors, or open-source contributors
- Framer Motion card carousel (no extra library needed)
- If no testimonials yet: replace with GitHub repository stats (stars, forks, watchers) fetched from GitHub API — wire through `GET /api/github/repos` on the backend

### 6.4 — Page Transitions
**What to build:**
- Wrap `<Routes>` in `AnimatePresence` in `frontend/src/App.tsx`
- Each page slides or cross-fades on mount/unmount
- Navigation stays `position: fixed` so it doesn't participate in the transition
- Blog post → back to blog list: shared layout animation with Framer Motion `layoutId`

### 6.5 — Footer Upgrade (`frontend/src/components/Footer.tsx`)
**What to build:**
- Full-width CTA headline: `"Let's build something together."` with contact button
- "Designed & built by Enock Uwumukiza" with link to this repo
- Links: GitHub, LinkedIn, Email, Blog, Resume download
- Live clock showing current time in Kigali, Rwanda 🇷🇼 (`Intl.DateTimeFormat` + `useEffect`)
- "Open to new opportunities" badge — toggle visibility from a config variable
- Subtle animated divider above the footer

### 6.6 — Favicon, PWA & Final Meta
**What to build:**
- Custom SVG favicon: `EU` initials in brand accent color — place at `frontend/public/favicon.svg`
- Update `frontend/index.html`: `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`
- `frontend/public/manifest.json` for PWA installability
- `apple-touch-icon.png` (180×180) at `frontend/public/`
- `theme-color` meta tag in `frontend/index.html` matching brand primary
- `frontend/public/robots.txt` — already exists, confirm `Sitemap:` line points to production URL

---

## Backlog (Post-MVP, High-Value)

| Item | Why It Matters | Backend Work Needed |
|---|---|---|
| **Three.js hero** | Bruno Simon territory — most memorable category | None |
| **AI chatbot ("Ask me anything")** | Claude API answers questions about Enock using resume as context | Add `POST /api/chat` route in backend |
| **Case study deep-dives** | `/projects/:slug` full page — backend already has `problem/solution/outcome` data | None — data is ready |
| **Prisma persistence for analytics** | Replace in-memory event store with real DB | Update `analytics.controller.ts` |
| **Admin dashboard** | View contact messages + analytics at `/admin` — JWT auth skeleton is already in env | Add auth middleware + admin routes |
| **Video intro** | 60-second "who I am" video in About section | None |
| **Interactive résumé page** | `/resume` — web-native, ATS-readable, printable | None |
| **Notion/CMS integration** | Manage blog posts from Notion without code | Add Notion API client to backend |

---

## Priority Order (If Bandwidth Is Limited)

If you can only do 3 sprints, do these in order:

1. **Sprint 3.1** (wire Contact form to backend) — backend is already built, this is a 2-hour task with massive UX impact
2. **Sprint 5.4 + 5.5** (deploy frontend + backend) — nothing matters until it's live and indexed
3. **Sprint 1** (Lenis + custom cursor + design system + SEO) — biggest perceived quality jump

---

## Technical Debt to Fix Before Adding Features

All paths updated to reflect new monorepo structure:

| Bug | Location | Fix |
|---|---|---|
| `Math.random()` in render | `frontend/src/components/Hero.tsx` lines 53–58 | Replace with deterministic CSS `nth-child` positions |
| `<img>` missing `alt` prop | `frontend/src/components/Projects.tsx` | Add descriptive alt per project |
| External URLs using `<Link>` | `frontend/src/components/Projects.tsx` | Replace with `<a target="_blank" rel="noopener noreferrer">` |
| `<style jsx>` in Hero | `frontend/src/components/Hero.tsx` | Move keyframes to `frontend/src/index.css` under `@layer` |
| Resume download path mismatch | `frontend/src/components/Hero.tsx` | `/resume.pdf` → `/Enock_Resume.pdf` |
| Contact form not wired | `frontend/src/components/Contact.tsx` | Fetch `POST /api/contact` (Sprint 3.1) |
| Analytics backend not consumed | `frontend/src/` | Implement `frontend/src/lib/analytics.ts` (Sprint 3.3) |
| Projects data hardcoded in frontend | `frontend/src/components/Projects.tsx` | Fetch from `GET /api/projects` — backend is ready (Sprint 3.2) |
| In-memory analytics store | `backend/src/controllers/analytics.controller.ts` | Persist to Prisma `AnalyticsEvent` model (post-deploy) |
| In-memory contact log | `backend/src/controllers/contact.controller.ts` | Persist to Prisma `ContactMessage` model (post-deploy) |

---

## Definition of Done: "World-Class Portfolio"

The portfolio earns that title when:

- [ ] Lighthouse score ≥ 95 on Performance, Accessibility, Best Practices, SEO
- [ ] Core Web Vitals all green in production (CrUX data)
- [ ] Contact form successfully delivers email via Resend in production
- [ ] Analytics backend persisting events to PostgreSQL (not in-memory)
- [ ] Both frontend (Vercel) and backend (Railway/Render) deployed and healthy
- [ ] CI pipeline: lint + typecheck + build + deploy all green on `main`
- [ ] Submitted to Awwwards (free submission), CSS Design Awards, The FWA
- [ ] Featured on Twitter/X by at least one developer with 1k+ followers
- [ ] Resume download tracked — 50+ downloads in first month
- [ ] Contact form — 3+ genuine inbound inquiries in first month
- [ ] Portfolio ranks #1 on Google for "Enock Uwumukiza"
- [ ] Mobile experience tested on a physical device — feels as good as desktop

---

*Sprint plan v2 — updated June 2026 after monorepo restructure*
*Repo: github.com/enockuwumukiza/portfolio*
