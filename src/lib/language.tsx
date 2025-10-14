'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Lang = 'nl' | 'en'

const LanguageContext = createContext({
  lang: 'nl' as Lang,
  setLang: (l: Lang) => {}
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('nl')

  useEffect(() => {
    // Init from localStorage or navigator
    const stored = typeof window !== 'undefined' ? localStorage.getItem('dc_lang') : null
    if (stored === 'nl' || stored === 'en') {
      setLang(stored)
    } else if (typeof navigator !== 'undefined') {
      const n = navigator.language?.toLowerCase()
      if (n?.startsWith('nl')) setLang('nl')
      else setLang('en')
    }
  }, [])

  useEffect(() => {
    try { localStorage.setItem('dc_lang', lang) } catch (e) {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'nl' ? 'nl' : 'en'
      document.documentElement.setAttribute('data-lang', lang)
    }
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
