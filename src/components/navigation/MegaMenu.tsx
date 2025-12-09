"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@/components/icons/FeatherIcons'

type ColumnItem = { label: string; href: string }
type Menu = { label: string; items?: ColumnItem[]; href?: string }

type Props = {
  menus: Menu[]
  language?: string
  currentPath?: string
}

export default function MegaMenu({ menus, language, currentPath }: Props) {
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
    const itemCount = currentMenu?.items?.length ?? 0

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
    <div className="col-start-1 row-start-2 flex items-end gap-2 flex-wrap sm:flex-nowrap" ref={navRef}>
      {menus.map((m, idx) => {
        // Check menu configuration
        const hasDropdown = Boolean(m.items && m.items.length > 0)
        const isDirectLink = Boolean(m.href && !hasDropdown)

        // Check active states
        const hasActiveItem = currentPath && m.items?.some(item =>
          currentPath === item.href || currentPath?.startsWith(item.href + '/')
        )
        const isActive = isDirectLink && currentPath && (
          currentPath === m.href || currentPath?.startsWith(m.href + '/')
        )

        return (
          <div key={m.label} className="relative">
            {/* Direct link navigation item */}
            {isDirectLink && (
              <Link
                href={m.href || '#'}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5
                  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]
                  whitespace-nowrap transition-all duration-200
                  ${isActive
                    ? 'text-[hsl(var(--dc-brand))] font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-[hsl(var(--dc-brand))] after:rounded-full'
                    : 'hover:text-[hsl(var(--dc-brand))] hover:bg-[hsl(var(--dc-brand)/0.05)]'
                  }
                `}
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <span className="text-fluid-md font-medium">{m.label}</span>
              </Link>
            )}

            {/* Dropdown navigation item */}
            {hasDropdown && (
              <>
                <button
                  ref={(el) => { triggerRefs.current[idx] = el }}
                  aria-expanded={openIndex === idx}
                  aria-haspopup="true"
                  aria-controls={`mega-${idx}`}
                  aria-label={`${m.label} menu`}
                  aria-current={hasActiveItem ? 'true' : undefined}
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
                    relative inline-flex items-center gap-2 rounded-lg px-4 py-2.5
                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]
                    whitespace-nowrap transition-all duration-200
                    ${hasActiveItem
                      ? 'text-[hsl(var(--dc-brand))] font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3/4 after:h-0.5 after:bg-[hsl(var(--dc-brand))] after:rounded-full'
                      : openIndex === idx
                        ? 'text-[hsl(var(--dc-brand))] bg-[hsl(var(--dc-brand)/0.1)]'
                        : 'hover:text-[hsl(var(--dc-brand))] hover:bg-[hsl(var(--dc-brand)/0.05)]'
                    }
                  `}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <span className="text-fluid-md font-medium">{m.label}</span>
                  <ChevronDownIcon
                    aria-hidden
                    focusable="false"
                    className={`h-4 w-4 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  id={`mega-${idx}`}
                  role="menu"
                  aria-label={`${m.label} submenu`}
                  onMouseEnter={clearCloseTimeout}
                  onMouseLeave={() => closeDropdown(false)}
                  className={`
                    absolute left-0 mt-2 min-w-[240px] rounded-xl overflow-hidden
                    shadow-xl
                    transform transition-all duration-200 origin-top
                    ${openIndex === idx
                      ? 'opacity-100 scale-100 visible translate-y-0'
                      : 'opacity-0 scale-95 invisible pointer-events-none -translate-y-1'
                    }
                  `}
                  style={{
                    backgroundColor: 'hsl(var(--dc-surface))',
                    border: '1px solid hsl(var(--dc-border) / 0.2)',
                  }}
                >
                  <div className="py-2">
                    {m.items?.map((it, i) => {
                      const hasHref = Boolean(it.href)
                      const isItemActive = currentPath && (currentPath === it.href || currentPath?.startsWith(it.href + '/'))

                      return (
                        <Link
                          key={i}
                          ref={(el) => {
                            if (openIndex === idx) {
                              itemRefs.current[i] = el
                            }
                          }}
                          href={it.href || '#'}
                          role="menuitem"
                          tabIndex={openIndex === idx ? 0 : -1}
                          onClick={(e) => {
                            if (!hasHref) {
                              e.preventDefault()
                              return
                            }
                            closeDropdown(true)
                          }}
                          onKeyDown={(e) => handleKeyDown(e, idx, true)}
                          aria-disabled={!hasHref}
                          aria-current={isItemActive ? 'page' : undefined}
                          className={`
                            group/link relative block px-4 py-3 text-sm
                            transition-all duration-200 ease-out
                            ${isItemActive
                              ? 'bg-[hsl(var(--dc-brand)/0.12)] text-[hsl(var(--dc-brand))] font-semibold border-l-2 border-[hsl(var(--dc-brand))]'
                              : hasHref
                                ? 'hover:bg-gradient-to-r hover:from-[hsl(var(--dc-brand)/0.08)] hover:to-transparent hover:text-[hsl(var(--dc-brand))] hover:translate-x-1 cursor-pointer'
                                : 'opacity-50 cursor-not-allowed'
                            }
                            focus:outline-none focus-visible:bg-[hsl(var(--dc-brand)/0.08)] focus-visible:translate-x-1
                          `}
                          style={{ minHeight: '44px' }}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              {hasHref && (
                                <div className="w-1 h-1 rounded-full bg-[hsl(var(--dc-brand))] opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                              )}
                              <span className={`${hasHref ? 'font-medium group-hover/link:font-semibold transition-all' : 'italic text-[hsl(var(--dc-text)/0.6)]'}`}>
                                {it.label}
                              </span>
                            </div>
                            {!hasHref && (
                              <span className="text-xs px-2 py-0.5 rounded bg-[hsl(var(--dc-text)/0.08)] text-[hsl(var(--dc-text)/0.5)]">
                                Binnenkort
                              </span>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
