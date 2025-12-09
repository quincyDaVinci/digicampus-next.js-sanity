'use client'

/**
 * Render the Sanity Studio client-only. We intentionally avoid SSR for the Studio bundle
 * to prevent hydration / DOM-nesting validation errors coming from the Studio UI during
 * server -> client hydration. The page server-renders a lightweight container and the
 * actual `NextStudio` component is dynamically imported on the client.
 */
import dynamic from 'next/dynamic'
import {useEffect} from 'react'
import config from '../../../../sanity/sanity.config'

const NextStudioClient = dynamic(
  // load the NextStudio export from next-sanity/studio on the client only
  () => import('next-sanity/studio').then((m) => m.NextStudio),
  { ssr: false }
)

export default function GeheimelocatiePage() {
  // Dev-only: filter noisy DOM nesting warnings coming from Studio internals
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    const originalError = console.error
    console.error = (...args: unknown[]) => {
      const first = args?.[0]
      if (
        typeof first === 'string' &&
        (first.includes('<div> cannot be a descendant of <p>') ||
          first.includes('<p> cannot contain a nested <div>') ||
          first.includes('This will cause a hydration error'))
      ) {
        return
      }
      originalError(...args)
    }
    return () => {
      console.error = originalError
    }
  }, [])

  return (
    <div id="studio-root" suppressHydrationWarning style={{minHeight: '100vh'}}>
      {/* mounted only on client */}
      <NextStudioClient config={config} />
    </div>
  )
}
