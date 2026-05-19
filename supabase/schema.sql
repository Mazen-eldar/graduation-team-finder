-- ═══════════════════════════════════════════════════════════════════
--  مازن المنقذ — Supabase Database Schema
--  Run this in: Supabase Dashboard → SQL Editor → New query
-- ═══════════════════════════════════════════════════════════════════

-- 1. Create the registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name              TEXT NOT NULL,
  department        TEXT NOT NULL CHECK (department IN ('CS', 'SC', 'IS', 'AI')),
  track             TEXT NOT NULL,
  level             TEXT NOT NULL CHECK (level IN ('لسه بتعلم', 'Beginner', 'Mid-Level', 'Senior', 'فضائي')),
  contact_method    TEXT NOT NULL CHECK (contact_method IN ('WhatsApp', 'LinkedIn', 'Facebook', 'Telegram', 'Email')),
  contact_value     TEXT NOT NULL,
  rescue_percentage INTEGER NOT NULL DEFAULT 90 CHECK (rescue_percentage BETWEEN 0 AND 100),
  created_at        TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_registrations_created_at
  ON public.registrations (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_registrations_department
  ON public.registrations (department);

CREATE INDEX IF NOT EXISTS idx_registrations_level
  ON public.registrations (level);

-- 3. Row-Level Security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Allow public insert"
  ON public.registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service_role (admin) can read
CREATE POLICY "Allow service_role select"
  ON public.registrations
  FOR SELECT
  TO service_role
  USING (true);

-- 4. Useful view for analytics
CREATE OR REPLACE VIEW public.registration_stats AS
SELECT
  department,
  level,
  COUNT(*) AS count,
  DATE_TRUNC('day', created_at) AS day
FROM public.registrations
GROUP BY department, level, DATE_TRUNC('day', created_at)
ORDER BY day DESC;

-- 5. Sample data for testing (optional — comment out in production)
/*
INSERT INTO public.registrations (name, department, track, level, contact_method, contact_value, rescue_percentage)
VALUES
  ('أحمد محمد', 'CS', 'Web Development', 'Mid-Level', 'WhatsApp', '201001234567', 92),
  ('سارة علي', 'AI', 'Machine Learning', 'Senior', 'LinkedIn', 'sara-ali-ml', 87),
  ('محمد إبراهيم', 'SC', 'Penetration Testing', 'Beginner', 'Telegram', '@m_ibrahim', 95),
  ('نورا حسن', 'IS', 'Database Design', 'لسه بتعلم', 'Email', 'noura@example.com', 89),
  ('يوسف خالد', 'CS', 'Mobile Development', 'فضائي', 'WhatsApp', '201009876543', 98);
*/

-- Done! 🛡️ مازن المنقذ Database is ready.
