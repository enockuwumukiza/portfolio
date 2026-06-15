import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('4000'),

  // Database
  DATABASE_URL: z.string().optional(),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional(),
  FROM_EMAIL: z.string().email().default('onboarding@resend.dev'),
  TO_EMAIL: z.string().email().default('enockuwumukiza850@gmail.com'),

  // Auth (for admin dashboard if added later)
  JWT_SECRET: z.string().default('change-me-in-production'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Frontend
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),

  // Vercel
  VERCEL_URL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
