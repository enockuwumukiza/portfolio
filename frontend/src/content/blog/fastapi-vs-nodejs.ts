export const post = {
  slug: 'fastapi-vs-nodejs',
  title: "Why I Chose FastAPI Over Node.js for HandyRwanda's Backend",
  excerpt:
    'A pragmatic comparison from someone who has shipped both in production — not benchmarks, but real trade-offs on a real project with real constraints.',
  date: '2026-04-05',
  readingTime: '7 min read',
  tags: ['FastAPI', 'Node.js', 'Python', 'Backend', 'Architecture'],
  coverImage: '/images/blog/fastapi-nodejs-cover.jpg',
  content: `
## The Context

HandyRwanda needed a backend that could handle:
- REST API for the React + Expo apps
- Real-time (Socket.IO for job bidding and notifications)
- ML inference (earnings prediction, fraud detection)
- Payment webhooks from MTN MoMo and Airtel Money
- File uploads (profile photos, voice messages, job photos)

I'd built backends in both Node.js (eChat, this portfolio) and FastAPI (INZIRA EDRPS). For HandyRwanda, I chose FastAPI. Here's the honest breakdown.

## Where FastAPI Won

### 1. Pydantic is Zod Done Right

Both FastAPI and Express/Hono need schema validation. But Pydantic is deeper than Zod:

\`\`\`python
from pydantic import BaseModel, validator, Field
from enum import Enum

class JobStatus(str, Enum):
    OPEN = "open"
    ASSIGNED = "assigned"
    COMPLETED = "completed"

class CreateJobRequest(BaseModel):
    title: str = Field(min_length=5, max_length=120)
    category: str
    location_lat: float = Field(ge=-90, le=90)
    location_lng: float = Field(ge=-180, le=180)
    budget_rwf: int = Field(ge=500, description="Minimum 500 RWF")
    
    @validator('category')
    def valid_category(cls, v):
        allowed = ['plumbing', 'electrical', 'cleaning', 'carpentry']
        if v not in allowed:
            raise ValueError(f'Category must be one of: {allowed}')
        return v
\`\`\`

FastAPI auto-generates OpenAPI docs from this. No separate Swagger setup. The docs are always accurate because they come from the same code that validates the requests.

### 2. ML Integration is Native

The earnings predictor endpoint:

\`\`\`python
import joblib
import numpy as np
from fastapi import APIRouter

router = APIRouter()
model = joblib.load('models/earnings_v3.pkl')  # sklearn pipeline

@router.post('/predict')
async def predict_earnings(req: EarningsPredictRequest):
    features = np.array([[
        req.day_of_week,
        req.hour,
        req.category_encoded,
        req.historical_avg_rwf,
        req.is_rainy_season,
    ]])
    prediction = model.predict(features)[0]
    confidence = model.predict_proba(features).max()
    
    return {
        'predicted_rwf': round(prediction),
        'confidence': round(confidence, 2),
        'reasoning': explain_prediction(features, model)
    }
\`\`\`

In Node.js, this would be a Python microservice with an HTTP call between them. In FastAPI, it's an import.

### 3. Async That Actually Works

FastAPI runs on Starlette + uvicorn. True async, not Node's event loop with callbacks pretending to be async:

\`\`\`python
@router.post('/jobs/{job_id}/bid')
async def submit_bid(job_id: str, bid: BidRequest, db: AsyncSession = Depends(get_db)):
    # All truly concurrent — no blocking
    job, existing_bids = await asyncio.gather(
        get_job(db, job_id),
        get_bids_for_job(db, job_id)
    )
    
    if len(existing_bids) >= 10:
        raise HTTPException(status_code=409, detail='Bid limit reached')
    
    new_bid = await create_bid(db, job_id, bid)
    await sio.emit('bid:new', new_bid.dict(), room=f'job:{job_id}')
    
    return new_bid
\`\`\`

\`asyncio.gather\` runs the DB queries concurrently. The equivalent in Node with \`Promise.all\` looks similar but Python's typing makes it easier to reason about what's actually async.

## Where Node.js Would Have Won

### 1. The Ecosystem Gap is Real

\`\`\`
Need                    Node.js          Python/FastAPI
─────────────────────────────────────────────────────
PDF generation          pdfkit           weasyprint (heavy)
Email templating        mjml             none good
Rich text editor sync   yjs + ws         none
Browser automation      playwright       playwright (same!)
CSV parsing             papaparse        pandas (overkill)
\`\`\`

I hit the PDF gap hard. Provider invoices need to be PDFs. The Python options (ReportLab, WeasyPrint) are either verbose or require wkhtmltopdf. I ended up calling a lightweight Node.js microservice just for PDF generation. Ironic.

### 2. Deployment Complexity

Node.js on Railway: \`npm start\`. Done.

FastAPI on Railway: You need to specify uvicorn, configure workers, set \`--proxy-headers\` for proper IP detection behind Railway's proxy, and debug Python environment isolation. It's 3x more configuration.

### 3. Frontend Sharing

With Node.js, you could theoretically share TypeScript types between frontend and backend. With FastAPI + Python, the shared types need codegen or duplication. I use a script to generate TypeScript interfaces from Pydantic models, but it's friction.

## The Honest Answer

FastAPI won because of ML integration. That was the tie-breaker. For a project without ML, I'd probably pick **Hono.js** (not Express — Hono is what Express should have been in 2024) for the ecosystem and type-sharing benefits.

The real lesson: don't pick frameworks based on benchmarks or Twitter consensus. Pick based on what your specific app needs to do well. HandyRwanda needed to run ML models and validate complex financial data. FastAPI was the right tool.

## What I Use Now

- **FastAPI** — ML-adjacent projects, complex validation, when Python libs are needed
- **Hono.js** — Pure APIs, when frontend type-sharing matters, edge deployment
- **This portfolio's backend** — Express.js (existing), but I'd rewrite it in Hono if starting fresh

The best backend is the one your team can maintain. Language wars are less useful than deep knowledge of one.
`,
};
