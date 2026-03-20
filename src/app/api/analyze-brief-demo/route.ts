import { NextRequest, NextResponse } from 'next/server'
import { DEMO_BRIEF_TEXT } from '@/lib/demo-brief'

const BRAIN_API_BASE = process.env.AIDEN_BRAIN_API_URL ?? 'https://aiden-brain-v2-production.up.railway.app'

async function callBrainAPI<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${BRAIN_API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    throw new Error(`Brain API ${path} failed (${response.status}): ${errorText}`)
  }

  return response.json() as Promise<T>
}

function hasValue(obj: Record<string, unknown>, ...fields: string[]): boolean {
  for (const field of fields) {
    const value = obj[field]
    if (value !== null && value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0)) {
      return true
    }
  }
  return false
}

const BRIEF_CHECKS = [
  { aliases: ['objectives', 'objective'], label: 'Clear campaign objective or goal' },
  { aliases: ['target_audience', 'audience'], label: 'Target audience definition' },
  { aliases: ['campaign_name', 'brand', 'brand_name'], label: 'Brand context or guidelines' },
  { aliases: ['deliverables', 'requirements', 'platforms'], label: 'Specific deliverables' },
  { aliases: ['tone', 'tone_of_voice'], label: 'Tone of voice or messaging direction' },
  { aliases: ['budget'], label: 'Budget or scope constraints' },
  { aliases: ['timeline', 'timing'], label: 'Timeline or deadlines' },
  { aliases: ['kpis', 'success_metrics', 'confidence'], label: 'Success metrics or KPIs' },
] as const

function calculateBriefScore(briefText: string, extractedBrief: Record<string, unknown>): number {
  const presentCount = BRIEF_CHECKS.filter(({ aliases }) => hasValue(extractedBrief, ...aliases)).length
  const fieldScore = (presentCount / BRIEF_CHECKS.length) * 70
  const lengthScore = Math.min((briefText.length / 500) * 20, 20)
  const structureScore = briefText.includes('\n') ? 10 : 0
  return Math.round(Math.min(fieldScore + lengthScore + structureScore, 100))
}

function identifyGaps(extractedBrief: Record<string, unknown>): string[] {
  return BRIEF_CHECKS
    .filter(({ aliases }) => !hasValue(extractedBrief, ...aliases))
    .map(({ label }) => label)
}

export async function POST(request: NextRequest) {
  let body: { briefText?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { briefText } = body

  // Abuse prevention: only the exact demo brief is accepted
  if (!briefText || briefText.trim() !== DEMO_BRIEF_TEXT.trim()) {
    return NextResponse.json(
      { error: 'This demo endpoint only works with the provided demo brief.' },
      { status: 403 }
    )
  }

  try {
    const extractResult = await callBrainAPI<{ content: Record<string, unknown> }>('/api/extract-brief', {
      brief_text: briefText,
      brand_name: 'Vitafresh Drinks',
      industry: 'FMCG / Beverages',
    })
    const extractedBrief = (extractResult.content ?? extractResult) as Record<string, unknown>

    const strategicAnalysis = await callBrainAPI<Record<string, unknown>>('/aiden/generate-strategy', {
      briefData: extractedBrief,
    })

    const score = calculateBriefScore(briefText, extractedBrief)
    const gaps = identifyGaps(extractedBrief)

    return NextResponse.json({ extractedBrief, strategicAnalysis, gaps, score })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Brain API')) {
      return NextResponse.json({ error: error.message }, { status: 502 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
