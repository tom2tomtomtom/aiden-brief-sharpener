import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { getTemplate, TemplateId } from '@/lib/templates'
import type { GeneratedContent } from '@/components/LandingPagePreview'
import type { BriefAnalysisData } from '@/components/BriefAnalysis'
import PreviewContent from './PreviewContent'
import AnalysisPreviewContent from './AnalysisPreviewContent'

interface PageProps {
  params: { id: string }
}

function isBriefAnalysis(outputCopy: unknown): outputCopy is BriefAnalysisData {
  if (!outputCopy || typeof outputCopy !== 'object') return false
  const obj = outputCopy as Record<string, unknown>
  return typeof obj.score === 'number' && Array.isArray(obj.gaps)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const adminSupabase = createAdminClient()
  const { data: generation } = await adminSupabase
    .from('generations')
    .select('input_data, output_copy')
    .eq('id', params.id)
    .single()

  if (!generation) return { title: 'Preview not found' }

  if (isBriefAnalysis(generation.output_copy)) {
    const data = generation.output_copy as BriefAnalysisData
    return { title: `Brief Score: ${data.score}/100 — AIDEN Brief Intelligence` }
  }

  const inputData = generation.input_data as { productName?: string }
  return { title: `${inputData.productName ?? 'Preview'} — Landing Page Preview` }
}

export default async function PreviewPage({ params }: PageProps) {
  const adminSupabase = createAdminClient()

  const { data: generation, error } = await adminSupabase
    .from('generations')
    .select('id, input_data, output_copy, template_id')
    .eq('id', params.id)
    .single()

  if (error || !generation) {
    notFound()
  }

  if (isBriefAnalysis(generation.output_copy)) {
    const headersList = headers()
    const host = headersList.get('host') ?? 'localhost:3000'
    const protocol = host.startsWith('localhost') ? 'http' : 'https'
    const previewUrl = `${protocol}://${host}/preview/${params.id}`

    return (
      <AnalysisPreviewContent
        data={generation.output_copy as BriefAnalysisData}
        previewUrl={previewUrl}
      />
    )
  }

  const outputCopy = generation.output_copy as GeneratedContent
  const inputData = generation.input_data as { productName: string }
  const template = getTemplate((generation.template_id ?? 'saas') as TemplateId)

  return (
    <PreviewContent
      data={outputCopy}
      productName={inputData.productName}
      template={template}
    />
  )
}
