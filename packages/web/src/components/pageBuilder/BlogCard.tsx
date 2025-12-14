import SanityNextImage from '@/components/SanityNextImage'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// plugin URL handling done in SanityNextImage
import type { BlogCardComponent, BlogCardResolvedPost } from '@/types/pageBuilder'
import { CalendarIcon, getFeatherIcon } from '@/components/icons/FeatherIcons'
import { getBlogTranslation } from '@/lib/blogTranslations'
import type { CSSProperties } from 'react'

interface BlogCardProps {
  component: BlogCardComponent
}

const toneStyles: Record<NonNullable<BlogCardComponent['tone']>, { background: string; border: string; color: string }> = {
  surface: {
    background: 'hsl(var(--dc-surface))',
    border: 'hsl(var(--dc-border)/0.2)',
    color: 'hsl(var(--dc-text))',
  },
  accent: {
    background: 'hsl(var(--dc-brand)/0.08)',
    border: 'hsl(var(--dc-brand)/0.3)',
    color: 'hsl(var(--dc-text))',
  },
  contrast: {
    background: 'linear-gradient(135deg, hsl(var(--dc-primary)) 0%, hsl(var(--dc-brand)) 100%)',
    border: 'hsl(var(--dc-on-primary)/0.2)',
    color: 'hsl(var(--dc-on-primary))',
  },
}

// Helper function to calculate read time from text body
function calculateReadTimeFromBody(body: unknown): number | undefined {
  if (!body || !Array.isArray(body)) return undefined

  let wordCount = 0
  const traverse = (blocks: unknown[]) => {
    blocks.forEach((block: unknown) => {
      if (typeof block === 'object' && block !== null) {
        const typedBlock = block as { _type?: string; children?: unknown[] }
        if (typedBlock._type === 'block' && Array.isArray(typedBlock.children)) {
          typedBlock.children.forEach((child: unknown) => {
            if (typeof child === 'object' && child !== null) {
              const typedChild = child as { text?: unknown }
              if (typeof typedChild.text === 'string') {
                wordCount += typedChild.text.split(/\s+/).filter(Boolean).length
              }
            }
          })
        }
        if (Array.isArray(typedBlock.children)) {
          traverse(typedBlock.children)
        }
      }
    })
  }

  traverse(body)
  return wordCount > 0 ? Math.max(1, Math.round(wordCount / 200)) : undefined
}

