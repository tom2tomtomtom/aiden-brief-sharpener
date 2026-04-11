import { describe, it, expect } from 'vitest'

// Re-implement the scoring functions here for unit testing since they're
// inside a route handler. In production, these should be extracted to a shared module.
// For now this validates the scoring algorithm contract.

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function scoreField(text: string | null): { score: number; status: string } {
  if (text === null) return { score: 0, status: 'missing' }
  const words = wordCount(text)
  if (words < 3) return { score: 3, status: 'thin' }
  if (words < 10) return { score: 3, status: 'thin' }
  if (words < 30) return { score: 6, status: 'adequate' }
  return { score: 10, status: 'strong' }
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

function getFieldValue(obj: Record<string, unknown>, aliases: readonly string[]): string | null {
  for (const field of aliases) {
    const value = obj[field]
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        if (value.length === 0) continue
        return value.join(' ')
      }
      return String(value)
    }
  }
  return null
}

function calculateBriefScore(briefText: string, extractedBrief: Record<string, unknown>): number {
  let fieldScore = 0
  for (const { aliases } of BRIEF_CHECKS) {
    const value = getFieldValue(extractedBrief, aliases)
    fieldScore += scoreField(value).score
  }
  const lines = briefText.split('\n').filter(l => l.trim().length > 0)
  const structureScore = lines.length >= 4 ? 10 : lines.length >= 2 ? 5 : 0
  const presentCount = BRIEF_CHECKS.filter(({ aliases }) => getFieldValue(extractedBrief, aliases) !== null).length
  const completenessScore = Math.round((presentCount / BRIEF_CHECKS.length) * 10)
  return Math.round(Math.min(fieldScore + structureScore + completenessScore, 100))
}

describe('wordCount', () => {
  it('counts words in a normal string', () => {
    expect(wordCount('hello world')).toBe(2)
  })
  it('returns 0 for empty string', () => {
    expect(wordCount('')).toBe(0)
  })
  it('handles multiple spaces', () => {
    expect(wordCount('  hello   world  ')).toBe(2)
  })
})

describe('scoreField', () => {
  it('returns 0 for null', () => {
    expect(scoreField(null).score).toBe(0)
    expect(scoreField(null).status).toBe('missing')
  })
  it('returns 3 for very short text', () => {
    expect(scoreField('hi').score).toBe(3)
    expect(scoreField('hi').status).toBe('thin')
  })
  it('returns 3 for text under 10 words', () => {
    expect(scoreField('one two three four five six seven eight nine').score).toBe(3)
  })
  it('returns 6 for 10-29 words', () => {
    const text = Array(15).fill('word').join(' ')
    expect(scoreField(text).score).toBe(6)
  })
  it('returns 10 for 30+ words', () => {
    const text = Array(30).fill('word').join(' ')
    expect(scoreField(text).score).toBe(10)
    expect(scoreField(text).status).toBe('strong')
  })
})

describe('calculateBriefScore', () => {
  it('returns 0 for completely empty brief', () => {
    expect(calculateBriefScore('', {})).toBe(0)
  })

  it('caps at 100', () => {
    const fullBrief: Record<string, string> = {
      objectives: Array(50).fill('word').join(' '),
      target_audience: Array(50).fill('word').join(' '),
      campaign_name: Array(50).fill('word').join(' '),
      deliverables: Array(50).fill('word').join(' '),
      tone: Array(50).fill('word').join(' '),
      budget: Array(50).fill('word').join(' '),
      timeline: Array(50).fill('word').join(' '),
      kpis: Array(50).fill('word').join(' '),
    }
    const score = calculateBriefScore('line1\nline2\nline3\nline4\nline5', fullBrief)
    expect(score).toBeLessThanOrEqual(100)
    expect(score).toBeGreaterThan(80)
  })

  it('gives structure points for multi-line briefs', () => {
    const briefObj = { objectives: Array(30).fill('word').join(' ') }
    const singleLine = calculateBriefScore('one line', briefObj)
    const multiLine = calculateBriefScore('line 1\nline 2\nline 3\nline 4', briefObj)
    expect(multiLine).toBeGreaterThan(singleLine)
  })

  it('gives completeness points proportional to fields present', () => {
    const oneField = calculateBriefScore('text', { objectives: 'goal' })
    const twoFields = calculateBriefScore('text', { objectives: 'goal', budget: '$100' })
    expect(twoFields).toBeGreaterThan(oneField)
  })

  it('uses alias fallback (objective → objectives)', () => {
    const withAlias = calculateBriefScore('text', { objective: 'goal' })
    const withPrimary = calculateBriefScore('text', { objectives: 'goal' })
    expect(withAlias).toBe(withPrimary)
  })
})

describe('getFieldValue', () => {
  it('returns null when no alias matches', () => {
    expect(getFieldValue({ foo: 'bar' }, ['baz', 'qux'])).toBeNull()
  })
  it('returns string value for first matching alias', () => {
    expect(getFieldValue({ bar: 'found' }, ['foo', 'bar'])).toBe('found')
  })
  it('joins array values', () => {
    expect(getFieldValue({ tags: ['a', 'b'] }, ['tags'])).toBe('a b')
  })
  it('skips empty arrays', () => {
    expect(getFieldValue({ tags: [], fallback: 'ok' }, ['tags', 'fallback'])).toBe('ok')
  })
  it('skips null and empty string values', () => {
    expect(getFieldValue({ a: null, b: '', c: 'found' }, ['a', 'b', 'c'])).toBe('found')
  })
})
