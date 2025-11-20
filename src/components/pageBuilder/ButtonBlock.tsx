import Link from 'next/link'
import type {CSSProperties, ReactNode} from 'react'

import {
  ArrowRightIcon,
  DownloadIcon,
  ExternalLinkIcon,
  PlayIcon,
} from '@/components/icons/FeatherIcons'
import type {ButtonComponent} from '@/types/pageBuilder'

import {tokenToCss} from './colorUtils'

const iconMap: Record<NonNullable<ButtonComponent['icon']>, ReactNode> = {
  none: null,
  'arrow-right': <ArrowRightIcon aria-hidden />,
  download: <DownloadIcon aria-hidden />,
  external: <ExternalLinkIcon aria-hidden />,
  video: <PlayIcon aria-hidden />,
}

function computeVariantStyles(component: ButtonComponent): {className: string; style?: CSSProperties} {
  const baseClass = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]'
  const fullWidthClass = component.fullWidth ? 'w-full' : ''

  switch (component.variant) {
    case 'filled':
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: 'hsl(var(--dc-primary))',
          color: 'hsl(var(--dc-on-primary))',
          border: '2px solid hsl(var(--dc-primary)/0.85)',
        },
      }
    case 'outline':
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: 'transparent',
          color: 'hsl(var(--dc-primary))',
          border: '2px solid hsl(var(--dc-primary)/0.6)',
        },
      }
    case 'ghost':
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: 'hsl(var(--dc-primary)/0.08)',
          color: 'hsl(var(--dc-primary))',
          border: '2px solid transparent',
        },
      }
    case 'custom': {
      const bg = tokenToCss(component.customColorToken) ?? 'hsl(var(--dc-brand))'
      const text = tokenToCss(component.customTextColorToken) ?? 'hsl(var(--dc-on-primary))'
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: bg,
          color: text,
          border: '2px solid hsl(var(--dc-border)/0.35)',
        },
      }
    }
    case 'cta':
    default:
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: 'hsl(var(--dc-brand))',
          color: 'hsl(var(--dc-on-primary))',
          border: '2px solid hsl(var(--dc-brand)/0.75)',
          boxShadow: '0 20px 32px hsl(var(--dc-brand)/0.25)',
        },
      }
  }
}

interface ButtonBlockProps {
  component: ButtonComponent
}

const INACCESSIBLE_PDF_WARNING = 'PDF-bestand zonder toegankelijke versie beschikbaar'

export default function ButtonBlock({component}: ButtonBlockProps) {
  const iconPosition = component.iconPosition ?? 'trailing'
  const icon = component.icon ? iconMap[component.icon] : null
  const styles = computeVariantStyles(component)
  const ariaLabel = component.ariaLabel || component.link.label
  const accessibleHref = component.accessibleVersionUrl?.trim()
  const href = accessibleHref || component.link.href
  const isPdfTarget = component.isPdf ?? /\.pdf(?:$|[?#])/i.test(component.link.href)
  const hasAccessiblePdf = Boolean(accessibleHref)
  const showAccessibleBadge = hasAccessiblePdf && isPdfTarget
  const isInternal = /^\//.test(href)
  
  // Screen reader notifications
  const inaccessiblePdfWarning = isPdfTarget && !hasAccessiblePdf ? (
    <span className="sr-only"> ({INACCESSIBLE_PDF_WARNING})</span>
  ) : null
  
  const accessibilityNoteElement = component.accessibilityNote ? (
    <span className="sr-only"> {component.accessibilityNote}</span>
  ) : null
  
  const content = (
    <span className="flex items-center gap-2">
      {iconPosition !== 'trailing' && icon ? <span className="hy-btn__icon">{icon}</span> : null}
      <span className="hy-btn__label">{component.label}</span>
      {showAccessibleBadge ? (
        <span className="ml-1 rounded bg-[hsl(var(--dc-bg-soft))] px-2 py-0.5 text-xs font-semibold text-[hsl(var(--dc-text))]">
          Toegankelijke PDF
        </span>
      ) : null}
      {iconPosition !== 'leading' && icon ? <span className="hy-btn__icon">{icon}</span> : null}
    </span>
  )

  if (isInternal) {
    return (
      <Link href={href} aria-label={ariaLabel} className={styles.className} style={styles.style}>
        {content}
        {inaccessiblePdfWarning}
        {accessibilityNoteElement}
      </Link>
    )
  }

  const isExternal = /^https?:/i.test(href)

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={styles.className}
      style={styles.style}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {content}
      {inaccessiblePdfWarning}
      {accessibilityNoteElement}
      {isExternal ? <span className="sr-only"> (opent in nieuw venster)</span> : null}
    </a>
  )
}

