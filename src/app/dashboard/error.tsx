'use client'

import { useEffect } from 'react'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-black-ink px-4">
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-2xl border border-red-hot/30 bg-black-card px-8 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-hot/20 border border-red-hot/30">
          <svg
            className="h-7 w-7 text-red-hot"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-lg font-semibold text-white uppercase">Something went wrong</h2>
        <p className="mt-2 max-w-sm text-sm text-white-muted">
          We could not load your dashboard. Please try again, and if the problem persists contact support.
        </p>
        {error.message && (
          <p className="mt-2 max-w-sm rounded bg-red-hot/10 border border-red-hot/20 px-3 py-1.5 font-mono text-xs text-red-hot">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="mt-6 rounded-xl bg-red-hot px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
