import {groq} from 'next-sanity'
import {notFound} from 'next/navigation'
import {draftMode} from 'next/headers'

import {client} from '@sanity/lib/client'
import RenderSection from '@/components/sections/RenderSection'
import {PagePreview} from './PagePreview'

// Simplified page query for the new modular system
const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  description,
  slug,
  modules[]{
    ...,
    _type,
    _key
  }
}`

const metadataQuery = groq`*[_type == "page" && slug.current == $slug][0]{title, description}`

const hasSanityCredentials = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
)

type PageParams = {params: Promise<{slug: string}>}

export async function generateStaticParams() {
  if (!hasSanityCredentials) return []
  try {
    const slugs = await client.fetch<Array<{slug: string}>>(groq`*[_type == "page" && defined(slug.current)]{"slug": slug.current}`)
    return slugs.map(({slug}) => ({slug}))
  } catch (error) {
    console.warn('Could not fetch page paths from Sanity:', error)
    return []
  }
}

export async function generateMetadata({params}: PageParams) {
  const {slug} = await params
  
  if (!hasSanityCredentials) {
    return {title: slug}
  }

  try {
    const data = await client.fetch<{title?: string; description?: string} | null>(metadataQuery, {
      slug,
    })
    if (!data) return {title: slug}
    return {
      title: data.title ?? slug,
      description: data.description,
    }
  } catch (error) {
    console.warn('Could not fetch metadata for page:', error)
    return {title: slug}
  }
}

export default async function Page({params}: PageParams) {
  const {slug} = await params
  const draft = await draftMode()
  
  if (!hasSanityCredentials) {
    notFound()
  }

  const page = await client.fetch<{_id: string; title: string; description?: string; modules?: Array<{_key: string; _type: string}>} | null>(pageQuery, {slug})

  if (!page) {
    notFound()
  }

  if (draft.isEnabled) {
    return <PagePreview initial={{data: page, sourceMap: undefined}} query={pageQuery} params={{slug}} />
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
