'use client'

import {useState, useRef} from 'react'
import {useRouter, useSearchParams, usePathname} from 'next/navigation'
import {ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from '@/components/icons/FeatherIcons'
import BlogCard from '@/components/pageBuilder/BlogCard'
import type { BlogCardComponent, BlogCardResolvedPost } from '@/types/pageBuilder'
import Breadcrumbs from '@/components/Breadcrumbs'
import {getBlogTranslation} from '@/lib/blogTranslations'

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
  const pathname = usePathname()
  const localePrefix = pathname?.split('/')?.[1]
  const basePrefix = localePrefix ? `/${localePrefix}` : ''
  const lang = localePrefix || 'nl'
  const t = (key: Parameters<typeof getBlogTranslation>[1]) => getBlogTranslation(lang, key)

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

    const base = basePrefix ? `${basePrefix}/blog` : '/blog'

    return queryString ? `${base}?${queryString}` : base
  }

  // Handle filter/sort changes
  const handleCategoryChange = (categorySlug: string | null) => {
    const url = buildUrl({category: categorySlug})
    router.push(url)
    
    // Announce to screen readers
    if (categorySlug) {
      const category = categories.find(c => c.slug === categorySlug)
      setAnnouncement(`${t('filteredByCategory')} ${category?.title || categorySlug}. ${totalPosts} ${t('postsFound')}.`)
    } else {
      setAnnouncement(`${t('allCategoriesShown')}. ${totalPosts} ${t('postsFound')}.`)
    }
  }

  const handleSortChange = (sort: string) => {
    const url = buildUrl({sort})
    router.push(url)
    
    const sortLabels: Record<string, string> = {
      newest: t('newest'),
      oldest: t('oldest'),
      viewCount: t('mostPopular'),
      readTime: t('shortestReadTime'),
    }
    setAnnouncement(`${t('sortedBy')} ${sortLabels[sort] || sort}`)
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
    <Breadcrumbs
        items={[
          {label: t('home'), href: '/'},
          {label: t('blog')},
        ]}
        className="mb-4"
      />
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-dc">{title}</h1>
        {description && (
          <p className="text-lg text-dc-muted max-w-3xl">{description}</p>
        )}
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('filterByCategory')}>
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
                e.currentTarget.style.boxShadow = 'inset 0 0 0 1px hsl(var(--dc-brand))'
              }
            }}
            onMouseLeave={(e) => {
              if (currentCategory) {
                e.currentTarget.style.borderColor = 'hsl(var(--dc-border))'
                e.currentTarget.style.color = 'hsl(var(--dc-text))'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
            aria-pressed={!currentCategory}
          >
            {t('allCategories')}
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category.slug)}
              style={{
                backgroundColor: currentCategory === category.slug ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-surface-98))',
                borderColor: currentCategory === category.slug ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-border))',
                color: currentCategory === category.slug ? 'hsl(var(--dc-on-primary))' : 'hsl(var(--dc-text))',
                transition: 'border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease'
              }}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
              onMouseEnter={(e) => {
                if (currentCategory !== category.slug) {
                  e.currentTarget.style.borderColor = 'hsl(var(--dc-brand))'
                  e.currentTarget.style.color = 'hsl(var(--dc-brand))'
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1px hsl(var(--dc-brand))'
                }
              }}
              onMouseLeave={(e) => {
                if (currentCategory !== category.slug) {
                  e.currentTarget.style.borderColor = 'hsl(var(--dc-border))'
                  e.currentTarget.style.color = 'hsl(var(--dc-text))'
                  e.currentTarget.style.boxShadow = 'none'
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
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                onBlur={() => setTimeout(() => setSortDropdownOpen(false), 200)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'hsl(var(--dc-brand))'
                  e.currentTarget.style.borderColor = 'hsl(var(--dc-brand))'
                  e.currentTarget.style.color = 'hsl(var(--dc-on-primary))'
                }}
                onMouseLeave={(e) => {
                  if (!sortDropdownOpen) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--dc-surface-98))'
                    e.currentTarget.style.borderColor = 'hsl(var(--dc-border))'
                    e.currentTarget.style.color = 'hsl(var(--dc-text))'
                  }
                }}
                style={{
                  backgroundColor: sortDropdownOpen ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-surface-98))',
                  borderColor: sortDropdownOpen ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-border))',
                  color: sortDropdownOpen ? 'hsl(var(--dc-on-primary))' : 'hsl(var(--dc-text))',
                }}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
                aria-label={t('sortOptions')}
                aria-expanded={sortDropdownOpen}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                <span>{t('sort')}</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              {sortDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-2 rounded-lg shadow-lg z-10 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200"
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
                    {t('newest')}
                  </button>
                  <button
                    onClick={() => { handleSortChange('oldest'); setSortDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentSort === 'oldest' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    {t('oldest')}
                  </button>
                  <button
                    onClick={() => { handleSortChange('viewCount'); setSortDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentSort === 'viewCount' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    {t('mostPopular')}
                  </button>
                  <button
                    onClick={() => { handleSortChange('readTime'); setSortDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 last:rounded-b-lg flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentSort === 'readTime' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    {t('shortestReadTime')}
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
                  e.currentTarget.style.backgroundColor = 'hsl(var(--dc-brand))'
                  e.currentTarget.style.borderColor = 'hsl(var(--dc-brand))'
                  e.currentTarget.style.color = 'hsl(var(--dc-on-primary))'
                }}
                onMouseLeave={(e) => {
                  if (!viewDropdownOpen) {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--dc-surface-98))'
                    e.currentTarget.style.borderColor = 'hsl(var(--dc-border))'
                    e.currentTarget.style.color = 'hsl(var(--dc-text))'
                  }
                }}
                style={{
                  backgroundColor: viewDropdownOpen ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-surface-98))',
                  borderColor: viewDropdownOpen ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-border))',
                  color: viewDropdownOpen ? 'hsl(var(--dc-on-primary))' : 'hsl(var(--dc-text))',
                }}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-dc-focus"
                aria-label={t('viewOptions')}
                aria-expanded={viewDropdownOpen}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>{t('view')}</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${viewDropdownOpen ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              {viewDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 rounded-lg shadow-lg z-10 min-w-[150px] animate-in fade-in slide-in-from-top-2 duration-200"
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
                    {t('grid')}
                  </button>
                  <button
                    onClick={() => { setViewMode('list'); setViewDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-[hsl(var(--dc-brand)/0.08)] hover:pl-5 last:rounded-b-lg flex items-center gap-2"
                    style={{ color: 'hsl(var(--dc-text))' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: viewMode === 'list' ? 'hsl(var(--dc-brand))' : 'transparent' }} />
                    {t('list')}
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
                ctaLabel: t('readMore'),
                borderRadius: 'small',
                gridMode: viewMode === 'list' ? 'list' : 'default',
                resolvedPost: mappedPosts,
              }
              return <BlogCard component={cardComponent} />
            })()
          ) : (
            <div className="rounded-2xl border border-dashed border-dc p-12 text-center">
              <p className="text-dc-muted">{t('noPosts')}</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label={t('page')}>
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
                aria-label={t('previous')}
                aria-disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" aria-hidden />
                {t('previous')}
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
                      aria-label={`${t('page')} ${page}`}
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
                aria-label={t('next')}
                aria-disabled={currentPage === totalPages}
              >
                {t('next')}
                <ChevronRightIcon className="h-4 w-4" aria-hidden />
              </button>
            </nav>
          )}
        </div>

        {/* Highlighted Posts Sidebar */}
        {highlightedPosts.length > 0 && (
          <aside className="space-y-4 lg:border-l lg:pl-8" style={{ borderColor: 'hsl(var(--dc-border) / 0.15)' }} aria-label={t('highlightedPosts')}>
            <h2 className="text-lg font-semibold text-dc">{t('highlightedPosts')}</h2>
            <BlogCard
              component={{
                _type: 'blogCardComponent',
                _key: 'highlighted-posts',
                tone: 'surface',
                ctaLabel: t('readMore'),
                gridMode: 'single',
                showAuthor: false,
                compact: true,
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
