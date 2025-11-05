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
              {buttons.map((button) => (
                <a
                  key={button._key}
                  href={button.url || "#"}
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
                  style={{ backgroundColor: "rgb(var(--dc-primary))", color: "white" }}
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
