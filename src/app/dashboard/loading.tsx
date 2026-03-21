export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-black-ink">
      {/* Header skeleton */}
      <header className="border-b border-border-subtle bg-black-ink px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="h-7 w-44 animate-pulse rounded-md bg-border-subtle" />
          <div className="h-8 w-20 animate-pulse rounded-lg bg-border-subtle" />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        {/* User card skeleton */}
        <div className="rounded-2xl border border-border-subtle bg-black-card p-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 animate-pulse rounded-full bg-border-subtle" />
            <div className="space-y-2">
              <div className="h-4 w-48 animate-pulse rounded bg-border-subtle" />
              <div className="h-3 w-32 animate-pulse rounded bg-border-subtle/50" />
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-24 animate-pulse rounded-xl border border-border-subtle bg-border-subtle/30" />
          </div>
        </div>

        {/* Generations list skeleton */}
        <div className="rounded-2xl border border-border-subtle bg-black-card p-8">
          <div className="h-5 w-36 animate-pulse rounded bg-border-subtle" />
          <ul className="mt-4 divide-y divide-border-subtle">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex items-start justify-between gap-4 py-4">
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-48 animate-pulse rounded bg-border-subtle" />
                  <div className="h-3 w-64 animate-pulse rounded bg-border-subtle/50" />
                  <div className="h-3 w-32 animate-pulse rounded bg-border-subtle/50" />
                </div>
                <div className="h-8 w-24 animate-pulse rounded-lg bg-border-subtle/30" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
