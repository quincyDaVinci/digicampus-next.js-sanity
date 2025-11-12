"use client";

import type { CompareFeaturesSectionProps } from "@/types/sections";

export default function CompareFeaturesSection(props: CompareFeaturesSectionProps) {
  const { heading, subheading, badgeText } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 text-center">
          {badgeText && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold w-fit mx-auto">
              {badgeText}
            </div>
          )}
          {heading && <h2 className="text-3xl md:text-5xl tracking-tighter">{heading}</h2>}
          {subheading && <p className="text-muted-foreground">{subheading}</p>}
          <div className="mt-8">
            <p className="text-muted-foreground">Feature comparison table to be implemented</p>
          </div>
        </div>
      </div>
    </div>
  );
}

