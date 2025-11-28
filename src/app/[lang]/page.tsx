import RenderSection from '@/components/sections/RenderSection'
import { client } from '@sanity/lib/client'
import { defaultLanguage, supportedLanguages } from '@/lib/i18n'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

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
  "localized": translations[$lang]{
    title,
    metadataDescription,
    modules[]{
      _type,
      _key,
      ...,
      documentFile{asset-> { _id, url }},
    }
  }
}`

type HomeParams = { params: Promise<{ lang: string }> }

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: HomeParams): Promise<Metadata> {
  const { lang } = await params
  const locale = lang === 'nl' ? 'nl_NL' : 'en_US'

  return {
    title: 'DigiCampus - Digital Learning Platform',
    description: 'Empowering education through digital innovation',
    openGraph: {
      title: 'DigiCampus - Digital Learning Platform',
      description: 'Empowering education through digital innovation',
      type: 'website',
      locale,
      url: `/${lang}`,
    },
    metadataBase: new URL('https://digicampus.example'),
    alternates: {
      languages: {
        en: '/en',
        nl: '/nl',
      },
    },
  }
}

type FetchedHomePage = { page: any | null; isFallback: boolean }

async function getHomePage(lang: string): Promise<FetchedHomePage> {
  try {
    // Try fetching the page for the requested language first
    const pageForLang = await client.fetch(homePageQuery, { lang }, { cache: 'no-store' })

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
    const fallbackPage = await client.fetch(homePageQuery, { lang: defaultLanguage }, { cache: 'no-store' })
    return { page: fallbackPage ?? null, isFallback: true }
  } catch (error) {
    console.error('Error fetching home page:', error)
    return { page: null, isFallback: false }
  }
}

export default async function Page({ params }: HomeParams) {
  const { lang = defaultLanguage } = await params
  const draft = await draftMode()
  const { page, isFallback } = await getHomePage(lang)
  const localizedTitle = !isFallback ? page?.localized?.title ?? page?.title : page?.title
  const localizedModules = !isFallback ? page?.localized?.modules ?? page?.modules : page?.modules

  // If in draft mode, use the live preview component
  if (draft.isEnabled && page) {
    return <HomePagePreview initial={{ data: page, sourceMap: undefined }} query={homePageQuery} params={{ lang }} />
  }

  // If no home page exists yet, show a welcome message
  if (!page || !localizedModules?.length) {
    return (
      <main id="main" className="flex flex-col gap-8 p-6 min-h-[60vh] items-center justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your New Next.js &amp; Sanity App!</h1>
          <p className="text-lg mb-6 text-muted-foreground">
            It looks like you haven&apos;t set up your home page content yet. To get started, head over to the Sanity Studio and create your home page by adding modules and content.
          </p>
        </div>
      </main>
    )
  }
  // Render the home page modules. If we're showing a fallback (default language)
  // because the requested language has no translation, show a polite notice.
  return (
    <main id="main">
      <h1 className="sr-only">{localizedTitle}</h1>
      {isFallback && lang !== defaultLanguage && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md text-sm text-yellow-800">
          {lang === 'en' ? (
            <p>This page is not yet translated to English — showing the default language content.</p>
          ) : (
            <p>Deze pagina is nog niet vertaald naar Nederlands — we tonen de standaardinhoud.</p>
          )}
        </div>
      )}

      {localizedModules?.map((module: { _key: string; _type: string }) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </main>
  )
}
