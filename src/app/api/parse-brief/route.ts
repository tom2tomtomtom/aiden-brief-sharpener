import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum 10MB.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const name = file.name.toLowerCase()
    let text = ''

    if (name.endsWith('.txt') || name.endsWith('.md')) {
      text = buffer.toString('utf-8')
    } else if (name.endsWith('.pdf')) {
      // Import pdf-parse/lib/pdf-parse directly to avoid index.js auto-test issue on serverless
      const pdfParse = require('pdf-parse/lib/pdf-parse.js') as (buf: Buffer) => Promise<{ text: string }>
      const result = await pdfParse(buffer)
      text = result.text
    } else if (name.endsWith('.docx') || name.endsWith('.doc')) {
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF, DOCX, DOC, or TXT files.' },
        { status: 400 }
      )
    }

    const trimmed = text.trim()
    if (!trimmed) {
      return NextResponse.json({ error: 'Could not extract text from file. The file may be empty or image-based.' }, { status: 400 })
    }

    // Truncate to 50000 chars to handle long briefs with appendices
    const truncated = trimmed.slice(0, 50000)

    return NextResponse.json({ text: truncated, fileName: file.name, truncated: truncated.length < trimmed.length })
  } catch (err) {
    console.error('Parse brief error:', err)
    return NextResponse.json({ error: 'Failed to parse file. Please try pasting your brief instead.' }, { status: 500 })
  }
}
