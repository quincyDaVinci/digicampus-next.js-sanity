
'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
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
  const [lang, setLang] = useState<Lang | null>(initialLang ?? null)

  useEffect(() => {
    // Client-only initialization: prefer stored setting, fall back to navigator.
    try {
      const stored = localStorage.getItem('dc_lang')
      if (stored === 'nl' || stored === 'en') {
        setLang(stored)
        return
      }
    } catch {
      // ignore
    }
    if (initialLang && isSupportedLang(initialLang)) {
      setLang(initialLang)
      return
    }

    if (typeof navigator !== 'undefined') {
      const n = navigator.language?.toLowerCase()
      if (n?.startsWith('nl')) setLang('nl')
      else setLang('en')
    } else {
      setLang('nl')
    }
  }, [])

  useEffect(() => {
    if (lang == null) return
    try { localStorage.setItem('dc_lang', lang) } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'nl' ? 'nl' : 'en'
      document.documentElement.setAttribute('data-lang', lang)
    }
  }, [lang])

  const navigateWithLang = (nextLang: Lang) => {
    if (!pathname) return
    const segments = pathname.split('/').filter(Boolean)
    // Replace first segment when it is a supported language, otherwise prefix.
    if (segments.length > 0 && supportedLanguages.includes(segments[0] as Lang)) {
      segments[0] = nextLang
    } else {
      segments.unshift(nextLang)
    }
    const nextPath = '/' + segments.join('/')
    // Navigate to the new path. `router.push` may or may not return a Promise
    // depending on Next.js version/runtime; handle both cases safely and
    // refresh server-rendered content after navigation to re-run server
    // components and `headers()` usage.
    try {
      const result = router.push(nextPath || '/')
      if (result && typeof (result as any).then === 'function') {
        ;(result as any).then(() => {
          try { router.refresh() } catch { /* best-effort refresh */ }
        })
      } else {
        // If push is synchronous/void, call refresh on next tick to allow
        // the navigation to complete.
        setTimeout(() => {
          try { router.refresh() } catch { /* best-effort refresh */ }
        }, 0)
      }
    } catch (err) {
      // If router.push throws for any reason, fallback to a full reload.
      try { window.location.href = nextPath } catch { /* ignore */ }
    }
  }

  // Expose a stable lang value to consumers to avoid making them handle null.
  const value = useMemo(
    () => ({
      lang: (lang ?? defaultLanguage) as Lang,
      setLang: (next: Lang) => {
        setLang(next)
        navigateWithLang(next)
      },
    }),
    [lang, pathname, router]
  )

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

