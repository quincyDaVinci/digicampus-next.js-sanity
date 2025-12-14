import {PortableText} from 'next-sanity'
import type {PortableTextReactComponents} from 'next-sanity'

import type {RichTextComponent} from '@/types/pageBuilder'

const maxWidthMap: Record<NonNullable<RichTextComponent['maxWidth']>, string> = {
  narrow: 'max-w-2xl',
  default: 'max-w-3xl',
  wide: 'max-w-5xl',
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({children}) => <p className="text-fluid-md leading-relaxed text-[hsl(var(--dc-text))]">{children}</p>,
    h1: ({children}) => (
      <h1 className="text-fluid-xl font-bold tracking-tight text-[hsl(var(--dc-navy))]">{children}</h1>
    ),
    h2: ({children}) => (
      <h2 className="text-fluid-lg font-semibold text-[hsl(var(--dc-navy))]">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="text-fluid-md font-semibold text-[hsl(var(--dc-navy))]">{children}</h3>
    ),
    h4: ({children}) => (
      <h4 className="text-fluid-sm font-semibold uppercase tracking-wide text-[hsl(var(--dc-text)/0.75)]">{children}</h4>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-[hsl(var(--dc-brand)/0.5)] pl-4 italic text-[hsl(var(--dc-text))]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({children, value}) => {
      const href = value?.href || '#'
      const isExternal = value?.isExternal ?? /^https?:/.test(href)
      return (
        <a
          href={href}
          className="text-[hsl(var(--dc-brand))] underline decoration-2 decoration-[hsl(var(--dc-brand)/0.4)] underline-offset-4 hover:decoration-[hsl(var(--dc-brand))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]"
          rel={isExternal ? 'noopener noreferrer' : undefined}
          target={isExternal ? '_blank' : undefined}
        >
          {children}
          {isExternal ? <span className="sr-only"> (opent in nieuw venster)</span> : null}
        </a>
      )
    },
  },
  list: {
    bullet: ({children}) => (
      <ul className="ml-6 list-disc space-y-2 text-[hsl(var(--dc-text))]">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="ml-6 list-decimal space-y-2 text-[hsl(var(--dc-text))]">{children}</ol>
    ),
  },
}

interface RichTextBlockProps {
  component: RichTextComponent
}

export default function RichTextBlock({component}: RichTextBlockProps) {
  const align = component.textAlign ?? 'left'
  const maxWidthClass = component.maxWidth ? maxWidthMap[component.maxWidth] : maxWidthMap.default

  return (
    <div
      className={[
        'w-full',
        maxWidthClass,
        'space-y-4',
        'text-[hsl(var(--dc-text))]',
        align === 'center' ? 'mx-auto text-center' : '',
        align === 'right' ? 'ml-auto text-right' : '',
        align === 'justify' ? 'mx-auto text-justify' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={component.ariaLabel}
    >
      <PortableText value={component.content} components={portableTextComponents} />
    </div>
  )
}

