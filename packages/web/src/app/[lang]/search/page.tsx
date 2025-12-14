import type {Metadata} from 'next'
import Link from 'next/link'
import {defaultLanguage, isSupportedLang, supportedLanguages} from '@/lib/i18n'

const translations = {
  en: {
    title: 'Search',
    heading: 'Search',
    description: 'Search across Digicampus content.',
    emptyQuery: 'Enter a search term to start exploring our content.',
    resultsLabel: 'Search results for',
    backHome: 'Back to homepage',
  },
  nl: {
    title: 'Zoeken',
    heading: 'Zoeken',
    description: 'Doorzoek de inhoud van Digicampus.',
    emptyQuery: 'Vul een zoekterm in om onze inhoud te verkennen.',
    resultsLabel: 'Zoekresultaten voor',
    backHome: 'Terug naar startpagina',
  },
} as const

type SearchParams = {
  q?: string
}

type PageProps = {
  params?: Promise<{lang: string}>
  searchParams?: Promise<SearchParams>
}

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({lang}))
}

export async function generateMetadata({params, searchParams}: PageProps): Promise<Metadata> {
  const resolvedParams = params ? await params : { lang: defaultLanguage }
  const lang = isSupportedLang(resolvedParams.lang) ? resolvedParams.lang : defaultLanguage
  const t = translations[lang]
  const query = (searchParams ? await searchParams : undefined)?.q?.trim()

  return {
    title: query ? `${t.title}: ${query}` : t.title,
    description: t.description,
  }
}

export default async function SearchPage({params, searchParams}: PageProps) {
  const resolvedParams = params ? await params : { lang: defaultLanguage }
  const lang = isSupportedLang(resolvedParams.lang) ? resolvedParams.lang : defaultLanguage
  const t = translations[lang]
  const query = (searchParams ? await searchParams : undefined)?.q?.trim()

  return (
    <section className="container mx-auto px-4 py-12" aria-labelledby="search-heading">
      <div className="max-w-3xl space-y-4">
        <h1 id="search-heading" className="text-4xl font-bold text-dc">{t.heading}</h1>
        <p className="text-lg text-dc-muted">{t.description}</p>

        {query ? (
          <div className="rounded-lg border border-dc px-4 py-3 bg-dc-surface-98">
            <p className="text-dc font-semibold">
              {t.resultsLabel} <span className="text-dc-text-muted">“{query}”</span>
            </p>
            <p className="text-dc-text-muted mt-2">
              This is a placeholder for search results. Update this page to display matched content.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-dc px-4 py-3 bg-dc-surface-98">
            <p className="text-dc-text-muted">{t.emptyQuery}</p>
          </div>
        )}

        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))] transition-all hover:scale-105 hover:shadow-lg"
          style={{backgroundColor: 'hsl(var(--dc-brand))', color: 'hsl(var(--dc-on-primary))', border: '1px solid hsl(var(--dc-border)/0.2)'}}
        >
          {t.backHome}
        </Link>
      </div>
    </section>
  )
}
