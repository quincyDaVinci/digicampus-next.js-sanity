import Image from 'next/image'
import {urlFor} from '@sanity/lib/image'
import { SanityImage } from 'sanity-image'
import type {CSSProperties} from 'react'

interface SanityNextImageProps {
  image?: any // Sanity image object
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
  sizes?: string
  fill?: boolean
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string | null
}

export default function SanityNextImage(props: SanityNextImageProps) {
  const {image, src, alt = '', width, height, className, style, sizes, fill, priority, placeholder, blurDataURL} = props

  // If a Sanity image object is provided, build a sensible default URL using urlFor
  let resolvedSrc = src

  // If a Sanity image object is provided, prefer rendering with the `sanity-image` plugin
  if (image && image.asset) {
    // Determine asset id/ref
    const asset = image.asset
    const assetId = asset._ref || asset._id || (typeof asset === 'string' ? asset : undefined)

    if (assetId) {
      // Use the SanityImage component from the plugin. It will build srcSet and support preview LQIP.
      return (
        <SanityImage
          id={assetId}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          width={width}
          height={height}
          className={className}
          style={style}
          // supply a tiny preview if available
          preview={blurDataURL ?? image?.blurDataURL}
          alt={alt ?? image?.alt ?? ''}
        />
      )
    }
    // fallback to URL builder when asset id not found
    const builder = urlFor(image).auto('format')
    if (width) builder.width(width)
    if (height) builder.height(height)
    resolvedSrc = builder.url()
  }

  // Fallback: if no resolved src, render nothing
  if (!resolvedSrc) return null

  // Prefer Next Image's `fill` mode when `fill` is true
  if (fill) {
    return (
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        className={className}
        style={style}
        sizes={sizes}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL ?? (image?.blurDataURL ?? undefined)}
      />
    )
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      sizes={sizes}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL ?? (image?.blurDataURL ?? undefined)}
    />
  )
}
