import Image from 'next/image'

import { urlForImage } from '@/lib/sanityImage'
import { TextImageSectionData } from '@/types/homepage'

interface TextImageSectionProps {
  data?: TextImageSectionData
}

export default function TextImageSection({ data }: TextImageSectionProps) {
  if (!data) {
    return null
  }

  const {
    heading,
    body,
    image,
    imagePosition = 'right',
  } = data

  // Check if image has a valid asset reference
  const hasValidImage = image && typeof image === 'object' && 'asset' in image
  const imageUrl = hasValidImage ? urlForImage(image)?.width(900).height(675).fit('crop').url() : null

  return (
    <section className="bg-dc-surface-98" aria-labelledby="story-heading">
      <div
        className={`mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-20 ${
          imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        <div className="flex-1">
          {heading ? (
            <h2
              id="story-heading"
              className="text-3xl font-semibold text-[rgb(var(--dc-on-surface))]"
            >
              {heading}
            </h2>
          ) : null}
          {body ? (
            <p className="mt-4 text-lg leading-relaxed text-[rgb(var(--dc-on-surface-variant))]">
              {body}
            </p>
          ) : null}
        </div>
        {imageUrl ? (
          <div className="flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-dc bg-dc-surface-98 shadow-lg">
              <Image
                src={imageUrl}
                alt={image?.alt || ''}
                fill
                sizes="(min-width: 768px) 33rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}