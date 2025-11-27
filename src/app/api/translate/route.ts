import {NextResponse} from 'next/server'

async function translateSegment(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): Promise<string> {
  // Prefer a custom translation endpoint if provided
  if (process.env.TRANSLATION_API_URL) {
    try {
      const response = await fetch(process.env.TRANSLATION_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text, sourceLanguage, targetLanguage}),
        cache: 'no-store',
      })

      if (response.ok) {
        const data = (await response.json()) as {translation?: string}
        if (data?.translation) {
          return data.translation
        }
      }
    } catch (error) {
      console.warn('[translate] Failed to reach custom endpoint', error)
    }
  }

  // Fallback to a public translation API (for development/testing)
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`
    const response = await fetch(url, {cache: 'no-store'})
    if (response.ok) {
      const data = (await response.json()) as {responseData?: {translatedText?: string}}
      const translated = data?.responseData?.translatedText
      if (translated) {
        return translated
      }
    }
  } catch (error) {
    console.warn('[translate] Fallback translation failed', error)
  }

  // If translation fails, return the original text so editors still get mirrored content
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

  const translations = await Promise.all(
    body.segments.map((segment) => translateSegment(segment, sourceLanguage, targetLanguage))
  )

  return NextResponse.json({translations})
}
