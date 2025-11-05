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
          <h1 className="text-4xl font-bold mb-4">Welcome to Your New Next.js & Sanity App!</h1>
          <p className="text-lg mb-6 text-muted-foreground">
            It looks like you haven&apos;t set up your home page content yet. To get started, head over to the Sanity Studio and create your home page by adding modules and content.
          </p>
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
