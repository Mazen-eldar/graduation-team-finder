'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import type { AdminStats as _AdminStats } from '@/types'

const DEPT_COLORS: Record<string, string> = {
  CS: '#00f5ff',
  SC: '#b44fff',
  IS: '#39ff14',
  AI: '#ff2d78',
}

async function fetchAdminStats(): Promise<import('@/types').AdminStats> {
  const res = await fetch('/api/submit')
  if (!res.ok) throw new Error('Failed to fetch registrations')
  const { data: regs } = await res.json() as { data: import('@/types').Registration[] }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayCount = regs.filter((r) => new Date(r.created_at) >= today).length

  const deptMap: Record<string, number> = {}
  const levelMap: Record<string, number> = {}
  for (const r of regs) {
    deptMap[r.department] = (deptMap[r.department] ?? 0) + 1
    levelMap[r.level] = (levelMap[r.level] ?? 0) + 1
  }

  return {
    total: regs.length,
    today: todayCount,
    byDept: Object.entries(deptMap).map(([department, count]) => ({
      department: department as import('@/types').Registration['department'],
      count,
      color: DEPT_COLORS[department] ?? '#888',
    })),
    byLevel: Object.entries(levelMap).map(([level, count]) => ({
      level: level as import('@/types').Registration['level'],
      count,
    })),
    recent: regs.slice(0, 10),
  }
}
import { formatDate, DEPT_META } from '@/lib/utils'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import type { AdminStats, Registration } from '@/types'

// ── Auth gate ─────────────────────────────────────────────────────────────────

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  function attempt() {
    if (pw === 'mazen2025' || pw === process.env.NEXT_PUBLIC_ADMIN_PW) {
      onAuth()
    } else {
      setErr(true)
      setTimeout(() => setErr(false), 1500)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: 'var(--bg-800)' }}>
      <AnimatedBackground />
      <motion.div
        className="glass-card p-10 max-w-sm w-full text-center relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-4xl mb-4">🔐</div>
        <h2 className="text-2xl font-black mb-2">Admin Access</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-dim)' }}>
          مستأذن تدخل هنا؟
        </p>
        <motion.input
          className="neon-input mb-4 text-center"
          type="password"
          placeholder="كلمة السر..."
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && attempt()}
          animate={err ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.3 }}
        />
        {err && (
          <p className="text-xs mb-3" style={{ color: 'var(--neon-pink)' }}>
            غلط يا فنان 😅
          </p>
        )}
        <button
          className="glow-btn w-full py-3 rounded-xl font-bold"
          style={{ fontFamily: 'var(--font-cairo)' }}
          onClick={attempt}
        >
          دخول
        </button>
        <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
         
        </p>
      </motion.div>
    </div>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
  icon, label, value, color, sub,
}: {
  icon: string; label: string; value: string | number; color: string; sub?: string
}) {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, borderColor: color, boxShadow: `0 20px 60px ${color}22` }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-2xl">{icon}</div>
        <div
          className="text-xs font-grotesk px-2 py-1 rounded-full"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
        >
          LIVE
        </div>
      </div>
      <div className="text-4xl font-black font-grotesk mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>{label}</div>
      {sub && <div className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>{sub}</div>}
    </motion.div>
  )
}

// ── Recent table ──────────────────────────────────────────────────────────────

