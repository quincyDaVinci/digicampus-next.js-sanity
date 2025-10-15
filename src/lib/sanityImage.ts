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

  return builder.image(source)
}