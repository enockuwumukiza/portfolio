# Enock Uwumukiza — Portfolio

**Full-stack developer portfolio** built as a monorepo with a React/TypeScript frontend and Node.js/Express backend.

🌍 From Kigali, building for the world.

---

## Project Structure

```
portfolio/
├── frontend/          # React + TypeScript + Vite + Tailwind (port 5173)
├── backend/           # Node.js + Express + TypeScript API (port 4000)
├── shared/            # Shared TypeScript types
├── .github/workflows/ # CI/CD (lint + type-check + build)
├── docker-compose.yml # Local full-stack dev with Postgres + Redis
└── package.json       # Root workspace scripts
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- npm 9+

### 1. Clone & install

```bash
git clone https://github.com/enockuwumukiza/portfolio.git
cd portfolio
cd frontend && npm install
cd ../backend && npm install
```

### 2. Environment variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Run in development

```bash
npm run dev:frontend   # http://localhost:5173
npm run dev:backend    # http://localhost:4000
```

### 4. Docker (full stack)

```bash
docker-compose up -d
```

---

## Backend API

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | /api/health          | Health check        |
| POST   | /api/contact         | Submit contact form |
| GET    | /api/projects        | Get all projects    |
| GET    | /api/projects/:slug  | Get single project  |
| POST   | /api/analytics/track | Track event         |
| GET    | /api/analytics/stats | Analytics summary   |
| GET    | /api/guestbook       | List guestbook entries |
| POST   | /api/guestbook       | Create guestbook entry |

---

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Shadcn/UI

**Backend:** Node.js, Express, TypeScript, Zod, Resend, Winston, Prisma

**DevOps:** Docker, GitHub Actions, Vercel

---

MIT © Enock Uwumukiza
