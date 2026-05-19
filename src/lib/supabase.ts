import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Registration, RegistrationInput, AdminStats } from '@/types'

// ─── Lazy singleton — never crashes at build time ──────────────────────────
let _client: SupabaseClient | null = null

function getClient(): SupabaseClient | null {
  if (typeof window === 'undefined') return null          // server / build time
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null                          // env vars not set
  if (!_client) _client = createClient(url, key)
  return _client
}

// ─── Public helpers ────────────────────────────────────────────────────────

export async function submitRegistration(
  data: RegistrationInput,
): Promise<{ success: boolean; error?: string }> {
  const client = getClient()
  if (!client) {
    // Demo mode — no Supabase configured, silently succeed
    return { success: true }
  }
  const { error } = await client.from('registrations').insert([data])
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function getRegistrations(): Promise<Registration[]> {
  const client = getClient()
  if (!client) return []
  const { data, error } = await client
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getAdminStats(): Promise<AdminStats> {
  const regs = await getRegistrations()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayCount = regs.filter((r) => new Date(r.created_at) >= today).length

  const deptColors: Record<string, string> = {
    CS: '#00f5ff',
    SC: '#b44fff',
    IS: '#39ff14',
    AI: '#ff2d78',
  }

  const deptMap: Record<string, number> = {}
  const levelMap: Record<string, number> = {}

  for (const r of regs) {
    deptMap[r.department] = (deptMap[r.department] ?? 0) + 1
    levelMap[r.level] = (levelMap[r.level] ?? 0) + 1
  }

  const byDept = Object.entries(deptMap).map(([department, count]) => ({
    department: department as Registration['department'],
    count,
    color: deptColors[department] ?? '#888',
  }))

  const byLevel = Object.entries(levelMap).map(([level, count]) => ({
    level: level as Registration['level'],
    count,
  }))

  return {
    total: regs.length,
    today: todayCount,
    byDept,
    byLevel,
    recent: regs.slice(0, 10),
  }
}
