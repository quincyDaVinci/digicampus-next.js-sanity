import Link from 'next/link'
import { Home } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items.length) return null

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {/* Home icon as first item */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/" asChild>
            <Link href="/">
              <Home className="size-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <span key={`${item.href ?? item.label}-${index}`} className="flex items-center gap-1.5">
              <BreadcrumbSeparator>•</BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}