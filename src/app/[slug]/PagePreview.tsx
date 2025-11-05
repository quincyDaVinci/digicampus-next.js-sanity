'use client'

import {QueryResponseInitial, useQuery} from '@sanity/react-loader'
import RenderSection from '@/components/sections/RenderSection'

type PageData = {
  modules?: Array<{_key: string; _type: string; [key: string]: unknown}>
}

type PagePreviewProps = {
  initial: QueryResponseInitial<PageData | null>
  query: string
  params: {slug: string}
}

export function PagePreview({initial, query, params}: PagePreviewProps) {
  const {data} = useQuery<PageData | null>(query, params, {initial})
  
  if (!data) {
    return <div className="p-6">Page not found in preview</div>
  }
  
  return (
    <main id="main">
      {data.modules?.map((module) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </main>
  )
}
