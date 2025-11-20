"use client";

import { useEffect, useMemo, useState } from "react";

import { client } from "@sanity/lib/client";

import BlogCard from "../pageBuilder/BlogCard";
import type { BlogSectionProps } from "@/types/sections";
import type { BlogCardComponent, BlogCardResolvedPost } from "@/types/pageBuilder";

const BLOG_SECTION_QUERY = `*[_type == "blogPost" && defined(publishedAt) && (!defined($categoryId) || $categoryId in categories[]._ref)]
  | order(publishedAt desc)[0...$limit]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    body,
    estimatedReadTime,
    mainImage{
      ...,
    },
    author->{
      name,
      role,
      company,
      image{
        ...,
      }
    },
    categories[]->{
      title,
      slug
    }
  }`;

type BlogSectionQueryResult = {
  _id: string;
  title?: string;
  slug?: string;
  publishedAt?: string;
  excerpt?: string;
  body?: unknown;
  estimatedReadTime?: number;
  mainImage?: BlogCardResolvedPost["mainImage"];
  author?: BlogCardResolvedPost["author"];
  categories?: NonNullable<BlogCardResolvedPost["categories"]>;
};

export default function BlogSection(props: BlogSectionProps) {
  const {
    heading,
    subheading,
    limit = 3,
    tone = "surface",
    ctaLabel = "Lees meer",
    viewAllLink,
    category,
  } = props;

  const resolvedLimit = Math.min(Math.max(limit ?? 3, 1), 12);
  const categoryRef = category?._ref ?? null;

  const [posts, setPosts] = useState<BlogCardResolvedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    async function fetchPosts() {
      setIsLoading(true);
      setError(null);
      try {
        const results = await client.fetch<BlogSectionQueryResult[]>(BLOG_SECTION_QUERY, {
          limit: resolvedLimit,
          categoryId: categoryRef,
        });

        if (!isSubscribed) return;

        const mapped = results.map((post) => ({
          _id: post._id,
          title: post.title ?? "Untitled",
          slug: post.slug,
          publishedAt: post.publishedAt,
          summary: post.excerpt,
          body: post.body,
          mainImage: post.mainImage,
          author: post.author,
          categories: post.categories,
          estimatedReadTime: post.estimatedReadTime,
        } satisfies BlogCardResolvedPost));

        setPosts(mapped);
      } catch (err) {
        if (!isSubscribed) return;
        const message = err instanceof Error ? err.message : "Er ging iets mis bij het laden van blogs.";
        setError(message);
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isSubscribed = false;
    };
  }, [resolvedLimit, categoryRef]);

  const cardComponent = useMemo<BlogCardComponent>(() => ({
    _type: "blogCardComponent",
    _key: "blog-section",
    tone,
    ctaLabel,
    borderRadius: 'small',
    resolvedPost: posts,
  }), [posts, tone, ctaLabel]);

  return (
    <section className="w-full py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          {heading ? (
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{heading}</h2>
          ) : null}
          {subheading ? (
            <p className="mt-4 text-base text-muted-foreground md:text-lg">{subheading}</p>
          ) : null}
        </div>

        <div className="mt-12" aria-live="polite">
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
              {Array.from({ length: Math.min(resolvedLimit, 3) }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="h-80 animate-pulse rounded-xl bg-[hsl(var(--dc-surface))/0.6]"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-[hsl(var(--dc-border)/0.4)] bg-[hsl(var(--dc-surface)/0.5)] p-6 text-center text-sm text-[hsl(var(--dc-error))]">
              {error}
            </div>
          ) : posts.length ? (
            <>
              <BlogCard component={cardComponent} />
              {viewAllLink?.url && viewAllLink?.label && (
                <div className="mt-12 flex justify-center">
                  <a
                    href={viewAllLink.url}
                    className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--dc-brand))] px-6 py-3 text-sm font-semibold text-[hsl(var(--dc-on-primary))] transition hover:bg-[hsl(var(--dc-brand)/0.9)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]">
                    {viewAllLink.label}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-[hsl(var(--dc-border)/0.4)] p-6 text-center text-sm text-[hsl(var(--dc-text)/0.7)]">
              Geen blogberichten gevonden.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

