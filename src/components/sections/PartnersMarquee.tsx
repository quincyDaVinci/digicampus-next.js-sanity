import Image from 'next/image'

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
    <section className="bg-dc-surface-98" aria-labelledby="partners-heading">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {data.heading ? (
          <h2 id="partners-heading" className="text-3xl font-semibold text-[rgb(var(--dc-on-surface))]">
            {data.heading}
          </h2>
        ) : null}
      </div>
      <div
        className="relative overflow-hidden border-y border-dc bg-dc-surface-98"
        aria-label="Partners"
      >
        <ul className="animate-marquee flex min-w-max items-center gap-16 px-6 py-10">
          {duplicatedLogos.map((logo, index) => {
            // Check if logo has a valid image with asset reference
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
                  <span className="text-sm font-semibold text-[rgb(var(--dc-on-surface-variant))]">
                    {logo.name}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}