function RecentTable({ data }: { data: Registration[] }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b" style={{ borderColor: 'var(--glass-border)' }}>
        <h3 className="text-lg font-black">آخر التسجيلات 📋</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              {['الاسم', 'القسم', 'المستوى', 'التراك', 'التواصل', 'التاريخ'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-right font-bold"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <motion.tr
                key={row.id}
                className="border-t"
                style={{ borderColor: 'var(--glass-border)' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <td className="px-4 py-3 font-bold">{row.name}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 rounded-lg text-xs font-bold"
                    style={{
                      background: `${DEPT_META[row.department]?.color}15`,
                      color: DEPT_META[row.department]?.color,
                    }}
                  >
                    {row.department}
                  </span>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--text-dim)' }}>{row.level}</td>
                <td className="px-4 py-3" style={{ color: 'var(--text-dim)' }}>{row.track}</td>
                <td className="px-4 py-3 font-grotesk text-xs" style={{ color: 'var(--text-dim)' }}>
                  {row.contact_method}: {row.contact_value}
                </td>
                <td className="px-4 py-3 font-grotesk text-xs" style={{ color: 'var(--text-muted)' }}>
                  {formatDate(row.created_at)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
            <div className="text-4xl mb-3">📭</div>
            <p>لسه مفيش تسجيلات</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main dashboard ─────────────────────────────────────────────────────────────

function Dashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const load = useCallback(async () => {
    try {
      const data = await fetchAdminStats()
      setStats(data)
      setLastRefresh(new Date())
    } catch {
      // Demo fallback
      setStats({
        total: 0,
        today: 0,
        byDept: [],
        byLevel: [],
        recent: [],
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const interval = setInterval(load, 30_000) // auto-refresh every 30s
    return () => clearInterval(interval)
  }, [load])

  const CHART_COLORS = ['#00f5ff', '#b44fff', '#39ff14', '#ff2d78']
  const TOOLTIP_STYLE = {
    background: 'rgba(10,10,26,0.95)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    fontFamily: 'var(--font-cairo)',
    color: '#e8e8f0',
  }

  return (
    <div
      className="min-h-screen px-4 md:px-8 py-8"
      dir="rtl"
      style={{ background: 'var(--bg-800)' }}
    >
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">🛡️</span>
              <h1
                className="text-3xl font-black"
                style={{
                  background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Admin Dashboard
              </h1>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              آخر تحديث: {lastRefresh.toLocaleTimeString('ar-EG')}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{
                background: 'var(--glass)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                fontFamily: 'var(--font-cairo)',
              }}
              onClick={load}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--neon-cyan)'
                e.currentTarget.style.color = 'var(--neon-cyan)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)'
                e.currentTarget.style.color = 'var(--text-dim)'
              }}
            >
              🔄 تحديث
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
              style={{
                background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
                color: '#000',
                textDecoration: 'none',
                fontFamily: 'var(--font-cairo)',
              }}
            >
              ← الرئيسية
            </Link>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <motion.div
              className="w-12 h-12 rounded-full border-2 border-t-transparent"
              style={{ borderColor: 'var(--neon-cyan)', borderTopColor: 'transparent' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon="👥" label="إجمالي المسجلين" value={stats?.total ?? 0}
                color="var(--neon-cyan)" sub="من البداية"
              />
              <StatCard
                icon="⚡" label="تسجيلات اليوم" value={stats?.today ?? 0}
                color="var(--neon-purple)" sub="آخر 24 ساعة"
              />
              <StatCard
                icon="🏆" label="أكثر قسم" value={stats?.byDept[0]?.department ?? '—'}
                color="var(--neon-green)" sub={`${stats?.byDept[0]?.count ?? 0} طالب`}
              />
              <StatCard
                icon="📊" label="أشهر مستوى" value={stats?.byLevel[0]?.level ?? '—'}
                color="var(--neon-pink)" sub={`${stats?.byLevel[0]?.count ?? 0} طالب`}
              />
            </div>

            {/* Charts row */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Dept bar chart */}
              <motion.div
                className="glass-card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-black mb-6">توزيع الأقسام 📊</h3>
                {stats?.byDept.length ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={stats.byDept}>
                      <XAxis
                        dataKey="department"
                        tick={{ fill: 'var(--text-dim)', fontFamily: 'var(--font-grotesk)', fontSize: 12 }}
                        axisLine={false} tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: 'var(--text-dim)', fontFamily: 'var(--font-grotesk)', fontSize: 12 }}
                        axisLine={false} tickLine={false}
                      />
                      <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                        {stats.byDept.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyChart />
                )}
              </motion.div>

              {/* Level pie chart */}
              <motion.div
                className="glass-card p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg font-black mb-6">توزيع المستويات 🎯</h3>
                {stats?.byLevel.length ? (
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={stats.byLevel}
                        dataKey="count"
                        nameKey="level"
                        cx="50%" cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                      >
                        {stats.byLevel.map((_, i) => (
                          <Cell key={`cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={TOOLTIP_STYLE} />
                      <Legend
                        wrapperStyle={{ fontFamily: 'var(--font-cairo)', fontSize: 12 }}
                        formatter={(val) => (
                          <span style={{ color: 'var(--text-dim)' }}>{val}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyChart />
                )}
              </motion.div>
            </div>

            {/* Recent submissions table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <RecentTable data={stats?.recent ?? []} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="h-[220px] flex flex-col items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
      <span className="text-3xl">📭</span>
      <p className="text-sm">لسه مفيش بيانات</p>
    </div>
  )
}

// ── Page with auth gate ───────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)

  return authed ? <Dashboard /> : <AuthGate onAuth={() => setAuthed(true)} />
}