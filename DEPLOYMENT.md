# 🚀 Deployment Guide — Enock Uwumukiza Portfolio

> Sprint 5 deployment instructions for **frontend → Vercel** and **backend → Render**.

---

## Frontend → Vercel

### One-time setup

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import `github.com/enockuwumukiza/portfolio`
2. Set **Root Directory** to `frontend`
3. Framework: **Vite** (auto-detected)
4. Set environment variables in the Vercel dashboard:

| Variable | Value |
|---|---|
| `VITE_API_URL` | `https://portfolio-backend.onrender.com/api` (your Render URL) |
| `VITE_SITE_URL` | `https://enockuwumukiza.dev` |
| `VITE_ENABLE_ANALYTICS` | `true` |

5. Click **Deploy**

### Custom domain

In Vercel project → **Settings → Domains** → Add `enockuwumukiza.dev`

Update DNS:
```
A    @    76.76.21.21
CNAME www  cname.vercel-dns.com
```

### Preview deploys

Every PR automatically gets a preview URL — no extra config needed.

---

## Backend → Render

### Option A: Automatic (render.yaml)

1. Go to [render.com](https://render.com) → **New → Blueprint**
2. Connect `github.com/enockuwumukiza/portfolio`
3. Render auto-reads `backend/render.yaml` and provisions:
   - Web service (Node.js, free tier)
   - PostgreSQL database (free tier)
4. Add missing secrets in Render dashboard:
   - `RESEND_API_KEY` → your Resend API key
   - `FRONTEND_URL` → your Vercel URL (after first Vercel deploy)

### Option B: Manual

1. **New Web Service** → Connect repo → Root Dir: `backend`
2. Build command: `npm ci && npx prisma generate && npm run build`
3. Start command: `npx prisma migrate deploy && node dist/index.js`
4. Health check path: `/api/health`
5. Add a **PostgreSQL** database → copy `DATABASE_URL` to env vars
6. Set all env vars from `backend/.env.example`

### Verify deployment

```bash
curl https://portfolio-backend.onrender.com/api/health
# Expected: {"status":"ok","uptime":...}
```

---

## CI/CD Pipeline (.github/workflows/ci.yml)

The pipeline runs on every push. To enable auto-deploy on merge to `main`, add these GitHub Secrets:

| Secret | Where to get it |
|---|---|
| `VERCEL_TOKEN` | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel → Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Vercel → Project → Settings → General |
| `RENDER_DEPLOY_HOOK_URL` | Render → Service → Settings → Deploy Hook |
| `VITE_API_URL` | Your Render backend URL |
| `VITE_SITE_URL` | Your Vercel frontend URL |

---

## First-deploy checklist

- [ ] Backend deployed and `/api/health` returns 200
- [ ] Frontend deployed and loads in browser
- [ ] `VITE_API_URL` in Vercel points to live backend
- [ ] `FRONTEND_URL` in Render points to live frontend (for CORS)
- [ ] Contact form sends email (test with a real message)
- [ ] Analytics fires (open DevTools → Network → filter `/analytics/track`)
- [ ] Resume download works (`/Enock_Resume.pdf`)
- [ ] Custom domain resolves (if configured)
- [ ] Lighthouse score ≥ 95 (run in Chrome DevTools → Lighthouse)

---

## Local development

```bash
# Root — installs all workspaces
npm install

# Frontend only
cd frontend && npm run dev     # → http://localhost:3000

# Backend only  
cd backend && npm run dev      # → http://localhost:4000

# Both at once (from root)
npm run dev
```

For backend dev with DB:
```bash
# Start Postgres via Docker Compose
docker-compose up postgres -d

# Copy env
cp backend/.env.example backend/.env
# Edit DATABASE_URL, RESEND_API_KEY

# Run migrations
cd backend && npx prisma migrate dev --name init
```
