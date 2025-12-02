import Image from 'next/image'
import {urlFor} from '@sanity/lib/image'
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
  if (!resolvedSrc && image && image.asset) {
    // Use provided width/height if present, otherwise leave flexible
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
