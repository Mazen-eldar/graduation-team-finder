// Server component — opts out of static generation so Supabase env vars
// are only accessed at runtime, never at build time.
export const dynamic = 'force-dynamic'

export { default } from './AdminClient'
