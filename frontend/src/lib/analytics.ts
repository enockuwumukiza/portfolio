const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';
const ENABLED = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

export type AnalyticsEvent =
  | 'page_view'
  | 'project_click'
  | 'resume_download'
  | 'contact_open'
  | 'github_click'
  | 'linkedin_click'
  | 'email_click';

export function track(event: AnalyticsEvent, meta?: Record<string, unknown>): void {
  if (!ENABLED) return;
  // Fire-and-forget — never block UX
  fetch(`${API_URL}/analytics/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, meta }),
    keepalive: true,
  }).catch(() => {
    // Intentionally silent — analytics must never cause errors
  });
}
