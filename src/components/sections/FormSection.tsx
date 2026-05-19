'use client'

import { useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useFormStore } from '@/lib/store'
import { submitRegistration } from '@/lib/supabase'
import { generateRescuePercentage, generateAvatarSeed, DEPT_META, LEVEL_META } from '@/lib/utils'
import { MagneticButton } from '@/components/ui/MagneticButton'
import type { Level, ContactMethod } from '@/types'
import toast from 'react-hot-toast'

const LEVELS: Level[] = ['لسه بتعلم', 'Beginner', 'Mid-Level', 'Senior', 'فضائي']
const CONTACT_METHODS: ContactMethod[] = ['WhatsApp', 'LinkedIn', 'Facebook', 'Telegram', 'Email']

function FormGroup({
  label, helper, children,
}: {
  label: string; helper?: string; children: React.ReactNode
}) {
  return (
    <div className="mb-6 sm:mb-7">
      <label className="block text-xs sm:text-sm font-bold mb-2" style={{ color: 'var(--text)' }}>
        {label}
      </label>
      {children}
      {helper && (
        <p className="text-xs mt-2 italic" style={{ color: 'var(--neon-cyan)' }}>{helper}</p>
      )}
    </div>
  )
}

export function FormSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const {
    name, setName,
    department,
    track, setTrack,
    level, setLevel,
    skillsNeeded,
    contactMethod, setContactMethod,
    contactValue, setContactValue,
    showOnBoard,
    setRescuePercentage,
    setAvatarSeed,
    isSubmitting, setIsSubmitting,
    setIsSuccess,
  } = useFormStore()

  async function handleSubmit() {
    if (!name.trim()) { toast.error('ادخل اسمك يا فنان 😤'); return }
    if (!department) { toast.error('اختر القسم الأول 👆'); return }
    if (!track.trim()) { toast.error('التراك مش اختياري يا معلم 😅'); return }
    if (!level) { toast.error('اختر مستواك يا نجم 🎯'); return }
    if (!contactMethod) { toast.error('اختر وسيلة التواصل 📱'); return }
    if (!contactValue.trim()) { toast.error('طيب كيف نتواصل معاك؟ 🤔'); return }

    setIsSubmitting(true)
    const pct = generateRescuePercentage()
    setRescuePercentage(pct)

    try {
      const seed = generateAvatarSeed(name.trim())
      setAvatarSeed(seed)
      await submitRegistration({
        name: name.trim(),
        department,
        track: track.trim(),
        level,
        skills_needed: skillsNeeded,
        contact_method: contactMethod,
        contact_value: contactValue.trim(),
        rescue_percentage: pct,
        show_on_board: showOnBoard,
        avatar_seed: seed,
      })
      setIsSuccess(true)
    } catch {
      // Demo mode — always show success even without Supabase
      setIsSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} id="form-section" className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
      {/* Header */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="section-tag">الخطوة الثانية</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
          قولنا عنك أكتر{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--neon-purple), var(--neon-pink))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>🎯</span>
        </h2>
      </motion.div>

      {/* Progress stepper */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-8 sm:mb-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        {['القسم', 'البيانات', 'الإرسال'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300"
                style={{
                  background: (i === 0 && department) ? 'var(--neon-cyan)' : 'var(--glass-border)',
                  color: (i === 0 && department) ? '#000' : 'var(--text-dim)',
                }}
              >
                {(i === 0 && department) ? '✓' : i + 1}
              </div>
              <span className="text-[9px] sm:text-[10px] font-grotesk" style={{ color: 'var(--text-muted)' }}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div
                className="w-8 sm:w-12 h-px mb-5 transition-all duration-300"
                style={{ background: (i === 0 && department) ? 'var(--neon-cyan)' : 'var(--glass-border)' }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Form card */}
      <motion.div
        className="glass-card max-w-xl mx-auto p-5 sm:p-8 md:p-12"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Name */}
        <FormGroup label="اسمك الكريم 👑">
          <input
            className="neon-input"
            placeholder="اكتب اسمك هنا (متخبيش نفسك)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        {/* Department (read-only, linked to card section above) */}
        <FormGroup
          label="القسم المختار 🏫"
          helper={!department ? 'اختر القسم من فوق الأول 👆' : undefined}
        >
          <div
            className="neon-input flex items-center justify-between cursor-pointer select-none"
            style={{
              color: department ? DEPT_META[department]?.color : 'var(--text-dim)',
              borderColor: department ? DEPT_META[department]?.border : 'var(--glass-border)',
            }}
            onClick={() => document.getElementById('departments')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-sm sm:text-base">
              {department
                ? `${DEPT_META[department].icon} ${DEPT_META[department].label} — ${DEPT_META[department].full}`
                : 'اختر القسم من فوق ↑'}
            </span>
            {department && <span className="text-xs">✓</span>}
          </div>
        </FormGroup>

        {/* Track */}
        <FormGroup
          label="التراك بتاعك 🛤️"
          helper="متخجلش… كلنا بدأنا من تراك معرفناش 😭"
        >
          <input
            className="neon-input"
            placeholder="مثال: Web Dev, AI, Mobile, Networks..."
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          />
        </FormGroup>

        {/* Level */}
        <FormGroup label="مستواك الحالي 📊">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {LEVELS.map((lvl) => {
              const meta = LEVEL_META[lvl as keyof typeof LEVEL_META]
              const isSelected = level === lvl
              return (
                <motion.button
                  key={lvl}
                  type="button"
                  className="px-2 sm:px-3 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-center transition-all duration-200"
                  style={{
                    background: isSelected ? 'rgba(0,245,255,0.1)' : 'var(--glass)',
                    border: `1px solid ${isSelected ? 'var(--neon-cyan)' : 'var(--glass-border)'}`,
                    color: isSelected ? 'var(--neon-cyan)' : 'var(--text-dim)',
                    fontFamily: 'var(--font-cairo)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setLevel(lvl)}
                  whileTap={{ scale: 0.97 }}
                >
                  {meta?.emoji} {lvl}
                </motion.button>
              )
            })}
          </div>
          <AnimatePresence>
            {level && LEVEL_META[level as keyof typeof LEVEL_META] && (
              <motion.p
                className="text-xs mt-2 sm:mt-3 italic"
                style={{ color: 'var(--neon-cyan)' }}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {LEVEL_META[level as keyof typeof LEVEL_META].helper}
              </motion.p>
            )}
          </AnimatePresence>
        </FormGroup>

        {/* Contact method */}
        <FormGroup label="وسيلة التواصل 📱">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
            {CONTACT_METHODS.map((method) => (
              <motion.button
                key={method}
                type="button"
                className="px-2 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200"
                style={{
                  background: contactMethod === method ? 'rgba(180,79,255,0.1)' : 'var(--glass)',
                  border: `1px solid ${contactMethod === method ? 'var(--neon-purple)' : 'var(--glass-border)'}`,
                  color: contactMethod === method ? 'var(--neon-purple)' : 'var(--text-dim)',
                  fontFamily: 'var(--font-grotesk)',
                  cursor: 'pointer',
                }}
                onClick={() => setContactMethod(method)}
                whileTap={{ scale: 0.97 }}
              >
                {method}
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            {contactMethod && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <input
                  className="neon-input"
                  placeholder={
                    contactMethod === 'WhatsApp'
                      ? 'رقمك بالكود الدولي: 201xxxxxxxxx'
                      : contactMethod === 'Email'
                      ? 'your@email.com'
                      : `يوزرك على ${contactMethod}`
                  }
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  dir={contactMethod === 'WhatsApp' || contactMethod === 'Email' ? 'ltr' : 'rtl'}
                />
                <p className="text-xs mt-2" style={{ color: 'var(--text-dim)' }}>
                  مش هنبعتلك spam، وعد 🤞
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </FormGroup>

        {/* Submit button */}
        <MagneticButton
          className="glow-btn w-full py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg font-black mt-2"
          style={{ fontFamily: 'var(--font-cairo)' }}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'inline-block' }}
              >
                ⏳
              </motion.span>
              جاري الإنقاذ...
            </span>
          ) : (
            'سجلني يا منقذ ✅'
          )}
        </MagneticButton>

        <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          بياناتك آمنة مع مازن المنقذ™ — لن يُساء استخدامها أبدًا 🛡️
        </p>
      </motion.div>
    </section>
  )
}
