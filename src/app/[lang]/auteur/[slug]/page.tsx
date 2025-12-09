import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@sanity/lib/client'
import {
    authorBySlugQuery,
    buildBlogPostsByAuthorQuery,
    buildBlogPostsByAuthorCountQuery,
} from '@sanity/lib/queries/blog'
import { defaultLanguage, supportedLanguages, isSupportedLang } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { buildSrc } from 'sanity-image'
import { CalendarIcon, ClockIcon, ChevronLeftIcon, MailIcon, LinkedInIcon } from '@/components/icons/FeatherIcons'
import Breadcrumbs from '@/components/Breadcrumbs'
import { PortableText, type PortableTextBlock } from 'next-sanity'
import { getBlogTranslation } from '@/lib/blogTranslations'

// Revalidate this page every 300 seconds (ISR)
export const revalidate = 300

type Author = {
    _id: string
    name: string
    slug: string
    role?: string
    category?: {
        _id: string
        title: string
        slug: string
    }
    image?: {
        asset: {
            _id: string
            url: string
        }
        alt?: string
    }
    email?: string
    linkedin?: string
    bio?: PortableTextBlock[]
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
        _id: string
        name: string
        slug?: string
    }
    categories?: Array<{
        _id: string
        title: string
        slug: string
    }>
}

type PageProps = {
    params: Promise<{ slug: string; lang: string }>
    searchParams: Promise<{
        page?: string
        sort?: string
    }>
}

export async function generateStaticParams() {
    return supportedLanguages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, lang = defaultLanguage } = await params

    try {
        const author = await client.fetch<Author | null>(authorBySlugQuery, { slug }, { next: { revalidate: 300 } })

        if (!author) {
            return {
                title: 'Auteur niet gevonden',
            }
        }

        const description = author.role
            ? `${author.name} - ${author.role}`
            : `Bekijk alle blogberichten van ${author.name}`

        return {
            title: author.name,
            description,
            openGraph: { locale: lang === 'nl' ? 'nl_NL' : 'en_US' },
            alternates: {
                languages: {
                    en: `/en/auteur/${slug}`,
                    nl: `/nl/auteur/${slug}`,
                },
            },
        }
    } catch (error) {
        console.error('Error generating metadata:', error)
        return {
            title: 'Auteur',
        }
    }
}

