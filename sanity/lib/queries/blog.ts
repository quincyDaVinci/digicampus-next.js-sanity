import {groq} from 'next-sanity'

/**
 * Blog query helpers for fetching posts with filtering, sorting, and pagination
 */

// Blog post fields commonly used across queries
// For English, use translations.en fields; for Dutch, use root fields
const blogPostFields = groq`
  _id,
  "title": select(
    $lang == "en" && defined(translations.en.title) => translations.en.title,
    title
  ),
  "slug": coalesce(slug.current),
  publishedAt,
  "excerpt": select(
    $lang == "en" && defined(translations.en.excerpt) => translations.en.excerpt,
    excerpt
  ),
  "body": select(
    $lang == "en" && defined(translations.en.body) => translations.en.body,
    body
  ),
  estimatedReadTime,
  featured,
  viewCount,
  mainImage{
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    },
    hotspot,
    alt
  },
  author->{
    _id,
    name,
    role,
    company,
    bio,
    image{
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot
    }
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current,
    description
  }
`

/**
 * Fetch blog page configuration (singleton)
 */
export const blogPageQuery = groq`
  *[_type == "blogPage" && _id == "blogPage" && metadata.language == $lang][0]{
    _id,
    title,
    description,
    highlightCriteria,
    highlightCount,
    postsPerPage,
    metadata
  }
`

/**
 * Fetch all blog categories for filter UI
 */
export const blogCategoriesQuery = groq`
  *[_type == "blogCategory"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description
  }
`

/**
 * Build a query for fetching paginated blog posts with filters and sorting
 * @param categorySlug - Optional category slug to filter by
 * @param sortBy - Sort option: 'newest' | 'oldest' | 'viewCount' | 'readTime'
 * @param page - Page number (1-indexed)
 * @param limit - Number of posts per page
 */
export function buildBlogPostsQuery(
  lang: string,
  categorySlug?: string,
  sortBy: string = 'newest',
  page: number = 1,
  limit: number = 12
) {
  // Calculate skip value for pagination
  const skip = (page - 1) * limit

  // Build filter conditions
  // Blog posts are authored in Dutch (nl) by default, with translations in translations.en
  const filters = [
    '_type == "blogPost"',
    'defined(publishedAt)',
  ]
  
  // Only filter by translation availability if requesting English
  if (lang === 'en') {
    filters.push('defined(translations.en)')
  }

  if (categorySlug) {
    filters.push(`"${categorySlug}" in categories[]->slug.current`)
  }

  const filterString = filters.join(' && ')

  // Build sort order
  let orderBy = 'publishedAt desc'
  switch (sortBy) {
    case 'oldest':
      orderBy = 'publishedAt asc'
      break
    case 'viewCount':
      orderBy = 'viewCount desc'
      break
    case 'readTime':
      orderBy = 'estimatedReadTime asc'
      break
    case 'newest':
    default:
      orderBy = 'publishedAt desc'
      break
  }

  return groq`
    *[${filterString}] | order(${orderBy}) [${skip}...${skip + limit}] {
      ${blogPostFields}
    }
  `
}

/**
 * Build a query to get total count of posts (for pagination)
 */
export function buildBlogPostsCountQuery(lang: string, categorySlug?: string) {
  const filters = [
    '_type == "blogPost"',
    'defined(publishedAt)',
  ]
  
  // Only filter by translation availability if requesting English
  if (lang === 'en') {
    filters.push('defined(translations.en)')
  }

  if (categorySlug) {
    filters.push(`"${categorySlug}" in categories[]->slug.current`)
  }

  const filterString = filters.join(' && ')

  return groq`count(*[${filterString}])`
}

/**
 * Build a query for fetching highlighted posts based on criteria
 * @param criteria - 'viewCount' | 'featured' | 'newest' | 'readTime'
 * @param limit - Number of posts to fetch
 */
export function buildHighlightedPostsQuery(
  lang: string,
  criteria: string = 'viewCount',
  limit: number = 3
) {
  // Blog posts are authored in Dutch (nl) by default, with translations in translations.en
  let filter = '_type == "blogPost" && defined(publishedAt)'
  
  // Only filter by translation availability if requesting English
  if (lang === 'en') {
    filter += ' && defined(translations.en)'
  }
  
  let orderBy = 'publishedAt desc'

  switch (criteria) {
    case 'viewCount':
      orderBy = 'viewCount desc'
      break
    case 'featured':
      filter += ' && featured == true'
      orderBy = 'publishedAt desc'
      break
    case 'newest':
      orderBy = 'publishedAt desc'
      break
    case 'readTime':
      orderBy = 'estimatedReadTime asc'
      break
    default:
      orderBy = 'publishedAt desc'
      break
  }

  return groq`
    *[${filter}] | order(${orderBy}) [0...${limit}] {
      ${blogPostFields}
    }
  `
}
