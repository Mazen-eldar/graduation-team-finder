# 🛡️ مازن المنقذ — Graduation Team Finder

> لسه متسوح ومش لاقي تيم تخرج؟ تعالى يا فنان…

A futuristic, Gen-Z Egyptian–flavored graduation project team finder built with Next.js 15, Framer Motion, Supabase, and way too much coffee.

---

## ✨ Features

- 🎬 **Cinematic loading screen** with progress animation
- 🌌 **Animated canvas background** — particles + grid + mouse repulsion
- 🖱️ **Custom cursor glow** with smooth lag
- 🦸 **Hero section** with parallax + floating blobs
- 😂 **Funny intro section** with scroll-triggered reveal
- 🃏 **Department cards** — CS / SC / IS / AI with neon hover effects
- 📝 **Smart registration form** with level picker + contact selector
- 🎉 **Cinematic success screen** — particle explosion + pulsing rings + AI analysis bar
- 📊 **Admin dashboard** — live stats, charts, recent submissions table
- 🔐 **Password-protected admin** page
- 📱 **Fully responsive** mobile-first design
- 🌙 **Dark futuristic theme** — glassmorphism + neon gradients
- ⚡ **Zustand state management** — no prop drilling
- 🗄️ **Supabase backend** — real-time data persistence

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-username/mazen-savior.git
cd mazen-savior
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Open **SQL Editor** → **New Query**
3. Paste the contents of `supabase/schema.sql` and run it
4. Go to **Project Settings → API** and copy:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
ADMIN_PASSWORD=mazen_savior_2025
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
mazen-savior/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page
│   │   ├── layout.tsx            # Root layout + fonts
│   │   ├── globals.css           # Global styles + CSS vars
│   │   ├── admin/
│   │   │   └── page.tsx          # Admin dashboard
│   │   └── api/
│   │       └── submit/
│   │           └── route.ts      # POST/GET API route
│   ├── components/
│   │   ├── ui/
│   │   │   ├── AnimatedBackground.tsx  # Canvas particles + grid
│   │   │   ├── CursorGlow.tsx          # Custom cursor
│   │   │   ├── LoadingScreen.tsx       # Cinematic loader
│   │   │   ├── MagneticButton.tsx      # Magnetic hover button
│   │   │   └── Navbar.tsx              # Fixed navbar
│   │   └── sections/
│   │       ├── HeroSection.tsx         # Hero with parallax
│   │       ├── FunnySection.tsx        # Funny intro + stats
│   │       ├── DepartmentSection.tsx   # Dept card picker
│   │       ├── FormSection.tsx         # Registration form
│   │       ├── SuccessScreen.tsx       # Cinematic success
│   │       └── Footer.tsx              # Footer
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client + helpers
│   │   ├── store.ts              # Zustand form store
│   │   └── utils.ts              # Helpers + metadata
│   └── types/
│       └── index.ts              # TypeScript types
├── supabase/
│   └── schema.sql                # Database schema
├── .env.local.example
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 🗄️ Database Schema

```sql
registrations (
  id                UUID PRIMARY KEY,
  name              TEXT,
  department        TEXT,     -- CS | SC | IS | AI
  track             TEXT,
  level             TEXT,     -- لسه بتعلم | Beginner | Mid-Level | Senior | فضائي
  contact_method    TEXT,     -- WhatsApp | LinkedIn | Facebook | Telegram | Email
  contact_value     TEXT,
  rescue_percentage INTEGER,  -- 85–98 (generated randomly)
  created_at        TIMESTAMPTZ
)
```

---

## 🔐 Admin Dashboard

Visit `/admin` → enter password: **mazen2025**

Features:
- Total registrations + today's count
- Top department + most popular level
- Bar chart: registrations by department
- Pie chart: level distribution
- Recent submissions table (last 10)
- Auto-refreshes every 30 seconds

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard:
# Settings → Environment Variables
```

### Environment Variables on Vercel

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |

---

## 🛠️ Tech Stack

| Tech | Why |
|------|-----|
| **Next.js 15** | App Router, API routes, SSR |
| **TypeScript** | Type safety everywhere |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Supabase** | Database + auth |
| **Zustand** | Lightweight state management |
| **Recharts** | Admin charts |
| **react-hot-toast** | Elegant notifications |

---

## 🎨 Design System

| Color | Value | Usage |
|-------|-------|-------|
| Neon Cyan | `#00f5ff` | Primary accent, CS dept |
| Neon Purple | `#b44fff` | Secondary, SC dept |
| Neon Green | `#39ff14` | IS dept, success states |
| Neon Pink | `#ff2d78` | AI dept, error states |
| Dark BG | `#060610` | Main background |

---

## 📝 Demo Mode

The app works without Supabase in **demo mode** — form submissions will still trigger the success animation, they just won't persist to a database. Perfect for showcasing locally.

---

## 🙏 Credits

Built by **مازن المنقذ** / **Mazen The Savior**

> "طالب جامعي مصري فاهم UI/UX وعامل حاجة جامدة فشخ" 🔥
