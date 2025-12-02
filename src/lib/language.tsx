
'use client'

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { Lang, defaultLanguage, isSupportedLang, supportedLanguages } from './i18n'

const LanguageContext = createContext({
  lang: 'nl' as Lang,
  // typed noop to avoid unused-var warnings
  setLang: (() => {}) as (l: Lang) => void,
})

export function LanguageProvider({ children, initialLang }: { children: React.ReactNode; initialLang?: Lang }) {
  const router = useRouter()
  const pathname = usePathname()
  // Start as null to avoid SSR hydration mismatch / flicker. Populate on first client render.
  const [lang, setLangState] = useState<Lang | null>(initialLang ?? null)

  const updateDocumentLang = useCallback((nextLang: Lang) => {
    if (typeof document === 'undefined') return
    document.documentElement.lang = nextLang
    document.documentElement.setAttribute('data-lang', nextLang)
  }, [])

  useEffect(() => {
    // Client-only initialization: prefer stored setting, fall back to navigator.
    try {
      const stored = localStorage.getItem('dc_lang')
      if (stored === 'nl' || stored === 'en') {
        setLangState(stored)
        updateDocumentLang(stored)
        return
      }
    } catch {
      // ignore
    }
    if (initialLang && isSupportedLang(initialLang)) {
      setLangState(initialLang)
      updateDocumentLang(initialLang)
      return
    }

    if (typeof navigator !== 'undefined') {
      const n = navigator.language?.toLowerCase()
      if (n?.startsWith('nl')) setLangState('nl')
      else setLangState('en')
    } else {
      setLangState('nl')
    }
  }, [initialLang, updateDocumentLang])

  useEffect(() => {
    if (lang == null) return
    try { localStorage.setItem('dc_lang', lang) } catch {}
    updateDocumentLang(lang)
  }, [lang, updateDocumentLang])

  const navigateWithLang = useCallback((nextLang: Lang) => {
    if (!pathname) return
    const segments = pathname.split('/').filter(Boolean)
    // Replace first segment when it is a supported language, otherwise prefix.
    if (segments.length > 0 && supportedLanguages.includes(segments[0] as Lang)) {
      segments[0] = nextLang
    } else {
      segments.unshift(nextLang)
    }
    const nextPath = '/' + segments.join('/')
    try {
      const result = router.push(nextPath || '/') as unknown
      if (result && typeof (result as Record<string, unknown>).then === 'function') {
        ;(result as Promise<unknown>).then(() => {
          try { router.refresh() } catch { /* best-effort refresh */ }
        }).catch(() => { /* ignore errors */ })
      } else {
        // If push is synchronous/void, call refresh on next tick to allow
        // the navigation to complete.
        setTimeout(() => {
          try { router.refresh() } catch { /* best-effort refresh */ }
        }, 0)
      }
    } catch (err) {
      // If router.push throws for any reason, fallback to a full reload.
      console.warn('[language] navigateWithLang push failed, falling back to hard navigation', err)
      try { window.location.href = nextPath } catch { /* ignore */ }
    }
  }, [pathname, router])

  // Expose a stable lang value to consumers to avoid making them handle null.
  const value = useMemo(
    () => ({
      lang: (lang ?? defaultLanguage) as Lang,
      setLang: (next: Lang) => {
        setLangState(next)
        updateDocumentLang(next)
        navigateWithLang(next)
      },
    }),
    [lang, navigateWithLang, updateDocumentLang]
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

