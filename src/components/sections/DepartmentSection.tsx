'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useFormStore } from '@/lib/store'
import { DEPT_META } from '@/lib/utils'
import type { Department } from '@/types'

const DEPTS = Object.entries(DEPT_META) as [Department, typeof DEPT_META[Department]][]

export function DepartmentSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { department, setDepartment } = useFormStore()

  return (
    <section ref={ref} id="departments" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6">
      {/* Header */}
      <motion.div
        className="text-center mb-10 sm:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="section-tag">الخطوة الأولى</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
          قولنا بس انت من انهي قسم{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            👨‍💻
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base" style={{ color: 'var(--text-dim)' }}>
          اختار قسمك وهنكمل منه
        </p>
      </motion.div>

      {/* Cards grid — 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 max-w-4xl mx-auto">
        {DEPTS.map(([key, meta], i) => {
          const isSelected = department === key
          return (
            <motion.button
              key={key}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center group"
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${meta.color}18, ${meta.color}08)`
                  : 'var(--glass)',
                border: `1px solid ${isSelected ? meta.border : 'var(--glass-border)'}`,
                boxShadow: isSelected ? `0 0 40px ${meta.glow}, 0 20px 60px ${meta.glow}` : 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-cairo)',
              }}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: `0 0 50px ${meta.glow}, 0 24px 64px ${meta.glow}`,
                borderColor: meta.border,
                background: `linear-gradient(135deg, ${meta.color}15, ${meta.color}05)`,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setDepartment(key)
                setTimeout(() => {
                  document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }, 400)
              }}
            >
              {/* Glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${meta.color}12, transparent 70%)` }}
              />

              {/* Selected pulse ring */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl"
                  style={{ border: `1px solid ${meta.color}` }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Icon */}
              <motion.div
                className="text-3xl sm:text-5xl mb-3 sm:mb-4"
                animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {meta.icon}
              </motion.div>

              {/* Dept label */}
              <div className="text-2xl sm:text-3xl font-black mb-1" style={{ color: meta.color }}>
                {meta.label}
              </div>

              {/* Full name */}
              <div className="text-[10px] sm:text-xs mb-2 sm:mb-3 leading-tight" style={{ color: 'var(--text-dim)' }}>
                {meta.full}
              </div>

              {/* Tag badge — hidden on tiny screens */}
              <div
                className="hidden sm:inline-block text-[10px] font-bold px-3 py-1 rounded-full font-grotesk tracking-wider"
                style={{
                  color: meta.color,
                  background: `${meta.color}12`,
                  border: `1px solid ${meta.color}30`,
                }}
              >
                {meta.tag}
              </div>

              {/* Selected checkmark */}
              {isSelected && (
                <motion.div
                  className="absolute top-2 left-2 sm:top-3 sm:left-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs"
                  style={{ background: meta.color, color: '#000' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Helper text */}
      <motion.p
        className="text-center text-xs sm:text-sm mt-6 sm:mt-8"
        style={{ color: 'var(--text-muted)' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        {department
          ? `✅ اخترت ${department} — برافو عليك يا فنان`
          : 'اضغط على قسمك وبعدين اكمل تحت 👇'}
      </motion.p>
    </section>
  )
}
