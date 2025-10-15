import Link from 'next/link'

import { HeroSectionData } from '@/types/homepage'

interface HeroSectionProps {
  data?: HeroSectionData
}

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data) {
    return null
  }

  const { heading, intro, cta } = data

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-dc-surface-98 text-[rgb(var(--dc-on-surface))]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:flex-row md:items-center">
        <div className="md:w-3/5">
          {heading ? (
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-semibold text-[rgb(var(--dc-on-surface))] md:text-5xl"
            >
              {heading}
            </h1>
          ) : null}
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg text-[rgb(var(--dc-on-surface-variant))]">
              {intro}
            </p>
          ) : null}
          {cta?.href && cta.label ? (
            <div className="mt-10">
              <Link
                href={cta.href}
                className="inline-flex items-center justify-center rounded-full bg-[rgb(var(--dc-primary))] px-6 py-3 text-base font-semibold text-[rgb(var(--dc-on-primary))] shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-primary)/0.4)]"
              >
                {cta.label}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}