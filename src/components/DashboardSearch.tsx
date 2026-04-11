'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface GenerationRecord {
  id: string
  input_data: {
    productName?: string
    productDescription?: string
    briefText?: string
    brandName?: string
  }
  output_copy: {
    briefScore?: number
    score?: number
    gaps?: string[]
  }
  created_at: string
}

export default function DashboardSearch({ generations }: { generations: GenerationRecord[] }) {
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date')

  const filtered = useMemo(() => {
    let result = generations
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(g => {
        const text = (g.input_data?.briefText ?? g.input_data?.productDescription ?? g.input_data?.brandName ?? '').toLowerCase()
        return text.includes(q)
      })
    }
    if (sortBy === 'score') {
      result = [...result].sort((a, b) => {
        const sa = a.output_copy?.briefScore ?? a.output_copy?.score ?? 0
        const sb = b.output_copy?.briefScore ?? b.output_copy?.score ?? 0
        return sb - sa
      })
    }
    return result
  }, [generations, query, sortBy])

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search briefs..."
            className="w-full border border-border-subtle bg-black-deep pl-9 pr-3 py-2 text-sm text-white placeholder-white-dim outline-none focus:border-red-hot"
          />
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'date' | 'score')}
          className="border border-border-subtle bg-black-deep px-3 py-2 text-xs text-white-muted outline-none focus:border-red-hot"
        >
          <option value="date">Newest first</option>
          <option value="score">Highest score</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-white-dim py-4">No matching briefs found.</p>
      ) : (
        <ul className="divide-y divide-border-subtle">
          {filtered.map((gen) => {
            const briefSnippet = (
              gen.input_data?.briefText ??
              gen.input_data?.productDescription ??
              gen.input_data?.productName ??
              'Untitled brief'
            ).slice(0, 100)
            const brandName = gen.input_data?.brandName
            const score = gen.output_copy?.briefScore ?? gen.output_copy?.score ?? null
            const gapsCount = gen.output_copy?.gaps?.length ?? null

            return (
              <li key={gen.id} className="flex items-start justify-between gap-4 py-4">
                <div className="min-w-0 flex-1">
                  {brandName && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-orange-accent mb-0.5">{brandName}</p>
                  )}
                  <p className="text-sm font-medium text-white line-clamp-2">
                    {briefSnippet}
                    {(gen.input_data?.briefText ?? '').length > 100 ? '…' : ''}
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
                        {gapsCount}
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
                <Link
                  href={`/preview/${gen.id}`}
                  className="shrink-0 border border-border-subtle px-3 py-1.5 text-xs font-medium text-white-muted hover:text-white hover:border-white transition-colors"
                >
                  View
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      <p className="mt-4 text-xs text-white-dim">
        {filtered.length} of {generations.length} {generations.length === 1 ? 'analysis' : 'analyses'}
      </p>
    </div>
  )
}
