"use client"

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@/components/icons/FeatherIcons'

type ColumnItem = { label: string; href: string }
type Menu = { label: string; items: ColumnItem[] }

type Props = {
  menus: Menu[]
  language?: string
}

export default function MegaMenu({ menus }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenIndex(null)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenIndex(null) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey) }
  }, [])

  return (
    <div className="col-start-1 row-start-2 flex items-end gap-4 flex-wrap sm:flex-nowrap" ref={navRef}>
      {menus.map((m, idx) => (
        <div key={m.label} className="relative">
          <button
            aria-expanded={openIndex === idx}
            aria-controls={`mega-${idx}`}
            onMouseEnter={() => setOpenIndex(idx)}
            onMouseLeave={() => setOpenIndex(null)}
            onFocus={() => setOpenIndex(idx)}
            onBlur={() => setOpenIndex(null)}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] whitespace-nowrap transition-colors hover:bg-[hsl(var(--dc-text)/0.06)]"
          >
            <span className="no-wrap text-fluid-md" aria-hidden>{m.label}</span>
            <ChevronDownIcon aria-hidden focusable="false" className={`h-4 w-4 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} />
          </button>

          <div
            id={`mega-${idx}`}
            role="menu"
            className={`absolute left-0 mt-2 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 ${openIndex === idx ? 'block' : 'hidden'}`}
            style={{ backgroundColor: 'hsl(var(--dc-surface) / 0.98)', border: '1px solid hsl(var(--dc-border) / 0.1)', color: 'hsl(var(--dc-text))' }}
          >
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-[20rem]">
              {m.items.map((it, i) => (
                <Link
                  key={i}
                  href={it.href}
                  role="menuitem"
                  onClick={() => setOpenIndex(null)}
                  className="block rounded-md px-3 py-2 text-fluid-sm hover:bg-[hsl(var(--dc-brand)/0.06)] transition-colors"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
