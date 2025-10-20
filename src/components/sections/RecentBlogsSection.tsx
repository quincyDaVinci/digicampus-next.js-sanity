import Image from 'next/image'
import Link from 'next/link'

import { ArrowRightIcon, CalendarIcon } from '@/components/icons/FeatherIcons'
import { HybridCard, HybridLinkButton, HybridSection } from '@/components/ui/HybridComponents'
import { urlForImage } from '@/lib/sanityImage'
import { BlogPostCard, BlogSectionData } from '@/types/homepage'

interface RecentBlogsSectionProps {
  data?: BlogSectionData
  posts: BlogPostCard[]
}

export default function RecentBlogsSection({ data, posts }: RecentBlogsSectionProps) {
  if (!data && posts.length === 0) {
    return null
  }

  const variant = data?.stylePreset ?? 'structured'
  const cardTone = data?.cardTone ?? 'surface'

  return (
    <HybridSection aria-labelledby="recent-blogs-heading" variant={variant}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-4">
          {data?.heading ? (
            <h2 className="text-3xl font-semibold" id="recent-blogs-heading">
              {data.heading}
            </h2>
          ) : (
            <h2 className="text-3xl font-semibold" id="recent-blogs-heading">
              Recente blogs
            </h2>
          )}
          {data?.description ? (
            <p className="max-w-3xl text-lg text-[rgb(var(--dc-text)/0.78)] dark:text-[rgb(var(--dc-text)/0.82)]">
              {data.description}
            </p>
          ) : null}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => {
              const hasValidImage = post.mainImage && typeof post.mainImage === 'object' && 'asset' in post.mainImage
              const imageUrl = hasValidImage ? urlForImage(post.mainImage)?.width(600).height(400).fit('max').url() : null

              return (
                <HybridCard key={post._id} tone={cardTone} className="h-full overflow-hidden">
                  {imageUrl ? (
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border-2 border-[rgb(var(--dc-border))] bg-[rgb(var(--dc-surface))]">
                      <Image
                        src={imageUrl}
                        alt={post.mainImage?.alt || ''}
                        fill
                        sizes="(min-width: 1280px) 20rem, (min-width: 768px) 50vw, 100vw"
                        className="object-contain"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  ) : null}
                  <div className="hy-card__content flex-1">
                    {post.title ? (
                      <h3 className="text-xl font-semibold text-[rgb(var(--dc-text))] dark:text-[rgb(var(--dc-text))]">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-focus)/0.25)]"
                        >
                          {post.title}
                        </Link>
                      </h3>
                    ) : null}
                    {post.publishedAt ? (
                      <p className="flex items-center gap-2 text-sm text-[rgb(var(--dc-text)/0.65)] dark:text-[rgb(var(--dc-text)/0.7)]">
                        <CalendarIcon aria-hidden focusable="false" />
                        {new Intl.DateTimeFormat('nl-NL', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        }).format(new Date(post.publishedAt))}
                      </p>
                    ) : null}
                    {post.summary ? (
                      <p className="text-base text-[rgb(var(--dc-text)/0.75)] dark:text-[rgb(var(--dc-text)/0.8)]">
                        {post.summary}
                      </p>
                    ) : null}
                  </div>
                  <HybridLinkButton
                    href={`/blog/${post.slug}`}
                    variant="secondary"
                    icon={<ArrowRightIcon aria-hidden focusable="false" />}
                    className="self-start"
                    aria-label={`Lees blog ${post.title}`}
                  >
                    Lees meer
                  </HybridLinkButton>
                </HybridCard>
              )
            })
          ) : (
            <p className="text-[rgb(var(--dc-text)/0.75)]">Er zijn nog geen blogs gepubliceerd.</p>
          )}
        </div>
      </div>
    </HybridSection>
  )
}
