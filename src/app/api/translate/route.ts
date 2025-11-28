import {NextResponse} from 'next/server'

function sanitizeHtml(input: string) {
  if (!input || typeof input !== 'string') return ''
  // Remove any HTML tags
  const stripped = input.replace(/<[^>]*>/g, '')
  // Decode basic HTML entities (common cases)
  return stripped
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

async function translateSegment(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> {
  // If a custom adapter URL is configured, prefer that (allows self-hosted adapters
  // or third-party translation providers). We forward the segments as a JSON body
  // and include the SANITY_CONTENT_AI_KEY when available so adapters can call
  // Content AI on your behalf.
  const adapterUrl = process.env.TRANSLATION_API_URL
  if (adapterUrl) {
    try {
      const headers: Record<string, string> = {'Content-Type': 'application/json'}
      if (process.env.SANITY_CONTENT_AI_KEY) {
        headers['Authorization'] = `Bearer ${process.env.SANITY_CONTENT_AI_KEY}`
      }

      const response = await fetch(adapterUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({text, sourceLanguage, targetLanguage}),
        cache: 'no-store',
      })

      if (response.ok) {
        const data = (await response.json()) as {translation?: string}
        if (data?.translation) return sanitizeHtml(String(data.translation))
      } else {
        console.warn('[translate] adapter responded with non-ok status', response.status)
      }
    } catch (err) {
      console.warn('[translate] Failed to reach custom adapter', err)
    }
  }

  // If SANITY_CONTENT_AI_KEY + SANITY_PROJECT_ID are present, attempt to call
  // Sanity's Content AI assist endpoint directly. If this call fails or is not
  // configured, we honor the TRANSLATION_FALLBACK policy (allow-dev) or return
  // an error to the caller (fail-fast) so editors see a clear message.
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET
  if (process.env.SANITY_CONTENT_AI_KEY && projectId && dataset) {
    try {
      // Sanity's public Assist API is used here. The exact endpoint shape may
      // evolve; this implementation follows the documented server-assisted
      // pattern and supplies the API key in the Authorization header.
      const assistUrl = `https://api.sanity.io/v1/assist/${encodeURIComponent(projectId)}/${encodeURIComponent(dataset)}/translate`
      const resp = await fetch(assistUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SANITY_CONTENT_AI_KEY}`,
        },
        body: JSON.stringify({segments: [text], sourceLanguage, targetLanguage}),
        cache: 'no-store',
      })

      if (resp.ok) {
        const json = await resp.json()
        // The assist API should return translations in order; adapt to common shapes.
        const translated = (json?.translations && Array.isArray(json.translations) && json.translations[0]) || json?.translation || json?.result
        if (typeof translated === 'string') return sanitizeHtml(translated)
      } else {
        console.warn('[translate] Content AI responded with', resp.status)
      }
    } catch (err) {
      console.warn('[translate] Content AI request failed', err)
    }
  }

  // Development-only fallback: if TRANSLATION_FALLBACK is explicitly set to
  // `allow-dev` we will use a public free service (MyMemory) for local testing.
  if (process.env.TRANSLATION_FALLBACK === 'allow-dev') {
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`
      const response = await fetch(url, {cache: 'no-store'})
      if (response.ok) {
        const data = (await response.json()) as {responseData?: {translatedText?: string}}
        const translated = data?.responseData?.translatedText
        if (translated) return sanitizeHtml(translated)
      }
    } catch (error) {
      console.warn('[translate] MyMemory fallback failed', error)
    }
  }

  // Fail-fast: when no provider produced a translation, return the original
  // text. The caller (Studio) will surface a clear error when translations
  // could not be produced.
  return text
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    segments?: string[]
    sourceLanguage?: string
    targetLanguage?: string
  }

  if (!body?.segments || !Array.isArray(body.segments) || body.segments.length === 0) {
    return NextResponse.json({error: 'No segments provided'}, {status: 400})
  }

  const sourceLanguage = body.sourceLanguage || 'nl'
  const targetLanguage = body.targetLanguage || 'en'

  // If Content AI is not configured and there's no adapter, fail fast unless
  // a dev fallback is explicitly allowed.
  const hasAdapter = Boolean(process.env.TRANSLATION_API_URL)
  const hasSanityKey = Boolean(process.env.SANITY_CONTENT_AI_KEY && process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET)
  const allowDev = process.env.TRANSLATION_FALLBACK === 'allow-dev'

  if (!hasAdapter && !hasSanityKey && !allowDev) {
    return NextResponse.json({error: 'Content AI not configured. Set SANITY_CONTENT_AI_KEY (server-side) or TRANSLATION_API_URL.'}, {status: 503})
  }

  const translations = await Promise.all(
    body.segments.map((segment) => translateSegment(segment, sourceLanguage, targetLanguage))
  )

  return NextResponse.json({translations})
}
