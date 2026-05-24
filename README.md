# LearnOS — Next-Gen Student Dashboard

A high-fidelity, production-quality student learning dashboard built as a frontend internship challenge submission.

## 🚀 Live Demo

- **GitHub:** https://github.com/Chsudheer25/learn-os-dashboard
- **Vercel:** *(deploy link — add after Vercel deployment succeeds)*

---

## 🧱 Architecture Overview

```
app/
├── layout.tsx        — Root layout (dark mode, Google Fonts via next/font)
├── page.tsx          — Dashboard page (Server Component, Suspense orchestration)
├── loading.tsx       — Streaming skeleton UI
└── error.tsx         — Graceful Supabase error boundary (Client Component)

components/
├── layout/
│   ├── Sidebar.tsx   — Collapsible sidebar (Client Component, layoutId animation)
│   └── MobileNav.tsx — Bottom nav for mobile (Client Component)
├── bento/
│   ├── BentoGrid.tsx    — Stagger container (Framer Motion)
│   ├── HeroTile.tsx     — Greeting + streak (Client Component)
│   ├── ActivityTile.tsx — Contribution heatmap (Client Component)
│   ├── CourseList.tsx   — 🔴 Data fetching (Server Component)
│   ├── CourseTile.tsx   — Individual course card (Client Component)
│   └── SkeletonTile.tsx — Pulsing skeleton (Client Component)
└── ui/
    └── ProgressBar.tsx  — Spring-animated bar (Client Component)

lib/supabase/
└── server.ts   — createSupabaseServerClient() using @supabase/ssr
types/
└── database.ts — TypeScript interfaces for Supabase schema
```

---

## ⚙️ Server vs. Client Component Split

This was the most deliberate architectural decision in the project:

| File | Type | Reason |
|---|---|---|
| `app/page.tsx` | **Server** | Top-level orchestrator; no interactivity |
| `components/bento/CourseList.tsx` | **Server** | Uses `createSupabaseServerClient` which calls `cookies()` — only valid server-side |
| `components/bento/CourseTile.tsx` | **Client** | Uses Framer Motion `whileHover`, `variants` — requires browser APIs |
| `components/layout/Sidebar.tsx` | **Client** | Owns `useState` for collapse state, `layoutId` animations |
| `components/ui/ProgressBar.tsx` | **Client** | Uses `useMotionValue`, `useSpring`, `useEffect` |

The key rule: **only add `"use client"` when you actually need browser APIs or React hooks**. `CourseList.tsx` stays as a Server Component and passes the fetched `Course[]` rows as props down to `CourseTile.tsx` — this is the RSC "server fetches, client renders" pattern.

---

## 🎞️ Animation Decisions (Framer Motion)

1. **Staggered page load** — `BentoGrid.tsx` uses `staggerChildren: 0.1` with each tile having `hidden → show` variants (opacity + Y translate). No `scale` in entrance to avoid layout shifts.

2. **Spring hover physics** — Every bento tile uses:
   ```ts
   whileHover={{ scale: 1.015 }}
   transition={{ type: "spring", stiffness: 300, damping: 20 }}
   ```
   `scale` is GPU-composited via the transform pipeline — zero layout repaints.

3. **Sidebar layoutId** — The active nav pill uses `layoutId="sidebar-active-pill"`. Framer Motion handles interpolating position/size between nav items automatically using FLIP.

4. **Progress bar spring** — `useSpring(rawProgress, { stiffness: 80, damping: 18 })` gives a natural deceleration from 0 → target value on mount.

5. **Activity heatmap** — Each cell uses `useInView` with a staggered delay so the grid populates when it scrolls into view, not on page load.

---

## 🗄️ Supabase Setup

### 1. Create the table

Run this SQL in the Supabase SQL editor:

```sql
CREATE TABLE courses (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  progress    integer NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name   text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access (anon key)
CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);
```

### 2. Seed data

```sql
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',       75, 'Layers'),
  ('System Design Fundamentals',    42, 'Network'),
  ('TypeScript Deep Dive',          90, 'Code2'),
  ('Next.js App Router Mastery',    60, 'Zap');
```

### 3. Environment variables

Copy `.env.example` → `.env.local` and fill in your Supabase project URL and anon key.

```bash
cp .env.example .env.local
```

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📦 Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 15 (App Router) | Framework with RSC + streaming |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 12 | Animations & spring physics |
| Lucide React | 0.511 | Icon system |
| @supabase/ssr | 0.5 | Secure server-side Supabase client |
| @supabase/supabase-js | 2.49 | Supabase base SDK |

---

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variables in Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

> **Security note**: The `NEXT_PUBLIC_*` prefix exposes these values to the browser bundle. This is safe because Supabase's Row Level Security (RLS) policies prevent unauthorized data access even with the anon key. The anon key is designed to be public.

---

## 📐 Responsive Behaviour

| Viewport | Sidebar | Grid columns |
|---|---|---|
| `> 1024px` | Full labels (256px) | 3 columns |
| `768–1024px` | Icons only (64px) | 2 columns |
| `< 768px` | Hidden → Bottom nav bar | 1 column |

---

## 🏗️ Challenges & Solutions

**Challenge**: Keeping `CourseList` as a true Server Component while its child `CourseTile` needs Framer Motion.
**Solution**: `CourseList` fetches and maps data server-side, passing plain `Course` objects as props to `CourseTile` which is a Client Component. No context or hooks cross the server/client boundary.

**Challenge**: Progress bar animation from 0 → value without layout shifts.
**Solution**: Used `useMotionValue` + `useSpring` to drive the bar width via `style` (inline transform-compatible property) instead of CSS transitions on `width` which can trigger layout.

**Challenge**: Zero layout shift on sidebar collapse.
**Solution**: Animated `width` using Framer Motion's `animate` prop on the `<aside>`. Text labels use `AnimatePresence` to fade out before the width shrinks — preventing text overflow during transition.
