"use client";

import type { SplitSectionProps } from "@/types/sections";
import { buildSrc } from 'sanity-image';
import Link from 'next/link';

export default function SplitSection(props: SplitSectionProps) {
    const { layout = 'imageLeft', tagline, heading, body, infoList, cta, image } = props;

    // Safely extract image metadata with proper null checks
    const hasImage = image && typeof image === 'object';
    const altText = (hasImage && 'alt' in image ? image.alt as string : '') || '';
    const caption = (hasImage && 'caption' in image ? image.caption as string : '') || '';
    const objectFit = (hasImage && 'objectFit' in image ? image.objectFit as string : 'cover') || 'cover';
    const aspectRatio = (hasImage && 'aspectRatio' in image ? image.aspectRatio as string : 'auto') || 'auto';

    // Build image URL with proper parameters based on objectFit
    const imageUrl = (() => {
        if (!hasImage || !image.asset) return null;
        try {
            const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
            const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
            const baseUrl = projectId && dataset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : undefined;
            const asset = image.asset;
            let assetId: string | undefined;
            if (typeof asset === 'string') {
                assetId = asset;
            } else if (asset && typeof asset === 'object') {
                const maybe = asset as { _ref?: string; _id?: string };
                assetId = maybe._ref || maybe._id;
            }
            if (assetId && baseUrl) {
                // When using contain, use contain mode without forced height to preserve aspect ratio
                // When using cover, use cover mode with dimensions for proper cropping
                const buildParams = objectFit === 'contain'
                    ? { id: assetId, baseUrl, width: 1200, mode: 'contain' as const }
                    : { id: assetId, baseUrl, width: 1200, height: 800, mode: 'cover' as const };

                const srcObj = buildSrc(buildParams);
                return srcObj?.src ?? null;
            }
        } catch (err) {
            console.error('Error building image URL:', err);
            return null;
        }
        return null;
    })();

    // Render content block
    const ContentBlock = () => (
        <div className="flex flex-col gap-6">
            {tagline && (
                <span className="text-sm font-semibold text-[hsl(var(--dc-brand))] uppercase tracking-wide">
                    {tagline}
                </span>
            )}

            {heading && (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[hsl(var(--dc-text))]">
                    {heading}
                </h2>
            )}

            {body && (
                <p className="text-lg text-[hsl(var(--dc-text-muted))] leading-relaxed">
                    {body}
                </p>
            )}

            {infoList && infoList.length > 0 && (
                <ul className="space-y-3">
                    {infoList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-[hsl(var(--dc-brand))] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[hsl(var(--dc-text))]">{item}</span>
                        </li>
                    ))}
                </ul>
            )}

            {cta && cta.label && cta.url && (
                <div className="mt-2">
                    <Link
                        href={cta.url}
                        className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--dc-focus))] ${cta.variant === 'outline'
                            ? 'border border-[hsl(var(--dc-border))] hover:bg-[hsl(var(--dc-bg-soft))]'
                            : 'bg-[hsl(var(--dc-brand))] text-[hsl(var(--dc-on-primary))] hover:opacity-90 shadow-sm'
                            }`}
                    >
                        {cta.label}
                    </Link>
                </div>
            )}
        </div>
    );

    // Render image block with format controls
    const ImageBlock = () => {
        if (!imageUrl) return null;

        // When aspectRatio is auto and objectFit is contain, let image determine size naturally
        if (aspectRatio === 'auto' && objectFit === 'contain') {
            return (
                <figure className="relative">
                    <img
                        src={imageUrl}
                        alt={altText}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                    />
                    {caption && (
                        <figcaption className="mt-3 text-sm text-[hsl(var(--dc-text-muted))] text-center">
                            {caption}
                        </figcaption>
                    )}
                </figure>
            );
        }

        // For all other cases, use container with aspect ratio
        return (
            <figure className="relative">
                <div
                    className={`relative w-full ${objectFit === 'cover' ? 'rounded-2xl shadow-lg bg-[hsl(var(--dc-bg-soft))] overflow-hidden' : ''}`}
                    style={{
                        aspectRatio: aspectRatio === 'auto' ? '16/9' : aspectRatio,
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={altText}
                        className={`${objectFit === 'contain' ? 'w-full h-full object-contain' : 'w-full h-full object-cover'}`}
                        loading="lazy"
                    />
                </div>
                {caption && (
                    <figcaption className="mt-3 text-sm text-[hsl(var(--dc-text-muted))] text-center">
                        {caption}
                    </figcaption>
                )}
            </figure>
        );
    };

    // Layout: Image Top
    if (layout === 'imageTop') {
        return (
            <section className="w-full py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto flex flex-col gap-12">
                        <ImageBlock />
                        <ContentBlock />
                    </div>
                </div>
            </section>
        );
    }

    // Layout: Image Bottom
    if (layout === 'imageBottom') {
        return (
            <section className="w-full py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto flex flex-col gap-12">
                        <ContentBlock />
                        <ImageBlock />
                    </div>
                </div>
            </section>
        );
    }

    // Layout: Image Left or Right (two columns)
    return (
        <section className="w-full py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6">
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${layout === 'imageRight' ? 'lg:grid-flow-dense' : ''
                    }`}>
                    <div className={layout === 'imageRight' ? 'lg:col-start-2' : ''}>
                        <ImageBlock />
                    </div>
                    <div className={layout === 'imageRight' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                        <ContentBlock />
                    </div>
                </div>
            </div>
        </section>
    );
}
