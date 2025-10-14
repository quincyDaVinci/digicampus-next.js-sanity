import './globals.css'
import Header from '@/components/Header'
import { LanguageProvider } from '@/lib/language'

export const metadata = { title: 'Digicampus' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="min-h-screen bg-gradient-to-r from-[var(--bg-1)] to-[var(--bg-2)] text-[var(--text)]">
        <a href="#main" className="skip-link sr-only focus:not-sr-only">Ga naar hoofdinhoud</a>
        <LanguageProvider>
          <Header />
          <main id="main">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
