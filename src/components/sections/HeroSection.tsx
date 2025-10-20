import { HeroSectionData } from '@/types/homepage'
import { HybridLinkButton, HybridSection } from '@/components/ui/HybridComponents'
import { ArrowRightIcon } from '@/components/icons/FeatherIcons'

interface HeroSectionProps {
  data?: HeroSectionData
}

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data) {
    return null
  }

  const { heading, intro, cta, stylePreset } = data

  const variant = stylePreset ?? 'fresh'

  return (
    <HybridSection aria-labelledby="hero-heading" variant={variant}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24 md:flex-row md:items-center">
        <div className="md:w-3/5">
          {heading ? (
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-semibold md:text-5xl"
            >
              {heading}
            </h1>
          ) : null}
          {intro ? (
            <p className="mt-6 max-w-2xl text-lg text-[rgb(var(--dc-text)/0.88)] dark:text-[rgb(var(--dc-text)/0.9)]">
              {intro}
            </p>
          ) : null}
          {cta?.href && cta.label ? (
            <div className="mt-10">
              <HybridLinkButton
                href={cta.href}
                variant="primary"
                icon={<ArrowRightIcon aria-hidden focusable="false" />}
                aria-label={`${cta.label}${heading ? ` – ${heading}` : ''}`}
              >
                {cta.label}
              </HybridLinkButton>
            </div>
          ) : null}
        </div>
      </div>
    </HybridSection>
  )
}