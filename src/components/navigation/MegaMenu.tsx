"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@/components/icons/FeatherIcons'

type ColumnItem = { label: string; href: string }
type Menu = { label: string; items: ColumnItem[] }

type Props = {
  menus: Menu[]
  language?: string
}

export default function MegaMenu({ menus, language }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0)
  const navRef = useRef<HTMLDivElement | null>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear close timeout
  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  // Close dropdown with optional delay
  const closeDropdown = useCallback((immediate = false) => {
    clearCloseTimeout()
    if (immediate) {
      setOpenIndex(null)
    } else {
      closeTimeoutRef.current = setTimeout(() => {
        setOpenIndex(null)
      }, 150)
    }
  }, [clearCloseTimeout])

  // Open dropdown
  const openDropdown = useCallback((index: number) => {
    clearCloseTimeout()
    setOpenIndex(index)
    setFocusedItemIndex(0)
  }, [clearCloseTimeout])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, triggerIndex: number, isInDropdown: boolean = false) => {
    const currentMenu = menus[openIndex ?? -1]
    const itemCount = currentMenu?.items.length ?? 0

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        closeDropdown(true)
        triggerRefs.current[triggerIndex]?.focus()
        break

      case 'ArrowDown':
        e.preventDefault()
        if (!isInDropdown && openIndex === null) {
          openDropdown(triggerIndex)
        } else if (isInDropdown) {
          const nextIndex = focusedItemIndex < itemCount - 1 ? focusedItemIndex + 1 : 0
          setFocusedItemIndex(nextIndex)
          itemRefs.current[nextIndex]?.focus()
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (isInDropdown) {
          const prevIndex = focusedItemIndex > 0 ? focusedItemIndex - 1 : itemCount - 1
          setFocusedItemIndex(prevIndex)
          itemRefs.current[prevIndex]?.focus()
        }
        break

      case 'ArrowRight':
        e.preventDefault()
        if (!isInDropdown) {
          const nextTrigger = triggerIndex < menus.length - 1 ? triggerIndex + 1 : 0
          triggerRefs.current[nextTrigger]?.focus()
          if (openIndex !== null) {
            openDropdown(nextTrigger)
          }
        }
        break

      case 'ArrowLeft':
        e.preventDefault()
        if (!isInDropdown) {
          const prevTrigger = triggerIndex > 0 ? triggerIndex - 1 : menus.length - 1
          triggerRefs.current[prevTrigger]?.focus()
          if (openIndex !== null) {
            openDropdown(prevTrigger)
          }
        }
        break

      case 'Home':
        if (isInDropdown) {
          e.preventDefault()
          setFocusedItemIndex(0)
          itemRefs.current[0]?.focus()
        }
        break

      case 'End':
        if (isInDropdown) {
          e.preventDefault()
          setFocusedItemIndex(itemCount - 1)
          itemRefs.current[itemCount - 1]?.focus()
        }
        break

      case 'Tab':
        // Allow Tab to work naturally but close dropdown
        if (isInDropdown) {
          closeDropdown(true)
        }
        break
    }
  }, [menus, openIndex, focusedItemIndex, closeDropdown, openDropdown])

  // Click outside to close
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        closeDropdown(true)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [closeDropdown])

  // Focus first item when dropdown opens
  useEffect(() => {
    if (openIndex !== null) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        itemRefs.current[0]?.focus()
      }, 50)
    }
  }, [openIndex])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearCloseTimeout()
  }, [clearCloseTimeout])

  return (
    <div className="col-start-1 row-start-2 flex items-end gap-4 flex-wrap sm:flex-nowrap" ref={navRef}>
      {menus.map((m, idx) => (
        <div key={m.label} className="relative">
          <button
            ref={(el) => (triggerRefs.current[idx] = el)}
            aria-expanded={openIndex === idx}
            aria-haspopup="true"
            aria-controls={`mega-${idx}`}
            aria-label={`${m.label} menu`}
            onMouseEnter={() => openDropdown(idx)}
            onMouseLeave={() => closeDropdown(false)}
            onClick={() => {
              if (openIndex === idx) {
                closeDropdown(true)
              } else {
                openDropdown(idx)
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, idx, false)}
            className={`
              inline-flex items-center gap-2 rounded-lg px-4 py-3 
              focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] 
              whitespace-nowrap transition-all duration-200
              hover:bg-[hsl(var(--dc-brand)/0.08)] hover:scale-105
              ${openIndex === idx ? 'bg-[hsl(var(--dc-brand)/0.12)] shadow-sm' : ''}
            `}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <span className="no-wrap text-fluid-md font-medium">{m.label}</span>
            <ChevronDownIcon
              aria-hidden
              focusable="false"
              className={`h-4 w-4 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            id={`mega-${idx}`}
            role="menu"
            aria-label={`${m.label} submenu`}
            onMouseEnter={clearCloseTimeout}
            onMouseLeave={() => closeDropdown(false)}
            className={`
              absolute left-0 mt-2 rounded-xl shadow-2xl backdrop-blur-sm
              transform transition-all duration-200 origin-top
              ${openIndex === idx
                ? 'opacity-100 scale-100 visible'
                : 'opacity-0 scale-95 invisible pointer-events-none'
              }
            `}
            style={{
              backgroundColor: 'hsl(var(--dc-surface) / 0.98)',
              border: '1px solid hsl(var(--dc-border) / 0.2)',
              color: 'hsl(var(--dc-text))'
            }}
          >
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-2 min-w-[20rem]">
              {m.items.map((it, i) => (
                <Link
                  key={i}
                  ref={(el) => {
                    if (openIndex === idx) {
                      itemRefs.current[i] = el
                    }
                  }}
                  href={it.href}
                  role="menuitem"
                  tabIndex={openIndex === idx ? 0 : -1}
                  onClick={() => closeDropdown(true)}
                  onKeyDown={(e) => handleKeyDown(e, idx, true)}
                  className={`
                    block rounded-lg px-4 py-3 text-fluid-sm 
                    transition-all duration-150
                    hover:bg-[hsl(var(--dc-brand)/0.1)] hover:translate-x-1
                    focus:bg-[hsl(var(--dc-brand)/0.1)] focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))]
                  `}
                  style={{ minHeight: '44px' }}
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
