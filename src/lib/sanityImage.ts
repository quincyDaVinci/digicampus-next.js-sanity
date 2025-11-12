import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

const builder = projectId && dataset
  ? createImageUrlBuilder({ projectId, dataset })
  : null

export function urlForImage(source?: SanityImageSource) {
  if (!source || !builder) {
    return null
  }

  return builder.image(source).auto('format')
}

// Back-compat alias used in some components/build output
type BuildImageOptions = {
  width?: number
  height?: number
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  quality?: number
}

// Back-compat alias used in some components/build output
// - If options are provided, returns a finalized URL string
// - If no options are provided, also returns a URL string with default auto format
export function buildImageUrl(source?: SanityImageSource, opts?: BuildImageOptions): string | null {
  const b = urlForImage(source)
  if (!b) return null
  let chain = b
  if (opts?.width) chain = chain.width(opts.width)
  if (opts?.height) chain = chain.height(opts.height)
  if (opts?.fit) chain = chain.fit(opts.fit)
  if (opts?.quality) chain = chain.quality(opts.quality)
  return chain.url()
}

