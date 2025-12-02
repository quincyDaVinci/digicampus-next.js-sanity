import SanityNextImage from '@/components/SanityNextImage'
import Link from 'next/link'

import {urlFor} from '@sanity/lib/image'
import { buildSrc } from 'sanity-image'

import type {ImageComponent} from '@/types/pageBuilder'

import BackgroundLayer from './BackgroundLayer'

const widthClassMap: Record<NonNullable<ImageComponent['displayWidth']>, string> = {
  narrow: 'max-w-sm',
  default: 'max-w-2xl',
  wide: 'max-w-4xl',
  full: 'w-full',
}

const alignmentClassMap: Record<NonNullable<ImageComponent['alignment']>, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
}

interface ImageBlockProps {
  component: ImageComponent
}

export default function ImageBlock({component}: ImageBlockProps) {
  if (!component.image?.asset) return null

  const alignmentClass = component.alignment ? alignmentClassMap[component.alignment] : alignmentClassMap.center
  const widthClass = component.displayWidth ? widthClassMap[component.displayWidth] : widthClassMap.default
  const {width = 1600, height = 900} = component.image.asset.metadata?.dimensions ?? {width: 1600, height: 900}
  let imageUrl: string | null = null
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    const baseUrl = projectId && dataset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : undefined
    const asset = component.image.asset
    const assetId = asset?._ref || asset?._id || (typeof asset === 'string' ? asset : undefined)
    if (assetId && baseUrl) {
      const srcObj = buildSrc({ id: assetId, baseUrl, width: 1600, height: 900, mode: 'cover' })
      imageUrl = srcObj?.src ?? null
    }
  } catch (err) {
    imageUrl = null
  }
  if (!imageUrl) imageUrl = urlFor(component.image).auto('format').quality(90).width(1600).height(900).fit('crop').url()
  const rounded = component.rounded ?? true
  
  // Determine wrapper type and props properly
  const hasLink = Boolean(component.link?.href)
  const hasZoom = Boolean(component.allowZoom)
  
  const WrapperElement = hasLink ? Link : hasZoom ? 'a' : 'div'
  const wrapperProps = hasLink && component.link
    ? {href: component.link.href, 'aria-label': component.link.label}
    : hasZoom
      ? {href: imageUrl, target: '_blank' as const, rel: 'noopener noreferrer', 'aria-label': `${component.image.alt || 'Afbeelding'} openen in nieuw venster`}
      : {}

  const WrapperComponent = WrapperElement as React.ElementType

  return (
    <figure
      className={[
        'relative flex w-full flex-col gap-3',
        widthClass,
        alignmentClass,
        rounded ? 'rounded-3xl' : 'rounded-lg',
        'p-4 sm:p-6',
        component.background ? 'overflow-hidden' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{color: 'hsl(var(--dc-text))'}}
    >
      {component.background ? <BackgroundLayer background={component.background} /> : null}
      <WrapperComponent
        {...wrapperProps}
        className={[
          'relative block w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]',
        ].join(' ')}
      >
        <span
          className="relative block w-full"
          style={{
            borderRadius: rounded ? '1.5rem' : '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 20px 40px hsl(var(--dc-text)/0.12)',
          }}
        >
          <SanityNextImage
            image={component.image}
            alt={component.image.alt || ''}
            width={width}
            height={height}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 70vw"
            placeholder={component.image?.blurDataURL ? 'blur' : undefined}
          />
      </span>
      </WrapperComponent>
      {component.image.caption ? (
        <figcaption className="relative text-center text-sm text-[hsl(var(--dc-text)/0.7)]">{component.image.caption}</figcaption>
      ) : null}
    </figure>
  )
}

