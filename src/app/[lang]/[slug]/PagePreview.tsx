'use client'

import {QueryResponseInitial, useQuery} from '@sanity/react-loader'
import RenderSection from '@/components/sections/RenderSection'
import {useEffect} from 'react'

type PageData = {
  modules?: Array<{_key: string; _type: string; [key: string]: unknown}>
}

type PagePreviewProps = {
  initial: QueryResponseInitial<PageData | null>
  query: string
  params: {slug: string; lang: string}
}

export function PagePreview({initial, query, params}: PagePreviewProps) {
  const {data, loading, error} = useQuery<PageData | null>(query, params, {initial})
  
  // Listen for navigation events from Sanity Studio to refresh smoothly
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Listen for navigation or update events from Studio
      if (event.data?.type === 'navigation' || event.data?.type === 'sanity/visual-editing/navigate') {
        // The useQuery hook will automatically refetch
      }
    }
    
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])
  
  if (loading && !data) {
    return <div className="p-6">Loading preview...</div>
  }
  
  if (error) {
    console.error('Preview error:', error)
    return <div className="p-6 text-red-600">Error loading preview</div>
  }
  
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
