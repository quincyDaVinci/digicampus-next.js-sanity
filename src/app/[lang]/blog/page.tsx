import {Metadata} from 'next'
import {client} from '@sanity/lib/client'
import {
  blogPageQuery,
  blogCategoriesQuery,
  buildBlogPostsQuery,
  buildBlogPostsCountQuery,
  buildHighlightedPostsQuery,
} from '@sanity/lib/queries/blog'
import {defaultLanguage, supportedLanguages, isSupportedLang} from '@/lib/i18n'
import BlogPageClient from './BlogPageClient'

type BlogPageData = {
  title: string
  description?: string
  highlightCriteria: string
  highlightCount: number
  postsPerPage: number
  metadata?: {
    title?: string
    description?: string
  }
}

type Category = {
  _id: string
  title: string
  slug: string
  description?: string
}

type BlogPost = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  estimatedReadTime?: number
  featured?: boolean
  viewCount?: number
  mainImage?: {
    asset?: {
      url: string
    }
    alt?: string
  }
  author?: {
    name: string
    role?: string
    company?: string
  }
  categories?: Category[]
}

type SearchParams = {
  category?: string
  sort?: string
  page?: string
}

type PageProps = {
  params: {lang: string}
  searchParams: SearchParams
}

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({lang}))
}

export async function generateMetadata({searchParams, params}: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const lang = resolvedParams?.lang || defaultLanguage
  
  try {
    // Try requested language first; if missing, fall back to defaultLanguage
    let blogPageData = await client.fetch<BlogPageData | null>(blogPageQuery, {lang})
    if (!blogPageData && lang !== defaultLanguage) {
      blogPageData = await client.fetch<BlogPageData | null>(blogPageQuery, {lang: defaultLanguage})
    }
    
    if (!blogPageData) {
      return {
        title: 'Blog',
        description: 'Browse our blog posts',
      }
    }

    const title = blogPageData.metadata?.title || blogPageData.title || 'Blog'
    let description = blogPageData.metadata?.description || blogPageData.description || 'Browse our blog posts'

    // Add context to meta description if filtered/sorted
    if (resolvedSearchParams?.category) {
      description = `${description} - Filtered by category`
    }

    return {
      title,
      description,
      openGraph: { locale: lang === 'nl' ? 'nl_NL' : 'en_US' },
      alternates: {
        languages: {
          en: '/en/blog',
          nl: '/nl/blog',
        },
      },
    }
  } catch (error) {
    console.error('Error fetching blog page metadata:', error)
    return {
      title: 'Blog',
      description: 'Browse our blog posts',
    }
  }
}

export default async function BlogPage({searchParams, params}: PageProps) {
  // Await params/searchParams per Next.js sync-dynamic-apis guidance
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const lang = resolvedParams?.lang || defaultLanguage

  // Extract and validate search params
  const categorySlug = resolvedSearchParams?.category || undefined
  const sortBy = resolvedSearchParams?.sort || 'newest'
  const currentPage = Math.max(1, parseInt(resolvedSearchParams?.page || '1', 10))

  try {
    // Fetch blog page configuration
    // Fetch blog page configuration for requested language; if missing, fall back to defaultLanguage
    let blogPageData = await client.fetch<BlogPageData | null>(blogPageQuery, {lang})
    if (!blogPageData && lang !== defaultLanguage) {
      blogPageData = await client.fetch<BlogPageData | null>(blogPageQuery, {lang: defaultLanguage})
    }

    if (!blogPageData) {
      return (
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-dc-text-muted">
            Blog page not configured. Please set up the blog page in Sanity Studio.
          </p>
        </div>
      )
    }

    const postsPerPage = blogPageData.postsPerPage || 12

      // Use the route's lang parameter for fetching posts (from the [lang] dynamic segment)
      const usedLang = isSupportedLang(lang) ? lang : defaultLanguage

    // Fetch data with per-call error handling so we can surface specific failures in the server logs
    let categories: Category[] = []
    let posts: BlogPost[] = []
    let totalPosts = 0
    let highlightedPosts: BlogPost[] = []

    try {
      console.debug('[blog] fetching categories')
      categories = await client.fetch<Category[]>(blogCategoriesQuery)
      console.debug('[blog] fetched categories', categories?.length)
    } catch (err) {
      console.error('[blog] failed to fetch categories', err)
      categories = []
    }

    try {
      console.debug('[blog] fetching posts', {usedLang, categorySlug, sortBy, currentPage, postsPerPage})
      posts = await client.fetch<BlogPost[]>(
        buildBlogPostsQuery(usedLang, categorySlug, sortBy, currentPage, postsPerPage),
        {lang: usedLang}
      )
      console.debug('[blog] fetched posts', posts?.length)
    } catch (err) {
      console.error('[blog] failed to fetch posts', err)
      posts = []
    }

    try {
      console.debug('[blog] fetching posts count', {usedLang, categorySlug})
      totalPosts = await client.fetch<number>(buildBlogPostsCountQuery(usedLang, categorySlug), {lang: usedLang})
      console.debug('[blog] total posts count', totalPosts)
    } catch (err) {
      console.error('[blog] failed to fetch posts count', err)
      totalPosts = 0
    }

    try {
      console.debug('[blog] fetching highlighted posts', {usedLang, criteria: blogPageData.highlightCriteria, count: blogPageData.highlightCount})
      highlightedPosts = await client.fetch<BlogPost[]>(
        buildHighlightedPostsQuery(
          usedLang,
          blogPageData.highlightCriteria,
          blogPageData.highlightCount
        ),
        {lang: usedLang}
      )
      console.debug('[blog] fetched highlighted posts', highlightedPosts?.length)
    } catch (err) {
      console.error('[blog] failed to fetch highlighted posts', err)
      highlightedPosts = []
    }

    const totalPages = Math.ceil(totalPosts / postsPerPage)

    return (
      <BlogPageClient
        title={blogPageData.title}
        description={blogPageData.description}
        categories={categories}
        posts={posts}
        highlightedPosts={highlightedPosts}
        currentCategory={categorySlug}
        currentSort={sortBy}
        currentPage={currentPage}
        totalPages={totalPages}
        totalPosts={totalPosts}
      />
    )
  } catch (error) {
    console.error('Error fetching blog page data:', error)
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-red-600">
          Error loading blog posts. Please try again later.
        </p>
      </div>
    )
  }
}
