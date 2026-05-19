import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SkillNeeded, MatchResult, Level } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRescuePercentage(): number {
  return Math.floor(Math.random() * 14) + 85 // 85–98
}

// Avatar seed from name
export function generateAvatarSeed(name: string): string {
  return encodeURIComponent(name.trim() || 'anonymous') + '-' + Math.floor(Math.random() * 1000)
}

// Gradient avatar colors from seed
export function getAvatarGradient(seed: string): [string, string] {
  const gradients: [string, string][] = [
    ['#00f5ff', '#b44fff'],
    ['#b44fff', '#ff2d78'],
    ['#39ff14', '#00f5ff'],
    ['#ff6a00', '#ff2d78'],
    ['#00f5ff', '#39ff14'],
    ['#ff2d78', '#b44fff'],
  ]
  let hash = 0
  for (const c of seed) hash = (hash * 31 + c.charCodeAt(0)) & 0xffffffff
  return gradients[Math.abs(hash) % gradients.length]
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
}

// ── Department metadata ──────────────────────────────────────────────────────

export const DEPT_META = {
  CS: {
    label: 'CS', full: 'Computer Science', icon: '💻',
    color: '#00f5ff', tag: 'ALGORITHMS & CODE',
    glow: 'rgba(0,245,255,0.25)', border: 'rgba(0,245,255,0.4)',
  },
  SC: {
    label: 'SC', full: 'Security', icon: '🔐',
    color: '#b44fff', tag: 'HACK THE PLANET',
    glow: 'rgba(180,79,255,0.25)', border: 'rgba(180,79,255,0.4)',
  },
  IS: {
    label: 'IS', full: 'Information Systems', icon: '📊',
    color: '#39ff14', tag: 'DATA & SYSTEMS',
    glow: 'rgba(57,255,20,0.25)', border: 'rgba(57,255,20,0.4)',
  },
  AI: {
    label: 'AI', full: 'Artificial Intelligence', icon: '🤖',
    color: '#ff2d78', tag: 'FUTURE IS NOW',
    glow: 'rgba(255,45,120,0.25)', border: 'rgba(255,45,120,0.4)',
  },
} as const

// ── Level metadata ───────────────────────────────────────────────────────────

export const LEVEL_META: Record<Level, { emoji: string; helper: string; easterEgg?: string }> = {
  'لسه بتعلم': { emoji: '😅', helper: 'متكسفش يا نجم، كلنا بدأنا كده 😭' },
  Beginner:    { emoji: '🌱', helper: 'تمام، خطوة خطوة وهتوصل 🌱' },
  'Mid-Level': { emoji: '🔥', helper: 'هايل! انت كده في الوسط الحلو 🔥' },
  Senior:      { emoji: '💪', helper: 'والله يا فنان! انت هتنقذ التيم 💪' },
  فضائي:       {
    emoji: '👽',
    helper: 'تم رصد مخلوق خارق داخل السيستم 🛸',
    easterEgg: 'OpenAI wants your location 📍',
  },
}

// ── Skills ───────────────────────────────────────────────────────────────────

export const ALL_SKILLS: SkillNeeded[] = [
  'Frontend', 'Backend', 'AI / ML', 'Flutter',
  'UI/UX', 'Embedded', 'DevOps', 'Data Science',
  'Security', 'أي حاجة بصراحة',
]

export const SKILL_ICONS: Record<SkillNeeded, string> = {
  Frontend:          '🎨',
  Backend:           '⚙️',
  'AI / ML':         '🤖',
  Flutter:           '📱',
  'UI/UX':           '✨',
  Embedded:          '🔌',
  DevOps:            '🚀',
  'Data Science':    '📊',
  Security:          '🔐',
  'أي حاجة بصراحة': '🤷',
}

// ── Team matching ────────────────────────────────────────────────────────────

const COMPAT_MAP: Partial<Record<SkillNeeded, SkillNeeded[]>> = {
  Frontend:       ['UI/UX', 'Backend', 'Flutter'],
  Backend:        ['Frontend', 'DevOps', 'Data Science', 'Security'],
  'AI / ML':      ['Backend', 'Data Science', 'Frontend'],
  Flutter:        ['Backend', 'UI/UX'],
  'UI/UX':        ['Frontend', 'Flutter'],
  Embedded:       ['Backend', 'Security'],
  DevOps:         ['Backend', 'Security'],
  'Data Science': ['AI / ML', 'Backend'],
  Security:       ['Backend', 'Embedded', 'DevOps'],
}

export function calcMatchScore(mySkills: SkillNeeded[], theirSkills: SkillNeeded[]): MatchResult {
  if (mySkills.includes('أي حاجة بصراحة') || theirSkills.includes('أي حاجة بصراحة')) {
    return { score: 95, label: 'Perfect', compatible: theirSkills, message: 'مناسب جدًا ✅' }
  }
  const compatible: SkillNeeded[] = []
  for (const skill of mySkills) {
    const comp = COMPAT_MAP[skill] ?? []
    for (const c of comp) {
      if (theirSkills.includes(c) && !compatible.includes(c)) compatible.push(c)
    }
  }
  const score = Math.min(100, Math.round((compatible.length / Math.max(theirSkills.length, 1)) * 100))
  const label = score >= 75 ? 'Perfect' : score >= 50 ? 'Good' : score >= 25 ? 'Possible' : 'Low'
  const message = score >= 75 ? 'مناسب جدًا ✅' : score >= 50 ? 'ممكن يشتغل 👍' : score >= 25 ? 'فيه أمل 🤔' : 'مش مناسب أوي 😅'
  return { score, label, compatible, message }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    month: 'short', day: 'numeric',
  })
}
