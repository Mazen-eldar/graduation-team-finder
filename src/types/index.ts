export type Department = 'CS' | 'SC' | 'IS' | 'AI'

export type Level =
  | 'لسه بتعلم'
  | 'Beginner'
  | 'Mid-Level'
  | 'Senior'
  | 'فضائي'

export type ContactMethod = 'WhatsApp' | 'LinkedIn' | 'Facebook' | 'Telegram' | 'Email'

export type SkillNeeded =
  | 'Frontend'
  | 'Backend'
  | 'AI / ML'
  | 'Flutter'
  | 'UI/UX'
  | 'Embedded'
  | 'DevOps'
  | 'Data Science'
  | 'Security'
  | 'أي حاجة بصراحة'

export interface Registration {
  id: string
  name: string
  department: Department
  track: string
  level: Level
  skills_needed: SkillNeeded[]
  contact_method: ContactMethod
  contact_value: string
  rescue_percentage: number
  show_on_board: boolean
  avatar_seed: string
  created_at: string
}

export interface RegistrationInput {
  name: string
  department: Department
  track: string
  level: Level
  skills_needed: SkillNeeded[]
  contact_method: ContactMethod
  contact_value: string
  rescue_percentage: number
  show_on_board: boolean
  avatar_seed: string
}

export interface DeptStats {
  department: Department
  count: number
  color: string
}

export interface LevelStats {
  level: Level
  count: number
}

export interface AdminStats {
  total: number
  today: number
  byDept: DeptStats[]
  byLevel: LevelStats[]
  recent: Registration[]
}

export interface MatchResult {
  score: number
  label: string
  compatible: SkillNeeded[]
  message: string
}
