import './globals.css'
import { headers } from 'next/headers'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { VisualEditing } from '@/components/VisualEditing'
import { LanguageProvider } from '@/lib/language'
import { defaultLanguage, isSupportedLang } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'DigiCampus - Digital Learning Platform',
  description: 'Empowering education through digital innovation',
  openGraph: {
    title: 'DigiCampus - Digital Learning Platform',
    description: 'Empowering education through digital innovation',
    type: 'website',
    locale: 'en_US',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const draft = await draftMode()
  const headerList = await headers()
  const hintedLang = headerList.get('x-dc-lang')
  const lang = isSupportedLang(hintedLang) ? hintedLang : defaultLanguage

  return (
    <html lang={lang} data-lang={lang}>
      <body className="min-h-screen bg-gradient-to-r from-[var(--bg-1)] to-[var(--bg-2)] text-[var(--text)]">
        {/* Skip to main content link for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <LanguageProvider initialLang={lang}>
          <Header lang={lang} />

          {/* Main landmark for primary content */}
          <main id="main-content" role="main">
            {children}
          </main>

          <Footer lang={lang} />
        </LanguageProvider>

        {draft.isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}

