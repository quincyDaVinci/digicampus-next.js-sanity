import Image from 'next/image'
import Link from 'next/link'

import {urlFor} from '@sanity/lib/image'

import type {BlogCardComponent, BlogCardResolvedPost} from '@/types/pageBuilder'

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

function BlogCardItem({post, ctaLabel, tone}: {post: BlogCardResolvedPost; ctaLabel: string; tone: NonNullable<BlogCardComponent['tone']>}) {
  const style = toneStyles[tone]
  const href = post.slug ? `/blog/${post.slug}` : '#'
  const isInternal = href.startsWith('/')
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(post.publishedAt))
    : null
  const imageUrl = post.mainImage?.asset ? urlFor(post.mainImage).width(800).height(520).fit('crop').auto('format').url() : null

  const CardContent = (
    <article
  className="flex h-full flex-col gap-4 rounded-3xl p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-within:ring-4 focus-within:ring-[hsl(var(--dc-focus))]"
      style={{
        background: style.background,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
    >
      {imageUrl ? (
        <div className="relative overflow-hidden rounded-2xl" style={{backgroundColor: tokenToCss('bg-soft')}}>
          <Image src={imageUrl} alt={post.mainImage?.alt || ''} width={800} height={520} className="h-auto w-full object-cover" />
        </div>
      ) : null}
      <div className="space-y-2">
        {formattedDate ? (
          <time dateTime={post.publishedAt} className="text-sm uppercase tracking-wide opacity-75">
            {formattedDate}
          </time>
        ) : null}
        <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
        {post.summary ? (
          <p className="text-sm leading-relaxed opacity-90">{post.summary}</p>
        ) : null}
        {post.author?.name ? (
          <p className="text-xs uppercase tracking-wide opacity-70">Door {post.author.name}</p>
        ) : null}
      </div>
      <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold">
        {ctaLabel}
        <span aria-hidden>→</span>
      </span>
    </article>
  )

  if (isInternal) {
    return (
      <Link href={href} aria-label={`${ctaLabel}: ${post.title}`} className="block focus-visible:outline-none">
        {CardContent}
      </Link>
    )
  }

  return (
    <a href={href} aria-label={`${ctaLabel}: ${post.title}`} className="block focus-visible:outline-none">
      {CardContent}
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

