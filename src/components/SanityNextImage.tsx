import Image from 'next/image'
import { buildSrc } from 'sanity-image'
import { SanityImage } from 'sanity-image'
import type {CSSProperties} from 'react'

type SanityImageType = {
  asset?: { _ref?: string; _id?: string; metadata?: { dimensions?: { width?: number; height?: number } } }
  alt?: string
  blurDataURL?: string | null
}

interface SanityNextImageProps {
  image?: unknown
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
  if (image && typeof image === 'object' && (image as { asset?: unknown }).asset) {
    // Determine asset id/ref
    const asset = (image as { asset?: unknown }).asset
    let assetId: string | undefined
    if (typeof asset === 'string') {
      assetId = asset
    } else if (asset && typeof asset === 'object') {
      const a = asset as { _ref?: string; _id?: string }
      assetId = a._ref || a._id
    }

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
          // supply a tiny preview if available (ensure undefined, not null)
          preview={(blurDataURL ?? ((image as unknown as { blurDataURL?: string })?.blurDataURL)) ?? undefined}
          alt={(alt ?? (image as unknown as { alt?: string })?.alt) ?? ''}
        />
      )
    }
    // Try to use the plugin URL builder first
    try {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
      const baseUrl = projectId && dataset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : undefined
      const assetVal = (image as { asset?: unknown }).asset
      let maybeAssetId: string | undefined
      if (typeof assetVal === 'string') maybeAssetId = assetVal
      else if (assetVal && typeof assetVal === 'object') maybeAssetId = (assetVal as { _ref?: string; _id?: string })._ref || (assetVal as { _ref?: string; _id?: string })._id
      if (maybeAssetId && baseUrl) {
        const srcObj = buildSrc({ id: maybeAssetId, baseUrl, width, height, mode: fill ? 'cover' : 'contain' })
        resolvedSrc = srcObj?.src ?? undefined
      }
    } catch (err) {
      resolvedSrc = undefined
    }
    // Plugin-only: if plugin did not return a URL, do not fallback to legacy builder
    if (!resolvedSrc) {
      return null
    }

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
        blurDataURL={blurDataURL ?? ((image as unknown as { blurDataURL?: string })?.blurDataURL ?? undefined)}
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
      blurDataURL={blurDataURL ?? ((image as unknown as { blurDataURL?: string })?.blurDataURL ?? undefined)}
    />
  )
}
