'use client'

import {useLiveMode} from '@sanity/react-loader'
import {previewClient} from '@sanity/lib/client'
import {useEffect} from 'react'

export function VisualEditing() {
  // Get the current origin for studio URL
  const studioOrigin = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
      : 'http://localhost:3000'
  
  // This hook enables live queries with the preview client
  // It listens to document mutations and automatically refetches queries
  useLiveMode({
    client: previewClient,
    allowStudioOrigin: studioOrigin,
  })
  
  useEffect(() => {
    // Dynamically import and enable visual editing overlays
    let disableFn: (() => void) | undefined
    
    import('@sanity/visual-editing')
      .then(({enableVisualEditing}) => {
        disableFn = enableVisualEditing({
          // Don't refresh on mutation - let useLiveMode handle updates smoothly
          refresh: async (payload) => {
            // Only refresh on publish events for a clean update
            if (payload.source === 'manual') {
              window.location.reload()
            }
            // For mutations (draft changes), return without reloading
            // The useLiveMode hook will handle live updates
          },
        })
      })
      .catch((err) => {
        console.error('Failed to enable visual editing:', err)
      })
    
    return () => {
      if (disableFn) {
        disableFn()
      }
    }
  }, [])
  
  return null
}
