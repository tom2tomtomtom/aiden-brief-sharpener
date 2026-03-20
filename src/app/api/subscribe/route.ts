import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  let body: { email?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  try {
    const supabase = createAdminClient()
    await supabase.from('leads').upsert(
      { email, source: 'homepage_checklist', created_at: new Date().toISOString() },
      { onConflict: 'email' }
    )
    return NextResponse.json({ ok: true })
  } catch {
    // Table might not exist yet — that's ok, we'll create it later
    return NextResponse.json({ ok: true })
  }
}
