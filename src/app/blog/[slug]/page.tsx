import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {client} from '@sanity/lib/client'
import {groq} from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import {urlFor} from '@sanity/lib/image'
import {CalendarIcon, ClockIcon, ChevronLeftIcon} from '@/components/icons/FeatherIcons'

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
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    },
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

    const formattedDate = post.publishedAt
      ? new Intl.DateTimeFormat('nl-NL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(post.publishedAt))
      : null

    const imageUrl = post.mainImage?.asset
      ? urlFor(post.mainImage).width(1200).height(630).fit('crop').auto('format').url()
      : null

    const authorImageUrl = post.author?.image?.asset
      ? urlFor(post.author.image).width(96).height(96).fit('crop').auto('format').url()
      : null

    return (
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
          <Link
            href={`/auteur/${post.author._id}`}
            className="mb-8 flex items-center gap-4 rounded-2xl p-4 transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))] focus-visible:ring-offset-2"
            style={{backgroundColor: 'hsl(var(--dc-surface-98))', border: '1px solid hsl(var(--dc-border) / 0.2)'}}
          >
            {authorImageUrl ? (
              <Image
                src={authorImageUrl}
                alt={post.author.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-[hsl(var(--dc-border)/0.4)]"
              />
            ) : (
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold"
                style={{
                  backgroundColor: 'hsl(var(--dc-brand)/0.15)',
                  color: 'hsl(var(--dc-brand))',
                }}
                aria-hidden
              >
                {post.author.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-semibold" style={{color: 'hsl(var(--dc-text))'}}>
                {post.author.name}
              </div>
              {post.author.role && (
                <div className="text-sm" style={{color: 'hsl(var(--dc-text) / 0.7)'}}>
                  {post.author.role}
                  {post.author.company && ` bij ${post.author.company}`}
                </div>
              )}
            </div>
          </Link>
        )}

        {/* Main image */}
        {imageUrl && (
          <div className="mb-12 overflow-hidden rounded-2xl" style={{backgroundColor: '#ffffff'}}>
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              width={1200}
              height={630}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Body content */}
        {post.body && post.body.length > 0 && (
          <div className="prose prose-lg max-w-none" style={{color: 'hsl(var(--dc-text))'}}>
            {post.body.map((block: any, index: number) => {
              if (block._type === 'block') {
                const children = block.children?.map((child: any, childIndex: number) => {
                  if (child._type === 'span') {
                    return <span key={childIndex}>{child.text}</span>
                  }
                  return null
                })

                switch (block.style) {
                  case 'h1':
                    return <h2 key={index} className="text-3xl font-bold mt-12 mb-4">{children}</h2>
                  case 'h2':
                    return <h3 key={index} className="text-2xl font-bold mt-10 mb-4">{children}</h3>
                  case 'h3':
                    return <h4 key={index} className="text-xl font-bold mt-8 mb-3">{children}</h4>
                  case 'h4':
                    return <h5 key={index} className="text-lg font-bold mt-6 mb-3">{children}</h5>
                  case 'blockquote':
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 pl-4 my-6 italic"
                        style={{borderColor: 'hsl(var(--dc-brand))'}}
                      >
                        {children}
                      </blockquote>
                    )
                  default:
                    return <p key={index} className="mb-4 leading-relaxed">{children}</p>
                }
              }
              return null
            })}
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
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}
