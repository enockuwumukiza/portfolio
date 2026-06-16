export const post = {
  slug: 'building-handyrwanda',
  title: 'Building a Service Marketplace for Rwanda: What I Learned',
  excerpt:
    `HandyRwanda is a full-stack service marketplace connecting Rwandans with skilled tradespeople. Here's the technical journey, the hard decisions, and what I'd do differently.`,
  date: '2025-12-10',
  readingTime: '8 min read',
  tags: ['FastAPI', 'React Native', 'Socket.IO', 'MTN MoMo', 'PostgreSQL'],
  coverImage: '/images/blog/handyrwanda-cover.jpg',
  content: `
## The Problem

Rwanda's informal service economy is massive. Plumbers, electricians, cleaners, carpenters — they're everywhere, but finding and trusting one is hard. Word of mouth rules, and that means if you're new to Kigali, you're stuck.

HandyRwanda exists to solve that. A marketplace where you post a job, providers bid, you pick the best, pay via MTN Mobile Money, and both sides leave reviews. Simple concept — complex execution.

## The Stack Decision

I went with **FastAPI** (Python) for the backend. Here's why Node.js lost:

- **Type safety without fighting**: Python type hints + Pydantic give you runtime validation that's genuinely ergonomic. With Node.js + Zod, you're adding a library to fix a language weakness. With FastAPI, it's the default.
- **ML integration is zero-friction**: When I added earnings forecasting (sklearn LinearRegression for providers to predict weekly income), it was just a Python import. In Node, that would've been a microservice.
- **async is first-class**: FastAPI's async support via \`asyncio\` is mature. It's not bolted on.

The tradeoff? JavaScript fatigue is real across the stack. Backend Python, frontend React, mobile Expo — three mental contexts. I managed it with a strict naming convention and shared TypeScript types in a \`/shared\` directory synced via a Python Pydantic → TypeScript codegen script.

## Real-Time: Socket.IO Over Raw WebSockets

I started with raw WebSockets. Mistake.

**The problem**: Provider location updates (every 3 seconds), job status changes, in-app notifications — these need rooms, namespaces, reconnection logic, and fallbacks. Raw WebSockets give you none of that.

Switching to Socket.IO gave me:

\`\`\`python
# Backend: FastAPI + python-socketio
import socketio
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins=[])

@sio.on('job:bid')
async def handle_bid(sid, data):
    job_id = data['job_id']
    await sio.emit('bid:received', data, room=f'job:{job_id}')
    await notify_customer(job_id, data)
\`\`\`

\`\`\`typescript
// React Native client
import { io } from 'socket.io-client';
const socket = io(API_URL, { transports: ['websocket'] });

socket.on('bid:received', (bid) => {
  dispatch(addBid(bid));
  Notifications.scheduleNotificationAsync({...});
});
\`\`\`

Reconnection and room management — handled. I gained 400 lines of code back.

## MTN Mobile Money Integration

This was the hardest part. MTN MoMo's API is documented in PDF files from 2019. No SDK. Sandbox environment that breaks on Fridays.

My approach:

1. **Wrap everything in a retry layer**: MTN's API is flaky. Every payment request gets 3 retries with exponential backoff.
2. **Idempotency keys**: Each payment has a UUID tied to the job. Duplicate callbacks (MTN sends them) are no-ops.
3. **Webhook-first**: Never trust the initial API response. Always wait for the webhook to confirm.

\`\`\`python
async def initiate_payment(job_id: str, amount: int, phone: str) -> PaymentIntent:
    idempotency_key = str(uuid.uuid5(uuid.NAMESPACE_URL, job_id))
    
    for attempt in range(3):
        try:
            resp = await mtn_client.post(
                '/collection/v1_0/requesttopay',
                headers={'X-Reference-Id': idempotency_key},
                json={'amount': amount, 'currency': 'RWF', 'payer': {'partyId': phone}}
            )
            if resp.status_code == 202:
                return PaymentIntent(id=idempotency_key, status='pending')
        except httpx.TimeoutException:
            await asyncio.sleep(2 ** attempt)
    
    raise PaymentError('MTN MoMo unreachable after 3 attempts')
\`\`\`

## The ML Earnings Predictor

Providers asked: "How much will I make this week?" I built a simple prediction endpoint:

- **Features**: day of week, time of day, provider category, historical average, weather (yes, really — rain spikes plumber requests)
- **Model**: sklearn LinearRegression — not glamorous, but R² of 0.74 on validation set
- **Served via**: FastAPI endpoint, cached with Redis for 6 hours

The insight: ML doesn't need to be deep learning to be valuable. A provider knowing "Tuesday mornings are slow, post promotions Monday night" changes their behavior.

## What I'd Do Differently

1. **Start with a monorepo from day one.** I spent 3 sprints migrating to Turborepo. It should've been the foundation.
2. **Redis from sprint 1.** I added it in sprint 5. Session management, rate limiting, and Socket.IO adapter all needed it. It's a first-class dependency, not an optimization.
3. **Test the offline experience earlier.** Rwanda's internet is good in Kigali, patchy elsewhere. Expo's NetInfo + an optimistic UI queue should've been sprint 2 work.

## What's Next

Sprint 10 is live messaging between customers and providers — encrypted E2E using libsodium. After that: service provider credit scoring (can we predict who completes jobs on time?) and Kigali-first maps using custom OSM tiles.

The code lives at [github.com/Enochrwa/HandyRwanda](https://github.com/Enochrwa/HandyRwanda). Issues, PRs, and harsh feedback all welcome.
`,
};