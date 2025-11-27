import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'

import RenderSection from '@/components/sections/RenderSection'
import { client, previewClient } from '@sanity/lib/client'
import { defaultLanguage } from '@/lib/i18n'
import { PagePreview } from './PagePreview'

// Simplified page query for the new modular system
const pageQuery = groq`*[_type == "page" && metadata.language == $lang && coalesce(metadata.localizedSlugs[$lang].current, metadata.slug.current) == $slug][0]{
  _id,
  title,
  description,
  slug,
  metadata,
  modules[]{
    ...,
    _type,
    _key
  }
}`

const metadataQuery = groq`*[_type == "page" && metadata.language == $lang && coalesce(metadata.localizedSlugs[$lang].current, metadata.slug.current) == $slug][0]{title, description, metadata}`

const hasSanityCredentials = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
)

type PageParams = { params: { lang: string; slug: string } }

export async function generateStaticParams() {
  if (!hasSanityCredentials) return []
  try {
    const slugs = await client.fetch<Array<{ slug: string; lang: string }>>(groq`*[_type == "page" && defined(metadata.slug.current)]{ "slug": coalesce(metadata.localizedSlugs[metadata.language].current, metadata.slug.current), "lang": metadata.language }`)
    return slugs
  } catch (error) {
    console.warn('Could not fetch page paths from Sanity:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageParams) {
  const { slug, lang = defaultLanguage } = params

  if (!hasSanityCredentials) {
    return { title: slug, alternates: { languages: { en: '/en', nl: '/nl' } } }
  }

  try {
    const data = await client.fetch<{ title?: string; description?: string; metadata?: { language?: string } } | null>(metadataQuery, {
      slug,
      lang,
    })
    if (!data) return { title: slug }
    return {
      title: data.title ?? slug,
      description: data.description,
      openGraph: { locale: data.metadata?.language === 'nl' ? 'nl_NL' : 'en_US' },
      alternates: {
        languages: {
          en: `/en/${slug}`,
          nl: `/nl/${slug}`,
        },
      },
    }
  } catch (error) {
    console.warn('Could not fetch metadata for page:', error)
    return { title: slug }
  }
}

export default async function Page({ params }: PageParams) {
  const { slug, lang = defaultLanguage } = params
  const draft = await draftMode()

  if (!hasSanityCredentials) {
    notFound()
  }

  // Use previewClient in draft mode to see unpublished changes
  const activeClient = draft.isEnabled ? previewClient : client
  const page = await activeClient.fetch<{ _id: string; title: string; description?: string; modules?: Array<{ _key: string; _type: string }> } | null>(pageQuery, { slug, lang })

  if (!page) {
    notFound()
  }

  if (draft.isEnabled) {
    return <PagePreview initial={{ data: page, sourceMap: undefined }} query={pageQuery} params={{ slug, lang }} />
  }

  // Render the page modules using the new system
  return (
    <main id="main">
      {page.modules?.map((module) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </main>
  )
}
