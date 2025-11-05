"use client";

import type { FeatureSectionProps } from "@/types/sections";

export default function FeatureSection(props: FeatureSectionProps) {
  const { heading, subheading, badgeText, features = [] } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex gap-4 flex-col items-center text-center">
          {badgeText && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {badgeText}
            </div>
          )}
          {heading && (
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">
              {subheading}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
            {features.map((feature) => (
              <div key={feature._key} className="flex flex-col gap-2">
                <h3 className="text-xl font-medium">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