function BlogCardItem({ post, ctaLabel, tone, showAuthor = true, borderRadius = 'default', layout = 'grid', compact = false }: { post: BlogCardResolvedPost; ctaLabel: string; tone: NonNullable<BlogCardComponent['tone']>; showAuthor?: boolean; borderRadius?: 'default' | 'small'; layout?: 'grid' | 'list'; compact?: boolean }) {
  const style = toneStyles[tone]
  const pathname = usePathname()
  const lang = pathname?.split('/')?.[1] || 'nl'
  const t = (key: Parameters<typeof getBlogTranslation>[1]) => getBlogTranslation(lang, key)
  const href = post.slug ? `/${lang}/blog/${post.slug}` : '#'
  const isInternal = href.startsWith('/')
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.publishedAt))
    : null
  // Use presence of assets to gate rendering; actual rendering uses `SanityNextImage` which uses the plugin
  const hasMainImage = Boolean(post.mainImage?.asset)
  const hasAuthorImage = Boolean(post.author?.image?.asset)
  const categories = post.categories || []
  const estimatedReadTime = post.estimatedReadTime ?? calculateReadTimeFromBody(post.body)
  const ClockIconComponent = getFeatherIcon('clock')

  const roundedClass = borderRadius === 'small' ? 'rounded-xl' : 'rounded-3xl'
  const CARD_MIN_HEIGHT = compact ? '420px' : '520px'

  // Render different layouts for grid vs list
  if (layout === 'list') {
    // List layout: horizontal card with image on the left
    const ImageColumn = hasMainImage ? (
      <div className="flex-shrink-0 w-36 sm:w-40 md:w-48 overflow-hidden rounded-l-lg" style={{ backgroundColor: '#ffffff' }}>
        {(() => {
          const mainImageBlur = (post.mainImage as unknown as { blurDataURL?: string })?.blurDataURL
          return (
            <SanityNextImage
              image={post.mainImage}
              alt={post.mainImage?.alt || ''}
              width={compact ? 360 : 480}
              height={compact ? 220 : 300}
              className="h-full w-full object-cover"
              priority={false}
              placeholder={mainImageBlur ? 'blur' : undefined}
            />
          )
        })()}
      </div>
    ) : null

    const CardInnerList = (
      <article
        aria-labelledby={`blog-title-${post._id}`}
        className={`flex h-auto flex-row ${roundedClass} shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl overflow-hidden`}
        style={{ background: style.background, border: `1px solid ${style.border}`, color: style.color }}
      >
        {ImageColumn}
        <div className="flex flex-1 flex-col gap-4 p-6 min-w-0">
          <div className="space-y-2 min-w-0">
            <h3 className={`${compact ? 'text-base' : 'text-lg'} font-semibold leading-snug tracking-tight break-words whitespace-normal`}>{post.title}</h3>
            {post.summary ? (
              <p className="text-sm leading-relaxed text-[hsl(var(--dc-text)/0.85)] break-words whitespace-normal" style={{ display: '-webkit-box', WebkitLineClamp: 8, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as CSSProperties}>{post.summary}</p>
            ) : null}
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 min-w-0">
            {showAuthor && (post.author?.name || post.author?.role) && (
              <div className="flex items-center gap-3">
                {hasAuthorImage ? (
                  <SanityNextImage
                    image={post.author?.image}
                    alt={post.author?.name || ''}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-[hsl(var(--dc-border)/0.4)]"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--dc-brand)/0.15)] text-[hsl(var(--dc-brand))]" aria-hidden>
                    {post.author?.name ? post.author.name.charAt(0) : 'A'}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  {post.author?.name ? (
                    <span className="text-sm font-medium leading-tight max-w-[10rem] sm:max-w-[12rem]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.author.name}</span>
                  ) : null}
                  {post.author?.role ? (
                    <span className="text-xs text-[hsl(var(--dc-text)/0.65)] max-w-[10rem] sm:max-w-[12rem]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.author.role}</span>
                  ) : null}
                </div>
              </div>
            )}
            <span className="flex-shrink-0">
              <span className="sr-only">{ctaLabel}</span>
              <span className="relative inline-flex items-center justify-center h-9 w-9 rounded-full bg-[hsl(var(--dc-surface-98))] text-[hsl(var(--dc-text))] shadow-sm overflow-hidden transition-all duration-200 transform group-hover:scale-[1.06] group-focus-within:scale-[1.06] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-brand)/0.28)]" aria-hidden>
                {/* colored pulse layer */}
                <span aria-hidden className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-30" style={{ background: 'hsl(var(--dc-brand))' }} />
                <svg className="h-4 w-4 relative z-10 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </article>
    )

    if (isInternal) {
      return (
        <Link
          href={href}
          aria-label={`${ctaLabel}: ${post.title}`}
          aria-describedby={post.summary ? `blog-summary-${post._id}` : undefined}
          className="group block rounded-lg overflow-clip focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]"
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault()
              e.currentTarget.click()
            }
          }}
        >
          {CardInnerList}
        </Link>
      )
    }
    return (
      <a
        href={href}
        aria-label={`${ctaLabel}: ${post.title}`}
        aria-describedby={post.summary ? `blog-summary-${post._id}` : undefined}
        className="group block rounded-lg overflow-clip focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]"
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault()
            e.currentTarget.click()
          }
        }}
      >
        {CardInnerList}
      </a>
    )
  }

  // Default (grid) layout follows below
  const CardInner = (
    <article
      className={`flex h-full flex-col ${roundedClass} shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl`}
      style={{
        background: style.background,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
    >
      {hasMainImage ? (
        <div className={`relative overflow-hidden ${borderRadius === 'small' ? 'rounded-t-xl' : 'rounded-t-3xl'}`} style={{ backgroundColor: '#ffffff', maxHeight: compact ? '160px' : '220px' }}>
          <div className="relative w-full transition-transform duration-300 group-hover:scale-[1.03]">
            {(() => {
              const mainImageBlur = (post.mainImage as unknown as { blurDataURL?: string })?.blurDataURL
              return (
                <SanityNextImage
                  image={post.mainImage}
                  alt={post.mainImage?.alt || ''}
                  width={compact ? 640 : 800}
                  height={compact ? 160 : 220}
                  className={compact ? 'block h-[160px] w-full object-cover' : 'block h-[220px] w-full object-cover'}
                  priority={false}
                  style={{ display: 'block', width: '100%' }}
                  placeholder={mainImageBlur ? 'blur' : undefined}
                />
              )
            })()}
            {/* Base overlay - always visible with subtle gradient */}
            <div
              className="pointer-events-none absolute"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 50%)',
              }}
              aria-hidden="true"
            />
            {/* Hover overlay - fades in on hover AND focus */}
            <div
              className="pointer-events-none absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.2) 85%, transparent 100%)',
              }}
              aria-hidden="true"
            />
            {/* Content layer - above both overlays */}
            <div
              className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              style={{ color: '#ffffff' }}
              aria-hidden="true"
            >
              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {categories.filter(Boolean).map((category, idx) => {
                    const typedCategory = category as { _id?: string; slug?: string; title?: string }
                    const key = typedCategory._id || `${typedCategory.slug || 'cat'}-${idx}`
                    return (
                      <span
                        key={key}
                        className="inline-block rounded-full bg-[rgba(255,255,255,0.2)] px-3 py-1 text-sm font-medium backdrop-blur-sm"
                      >
                        {category.title}
                      </span>
                    )
                  })}
                </div>
                <div className="flex flex-col items-end gap-1.5 text-sm font-medium shrink-0">
                  {formattedDate ? (
                    <div className="inline-flex items-center gap-1.5">
                      <CalendarIcon aria-hidden className="h-4 w-4" />
                      <time dateTime={post.publishedAt}>{formattedDate}</time>
                    </div>
                  ) : null}
                  {estimatedReadTime ? (
                    <div className="inline-flex items-center gap-1.5">
                      {ClockIconComponent ? <ClockIconComponent aria-hidden className="h-4 w-4" /> : null}
                      <span>{estimatedReadTime} {t('minRead')}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-6 min-w-0">
        <div className="space-y-3 min-w-0">
          <h3 id={`blog-title-${post._id}`} className={`${compact ? 'text-base' : 'text-lg'} font-semibold leading-snug tracking-tight break-words whitespace-normal`}>{post.title}</h3>
          {post.summary ? (
            <p id={`blog-summary-${post._id}`} className="text-sm leading-relaxed text-[hsl(var(--dc-text)/0.85)] break-words whitespace-normal" style={{ display: '-webkit-box', WebkitLineClamp: 8, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as CSSProperties}>{post.summary}</p>
          ) : null}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 min-w-0">
          {showAuthor && (post.author?.name || post.author?.role) && (
            <div className="flex items-center gap-3">
              {hasAuthorImage ? (
                <SanityNextImage
                  image={post.author?.image}
                  alt={post.author?.name || ''}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[hsl(var(--dc-border)/0.4)]"
                />
              ) : (
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--dc-brand)/0.15)] text-[hsl(var(--dc-brand))]"
                  aria-hidden
                >
                  {post.author?.name ? post.author.name.charAt(0) : 'A'}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                {post.author?.name ? (
                  <span className="text-sm font-medium leading-tight max-w-[12rem]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.author.name}</span>
                ) : null}
                {post.author?.role ? (
                  <span className="text-xs text-[hsl(var(--dc-text)/0.65)] max-w-[12rem]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.author.role}</span>
                ) : null}
                {post.author?.company ? (
                  <span className="text-xs text-[hsl(var(--dc-text)/0.5)] max-w-[12rem]" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.author.company}</span>
                ) : null}
              </div>
            </div>
          )}
          <span className="flex-shrink-0">
            <span className="sr-only">{ctaLabel}</span>
            <span className="relative inline-flex items-center justify-center h-9 w-9 rounded-full bg-[hsl(var(--dc-surface-98))] text-[hsl(var(--dc-text))] shadow-sm overflow-hidden transition-all duration-200 transform group-hover:scale-[1.06] group-focus-within:scale-[1.06] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-brand)/0.28)]" aria-hidden>
              <span aria-hidden className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-30" style={{ background: 'hsl(var(--dc-brand))' }} />
              <svg className="h-4 w-4 relative z-10 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </article>
  )

  if (isInternal) {
    return (
      <Link
        href={href}
        aria-label={`${ctaLabel}: ${post.title}`}
        aria-describedby={post.summary ? `blog-summary-${post._id}` : undefined}
        className="group block rounded-3xl overflow-clip focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]"
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault()
            e.currentTarget.click()
          }
        }}
      >
        {CardInner}
      </Link>
    )
  }
  return (
    <a
      href={href}
      aria-label={`${ctaLabel}: ${post.title}`}
      aria-describedby={post.summary ? `blog-summary-${post._id}` : undefined}
      className="group block rounded-3xl overflow-clip focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]"
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault()
          e.currentTarget.click()
        }
      }}
    >
      {CardInner}
    </a>
  )
}

