import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getPlanLimits } from '@/lib/usage'
import { redirect } from 'next/navigation'

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
      .limit(20),
    getPlanLimits(adminSupabase, user.id),
  ])

  const planLabel = planLimits.plan.charAt(0).toUpperCase() + planLimits.plan.slice(1)
  const isLimitReached = planLimits.limit !== null && planLimits.used >= planLimits.limit
  const isNearingLimit =
    !isLimitReached &&
    planLimits.plan === 'free' &&
    planLimits.limit !== null &&
    planLimits.used >= 2

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
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">
            AIDEN Dashboard
          </h1>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-border-subtle px-3 py-1.5 text-sm text-white-muted hover:text-white hover:border-white transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        {/* Limit reached banner */}
        {isLimitReached && (
          <div className="rounded-xl border border-red-hot/30 bg-red-hot/10 px-6 py-4 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-white">
              You have reached your free limit this month. Upgrade to keep analysing.
            </p>
            <a
              href="/pricing"
              className="shrink-0 rounded-lg bg-red-hot px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Upgrade now
            </a>
          </div>
        )}

        {/* User card */}
        <div className="rounded-2xl border border-border-subtle bg-black-card p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-hot/20 border border-red-hot/30">
              <span className="text-lg font-semibold text-red-hot">
                {user.email?.[0]?.toUpperCase() ?? '?'}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white">{user.email}</p>
                <span className="rounded-full bg-red-hot/20 border border-red-hot/30 px-2 py-0.5 text-xs font-medium text-red-hot">
                  {planLabel}
                </span>
              </div>
              <p className="text-xs text-white-dim">Authenticated via magic link</p>
            </div>
          </div>

          {/* Usage counter */}
          <div className="mt-6 rounded-xl border border-border-subtle bg-black-ink px-5 py-4">
            <p className="text-xs font-medium text-white-dim uppercase tracking-wide">
              Analyses this month
            </p>
            <p className="mt-1 text-2xl font-bold text-white">
              {planLimits.limit === null
                ? 'Unlimited'
                : `${planLimits.used} of ${planLimits.limit}`}
            </p>
            {planLimits.limit !== null && (
              <div className="mt-2 h-1.5 w-full rounded-full bg-border-subtle">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    isLimitReached ? 'bg-red-hot' : 'bg-orange-accent'
                  }`}
                  style={{ width: `${Math.min((planLimits.used / planLimits.limit) * 100, 100)}%` }}
                />
              </div>
            )}
            {isNearingLimit && (
              <p className="mt-3 text-sm text-white-muted">
                Running low?{' '}
                <a href="/pricing" className="font-medium text-orange-accent underline hover:opacity-80">
                  Upgrade for unlimited analyses
                </a>
              </p>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Analyse new brief"
              description="Run a new brief through AIDEN's intelligence engine."
              href="/generate"
            />
          </div>
        </div>

        {/* Brief analysis history */}
        <div className="rounded-2xl border border-border-subtle bg-black-card p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white uppercase">My Brief Analyses</h2>
            <a
              href="/generate"
              className="rounded-lg bg-red-hot px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Analyse new brief
            </a>
          </div>

          {!generations || generations.length === 0 ? (
            <p className="mt-4 text-sm text-white-muted">
              No analyses yet.{' '}
              <a href="/generate" className="text-orange-accent hover:underline">
                Analyse your first brief
              </a>
              .
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border-subtle">
              {(generations as GenerationRecord[]).map((gen) => {
                const briefSnippet = (
                  gen.input_data?.briefText ??
                  gen.input_data?.productDescription ??
                  gen.input_data?.productName ??
                  'Untitled brief'
                ).slice(0, 80)
                const score = gen.output_copy?.briefScore ?? gen.output_copy?.score ?? null
                const gapsCount = gen.output_copy?.gaps?.length ?? null

                return (
                  <li key={gen.id} className="flex items-start justify-between gap-4 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white line-clamp-2">
                        {briefSnippet}
                        {(gen.input_data?.briefText ?? gen.input_data?.productDescription ?? '').length > 80 ? '…' : ''}
                      </p>
                      <div className="mt-1.5 flex items-center gap-3 text-xs text-white-dim">
                        {score !== null && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium text-orange-accent">Score:</span>
                            {score}
                          </span>
                        )}
                        {gapsCount !== null && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium text-amber-500">Gaps:</span>
                            {gapsCount} found
                          </span>
                        )}
                        <span>
                          {new Date(gen.created_at).toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`/preview/${gen.id}`}
                      className="shrink-0 rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-medium text-white-muted hover:text-white hover:border-white transition-colors"
                    >
                      View
                    </a>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}

function DashboardCard({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      className="group rounded-xl border border-border-subtle p-5 transition hover:border-red-hot/50 hover:bg-red-hot/5"
    >
      <h3 className="text-sm font-semibold text-white uppercase group-hover:text-orange-accent">
        {title}
      </h3>
      <p className="mt-1 text-xs text-white-dim">{description}</p>
    </a>
  )
}
