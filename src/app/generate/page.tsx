'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LandingPageForm from '@/components/LandingPageForm'
import LandingPagePreview, { GeneratedContent } from '@/components/LandingPagePreview'
import { TemplateId, DEFAULT_TEMPLATE_ID } from '@/lib/templates'
import { createClient } from '@/lib/supabase/client'

type Status = 'idle' | 'loading' | 'done' | 'error' | 'unauthenticated'

export interface GenerateFormData {
  productName: string
  productDescription: string
  targetAudience?: string
  features?: string[]
  tone?: 'professional' | 'casual' | 'bold' | 'minimal'
  template?: string
}

export default function GeneratePage() {
  const [status, setStatus] = useState<Status>('idle')
  const [generatedData, setGeneratedData] = useState<GeneratedContent | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)
  const [productName, setProductName] = useState('')
  const [activeTemplateId, setActiveTemplateId] = useState<TemplateId>(DEFAULT_TEMPLATE_ID)
  const [isPaidUser, setIsPaidUser] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkPlan() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
      if (!user) return
      const { data } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user.id)
        .single()
      if (data?.plan === 'pro' || data?.plan === 'single') {
        setIsPaidUser(true)
      }
    }
    checkPlan()
  }, [])

  async function handleGenerate(formData: GenerateFormData) {
    if (!isAuthenticated) {
      setStatus('unauthenticated')
      return
    }
    setStatus('loading')
    setApiError(null)
    setProductName(formData.productName)
    if (formData.template) {
      setActiveTemplateId(formData.template as TemplateId)
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Generation failed')
      }

      const data: GeneratedContent = await response.json()
      setGeneratedData(data)
      setStatus('done')
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors">
              AIDEN
            </Link>
            <p className="mt-0.5 text-sm text-gray-500">
              Describe your product and get high-converting copy instantly.
            </p>
          </div>
          <Link href="/pricing" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            Pricing
          </Link>
        </div>
      </header>

      {/* Two-column layout */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Left: Form */}
          <div className="w-full lg:w-[420px] lg:flex-shrink-0">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <LandingPageForm
                onGenerate={handleGenerate}
                isLoading={status === 'loading'}
                error={status === 'error' ? apiError : null}
              />
            </div>
          </div>

          {/* Right: Preview / Loading / Empty */}
          <div className="min-w-0 flex-1">
            {status === 'loading' && <LoadingState />}
            {status === 'unauthenticated' && <AuthPrompt />}
            {status === 'done' && generatedData && (
              <LandingPagePreview data={generatedData} productName={productName} templateId={activeTemplateId} isPaidUser={isPaidUser} />
            )}
            {(status === 'idle' || status === 'error') && !generatedData && (
              <EmptyPreview />
            )}
            {status === 'done' && !generatedData && <EmptyPreview />}
          </div>
        </div>
      </div>
    </main>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white py-24 text-center shadow-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      <p className="mt-4 text-sm font-medium text-gray-700">Generating your landing page…</p>
      <p className="mt-1 text-xs text-gray-400">This usually takes a few seconds</p>
    </div>
  )
}

function AuthPrompt() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 py-24 text-center px-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
        <svg
          className="h-7 w-7 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">Sign up free to generate your page</h2>
      <p className="mt-2 text-sm text-gray-600 max-w-xs">
        Get 3 free generations per month. No credit card required.
      </p>
      <Link
        href="/login?redirect=/generate"
        className="mt-6 inline-block rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
      >
        Sign up free
      </Link>
      <p className="mt-3 text-xs text-gray-400">
        Already have an account?{' '}
        <Link href="/login?redirect=/generate" className="text-indigo-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}

function EmptyPreview() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
        <svg
          className="h-7 w-7 text-indigo-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-700">Your preview will appear here</p>
      <p className="mt-1 text-xs text-gray-400">Fill in the form and click Generate</p>
    </div>
  )
}
