"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from 'next/image'
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from '@/components/icons/FeatherIcons'
import { HybridLinkButton } from '@/components/ui/HybridComponents'
import { useLanguage } from "@/lib/language"

type Item = { label: string; href: string }
type Menu = { label: string; items: Item[] }

const MENUS: Menu[] = [
  { label: "Missies", items: [{ label: "Overzicht", href: "/missies" }, { label: "Publieke waarde", href: "/missies/waarde" }] },
  { label: "Wat we doen", items: [{ label: "Projecten", href: "/projecten" }, { label: "Kennis", href: "/kennis" }] },
  { label: "Hoe werken wij?", items: [{ label: "Aanpak", href: "/aanpak" }, { label: "Samenwerken", href: "/samenwerken" }] },
  { label: "Wie we zijn", items: [{ label: "Team", href: "/team" }, { label: "Partners", href: "/partners" }] },
]

export default function Header(): React.ReactElement {
  const { lang: language, setLang: setLanguage } = useLanguage()
  const [liveMessage, setLiveMessage] = useState('')
  const firstLangRender = useRef(true)
  const [scrolled, setScrolled] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)

  // Persist dark mode
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dc_dark")
      setDark(stored === "true")
    } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem("dc_dark", dark ? "true" : "false") } catch {}
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
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpenIndex(null); setMobileOpen(false) } }
    const onClick = (e: MouseEvent) => { if (!navRef.current?.contains(e.target as Node)) setOpenIndex(null) }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick) }
  }, [])

  // Keep focusable order logical when menu opens
  useEffect(() => { if (mobileOpen) document.body.style.overflow = "hidden"; else document.body.style.overflow = "" }, [mobileOpen])

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
      style={scrolled ? { backgroundColor: 'rgb(var(--dc-bg) / 0.3)' } : undefined}
    >
      {/* polite live region for language changes (screen-reader only) */}
      <div aria-live="polite" className="sr-only" role="status">{liveMessage}</div>
      <nav aria-label="Hoofd" className={["mx-auto max-w-7xl px-4 sm:px-6", scrolled ? "py-2" : "py-4"].join(" ")}> 
        {/* Desktop grid: 2x2 */}
        <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4 items-start w-full" style={{ minHeight: "8rem" }}>
          {/* Top-left: Logo */}
          <div className="col-start-1 row-start-1 flex items-start min-w-0">
            <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 rounded-lg">
              <span className="sr-only">Digicampus homepage</span>
              <Image
                src={dark ? "/assets/images/logo-digicampus-dark.svg" : "/assets/images/logo-digicampus-light.svg"}
                alt="Digicampus logo"
                width={320}
                height={80}
                className={[scrolled ? "h-12" : "h-16", "w-auto drop-shadow max-w-[60vw] sm:max-w-[320px]"].join(" ")}
                style={{ maxWidth: "320px" }}
              />
            </Link>
          </div>

          {/* Top-right: Dark mode, language, search */}
          <div className="col-start-2 row-start-1 flex items-center gap-3 justify-end min-w-0">
            <button
              aria-pressed={dark}
              aria-label={dark ? "Schakel lichtmodus in" : "Schakel donker modus in"}
              onClick={() => setDark(d => !d)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--dc-border)/0.2)] text-[rgb(var(--dc-text))] transition hover:bg-[rgb(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.25)]"
            >
              {dark ? <MoonIcon aria-hidden focusable="false" /> : <SunIcon aria-hidden focusable="false" />}
            </button>

            <div role="group" aria-label="Taal switch" className="flex items-center gap-0">
              <button type="button" onClick={() => changeLanguage("nl")} aria-pressed={language === "nl"} aria-label="Schakel naar Nederlands" className={["px-3 py-1 focus-visible:outline-none transition-colors text-fluid-sm", language === "nl" ? "font-bold" : ""].join(" ")} style={language === "nl" ? { backgroundColor: 'rgb(var(--dc-brand))', color: 'rgb(var(--dc-on-primary))' } : { backgroundColor: 'transparent', color: 'rgb(var(--dc-text) / 0.8)' }}>NL {language === "nl" && <span className="sr-only">(actief)</span>}</button>
              <span aria-hidden className="w-px h-5 mx-2 divider-dc" />
              <button type="button" onClick={() => changeLanguage("en")} aria-pressed={language === "en"} aria-label="Switch to English" className={["px-3 py-1 focus-visible:outline-none transition-colors text-fluid-sm", language === "en" ? "font-bold" : ""].join(" ")} style={language === "en" ? { backgroundColor: 'rgb(var(--dc-brand))', color: 'rgb(var(--dc-on-primary))' } : { backgroundColor: 'transparent', color: 'rgb(var(--dc-text) / 0.8)' }}>EN {language === "en" && <span className="sr-only">(active)</span>}</button>
            </div>

              <form role="search" className="relative min-w-0">
              <label htmlFor="q" className="sr-only">Zoeken</label>
              <input id="q" name="q" type="search" placeholder="Search" className="w-28 sm:w-44 rounded-full outline-none px-4 py-2 pr-9 min-w-0 text-fluid-sm" style={{ backgroundColor: 'rgb(var(--dc-text) / 0.06)', color: 'rgb(var(--dc-text))', border: '1px solid rgb(var(--dc-border) / 0.2)' }} onFocus={(e)=> { e.currentTarget.style.boxShadow = `0 0 0 4px rgb(var(--dc-focus) / 0.12)`; }} onBlur={(e)=> { e.currentTarget.style.boxShadow = ''; }} />
              <span aria-hidden className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--dc-text)/0.75)]">
                <SearchIcon aria-hidden focusable="false" />
              </span>
            </form>
          </div>

          {/* Bottom-left: menus */}
          <div className="col-start-1 row-start-2 flex items-end gap-4 flex-wrap sm:flex-nowrap">
            {MENUS.map(m => (
              <div key={m.label} className="relative">
                <button aria-expanded={openIndex === MENUS.indexOf(m)} aria-controls={`menu-${MENUS.indexOf(m)}`} onClick={() => setOpenIndex(openIndex === MENUS.indexOf(m) ? null : MENUS.indexOf(m))} className="inline-flex items-center gap-2 rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 whitespace-nowrap dc-tooltip" aria-label={m.label} title={m.label}>
                  <span className="no-wrap text-fluid-md" aria-hidden>{m.label}</span>
                  <ChevronDownIcon aria-hidden focusable="false" className="h-4 w-4" />
                </button>

                <div id={`menu-${MENUS.indexOf(m)}`} role="menu" aria-label={m.label} className={["absolute left-0 mt-2 min-w-48 rounded-xl shadow-xl transition-opacity duration-150 motion-reduce:transition-none", openIndex === MENUS.indexOf(m) ? "opacity-100" : "opacity-0 pointer-events-none"].join(" ")} style={{ backgroundColor: 'rgb(var(--dc-surface) / 0.98)', border: '1px solid rgb(var(--dc-border) / 0.1)', color: 'rgb(var(--dc-text))' }}>
                  <ul className="py-2">
                      {m.items.map(it => (
                      <li key={it.href}><Link href={it.href} role="menuitem" onClick={() => setOpenIndex(null)} className="block px-4 py-2 rounded-lg whitespace-nowrap text-fluid-sm" style={{ color: 'rgb(var(--dc-text))' }}>{it.label}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom-right: Contact CTA */}
          <div className="col-start-2 row-start-2 flex items-end justify-end">
            <HybridLinkButton href="/contact" variant="primary" icon={<ArrowRightIcon aria-hidden focusable="false" />} className="font-semibold">
              Contact
            </HybridLinkButton>
          </div>
        </div>

        {/* Mobile top row with hamburger on left and controls on right */}
        <div className="md:hidden flex items-center justify-between">
          <button
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(v => !v)}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(var(--dc-border)/0.2)] text-[rgb(var(--dc-text))] transition hover:bg-[rgb(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.25)]"
            aria-label={mobileOpen ? "Sluit menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon aria-hidden focusable="false" /> : <MenuIcon aria-hidden focusable="false" />}
            <span className="sr-only">Menu</span>
          </button>

            <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 rounded-lg">
            <Image src="/assets/images/logo-digicampus.svg" alt="Digicampus logo" width={160} height={40} className="h-10 w-auto drop-shadow" style={{ maxWidth: "40vw" }} />
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(d => !d)}
              aria-pressed={dark}
              aria-label={dark ? "Schakel lichtmodus in" : "Schakel donker modus in"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--dc-border)/0.2)] text-[rgb(var(--dc-text))] transition hover:bg-[rgb(var(--dc-text)/0.06)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.25)]"
            >
              {dark ? <MoonIcon aria-hidden focusable="false" /> : <SunIcon aria-hidden focusable="false" />}
            </button>
            <div className="flex items-center gap-1">
              <button onClick={() => changeLanguage("nl")} aria-pressed={language === "nl"} className={["px-2 py-1 rounded-lg font-semibold focus-visible:outline-none text-fluid-sm", language === "nl" ? "" : ""].join(" ")} style={language === "nl" ? { backgroundColor: 'rgb(var(--dc-brand))', color: 'rgb(var(--dc-on-primary))' } : { border: '1px solid rgb(var(--dc-border)/0.18)', color: 'rgb(var(--dc-text))' }}>NL</button>
              <button onClick={() => changeLanguage("en")} aria-pressed={language === "en"} className={["px-2 py-1 rounded-lg font-semibold focus-visible:outline-none text-fluid-sm", language === "en" ? "" : ""].join(" ")} style={language === "en" ? { backgroundColor: 'rgb(var(--dc-brand))', color: 'rgb(var(--dc-on-primary))' } : { border: '1px solid rgb(var(--dc-border)/0.18)', color: 'rgb(var(--dc-text))' }}>EN</button>
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        <div id="mobile-menu" className={["md:hidden transition-all duration-300 overflow-hidden motion-reduce:transition-none", mobileOpen ? "max-h-[80vh] mt-3" : "max-h-0"].join(" ")}>
          <div className="rounded-2xl p-3 backdrop-blur" style={{ border: '1px solid rgb(var(--dc-border)/0.1)', backgroundColor: 'rgb(var(--dc-surface)/0.9)', color: 'rgb(var(--dc-text))' }}>
            <ul className="space-y-2">
              {MENUS.map(m => (
                <li key={m.label}>
                  <details className="group">
                    <summary className="cursor-pointer list-none rounded-lg px-3 py-2 dc-tooltip" aria-label={m.label} title={m.label} style={{ color: 'rgb(var(--dc-text))' }}>{m.label}</summary>
                    <ul className="mt-1 ml-2 space-y-1">
                      {m.items.map(it => (
                        <li key={it.href}><Link href={it.href} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 text-fluid-sm" style={{ color: 'rgb(var(--dc-text))' }}>{it.label}</Link></li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center gap-2">
              <button onClick={() => changeLanguage("nl")} aria-pressed={language === "nl"} className={["px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 text-fluid-sm", language === "nl" ? "bg-[--color-brand] text-black" : "border border-white/30 text-white/90"].join(" ")}>NL</button>
              <button onClick={() => changeLanguage("en")} aria-pressed={language === "en"} className={["px-2 py-1 rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-300 text-fluid-sm", language === "en" ? "bg-[--color-brand] text-black" : "border border-white/30 text-white/90"].join(" ")}>EN</button>
              <HybridLinkButton href="/contact" variant="primary" icon={<ArrowRightIcon aria-hidden focusable="false" />} className="ml-auto">
                Contact
              </HybridLinkButton>
            </div>

            <form role="search" className="mt-3">
              <label htmlFor="q-m" className="sr-only">Zoeken</label>
              <input id="q-m" name="q" type="search" placeholder="Search" className="w-full rounded-full bg-white/10 text-white placeholder-white/70 outline-none px-4 py-2 border border-white/20 focus-visible:ring-4 focus-visible:ring-yellow-300 text-fluid-sm" />
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}
