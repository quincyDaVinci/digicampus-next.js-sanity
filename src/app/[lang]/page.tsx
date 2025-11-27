import RenderSection from '@/components/sections/RenderSection'
import { client } from '@sanity/lib/client'
import { defaultLanguage, supportedLanguages } from '@/lib/i18n'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import { HomePagePreview } from '../HomePagePreview'

// Query for the home page (singleton)
// Dereference file asset url for documentAsset modules to avoid additional runtime fetches
const homePageQuery = `*[_type == "homePage" && metadata.language == $lang][0]{
  _id,
  title,
  description,
  metadata,
  modules[]{
    _type,
    _key,
    ...,
    // if module is a documentAsset, include resolved URL
    documentFile{asset-> { _id, url }},
  }
}`

type HomeParams = { params: { lang: string } }

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: HomeParams): Promise<Metadata> {
  const { lang } = params
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

async function getHomePage(lang: string) {
  try {
    const page = await client.fetch(homePageQuery, { lang }, {
      cache: 'no-store', // Disable caching for now to test
    })
    if (page) return page
    if (lang !== defaultLanguage) {
      return client.fetch(homePageQuery, { lang: defaultLanguage }, { cache: 'no-store' })
    }
    return null
  } catch (error) {
    console.error('Error fetching home page:', error)
    return null
  }
}

export default async function Page({ params }: HomeParams) {
  const { lang = defaultLanguage } = params
  const draft = await draftMode()
  const page = await getHomePage(lang)

  // If in draft mode, use the live preview component
  if (draft.isEnabled && page) {
    return <HomePagePreview initial={{ data: page, sourceMap: undefined }} query={homePageQuery} params={{ lang }} />
  }

  // If no home page exists yet, show a welcome message
  if (!page || !page.modules?.length) {
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

  // Render the home page modules
  return (
    <main id="main">
      {page.modules.map((module: { _key: string; _type: string }) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </main>
  )
}
