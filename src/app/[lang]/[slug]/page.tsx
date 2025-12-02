import {groq} from 'next-sanity'
import {notFound} from 'next/navigation'
import {draftMode} from 'next/headers'

import RenderSection from '@/components/sections/RenderSection'
import {client, previewClient} from '@sanity/lib/client'
import {defaultLanguage, supportedLanguages} from '@/lib/i18n'
import {PagePreview} from './PagePreview'
import {urlFor} from '@sanity/lib/image'

// Helper: generate a tiny base64 LQIP for a Sanity image source
async function generateBlurDataURL(source: any) {
  try {
    const tinyUrl = urlFor(source).width(24).height(16).auto('format').quality(20).url()
    const res = await fetch(tinyUrl)
    if (!res.ok) return null
    const arrayBuffer = await res.arrayBuffer()
    const mime = res.headers.get('content-type') || 'image/jpeg'
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    return `data:${mime};base64,${base64}`
  } catch (err) {
    console.warn('Could not generate blurDataURL', err)
    return null
  }
}

async function attachBlurDataToModule(module: any) {
  // Clone shallow
  const m = {...module}

  const tasks: Promise<void>[] = []

  // helper to set blur on an image object path
  const setBlur = (obj: any, key: string) => {
    if (!obj || !obj[key] || !obj[key].asset) return
    const src = obj[key]
    tasks.push((async () => {
      const blur = await generateBlurDataURL(src)
      if (blur) {
        obj[key] = {...src, blurDataURL: blur}
      }
    })())
  }

  setBlur(m, 'image')
  setBlur(m, 'mainImage')
  if (m.media && typeof m.media === 'object') setBlur(m.media, 'image')
  if (m.author && typeof m.author === 'object') setBlur(m.author, 'image')
  if (Array.isArray(m.gallery)) {
    m.gallery = m.gallery.map((img: any) => ({...img}))
    m.gallery.forEach((img: any, idx: number) => {
      tasks.push((async () => {
        if (img?.asset) {
          const blur = await generateBlurDataURL(img)
          if (blur) m.gallery[idx] = {...img, blurDataURL: blur}
        }
      })())
    })
  }

  await Promise.all(tasks)
  return m
}

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

  let localizedModules = page.localized?.modules ?? page.modules
  const localizedTitle = page.localized?.title ?? page.title

  // Attach blurDataURL placeholders to images in modules (server-side)
  try {
    if (Array.isArray(localizedModules) && localizedModules.length > 0) {
      const processed = await Promise.all(localizedModules.map((m: any) => attachBlurDataToModule(m)))
      localizedModules = processed
    }
  } catch (err) {
    console.warn('Error generating blurDataURLs for modules', err)
  }

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