export default function BlogCard({ component }: BlogCardProps) {
  const posts = Array.isArray(component.resolvedPost)
    ? component.resolvedPost
    : component.resolvedPost
      ? [component.resolvedPost]
      : []
  const tone = component.tone ?? 'surface'
  const ctaLabel = component.ctaLabel ?? 'Read more'
  const gridMode = component.gridMode ?? 'default'
  const showAuthor = component.showAuthor ?? true
  const borderRadius = component.borderRadius ?? 'default'

  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[hsl(var(--dc-border)/0.4)] p-6 text-sm text-[hsl(var(--dc-text)/0.7)]">
        Geen blog gevonden voor de gekozen criteria.
      </div>
    )
  }

  // Support 'list' gridMode which renders a stacked list of horizontal items
  if (gridMode === 'list') {
    return (
      <div className="flex flex-col">
        {posts.map((post) => (
          <div key={post._id} className="py-4">
            <BlogCardItem post={post} ctaLabel={ctaLabel} tone={tone} showAuthor={showAuthor} borderRadius={borderRadius} layout="list" compact={component.compact} />
          </div>
        ))}
      </div>
    )
  }

  // Use CSS Grid with clamp + minmax + fr units for fully responsive columns.
  // The `auto-fit` behaviour collapses empty tracks so cards fill the
  // available space. `clamp()` provides a sensible min/ideal/max width
  // for each card — change the values if you want wider or narrower cards.
  const gridStyle: React.CSSProperties = gridMode === 'single'
    ? { display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', width: '100%' }
    : {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(16rem, 20ch, 28rem), 1fr))',
      gap: '1.5rem',
      width: '100%',
      alignItems: 'stretch',
    }

  return (
    <div style={gridStyle}>
      {posts.map((post) => (
        <BlogCardItem key={post._id} post={post} ctaLabel={ctaLabel} tone={tone} showAuthor={showAuthor} borderRadius={borderRadius} compact={component.compact} />
      ))}
    </div>
  )
}

