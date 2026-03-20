'use client'

import { useState } from 'react'
import Link from 'next/link'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: null,
    description: "Try AIDEN and see what's possible.",
    features: [
      '3 generations per month',
      'All templates',
      'Live preview',
      'AIDEN attribution on exports',
    ],
    cta: 'Start Free',
    ctaType: 'link' as const,
    href: '/generate',
    plan: null,
    highlighted: false,
  },
  {
    name: 'Single',
    price: '$19',
    period: 'one-time',
    description: 'Perfect for one landing page, done right.',
    features: [
      '1 landing page generation',
      'All templates',
      'Live preview',
      'No AIDEN attribution',
      'HTML export',
    ],
    cta: 'Buy Single Page',
    ctaType: 'checkout' as const,
    href: null,
    plan: 'single' as const,
    highlighted: true,
  },
  {
    name: 'Pro',
    price: '$39',
    period: 'per month',
    description: 'For teams and founders shipping fast.',
    features: [
      'Unlimited generations',
      'All templates',
      'Live preview',
      'No AIDEN attribution',
      'HTML export',
      'Custom branding',
    ],
    cta: 'Start Pro',
    ctaType: 'checkout' as const,
    href: null,
    plan: 'pro' as const,
    highlighted: false,
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout(plan: 'single' | 'pro') {
    setLoading(plan)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/login'
          return
        }
        throw new Error(data.error || 'Failed to start checkout')
      }
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      {/* Header */}
      <div className="text-center mb-14">
        <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-6 inline-block">
          ← Back to home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, honest pricing</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Start free. Pay only when you need more. No hidden fees.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="max-w-md mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm text-center">
          {error}
        </div>
      )}

      {/* Pricing cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-2xl p-8 flex flex-col ${
              tier.highlighted
                ? 'bg-indigo-600 text-white shadow-2xl scale-105'
                : 'bg-white text-gray-900 shadow-md'
            }`}
          >
            {/* Most Popular badge */}
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
              </div>
            )}

            {/* Tier name */}
            <div className="mb-6">
              <h2
                className={`text-sm font-semibold uppercase tracking-widest mb-3 ${
                  tier.highlighted ? 'text-indigo-200' : 'text-indigo-600'
                }`}
              >
                {tier.name}
              </h2>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span
                    className={`text-sm mb-1 ${
                      tier.highlighted ? 'text-indigo-200' : 'text-gray-500'
                    }`}
                  >
                    / {tier.period}
                  </span>
                )}
              </div>
              <p
                className={`text-sm ${
                  tier.highlighted ? 'text-indigo-100' : 'text-gray-500'
                }`}
              >
                {tier.description}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <svg
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      tier.highlighted ? 'text-indigo-200' : 'text-indigo-500'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={tier.highlighted ? 'text-indigo-50' : 'text-gray-600'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {tier.ctaType === 'link' ? (
              <Link
                href={tier.href!}
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
                  tier.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {tier.cta}
              </Link>
            ) : (
              <button
                onClick={() => handleCheckout(tier.plan!)}
                disabled={loading !== null}
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                  tier.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {loading === tier.plan ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Loading…
                  </span>
                ) : (
                  tier.cta
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-sm text-gray-400 mt-12">
        Payments processed securely by Stripe. Cancel anytime.
      </p>
    </main>
  )
}
