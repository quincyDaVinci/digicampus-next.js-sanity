import Image from 'next/image'

import { ArrowRightIcon } from '@/components/icons/FeatherIcons'
import { HybridBadge, HybridCard, HybridLinkButton, HybridSection } from '@/components/ui/HybridComponents'
import { urlForImage } from '@/lib/sanityImage'
import { CtaBannerData } from '@/types/homepage'

interface CTABannerProps {
  data?: CtaBannerData
}

export default function CTABanner({ data }: CTABannerProps) {
  if (!data) {
    return null
  }

  const { heading, body, cta, image, stylePreset } = data
  // Check if image has a valid asset reference
  const hasValidImage = image && typeof image === 'object' && 'asset' in image
  const imageUrl = hasValidImage ? urlForImage(image)?.width(720).height(480).fit('max').url() : null

  return (
    <HybridSection aria-labelledby="cta-banner-heading" variant={stylePreset ?? 'contrast'}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <HybridCard tone="contrast" className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4">
            <HybridBadge tone="contrast" aria-hidden>
              Samenwerken
            </HybridBadge>
            {heading ? (
              <h2 id="cta-banner-heading" className="text-3xl font-semibold">
                {heading}
              </h2>
            ) : null}
            {body ? (
              <p className="text-lg text-[rgb(var(--dc-on-primary)/0.85)]">
                {body}
              </p>
            ) : null}
            {cta?.href && cta.label ? (
              <HybridLinkButton
                href={cta.href}
                variant="primary"
                icon={<ArrowRightIcon aria-hidden focusable="false" />}
                aria-label={cta.ariaLabel ?? cta.label}
              >
                {cta.label}
              </HybridLinkButton>
            ) : null}
          </div>
          {imageUrl ? (
            <div className="flex-1">
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-[rgb(var(--dc-on-primary))] bg-[rgb(var(--dc-on-primary)/0.12)] p-4">
                <Image
                  src={imageUrl}
                  alt={image?.alt || ''}
                  fill
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
          ) : null}
        </HybridCard>
      </div>
    </HybridSection>
  )
}