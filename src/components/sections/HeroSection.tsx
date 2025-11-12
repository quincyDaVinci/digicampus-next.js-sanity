"use client";

import type { HeroSectionProps } from "@/types/sections";
import { urlFor } from "@sanity/lib/image";

/**
 * Hero Section Router
 * Routes to different hero variants based on the variant prop
 */
export default function HeroSection(props: HeroSectionProps) {
  const { heading, subheading, badgeText, buttons = [], media } = props;

  // Build background image URL with hotspot/crop applied (also rasterize vectors)
  const bgUrl = media?.image
    ? urlFor(media.image).width(2400).height(1200).fit('crop').url()
    : null;

  // For now, render a simple hero section
  // TODO: Implement variants from sane-kit (buttonBanner, badgeBanner, gridGallery)
  return (
    <div
      className="w-full py-20 lg:py-40"
      style={bgUrl ? {
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
    >
      <div className="container mx-auto">
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
              {buttons.map((button) => (
                <a
                  key={button._key}
                  href={button.url || "#"}
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
                  style={{ 
                    backgroundColor: button.variant === "outline" ? "transparent" : "hsl(var(--dc-primary))",
                    color: button.variant === "outline" ? "hsl(var(--dc-primary))" : "white",
                    border: button.variant === "outline" ? "1px solid hsl(var(--dc-primary))" : "none"
                  }}
                >
                  {button.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

