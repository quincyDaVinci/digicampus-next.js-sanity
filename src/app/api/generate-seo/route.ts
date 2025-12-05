import {NextResponse} from 'next/server'

function stripHtml(input: string) {
  return (input || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

async function callSanityAssist(prompt: string) {
  const key = process.env.SANITY_CONTENT_AI_KEY
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
  if (!key || !projectId) throw new Error('Sanity Content AI not configured')

  // Best-effort call to Sanity Assist endpoint. If this fails, the caller will fall back.
  const url = `https://api.sanity.io/v1/assist`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
      'x-sanity-project-id': projectId,
    },
    body: JSON.stringify({prompt}),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Sanity Assist failed: ${res.status} ${text}`)
  }

  const json = await res.json().catch(() => ({}))
  // Attempt to read a simple 'output' or 'text' property; otherwise return raw
  const output = json?.output || json?.text || (typeof json === 'string' ? json : JSON.stringify(json))
  return String(output || '')
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {title?: string; content?: string; language?: string}
    const title = body.title || ''
    const content = stripHtml(body.content || '')
    const language = body.language || 'nl'

    // Build a short prompt to generate an SEO title and meta description.
    const prompt = `Generate an SEO title (max 60 chars) and a meta description (max 160 chars) in ${language} for the following page. Respond as JSON with keys \"title\" and \"description\". Page title: ${title}\n\nContent:\n${content.slice(0,3000)}`

    try {
      const aiResult = await callSanityAssist(prompt)
      // Try to parse JSON from the assistant output, else fallback to heuristics
      try {
        const parsed = JSON.parse(aiResult)
        return NextResponse.json({title: parsed.title, description: parsed.description, provider: 'sanity'})
      } catch (_) {
        // If not JSON, attempt to split by lines (title on first line, rest description)
        const lines = aiResult.split('\n').map(l => l.trim()).filter(Boolean)
        const maybeTitle = lines[0] || title
        const maybeDesc = lines.slice(1).join(' ') || content.slice(0, 160)
        return NextResponse.json({title: maybeTitle, description: maybeDesc, provider: 'sanity'})
      }
    } catch (err) {
      // Fallback heuristic generation
      const fallbackTitle = title || content.split('\n')[0]?.slice(0, 60) || ''
      const fallbackDesc = (content || '').slice(0, 160) || ''
      return NextResponse.json({title: fallbackTitle, description: fallbackDesc, provider: 'heuristic'})
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({error: msg}, {status: 500})
  }
}
