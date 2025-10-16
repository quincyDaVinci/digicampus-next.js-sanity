import Image from 'next/image'

import { HybridBadge, HybridSection } from '@/components/ui/HybridComponents'
import { urlForImage } from '@/lib/sanityImage'
import { PartnersSectionData } from '@/types/homepage'

interface PartnersMarqueeProps {
  data?: PartnersSectionData
}

export default function PartnersMarquee({ data }: PartnersMarqueeProps) {
  if (!data?.logos || data.logos.length === 0) {
    return null
  }

  const originalLogos = data.logos
  const duplicatedLogos = [...originalLogos, ...originalLogos]

  return (
    <HybridSection aria-labelledby="partners-heading" variant={data.stylePreset ?? 'fresh'}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-4">
          <HybridBadge tone="accent" aria-hidden>
            Partners
          </HybridBadge>
          {data.heading ? (
            <h2 id="partners-heading" className="text-3xl font-semibold">
              {data.heading}
            </h2>
          ) : null}
        </div>
      </div>
      <div
        className="relative overflow-hidden border-y border-[rgb(var(--dc-border)/0.2)] bg-[rgb(var(--dc-surface))]"
        aria-label="Partners"
      >
        <ul className="animate-marquee flex min-w-max items-center gap-16 px-6 py-10">
          {duplicatedLogos.map((logo, index) => {
            const hasValidImage = logo.logo && typeof logo.logo === 'object' && 'asset' in logo.logo
            const imageUrl = hasValidImage ? urlForImage(logo.logo)?.width(200).height(120).fit('max').url() : null

            return (
              <li
                key={`${logo.name ?? 'partner'}-${index}`}
                className="flex h-20 w-40 items-center justify-center"
                aria-hidden={index >= originalLogos.length}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={logo.logo?.alt || logo.name || 'Partner logo'}
                    width={160}
                    height={80}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-sm font-semibold text-[rgb(var(--dc-text)/0.7)]">
                    {logo.name}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </HybridSection>
  )
}