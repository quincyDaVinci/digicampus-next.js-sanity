type TranslationResponse = {
  translations?: (string | null | undefined)[]
  error?: string
}

const defaultLanguage = 'nl'
const targetLanguage = 'en'

export async function translateTexts(
  texts: (string | undefined)[],
  source = defaultLanguage,
  target = targetLanguage
): Promise<(string | undefined)[]> {
  if (!texts.length) return []

  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({texts, sourceLanguage: source, targetLanguage: target}),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Translation request failed')
  }

  const data = (await response.json()) as TranslationResponse
  const translated = data.translations ?? []

  return texts.map((original, index) => translated[index] ?? original)
}

export function slugify(text: string | undefined): string | undefined {
  if (!text) return undefined
  return text
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
