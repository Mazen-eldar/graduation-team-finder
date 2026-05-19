'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINES = [
  { text: 'يا هلا بالأخ المتسوح 👋', color: 'var(--neon-cyan)' },
  { text: 'واضح إن الدنيا بايظة معاك 😅', color: 'var(--text)' },
  { text: 'بس متقلقش… الحل عند أخوك ⚡', color: 'var(--neon-purple)' },
]

const STATS = [
  { num: '98%', label: 'نسبة نجاح الإنقاذ', color: 'var(--neon-cyan)', sub: 'مضمون بالكرتة' },
  { num: '∞', label: 'مستوى الهوسبيتالية', color: 'var(--neon-purple)', sub: 'مفيش حد رفضناه' },
  { num: '1', label: 'منقذ في الكون كله', color: 'var(--neon-green)', sub: 'ومتاح 24/7' },
  { num: '0', label: 'تيمات اتركت تايه', color: 'var(--neon-pink)', sub: 'حتى دلوقتي 😤' },
]

export function FunnySection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="funny" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6 text-center overflow-hidden">
      {/* Section separator */}
      <div className="flex items-center justify-center gap-4 mb-12 sm:mb-16">
        <div className="h-px flex-1 max-w-24 sm:max-w-32" style={{ background: 'linear-gradient(to right, transparent, var(--glass-border))' }} />
        <span className="text-[10px] sm:text-xs font-grotesk tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Reality Check</span>
        <div className="h-px flex-1 max-w-24 sm:max-w-32" style={{ background: 'linear-gradient(to left, transparent, var(--glass-border))' }} />
      </div>

      {/* Funny lines */}
      <div className="max-w-3xl mx-auto mb-16 sm:mb-20">
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight mb-5 sm:mb-6"
            style={{ color: line.color }}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: i * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>

      {/* Stats grid — 2×2 on mobile, 4×1 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card p-4 sm:p-6 group cursor-default"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = stat.color
              e.currentTarget.style.boxShadow = `0 20px 60px ${stat.color}22`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--glass-border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div className="text-3xl sm:text-4xl font-black font-grotesk mb-1 sm:mb-2" style={{ color: stat.color }}>
              {stat.num}
            </div>
            <div className="text-xs sm:text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>
              {stat.label}
            </div>
            <div className="text-[10px] sm:text-xs" style={{ color: 'var(--text-dim)' }}>
              {stat.sub}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
