type TranslatableValue = Record<string, unknown> | unknown[] | string | number | boolean | null

type CollectedSegment = {
  path: (string | number)[]
  text: string
}

const NON_TRANSLATABLE_KEYS = new Set([
  '_type',
  '_key',
  'language',
  'value',
  'href',
  'url',
  'slug',
  'current',
  'asset',
  'style',
  'list',
  'level',
  'marks',
  'markDefs',
  'email',
  'relationMode',
])

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function shouldTranslate(key: string) {
  return !NON_TRANSLATABLE_KEYS.has(key)
}

function collectSegments(value: TranslatableValue, path: (string | number)[] = []): CollectedSegment[] {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (trimmed.length > 0) {
      return [{path, text: value}]
    }
    return []
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectSegments(item as TranslatableValue, [...path, index]))
  }

  if (isPlainObject(value)) {
    return Object.entries(value).flatMap(([key, val]) => {
      if (!shouldTranslate(key)) return []
      return collectSegments(val as TranslatableValue, [...path, key])
    })
  }

  return []
}

function applyTranslations(
  value: TranslatableValue,
  translations: Map<string, string>,
  path: (string | number)[] = []
): TranslatableValue {
  if (typeof value === 'string') {
    const mapKey = path.join('.')
    return translations.get(mapKey) ?? value
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => applyTranslations(item as TranslatableValue, translations, [...path, index]))
  }

  if (isPlainObject(value)) {
    const result: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(value)) {
      if (!shouldTranslate(key)) {
        result[key] = val
        continue
      }
      result[key] = applyTranslations(val as TranslatableValue, translations, [...path, key])
    }
    return result
  }

  return value
}

async function requestTranslations(segments: string[], sourceLanguage: string, targetLanguage: string) {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({segments, sourceLanguage, targetLanguage}),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    const msg = body?.error || `Translation request failed (${response.status})`
    throw new Error(msg)
  }

  const data = (await response.json()) as {translations?: string[]}
  if (!data?.translations || data.translations.length !== segments.length) {
    throw new Error('Translation response did not match requested segments')
  }

  return data.translations
}

export async function translateDeepObject<T extends TranslatableValue>(
  value: T,
  sourceLanguage: string,
  targetLanguage: string
): Promise<T> {
  const segments = collectSegments(value)
  if (segments.length === 0) return value

  const translationsList = await requestTranslations(
    segments.map((segment) => segment.text),
    sourceLanguage,
    targetLanguage
  )

  const translationMap = new Map<string, string>()
  segments.forEach((segment, index) => translationMap.set(segment.path.join('.'), translationsList[index]))

  return applyTranslations(value, translationMap) as T
}

export function ensureArrayWithLanguage<T extends {_type?: string; language?: string; _key?: string}>(
  existing: T[] | undefined,
  translation: T
) {
  const filtered = (existing || []).filter((entry) => entry.language !== translation.language)
  const withKey = translation._key
    ? translation
    : ({...translation, _key: crypto.randomUUID()} as T)
  return [...filtered, withKey]
}

export const translationSupportedTypes = ['page', 'homePage', 'blogPost', 'site', 'siteSettings'] as const
export type TranslationSupportedType = (typeof translationSupportedTypes)[number]

export function isTranslationSupported(type: string): type is TranslationSupportedType {
  return translationSupportedTypes.includes(type as TranslationSupportedType)
}
