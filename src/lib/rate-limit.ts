import { createAdminClient } from '@/lib/supabase/admin'

const WINDOW_SECONDS = 60
const MAX_REQUESTS = 10
const FREE_GUEST_MONTHLY_LIMIT = 3

function currentMonthKey(): string {
  const now = new Date()
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
}

export async function checkRateLimit(
  ip: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const supabase = createAdminClient()
  const now = new Date()
  const nowIso = now.toISOString()

  // Atomic upsert — always write, then read the result to decide
  await supabase.from('rate_limits').upsert(
    { ip, request_count: 1, window_start: nowIso },
    { onConflict: 'ip', ignoreDuplicates: true }
  )

  const { data: existing } = await supabase
    .from('rate_limits')
    .select('request_count, window_start')
    .eq('ip', ip)
    .single()

  if (!existing) {
    return { allowed: true }
  }

  const windowStart = new Date(existing.window_start)
  const elapsedSeconds = (now.getTime() - windowStart.getTime()) / 1000

  if (elapsedSeconds >= WINDOW_SECONDS) {
    // Window expired — reset atomically
    await supabase
      .from('rate_limits')
      .update({ request_count: 1, window_start: nowIso })
      .eq('ip', ip)
      .eq('window_start', existing.window_start)
    return { allowed: true }
  }

  if (existing.request_count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil(WINDOW_SECONDS - elapsedSeconds)
    return { allowed: false, retryAfter }
  }

  // Conditional increment — only if count hasn't changed (optimistic lock)
  await supabase
    .from('rate_limits')
    .update({ request_count: existing.request_count + 1 })
    .eq('ip', ip)
    .eq('request_count', existing.request_count)

  return { allowed: true }
}

export async function checkGuestMonthlyLimit(
  identifier: string,
  limit = FREE_GUEST_MONTHLY_LIMIT
): Promise<{ allowed: boolean; remaining: number; limit: number }> {
  const supabase = createAdminClient()
  const month = currentMonthKey()
  const key = `guest:${month}:${identifier}`

  const { data: existing } = await supabase
    .from('rate_limits')
    .select('request_count')
    .eq('ip', key)
    .single()

  const current = existing?.request_count ?? 0
  if (current >= limit) {
    return { allowed: false, remaining: 0, limit }
  }

  return { allowed: true, remaining: Math.max(0, limit - current), limit }
}

export async function incrementGuestMonthlyUsage(
  identifier: string
): Promise<{ remaining: number; limit: number }> {
  const supabase = createAdminClient()
  const month = currentMonthKey()
  const key = `guest:${month}:${identifier}`
  const limit = FREE_GUEST_MONTHLY_LIMIT
  const nowIso = new Date().toISOString()

  const { data: existing } = await supabase
    .from('rate_limits')
    .select('request_count')
    .eq('ip', key)
    .single()

  const current = existing?.request_count ?? 0

  await supabase.from('rate_limits').upsert(
    {
      ip: key,
      request_count: current + 1,
      window_start: nowIso,
    },
    { onConflict: 'ip' }
  )

  return { remaining: Math.max(0, limit - (current + 1)), limit }
}
