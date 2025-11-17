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

function BlogCardItem({post, ctaLabel, tone}: {post: BlogCardResolvedPost; ctaLabel: string; tone: NonNullable<BlogCardComponent['tone']>}) {
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
  const HourglassIcon = getFeatherIcon('hourglass')

  const CardInner = (
    <article
      className="group flex h-full flex-col rounded-3xl shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-within:ring-4 focus-within:ring-[hsl(var(--dc-focus))]"
      style={{
        background: style.background,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
    >
      {imageUrl ? (
        <div className="relative overflow-hidden rounded-t-3xl" style={{backgroundColor: tokenToCss('bg-soft')}}>
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || ''}
            width={800}
            height={520}
            className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.2) 85%, transparent 100%)',
              color: '#ffffff',
            }}
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
                    {HourglassIcon ? <HourglassIcon aria-hidden className="h-4 w-4" /> : null}
                    <span>{estimatedReadTime} min leestijd</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-xs italic opacity-75">
                    Leestijd niet beschikbaar
                  </div>
                )}
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
        {(post.author?.name || post.author?.role) && (
          <div className="mt-auto flex items-center justify-between gap-3">
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
            <span className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
              {ctaLabel}
              <span aria-hidden>→</span>
            </span>
          </div>
        )}
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

  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-[hsl(var(--dc-border)/0.4)] p-6 text-sm text-[hsl(var(--dc-text)/0.7)]">
        Geen blog gevonden voor de gekozen criteria.
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCardItem key={post._id} post={post} ctaLabel={ctaLabel} tone={tone} />
      ))}
    </div>
  )
}

