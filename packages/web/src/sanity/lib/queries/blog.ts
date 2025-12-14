import { groq } from 'next-sanity'

/**
 * Blog query helpers for fetching posts with filtering, sorting, and pagination
 */

// Blog post fields commonly used across queries
// Uses language-filter plugin: fetches translations[], app selects by language
const blogPostFields = groq`
  _id,
  title,
  "translations": translations[] { language, title },
  "slug": coalesce(slug.current),
  publishedAt,
  excerpt,
  "translations_excerpt": translations[] { language, excerpt },
  body,
  "translations_body": translations[] { language, body },
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
    "slug": slug.current,
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
 * Uses language-filter plugin: fetches translations[], app selects by language
 */
export const blogPageQuery = groq`
  *[_type == "blogPage" && _id == "blogPage"][0]{
    _id,
    title,
    "translations": translations[] { language, title },
    description,
    "translations_description": translations[] { language, description },
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
 * Uses language-filter plugin: fetches all translations[], app selects by language
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
  // Blog posts must have translations[] array with at least one entry
  const filters = [
    '_type == "blogPost"',
    'defined(publishedAt)',
    'defined(translations)',
  ]

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
 * Uses language-filter plugin: counts posts with translations[] array
 */
export function buildBlogPostsCountQuery(lang: string, categorySlug?: string) {
  const filters = [
    '_type == "blogPost"',
    'defined(publishedAt)',
    'defined(translations)',
  ]

  if (categorySlug) {
    filters.push(`"${categorySlug}" in categories[]->slug.current`)
  }

  const filterString = filters.join(' && ')

  return groq`count(*[${filterString}])`
}

/**
 * Build a query for fetching highlighted posts based on criteria
 * Uses language-filter plugin: fetches posts with translations[] array
 * @param criteria - 'viewCount' | 'featured' | 'newest' | 'readTime'
 * @param limit - Number of posts to fetch
 */
export function buildHighlightedPostsQuery(
  lang: string,
  criteria: string = 'viewCount',
  limit: number = 3
) {
  // Filter for published blog posts with translations available
  let filter = '_type == "blogPost" && defined(publishedAt) && defined(translations)'

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

/**
 * Fetch a single author by slug
 */
export const authorBySlugQuery = groq`
  *[_type == "author" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    role,
    category->{
      _id,
      title,
      "slug": slug.current
    },
    image{
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
    email,
    linkedin,
    bio
  }
`

/**
 * Build a query for fetching blog posts by a specific author
 * @param authorId - Author's _id to filter by
 * @param lang - Language code
 * @param sortBy - Sort option: 'newest' | 'oldest' | 'viewCount' | 'readTime'
 * @param page - Page number (1-indexed)
 * @param limit - Number of posts per page
 */
export function buildBlogPostsByAuthorQuery(
  authorId: string,
  lang: string,
  sortBy: string = 'newest',
  page: number = 1,
  limit: number = 12
) {
  const skip = (page - 1) * limit

  const filters = [
    '_type == "blogPost"',
    'defined(publishedAt)',
    'defined(translations)',
    `author._ref == "${authorId}"`,
  ]

  const filterString = filters.join(' && ')

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
 * Build a query to get total count of posts by author
 */
export function buildBlogPostsByAuthorCountQuery(authorId: string) {
  const filters = [
    '_type == "blogPost"',
    'defined(publishedAt)',
    'defined(translations)',
    `author._ref == "${authorId}"`,
  ]

  const filterString = filters.join(' && ')

  return groq`count(*[${filterString}])`
}

