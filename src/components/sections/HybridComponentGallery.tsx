import { ArrowRightIcon, featherIconMap } from '@/components/icons/FeatherIcons'
import { HybridBadge, HybridCard, HybridLinkButton, HybridSection } from '@/components/ui/HybridComponents'
import {
  type HybridComponentData,
  type HybridComponentTone,
  type HybridIconKey,
} from '@/types/homepage'

const iconMap: Record<HybridIconKey, keyof typeof featherIconMap> = {
  flag: 'flag',
  layers: 'layers',
  zap: 'zap',
  shield: 'shield',
  users: 'users',
  'book-open': 'book-open',
}

const badgeToneByCard: Record<HybridComponentTone, 'accent' | 'muted' | 'contrast'> = {
  surface: 'muted',
  accent: 'accent',
  contrast: 'contrast',
}

const sectionVariantFallback = 'structured' as const

interface HybridComponentGalleryProps {
  components?: HybridComponentData[]
}

export default function HybridComponentGallery({ components }: HybridComponentGalleryProps) {
  const items = components?.filter(Boolean)

  if (!items || items.length === 0) {
    return null
  }

  const firstVariant = items.find((item) => item.stylePreset)?.stylePreset ?? sectionVariantFallback

  return (
    <HybridSection variant={firstVariant} aria-labelledby="hybrid-components-heading">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20">
        <div className="max-w-3xl space-y-4">
          <HybridBadge tone="accent" aria-hidden>
            Page builder
          </HybridBadge>
          <h2 id="hybrid-components-heading" className="text-3xl font-semibold text-[rgb(var(--dc-text))] dark:text-[rgb(var(--dc-text))]">
            Modulair toegankelijke componenten
          </h2>
          <p className="text-lg text-[rgb(var(--dc-text)/0.78)] dark:text-[rgb(var(--dc-text)/0.82)]">
            Deze hybride bibliotheek combineert de expressieve styling van DaisyUI met de WCAG-patronen van het NL Design System.
            Elk onderdeel is beschikbaar in de Sanity Studio pagina-builder.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((component) => {
            const Icon = featherIconMap[iconMap[component.icon ?? 'layers']]
            const tone = component.tone ?? 'surface'
            const badgeTone = badgeToneByCard[tone]
            const isCallout = component.variant === 'callout'
            const buttonVariant = isCallout ? 'primary' : 'secondary'

            return (
              <HybridCard key={component._key} tone={tone} className="h-full">
                <div className="hy-card__content">
                  <div className="flex items-start justify-between gap-4">
                    {component.eyebrow ? (
                      <HybridBadge tone={badgeTone}>{component.eyebrow}</HybridBadge>
                    ) : null}
                    <span className="hy-card__icon" aria-hidden>
                      <Icon aria-hidden focusable="false" width="1.5em" height="1.5em" />
                    </span>
                  </div>
                  {component.title ? (
                    <h3 className="text-2xl font-semibold text-[rgb(var(--dc-text))] dark:text-[rgb(var(--dc-text))]">
                      {component.title}
                    </h3>
                  ) : null}
                  {component.body ? (
                    <p className="text-base leading-relaxed text-[rgb(var(--dc-text)/0.75)] dark:text-[rgb(var(--dc-text)/0.8)]">
                      {component.body}
                    </p>
                  ) : null}
                  {component.cta?.href && component.cta.label ? (
                    <HybridLinkButton
                      href={component.cta.href}
                      variant={buttonVariant}
                      icon={<ArrowRightIcon aria-hidden focusable="false" />}
                      className="mt-auto self-start"
                    >
                      {component.cta.label}
                    </HybridLinkButton>
                  ) : null}
                </div>
              </HybridCard>
            )
          })}
        </div>
      </div>
    </HybridSection>
  )
}
