import Link, { type LinkProps } from 'next/link'
import { forwardRef } from 'react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type SectionVariant = 'fresh' | 'structured' | 'contrast'

const SECTION_VARIANTS: Record<SectionVariant, string> = {
  fresh: 'hy-section hy-section--fresh',
  structured: 'hy-section hy-section--structured',
  contrast: 'hy-section hy-section--contrast',
}

export interface HybridSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant?: SectionVariant
}

export function HybridSection({ as: Component = 'section', variant = 'structured', className, ...props }: HybridSectionProps) {
  const resolvedClassName = cn(SECTION_VARIANTS[variant], className)
  return <Component {...props} className={resolvedClassName} data-variant={variant} />
}

export type CardTone = 'surface' | 'accent' | 'contrast'

const CARD_TONE_CLASSNAMES: Record<CardTone, string> = {
  surface: 'hy-card hy-card--surface',
  accent: 'hy-card hy-card--accent',
  contrast: 'hy-card hy-card--contrast',
}

export interface HybridCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: ElementType
  tone?: CardTone
}

export function HybridCard({ as: Component = 'article', tone = 'surface', className, ...props }: HybridCardProps) {
  const resolvedClassName = cn(CARD_TONE_CLASSNAMES[tone], className)
  return <Component {...props} className={resolvedClassName} data-tone={tone} />
}

export type HybridButtonVariant = 'primary' | 'secondary' | 'ghost'

const BUTTON_VARIANT_CLASSNAMES: Record<HybridButtonVariant, string> = {
  primary: 'hy-btn hy-btn--primary',
  secondary: 'hy-btn hy-btn--secondary',
  ghost: 'hy-btn hy-btn--ghost',
}

type IconPosition = 'start' | 'end'

interface IconSlots {
  icon?: ReactNode
  iconPosition?: IconPosition
  children?: ReactNode
}

function renderButtonChildren({ icon, iconPosition = 'end', children }: IconSlots) {
  return (
    <>
      {icon && iconPosition === 'start' ? <span className="hy-btn__icon" aria-hidden>{icon}</span> : null}
      <span className="hy-btn__label">{children}</span>
      {icon && iconPosition === 'end' ? <span className="hy-btn__icon" aria-hidden>{icon}</span> : null}
    </>
  )
}

export interface HybridButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>, IconSlots {
  variant?: HybridButtonVariant
  children: ReactNode
}

export const HybridButton = forwardRef<HTMLButtonElement, HybridButtonProps>(function HybridButton(
  {
    variant = 'primary',
    icon,
    iconPosition = 'end',
    className,
    children,
    type = 'button',
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const resolvedClassName = cn(BUTTON_VARIANT_CLASSNAMES[variant], className)
  const computedAriaLabel = ariaLabel ?? (typeof children === 'string' ? children : undefined)

  return (
    <button
      ref={ref}
      type={type}
      className={resolvedClassName}
      aria-label={computedAriaLabel}
      {...props}
    >
      {renderButtonChildren({ icon, iconPosition, children })}
    </button>
  )
})

export interface HybridLinkButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'>,
    IconSlots,
    Pick<LinkProps, 'href' | 'prefetch' | 'replace' | 'scroll' | 'shallow' | 'locale'> {
  variant?: HybridButtonVariant
  children: ReactNode
}

export function HybridLinkButton({
  variant = 'primary',
  icon,
  iconPosition = 'end',
  className,
  children,
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  'aria-label': ariaLabel,
  ...props
}: HybridLinkButtonProps) {
  const resolvedClassName = cn(BUTTON_VARIANT_CLASSNAMES[variant], className)
  const computedAriaLabel = ariaLabel ?? (typeof children === 'string' ? children : undefined)

  return (
    <Link
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      className={resolvedClassName}
      aria-label={computedAriaLabel}
      {...props}
    >
      {renderButtonChildren({ icon, iconPosition, children })}
    </Link>
  )
}

export type BadgeTone = 'accent' | 'muted' | 'contrast'

const BADGE_TONE_CLASSNAMES: Record<BadgeTone, string> = {
  accent: 'hy-badge hy-badge--accent',
  muted: 'hy-badge hy-badge--muted',
  contrast: 'hy-badge hy-badge--contrast',
}

export interface HybridBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

export function HybridBadge({ tone = 'accent', className, ...props }: HybridBadgeProps) {
  const resolvedClassName = cn(BADGE_TONE_CLASSNAMES[tone], className)
  return <span {...props} className={resolvedClassName} />
}

export interface HybridEyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  tone?: BadgeTone
}

export function HybridEyebrow({ tone = 'muted', className, ...props }: HybridEyebrowProps) {
  return <p {...props} className={cn('hy-eyebrow', className, `hy-eyebrow--${tone}`)} />
}

export function getSectionVariant(variant?: SectionVariant): SectionVariant {
  return variant ?? 'structured'
}

export function getCardTone(tone?: CardTone): CardTone {
  return tone ?? 'surface'
}

export function getButtonVariant(variant?: HybridButtonVariant): HybridButtonVariant {
  return variant ?? 'primary'
}

