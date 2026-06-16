import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';

const router = Router();

const GH_USER = 'enockuwumukiza';
const GH_BASE = 'https://api.github.com';

function ghHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

interface GHEvent {
  id: string;
  type: string;
  created_at: string;
  repo?: { name: string; url: string };
}

interface GHRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
}

// GET /api/github/activity — proxy GitHub events (avoids CORS + rate limit)
router.get('/activity', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(`${GH_BASE}/users/${GH_USER}/events?per_page=100`, {
      headers: ghHeaders(),
    });

    if (!response.ok) {
      logger.warn(`GitHub API returned ${response.status}`);
      return res.status(502).json({ error: 'GitHub API unavailable', events: [] });
    }

    const events = (await response.json()) as GHEvent[];
    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    return res.json({ events });
  } catch (err) {
    logger.error('GitHub activity fetch failed', err);
    return res.status(502).json({ error: 'Upstream error', events: [] });
  }
});

// GET /api/github/repos — public repos with star/fork stats
router.get('/repos', async (_req: Request, res: Response) => {
  try {
    const response = await fetch(
      `${GH_BASE}/users/${GH_USER}/repos?type=public&sort=pushed&per_page=30`,
      { headers: ghHeaders() }
    );

    if (!response.ok) {
      logger.warn(`GitHub repos API returned ${response.status}`);
      return res.status(502).json({ error: 'GitHub API unavailable', repos: [] });
    }

    const raw = (await response.json()) as GHRepo[];

    const repos = raw.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      forks: r.forks_count,
      watchers: r.watchers_count,
      language: r.language,
      topics: r.topics ?? [],
      pushedAt: r.pushed_at,
    }));

    res.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
    return res.json({ repos });
  } catch (err) {
    logger.error('GitHub repos fetch failed', err);
    return res.status(502).json({ error: 'Upstream error', repos: [] });
  }
});

export default router;
