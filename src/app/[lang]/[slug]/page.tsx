import {groq} from 'next-sanity'
import {notFound} from 'next/navigation'
import {draftMode} from 'next/headers'

import RenderSection from '@/components/sections/RenderSection'
import {client, previewClient} from '@sanity/lib/client'
import {defaultLanguage, supportedLanguages} from '@/lib/i18n'
import {applyModuleTextOverrides} from '@/lib/applyModuleTranslations'
import {PagePreview} from './PagePreview'
import { buildSrc } from 'sanity-image'

// Lightweight types for Sanity image-like shapes we handle here
type SanityImageLike = { asset?: { _ref?: string; _id?: string } } | string | null | undefined

// Helper: generate a tiny base64 LQIP for a Sanity image source
async function generateBlurDataURL(source: SanityImageLike) {
  try {
    let tinyUrl: string | null = null
    try {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
      const baseUrl = projectId && dataset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : undefined
      let assetId: string | undefined
      if (typeof source === 'string') {
        assetId = source
      } else if (source && typeof source === 'object') {
        const maybeAsset = (source as { asset?: unknown }).asset as unknown
        if (maybeAsset && typeof maybeAsset === 'object') {
          const a = maybeAsset as { _ref?: string; _id?: string }
          assetId = a._ref || a._id
        }
      }
      if (baseUrl && assetId) {
        const srcObj = buildSrc({ id: assetId, baseUrl, width: 24, height: 16, mode: 'contain', queryParams: { q: 20 } })
        tinyUrl = srcObj?.src ?? null
      }
    } catch (err) {
      tinyUrl = null
    }
    if (!tinyUrl) {
      // Plugin-only: if we couldn't build a plugin URL, abort LQIP generation
      return null
    }
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

async function attachBlurDataToModule(module: Record<string, unknown>) {
  // Clone shallow
  const m = {...module} as Record<string, unknown>

  const tasks: Promise<void>[] = []

  // helper to set blur on an image object path
  const setBlur = (obj: Record<string, unknown> | undefined, key: string) => {
    if (!obj) return
    const val = obj[key] as unknown
    if (!val || typeof val !== 'object') return
    const maybeImage = val as { asset?: unknown }
    if (!maybeImage.asset) return

    tasks.push((async () => {
      const blur = await generateBlurDataURL(maybeImage as unknown as SanityImageLike)
      if (blur) {
        ;(obj as Record<string, unknown>)[key] = ({...(maybeImage as Record<string, unknown>), blurDataURL: blur} as unknown) as unknown
      }
    })())
  }

  setBlur(m, 'image')
  setBlur(m, 'mainImage')
  if (m.media && typeof m.media === 'object') setBlur(m.media as Record<string, unknown>, 'image')
  if (m.author && typeof m.author === 'object') setBlur(m.author as Record<string, unknown>, 'image')
  if (Array.isArray(m.allTeamMembers)) {
    ;(m.allTeamMembers as unknown[]).forEach((member) => setBlur(member as Record<string, unknown>, 'image'))
  }
  if (Array.isArray(m.gallery)) {
    const gallery = (m.gallery as unknown[]).map((img) => ({...(img as Record<string, unknown>)}))
    gallery.forEach((img, idx) => {
      tasks.push((async () => {
        const maybeImg = img as Record<string, unknown>
        if (maybeImg?.asset) {
          const blur = await generateBlurDataURL(maybeImg as unknown as SanityImageLike)
          if (blur) gallery[idx] = ({...maybeImg, blurDataURL: blur})
        }
      })())
    })
    ;(m as Record<string, unknown>).gallery = gallery as unknown
  }

  await Promise.all(tasks)
  return m
}

// Query for a single page with locale fallbacks
const pageQuery = groq`*[_type == "page" && coalesce(metadata.localizedSlugs[$lang].current, metadata.localizedSlugs.en.current, metadata.localizedSlugs.nl.current) == $slug][0]{
  _id,
  title,
  metadata,
  modules[]{
    ..., 
    _type,
    _key,
    // If module is a teamSection, include the autoIncludeAll flag and a complete list of authors
    autoIncludeAll,
    "allTeamMembers": *[_type == "author"]{ _id, _type, name, "position": role, "category": category->{ _id, title, "slug": slug.current }, image, slug, includeInTeam, email, linkedin },
    "teamSettings": *[_type == "teamSettings"][0]{ "categoriesOrder": categoriesOrder[]->{ _id, title, "slug": slug.current }, defaultCategoryTitle }
  },
  "localized": translations[language == $lang][0]{
    title,
    metadataDescription,
    modules
  }
}`

const metadataQuery = groq`*[_type == "page" && coalesce(metadata.localizedSlugs[$lang].current, metadata.localizedSlugs.en.current, metadata.localizedSlugs.nl.current) == $slug][0]{title, metadata, "localized": translations[language == $lang][0]{ title, metadataDescription }}`

const hasSanityCredentials = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
)

type PageParams = { params: Promise<{ lang: string; slug: string }> }

export async function generateStaticParams() {
  if (!hasSanityCredentials) return []
  try {
    const pages = await client.fetch<
      Array<{localizedSlugs?: Record<string, {current?: string}>}>
    >(groq`*[_type == "page" && (defined(metadata.localizedSlugs.en.current) || defined(metadata.localizedSlugs.nl.current))]{
      "localizedSlugs": metadata.localizedSlugs
    }`)

    return pages.flatMap(({localizedSlugs}) =>
      supportedLanguages.map((lang) => ({
        lang,
        slug: localizedSlugs?.[lang]?.current ?? '',
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
          modules?: Array<{moduleKey?: string; fieldPath?: string; text?: string}>
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

  const overrides = page.localized?.modules
  let localizedModules = applyModuleTextOverrides(page.modules, overrides)
  const localizedTitle = page.localized?.title ?? page.title

  // Attach blurDataURL placeholders to images in modules (server-side)
  try {
    if (Array.isArray(localizedModules) && localizedModules.length > 0) {
      const processed = await Promise.all(localizedModules.map((m: unknown) => attachBlurDataToModule(m as Record<string, unknown>)))
      localizedModules = processed as unknown as typeof localizedModules
    }
  } catch (err) {
    console.warn('Error generating blurDataURLs for modules', err)
  }

  // Render the page modules using the new system
  return (
    <section aria-label={localizedTitle || undefined} className="contents">
      <h1 className="sr-only">{localizedTitle}</h1>
      {localizedModules?.map((module) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </section>
  )
}
