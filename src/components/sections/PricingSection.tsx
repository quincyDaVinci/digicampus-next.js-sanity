"use client";

import type { PricingSectionProps } from "@/types/sections";

export default function PricingSection(props: PricingSectionProps) {
  const { heading, subheading, plans = [] } = props;

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 text-center">
          {heading && <h2 className="text-3xl md:text-5xl tracking-tighter">{heading}</h2>}
          {subheading && <p className="text-muted-foreground">{subheading}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {plans.map((plan) => (
              <div key={plan._key} className="flex flex-col gap-4 p-6 border rounded-lg">
                <h3 className="text-2xl font-bold">{plan.title}</h3>
                <div className="text-3xl font-bold">{plan.price}</div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
