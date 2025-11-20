"use client";

import type { CTASectionProps } from "@/types/sections";

export default function CTASection(props: CTASectionProps) {
  const { heading, subheading, badgeText, buttons = [] } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 items-center text-center bg-muted rounded-lg p-14">
          {badgeText && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {badgeText}
            </div>
          )}
          {heading && <h2 className="text-3xl md:text-5xl tracking-tighter">{heading}</h2>}
          {subheading && <p className="text-muted-foreground max-w-xl">{subheading}</p>}
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

