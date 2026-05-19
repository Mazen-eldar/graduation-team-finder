'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/sections/Footer'

// ── Data ─────────────────────────────────────────────────────────────────────

const SKILLS = [
  { cat: 'Backend', items: ['C#', 'ASP.NET Core MVC', 'Web API', 'Entity Framework Core', 'Clean Architecture', 'JWT Auth', 'Hangfire', 'ASP.NET Identity'], color: '#00f5ff' },
  { cat: 'Database', items: ['SQL Server', 'EF Core Migrations', 'Query Optimization', 'Database Design'], color: '#b44fff' },
  { cat: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Bootstrap', 'jQuery', 'Next.js', 'React', 'TypeScript'], color: '#39ff14' },
  { cat: 'DevTools', items: ['Git', 'GitHub', 'Docker', 'Postman', 'Swagger / OpenAPI'], color: '#ff2d78' },
  { cat: 'CS Foundations', items: ['Data Structures', 'Algorithms', 'OOP', 'SOLID Principles', 'Competitive Programming'], color: '#ff6a00' },
]

const TRAINING = [
  {
    role: 'Full-Stack .NET Intern',
    org: 'Digital Egypt Pioneers Initiative – MCIT',
    period: 'Jun 2025 – Present',
    icon: '🇪🇬',
    color: '#00f5ff',
    points: [
      'Intensive full-stack .NET curriculum under Egypt\'s Ministry of Communications',
      'Built ASP.NET Core apps with Clean Architecture, REST API design, EF Core ORM',
      'CI/CD workflows, Git branching strategies, Docker containerization',
    ],
  },
  {
    role: 'Frontend Web Developer Trainee',
    org: 'National Telecommunication Institute (NTI) — 120-Hour Program',
    period: 'Jan 2026 – Present',
    icon: '🌐',
    color: '#b44fff',
    points: [
      'Structured 120-hour program covering HTML5, CSS3, JavaScript, responsive UI',
      'Multi-page web interfaces with Bootstrap and jQuery',
    ],
  },
  {
    role: 'Software Engineering Trainee',
    org: 'Programming Advices – Abu-Hadhoud Program',
    period: 'Oct 2024 – Present',
    icon: '⚙️',
    color: '#39ff14',
    points: [
      'OOP, design patterns, backend architecture',
      'SOLID principles & Clean Architecture in C# real-world exercises',
    ],
  },
]

const PROJECT = {
  title: 'Healthcare AI Assistant',
  role: 'Backend Team Lead — Team of 5',
  stack: ['ASP.NET Core 8', 'C#', 'SQL Server', 'EF Core', 'Hangfire', 'JWT', 'ASP.NET Identity', 'Clean Architecture', 'Swagger'],
  points: [
    'Architected backend using Clean Architecture across Domain, Application, Infrastructure & Presentation layers',
    'Multi-role auth system using JWT + ASP.NET Identity with role-based access control',
    'RESTful API endpoints documented via Swagger/OpenAPI for front-end & third-party integration',
    'Hangfire background job processing for scheduled tasks & async workflows',
    'AI chatbot integration for medical query assistance',
    'Led 5-person team — code reviews & architectural standards across PRs',
  ],
  github: 'https://github.com/Mazen-eldar/NXT31-Healthcare-AI-Assistant',
  color: '#00f5ff',
}

// ── Avatar card with hover swap ───────────────────────────────────────────────

function FounderPhotos() {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 cursor-pointer mx-auto"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover((v) => !v)}
    >
      {/* Neon glow ring */}
      <motion.div
        className="absolute -inset-1 rounded-3xl"
        style={{
          background: hover
            ? 'linear-gradient(135deg, #b44fff, #ff2d78)'
            : 'linear-gradient(135deg, #00f5ff, #b44fff)',
          filter: 'blur(16px)',
          opacity: 0.5,
        }}
        animate={{ opacity: hover ? 0.7 : 0.4 }}
        transition={{ duration: 0.4 }}
      />

      {/* Galabeya photo — main/hero */}
      <AnimatePresence>
        {!hover && (
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(0,245,255,0.3)' }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src="/images/mazen-galabeya.jpg"
              alt="مازن المنقذ — Egyptian Gen-Z Founder"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width:640px) 224px, (max-width:768px) 256px, 288px"
            />
            {/* Gradient overlay bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{
                background: 'linear-gradient(to top, rgba(6,6,16,0.9), transparent)',
              }}
            />
            {/* Label */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span
                className="text-xs font-grotesk px-3 py-1 rounded-full"
                style={{ background: 'rgba(0,245,255,0.15)', color: 'var(--neon-cyan)', border: '1px solid rgba(0,245,255,0.3)' }}
              >
                Hover for suit mode 😏
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suit photo — hover reveal */}
      <AnimatePresence>
        {hover && (
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(180,79,255,0.4)' }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src="/images/mazen-suit.jpg"
              alt="مازن المنقذ — Professional Mode"
              fill
              className="object-cover object-top"
              sizes="(max-width:640px) 224px, (max-width:768px) 256px, 288px"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{ background: 'linear-gradient(to top, rgba(6,6,16,0.9), transparent)' }}
            />
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span
                className="text-xs font-grotesk px-3 py-1 rounded-full"
                style={{ background: 'rgba(180,79,255,0.15)', color: 'var(--neon-purple)', border: '1px solid rgba(180,79,255,0.3)' }}
              >
                Professional mode activated 💼
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner badge */}
      <motion.div
        className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 shadow-lg"
        style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))' }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🛡️
      </motion.div>
    </div>
  )
}

