"use client";

import type { CTASectionProps } from "@/types/sections";
import { buildSrc } from 'sanity-image';

export default function CTASection(props: CTASectionProps) {
  const {
    heading,
    subheading,
    badgeText,
    buttons = [],
    bannerBackground = false,
    backgroundColor = 'soft',
    layout = 'noImage',
    image
  } = props;

  // Safely extract image metadata with proper null checks
  const hasImage = image && typeof image === 'object' && layout !== 'noImage';
  const altText = (hasImage && 'alt' in image ? image.alt as string : '') || '';
  const caption = (hasImage && 'caption' in image ? image.caption as string : '') || '';
  const objectFit = (hasImage && 'objectFit' in image ? image.objectFit as string : 'cover') || 'cover';
  const aspectRatio = (hasImage && 'aspectRatio' in image ? image.aspectRatio as string : 'auto') || 'auto';
  const displaySize = (hasImage && 'displaySize' in image && typeof image.displaySize === 'number' ? image.displaySize : 100);

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

  // Calculate fractional widths based on displaySize (for contain mode only)
  const getGridColumnClass = () => {
    if (objectFit !== 'contain') {
      return 'lg:grid-cols-2'; // Default 50/50 split for cover mode
    }

    // For contain mode, adjust based on displaySize percentage
    // When imageLeft: image is column 1, text is column 2
    // When imageRight: text is column 1, image is column 2
    const isImageLeft = layout === 'imageLeft';

    // Calculate fraction based on percentage (e.g., 25% = 1fr, 75% = 3fr)
    const imageFr = Math.round(displaySize / 25) || 1;
    const textFr = Math.round((100 - displaySize) / 25) || 1;

    if (imageFr === textFr) {
      return 'lg:grid-cols-2'; // Equal split
    }

    return isImageLeft
      ? `lg:grid-cols-[${imageFr}fr_${textFr}fr]`
      : `lg:grid-cols-[${textFr}fr_${imageFr}fr]`;
  };

  // Get background color class based on selected color
  const getBgColorClass = () => {
    switch (backgroundColor) {
      case 'soft':
        return 'bg-[hsl(var(--dc-bg-soft))]';
      case 'accent':
        return 'bg-[hsl(var(--dc-primary))]';
      case 'none':
        return 'bg-transparent';
      default:
        return 'bg-[hsl(var(--dc-bg-soft))]';
    }
  };

  // Render image block with format controls (similar to SplitSection)
  const ImageBlock = () => {
    if (!imageUrl) return null;

    // When aspectRatio is auto and objectFit is contain, let image determine size naturally
    if (aspectRatio === 'auto' && objectFit === 'contain') {
      return (
        <figure className="relative flex justify-center">
          <img
            src={imageUrl}
            alt={altText}
            className="h-auto object-contain"
            style={{ maxWidth: `${displaySize}%`, width: '100%' }}
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
          className={`relative w-full flex justify-center ${objectFit === 'cover' ? 'rounded-2xl shadow-lg bg-[hsl(var(--dc-bg-soft))] overflow-hidden' : ''}`}
          style={{
            aspectRatio: aspectRatio === 'auto' ? '16/9' : aspectRatio,
          }}
        >
          <img
            src={imageUrl}
            alt={altText}
            className={objectFit === 'contain' ? 'h-full object-contain' : 'w-full h-full object-cover'}
            style={objectFit === 'contain' ? { maxWidth: `${displaySize}%` } : {}}
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

  // Render content block
  const ContentBlock = () => {
    // Determine text color based on background
    const needsLightText = bannerBackground && backgroundColor === 'accent';
    const headingClass = needsLightText
      ? 'text-3xl md:text-5xl tracking-tighter text-[hsl(var(--dc-on-primary))]'
      : 'text-3xl md:text-5xl tracking-tighter';
    const subheadingClass = needsLightText
      ? 'max-w-xl text-[hsl(var(--dc-on-primary)/0.9)]'
      : 'text-muted-foreground max-w-xl';
    const badgeClass = needsLightText
      ? 'inline-flex items-center rounded-full border border-[hsl(var(--dc-on-primary))] text-[hsl(var(--dc-on-primary))] px-2.5 py-0.5 text-xs font-semibold'
      : 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold';

    return (
      <div className="flex flex-col gap-8 items-center text-center">
        {badgeText && (
          <div className={badgeClass}>
            {badgeText}
          </div>
        )}
        {heading && <h2 className={headingClass}>{heading}</h2>}
        {subheading && <p className={subheadingClass}>{subheading}</p>}
        {buttons.length > 0 && (
          <div className="flex gap-4 flex-wrap justify-center">
            {buttons.map(button => {
              const accessibleHref = button.accessibleVersionUrl?.trim();
              const href = accessibleHref || button.url || '#';
              const isPdfTarget = button.isPdf ?? /\.pdf(?:$|[?#])/i.test(button.url || '');
              const hasAccessiblePdf = Boolean(accessibleHref);
              const showAccessibleBadge = hasAccessiblePdf && isPdfTarget;
              const isExternal = /^https?:/i.test(href);
              const variant = button.variant || 'filled';

              const baseClass = 'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--dc-focus))]';

              // Determine if we need high contrast based on background color
              const needsLightButtons = bannerBackground && backgroundColor === 'accent';

              let style: React.CSSProperties = {};
              switch (variant) {
                case 'outline':
                  if (needsLightButtons) {
                    // Light outline on dark background
                    style = {
                      backgroundColor: 'transparent',
                      color: 'hsl(var(--dc-on-primary))',
                      border: '1px solid hsl(var(--dc-on-primary))'
                    };
                  } else {
                    // Default outline
                    style = {
                      backgroundColor: 'transparent',
                      color: 'hsl(var(--dc-primary))',
                      border: '1px solid hsl(var(--dc-primary))'
                    };
                  }
                  break;
                case 'ghost':
                  if (needsLightButtons) {
                    // Light ghost on dark background
                    style = {
                      backgroundColor: 'hsl(var(--dc-on-primary)/0.15)',
                      color: 'hsl(var(--dc-on-primary))',
                      border: '1px solid transparent'
                    };
                  } else {
                    // Default ghost
                    style = {
                      backgroundColor: 'hsl(var(--dc-primary)/0.08)',
                      color: 'hsl(var(--dc-primary))',
                      border: '1px solid transparent'
                    };
                  }
                  break;
                default:
                  if (needsLightButtons) {
                    // White/light button on dark background
                    style = {
                      backgroundColor: 'hsl(var(--dc-on-primary))',
                      color: 'hsl(var(--dc-primary))',
                      border: '1px solid hsl(var(--dc-on-primary))'
                    };
                  } else {
                    // Default filled button
                    style = {
                      backgroundColor: 'hsl(var(--dc-primary))',
                      color: 'hsl(var(--dc-on-primary))',
                      border: '1px solid hsl(var(--dc-primary)/0.85)'
                    };
                  }
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
    );
  };

  // Layout: No Image (original CTA section)
  if (layout === 'noImage') {
    return (
      <div className="w-full py-20 lg:py-40">
        {bannerBackground ? (
          <div className={`w-full ${getBgColorClass()} py-14`}>
            <div className="container mx-auto px-4 sm:px-6">
              <ContentBlock />
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-[hsl(var(--dc-bg-soft))] rounded-lg p-14">
              <ContentBlock />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Layout: Image Top
  if (layout === 'imageTop') {
    return (
      <div className="w-full py-20 lg:py-40">
        {bannerBackground ? (
          <div className={`w-full ${getBgColorClass()} py-14`}>
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col gap-12">
                <ImageBlock />
                <ContentBlock />
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-[hsl(var(--dc-bg-soft))] rounded-lg p-14 flex flex-col gap-12">
              <ImageBlock />
              <ContentBlock />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Layout: Image Bottom
  if (layout === 'imageBottom') {
    return (
      <div className="w-full py-20 lg:py-40">
        {bannerBackground ? (
          <div className={`w-full ${getBgColorClass()} py-14`}>
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex flex-col gap-12">
                <ContentBlock />
                <ImageBlock />
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 sm:px-6">
            <div className="bg-[hsl(var(--dc-bg-soft))] rounded-lg p-14 flex flex-col gap-12">
              <ContentBlock />
              <ImageBlock />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Layout: Image Left or Right (two columns with responsive fractions)
  const gridColClass = getGridColumnClass();

  return (
    <div className="w-full py-20 lg:py-40">
      {bannerBackground ? (
        <div className={`w-full ${getBgColorClass()} py-14`}>
          <div className="container mx-auto px-4 sm:px-6">
            <div className={`grid ${gridColClass} gap-12 lg:gap-16 items-center ${layout === 'imageRight' ? 'lg:grid-flow-dense' : ''}`}>
              <div className={layout === 'imageRight' ? 'lg:col-start-2' : ''}>
                <ImageBlock />
              </div>
              <div className={layout === 'imageRight' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <ContentBlock />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-[hsl(var(--dc-bg-soft))] rounded-lg p-14">
            <div className={`grid ${gridColClass} gap-12 lg:gap-16 items-center ${layout === 'imageRight' ? 'lg:grid-flow-dense' : ''}`}>
              <div className={layout === 'imageRight' ? 'lg:col-start-2' : ''}>
                <ImageBlock />
              </div>
              <div className={layout === 'imageRight' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <ContentBlock />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
