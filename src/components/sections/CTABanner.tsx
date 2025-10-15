import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '@/lib/sanityImage'
import { CtaBannerData } from '@/types/homepage'

interface CTABannerProps {
  data?: CtaBannerData
}

export default function CTABanner({ data }: CTABannerProps) {
  if (!data) {
    return null
  }

  const { heading, body, cta, image } = data
  // Check if image has a valid asset reference
  const hasValidImage = image && typeof image === 'object' && 'asset' in image
  const imageUrl = hasValidImage ? urlForImage(image)?.width(720).height(480).fit('crop').url() : null

  return (
    <section className="bg-[rgb(var(--dc-primary))]" aria-labelledby="cta-banner-heading">
      <div className="mx-auto max-w-6xl px-6 py-16 text-[rgb(var(--dc-on-primary))]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="lg:w-2/3">
            {heading ? (
              <h2
                id="cta-banner-heading"
                className="text-3xl font-semibold text-[rgb(var(--dc-on-primary))]"
              >
                {heading}
              </h2>
            ) : null}
            {body ? (
              <p className="mt-4 max-w-2xl text-lg text-[rgb(var(--dc-on-primary)/0.85)]">
                {body}
              </p>
            ) : null}
            {cta?.href && cta.label ? (
              <div className="mt-8">
                <Link
                  href={cta.href}
                  className="inline-flex items-center justify-center rounded-full bg-[rgb(var(--dc-on-primary))] px-6 py-3 text-base font-semibold text-[rgb(var(--dc-primary))] shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-on-primary)/0.6)]"
                >
                  {cta.label}
                </Link>
              </div>
            ) : null}
          </div>
          {imageUrl ? (
            <div className="lg:w-1/3">
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-[rgb(var(--dc-on-primary)/0.2)] bg-[rgb(var(--dc-on-primary)/0.1)]">
                <Image
                  src={imageUrl}
                  alt={image?.alt || ''}
                  fill
                  sizes="(min-width: 1024px) 20rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}