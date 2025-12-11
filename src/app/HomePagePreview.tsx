'use client'

import { useEffect, useState } from 'react'
import { previewClient } from '@sanity/lib/client'
import RenderSection from '@/components/sections/RenderSection'

type PageData = {
  modules?: Array<{ _key: string; _type: string;[key: string]: unknown }>
  [key: string]: unknown
}

type HomePagePreviewProps = {
  query: string
  params?: Record<string, unknown>
}

export function HomePagePreview({ query, params }: HomePagePreviewProps) {
  const [data, setData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await previewClient.fetch<PageData | null>(query, params ?? {})

        if (!cancelled) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        console.error('HomePagePreview fetch error:', err)
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to fetch preview data'))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    // Initial fetch
    fetchData()

    // Set up live listener for draft changes
    const subscription = previewClient.listen(
      query,
      params ?? {},
      {
        includeResult: true,
        visibility: 'query',
        events: ['mutation'],
      }
    ).subscribe({
      next: (update) => {
        if (!cancelled && update.result) {
          setData(update.result as PageData)
        } else if (!cancelled) {
          fetchData()
        }
      },
      error: (err) => {
        if (!cancelled) {
          console.error('Live update error:', err)
          fetchData()
        }
      },
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [query, params])

  if (loading && !data) {
    return <div className="p-6">Loading preview...</div>
  }

  if (error) {
    console.error('Preview error:', error)
    return <div className="p-6 text-red-600">Error loading preview: {error.message}</div>
  }

  if (!data) {
    return (
      <div className="p-6 max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-red-600">Preview Not Configured</h2>
        <p className="mb-4">
          The preview mode requires a Sanity API token to access draft content.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="font-semibold mb-2">To enable draft previews:</p>
          <ol className="list-decimal ml-5 space-y-2 text-sm">
            <li>Go to <a href="https://www.sanity.io/manage" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">sanity.io/manage</a></li>
            <li>Select your project</li>
            <li>Go to API → Tokens</li>
            <li>Create a token with "Viewer" permissions</li>
            <li>Copy the token</li>
            <li>Add to your <code className="bg-gray-200 px-1 rounded">.env.local</code> file:<br />
              <code className="block bg-gray-800 text-white p-2 rounded mt-2">
                SANITY_API_READ_TOKEN=your_token_here
              </code>
            </li>
            <li>Restart your dev server: <code className="bg-gray-200 px-1 rounded">npm run dev</code></li>
          </ol>
        </div>
      </div>
    )
  }

  if (!data.modules || data.modules.length === 0) {
    return <div className="p-6">No modules found. Add content in Sanity Studio.</div>
  }

  return (
    <section className="contents" aria-label="Home page preview">
      {data.modules.map((module) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </section>
  )
}
