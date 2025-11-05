import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

/**
 * Returns a pre-configured image URL builder for the given source.
 *
 * Defaults:
 * - auto('format') ensures vectors (e.g. SVG) are rasterized so crop/hotspot apply
 * - quality(85) provides a good balance of size and fidelity
 *
 * Consumers can continue chaining (width/height/fit/etc.).
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto('format').quality(85)
}
