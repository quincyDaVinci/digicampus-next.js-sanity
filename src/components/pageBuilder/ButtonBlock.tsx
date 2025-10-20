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
  const baseClass = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.25)]'
  const fullWidthClass = component.fullWidth ? 'w-full' : ''

  switch (component.variant) {
    case 'filled':
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: 'rgb(var(--dc-primary))',
          color: 'rgb(var(--dc-on-primary))',
          border: '2px solid rgb(var(--dc-primary)/0.85)',
        },
      }
    case 'outline':
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: 'transparent',
          color: 'rgb(var(--dc-primary))',
          border: '2px solid rgb(var(--dc-primary)/0.6)',
        },
      }
    case 'ghost':
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: 'rgb(var(--dc-primary)/0.08)',
          color: 'rgb(var(--dc-primary))',
          border: '2px solid transparent',
        },
      }
    case 'custom': {
      const bg = tokenToCss(component.customColorToken) ?? 'rgb(var(--dc-brand))'
      const text = tokenToCss(component.customTextColorToken) ?? 'rgb(var(--dc-on-primary))'
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: bg,
          color: text,
          border: '2px solid rgb(var(--dc-border)/0.35)',
        },
      }
    }
    case 'cta':
    default:
      return {
        className: `${baseClass} ${fullWidthClass}`.trim(),
        style: {
          backgroundColor: 'rgb(var(--dc-brand))',
          color: 'rgb(var(--dc-on-primary))',
          border: '2px solid rgb(var(--dc-brand)/0.75)',
          boxShadow: '0 20px 32px rgb(var(--dc-brand)/0.25)',
        },
      }
  }
}

interface ButtonBlockProps {
  component: ButtonComponent
}

export default function ButtonBlock({component}: ButtonBlockProps) {
  const iconPosition = component.iconPosition ?? 'trailing'
  const icon = component.icon ? iconMap[component.icon] : null
  const styles = computeVariantStyles(component)
  const ariaLabel = component.ariaLabel || component.link.label
  const href = component.link.href
  const isInternal = /^\//.test(href)
  const content = (
    <span className="flex items-center gap-2">
      {iconPosition !== 'trailing' && icon ? <span className="hy-btn__icon">{icon}</span> : null}
      <span className="hy-btn__label">{component.label}</span>
      {iconPosition !== 'leading' && icon ? <span className="hy-btn__icon">{icon}</span> : null}
    </span>
  )

  if (isInternal) {
    return (
      <Link href={href} aria-label={ariaLabel} className={styles.className} style={styles.style}>
        {content}
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
      {isExternal ? <span className="sr-only"> (opent in nieuw venster)</span> : null}
    </a>
  )
}
