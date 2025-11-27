 'use client'

/**
 * Render the Sanity Studio client-only. We intentionally avoid SSR for the Studio bundle
 * to prevent hydration / DOM-nesting validation errors coming from the Studio UI during
 * server -> client hydration. The page server-renders a lightweight container and the
 * actual `NextStudio` component is dynamically imported on the client.
 */
import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

const NextStudioClient = dynamic(
  // load the NextStudio export from next-sanity/studio on the client only
  () => import('next-sanity/studio').then((m) => m.NextStudio),
  { ssr: false }
)

export default function GeheimelocatiePage() {
  return (
    <div id="studio-root" suppressHydrationWarning style={{minHeight: '100vh'}}>
      {/* mounted only on client */}
      <NextStudioClient config={config} />
    </div>
  )
}
