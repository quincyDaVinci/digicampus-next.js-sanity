import Link from 'next/link'

import type {ButtonComponent} from '@/types/pageBuilder'

interface ButtonBlockProps {
  component: ButtonComponent
}

const baseClassName =
  'inline-flex items-center justify-center rounded-full bg-[rgb(var(--dc-brand))] px-6 py-3 text-base font-semibold text-[rgb(var(--dc-on-primary))] shadow-lg transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.25)]'

export default function ButtonBlock({component}: ButtonBlockProps) {
  const href = component.link.href
  const ariaLabel = component.label
  const content = <span>{component.label}</span>

  if (/^\//.test(href)) {
    return (
      <Link href={href} aria-label={ariaLabel} className={baseClassName}>
        {content}
      </Link>
    )
  }

  const isExternal = /^https?:/i.test(href)

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={baseClassName}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {content}
      {isExternal ? <span className="sr-only"> (opent in nieuw venster)</span> : null}
    </a>
  )
}
