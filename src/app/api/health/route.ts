import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

async function checkSupabase(): Promise<'ok' | 'error'> {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase
      .from('usage_tracking')
      .select('count', { count: 'exact', head: true })
      .limit(1)
    return error ? 'error' : 'ok'
  } catch {
    return 'error'
  }
}

function checkAnthropic(): 'configured' | 'missing' {
  const key = process.env.ANTHROPIC_API_KEY
  return key && key.startsWith('sk-ant') ? 'configured' : 'missing'
}

function checkStripe(): 'configured' | 'missing' {
  const key = process.env.STRIPE_SECRET_KEY
  return key && key !== 'placeholder' && key.length > 10 ? 'configured' : 'missing'
}

export async function GET() {
  const [supabase, anthropic, stripe] = await Promise.all([
    checkSupabase(),
    Promise.resolve(checkAnthropic()),
    Promise.resolve(checkStripe()),
  ])

  const services = { supabase, anthropic, stripe }
  const degraded = supabase === 'error' || anthropic === 'missing' || stripe === 'missing'

  return NextResponse.json(
    { status: degraded ? 'degraded' : 'ok', services },
    { status: degraded ? 503 : 200 }
  )
}
