import './globals.css'
import { LanguageProvider } from '@/lib/language'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { draftMode } from 'next/headers'
import { VisualEditing } from '@/components/VisualEditing'
import type { Metadata } from 'next'

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
  
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-r from-[var(--bg-1)] to-[var(--bg-2)] text-[var(--text)]">
        {/* Skip to main content link for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <LanguageProvider>
          <Header />
          
          {/* Main landmark for primary content */}
          <main id="main-content" role="main">
            {children}
          </main>
          
          <Footer />
        </LanguageProvider>
        
        {draft.isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}

