import {NextRequest, NextResponse} from 'next/server'

type TranslationPayload = {
  texts?: (string | undefined)[]
  sourceLanguage?: string
  targetLanguage?: string
}

const FALLBACK_TARGET = 'en'
const FALLBACK_SOURCE = 'nl'

export async function POST(request: NextRequest) {
  const body = (await request.json()) as TranslationPayload

  const texts = Array.isArray(body.texts) ? body.texts : []
  const sourceLanguage = body.sourceLanguage || FALLBACK_SOURCE
  const targetLanguage = body.targetLanguage || FALLBACK_TARGET

  if (!texts.length) {
    return NextResponse.json({translations: []})
  }

  const endpoint = process.env.TRANSLATION_SERVICE_URL

  if (endpoint) {
    try {
      const upstream = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({texts, sourceLanguage, targetLanguage}),
      })

      if (!upstream.ok) {
        const errorText = await upstream.text()
        return NextResponse.json(
          {error: 'Upstream translation failed', details: errorText},
          {status: upstream.status}
        )
      }

      const data = await upstream.json()
      return NextResponse.json({translations: data.translations ?? data})
    } catch (error) {
      return NextResponse.json({error: 'Translation request error', details: `${error}`}, {status: 500})
    }
  }

  const translations = texts.map((text) => text ?? '')
  return NextResponse.json({translations})
}
