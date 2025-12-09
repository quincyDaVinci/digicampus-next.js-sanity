"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from '@/components/icons/FeatherIcons'
import MegaMenu from './navigation/MegaMenu'
import LanguageDropdown from './navigation/LanguageDropdown'
import { useLanguage } from "@/lib/language"

import { client } from '@sanity/lib/client'
import { siteSettingsQuery, navigationByLangQuery, devSettingsQuery } from '@sanity/lib/queries/site'
import {
  buildFallbackMenus,
  extractCtasFromSiteSettings,
  extractLogoFromSiteSettings,
  extractMenusFromSiteSettings,
  type CTA,
  type Menu,
  type SiteSettings,
} from './headerData'

type Logo = { url: string; alt: string; width?: number; height?: number }

type HeaderProps = {
  menus: Menu[]
  logo?: Logo | null
  ctas?: CTA[]
}

export default function Header({ menus, logo, ctas = [] }: HeaderProps): React.ReactElement {
  const { lang: language, setLang: setLanguage } = useLanguage()
  const pathname = usePathname()
  const [liveMessage, setLiveMessage] = useState('')
  const firstLangRender = useRef(true)
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET,
  )
  const [menuData, setMenuData] = useState<Menu[]>(menus)
  const [logoData, setLogoData] = useState<Logo | null>(logo ?? null)
  const [ctaData, setCtaData] = useState<CTA[]>(ctas ?? [])
  const [scrolled, setScrolled] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null)
  const homeHref = `/${language}`
  const searchAction = `/${language || 'nl'}/search`
  const searchLabel = language === 'nl' ? 'Zoeken' : 'Search'

  // Keep menus/logo/ctas in sync with language switches
  useEffect(() => {
    let ignore = false

    const loadMenus = async () => {
      if (!language) return

      if (!hasSanityCredentials) {
        if (!ignore) {
          setMenuData([])
          setLogoData(logo ?? null)
          setCtaData(ctas ?? [])
        }
        return
      }

      try {
        // Fetch dev settings
        const devSettings = await client.fetch<{ showIncompleteNavItems?: boolean } | null>(devSettingsQuery)
        const showIncompleteNavItems = devSettings?.showIncompleteNavItems ?? false

        // Fetch site settings for logo and CTAs
        const siteData = await client.fetch<SiteSettings | null>(siteSettingsQuery, { lang: language })
        if (ignore) return

        // Extract logo and CTAs from site settings
        setLogoData(extractLogoFromSiteSettings(siteData))
        setCtaData(extractCtasFromSiteSettings(siteData))

        // Fetch navigation directly
        const navData = await client.fetch(navigationByLangQuery, { lang: language })
        if (navData?.items && navData.items.length > 0) {
          const transformedMenus = navData.items.map((item: any) => {
            // Extract href from top-level menu item
            const topLevelHref = item.href || null

            return {
              label: item.label || '',
              href: topLevelHref, // Top-level link
              items: (item.links || [])
                .filter((link: any) => {
                  // If showIncompleteNavItems is true, only require label
                  // Otherwise, require both label and href
                  if (showIncompleteNavItems) {
                    return link.label
                  }
                  return link.href && link.label
                })
                .map((link: any) => {
                  const translation = link.translations?.find((t: any) => t.language === language)
                  return {
                    label: translation?.label || link.label,
                    href: link.href || '#'  // Ensure href is always a string
                  }
                })
            }
          })

          setMenuData(transformedMenus.length > 0 ? transformedMenus : [])
        } else {
          setMenuData([])
        }
      } catch (err) {
        console.error('Could not fetch site settings:', err)
        if (!ignore) {
          setMenuData([])
          setLogoData(logo ?? null)
          setCtaData(ctas ?? [])
        }
      }
    }

    loadMenus()

    return () => {
      ignore = true
    }
  }, [language, hasSanityCredentials, ctas, logo, menus])

  // Persist dark mode
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dc_dark")
      setDark(stored === "true")
    } catch { }
  }, [])
  useEffect(() => {
    try { localStorage.setItem("dc_dark", dark ? "true" : "false") } catch { }
    if (typeof document !== "undefined") document.body.classList.toggle("dark", dark)
  }, [dark])

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close menus on outside click / escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileOpen) {
          setMobileOpen(false)
          setLiveMessage(language === 'nl' ? 'Menu gesloten' : 'Menu closed')
          setTimeout(() => setLiveMessage(''), 2000)
          // Return focus to menu button
          mobileMenuButtonRef.current?.focus()
        }
        setOpenIndex(null)
      }
    }
    const onClick = (e: MouseEvent) => { if (!navRef.current?.contains(e.target as Node)) setOpenIndex(null) }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick) }
  }, [mobileOpen, language])

  // Keep focusable order logical when menu opens and trap focus
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
      // Announce menu opened
      setLiveMessage(language === 'nl' ? 'Menu geopend' : 'Menu opened')
      setTimeout(() => setLiveMessage(''), 2000)

      // Focus first interactive element in mobile menu
      setTimeout(() => {
        const firstFocusable = mobileMenuRef.current?.querySelector(
          'a, button, input, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement
        firstFocusable?.focus()
      }, 100)
    } else {
      document.body.style.overflow = ""
    }
  }, [mobileOpen, language])

  // Language change handler (also updates provider)
  const changeLanguage = (l: "nl" | "en") => {
    setLanguage(l)
  }

  // announce language changes politely but skip the initial set to avoid spurious announcement
  useEffect(() => {
    if (firstLangRender.current) {
      firstLangRender.current = false
      return
    }
    setLiveMessage(language === 'nl' ? 'Nederlands geselecteerd' : 'English selected')
    const t = setTimeout(() => setLiveMessage(''), 2000)
    return () => clearTimeout(t)
  }, [language])

  return (
    <header ref={navRef} role="banner"
      className={["sticky top-0 z-50 transition-all duration-300 motion-reduce:transition-none", scrolled ? "backdrop-blur shadow-lg" : "bg-transparent"].join(" ")}
      style={scrolled ? { backgroundColor: 'hsl(var(--dc-bg) / 0.3)' } : undefined}
    >
      {/* polite live region for language changes (screen-reader only) */}
      <div aria-live="polite" className="sr-only" role="status">{liveMessage}</div>
      <nav aria-label={language === 'nl' ? 'Hoofdnavigatie' : 'Main navigation'} className={["mx-auto max-w-7xl px-4 sm:px-6", scrolled ? "py-2" : "py-4"].join(" ")}>
        {/* Desktop grid: 2x2 */}
        <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4 items-start w-full" style={{ minHeight: "8rem" }}>
          {/* Top-left: Logo */}
          <div className="col-start-1 row-start-1 flex items-start min-w-0">
            <Link href={homeHref} className="flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] rounded-lg transition-opacity hover:opacity-80">
              <span className="sr-only">Digicampus homepage</span>
              {logoData ? (
                <Image
                  src={logoData.url}
                  alt={logoData.alt}
                  width={logoData.width || 320}
                  height={logoData.height || 80}
                  className={[scrolled ? "h-12" : "h-16", "w-auto drop-shadow max-w-[60vw] sm:max-w-[320px]"].join(" ")}
                  style={{ maxWidth: "320px" }}
                />
              ) : (
                <Image
                  src={dark ? "/assets/images/logo-digicampus-dark.svg" : "/assets/images/logo-digicampus-light.svg"}
                  alt="Digicampus logo"
                  width={320}
                  height={80}
                  className={[scrolled ? "h-12" : "h-16", "w-auto drop-shadow max-w-[60vw] sm:max-w-[320px]"].join(" ")}
                  style={{ maxWidth: "320px" }}
                />
              )}
            </Link>
          </div>

          {/* Top-right: Dark mode, language, search */}
          <div className="col-start-2 row-start-1 flex items-center gap-3 justify-end min-w-0">
            <button
              aria-pressed={dark}
              aria-label={dark ? "Schakel lichtmodus in" : "Schakel donker modus in"}
              onClick={() => {
                setDark(d => !d)
                setLiveMessage(dark ? (language === 'nl' ? 'Lichtmodus actief' : 'Light mode active') : (language === 'nl' ? 'Donkere modus actief' : 'Dark mode active'))
                setTimeout(() => setLiveMessage(''), 2000)
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--dc-border)/0.2)] text-[hsl(var(--dc-text))] transition hover:bg-[hsl(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]"
            >
              {dark ? <MoonIcon aria-hidden focusable="false" /> : <SunIcon aria-hidden focusable="false" />}
              <span className="sr-only">{dark ? (language === 'nl' ? 'Donkere modus actief' : 'Dark mode active') : (language === 'nl' ? 'Lichtmodus actief' : 'Light mode active')}</span>
            </button>

            <LanguageDropdown currentLang={language} onChangeLang={changeLanguage} />

            <form role="search" className="relative min-w-0" action={searchAction} method="get">
              <label htmlFor="q" className="sr-only">{searchLabel}</label>
              <input id="q" name="q" type="search" placeholder={searchLabel} className="w-28 sm:w-44 rounded-full outline-none px-4 py-2 pr-24 min-w-0 text-fluid-sm" style={{ backgroundColor: 'hsl(var(--dc-text) / 0.06)', color: 'hsl(var(--dc-text))', border: '1px solid hsl(var(--dc-border) / 0.2)' }} onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 4px hsl(var(--dc-focus))`; }} onBlur={(e) => { e.currentTarget.style.boxShadow = ''; }} />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full px-4 py-1 text-fluid-sm text-[hsl(var(--dc-text))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-colors hover:bg-[hsl(var(--dc-text)/0.08)]"
                style={{ backgroundColor: 'hsl(var(--dc-text) / 0.06)', border: '1px solid hsl(var(--dc-border) / 0.2)' }}
              >
                <SearchIcon aria-hidden focusable="false" />
                <span className="sr-only">{searchLabel}</span>
              </button>
            </form>
          </div>

          {/* Bottom-left: menus (replaced by accessible MegaMenu) */}
          <MegaMenu menus={menuData} language={language} currentPath={pathname} />

          {/* Bottom-right: Contact CTA */}
          <div className="col-start-2 row-start-2 flex items-end justify-end gap-2">
            {ctaData.length > 0 ? (
              ctaData.map((cta, idx) => (
                <Link
                  key={idx}
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-all hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: 'hsl(var(--dc-brand))', color: 'hsl(var(--dc-on-primary))', border: '1px solid hsl(var(--dc-border)/0.2)' }}
                >
                  <span>{cta.label}</span>
                  <ArrowRightIcon aria-hidden focusable="false" />
                </Link>
              ))
            ) : (
              <Link
                href={`/${language}/contact`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-all hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: 'hsl(var(--dc-brand))', color: 'hsl(var(--dc-on-primary))', border: '1px solid hsl(var(--dc-border)/0.2)' }}
              >
                <span>Contact</span>
                <ArrowRightIcon aria-hidden focusable="false" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile top row with hamburger on left and controls on right */}
        <div className="md:hidden flex items-center justify-between">
          <button
            ref={mobileMenuButtonRef}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(v => !v)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--dc-border)/0.2)] text-[hsl(var(--dc-text))] transition hover:bg-[hsl(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]"
            aria-label={mobileOpen ? (language === 'nl' ? 'Sluit menu' : 'Close menu') : (language === 'nl' ? 'Open menu' : 'Open menu')}
          >
            {mobileOpen ? <CloseIcon aria-hidden focusable="false" /> : <MenuIcon aria-hidden focusable="false" />}
          </button>

          <Link href={homeHref} className="flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] rounded-lg transition-opacity hover:opacity-80">
            {logoData ? (
              <Image src={logoData.url} alt={logoData.alt} width={logoData.width || 160} height={logoData.height || 40} className="h-10 w-auto drop-shadow" style={{ maxWidth: "40vw" }} />
            ) : (
              <Image src="/assets/images/logo-digicampus.svg" alt="Digicampus logo" width={160} height={40} className="h-10 w-auto drop-shadow" style={{ maxWidth: "40vw" }} />
            )}
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setDark(d => !d)
                setLiveMessage(dark ? (language === 'nl' ? 'Lichtmodus actief' : 'Light mode active') : (language === 'nl' ? 'Donkere modus actief' : 'Dark mode active'))
                setTimeout(() => setLiveMessage(''), 2000)
              }}
              aria-pressed={dark}
              aria-label={dark ? (language === 'nl' ? 'Schakel lichtmodus in' : 'Switch to light mode') : (language === 'nl' ? 'Schakel donker modus in' : 'Switch to dark mode')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--dc-border)/0.2)] text-[hsl(var(--dc-text))] transition hover:bg-[hsl(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]"
            >
              {dark ? <MoonIcon aria-hidden focusable="false" /> : <SunIcon aria-hidden focusable="false" />}
              <span className="sr-only">{dark ? (language === 'nl' ? 'Donkere modus actief' : 'Dark mode active') : (language === 'nl' ? 'Lichtmodus actief' : 'Light mode active')}</span>
            </button>
            <div className="flex items-center gap-1">
              <button onClick={() => changeLanguage("nl")} aria-pressed={language === "nl"} className={["px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm transition-colors", language === "nl" ? "" : "hover:bg-[hsl(var(--dc-text)/0.06)]"].join(" ")} style={language === "nl" ? { backgroundColor: 'hsl(var(--dc-brand))', color: 'hsl(var(--dc-on-primary))' } : { border: '1px solid hsl(var(--dc-border)/0.18)', color: 'hsl(var(--dc-text))' }}>NL</button>
              <button onClick={() => changeLanguage("en")} aria-pressed={language === "en"} className={["px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm transition-colors", language === "en" ? "" : "hover:bg-[hsl(var(--dc-text)/0.06)]"].join(" ")} style={language === "en" ? { backgroundColor: 'hsl(var(--dc-brand))', color: 'hsl(var(--dc-on-primary))' } : { border: '1px solid hsl(var(--dc-border)/0.18)', color: 'hsl(var(--dc-text))' }}>EN</button>
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="navigation"
          aria-label={language === 'nl' ? 'Mobiel menu' : 'Mobile menu'}
          className={["md:hidden transition-all duration-300 overflow-hidden motion-reduce:transition-none", mobileOpen ? "max-h-[80vh] mt-3" : "max-h-0"].join(" ")}
        >
          <div className="rounded-2xl p-3 backdrop-blur" style={{ border: '1px solid hsl(var(--dc-border)/0.1)', backgroundColor: 'hsl(var(--dc-surface)/0.9)', color: 'hsl(var(--dc-text))' }}>
            <ul className="space-y-2">
              {menuData.map(m => (
                <li key={m.label}>
                  <details className="group">
                    <summary className="cursor-pointer list-none rounded-lg px-3 py-2 transition-colors hover:bg-[hsl(var(--dc-text)/0.06)]" style={{ color: 'hsl(var(--dc-text))' }}>{m.label}</summary>
                    <ul className="mt-1 ml-2 space-y-1">
                      {m.items.map((it, idx) => (
                        <li key={`${m.label}-mobile-${idx}`}><Link href={it.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-fluid-sm transition-colors hover:bg-[hsl(var(--dc-text)/0.06)]" style={{ color: 'hsl(var(--dc-text))' }}>{it.label}</Link></li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <button onClick={() => changeLanguage("nl")} aria-pressed={language === "nl"} className={["px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm transition-colors", language === "nl" ? "bg-[--color-brand] text-black" : "border border-white/30 text-white/90 hover:bg-white/10"].join(" ")}>NL</button>
              <button onClick={() => changeLanguage("en")} aria-pressed={language === "en"} className={["px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm transition-colors", language === "en" ? "bg-[--color-brand] text-black" : "border border-white/30 text-white/90 hover:bg-white/10"].join(" ")}>EN</button>
              {ctaData.length > 0 ? (
                ctaData.map((cta, idx) => (
                  <Link
                    key={idx}
                    href={cta.href}
                    className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-all hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: 'hsl(var(--dc-brand))', color: 'hsl(var(--dc-on-primary))', border: '1px solid hsl(var(--dc-border)/0.2)' }}
                  >
                    <span>{cta.label}</span>
                    <ArrowRightIcon aria-hidden focusable="false" />
                  </Link>
                ))
              ) : (
                <Link
                  href={`/${language}/contact`}
                  className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-all hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: 'hsl(var(--dc-brand))', color: 'hsl(var(--dc-on-primary))', border: '1px solid hsl(var(--dc-border)/0.2)' }}
                >
                  <span>Contact</span>
                  <ArrowRightIcon aria-hidden focusable="false" />
                </Link>
              )}
            </div>

            <form role="search" className="mt-3 flex gap-2" action={searchAction} method="get">
              <label htmlFor="q-m" className="sr-only">{searchLabel}</label>
              <input id="q-m" name="q" type="search" placeholder={searchLabel} className="w-full rounded-full bg-white/10 text-white placeholder-white/70 outline-none px-4 py-2 border border-white/20 focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] text-fluid-sm" />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]"
                style={{ backgroundColor: 'hsl(var(--dc-brand))', border: '1px solid hsl(var(--dc-border)/0.2)' }}
              >
                <SearchIcon aria-hidden focusable="false" />
                <span className="sr-only">{searchLabel}</span>
                <span aria-hidden>{language === 'nl' ? 'Zoek' : 'Search'}</span>
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}

