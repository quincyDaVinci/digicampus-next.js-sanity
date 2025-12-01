import {NextResponse} from 'next/server'

type TranslationResult = {
  text: string
  provider: 'google' | 'deepl' | 'adapter' | 'mymemory' | 'failed'
}

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
): Promise<TranslationResult> {
  // Google Translate API - Recommended primary provider
  // Free tier: 500,000 chars/month, then $20 per million chars
  if (process.env.GOOGLE_TRANSLATE_API_KEY) {
    try {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text',
        }),
        cache: 'no-store',
      })

      if (response.ok) {
        const data = await response.json()
        const translated = data?.data?.translations?.[0]?.translatedText
        if (translated) {
          console.log('[translate] ✓ Google Translate')
          return {text: sanitizeHtml(String(translated)), provider: 'google'}
        }
      } else {
        console.warn('[translate] Google Translate responded with', response.status)
      }
    } catch (err) {
      console.warn('[translate] Google Translate failed', err)
    }
  }

  // DeepL API - premium quality translations
  if (process.env.DEEPL_API_KEY) {
    try {
      const url = 'https://api-free.deepl.com/v2/translate'
      const formData = new URLSearchParams()
      formData.append('auth_key', process.env.DEEPL_API_KEY)
      formData.append('text', text)
      formData.append('source_lang', sourceLanguage.toUpperCase())
      formData.append('target_lang', targetLanguage.toUpperCase())

      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: formData,
        cache: 'no-store',
      })

      if (response.ok) {
        const data = await response.json()
        const translated = data?.translations?.[0]?.text
        if (translated) {
          console.log('[translate] ✓ DeepL (premium quality)')
          return {text: sanitizeHtml(String(translated)), provider: 'deepl'}
        }
      } else {
        console.warn('[translate] DeepL responded with', response.status)
      }
    } catch (err) {
      console.warn('[translate] DeepL failed', err)
    }
  }

  // Custom adapter URL (e.g., LibreTranslate, self-hosted service)
  const adapterUrl = process.env.TRANSLATION_API_URL
  if (adapterUrl) {
    try {
      const headers: Record<string, string> = {'Content-Type': 'application/json'}

      const response = await fetch(adapterUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({text, sourceLanguage, targetLanguage}),
        cache: 'no-store',
      })

      if (response.ok) {
        const data = (await response.json()) as {translation?: string}
        if (data?.translation) {
          console.log('[translate] ✓ Custom adapter')
          return {text: sanitizeHtml(String(data.translation)), provider: 'adapter'}
        }
      } else {
        console.warn('[translate] adapter responded with non-ok status', response.status)
      }
    } catch (err) {
      console.warn('[translate] Failed to reach custom adapter', err)
    }
  }

  // NOTE: Sanity AI Assist requires the @sanity/assist plugin and Growth plan or higher.
  // It's not available as a standalone API for translations.
  // Use Google Translate API or DeepL instead for programmatic translations.

  // Development-only fallback: MyMemory (100 requests/day limit)
  if (process.env.TRANSLATION_FALLBACK === 'allow-dev') {
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`
      const response = await fetch(url, {cache: 'no-store'})
      if (response.ok) {
        const data = (await response.json()) as {responseData?: {translatedText?: string}; responseStatus?: number}
        const translated = data?.responseData?.translatedText
        // Check for rate limit or error responses
        if (data?.responseStatus === 429 || (translated && translated.includes('MYMEMORY WARNING'))) {
          console.warn('[translate] ✗ MyMemory rate limit (100/day exceeded)')
        } else if (translated) {
          console.log('[translate] ✓ MyMemory (dev fallback)')
          return {text: sanitizeHtml(translated), provider: 'mymemory'}
        }
      }
    } catch (error) {
      console.warn('[translate] MyMemory fallback failed', error)
    }
  }

  // Fail-fast: no provider succeeded
  console.error('[translate] ✗ All providers failed for:', text.slice(0, 50))
  throw new Error(`Translation failed: Set GOOGLE_TRANSLATE_API_KEY or DEEPL_API_KEY in .env.local`)
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

  const results = await Promise.all(
    body.segments.map(async (segment) => {
      try {
        return await translateSegment(segment, sourceLanguage, targetLanguage)
      } catch (err) {
        console.error('[translate] Segment failed:', segment.slice(0, 50), err)
        return {text: `[TRANSLATION FAILED] ${segment}`, provider: 'failed' as const}
      }
    })
  )

  const translations = results.map(r => r.text)
  const provider = results[0]?.provider || 'failed'

  return NextResponse.json({
    translations,
    provider,
    providerName: {
      google: 'Google Translate API',
      deepl: 'DeepL API (Premium)',
      adapter: 'Custom Translation Service',
      mymemory: 'MyMemory (Dev Fallback)',
      failed: 'Translation Failed',
    }[provider]
  })
}
