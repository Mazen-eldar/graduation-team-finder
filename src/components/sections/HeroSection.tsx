'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Decorative blobs */}
      <motion.div
        className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[-8%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(180,79,255,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
        animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute top-[40%] right-[15%] w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      <motion.div
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto w-full"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="h-px w-8 sm:w-12" style={{ background: 'linear-gradient(to right, transparent, var(--neon-cyan))' }} />
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase font-grotesk" style={{ color: 'var(--neon-cyan)' }}>
            ⚡ الحل الوحيد لأزمة التيم
          </span>
          <div className="h-px w-8 sm:w-12" style={{ background: 'linear-gradient(to left, transparent, var(--neon-cyan))' }} />
        </motion.div>

        {/* Main heading — fluid sizes so it never clips on mobile */}
        <motion.h1
          variants={itemVariants}
          className="text-[2.4rem] sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-5 sm:mb-6"
        >
          لسه متسوح{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--neon-cyan) 0%, var(--neon-purple) 50%, var(--neon-pink) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ومش لاقي
          </span>
          <br />
          تيم تخرج؟{' '}
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            style={{ display: 'inline-block' }}
          >
            👀
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-xl md:text-2xl leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto px-2"
          style={{ color: 'var(--text-dim)' }}
        >
          تعالى يا فنان…{' '}
          <span className="font-bold" style={{ color: 'var(--neon-purple)' }}>أخوك مازن المنقذ</span>{' '}
         موجود عشانك 🛡️
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <MagneticButton
            className="glow-btn text-base sm:text-lg font-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl w-full sm:w-auto"
            style={{ fontFamily: 'var(--font-cairo)', maxWidth: 280 }}
            onClick={() => document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' })}
          >
            دخلني يا منقذ 🙏
          </MagneticButton>

          <button
            className="text-sm font-semibold px-6 py-3 rounded-2xl transition-all duration-200 w-full sm:w-auto"
            style={{
              color: 'var(--text-dim)',
              border: '1px solid var(--glass-border)',
              fontFamily: 'var(--font-cairo)',
              background: 'transparent',
              cursor: 'pointer',
              maxWidth: 280,
            }}
            onClick={() => document.getElementById('funny')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--glass-border-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.borderColor = 'var(--glass-border)' }}
          >
            اعرف أكتر ↓
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-12"
        >
          {[
            { icon: '🛡️', label: 'ضمان الإنقاذ 100%' },
            { icon: '⚡', label: 'استجابة فورية' },
            { icon: '🤝', label: 'تيمات حقيقية' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs sm:text-sm" style={{ color: 'var(--text-dim)' }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: 'var(--neon-cyan)' }}
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        <span className="text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>scroll</span>
      </motion.div>
    </section>
  )
}
