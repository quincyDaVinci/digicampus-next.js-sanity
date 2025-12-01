import {groq} from 'next-sanity'
import {notFound} from 'next/navigation'
import {draftMode} from 'next/headers'

import RenderSection from '@/components/sections/RenderSection'
import {client, previewClient} from '@sanity/lib/client'
import {defaultLanguage, supportedLanguages} from '@/lib/i18n'
import {PagePreview} from './PagePreview'

// Query for a single page with locale fallbacks
const pageQuery = groq`*[_type == "page" && coalesce(metadata.localizedSlugs[$lang].current, metadata.slug.current) == $slug][0]{
  _id,
  title,
  metadata,
  modules[]{
    ...,
    _type,
    _key
  },
  "localized": translations[$lang]{
    title,
    metadataDescription,
    modules[]{
      ...,
      _type,
      _key
    }
  }
}`

const metadataQuery = groq`*[_type == "page" && coalesce(metadata.localizedSlugs[$lang].current, metadata.slug.current) == $slug][0]{title, metadata, "localized": translations[$lang]{ title, metadataDescription }}`

const hasSanityCredentials = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
)

type PageParams = { params: Promise<{ lang: string; slug: string }> }

export async function generateStaticParams() {
  if (!hasSanityCredentials) return []
  try {
    const pages = await client.fetch<
      Array<{slug?: {current?: string}; localizedSlugs?: Record<string, {current?: string}>}>
    >(groq`*[_type == "page" && defined(metadata.slug.current)]{
      "slug": metadata.slug,
      "localizedSlugs": metadata.localizedSlugs
    }`)

    return pages.flatMap(({slug, localizedSlugs}) =>
      supportedLanguages.map((lang) => ({
        lang,
        slug: localizedSlugs?.[lang]?.current ?? slug?.current ?? '',
      }))
    )
  } catch (error) {
    console.warn('Could not fetch page paths from Sanity:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageParams) {
  const { slug, lang = defaultLanguage } = await params

  if (!hasSanityCredentials) {
    return { title: slug, alternates: { languages: { en: '/en', nl: '/nl' } } }
  }

  try {
    const data = await client.fetch<
      | {title?: string; metadata?: {language?: string; description?: string}; localized?: {title?: string; metadataDescription?: string}}
      | null
    >(metadataQuery, {
      slug,
      lang,
    })
    if (!data) return { title: slug }
    const localizedTitle = data.localized?.title ?? data.title ?? slug
    const localizedDescription = data.localized?.metadataDescription ?? data.metadata?.description
    return {
      title: localizedTitle,
      description: localizedDescription,
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
  const { slug, lang = defaultLanguage } = await params
  const draft = await draftMode()

  if (!hasSanityCredentials) {
    notFound()
  }

  // Use previewClient in draft mode to see unpublished changes
  const activeClient = draft.isEnabled ? previewClient : client
  const page = await activeClient.fetch<
    | {
        _id: string
        title: string
        modules?: Array<{_key: string; _type: string}>
        localized?: {
          title?: string
          modules?: Array<{_key: string; _type: string}>
        }
      }
    | null
  >(pageQuery, {slug, lang})

  if (!page) {
    notFound()
  }

  if (draft.isEnabled) {
    return <PagePreview initial={{ data: page, sourceMap: undefined }} query={pageQuery} params={{ slug, lang }} />
  }

  const localizedModules = page.localized?.modules ?? page.modules
  const localizedTitle = page.localized?.title ?? page.title

  // Render the page modules using the new system
  return (
    <main id="main">
      <h1 className="sr-only">{localizedTitle}</h1>
      {localizedModules?.map((module) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </main>
  )
}
