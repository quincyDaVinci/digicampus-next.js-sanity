import Image from 'next/image'

import {urlFor} from '@sanity/lib/image'

import type {ImageBlock as ImageBlockType} from '@/types/pageBuilder'

interface ImageBlockProps {
  block: ImageBlockType
}

export default function ImageBlock({block}: ImageBlockProps) {
  const image = block.image
  if (!image?.asset) return null

  const builder = urlFor(image).auto('format').quality(90)
  const imageUrl = image.asset.url ?? builder.width(1600).url()
  const {width = 1600, height = 900} = image.asset.metadata?.dimensions ?? {}

  return (
    <figure className="flex w-full flex-col items-center gap-3">
      <div className="relative w-full overflow-hidden rounded-3xl bg-[rgb(var(--dc-text)/0.05)] shadow-lg">
        <Image
          src={imageUrl}
          alt={image.alt || ''}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      </div>
      {image.caption ? (
        <figcaption className="text-sm text-[rgb(var(--dc-text)/0.7)]">{image.caption}</figcaption>
      ) : null}
    </figure>
  )
}
