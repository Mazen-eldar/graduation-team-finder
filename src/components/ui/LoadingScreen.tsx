'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  'جاري تحميل الإنقاذ...',
  'بنستدعي مازن...',
  'بنجمع التيمات...',
  'جاهز تقريبًا... 🔥',
]

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 14 + 4
        if (next >= 100) {
          clearInterval(iv)
          setTimeout(() => setVisible(false), 350)
          return 100
        }
        return next
      })
    }, 80)
    return () => clearInterval(iv)
  }, [])

  const msgIndex = Math.min(Math.floor(progress / 25), MESSAGES.length - 1)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6"
          style={{ background: 'var(--bg-800)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Rings */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6 sm:mb-8">
            {[
              { size: 'inset-0', color: 'var(--neon-cyan)', speed: 1.5, dir: 1 },
              { size: 'inset-2', color: 'var(--neon-purple)', speed: 2, dir: -1 },
              { size: 'inset-4', color: 'var(--neon-pink)', speed: 3, dir: 1 },
            ].map((ring, i) => (
              <motion.div
                key={i}
                className={`absolute ${ring.size} rounded-full border-2`}
                style={{ borderColor: ring.color, borderTopColor: 'transparent' }}
                animate={{ rotate: ring.dir === 1 ? 360 : -360 }}
                transition={{ duration: ring.speed, repeat: Infinity, ease: 'linear' }}
              />
            ))}
            <div
              className="absolute inset-6 rounded-full flex items-center justify-center text-xl sm:text-2xl"
              style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))' }}
            >
              🛡️
            </div>
          </div>

          {/* Logo */}
          <motion.h1
            className="text-2xl sm:text-3xl font-black mb-2"
            style={{
              background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            مازن المنقذ™
          </motion.h1>

          {/* Status */}
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIndex}
              className="text-xs sm:text-sm mb-6 sm:mb-8"
              style={{ color: 'var(--text-dim)' }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              {MESSAGES[msgIndex]}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="w-48 sm:w-64 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))',
                width: `${Math.min(progress, 100)}%`,
              }}
            />
          </div>

          <p className="text-xs mt-3 font-grotesk" style={{ color: 'var(--text-muted)' }}>
            {Math.min(Math.floor(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
