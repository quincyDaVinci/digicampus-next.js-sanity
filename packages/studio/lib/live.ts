// Lightweight Live API shim for next-sanity v11+
// If you later upgrade to a version that exposes `defineLive`, you can swap this implementation.
import { previewClient } from './client'
import type { QueryParams } from '@sanity/client'
import type {ReactElement} from 'react'

/**
 * Server/client-safe fetch that returns draft-aware data using the preview client.
 * Stega encoding is already enabled in the preview client; adjust in client.ts if needed.
 */
export async function sanityFetch<T>(query: string, params?: QueryParams): Promise<T> {
  return previewClient.fetch<T>(query, params ?? {})
}

/**
 * Placeholder component to enable future Live features.
 * Currently renders nothing; safe to include in layouts.
 */
export function SanityLive(): ReactElement | null {
  return null
}
