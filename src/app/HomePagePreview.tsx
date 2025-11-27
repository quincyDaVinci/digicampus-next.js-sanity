'use client'

import {QueryResponseInitial, useQuery} from '@sanity/react-loader'
import RenderSection from '@/components/sections/RenderSection'
import {useEffect} from 'react'

type PageData = {
  modules?: Array<{_key: string; _type: string; [key: string]: unknown}>
}

type HomePagePreviewProps = {
  initial: QueryResponseInitial<PageData | null>
  query: string
  params?: Record<string, unknown>
}

export function HomePagePreview({initial, query, params}: HomePagePreviewProps) {
  const {data, loading, error} = useQuery<PageData | null>(query, params ?? {}, {initial})
  
  // Listen for navigation events from Sanity Studio
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'navigation' || event.data?.type === 'sanity/visual-editing/navigate') {
        // useQuery will automatically refetch
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
  
  if (!data || !data.modules?.length) {
    return <div className="p-6">No content yet. Add modules to the home page in Sanity Studio.</div>
  }
  
  return (
    <main id="main">
      {data.modules.map((module) => (
        <RenderSection key={module._key} section={module} />
      ))}
    </main>
  )
}

