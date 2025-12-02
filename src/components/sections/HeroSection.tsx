"use client";

import type { HeroSectionProps } from "@/types/sections";
import { urlFor } from "@sanity/lib/image";
import SanityNextImage from '@/components/SanityNextImage'
import { buildSrc } from 'sanity-image'

/**
 * Hero Section Router
 * Routes to different hero variants based on the variant prop
 */
export default function HeroSection(props: HeroSectionProps) {
  const { heading, subheading, badgeText, buttons = [], media } = props;

  // Prefer plugin-generated background URL when possible
  const bgUrl = (() => {
    if (!media?.image?.asset) return null
    try {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
      const baseUrl = projectId && dataset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : undefined
      const asset = media.image.asset
      const assetId = asset?._ref || asset?._id || (typeof asset === 'string' ? asset : undefined)
      if (assetId && baseUrl) {
        const srcObj = buildSrc({ id: assetId, baseUrl, width: 2400, height: 1200, mode: 'cover' })
        return srcObj?.src ?? null
      }
    } catch (err) {
      return urlFor(media.image).width(2400).height(1200).fit('crop').auto('format').url()
    }
    return null
  })()

  // For now, render a simple hero section
  // TODO: Implement variants from sane-kit (buttonBanner, badgeBanner, gridGallery)
  return (
    <div className="w-full py-20 lg:py-40 relative">
      {bgUrl && media?.image?.asset && (
        <div aria-hidden style={{position: 'absolute', inset: 0, zIndex: 0}}>
          <SanityNextImage
            image={media.image}
            alt={media.image.alt || ''}
            fill
            priority={true}
            style={{objectFit: 'cover'}}
            placeholder={media.image?.blurDataURL ? 'blur' : undefined}
          />
        </div>
      )}
      {/* Gradient overlay from image.overlay (absolutely positioned) */}
      {media?.image?.overlay?.enabled && (() => {
        const ov = media.image.overlay as any;
        const overlayOpacity = typeof ov?.opacity === 'number' ? ov.opacity : 0.5;

        // Black-only gradient: transparent black -> black with overlay opacity
        const start = 'rgba(0,0,0,0)';
        const end = `rgba(0,0,0,${Math.max(0, Math.min(1, overlayOpacity))})`;

        // Map simple directions to CSS gradient directions
        const dir = ov?.direction || 'down';
        const dirToCss: Record<string, string> = {
          up: 'to top',
          down: 'to bottom',
          left: 'to left',
          right: 'to right',
        };

        const cssDir = dirToCss[dir] || 'to bottom';
        const bgImage = `linear-gradient(${cssDir}, ${start}, ${end})`;

        return (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 1,
              backgroundImage: bgImage,
            }}
          />
        );
      })()}

      <div className="container mx-auto" style={{ position: 'relative', zIndex: 2 }}>
        <div className="flex gap-8 items-center justify-center flex-col text-center">
          {badgeText && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {badgeText}
            </div>
          )}
          {heading && (
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter font-regular">
              {heading}
            </h1>
          )}
          {subheading && (
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-muted-foreground">
              {subheading}
            </p>
          )}
          {buttons.length > 0 && (
            <div className="flex gap-4 flex-wrap justify-center">
              {buttons.map((button) => {
                const accessibleHref = button.accessibleVersionUrl?.trim();
                const href = accessibleHref || button.url || "#";
                const isPdfTarget = button.isPdf ?? /\.pdf(?:$|[?#])/i.test(button.url || "");
                const hasAccessiblePdf = Boolean(accessibleHref);
                const showAccessibleBadge = hasAccessiblePdf && isPdfTarget;
                const isExternal = /^https?:/i.test(href);
                const variant = button.variant || 'filled';

                const baseClass = 'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]';
                let style: React.CSSProperties = {};
                switch (variant) {
                  case 'outline':
                    style = {
                      backgroundColor: 'transparent',
                      color: 'hsl(var(--dc-primary))',
                      border: '1px solid hsl(var(--dc-primary))'
                    };
                    break;
                  case 'ghost':
                    style = {
                      backgroundColor: 'hsl(var(--dc-primary)/0.08)',
                      color: 'hsl(var(--dc-primary))',
                      border: '1px solid transparent'
                    };
                    break;
                  default:
                    style = {
                      backgroundColor: 'hsl(var(--dc-primary))',
                      color: 'hsl(var(--dc-on-primary))',
                      border: '1px solid hsl(var(--dc-primary)/0.85)'
                    };
                }

                return (
                  <a
                    key={button._key}
                    href={href}
                    className={baseClass}
                    style={style}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    <span className="hy-btn__label">{button.label}</span>
                    {showAccessibleBadge && (
                      <span className="ml-1 rounded bg-[hsl(var(--dc-bg-soft))] px-2 py-0.5 text-xs font-semibold text-[hsl(var(--dc-text))]">
                        Toegankelijke PDF
                      </span>
                    )}
                    {isPdfTarget && !hasAccessiblePdf && (
                      <span className="sr-only"> (PDF-bestand zonder toegankelijke versie beschikbaar)</span>
                    )}
                    {button.accessibilityNote && (
                      <span className="sr-only"> {button.accessibilityNote}</span>
                    )}
                    {isExternal && <span className="sr-only"> (opent in nieuw venster)</span>}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

