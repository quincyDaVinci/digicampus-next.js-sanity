import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {client} from '@sanity/lib/client'
import {groq} from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@sanity/lib/image'
import {CalendarIcon, ClockIcon, ChevronLeftIcon} from '@/components/icons/FeatherIcons'
import Breadcrumbs from '@/components/Breadcrumbs'
import {PortableText} from 'next-sanity'
import ImageLightbox from '@/components/ImageLightbox'
import AuthorCard from '@/components/AuthorCard'
import ParallaxImage from '@/components/ParallaxImage'
import BlogSection from '@/components/sections/BlogSection'

type BlogPost = {
  _id: string
  title: string
  slug: string
  publishedAt: string
  estimatedReadTime?: number
  viewCount?: number
  mainImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  author?: {
    _id: string
    name: string
    role?: string
    company?: string
    bio?: string
    image?: {
      asset: {
        _id: string
        url: string
      }
    }
  }
  categories?: Array<{
    _id: string
    title: string
    slug: string
  }>
  tags?: Array<{ _ref?: string }>
  relatedPosts?: {
    heading?: string
    subheading?: string
    relationMode?: 'recent' | 'tags' | 'author' | 'readTime'
  }
  body?: Array<any>
  excerpt?: string
}

const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    estimatedReadTime,
    viewCount,
    mainImage,
    tags[]{_ref, _type},
    relatedPosts,
    author->{
      _id,
      name,
      role,
      company,
      bio,
      image{
        asset->{
          _id,
          url
        }
      }
    },
    categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params
  
  try {
    const post = await client.fetch<BlogPost | null>(blogPostQuery, {slug})
    
    if (!post) {
      return {
        title: 'Blog niet gevonden',
      }
    }

    return {
      title: post.title,
      description: post.excerpt || `Lees ${post.title} op Digicampus`,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog',
    }
  }
}

