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

async function checkAidenApi(): Promise<'ok' | 'error' | 'missing'> {
  const key = process.env.AIDEN_API_KEY
  if (!key) return 'missing'
  const base = process.env.AIDEN_API_URL ?? 'https://aiden-api-production.up.railway.app'
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const res = await fetch(`${base}/api/v1/health`, {
      headers: { 'X-API-Key': key },
      signal: controller.signal,
    })
    clearTimeout(timeout)
    return res.ok ? 'ok' : 'error'
  } catch {
    return 'error'
  }
}

function checkStripe(): 'configured' | 'missing' {
  const key = process.env.STRIPE_SECRET_KEY
  return key && key !== 'placeholder' && key.length > 10 ? 'configured' : 'missing'
}

export async function GET() {
  const [supabase, aidenApi, stripe] = await Promise.all([
    checkSupabase(),
    checkAidenApi(),
    Promise.resolve(checkStripe()),
  ])

  const services = { supabase, aidenApi, stripe }
  const degraded = supabase === 'error' || aidenApi === 'error' || aidenApi === 'missing' || stripe === 'missing'

  return NextResponse.json(
    { status: degraded ? 'degraded' : 'ok', services, timestamp: new Date().toISOString() },
    { status: degraded ? 503 : 200 }
  )
}
