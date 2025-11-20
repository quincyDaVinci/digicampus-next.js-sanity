'use client'

import {useState, useRef, useMemo} from 'react'
import {useRouter, useSearchParams} from 'next/navigation'
import {CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, MenuIcon} from '@/components/icons/FeatherIcons'
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false)

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

      {/* Divider */}
      <div 
        className="mb-8 h-px" 
        style={{ 
          background: 'linear-gradient(to right, transparent, hsl(var(--dc-border) / 0.4) 20%, hsl(var(--dc-border) / 0.4) 80%, transparent)' 
        }} 
      />

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
          {/* Sort and View Controls - Above Blog Grid */}
          <div className="mb-6 flex items-center justify-between gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                onBlur={() => setTimeout(() => setSortDropdownOpen(false), 200)}
                style={{
                  backgroundColor: 'hsl(var(--dc-brand))',
                  color: 'hsl(var(--dc-on-primary))',
                }}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
                aria-label="Sorteer opties"
                aria-expanded={sortDropdownOpen}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span>Sorteren</span>
                <ChevronDownIcon className="h-4 w-4" aria-hidden />
              </button>
              {sortDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-2 rounded-lg shadow-lg z-10 min-w-[200px]"
                  style={{
                    backgroundColor: 'hsl(var(--dc-surface))',
                    border: '1px solid hsl(var(--dc-border))',
                  }}
                >
                  <button
                    onClick={() => { handleSortChange('newest'); setSortDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 first:rounded-t-lg flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentSort === 'newest' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    Nieuwste eerst
                  </button>
                  <button
                    onClick={() => { handleSortChange('oldest'); setSortDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentSort === 'oldest' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    Oudste eerst
                  </button>
                  <button
                    onClick={() => { handleSortChange('viewCount'); setSortDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentSort === 'viewCount' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    Populairste
                  </button>
                  <button
                    onClick={() => { handleSortChange('readTime'); setSortDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 last:rounded-b-lg flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentSort === 'readTime' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    Kortste leestijd
                  </button>
                </div>
              )}
            </div>

            {/* View Selector */}
            <div className="relative">
              <button
                onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
                onBlur={() => setTimeout(() => setViewDropdownOpen(false), 200)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(var(--dc-brand))'
                  e.currentTarget.style.color = 'hsl(var(--dc-brand))'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(var(--dc-border))'
                  e.currentTarget.style.color = 'hsl(var(--dc-text))'
                }}
                style={{
                  backgroundColor: 'hsl(var(--dc-surface-98))',
                  borderColor: 'hsl(var(--dc-border))',
                  color: 'hsl(var(--dc-text))',
                }}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-[hsl(var(--dc-surface-90))] hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
                aria-label="Weergave opties"
                aria-expanded={viewDropdownOpen}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Weergave</span>
                <ChevronDownIcon className="h-4 w-4" aria-hidden />
              </button>
              {viewDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 rounded-lg shadow-lg z-10 min-w-[150px]"
                  style={{
                    backgroundColor: 'hsl(var(--dc-surface))',
                    border: '1px solid hsl(var(--dc-border))',
                  }}
                >
                  <button
                    onClick={() => { setViewMode('grid'); setViewDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 first:rounded-t-lg flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: viewMode === 'grid' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    Raster
                  </button>
                  <button
                    onClick={() => { setViewMode('list'); setViewDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 last:rounded-b-lg flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: viewMode === 'list' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    Lijst
                  </button>
                </div>
              )}
            </div>
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
