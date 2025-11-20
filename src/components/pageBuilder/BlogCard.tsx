import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@sanity/lib/image'
import type {BlogCardComponent, BlogCardResolvedPost} from '@/types/pageBuilder'
import {CalendarIcon, getFeatherIcon} from '@/components/icons/FeatherIcons'
import {tokenToCss} from './colorUtils'

interface BlogCardProps {
  component: BlogCardComponent
}

const toneStyles: Record<NonNullable<BlogCardComponent['tone']>, {background: string; border: string; color: string}> = {
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
        const typedBlock = block as {_type?: string; children?: unknown[]}
        if (typedBlock._type === 'block' && Array.isArray(typedBlock.children)) {
          typedBlock.children.forEach((child: unknown) => {
            if (typeof child === 'object' && child !== null) {
              const typedChild = child as {text?: unknown}
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

function BlogCardItem({post, ctaLabel, tone, showAuthor = true, borderRadius = 'default'}: {post: BlogCardResolvedPost; ctaLabel: string; tone: NonNullable<BlogCardComponent['tone']>; showAuthor?: boolean; borderRadius?: 'default' | 'small'}) {
  const style = toneStyles[tone]
  const href = post.slug ? `/blog/${post.slug}` : '#'
  const isInternal = href.startsWith('/')
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(post.publishedAt))
    : null
  const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(800).height(520).fit('crop').auto('format').url() : null
  const authorImageUrl = post.author?.image?.asset ? urlFor(post.author.image).width(96).height(96).fit('crop').auto('format').url() : null
  const firstCategory = post.categories?.[0]?.title
  const estimatedReadTime = post.estimatedReadTime ?? calculateReadTimeFromBody(post.body)
  const ClockIconComponent = getFeatherIcon('clock')

  const roundedClass = borderRadius === 'small' ? 'rounded-xl' : 'rounded-3xl'
  const CardInner = (
    <article
      className={`group flex h-full flex-col ${roundedClass} shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-within:ring-4 focus-within:ring-[hsl(var(--dc-focus))]`}
      style={{
        background: style.background,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
    >
      {imageUrl ? (
        <div className={`relative overflow-hidden ${borderRadius === 'small' ? 'rounded-t-xl' : 'rounded-t-3xl'}`} style={{backgroundColor: '#ffffff', maxHeight: '220px'}}>
          <div className="relative w-full transition-transform duration-300 group-hover:scale-[1.03]">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || ''}
              width={800}
              height={220}
              className="block h-[220px] w-full object-cover"
              priority={false}
              style={{ display: 'block', width: '100%' }}
            />
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
            {/* Hover overlay - fades in on hover */}
            <div
              className="pointer-events-none absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
              className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ color: '#ffffff' }}
              aria-hidden="true"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  {firstCategory ? (
                    <span className="inline-block rounded-full bg-[rgba(255,255,255,0.2)] px-3 py-1 text-sm font-medium backdrop-blur-sm">
                      {firstCategory}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col items-end gap-1.5 text-sm font-medium">
                  {formattedDate ? (
                    <div className="inline-flex items-center gap-1.5">
                      <CalendarIcon aria-hidden className="h-4 w-4" />
                      <time dateTime={post.publishedAt}>{formattedDate}</time>
                    </div>
                  ) : null}
                  {estimatedReadTime ? (
                    <div className="inline-flex items-center gap-1.5">
                      {ClockIconComponent ? <ClockIconComponent aria-hidden className="h-4 w-4" /> : null}
                      <span>{estimatedReadTime} min leestijd</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold leading-snug tracking-tight">{post.title}</h3>
          {post.summary ? (
            <p className="text-sm leading-relaxed text-[hsl(var(--dc-text)/0.85)]">{post.summary}</p>
          ) : null}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          {showAuthor && (post.author?.name || post.author?.role) && (
            <div className="flex items-center gap-3">
              {authorImageUrl ? (
                <Image
                  src={authorImageUrl}
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
              <div className="flex flex-col">
                {post.author?.name ? (
                  <span className="text-sm font-medium leading-tight">{post.author.name}</span>
                ) : null}
                {post.author?.role ? (
                  <span className="text-xs text-[hsl(var(--dc-text)/0.65)]">{post.author.role}</span>
                ) : null}
                {post.author?.company ? (
                  <span className="text-xs text-[hsl(var(--dc-text)/0.5)]">{post.author.company}</span>
                ) : null}
              </div>
            </div>
          )}
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap relative transition-colors duration-200 group-hover:text-[hsl(var(--dc-brand))] group-focus-within:text-[hsl(var(--dc-brand))]"
          >
              <span className="relative">
                {ctaLabel}
                <span
                  aria-hidden
                  className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left scale-x-0 bg-[hsl(var(--dc-brand))] transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100"
                  style={{ borderRadius: '2px', pointerEvents: 'none' }}
                />
              </span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
          </span>
        </div>
      </div>
    </article>
  )

  if (isInternal) {
    return (
      <Link href={href} aria-label={`${ctaLabel}: ${post.title}`} className="block focus-visible:outline-none">
        {CardInner}
      </Link>
    )
  }
  return (
    <a href={href} aria-label={`${ctaLabel}: ${post.title}`} className="block focus-visible:outline-none">
      {CardInner}
    </a>
  )
}

export default function BlogCard({component}: BlogCardProps) {
  const posts = Array.isArray(component.resolvedPost)
    ? component.resolvedPost
    : component.resolvedPost
      ? [component.resolvedPost]
      : []
  const tone = component.tone ?? 'surface'
  const ctaLabel = component.ctaLabel ?? 'Lees meer'
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

  const gridClass = gridMode === 'single' 
    ? 'grid gap-6 grid-cols-1'
    : 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3'

  return (
    <div className={gridClass}>
      {posts.map((post) => (
        <BlogCardItem key={post._id} post={post} ctaLabel={ctaLabel} tone={tone} showAuthor={showAuthor} borderRadius={borderRadius} />
      ))}
    </div>
  )
}

