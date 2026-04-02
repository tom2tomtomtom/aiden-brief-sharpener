import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

export interface PhantomPerspective {
  role: string
  shorthand: string
  verdict: number // 1-5
  critique: string
  suggestion: string
}

const PHANTOMS = [
  {
    role: 'The Audience Skeptic',
    shorthand: 'audience→skeptic',
    system: `You are The Audience Skeptic, a senior strategist who has seen hundreds of briefs describe their audience as "25-34 urban professionals" and produce forgettable work every time. You believe the audience section is where most briefs fail, because demographics are not insights. You demand psychographics, behavioral tensions, and a reason to believe this audience will care. You are rigorous but constructive.`,
    focus: 'Evaluate ONLY the audience and target definition in this brief.',
  },
  {
    role: 'The Single-Minded Purist',
    shorthand: 'proposition→purist',
    system: `You are The Single-Minded Purist, a creative director who refuses to work on briefs that try to say five things at once. You believe the single-minded proposition is the most important line in any brief, and most briefs fail because they hedge. If the proposition could apply to any brand in the category, it is not a proposition. You are blunt but fair.`,
    focus: 'Evaluate ONLY the proposition, key message, and objective in this brief.',
  },
  {
    role: 'The Tension Finder',
    shorthand: 'tension→finder',
    system: `You are The Tension Finder, a cultural strategist who knows that every great campaign is built on a tension, a contradiction in human behavior that the brand can resolve. "People want to look good" is not a tension. "People want to be seen as authentic but curate every photo" is a tension. You push briefs to find the conflict that makes creative work interesting. You are provocative but insightful.`,
    focus: 'Evaluate ONLY the insight, tension, and cultural context in this brief.',
  },
  {
    role: 'The Scope Realist',
    shorthand: 'scope→realist',
    system: `You are The Scope Realist, a head of production who has watched too many campaigns die because the brief promised the moon on a shoestring. You check whether the deliverables, timeline, and budget are coherent. If the brief asks for a fully integrated campaign in two weeks with no budget specified, you say so. You are practical and direct.`,
    focus: 'Evaluate ONLY the deliverables, timeline, budget, and feasibility of this brief.',
  },
] as const

export async function runPhantomAnalysis(
  extractedBrief: Record<string, unknown>,
  briefText: string
): Promise<PhantomPerspective[]> {
  const briefContext = JSON.stringify(extractedBrief, null, 2)

  const promises = PHANTOMS.map(async (phantom) => {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      system: phantom.system,
      messages: [
        {
          role: 'user',
          content: `${phantom.focus}

BRIEF TEXT:
${briefText.slice(0, 2000)}

EXTRACTED BRIEF FIELDS:
${briefContext}

Respond in this exact JSON format, nothing else:
{
  "verdict": <number 1-5, where 1 is unacceptable and 5 is sharp>,
  "critique": "<2-3 sentences on what is wrong or missing, be specific>",
  "suggestion": "<2-3 sentences on exactly how to fix it>"
}`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      const parsed = JSON.parse(jsonMatch?.[0] ?? '{}')
      return {
        role: phantom.role,
        shorthand: phantom.shorthand,
        verdict: Math.max(1, Math.min(5, Number(parsed.verdict) || 3)),
        critique: String(parsed.critique || 'Unable to evaluate this section.'),
        suggestion: String(parsed.suggestion || 'Review this section with your team.'),
      }
    } catch {
      return {
        role: phantom.role,
        shorthand: phantom.shorthand,
        verdict: 3,
        critique: 'Unable to evaluate this section.',
        suggestion: 'Review this section with your team.',
      }
    }
  })

  return Promise.all(promises)
}
