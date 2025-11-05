import { client } from '@sanity/lib/client'
import { draftMode } from 'next/headers'
import RenderSection from '@/components/sections/RenderSection'
import Link from 'next/link'
import { HomePagePreview } from './HomePagePreview'

// Query for the home page (singleton)
const homePageQuery = `*[_type == "homePage" && _id == "homePage"][0]{
  _id,
  title,
  description,
  modules[]{
    _type,
    _key,
    ...,
  }
}`

async function getHomePage() {
  try {
    const page = await client.fetch(homePageQuery, {}, {
      cache: 'no-store' // Disable caching for now to test
    })
    console.log('Home page data:', JSON.stringify(page, null, 2))
    return page
  } catch (error) {
    console.error('Error fetching home page:', error)
    return null
  }
}

export default async function Page() {
  const draft = await draftMode()
  const page = await getHomePage()

  console.log('Page exists:', !!page)
  console.log('Modules length:', page?.modules?.length)
  console.log('Draft enabled:', draft.isEnabled)

  // If in draft mode, use the live preview component
  if (draft.isEnabled && page) {
    return <HomePagePreview initial={{data: page, sourceMap: undefined}} query={homePageQuery} />
  }

  // If no home page exists yet, show a welcome message
  if (!page || !page.modules?.length) {
    return (
      <main id="main" className="flex flex-col gap-8 p-6 min-h-[60vh] items-center justify-center">
        <div className="max-w-2xl text-center">
          <h1 className="text-fluid-3xl font-semibold mb-4">Welkom 👋</h1>
          <p className="text-fluid-base text-[rgb(var(--dc-text)/0.85)] mb-6">
            Je hebt succesvol SanityPress + Sane-Kit geïntegreerd!
          </p>
          <div className="rounded-2xl border border-dc bg-dc-surface-98 p-6 text-left">
            <h2 className="font-semibold mb-3">Volgende stappen:</h2>
            <ol className="text-sm text-[rgb(var(--dc-text)/0.7)] space-y-2 list-decimal list-inside">
              <li>Ga naar <Link href="/geheimelocatie" className="underline text-[rgb(var(--dc-primary))]">Sanity Studio</Link></li>
              <li>Bewerk de <strong>Home Page</strong> onder Pages</li>
              <li>Voeg modules toe (Hero, Features, CTA, etc.)</li>
              <li>Publiceer en zie je content hier verschijnen!</li>
            </ol>
            <p className="text-xs text-[rgb(var(--dc-text)/0.5)] mt-4">
              Zie <code>QUICK_START.md</code> voor meer details
            </p>
          </div>
        </div>
      </main>
    )
  }

  // Render the home page modules
  return (
    <main id="main">
      {page.modules.map((module: {_key: string; _type: string}) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </main>
  )
}