// ── Timeline item ─────────────────────────────────────────────────────────────

function TrainingCard({ item, i }: { item: typeof TRAINING[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className="relative glass-card p-5 sm:p-6"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, borderColor: item.color, boxShadow: `0 20px 60px ${item.color}22` }}
    >
      {/* Left accent bar */}
      <div
        className="absolute top-0 right-0 w-1 h-full rounded-r-2xl"
        style={{ background: item.color }}
      />
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl flex-shrink-0">{item.icon}</span>
        <div>
          <h3 className="font-black text-base sm:text-lg leading-tight">{item.role}</h3>
          <p className="text-xs mt-0.5" style={{ color: item.color }}>{item.org}</p>
          <p className="text-xs mt-0.5 font-grotesk" style={{ color: 'var(--text-muted)' }}>{item.period}</p>
        </div>
      </div>
      <ul className="space-y-1.5 mr-8">
        {item.points.map((pt, j) => (
          <li key={j} className="text-xs sm:text-sm flex items-start gap-2" style={{ color: 'var(--text-dim)' }}>
            <span style={{ color: item.color, flexShrink: 0 }}>▸</span>
            {pt}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export function AboutClient() {
  const heroRef = useRef<HTMLElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <>
      <AnimatedBackground />
      <CursorGlow />
      <Navbar />

      <main className="relative z-10 min-h-screen" dir="rtl">
        {/* ── HERO SPLIT ─────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-5 sm:px-8 pt-24 pb-16 max-w-6xl mx-auto"
        >
          {/* Photo side */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <FounderPhotos />
          </motion.div>

          {/* Text side */}
          <motion.div
            className="max-w-xl text-center lg:text-right"
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center justify-center lg:justify-end gap-3 mb-4">
              <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, var(--neon-cyan))' }} />
              <span className="text-xs font-grotesk tracking-widest uppercase" style={{ color: 'var(--neon-cyan)' }}>
                The Savior Behind the Platform
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] mb-4">
              مازن{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                المنقذ
              </span>
            </h1>

            {/* Eng name */}
            <p className="text-lg sm:text-xl font-grotesk font-semibold mb-1" style={{ color: 'var(--text-dim)' }}>
              Mazen Eldar
            </p>

            {/* Title */}
            <p className="text-sm font-grotesk mb-6" style={{ color: 'var(--neon-purple)' }}>
              Full-Stack .NET Developer · CS & AI Student · BFCAI, Benha University
            </p>

            {/* The quote */}
            <div
              className="glass-card p-4 sm:p-5 mb-6 text-right"
              style={{ borderColor: 'rgba(0,245,255,0.2)' }}
            >
              <p className="text-sm sm:text-base leading-relaxed italic" style={{ color: 'var(--text-dim)' }}>
                &quot;مازن المنقذ — AI student trying to save the graduation season{' '}
                <span style={{ color: 'var(--neon-cyan)' }}>before humanity collapses.</span> 😭&quot;
              </p>
            </div>

            {/* Summary bullets */}
            <div className="space-y-2 mb-8 text-right">
              {[
                { icon: '🎓', text: 'طالب Computer Science & AI — Benha University (Expected 2027)' },
                { icon: '💼', text: 'Full-Stack .NET Developer متخصص في Clean Architecture & Backend' },
                { icon: '🇪🇬', text: 'Digital Egypt Pioneers Initiative — وزارة الاتصالات' },
                { icon: '⚡', text: 'Competitive Programmer + Backend Team Lead' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                >
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-dim)' }}>{item.text}</p>
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA links */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
              <a
                href="https://www.linkedin.com/in/mazen-eldar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: 'rgba(0,119,181,0.15)',
                  border: '1px solid rgba(0,119,181,0.4)',
                  color: '#0077b5',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-grotesk)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,119,181,0.25)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,119,181,0.15)' }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/Mazen-eldar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-grotesk)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </a>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                  color: '#000',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-cairo)',
                }}
              >
                🛡️ الموقع الرئيسي
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── WHY I BUILT THIS ──────────────────────────────────────── */}
        <WhySection />

        {/* ── SKILLS ───────────────────────────────────────────────── */}
        <SkillsSection />

        {/* ── TRAINING ─────────────────────────────────────────────── */}
        <TrainingSection />

        {/* ── KEY PROJECT ──────────────────────────────────────────── */}
        <ProjectSection />

        {/* ── BUILT BY MAZEN — suit card footer CTA ────────────────── */}
        <BuiltBySection />
      </main>

      <Footer />
    </>
  )
}

