import Image from 'next/image'

import { HybridCard, HybridSection } from '@/components/ui/HybridComponents'
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
    stylePreset,
    cardTone = 'surface',
  } = data

  // Check if image has a valid asset reference
  const hasValidImage = image && typeof image === 'object' && 'asset' in image
  const imageUrl = hasValidImage ? urlForImage(image)?.width(900).height(675).fit('max').url() : null

  return (
    <HybridSection className="overflow-hidden" aria-labelledby="story-heading" variant={stylePreset ?? 'structured'}>
      <div
        className={`mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-20 ${
          imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        <HybridCard as="div" tone={cardTone} className="flex-1">
          {heading ? (
            <h2 id="story-heading" className="text-3xl font-semibold">
              {heading}
            </h2>
          ) : null}
          {body ? (
            <p className="text-lg leading-relaxed text-[rgb(var(--dc-text)/0.88)] dark:text-[rgb(var(--dc-text)/0.92)]">
              {body}
            </p>
          ) : null}
        </HybridCard>
        {imageUrl ? (
          <div className="flex-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border-2 border-[rgb(var(--dc-border)/0.45)] bg-[rgb(var(--dc-surface))] shadow-2xl">
              <Image
                src={imageUrl}
                alt={image?.alt || ''}
                fill
                sizes="(min-width: 768px) 33rem, 100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        ) : null}
      </div>
    </HybridSection>
  )
}