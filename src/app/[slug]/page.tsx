import {groq} from 'next-sanity'
import {notFound} from 'next/navigation'
import {draftMode} from 'next/headers'

import {client} from '@sanity/lib/client'
import {PageRenderer} from '@/components/pageBuilder'
import {PagePreview} from './PagePreview'
import type {PageDocument} from '@/types/pageBuilder'

const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  description,
  slug,
  blocks[]{
    _key,
    _type,
    ...,
    _type == "imageComponent" => {
      image{
        asset->{..., metadata{dimensions, lqip}, url},
        alt
      },
      caption
    },
    _type == "videoComponent" => {
      title,
      videoUrl,
      poster{
        asset->{..., metadata{dimensions, lqip}, url},
        alt
      },
      transcript
    },
    _type == "buttonComponent" => {
      label,
      link{label, href}
    }
  }
}`

const metadataQuery = groq`*[_type == "page" && slug.current == $slug][0]{title, description}`

const hasSanityCredentials = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
)

type PageParams = {params: {slug: string}}

export async function generateStaticParams() {
  if (!hasSanityCredentials) return []
  try {
    const slugs = await client.fetch<Array<{slug: string}>>(groq`*[_type == "page" && defined(slug.current)]{"slug": slug.current}`)
    return slugs.map(({slug}) => ({slug}))
  } catch (error) {
    console.warn('Kon geen paginapaden ophalen uit Sanity:', error)
    return []
  }
}

export async function generateMetadata({params}: PageParams) {
  if (!hasSanityCredentials) {
    return {title: params.slug}
  }

  try {
    const data = await client.fetch<{title?: string; description?: string} | null>(metadataQuery, {
      slug: params.slug,
    })
    if (!data) return {title: params.slug}
    return {
      title: data.title ?? params.slug,
      description: data.description,
    }
  } catch (error) {
    console.warn('Kon metadata niet ophalen voor pagina:', error)
    return {title: params.slug}
  }
}

export default async function Page({params}: PageParams) {
  const draft = await draftMode()

  if (!hasSanityCredentials) {
    notFound()
  }

  const page = await client.fetch<PageDocument | null>(pageQuery, {slug: params.slug})

  if (!page) {
    notFound()
  }

  if (draft.isEnabled) {
    return <PagePreview initial={{data: page, sourceMap: undefined}} query={pageQuery} params={{slug: params.slug}} />
  }

  return <PageRenderer page={page} />
}
