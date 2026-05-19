import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { RegistrationInput } from '@/types'

// Use service role on server for bypassing RLS
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }
  return createClient(url, key)
}

export async function POST(request: Request) {
  try {
    const body: RegistrationInput = await request.json()

    // Validate required fields
    const required: (keyof RegistrationInput)[] = [
      'name', 'department', 'track', 'level', 'contact_method', 'contact_value',
    ]
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        )
      }
    }

    const supabase = getAdminClient()

    const { data, error } = await supabase
      .from('registrations')
      .insert([{
        ...body,
        rescue_percentage: body.rescue_percentage ?? 90,
        created_at: new Date().toISOString(),
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = getAdminClient()

    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