// ── Why section ───────────────────────────────────────────────────────────────

function WhySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="py-20 px-5 sm:px-8 max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-tag">The Origin Story</span>
        <h2 className="text-3xl sm:text-4xl font-black">ليه عملت الموقع ده؟ 🤔</h2>
      </motion.div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: '😤',
            title: 'المشكلة الحقيقية',
            text: 'شفت زمايلي بيدوروا على تيم تخرج في آخر لحظة، والـ panic واضح. قررت أعمل حاجة تحل المشكلة دي.',
            color: 'var(--neon-cyan)',
          },
          {
            icon: '💡',
            title: 'الفكرة',
            text: 'platform بسيط يجمع الطلاب الباحثين عن تيم، ويعرض مهاراتهم ومستواهم — زي LinkedIn بس للتخرج.',
            color: 'var(--neon-purple)',
          },
          {
            icon: '🚀',
            title: 'النتيجة',
            text: 'موقع futuristic بـ Next.js 15 + Supabase + Framer Motion .',
            color: 'var(--neon-green)',
          },
        ].map((card, i) => (
          <motion.div
            key={card.title}
            className="glass-card p-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
            whileHover={{ y: -6, borderColor: card.color, boxShadow: `0 20px 60px ${card.color}20` }}
          >
            <div className="text-4xl mb-3">{card.icon}</div>
            <h3 className="font-black text-base mb-2" style={{ color: card.color }}>{card.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-dim)' }}>{card.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── Skills section ────────────────────────────────────────────────────────────

function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} className="py-20 px-5 sm:px-8 max-w-5xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-tag">Technical Skills</span>
        <h2 className="text-3xl sm:text-4xl font-black">التقنيات اللي بشتغل بيها 🛠️</h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILLS.map((group, i) => (
          <motion.div
            key={group.cat}
            className="glass-card p-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, borderColor: group.color, boxShadow: `0 16px 50px ${group.color}20` }}
          >
            <h3 className="font-black text-sm mb-3 font-grotesk" style={{ color: group.color }}>
              {group.cat}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 rounded-lg font-grotesk"
                  style={{
                    background: `${group.color}12`,
                    border: `1px solid ${group.color}25`,
                    color: 'var(--text-dim)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── Training section ──────────────────────────────────────────────────────────

function TrainingSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} className="py-20 px-5 sm:px-8 max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-tag">Professional Training</span>
        <h2 className="text-3xl sm:text-4xl font-black">التدريبات المهنية 📚</h2>
      </motion.div>
      <div className="space-y-4">
        {TRAINING.map((item, i) => (
          <TrainingCard key={item.role} item={item} i={i} />
        ))}
      </div>
    </section>
  )
}

// ── Key project section ───────────────────────────────────────────────────────

function ProjectSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} className="py-20 px-5 sm:px-8 max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-tag">Key Project</span>
        <h2 className="text-3xl sm:text-4xl font-black">أبرز مشروع 🏆</h2>
      </motion.div>
      <motion.div
        className="glass-card p-6 sm:p-8"
        style={{ borderColor: 'rgba(0,245,255,0.2)' }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        {/* Project header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black mb-1" style={{ color: 'var(--neon-cyan)' }}>
              🏥 {PROJECT.title}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-dim)' }}>{PROJECT.role}</p>
          </div>
          <a
            href={PROJECT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0 self-start"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text)',
              textDecoration: 'none',
              fontFamily: 'var(--font-grotesk)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--neon-cyan)'; e.currentTarget.style.color = 'var(--neon-cyan)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--text)' }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {PROJECT.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-lg font-grotesk"
              style={{
                background: 'rgba(0,245,255,0.08)',
                border: '1px solid rgba(0,245,255,0.2)',
                color: 'var(--neon-cyan)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Points */}
        <ul className="space-y-2.5">
          {PROJECT.points.map((pt, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3 text-sm"
              style={{ color: 'var(--text-dim)' }}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <span style={{ color: 'var(--neon-cyan)', flexShrink: 0, marginTop: 2 }}>▸</span>
              {pt}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}

// ── Built by Mazen — suit mode footer CTA ─────────────────────────────────────

function BuiltBySection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hover, setHover] = useState(false)

  return (
    <section ref={ref} className="py-20 px-5 sm:px-8">
      <motion.div
        className="glass-card max-w-3xl mx-auto overflow-hidden"
        style={{ borderColor: 'rgba(180,79,255,0.25)' }}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        whileHover={{ borderColor: 'rgba(180,79,255,0.5)', boxShadow: '0 30px 80px rgba(180,79,255,0.15)' }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-0">
          {/* Suit photo — professional card */}
          <div
            className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Image
              src={hover ? '/images/mazen-galabeya.jpg' : '/images/mazen-suit.jpg'}
              alt="Mazen Eldar — Built by"
              fill
              className="object-cover object-top transition-all duration-500"
              sizes="(max-width:640px) 100%, 192px"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to left, rgba(10,10,26,0.95), transparent 60%)',
              }}
            />
            {/* Mode label */}
            <div className="absolute bottom-2 left-2">
              <span className="text-[10px] font-grotesk px-2 py-0.5 rounded-full"
                style={{ background: hover ? 'rgba(0,245,255,0.15)' : 'rgba(180,79,255,0.15)',
                  color: hover ? 'var(--neon-cyan)' : 'var(--neon-purple)',
                  border: `1px solid ${hover ? 'rgba(0,245,255,0.3)' : 'rgba(180,79,255,0.3)'}` }}>
                {hover ? 'Chill mode 🧘' : 'Pro mode 💼'}
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="p-6 sm:p-8 text-right flex-1">
            <p className="text-xs font-grotesk tracking-widest uppercase mb-2" style={{ color: 'var(--neon-purple)' }}>
              Built by
            </p>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">
              Mazen Eldar{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>🛡️</span>
            </h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-dim)' }}>
              CS & AI Student · Full-Stack .NET Developer<br />
              <span style={{ color: 'var(--text-muted)' }}>BFCAI, Benha University · Cairo, Egypt 🇪🇬</span>
            </p>
            <div className="flex flex-wrap gap-2 justify-end">
              <a href="https://www.linkedin.com/in/mazen-eldar/" target="_blank" rel="noopener noreferrer"
                className="text-xs font-grotesk font-bold px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{ background: 'rgba(0,119,181,0.15)', border: '1px solid rgba(0,119,181,0.4)', color: '#0077b5', textDecoration: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,119,181,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,119,181,0.15)'}>
                LinkedIn
              </a>
              <a href="https://github.com/Mazen-eldar" target="_blank" rel="noopener noreferrer"
                className="text-xs font-grotesk font-bold px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{ background: 'var(--glass)', border: '1px solid var(--glass-border)', color: 'var(--text)', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)' }}>
                GitHub
              </a>
              <Link href="/"
                className="text-xs font-cairo font-bold px-3 py-1.5 rounded-lg"
                style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))', color: '#000', textDecoration: 'none' }}>
                🛡️ الموقع
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
