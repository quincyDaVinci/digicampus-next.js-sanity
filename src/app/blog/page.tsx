import {Metadata} from 'next'
import {client} from '@sanity/lib/client'
import {
  blogPageQuery,
  blogCategoriesQuery,
  buildBlogPostsQuery,
  buildBlogPostsCountQuery,
  buildHighlightedPostsQuery,
} from '@sanity/lib/queries/blog'
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
  searchParams: Promise<SearchParams>
}

export async function generateMetadata({searchParams}: PageProps): Promise<Metadata> {
  const params = await searchParams
  
  try {
    const blogPageData = await client.fetch<BlogPageData | null>(blogPageQuery)
    
    if (!blogPageData) {
      return {
        title: 'Blog',
        description: 'Browse our blog posts',
      }
    }

    const title = blogPageData.metadata?.title || blogPageData.title || 'Blog'
    let description = blogPageData.metadata?.description || blogPageData.description || 'Browse our blog posts'

    // Add context to meta description if filtered/sorted
    if (params.category) {
      description = `${description} - Filtered by category`
    }

    return {
      title,
      description,
    }
  } catch (error) {
    console.error('Error fetching blog page metadata:', error)
    return {
      title: 'Blog',
      description: 'Browse our blog posts',
    }
  }
}

export default async function BlogPage({searchParams}: PageProps) {
  const params = await searchParams
  
  // Extract and validate search params
  const categorySlug = params.category || undefined
  const sortBy = params.sort || 'newest'
  const currentPage = Math.max(1, parseInt(params.page || '1', 10))

  try {
    // Fetch blog page configuration
    const blogPageData = await client.fetch<BlogPageData | null>(blogPageQuery)
    
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

    // Fetch data in parallel
    const [categories, posts, totalPosts, highlightedPosts] = await Promise.all([
      client.fetch<Category[]>(blogCategoriesQuery),
      client.fetch<BlogPost[]>(
        buildBlogPostsQuery(categorySlug, sortBy, currentPage, postsPerPage)
      ),
      client.fetch<number>(buildBlogPostsCountQuery(categorySlug)),
      client.fetch<BlogPost[]>(
        buildHighlightedPostsQuery(
          blogPageData.highlightCriteria,
          blogPageData.highlightCount
        )
      ),
    ])

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
