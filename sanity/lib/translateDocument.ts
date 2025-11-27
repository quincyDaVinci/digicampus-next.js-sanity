import {SanityDocument} from 'sanity'
import {translateTexts, slugify} from './translationClient'

export type TranslationTarget = 'page' | 'blogPost' | 'site' | 'siteSettings'

type TranslationResult = {
  set: Record<string, unknown>
}

function cleanUndefined(input: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined))
}

type TranslationEntry = {
  _key?: string
  language?: string
  [key: string]: unknown
}

function ensureTranslationArray(
  value: unknown,
  language: string
): {translations: TranslationEntry[]; existing: TranslationEntry | undefined} {
  const translations = Array.isArray(value) ? ([...value] as TranslationEntry[]) : []
  const existing = translations.find((entry) => entry?.language === language)
  return {translations, existing}
}

function upsertTranslation(
  translations: TranslationEntry[],
  updated: TranslationEntry,
  existing?: TranslationEntry
) {
  if (existing) {
    return translations.map((entry) => (entry._key === existing._key ? {...existing, ...updated} : entry))
  }
  const nextKey = crypto.randomUUID()
  return [...translations, {...updated, _key: nextKey}]
}

async function translatePage(doc: SanityDocument): Promise<TranslationResult> {
  const [title, metadataTitle, metadataDescription] = await translateTexts([
    doc.title as string | undefined,
    doc.metadata?.title as string | undefined,
    doc.metadata?.description as string | undefined,
  ])

  const {translations, existing} = ensureTranslationArray(doc.translations, 'en')
  const updatedEntry = {
    ...(existing ?? {}),
    language: 'en',
    title,
    metadataTitle,
    metadataDescription,
    modules: doc.modules ?? [],
  }

  const enSlug = slugify(title || doc.metadata?.title || doc.title)

  return {
    set: cleanUndefined({
      translations: upsertTranslation(translations, updatedEntry, existing),
      'metadata.localizedSlugs.en': enSlug ? {current: enSlug} : undefined,
    }),
  }
}

async function translateBlogPost(doc: SanityDocument): Promise<TranslationResult> {
  const [title, excerpt] = await translateTexts([
    doc.title as string | undefined,
    doc.excerpt as string | undefined,
  ])

  const {translations, existing} = ensureTranslationArray(doc.translations, 'en')
  const enSlug = slugify(title || doc.slug?.current || doc.title)

  const updatedEntry = {
    ...(existing ?? {}),
    language: 'en',
    title,
    excerpt,
    body: doc.body ?? [],
    slug: enSlug ? {current: enSlug} : undefined,
  }

  return {
    set: cleanUndefined({
      translations: upsertTranslation(translations, updatedEntry, existing),
    }),
  }
}

async function translateSite(doc: SanityDocument): Promise<TranslationResult> {
  const [title] = await translateTexts([doc.title as string | undefined])
  const {translations, existing} = ensureTranslationArray(doc.translations, 'en')

  const updatedEntry = {
    ...(existing ?? {}),
    language: 'en',
    title,
    ctas: doc.ctas ?? [],
    footerContent: doc.footerContent ?? [],
    copyright: doc.copyright ?? [],
  }

  return {
    set: cleanUndefined({
      translations: upsertTranslation(translations, updatedEntry, existing),
    }),
  }
}

async function translateSiteSettings(doc: SanityDocument): Promise<TranslationResult> {
  const [title] = await translateTexts([doc.title as string | undefined])
  const {translations, existing} = ensureTranslationArray(doc.translations, 'en')

  const updatedEntry = {
    ...(existing ?? {}),
    language: 'en',
    title,
  }

  return {
    set: cleanUndefined({
      translations: upsertTranslation(translations, updatedEntry, existing),
    }),
  }
}

export async function buildTranslationPatch(doc: SanityDocument, type: TranslationTarget) {
  switch (type) {
    case 'page':
      return translatePage(doc)
    case 'blogPost':
      return translateBlogPost(doc)
    case 'site':
      return translateSite(doc)
    case 'siteSettings':
      return translateSiteSettings(doc)
    default:
      throw new Error(`Translation is not configured for type: ${type}`)
  }
}
