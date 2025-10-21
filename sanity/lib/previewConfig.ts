export const previewOrigin = typeof window !== 'undefined'
  ? window.location.origin
  : (process.env.NEXT_PUBLIC_PREVIEW_ORIGIN || 'http://localhost:3001')

type SlugValue = {current?: string} | string | null | undefined

interface DocumentWithSlug {
  _type?: string
  slug?: SlugValue
}

function getSlugValue(slug: SlugValue): string | undefined {
  if (!slug) return undefined
  if (typeof slug === 'string') return slug
  return slug.current ?? undefined
}

export function resolvePreviewPath(doc: DocumentWithSlug) {
  const type = doc._type
  const slugValue = getSlugValue(doc.slug)

  if (type === 'homePage') {
    return '/'
  }

  if (type === 'post') {
    return slugValue ? `/blog/${slugValue}` : undefined
  }

  if (type === 'page') {
    return slugValue ? `/${slugValue}` : undefined
  }

  return undefined
}
