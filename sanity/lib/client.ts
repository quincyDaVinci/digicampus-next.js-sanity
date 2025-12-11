import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, studioUrl } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production, skip in development for fresh data
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl,
  },
})

// Client for preview/draft mode with live updates
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: true,
    studioUrl,
  },
})

// Helper: fetch queries with Next.js ISR-compatible options by default
export async function fetchQuery<T = unknown>(query: string, params?: Record<string, unknown> | undefined, revalidateSeconds?: number): Promise<T> {
  // Use an empty params object when none is provided to satisfy type overloads
  const safeParams = params ?? {}
  // In development, disable caching for fresh data. In production, default to 300s (5 min) cache
  const revalidate = revalidateSeconds !== undefined ? revalidateSeconds : (process.env.NODE_ENV === 'production' ? 300 : 0)
  return client.fetch<T>(query, safeParams as any, { next: { revalidate } } as any)
}
