'use client'

import {useState, useRef, useMemo} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {CalendarIcon, ChevronLeftIcon, ChevronRightIcon} from '@/components/icons/FeatherIcons'
import BlogCard from '@/components/pageBuilder/BlogCard'
import type { BlogCardComponent, BlogCardResolvedPost } from '@/types/pageBuilder'

type Category = {
  _id: string
  title: string
  slug: string
  description?: string
}

type BlogPost = {
  _id: string
  title?: string
  slug?: string
  publishedAt?: string
  excerpt?: string
  body?: unknown
  estimatedReadTime?: number
  mainImage?: BlogCardResolvedPost["mainImage"]
  author?: BlogCardResolvedPost["author"]
  categories?: { _id: string; title?: string; slug?: string }[]
}

type BlogPageClientProps = {
  title: string
  description?: string
  categories: Category[]
  posts: BlogPost[]
  highlightedPosts: BlogPost[]
  currentCategory?: string
  currentSort: string
  currentPage: number
  totalPages: number
  totalPosts: number
}

export default function BlogPageClient({
  title,
  description,
  categories,
  posts,
  highlightedPosts,
  currentCategory,
  currentSort,
  currentPage,
  totalPages,
  totalPosts,
}: BlogPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const liveRegionRef = useRef<HTMLDivElement>(null)
  const [announcement, setAnnouncement] = useState('')

  // Build URL with query params
  const buildUrl = (updates: {category?: string | null; sort?: string; page?: number}) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (updates.category !== undefined) {
      if (updates.category) {
        params.set('category', updates.category)
      } else {
        params.delete('category')
      }
      params.delete('page') // Reset to page 1 when changing category
    }
    
    if (updates.sort) {
      params.set('sort', updates.sort)
      params.delete('page') // Reset to page 1 when changing sort
    }
    
    if (updates.page !== undefined) {
      if (updates.page > 1) {
        params.set('page', updates.page.toString())
      } else {
        params.delete('page')
      }
    }
    
    const queryString = params.toString()
    return queryString ? `/blog?${queryString}` : '/blog'
  }

  // Handle filter/sort changes
  const handleCategoryChange = (categorySlug: string | null) => {
    const url = buildUrl({category: categorySlug})
    router.push(url)
    
    // Announce to screen readers
    if (categorySlug) {
      const category = categories.find(c => c.slug === categorySlug)
      setAnnouncement(`Gefilterd op categorie ${category?.title || categorySlug}. ${totalPosts} berichten gevonden.`)
    } else {
      setAnnouncement(`Alle categorieën weergegeven. ${totalPosts} berichten gevonden.`)
    }
  }

  const handleSortChange = (sort: string) => {
    const url = buildUrl({sort})
    router.push(url)
    
    const sortLabels: Record<string, string> = {
      newest: 'nieuwste eerst',
      oldest: 'oudste eerst',
      viewCount: 'populairste eerst',
      readTime: 'kortste leestijd eerst',
    }
    setAnnouncement(`Gesorteerd op ${sortLabels[sort] || sort}`)
  }

  const handlePageChange = (page: number) => {
    const url = buildUrl({page})
    router.push(url)
    
    // Scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  // Get page numbers to display
  const getPageNumbers = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const pageNumbers = totalPages > 0 ? getPageNumbers() : []

  return (
    <main id="main" className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-dc">{title}</h1>
        {description && (
          <p className="text-lg text-dc-muted max-w-3xl">{description}</p>
        )}
      </div>

      {/* Divider */}
      <div 
        className="mb-8 h-px" 
        style={{ 
          background: 'linear-gradient(to right, transparent, hsl(var(--dc-border) / 0.4) 20%, hsl(var(--dc-border) / 0.4) 80%, transparent)' 
        }} 
      />

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter op categorie">
          <button
            onClick={() => handleCategoryChange(null)}
            style={{
              backgroundColor: !currentCategory ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-surface-98))',
              borderColor: !currentCategory ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-border))',
              color: !currentCategory ? 'hsl(var(--dc-on-primary))' : 'hsl(var(--dc-text))',
            }}
            className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
            onMouseEnter={(e) => {
              if (currentCategory) {
                e.currentTarget.style.borderColor = 'hsl(var(--dc-brand))'
                e.currentTarget.style.color = 'hsl(var(--dc-brand))'
              }
            }}
            onMouseLeave={(e) => {
              if (currentCategory) {
                e.currentTarget.style.borderColor = 'hsl(var(--dc-border))'
                e.currentTarget.style.color = 'hsl(var(--dc-text))'
              }
            }}
            aria-pressed={!currentCategory}
          >
            Alle categorieën
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category.slug)}
              style={{
                backgroundColor: currentCategory === category.slug ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-surface-98))',
                borderColor: currentCategory === category.slug ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-border))',
                color: currentCategory === category.slug ? 'hsl(var(--dc-on-primary))' : 'hsl(var(--dc-text))',
              }}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
              onMouseEnter={(e) => {
                if (currentCategory !== category.slug) {
                  e.currentTarget.style.borderColor = 'hsl(var(--dc-brand))'
                  e.currentTarget.style.color = 'hsl(var(--dc-brand))'
                }
              }}
              onMouseLeave={(e) => {
                if (currentCategory !== category.slug) {
                  e.currentTarget.style.borderColor = 'hsl(var(--dc-border))'
                  e.currentTarget.style.color = 'hsl(var(--dc-text))'
                }
              }}
              aria-pressed={currentCategory === category.slug}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Live region for screen reader announcements */}
      <div
        ref={liveRegionRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Main Content: Grid + Sidebar */}
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main Blog Grid */}
        <div>
          {/* Sort Dropdown - Above Blog Grid */}
          <div className="mb-6 flex items-center gap-3">
            <label htmlFor="sort-select" className="text-sm font-medium whitespace-nowrap" style={{ color: 'hsl(var(--dc-text))' }}>
              Sorteren op:
            </label>
            <select
              id="sort-select"
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              style={{
                backgroundColor: 'hsl(var(--dc-surface-98))',
                borderColor: 'hsl(var(--dc-border))',
                color: 'hsl(var(--dc-text))',
              }}
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus cursor-pointer"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'hsl(var(--dc-brand))'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'hsl(var(--dc-border))'
              }}
            >
              <option value="newest">Nieuwste eerst</option>
              <option value="oldest">Oudste eerst</option>
              <option value="viewCount">Populairste</option>
              <option value="readTime">Kortste leestijd</option>
            </select>
          </div>

          {/* Blog Posts Grid */}
          {posts.length > 0 ? (
            (() => {
              // Map posts to BlogCardResolvedPost (as in BlogSection)
              const mappedPosts = posts.map((post) => ({
                _id: post._id,
                title: post.title ?? 'Untitled',
                slug: post.slug,
                publishedAt: post.publishedAt,
                summary: post.excerpt,
                body: post.body,
                mainImage: post.mainImage,
                author: post.author,
                categories: post.categories,
                estimatedReadTime: post.estimatedReadTime,
              }))
              const cardComponent: BlogCardComponent = {
                _type: 'blogCardComponent',
                _key: 'blog-list',
                tone: 'surface',
                ctaLabel: 'Lees meer',
                borderRadius: 'small',
                resolvedPost: mappedPosts,
              }
              return <BlogCard component={cardComponent} />
            })()
          ) : (
            <div className="rounded-2xl border border-dashed border-dc p-12 text-center">
              <p className="text-dc-muted">Geen blogberichten gevonden voor de geselecteerde filters.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginering">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  backgroundColor: 'hsl(var(--dc-surface-98))',
                  borderColor: 'hsl(var(--dc-border))',
                  color: 'hsl(var(--dc-text))',
                  opacity: currentPage === 1 ? 0.4 : 1,
                }}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--dc-surface-90))'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--dc-surface-98))'
                  }
                }}
                aria-label="Vorige pagina"
                aria-disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" aria-hidden />
                Vorige
              </button>

              <div className="flex gap-1">
                {pageNumbers.map((pageNum, idx) => {
                  if (pageNum === '...') {
                    return (
                      <span key={`dots-${idx}`} className="px-2 py-2" style={{ color: 'hsl(var(--dc-text-muted))' }} aria-hidden="true">
                        ...
                      </span>
                    )
                  }
                  const page = pageNum as number
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      style={{
                        backgroundColor: currentPage === page ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-surface-98))',
                        color: currentPage === page ? 'hsl(var(--dc-on-primary))' : 'hsl(var(--dc-text))',
                      }}
                      className="min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
                      onMouseEnter={(e) => {
                        if (currentPage !== page) {
                          e.currentTarget.style.backgroundColor = 'hsl(var(--dc-surface-90))'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== page) {
                          e.currentTarget.style.backgroundColor = 'hsl(var(--dc-surface-98))'
                        }
                      }}
                      aria-label={`Pagina ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  backgroundColor: 'hsl(var(--dc-surface-98))',
                  borderColor: 'hsl(var(--dc-border))',
                  color: 'hsl(var(--dc-text))',
                  opacity: currentPage === totalPages ? 0.4 : 1,
                }}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--dc-surface-90))'
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--dc-surface-98))'
                  }
                }}
                aria-label="Volgende pagina"
                aria-disabled={currentPage === totalPages}
              >
                Volgende
                <ChevronRightIcon className="h-4 w-4" aria-hidden />
              </button>
            </nav>
          )}
        </div>

        {/* Highlighted Posts Sidebar */}
        {highlightedPosts.length > 0 && (
          <aside className="space-y-4 border-l pl-8" style={{ borderColor: 'hsl(var(--dc-border) / 0.15)' }} aria-label="Uitgelichte berichten">
            <h2 className="text-lg font-semibold text-dc">Uitgelicht</h2>
            <BlogCard
              component={{
                _type: 'blogCardComponent',
                _key: 'highlighted-posts',
                tone: 'surface',
                ctaLabel: 'Lees meer',
                gridMode: 'single',
                showAuthor: false,
                resolvedPost: highlightedPosts.map((post) => ({
                  _id: post._id,
                  title: post.title ?? 'Untitled',
                  slug: post.slug,
                  publishedAt: post.publishedAt,
                  summary: undefined,
                  body: post.body,
                  mainImage: post.mainImage,
                  author: post.author,
                  categories: post.categories,
                  estimatedReadTime: post.estimatedReadTime,
                })),
              }}
            />
          </aside>
        )}
      </div>
    </main>
  )
}
