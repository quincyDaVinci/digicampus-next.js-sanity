"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { GlobeIcon, ChevronDownIcon } from '@/components/icons/FeatherIcons'

type Language = 'nl' | 'en'

type Props = {
    currentLang: Language
    onChangeLang: (lang: Language) => void
}

export default function LanguageDropdown({ currentLang, onChangeLang }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const languages = [
        { code: 'nl' as Language, label: 'Nederlands', short: 'NL' },
        { code: 'en' as Language, label: 'English', short: 'EN' },
    ]

    const currentLanguage = languages.find(lang => lang.code === currentLang)

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
                buttonRef.current?.focus()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen])

    const handleSelect = useCallback((lang: Language) => {
        onChangeLang(lang)
        setIsOpen(false)
        buttonRef.current?.focus()
    }, [onChangeLang])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label={`Current language: ${currentLanguage?.label}. Click to change language`}
                className={`
          inline-flex items-center gap-2 rounded-lg px-3 py-2
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]
          ${isOpen
                        ? 'bg-[hsl(var(--dc-brand)/0.1)] text-[hsl(var(--dc-brand))]'
                        : 'hover:bg-[hsl(var(--dc-brand)/0.05)] hover:text-[hsl(var(--dc-brand))]'
                    }
        `}
                style={{ minWidth: '44px', minHeight: '44px' }}
            >
                <GlobeIcon className="h-5 w-5" />
                <span className="text-sm font-medium">{currentLanguage?.short}</span>
                <ChevronDownIcon
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div
                    role="menu"
                    className={`
            absolute right-0 mt-2 min-w-[140px] rounded-xl overflow-hidden
            shadow-xl
            transform transition-all duration-200 origin-top-right
            ${isOpen
                            ? 'opacity-100 scale-100 visible'
                            : 'opacity-0 scale-95 invisible'
                        }
          `}
                    style={{
                        backgroundColor: 'hsl(var(--dc-surface))',
                        border: '1px solid hsl(var(--dc-border) / 0.2)',
                    }}
                >
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                role="menuitem"
                                onClick={() => handleSelect(lang.code)}
                                className={`
                  w-full text-left px-4 py-3 text-sm
                  transition-colors duration-150
                  ${lang.code === currentLang
                                        ? 'bg-[hsl(var(--dc-brand)/0.1)] text-[hsl(var(--dc-brand))] font-semibold'
                                        : 'hover:bg-[hsl(var(--dc-brand)/0.05)] hover:text-[hsl(var(--dc-brand))]'
                                    }
                `}
                                style={{ minHeight: '44px' }}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span>{lang.label}</span>
                                    <span className="text-xs opacity-60">{lang.short}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
