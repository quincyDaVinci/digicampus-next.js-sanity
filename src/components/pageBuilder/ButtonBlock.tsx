import Link from 'next/link'

import type {ButtonComponent} from '@/types/pageBuilder'

interface ButtonBlockProps {
  component: ButtonComponent
}

function ButtonContent({label}: {label: string}) {
  return <span className="text-base font-semibold">{label}</span>
}

export default function ButtonBlock({component}: ButtonBlockProps) {
  const ariaLabel = component.label
  const href = component.href
  if (!href) return null
  const isExternal = /^https?:/i.test(href)

  const className =
    'inline-flex items-center justify-center rounded-full bg-[rgb(var(--dc-brand))] px-6 py-3 text-base font-semibold text-[rgb(var(--dc-on-primary))] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.25)]'

  if (href.startsWith('/')) {
    return (
      <Link href={href} aria-label={ariaLabel} className={className}>
        <ButtonContent label={component.label} />
      </Link>
    )
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={className}
      target={component.openInNewTab || isExternal ? '_blank' : undefined}
      rel={component.openInNewTab || isExternal ? 'noopener noreferrer' : undefined}
    >
      <ButtonContent label={component.label} />
      {component.openInNewTab || isExternal ? <span className="sr-only"> (opent in nieuw venster)</span> : null}
    </a>
  )
}
