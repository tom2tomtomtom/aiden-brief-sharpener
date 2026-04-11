import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getPlanLimits } from '@/lib/usage'
import { redirect } from 'next/navigation'
import DashboardSearch from '@/components/DashboardSearch'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your brief analysis history and manage your AIDEN account.',
}

interface GenerationRecord {
  id: string
  input_data: {
    productName?: string
    productDescription?: string
    briefText?: string
    brandName?: string
    template?: string
    targetAudience?: string
    tone?: string
  }
  output_copy: {
    headline?: string
    subheadline?: string
    briefScore?: number
    score?: number
    gaps?: string[]
    scoreBreakdown?: { total: number; dimensions: unknown[] }
  }
  template_id: string | null
  created_at: string
}

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const adminSupabase = createAdminClient()
  const [{ data: generations }, planLimits] = await Promise.all([
    adminSupabase
      .from('generations')
      .select('id, input_data, output_copy, template_id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50),
    getPlanLimits(adminSupabase, user.id),
  ])

  const planLabel = planLimits.plan.charAt(0).toUpperCase() + planLimits.plan.slice(1)
  const isLimitReached = planLimits.limit !== null && planLimits.used >= planLimits.limit
  const isNearingLimit =
    !isLimitReached &&
    planLimits.plan === 'free' &&
    planLimits.limit !== null &&
    planLimits.used >= 2

  const totalAnalyses = generations?.length ?? 0
  const avgScore = totalAnalyses > 0
    ? Math.round(
        (generations as GenerationRecord[])
          .map(g => g.output_copy?.briefScore ?? g.output_copy?.score ?? null)
          .filter((s): s is number => s !== null)
          .reduce((sum, s, _, arr) => sum + s / arr.length, 0)
      )
    : null

  async function signOut() {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-black-ink">
      <header className="border-b border-border-subtle bg-black-ink px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-red-hot uppercase hover:text-orange-accent transition-colors">
              AIDEN
            </Link>
            <span className="text-white-dim">·</span>
            <h1 className="text-sm font-semibold text-white uppercase tracking-wide">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/generate" className="bg-red-hot px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-dim transition-colors">
              New analysis
            </Link>
            <Link href="/pricing" className="text-xs font-medium text-white-muted hover:text-orange-accent transition-colors">
              Pricing
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="border border-border-subtle px-3 py-1.5 text-xs text-white-muted hover:text-white hover:border-white transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        {isLimitReached && (
          <div className="border border-red-hot/30 bg-red-hot/10 px-6 py-4 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-white">
              You have reached your free limit this month. Upgrade to keep analysing.
            </p>
            <Link href="/pricing" className="shrink-0 bg-red-hot px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              Upgrade now
            </Link>
          </div>
        )}

        {/* Stats row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-border-subtle bg-black-card p-5">
            <p className="text-xs font-medium text-white-dim uppercase tracking-wide">Plan</p>
            <p className="mt-1 text-2xl font-bold text-white">{planLabel}</p>
          </div>
          <div className="border border-border-subtle bg-black-card p-5">
            <p className="text-xs font-medium text-white-dim uppercase tracking-wide">This month</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {planLimits.limit === null ? `${planLimits.used}` : `${planLimits.used}/${planLimits.limit}`}
            </p>
            {planLimits.limit !== null && (
              <div className="mt-2 h-1.5 w-full rounded-full bg-border-subtle">
                <div
                  className={`h-1.5 rounded-full transition-all ${isLimitReached ? 'bg-red-hot' : 'bg-orange-accent'}`}
                  style={{ width: `${Math.min((planLimits.used / planLimits.limit) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
          <div className="border border-border-subtle bg-black-card p-5">
            <p className="text-xs font-medium text-white-dim uppercase tracking-wide">Total analyses</p>
            <p className="mt-1 text-2xl font-bold text-white">{totalAnalyses}</p>
          </div>
          <div className="border border-border-subtle bg-black-card p-5">
            <p className="text-xs font-medium text-white-dim uppercase tracking-wide">Avg score</p>
            <p className="mt-1 text-2xl font-bold text-white">{avgScore !== null ? `${avgScore}/100` : '—'}</p>
          </div>
        </div>

        {isNearingLimit && (
          <div className="border border-yellow-electric/20 bg-black-card px-6 py-4 flex items-center justify-between gap-4">
            <p className="text-sm text-white-muted">
              Running low on free analyses.
            </p>
            <Link href="/pricing" className="text-sm font-medium text-orange-accent underline hover:opacity-80">
              Upgrade for unlimited
            </Link>
          </div>
        )}

        {/* User info */}
        <div className="border border-border-subtle bg-black-card p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center bg-red-hot/20 border border-red-hot/30">
                <span className="text-sm font-semibold text-red-hot">
                  {user.email?.[0]?.toUpperCase() ?? '?'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user.email}</p>
                <p className="text-xs text-white-dim">{planLabel} plan · Authenticated via magic link</p>
              </div>
            </div>
            {planLimits.plan !== 'free' && (
              <Link href="/pricing" className="border border-border-subtle px-3 py-1.5 text-xs font-medium text-white-muted hover:text-white hover:border-white transition-colors">
                Manage billing
              </Link>
            )}
          </div>
        </div>

        {/* Brief analysis history with search */}
        <div className="border border-border-subtle bg-black-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-white uppercase">Brief Analyses</h2>
            <Link href="/generate" className="bg-red-hot px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
              Analyse new brief
            </Link>
          </div>

          {generations && generations.length >= 2 && (() => {
            const scoredGens = (generations as GenerationRecord[])
              .slice()
              .reverse()
              .slice(-10)
              .map(g => g.output_copy?.briefScore ?? g.output_copy?.score ?? null)
              .filter((s): s is number => s !== null)
            if (scoredGens.length < 2) return null
            const W = 200
            const H = 40
            const PAD = 4
            const min = Math.min(...scoredGens)
            const max = Math.max(...scoredGens)
            const range = max - min || 1
            const points = scoredGens
              .map((s, i) => {
                const x = PAD + (i / (scoredGens.length - 1)) * (W - PAD * 2)
                const y = PAD + (1 - (s - min) / range) * (H - PAD * 2)
                return `${x},${y}`
              })
              .join(' ')
            return (
              <div className="mb-6 border border-border-subtle bg-black-ink px-5 py-4">
                <p className="text-xs font-medium text-white-dim uppercase tracking-wide mb-3">Score trend</p>
                <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-label="Score trend sparkline">
                  <polyline points={points} fill="none" stroke="#ff2e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )
          })()}

          {!generations || generations.length === 0 ? (
            <p className="text-sm text-white-muted">
              No analyses yet.{' '}
              <Link href="/generate" className="text-orange-accent hover:underline">Analyse your first brief</Link>.
            </p>
          ) : (
            <DashboardSearch generations={JSON.parse(JSON.stringify(generations))} />
          )}
        </div>
      </div>
    </main>
  )
}
