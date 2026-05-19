'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFormStore } from '@/lib/store'

interface Particle {
  id: number
  x: number
  y: number
  tx: number
  ty: number
  color: string
  size: number
  duration: number
}

const COLORS = ['#00f5ff', '#b44fff', '#ff2d78', '#39ff14', '#ff6a00', '#ffffff']

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: 40 + Math.random() * 20,
    y: 25 + Math.random() * 15,
    tx: (Math.random() - 0.5) * 400,
    ty: -(Math.random() * 500 + 100),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    duration: 1 + Math.random() * 1.2,
  }))
}

export function SuccessScreen() {
  const { isSuccess, name, rescuePercentage, reset } = useFormStore()
  const [particles, setParticles] = useState<Particle[]>([])
  const [pct, setPct] = useState(0)
  const [barFill, setBarFill] = useState(0)
  const [analyzing, setAnalyzing] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!isSuccess) {
      setParticles([])
      setPct(0)
      setBarFill(0)
      setAnalyzing(false)
      setDone(false)
      return
    }

    // Burst particles
    setParticles(makeParticles(35))
    const clearParts = setTimeout(() => setParticles([]), 2500)

    // Start AI analysis after 1.2s
    const t1 = setTimeout(() => setAnalyzing(true), 1200)
    const t2 = setTimeout(() => {
      setBarFill(rescuePercentage)
      let c = 0
      const iv = setInterval(() => {
        c = Math.min(c + 2, rescuePercentage)
        setPct(c)
        if (c >= rescuePercentage) clearInterval(iv)
      }, 30)
    }, 1500)
    const t3 = setTimeout(() => setDone(true), 3200)

    return () => {
      clearTimeout(clearParts)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [isSuccess, rescuePercentage])

  function handleClose() {
    reset()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isSuccess && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-5 sm:px-6 text-center overflow-y-auto py-8"
          style={{ background: 'rgba(6,6,16,0.97)', backdropFilter: 'blur(30px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Particle burst */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="fixed pointer-events-none rounded-full z-[210]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
              initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              animate={{ x: p.tx, y: p.ty, scale: 0, opacity: 0 }}
              transition={{ duration: p.duration, ease: 'easeOut' }}
            />
          ))}

          {/* Pulsing rings */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-8 sm:mb-10 flex-shrink-0">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{
                  inset: `-${i * 18}px`,
                  borderColor: i === 0 ? 'var(--neon-cyan)' : i === 1 ? 'var(--neon-purple)' : 'var(--neon-pink)',
                }}
                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
              />
            ))}
            <motion.div
              className="absolute inset-0 rounded-full flex items-center justify-center text-4xl sm:text-5xl"
              style={{ background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))' }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
            >
              🎉
            </motion.div>
          </div>

          {/* Title */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            تم تسجيل البطل بنجاح{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ✅
            </span>
          </motion.h2>

          {/* Personalized message */}
          <motion.p
            className="text-base sm:text-lg mb-6 sm:mb-8 max-w-md leading-relaxed"
            style={{ color: 'var(--text-dim)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            يا أهلاً يا{' '}
            <span className="font-black" style={{ color: 'var(--neon-cyan)' }}>
              {name || 'فنان'}
            </span>
            !{' '}مازن المنقذ هيحاول يلم تيم ليك قبل ما تنهار نفسيًا. 🛡️
          </motion.p>

          {/* AI analysis */}
          <AnimatePresence>
            {analyzing && (
              <motion.div
                className="glass-card p-5 sm:p-6 max-w-sm w-full mb-6 sm:mb-8"
                style={{ borderColor: 'rgba(0,245,255,0.2)' }}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs font-grotesk tracking-widest uppercase mb-4" style={{ color: 'var(--neon-cyan)' }}>
                  🤖 جاري تحليل نسبة التسوح...
                </p>
                <div className="h-2 rounded-full mb-3 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink))' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${barFill}%` }}
                    transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
                <div className="text-4xl sm:text-5xl font-black font-grotesk mb-2" style={{ color: 'var(--neon-cyan)' }}>
                  {pct}%
                </div>
                {done && (
                  <motion.p
                    className="text-sm" style={{ color: 'var(--text-dim)' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  >
                    تم اكتشاف إنك محتاج تيم بسرعة {rescuePercentage}% ⚠️
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Close */}
          <motion.button
            className="px-6 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-bold transition-all duration-200"
            style={{
              background: 'var(--glass)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-cairo)',
              cursor: 'pointer',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={handleClose}
            whileHover={{ borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)', background: 'rgba(0,245,255,0.05)' }}
            whileTap={{ scale: 0.97 }}
          >
            تمام يا نجم 🤙
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
