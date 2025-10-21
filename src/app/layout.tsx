import './globals.css'
import { LanguageProvider } from '@/lib/language'
import Header from '@/components/Header'
import { draftMode } from 'next/headers'
import { VisualEditing } from '@/components/VisualEditing'

export const metadata = { title: 'Digicampus' }

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const draft = await draftMode()
  
  return (
    <html>
      <body className="min-h-screen bg-gradient-to-r from-[var(--bg-1)] to-[var(--bg-2)] text-[var(--text)]">
        <a href="#main" className="skip-link sr-only focus:not-sr-only">Ga naar hoofdinhoud</a>
        <LanguageProvider>
          <Header />
          <main id="main">{children}</main>
        </LanguageProvider>
        {draft.isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