export default async function BlogPostPage({params}: PageProps) {
  const {slug} = await params

  try {
    const post = await client.fetch<BlogPost | null>(blogPostQuery, {slug})

    if (!post) {
      notFound()
    }

    // Format date on server only to avoid hydration mismatch
    const formattedDate = post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString('nl-NL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'Europe/Amsterdam',
        })
      : null

    const imageUrl = post.mainImage?.asset
      ? urlFor(post.mainImage).width(1200).height(630).fit('crop').auto('format').url()
      : null

    // A larger / higher-res source for the parallax inner image so vertical movement
    // doesn't reveal empty/cropped edges. Request a larger cropped variant centered on hotspot.
    const imageFullSrc = post.mainImage?.asset
      ? urlFor(post.mainImage).width(2000).height(1200).fit('crop').auto('format').url()
      : null

    const authorImageUrl = post.author?.image?.asset
      ? urlFor(post.author.image).width(96).height(96).fit('crop').auto('format').url()
      : null

      const breadcrumbs = [
      {label: 'Home', href: '/'},
      {label: 'Blog', href: '/blog'},
      {label: post.title},
    ]

    return (
      <>
        <div className="border-b border-dc bg-dc-surface-98">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>
        
        <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[hsl(var(--dc-brand))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))] rounded-lg mb-8"
          style={{color: 'hsl(var(--dc-text) / 0.7)'}}
        >
          <ChevronLeftIcon className="h-4 w-4" aria-hidden />
          Terug naar blog
        </Link>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Link
                key={category._id}
                href={`/blog?category=${category.slug}`}
                className="rounded-full px-3 py-1 text-sm font-medium transition-colors hover:bg-[hsl(var(--dc-brand)/0.15)]"
                style={{
                  backgroundColor: 'hsl(var(--dc-brand)/0.1)',
                  color: 'hsl(var(--dc-brand))',
                }}
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{color: 'hsl(var(--dc-text))'}}>
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="mb-8 flex flex-wrap items-center gap-4 text-sm" style={{color: 'hsl(var(--dc-text) / 0.7)'}}>
          {formattedDate && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" aria-hidden />
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </div>
          )}
          {post.estimatedReadTime && (
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4" aria-hidden />
              <span>{post.estimatedReadTime} min leestijd</span>
            </div>
          )}
        </div>

        {/* Author */}
        {post.author && (
          <AuthorCard author={post.author} authorImageUrl={authorImageUrl} />
        )}

        {/* Main image */}
        {imageUrl && (
          <ParallaxImage
            src={imageUrl}
            fullSrc={imageFullSrc ?? undefined}
            alt={post.mainImage?.alt || post.title}
            displayHeight={630}
            extraHeight={300}
          />
        )}

        {/* Body content */}
        {post.body && post.body.length > 0 && (
          <div className="prose prose-lg max-w-none" style={{color: 'hsl(var(--dc-text))'}}>
            <PortableText
              value={post.body}
              components={{
                block: {
                  h2: ({children}) => <h2 className="text-3xl font-bold mt-12 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl font-bold mt-10 mb-4">{children}</h3>,
                  h4: ({children}) => <h4 className="text-xl font-bold mt-8 mb-3">{children}</h4>,
                  blockquote: ({children}) => (
                    <blockquote
                      className="border-l-4 pl-4 my-6 italic"
                      style={{borderColor: 'hsl(var(--dc-brand))'}}
                    >
                      {children}
                    </blockquote>
                  ),
                  normal: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc list-outside ml-6 mb-4 space-y-2">{children}</ul>,
                  number: ({children}) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-2">{children}</ol>,
                },
                listItem: {
                  bullet: ({children}) => <li className="leading-relaxed">{children}</li>,
                  number: ({children}) => <li className="leading-relaxed">{children}</li>,
                },
                types: {
                  image: ({value}) => {
                    const imageUrl = value?.asset ? urlFor(value).width(1200).height(675).fit('crop').auto('format').url() : null
                    if (!imageUrl) return null
                    
                    // Size classes based on the size field
                    const sizeClasses = {
                      small: 'max-w-sm mx-auto',
                      medium: 'max-w-2xl mx-auto',
                      large: 'w-full',
                    }
                    const sizeClass = sizeClasses[value?.size as keyof typeof sizeClasses] || sizeClasses.large
                    
                    return (
                      <ImageLightbox
                        src={imageUrl}
                        alt={value?.alt || ''}
                        width={1200}
                        height={675}
                        className="rounded-lg w-full"
                        caption={value?.caption}
                        sizeClass={sizeClass}
                      />
                    )
                  },
                },
                marks: {
                  link: ({value, children}) => {
                    const href = value?.href || '#'
                    return (
                      <a
                        href={href}
                        className="text-[hsl(var(--dc-brand))] hover:underline"
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    )
                  },
                },
              }}
            />
          </div>
        )}

        {/* Back to blog link */}
        <div className="mt-12 pt-8 border-t" style={{borderColor: 'hsl(var(--dc-border) / 0.3)'}}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors hover:bg-[hsl(var(--dc-brand)/0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))]"
            style={{color: 'hsl(var(--dc-brand))'}}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden />
            Terug naar alle blogs
          </Link>
        </div>
      </article>

      {/* Blogs section (more posts) */}
      {/* Related / configurable BlogSection (always displayed) */}
      {
        (() => {
          const rp = post.relatedPosts || {}

          // Determine tags to use (post.tags when useTags is true)
          // Determine relation mode
          const mode = rp.relationMode || 'tags'

          const mappedTags = mode === 'tags' && Array.isArray(post.tags) ? post.tags.map((t: any) => ({ _ref: t._ref || t._id || t })) : undefined

          // Author reference if requested
          const authorRef = mode === 'author' && post.author ? { _ref: post.author._id } : undefined

          // If readTime mode, compute a small window around the current post's estimatedReadTime
          let minReadTime: number | undefined
          let maxReadTime: number | undefined
          if (mode === 'readTime' && typeof post.estimatedReadTime === 'number') {
            const delta = Math.max(1, Math.round(post.estimatedReadTime * 0.25)) // 25% tolerance
            minReadTime = Math.max(1, Math.round(post.estimatedReadTime - delta))
            maxReadTime = Math.round(post.estimatedReadTime + delta)
          }

          return (
            <BlogSection
              _type="blogSection"
              _key="more-blogs"
              heading={rp.heading || 'Meer blogs'}
              subheading={rp.subheading ? rp.subheading : undefined}
              // Let BlogSection decide limit/responsiveness; pass relation flags and filters
              useContextTags={mode === 'tags'}
              useContextAuthor={mode === 'author'}
              tags={mappedTags}
              author={authorRef}
              minReadTime={minReadTime}
              maxReadTime={maxReadTime}
            />
          )
        })()
      }
      </>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}
