'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Lang = 'nl' | 'en'

const LanguageContext = createContext({
  lang: 'nl' as Lang,
  // typed noop to avoid unused-var warnings
  setLang: (() => {}) as (l: Lang) => void,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start as null to avoid SSR hydration mismatch / flicker. Populate on first client render.
  const [lang, setLang] = useState<Lang | null>(null)

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

  // Expose a stable lang value to consumers to avoid making them handle null.
  return (
    <LanguageContext.Provider value={{ lang: (lang ?? 'nl') as Lang, setLang }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

