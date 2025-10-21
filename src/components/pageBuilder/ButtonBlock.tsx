import Link from 'next/link'

import type {ButtonBlock as ButtonBlockType} from '@/types/pageBuilder'

interface ButtonBlockProps {
  block: ButtonBlockType
}

const baseClassName =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(var(--dc-brand))] px-6 py-3 text-base font-semibold text-[rgb(var(--dc-on-primary))] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.25)]'

export default function ButtonBlock({block}: ButtonBlockProps) {
  const href = block.link.href
  const label = block.label
  const isInternal = href.startsWith('/')

  if (isInternal) {
    return (
      <div className="flex">
        <Link href={href} className={baseClassName} aria-label={label}>
          {label}
        </Link>
      </div>
    )
  }

  const isExternal = /^https?:/i.test(href)

  return (
    <div className="flex">
      <a
        href={href}
        className={baseClassName}
        aria-label={label}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {label}
        {isExternal ? <span className="sr-only"> (opent in nieuw venster)</span> : null}
      </a>
    </div>
  )
}
