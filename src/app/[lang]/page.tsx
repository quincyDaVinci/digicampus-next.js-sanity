import RenderSection from '@/components/sections/RenderSection'
import { client } from '@sanity/lib/client'
import { applyModuleTextOverrides } from '@/lib/applyModuleTranslations'
// Revalidate this page every 300 seconds (ISR). Sanity webhook can call /api/revalidate to update immediately.
export const revalidate = 300
import { defaultLanguage, supportedLanguages, isSupportedLang } from '@/lib/i18n'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getTranslation } from '@/lib/translations'

import { HomePagePreview } from '../HomePagePreview'

// Query for the home page (singleton)
// Dereference file asset url for documentAsset modules to avoid additional runtime fetches
const homePageQuery = `*[_type == "homePage"][0]{
  _id,
  title,
  metadata,
  modules[]{
    _type,
    _key,
    ...,
    // if module is a documentAsset, include resolved URL
    documentFile{asset-> { _id, url }},
  },
  "localized": translations[language == $lang][0]{
    title,
    metadataDescription,
    modules
  }
}`

const homePageMetadataQuery = `*[_type == "homePage"][0]{
  title,
  metadata,
  "localized": translations[language == $lang][0]{
    title,
    metadataDescription,
  }
}`

type HomeParams = { params: Promise<{ lang: string }> }

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: HomeParams): Promise<Metadata> {
  const { lang } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digicampus.example'
  const safeLang = isSupportedLang(lang) ? lang : defaultLanguage
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(safeLang, key)
  const locale = safeLang === 'nl' ? 'nl_NL' : 'en_US'

  try {
    const data = await client.fetch<{
      title?: string
      metadata?: { description?: string }
      localized?: { title?: string; metadataDescription?: string }
    } | null>(homePageMetadataQuery, { lang: safeLang })

    const localizedTitle = data?.localized?.title ?? data?.title ?? t('welcomeTitle')
    const localizedDescription =
      data?.localized?.metadataDescription ?? data?.metadata?.description ?? t('welcomeMessage')

    return {
      metadataBase: new URL(baseUrl),
      title: localizedTitle,
      description: localizedDescription,
      openGraph: {
        title: localizedTitle,
        description: localizedDescription,
        type: 'website',
        locale,
        url: `/${safeLang}`,
      },
      alternates: {
        canonical: `/${safeLang}`,
        languages: {
          en: '/en',
          nl: '/nl',
        },
      },
    }
  } catch (error) {
    console.warn('Could not fetch metadata for home page:', error)
    return {
      metadataBase: new URL(baseUrl),
      title: t('welcomeTitle'),
      description: t('welcomeMessage'),
      openGraph: {
        title: t('welcomeTitle'),
        description: t('welcomeMessage'),
        type: 'website',
        locale,
        url: `/${safeLang}`,
      },
      alternates: {
        canonical: `/${safeLang}`,
        languages: {
          en: '/en',
          nl: '/nl',
        },
      },
    }
  }
}

type HomePageData = {
  _id: string
  title?: string
  metadata?: Record<string, unknown>
  modules?: Array<{_key: string; _type: string}>
  localized?: {
    title?: string
    metadataDescription?: string
    modules?: Array<{moduleKey?: string; fieldPath?: string; text?: string}>
  }
}

type FetchedHomePage = { page: HomePageData | null; isFallback: boolean }

async function getHomePage(lang: string): Promise<FetchedHomePage> {
  try {
    // Try fetching the page for the requested language first (ISR-friendly)
    const pageForLang = await client.fetch(homePageQuery, { lang }, { next: { revalidate: 300 } })

    // If requesting the default language, return it directly (no fallback semantics)
    if (lang === defaultLanguage) {
      return { page: pageForLang ?? null, isFallback: false }
    }

    // If a page exists and it contains a localized payload for this lang, use it
    const hasTranslation = !!(pageForLang && pageForLang.localized && (
      pageForLang.localized.title || (pageForLang.localized.modules && pageForLang.localized.modules.length > 0)
    ))

    if (hasTranslation) {
      return { page: pageForLang, isFallback: false }
    }

    // No translation available — fetch the default language page as a fallback
    const fallbackPage = await client.fetch(homePageQuery, { lang: defaultLanguage }, { next: { revalidate: 300 } })
    return { page: fallbackPage ?? null, isFallback: true }
  } catch (error) {
    console.error('Error fetching home page:', error)
    return { page: null, isFallback: false }
  }
}

export default async function Page({ params }: HomeParams) {
  const { lang = defaultLanguage } = await params
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(lang, key)
  const draft = await draftMode()
  const { page, isFallback } = await getHomePage(lang)
  const overrides = !isFallback ? page?.localized?.modules : undefined
  const localizedTitle = !isFallback ? page?.localized?.title ?? page?.title : page?.title
  const localizedModules = applyModuleTextOverrides(page?.modules, overrides)

  // If in draft mode, use the live preview component
  if (draft.isEnabled && page) {
    return <HomePagePreview initial={{ data: page, sourceMap: undefined }} query={homePageQuery} params={{ lang }} />
  }

  // If no home page exists yet, show a welcome message
  if (!page || !localizedModules?.length) {
    return (
      <section
        aria-labelledby="welcome-title"
        className="flex flex-col gap-8 p-6 min-h-[60vh] items-center justify-center"
      >
        <div className="max-w-2xl text-center">
          <h1 id="welcome-title" className="text-4xl font-bold mb-4">
            {t('welcomeTitle')}
          </h1>
          <p className="text-lg mb-6 text-muted-foreground">
            {t('welcomeMessage')}
          </p>
        </div>
      </section>
    )
  }
  // Render the home page modules. If we're showing a fallback (default language)
  // because the requested language has no translation, show a polite notice.
  return (
    <section aria-label={localizedTitle || undefined} className="contents">
      <h1 className="sr-only">{localizedTitle}</h1>
      {isFallback && lang !== defaultLanguage && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md text-sm text-yellow-800">
          <p>{lang === 'en' ? t('notTranslatedToEnglish') : t('notTranslatedToDutch')}</p>
        </div>
      )}

      {localizedModules?.map((module: { _key: string; _type: string }) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </section>
  )
}
