"use client";

import { useEffect, useState } from "react";
import type { HeroSectionProps } from "@/types/sections";
import { buildSrc } from 'sanity-image'

/**
 * Utility to detect if image is dark or light
 */
function getImageBrightness(imageUrl: string): Promise<'light' | 'dark'> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve('dark');

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }

        const pixelCount = data.length / 4;
        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        resolve(luminance > 0.5 ? 'light' : 'dark');
      } catch (err) {
        resolve('dark');
      }
    };

    img.onerror = () => resolve('dark');
  });
}

/**
 * Modern Hero Section with 3 variants
 */
export default function HeroSection(props: HeroSectionProps) {
  const { heading, subheading, badgeText, buttons = [], media, textColor = 'auto' } = props;
  const [detectedTextColor, setDetectedTextColor] = useState<'light' | 'dark'>('light');

  // Normalize variant - handle old values for backward compatibility
  let variant = props.variant || 'centered';
  if (variant === 'buttonBanner' || variant === 'badgeBanner' || variant === 'gridGallery') {
    variant = 'centered'; // Map old variants to centered
  }

  const bgUrl = (() => {
    if (!media?.image || (typeof media.image === 'object' && !(media.image as { asset?: unknown }).asset)) return null
    try {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
      const baseUrl = projectId && dataset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : undefined
      const asset = (media.image as { asset?: unknown }).asset
      let assetId: string | undefined
      if (typeof asset === 'string') {
        assetId = asset
      } else if (asset && typeof asset === 'object') {
        const maybe = asset as { _ref?: string; _id?: string }
        assetId = maybe._ref || ((asset as Record<string, unknown>)._id as string | undefined)
      }
      if (assetId && baseUrl) {
        const srcObj = buildSrc({ id: assetId, baseUrl, width: 2400, height: 1200, mode: 'cover' })
        return srcObj?.src ?? null
      }
    } catch (err) {
      return null
    }
    return null
  })()

  useEffect(() => {
    if (textColor === 'auto' && bgUrl) {
      getImageBrightness(bgUrl).then(brightness => {
        setDetectedTextColor(brightness === 'light' ? 'dark' : 'light');
      });
    }
  }, [bgUrl, textColor]);

  // Use design tokens when auto and no bg image, otherwise use detected/manual color
  const shouldUseTokens = textColor === 'auto' && !bgUrl;
  const finalTextColor = textColor === 'auto' ? detectedTextColor : textColor;
  const textColorClass = shouldUseTokens
    ? 'text-[hsl(var(--dc-text))]'
    : (finalTextColor === 'light' ? 'text-white' : 'text-gray-900 dark:text-white');
  const mutedTextClass = shouldUseTokens
    ? 'text-[hsl(var(--dc-text-muted))]'
    : (finalTextColor === 'light' ? 'text-white/70' : 'text-gray-600 dark:text-gray-300');

  // Render button component
  const renderButton = (button: any, idx: number) => {
    const href = button.accessibleVersionUrl?.trim() || button.url || "#";
    const isPdfTarget = button.isPdf ?? /\.pdf(?:$|[?#])/i.test(button.url || "");
    const isExternal = /^https?:/i.test(href);
    const buttonVariant = button.variant || 'default';
    const icon = button.icon;

    let buttonClass = 'group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--dc-focus))]';
    let buttonStyle: React.CSSProperties = {};

    if (variant === 'minimal') {
      // Minimal variant: always outline style
      buttonClass += ' hover:scale-[1.01] backdrop-blur-sm';
      buttonStyle = {
        backgroundColor: 'transparent',
        color: finalTextColor === 'light' ? '#fff' : '#000',
        border: `1px solid ${finalTextColor === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
      };
    } else {
      switch (buttonVariant) {
        case 'outline':
          buttonClass += ' hover:scale-[1.01] backdrop-blur-sm';
          buttonStyle = {
            backgroundColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            color: finalTextColor === 'light' ? '#fff' : '#000',
            border: `1px solid ${finalTextColor === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`,
            backdropFilter: 'blur(8px)',
          };
          break;
        case 'ghost':
          buttonClass += ' hover:scale-[1.01]';
          buttonStyle = {
            backgroundColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            color: finalTextColor === 'light' ? '#fff' : '#000',
          };
          break;
        default:
          buttonClass += ' hover:scale-[1.01] hover:shadow-lg';
          buttonStyle = {
            background: 'linear-gradient(135deg, hsl(var(--dc-brand)) 0%, hsl(var(--dc-brand) / 0.9) 100%)',
            color: 'hsl(var(--dc-on-primary))',
            boxShadow: '0 2px 8px 0 hsl(var(--dc-brand) / 0.2)',
          };
      }
    }

    const renderIcon = () => {
      if (icon === 'arrowRight') {
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        );
      }
      if (icon === 'phone') {
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      }
      return null;
    };

    return (
      <a
        key={button._key || idx}
        href={href}
        className={buttonClass}
        style={buttonStyle}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {icon && icon !== 'none' && renderIcon()}
        <span>{button.label}</span>
        {isExternal && <span className="sr-only"> (opent in nieuw venster)</span>}
        {isPdfTarget && <span className="sr-only"> (PDF-bestand)</span>}
      </a>
    );
  };

  // Variant: Centered (Default)
  if (variant === 'centered') {
    return (
      <div className="relative w-full py-32 lg:py-48 overflow-hidden">
        {bgUrl && (
          <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        )}
        {media?.image?.overlay?.enabled && (() => {
          const ov = media.image.overlay as any;
          const opacity = ov?.opacity ?? 0.5;
          const dir = ov?.direction || 'down';
          const dirMap: Record<string, string> = { up: 'to top', down: 'to bottom', left: 'to left', right: 'to right' };
          return <div aria-hidden className="absolute inset-0 z-[1]" style={{ backgroundImage: `linear-gradient(${dirMap[dir] || 'to bottom'}, rgba(0,0,0,0), rgba(0,0,0,${opacity}))` }} />;
        })()}

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 lg:gap-10">
            {badgeText && (
              <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${textColorClass}`}
                style={{ backgroundColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>
                {badgeText}
              </div>
            )}

            {heading && (
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${textColorClass}`}>
                {heading}
              </h1>
            )}

            {subheading && (
              <p className={`text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl ${mutedTextClass}`}>
                {subheading}
              </p>
            )}

            {buttons.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {buttons.map((button, idx) => renderButton(button, idx))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Variant: Split
  if (variant === 'split') {
    return (
      <div className="relative w-full py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="flex flex-col gap-6 lg:gap-8">
              {badgeText && (
                <div className="inline-flex self-start items-center rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-xs font-medium">
                  {badgeText}
                </div>
              )}

              {heading && (
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {heading}
                </h1>
              )}

              {subheading && (
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {subheading}
                </p>
              )}

              {buttons.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {buttons.map((button, idx) => renderButton(button, idx))}
                </div>
              )}
            </div>

            {/* Media */}
            {bgUrl && (
              <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img src={bgUrl} alt={(typeof media?.image === 'object' && media?.image && 'alt' in media.image ? media.image.alt as string : '') || ''} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Variant: Minimal
  if (variant === 'minimal') {
    return (
      <div className="w-full py-40 lg:py-56">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-10 lg:gap-12">
            {badgeText && (
              <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-xs font-medium">
                {badgeText}
              </div>
            )}

            {heading && (
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
                {heading}
              </h1>
            )}

            {subheading && (
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                {subheading}
              </p>
            )}

            {buttons.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                {buttons.map((button, idx) => renderButton(button, idx))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback to centered variant for any unexpected values
  return (
    <div className="relative w-full py-32 lg:py-48 overflow-hidden">
      {bgUrl && (
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      {media?.image?.overlay?.enabled && (() => {
        const ov = media.image.overlay as any;
        const opacity = ov?.opacity ?? 0.5;
        const dir = ov?.direction || 'down';
        const dirMap: Record<string, string> = { up: 'to top', down: 'to bottom', left: 'to left', right: 'to right' };
        return <div aria-hidden className="absolute inset-0 z-[1]" style={{ backgroundImage: `linear-gradient(${dirMap[dir] || 'to bottom'}, rgba(0,0,0,0), rgba(0,0,0,${opacity}))` }} />;
      })()}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 lg:gap-10">
          {badgeText && (
            <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${textColorClass}`}
              style={{ backgroundColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderColor: finalTextColor === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>
              {badgeText}
            </div>
          )}

          {heading && (
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${textColorClass}`}>
              {heading}
            </h1>
          )}

          {subheading && (
            <p className={`text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl ${mutedTextClass}`}>
              {subheading}
            </p>
          )}

          {buttons.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {buttons.map((button, idx) => renderButton(button, idx))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
