-- ============================================================
-- Supabase Database Setup for LearnOS Dashboard
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  progress    integer NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name   text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (important!)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous/public read access (safe with anon key)
CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);

-- 4. Seed with initial course data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',       75, 'Layers'),
  ('System Design Fundamentals',    42, 'Network'),
  ('TypeScript Deep Dive',          90, 'Code2'),
  ('Next.js App Router Mastery',    60, 'Zap')
ON CONFLICT DO NOTHING;

-- ============================================================
-- Supported icon_name values (from Lucide React):
-- Layers, Network, Code2, Zap, Brain, Database,
-- Globe, Terminal, Cpu, BookOpen, FlaskConical, Palette
-- ============================================================
