import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/geheimelocatie',
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
    studioUrl: '/geheimelocatie',
  },
})

// Helper: fetch queries with Next.js ISR-compatible options by default
export async function fetchQuery<T = unknown>(query: string, params?: Record<string, unknown> | undefined, revalidateSeconds = 300): Promise<T> {
  // Use an empty params object when none is provided to satisfy type overloads
  const safeParams = params ?? {}
  return client.fetch<T>(query, safeParams as any, { next: { revalidate: revalidateSeconds } } as any)
}
