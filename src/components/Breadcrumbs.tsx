import Link from 'next/link'

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({items, className}: BreadcrumbsProps) {
  if (!items.length) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-[hsl(var(--dc-text)/0.75)] ${className || ''}`.trim()}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.href ?? item.label}-${index}`} className="flex items-center gap-2">
              {isLast || !item.href ? (
                <span className="font-medium text-[hsl(var(--dc-text))]">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[hsl(var(--dc-brand))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))] rounded"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && <span aria-hidden="true" className="text-[hsl(var(--dc-border))]">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}