export default async function AuthorPage({ params, searchParams }: PageProps) {
    const { slug, lang = defaultLanguage } = await params
    const resolvedSearchParams = await searchParams
    const t = (key: Parameters<typeof getBlogTranslation>[1]) => getBlogTranslation(lang, key)

    const currentPage = Math.max(1, parseInt(resolvedSearchParams?.page || '1', 10))
    const sortBy = resolvedSearchParams?.sort || 'newest'
    const postsPerPage = 12

    try {
        // Fetch author data
        const author = await client.fetch<Author | null>(authorBySlugQuery, { slug }, { next: { revalidate: 300 } })

        if (!author) {
            notFound()
        }

        // Fetch blog posts by author
        const usedLang = isSupportedLang(lang) ? lang : defaultLanguage
        const posts = await client.fetch<BlogPost[]>(
            buildBlogPostsByAuthorQuery(author._id, usedLang, sortBy, currentPage, postsPerPage),
            { lang: usedLang },
            { next: { revalidate: 300 } }
        )

        const totalPosts = await client.fetch<number>(
            buildBlogPostsByAuthorCountQuery(author._id),
            {},
            { next: { revalidate: 300 } }
        )

        const totalPages = Math.ceil(totalPosts / postsPerPage)

        // Helper function to build image URLs
        const makeSrc = (
            img: { asset?: { _ref?: string; _id?: string } } | string | null | undefined,
            w?: number,
            h?: number,
            mode: 'cover' | 'contain' = 'cover'
        ) => {
            if (!img) return null
            try {
                const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
                const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
                const baseUrl = projectId && dataset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : undefined
                let assetId: string | undefined
                if (typeof img === 'string') {
                    assetId = img
                } else if (img && typeof img === 'object') {
                    const maybeAsset = (img as { asset?: unknown }).asset as unknown
                    if (maybeAsset && typeof maybeAsset === 'object') {
                        const a = maybeAsset as { _ref?: string; _id?: string }
                        assetId = a._ref || a._id
                    }
                }
                if (assetId && baseUrl) {
                    const srcObj = buildSrc({ id: assetId, baseUrl, width: w, height: h, mode })
                    return srcObj?.src ?? null
                }
            } catch (err) {
                // fall through
            }
            return null
        }

        const authorImageUrl = makeSrc(author.image, 400, 400, 'cover')

        const breadcrumbs = [
            { label: t('home'), href: `/${lang}` },
            { label: 'Team', href: `/${lang}` }, // Adjust this if you have a team page
            { label: author.name },
        ]

        return (
            <>
                {/* Breadcrumbs */}
                <div className="border-b border-dc bg-dc-surface-98">
                    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                        <Breadcrumbs items={breadcrumbs} />
                    </div>
                </div>

                {/* Author Profile Section */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Back link */}
                    <Link
                        href={`/${lang}/blog`}
                        className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[hsl(var(--dc-brand))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))] rounded-lg mb-8"
                        style={{ color: 'hsl(var(--dc-text) / 0.7)' }}
                    >
                        <ChevronLeftIcon className="h-4 w-4" aria-hidden />
                        {t('backToBlog')}
                    </Link>

                    {/* Author Header */}
                    <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start">
                        {/* Author Image */}
                        <div className="flex-shrink-0">
                            {authorImageUrl ? (
                                <Image
                                    src={authorImageUrl}
                                    alt={author.image?.alt || author.name}
                                    width={200}
                                    height={200}
                                    className="h-48 w-48 rounded-full object-cover ring-4 ring-[hsl(var(--dc-border)/0.3)] transition-all duration-300 hover:scale-105"
                                />
                            ) : (
                                <div
                                    className="flex h-48 w-48 items-center justify-center rounded-full text-6xl font-bold"
                                    style={{
                                        backgroundColor: 'hsl(var(--dc-brand)/0.15)',
                                        color: 'hsl(var(--dc-brand))',
                                    }}
                                    aria-hidden
                                >
                                    {author.name.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Author Info */}
                        <div className="flex-1">
                            <h1 className="mb-2 text-4xl font-bold" style={{ color: 'hsl(var(--dc-text))' }}>
                                {author.name}
                            </h1>

                            {author.role && (
                                <p className="mb-4 text-xl" style={{ color: 'hsl(var(--dc-text) / 0.7)' }}>
                                    {author.role}
                                </p>
                            )}

                            {author.category && (
                                <div className="mb-4">
                                    <span
                                        className="inline-block rounded-full px-4 py-1.5 text-sm font-medium"
                                        style={{
                                            backgroundColor: 'hsl(var(--dc-brand)/0.1)',
                                            color: 'hsl(var(--dc-brand))',
                                        }}
                                    >
                                        {author.category.title}
                                    </span>
                                </div>
                            )}

                            {/* Contact Links */}
                            {(author.email || author.linkedin) && (
                                <div className="mb-6 flex flex-wrap gap-4">
                                    {author.email && (
                                        <a
                                            href={`mailto:${author.email}`}
                                            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-[hsl(var(--dc-brand)/0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))]"
                                            style={{
                                                border: '1px solid hsl(var(--dc-border) / 0.3)',
                                                color: 'hsl(var(--dc-text))',
                                            }}
                                        >
                                            <MailIcon className="h-4 w-4" aria-hidden />
                                            Email
                                        </a>
                                    )}
                                    {author.linkedin && (
                                        <a
                                            href={author.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-[hsl(var(--dc-brand)/0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))]"
                                            style={{
                                                border: '1px solid hsl(var(--dc-border) / 0.3)',
                                                color: 'hsl(var(--dc-text))',
                                            }}
                                        >
                                            <LinkedInIcon className="h-4 w-4" aria-hidden />
                                            LinkedIn
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* Bio */}
                            {author.bio && author.bio.length > 0 && (
                                <div className="prose prose-lg max-w-none" style={{ color: 'hsl(var(--dc-text))' }}>
                                    <PortableText
                                        value={author.bio}
                                        components={{
                                            block: {
                                                normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                                            },
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Blog Posts Section */}
                    <div className="border-t pt-12" style={{ borderColor: 'hsl(var(--dc-border) / 0.3)' }}>
                        <h2 className="mb-8 text-3xl font-bold" style={{ color: 'hsl(var(--dc-text))' }}>
                            {lang === 'nl' ? 'Blogs' : 'Blog Posts'} ({totalPosts})
                        </h2>

                        {posts.length > 0 ? (
                            <>
                                {/* Blog Posts Grid */}
                                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {posts.map((post) => {
                                        const postImageUrl = makeSrc(post.mainImage, 600, 400, 'cover')
                                        const formattedDate = post.publishedAt
                                            ? new Date(post.publishedAt).toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                timeZone: 'Europe/Amsterdam',
                                            })
                                            : null

                                        return (
                                            <Link
                                                key={post._id}
                                                href={`/${lang}/blog/${post.slug}`}
                                                className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))] focus-visible:ring-offset-2"
                                                style={{
                                                    backgroundColor: 'hsl(var(--dc-surface-98))',
                                                    border: '1px solid hsl(var(--dc-border) / 0.2)',
                                                }}
                                            >
                                                {/* Post Image */}
                                                {postImageUrl && (
                                                    <div className="aspect-video overflow-hidden">
                                                        <Image
                                                            src={postImageUrl}
                                                            alt={post.mainImage?.alt || post.title}
                                                            width={600}
                                                            height={400}
                                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    </div>
                                                )}

                                                {/* Post Content */}
                                                <div className="flex flex-1 flex-col p-6">
                                                    {/* Categories */}
                                                    {post.categories && post.categories.length > 0 && (
                                                        <div className="mb-3 flex flex-wrap gap-2">
                                                            {post.categories.slice(0, 2).map((category) => (
                                                                <span
                                                                    key={category._id}
                                                                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                                                                    style={{
                                                                        backgroundColor: 'hsl(var(--dc-brand)/0.1)',
                                                                        color: 'hsl(var(--dc-brand))',
                                                                    }}
                                                                >
                                                                    {category.title}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Title */}
                                                    <h3
                                                        className="mb-3 text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-[hsl(var(--dc-brand))]"
                                                        style={{ color: 'hsl(var(--dc-text))' }}
                                                    >
                                                        {post.title}
                                                    </h3>

                                                    {/* Excerpt */}
                                                    {post.excerpt && (
                                                        <p className="mb-4 line-clamp-3 text-sm" style={{ color: 'hsl(var(--dc-text) / 0.7)' }}>
                                                            {post.excerpt}
                                                        </p>
                                                    )}

                                                    {/* Meta info */}
                                                    <div className="mt-auto flex flex-wrap items-center gap-4 text-xs" style={{ color: 'hsl(var(--dc-text) / 0.6)' }}>
                                                        {formattedDate && (
                                                            <div className="flex items-center gap-1.5">
                                                                <CalendarIcon className="h-3.5 w-3.5" aria-hidden />
                                                                <time dateTime={post.publishedAt}>{formattedDate}</time>
                                                            </div>
                                                        )}
                                                        {post.estimatedReadTime && (
                                                            <div className="flex items-center gap-1.5">
                                                                <ClockIcon className="h-3.5 w-3.5" aria-hidden />
                                                                <span>
                                                                    {post.estimatedReadTime} {t('minRead')}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                            const isActive = page === currentPage
                                            return (
                                                <Link
                                                    key={page}
                                                    href={`/${lang}/auteur/${slug}?page=${page}${sortBy !== 'newest' ? `&sort=${sortBy}` : ''}`}
                                                    className="rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--dc-focus))]"
                                                    style={{
                                                        backgroundColor: isActive ? 'hsl(var(--dc-brand))' : 'hsl(var(--dc-surface-98))',
                                                        color: isActive ? 'white' : 'hsl(var(--dc-text))',
                                                        border: isActive ? 'none' : '1px solid hsl(var(--dc-border) / 0.3)',
                                                    }}
                                                    aria-current={isActive ? 'page' : undefined}
                                                >
                                                    {page}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: 'hsl(var(--dc-surface-98))' }}>
                                <p className="text-lg" style={{ color: 'hsl(var(--dc-text) / 0.7)' }}>
                                    {lang === 'nl'
                                        ? `${author.name} heeft nog geen blogs gepubliceerd.`
                                        : `${author.name} hasn't published any blog posts yet.`}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    } catch (error) {
        console.error('Error fetching author page data:', error)
        notFound()
    }
}
