import { create } from 'zustand'
import type { Department, Level, ContactMethod, SkillNeeded } from '@/types'

interface FormState {
  step: number
  setStep: (step: number) => void

  // Fields
  name: string
  department: Department | null
  track: string
  level: Level | null
  skillsNeeded: SkillNeeded[]
  contactMethod: ContactMethod | null
  contactValue: string
  rescuePercentage: number
  showOnBoard: boolean
  avatarSeed: string

  setName: (v: string) => void
  setDepartment: (v: Department) => void
  setTrack: (v: string) => void
  setLevel: (v: Level) => void
  toggleSkill: (v: SkillNeeded) => void
  setContactMethod: (v: ContactMethod) => void
  setContactValue: (v: string) => void
  setRescuePercentage: (v: number) => void
  setShowOnBoard: (v: boolean) => void
  setAvatarSeed: (v: string) => void

  // UI
  isSubmitting: boolean
  isSuccess: boolean
  setIsSubmitting: (v: boolean) => void
  setIsSuccess: (v: boolean) => void
  reset: () => void
}

export const useFormStore = create<FormState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),

  name: '',
  department: null,
  track: '',
  level: null,
  skillsNeeded: [],
  contactMethod: null,
  contactValue: '',
  rescuePercentage: 0,
  showOnBoard: true,
  avatarSeed: '',

  setName: (name) => set({ name }),
  setDepartment: (department) => set({ department, step: 2 }),
  setTrack: (track) => set({ track }),
  setLevel: (level) => set({ level }),
  toggleSkill: (skill) =>
    set((s) => ({
      skillsNeeded: s.skillsNeeded.includes(skill)
        ? s.skillsNeeded.filter((x) => x !== skill)
        : [...s.skillsNeeded, skill],
    })),
  setContactMethod: (contactMethod) => set({ contactMethod }),
  setContactValue: (contactValue) => set({ contactValue }),
  setRescuePercentage: (rescuePercentage) => set({ rescuePercentage }),
  setShowOnBoard: (showOnBoard) => set({ showOnBoard }),
  setAvatarSeed: (avatarSeed) => set({ avatarSeed }),

  isSubmitting: false,
  isSuccess: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setIsSuccess: (isSuccess) => set({ isSuccess }),

  reset: () =>
    set({
      step: 1,
      name: '',
      department: null,
      track: '',
      level: null,
      skillsNeeded: [],
      contactMethod: null,
      contactValue: '',
      rescuePercentage: 0,
      showOnBoard: true,
      avatarSeed: '',
      isSubmitting: false,
      isSuccess: false,
    }),
}))
