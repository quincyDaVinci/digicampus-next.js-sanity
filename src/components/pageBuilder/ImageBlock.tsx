import Image from 'next/image'

import {urlFor} from '@sanity/lib/image'

import type {ImageComponent} from '@/types/pageBuilder'

interface ImageBlockProps {
  component: ImageComponent
}

export default function ImageBlock({component}: ImageBlockProps) {
  if (!component.image?.asset) return null

  const imageBuilder = urlFor(component.image).auto('format').quality(90)
  const imageUrl = imageBuilder.width(1600).url()
  const {width = 1600, height = 900} = component.image.asset.metadata?.dimensions ?? {
    width: 1600,
    height: 900,
  }

  return (
    <figure className="flex w-full flex-col items-center gap-3">
      <span className="relative block w-full overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={imageUrl}
          alt={component.image.alt || ''}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </span>
      {component.caption ? (
        <figcaption className="text-sm text-[rgb(var(--dc-text)/0.7)]">{component.caption}</figcaption>
      ) : null}
    </figure>
  )
}
