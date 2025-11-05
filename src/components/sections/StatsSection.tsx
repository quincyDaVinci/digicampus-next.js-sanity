"use client";

import type { StatsSectionProps } from "@/types/sections";

export default function StatsSection(props: StatsSectionProps) {
  const { heading, subheading, stats = [] } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          {heading && <h2 className="text-3xl md:text-5xl tracking-tighter text-center">{heading}</h2>}
          {subheading && <p className="text-muted-foreground text-center">{subheading}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {stats.map((stat) => (
              <div key={stat._key} className="flex flex-col gap-2">
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
