const defaultPreviewOrigin =
  process.env.NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000'

export const previewOrigin = defaultPreviewOrigin.replace(/\/$/, '')

export function buildPreviewUrl(slug?: string | null) {
  if (!slug) {
    return `${previewOrigin}/`
  }

  const normalizedSlug = slug.replace(/^\//, '')
  return `${previewOrigin}/api/draft?slug=${encodeURIComponent(normalizedSlug)}`
}

export function buildPublicUrl(slug?: string | null) {
  if (!slug) {
    return `${previewOrigin}/`
  }

  const normalizedSlug = slug.replace(/^\//, '')
  return `${previewOrigin}/${normalizedSlug}`
}
