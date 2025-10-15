import Image from 'next/image'
import Link from 'next/link'

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

  return (
    <section className="bg-dc-surface-98" aria-labelledby="recent-blogs-heading">
      <div className="mx-auto max-w-6xl px-6 py-20">
        {data?.heading ? (
          <h2 className="text-3xl font-semibold text-[rgb(var(--dc-on-surface))]" id="recent-blogs-heading">
            {data.heading}
          </h2>
        ) : (
          <h2 className="text-3xl font-semibold text-[rgb(var(--dc-on-surface))]" id="recent-blogs-heading">
            Recente blogs
          </h2>
        )}
        {data?.description ? (
          <p className="mt-4 max-w-3xl text-lg text-[rgb(var(--dc-on-surface-variant))]">
            {data.description}
          </p>
        ) : null}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => {
              // Check if image has a valid asset reference
              const hasValidImage = post.mainImage && typeof post.mainImage === 'object' && 'asset' in post.mainImage
              const imageUrl = hasValidImage ? urlForImage(post.mainImage)?.width(600).height(400).fit('crop').url() : null

              return (
                <article
                  key={post._id}
                  className={[
                    'flex h-full flex-col overflow-hidden rounded-3xl border border-dc',
                    'bg-[rgb(var(--dc-surface))] shadow-sm',
                  ].join(' ')}
                >
                  {imageUrl ? (
                    <div className="relative aspect-[3/2] w-full">
                      <Image
                        src={imageUrl}
                        alt={post.mainImage?.alt || ''}
                        fill
                        sizes="(min-width: 1280px) 20rem, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                    <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold text-[rgb(var(--dc-on-surface))]">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-primary)/0.4)]"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    {post.publishedAt ? (
                      <p className="mt-2 text-sm text-[rgb(var(--dc-on-surface-variant)/0.7)]">
                        {new Intl.DateTimeFormat('nl-NL', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        }).format(new Date(post.publishedAt))}
                      </p>
                    ) : null}
                    {post.summary ? (
                      <p className="mt-4 text-base text-[rgb(var(--dc-on-surface-variant))]">
                        {post.summary}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-6">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--dc-primary))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgb(var(--dc-primary)/0.4)]"
                        aria-label={`Lees blog ${post.title}`}
                      >
                        Lees meer
                        <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })
          ) : (
            <p className="text-[rgb(var(--dc-on-surface-variant))]">Er zijn nog geen blogs gepubliceerd.</p>
          )}
        </div>
      </div>
    </section>
  )
}