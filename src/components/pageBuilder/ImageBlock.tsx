import Image from 'next/image'

import {urlFor} from '@sanity/lib/image'

import type {ImageComponent} from '@/types/pageBuilder'

interface ImageBlockProps {
  component: ImageComponent
}

export default function ImageBlock({component}: ImageBlockProps) {
  const image = component.image
  if (!image?.asset) return null

  const builder = urlFor(image).auto('format').fit('max').width(1600)
  const imageUrl = builder.url()
  const {width = 1600, height = 900} = image.asset.metadata?.dimensions ?? {width: 1600, height: 900}

  return (
    <figure className="flex w-full flex-col items-center gap-3">
      <span className="block w-full overflow-hidden rounded-2xl bg-[rgb(var(--dc-bg-soft))] shadow-md">
        <Image
          src={imageUrl}
          alt={image.alt || ''}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </span>
      {image.caption ? (
        <figcaption className="text-sm text-[rgb(var(--dc-text)/0.7)]">{image.caption}</figcaption>
      ) : null}
    </figure>
  )
}
